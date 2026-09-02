import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta, withBrandSuffix } from "@/seo/routeMeta";
import { buildRouteSchema } from "@/seo/prerenderRoutes";


interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
  /** Prefer `noIndex`. `noindex` kept for backward compatibility. */
  noIndex?: boolean;
  noindex?: boolean;
  noHreflang?: boolean;
  /** Prefer `schemaJson`. `jsonLd` kept for backward compatibility. */
  schemaJson?: Record<string, unknown> | Record<string, unknown>[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  lang?: string;
  hreflangOverrides?: { en: string; pl: string };
  /** Set to false to skip the auto-generated BreadcrumbList (homepages). */
  breadcrumbs?: boolean;
}

const BASE_URL = "https://jay23.com";
const DEFAULT_OG = "https://jay23.com/og-default.jpg";

const abs = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value.replace(/\/+$/, "") || value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `${BASE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
};

/** Upsert a <meta> tag identified by name or property. */
const setMeta = (kind: "name" | "property", key: string, content: string) => {
  const selector = `meta[${kind}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(kind, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  el.setAttribute("data-seo", "1");
};

const removeMeta = (kind: "name" | "property", key: string) => {
  document.head
    .querySelectorAll(`meta[${kind}="${key}"][data-seo]`)
    .forEach((el) => el.remove());
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  el.setAttribute("data-seo", "1");
};

const addAlternate = (hreflang: string, href: string) => {
  const el = document.createElement("link");
  el.setAttribute("rel", "alternate");
  el.setAttribute("hreflang", hreflang);
  el.setAttribute("href", href);
  el.setAttribute("data-seo", "1");
  document.head.appendChild(el);
};

const addJsonLd = (data: unknown) => {
  const el = document.createElement("script");
  el.setAttribute("type", "application/ld+json");
  el.setAttribute("data-seo", "1");
  el.textContent = JSON.stringify(data);
  document.head.appendChild(el);
};

const humanize = (segment: string) =>
  decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

const buildBreadcrumbs = (path: string, title: string) => {
  const segments = path.split("/").filter(Boolean);
  if (segments.length <= 1) return null;
  const [langSeg, ...rest] = segments;
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${BASE_URL}/${langSeg}`,
    },
  ];
  let acc = `/${langSeg}`;
  rest.forEach((segment, i) => {
    acc += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: i === rest.length - 1 ? title : humanize(segment),
      item: `${BASE_URL}${acc}`,
    });
  });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
};

const SEOHead = ({
  title,
  description: descriptionProp,
  canonical,
  ogImage: ogImageProp = DEFAULT_OG,
  ogImageAlt: ogImageAltProp,
  type: typeProp = "website",
  publishedAt: publishedAtProp,
  author: authorProp,
  noIndex,
  noindex,
  noHreflang: noHreflangProp = false,
  schemaJson,
  jsonLd,
  lang: langProp,
  hreflangOverrides: hreflangOverridesProp,
  breadcrumbs: breadcrumbsProp = true,

}: SEOHeadProps) => {
  const { pathname } = useLocation();

  // The registry is authoritative: when a route is listed in ROUTE_META, its
  // values win over the props so the hydrated head equals the prerendered head.
  const routeMeta = getRouteMeta(canonical || pathname);

  const effTitle = routeMeta?.title ?? title;
  const description = routeMeta?.description ?? descriptionProp;
  const type = routeMeta?.type ?? typeProp;
  const ogImage = routeMeta?.ogImage ?? ogImageProp;
  const ogImageAlt = routeMeta?.ogImageAlt ?? ogImageAltProp;
  const lang = routeMeta?.lang ?? langProp;
  const publishedAt = routeMeta?.publishedAt ?? publishedAtProp;
  const author = routeMeta?.author ?? authorProp;
  const isNoIndex = routeMeta ? !!routeMeta.noIndex : noIndex ?? noindex ?? false;
  const noHreflang = routeMeta ? !routeMeta.alternates : noHreflangProp;
  const hreflangOverrides = routeMeta?.alternates ?? hreflangOverridesProp;
  const schema = routeMeta ? buildRouteSchema(routeMeta) : schemaJson ?? jsonLd;
  const breadcrumbs = routeMeta ? false : breadcrumbsProp;

  // The brand suffix is only appended when it still fits inside Google's ~60 char limit.
  const fullTitle = withBrandSuffix(effTitle);

  const serializedSchema = schema ? JSON.stringify(schema) : "";


  useEffect(() => {
    const canonicalPath = canonical || pathname;
    const canonicalUrl = abs(canonicalPath);
    const selfLang = lang || "en";

    // Dev-time guard: fail loudly on metadata that Google would truncate.
    if (import.meta.env.DEV) {
      if (fullTitle.length > 60) {
        console.error(
          `[SEO] Title too long (${fullTitle.length}/60) on ${canonicalPath}: "${fullTitle}"`,
        );
      }
      if (description.length > 158) {
        console.error(
          `[SEO] Description too long (${description.length}/158) on ${canonicalPath}: "${description}"`,
        );
      }
    }


    // 1. Clear per-route repeatable tags so stale values never leak.
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang][data-seo]')
      .forEach((el) => el.remove());
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-seo]')
      .forEach((el) => el.remove());

    // 2. Title + html lang
    document.title = fullTitle;
    if (lang) document.documentElement.lang = lang;

    // 3. Core meta
    setMeta("name", "description", description);
    if (isNoIndex) {
      setMeta("name", "robots", "noindex,nofollow");
    } else {
      removeMeta("name", "robots");
    }

    // 4. Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", abs(ogImage));
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    if (ogImageAlt) setMeta("property", "og:image:alt", ogImageAlt);
    else removeMeta("property", "og:image:alt");
    setMeta(
      "property",
      "og:site_name",
      lang === "pl"
        ? "JAY-23 — Agencja Kickstarter, TikTok Shop, SaaS i Sales Growth"
        : "JAY-23 — Kickstarter, TikTok Shop, SaaS & Sales Growth Agency",
    );
    setMeta("property", "og:locale", lang === "pl" ? "pl_PL" : "en_US");
    setMeta("property", "og:locale:alternate", lang === "pl" ? "en_US" : "pl_PL");
    setMeta("property", "og:url", canonicalUrl);

    // 5. Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", abs(ogImage));
    if (ogImageAlt) setMeta("name", "twitter:image:alt", ogImageAlt);
    else removeMeta("name", "twitter:image:alt");

    // 6. Article meta
    if (type === "article" && publishedAt) setMeta("property", "article:published_time", publishedAt);
    else removeMeta("property", "article:published_time");
    if (author) setMeta("property", "article:author", author);
    else removeMeta("property", "article:author");

    // 7. Canonical + hreflang
    setCanonical(canonicalUrl);

    const canonicalPathOnly = canonicalPath.replace(/^https?:\/\/[^/]+/, "") || "/";
    if (!noHreflang) {
      let enUrl: string;
      let plUrl: string;
      if (hreflangOverrides) {
        enUrl = abs(hreflangOverrides.en);
        plUrl = abs(hreflangOverrides.pl);
      } else {
        const withoutLang = canonicalPathOnly.replace(/^\/(en|pl)/, "");
        enUrl = abs(`/en${withoutLang}`);
        plUrl = abs(`/pl${withoutLang}`);
      }
      addAlternate("en", enUrl);
      addAlternate("pl", plUrl);
      addAlternate("x-default", enUrl);
    }
    // No counterpart in the other language → emit no hreflang at all.
    // A self-referencing pair is worse than nothing.


    // 8. JSON-LD (per-page). The static Organization/WebSite graph in index.html
    // carries no data-seo attribute and is never touched.
    const items = serializedSchema
      ? (JSON.parse(serializedSchema) as unknown[] | unknown)
      : [];
    const list = Array.isArray(items) ? items : [items];
    list.filter(Boolean).forEach(addJsonLd);

    const hasBreadcrumb = list.some(
      (it) => (it as { "@type"?: string })?.["@type"] === "BreadcrumbList",
    );
    if (breadcrumbs && !hasBreadcrumb) {
      const crumbs = buildBreadcrumbs(canonicalPathOnly, title);
      if (crumbs) addJsonLd(crumbs);
    }
  }, [
    pathname,
    fullTitle,
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt,
    type,
    publishedAt,
    author,
    isNoIndex,
    noHreflang,
    serializedSchema,
    lang,
    hreflangOverrides?.en,
    hreflangOverrides?.pl,
    breadcrumbs,
  ]);

  return null;
};

export default SEOHead;
