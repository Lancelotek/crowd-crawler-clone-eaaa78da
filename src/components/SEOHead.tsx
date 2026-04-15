import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
  noindex?: boolean;
  noHreflang?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  lang?: string;
  hreflangOverrides?: { en: string; pl: string };
}

const BASE_URL = "https://jay23.com";
const DEFAULT_OG = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c643dc2e-a0ce-4c0b-a6d0-862a393851b2/id-preview-ad86e95c--f7ebc2bd-7b48-4d18-bace-faa12c1a5096.lovable.app-1771157652360.png";

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string, attrs?: Record<string, string>) => {
  const selector = attrs
    ? `link[rel="${rel}"]${Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join("")}`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const clearHreflang = () => {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
};

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  type = "website",
  publishedAt,
  author,
  noindex = false,
  noHreflang = false,
  jsonLd,
  lang,
  hreflangOverrides,
}: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = title.includes("MVA") || title.includes("JAY-23") ? title : `${title} | MVA Framework by JAY-23`;
    document.title = fullTitle;

    if (lang) {
      document.documentElement.lang = lang;
    }

    setMeta("name", "description", description);
    if (noindex) {
      setMeta("name", "robots", "noindex, follow");
    } else {
      setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:site_name", "JAY-23 — MVA Framework");
    setMeta("property", "og:locale", lang === "pl" ? "pl_PL" : "en_US");
    setMeta("property", "og:url", canonical ? `${BASE_URL}${canonical}` : BASE_URL);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    if (type === "article" && publishedAt) {
      setMeta("property", "article:published_time", publishedAt);
    }
    if (author) {
      setMeta("property", "article:author", author);
    }

    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
    if (canonicalUrl) {
      setLink("canonical", canonicalUrl);
    }

    // Hreflang
    clearHreflang();
    if (canonical && !noHreflang) {
      let enUrl: string;
      let plUrl: string;

      if (hreflangOverrides) {
        enUrl = `${BASE_URL}${hreflangOverrides.en}`;
        plUrl = `${BASE_URL}${hreflangOverrides.pl}`;
      } else {
        const pathWithoutLang = canonical.replace(/^\/(en|pl)/, "");
        enUrl = `${BASE_URL}/en${pathWithoutLang}`;
        plUrl = `${BASE_URL}/pl${pathWithoutLang}`;
      }

      setLink("alternate", enUrl, { hreflang: "en" });
      setLink("alternate", plUrl, { hreflang: "pl" });
      setLink("alternate", enUrl, { hreflang: "x-default" });
    } else if (canonical && noHreflang) {
      // Self-referencing hreflang only (for pages without counterpart)
      const selfUrl = `${BASE_URL}${canonical}`;
      const selfLang = lang || "en";
      setLink("alternate", selfUrl, { hreflang: selfLang });
      setLink("alternate", selfUrl, { hreflang: "x-default" });
    }

    // JSON-LD
    document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item, i) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    // Organization Schema is now per-page (homepage only) via jsonLd prop

    return () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
      clearHreflang();
    };
  }, [title, description, canonical, ogImage, type, publishedAt, author, noindex, noHreflang, jsonLd, lang, hreflangOverrides]);

  return null;
};

export default SEOHead;
