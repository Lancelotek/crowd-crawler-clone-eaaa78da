/**
 * Build-time head prerendering for EVERY route.
 *
 * The values come from ONE place — src/seo/routeMeta.ts — which the runtime
 * <SEOHead /> also reads, so the static head and the hydrated head cannot drift.
 *
 * The build plugin (see vite.config.ts) clones the built index.html into
 * dist/<path>/index.html and rewrites the head with these values, so social
 * crawlers and non-JS crawlers see the real per-page head instead of the
 * static index.html defaults. The React app still hydrates normally.
 *
 * Keep this file dependency-free (relative imports only, pure data) — it is
 * imported both by the app and by the Vite config (Node context).
 */
import {
  BASE_URL,
  DEFAULT_OG,
  ROUTE_META,
  type RouteMeta,
  withBrandSuffix,
} from "./routeMeta";
import { buildSeoTitle } from "./blogSeoTitle";
import { buildFallbackBody } from "./fallbackBody";

export { BASE_URL };

export type PrerenderRoute = {
  /** URL path, no trailing slash. */
  path: string;
  lang: "en" | "pl";
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  type: "website" | "article";
  noIndex?: true;
  /**
   * Absolute URLs for hreflang alternates. Optional: pages without a
   * counterpart in the other language emit NO hreflang at all.
   */
  alternates?: { en: string; pl: string };
  publishedAt?: string;
  author?: string;
  schema: Record<string, unknown>[];
  /**
   * Per-route no-JS body: a short, faithful summary of the page's own copy,
   * injected into <div id="root"> and replaced by React on hydration.
   */
  body: string;
};

const humanize = (segment: string) =>
  decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

/** Per-page JSON-LD, derived from the same metadata the page renders. */
export const buildRouteSchema = (meta: RouteMeta): Record<string, unknown>[] => {
  const url = `${BASE_URL}${meta.path}`;
  const schema: Record<string, unknown>[] = [];

  if (meta.serviceType) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: meta.title,
      description: meta.description,
      serviceType: meta.serviceType,
      url,
      inLanguage: meta.lang,
      areaServed: "Worldwide",
      provider: { "@type": "Organization", name: "JAY-23", url: BASE_URL },
    });
  }

  if (meta.faqs?.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  if (meta.type === "article") {
    schema.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.title,
      description: meta.description,
      image: meta.ogImage ?? DEFAULT_OG,
      inLanguage: meta.lang,
      mainEntityOfPage: url,
      url,
      datePublished: meta.publishedAt,
      dateModified: meta.publishedAt,
      author: { "@type": "Person", name: meta.author ?? "Marek Cieśla" },
      publisher: { "@type": "Organization", name: "JAY-23", url: BASE_URL },
    });
  }

  if (!meta.homepage) {
    const segments = meta.path.split("/").filter(Boolean);
    const [langSeg, ...rest] = segments;
    const items: Record<string, unknown>[] = [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${langSeg}` },
    ];
    let acc = `/${langSeg}`;
    rest.forEach((segment, i) => {
      acc += `/${segment}`;
      items.push({
        "@type": "ListItem",
        position: i + 2,
        name:
          i === rest.length - 1 ? meta.breadcrumbName ?? meta.title : humanize(segment),
        item: `${BASE_URL}${acc}`,
      });
    });
    if (items.length > 1) {
      schema.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      });
    }
  }

  return schema;
};

export const toPrerenderRoute = (meta: RouteMeta, body?: string): PrerenderRoute => ({
  path: meta.path,
  lang: meta.lang,
  title: withBrandSuffix(meta.title),
  description: meta.description,
  ogTitle: withBrandSuffix(meta.title),
  ogDescription: meta.description,
  ogImage: meta.ogImage ?? DEFAULT_OG,
  ogImageAlt: meta.ogImageAlt ?? meta.title,
  type: meta.type ?? "website",
  ...(meta.noIndex ? { noIndex: true as const } : {}),
  ...(meta.alternates ? { alternates: meta.alternates } : {}),
  ...(meta.publishedAt ? { publishedAt: meta.publishedAt } : {}),
  ...(meta.author ? { author: meta.author } : {}),
  schema: buildRouteSchema(meta),
  body: body ?? buildFallbackBody(meta),
});

/** Static routes. Blog posts are appended at build time (see vite.config.ts). */
export const PRERENDER_ROUTES: PrerenderRoute[] = ROUTE_META.map(toPrerenderRoute);

export type BlogRow = {
  slug: string;
  title: string;
  excerpt?: string | null;
  cover_image?: string | null;
  published_at?: string | null;
  author?: string | null;
  counterpart_slug?: string | null;
};

/** Maps a blog row onto the same RouteMeta shape the static routes use. */
export const blogRouteMeta = (row: BlogRow, lang: "en" | "pl"): RouteMeta => {
  const other = lang === "en" ? "pl" : "en";
  const image = row.cover_image
    ? row.cover_image.startsWith("http")
      ? row.cover_image
      : `${BASE_URL}${row.cover_image.startsWith("/") ? "" : "/"}${row.cover_image}`
    : DEFAULT_OG;
  return {
    path: `/${lang}/blog/${row.slug}`,
    lang,
    type: "article",
    title: buildSeoTitle(row.title, row.slug),
    description:
      row.excerpt ||
      (lang === "pl"
        ? `Przeczytaj "${row.title}" na blogu MVA Framework.`
        : `Read "${row.title}" on the MVA Framework blog.`),
    ogImage: image,
    ogImageAlt: row.title,
    breadcrumbName: row.title,
    publishedAt: row.published_at ?? undefined,
    author: row.author ?? "JAY-23",
    ...(row.counterpart_slug
      ? {
          alternates: {
            en:
              lang === "en"
                ? `${BASE_URL}/en/blog/${row.slug}`
                : `${BASE_URL}/en/blog/${row.counterpart_slug}`,
            pl:
              lang === "pl"
                ? `${BASE_URL}/pl/blog/${row.slug}`
                : `${BASE_URL}/pl/blog/${row.counterpart_slug}`,
          } as { en: string; pl: string },
        }
      : {}),
  };
};

export const getPrerenderRoute = (path: string) =>
  PRERENDER_ROUTES.find((r) => r.path === path.replace(/\/+$/, ""));

/** Builds the head fragment for a pre-rendered route. */
export const buildHeadTags = (route: PrerenderRoute) => {
  const url = `${BASE_URL}${route.path}`;
  const esc = (v: string) =>
    v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" data-seo="1" content="${esc(route.description)}">`,
    `<link rel="canonical" data-seo="1" href="${url}">`,
  ];

  if (route.noIndex) tags.push(`<meta name="robots" data-seo="1" content="noindex,nofollow">`);

  if (route.alternates) {
    tags.push(
      `<link rel="alternate" data-seo="1" hreflang="en" href="${route.alternates.en}">`,
      `<link rel="alternate" data-seo="1" hreflang="pl" href="${route.alternates.pl}">`,
      `<link rel="alternate" data-seo="1" hreflang="x-default" href="${route.alternates.en}">`,
    );
  }

  tags.push(
    `<meta property="og:title" data-seo="1" content="${esc(route.ogTitle)}">`,
    `<meta property="og:description" data-seo="1" content="${esc(route.ogDescription)}">`,
    `<meta property="og:type" data-seo="1" content="${route.type}">`,
    `<meta property="og:url" data-seo="1" content="${url}">`,
    `<meta property="og:image" data-seo="1" content="${route.ogImage}">`,
    `<meta property="og:image:width" data-seo="1" content="1200">`,
    `<meta property="og:image:height" data-seo="1" content="630">`,
    `<meta property="og:image:alt" data-seo="1" content="${esc(route.ogImageAlt)}">`,
    `<meta property="og:locale" data-seo="1" content="${route.lang === "pl" ? "pl_PL" : "en_US"}">`,
    `<meta name="twitter:card" data-seo="1" content="summary_large_image">`,
    `<meta name="twitter:title" data-seo="1" content="${esc(route.ogTitle)}">`,
    `<meta name="twitter:description" data-seo="1" content="${esc(route.ogDescription)}">`,
    `<meta name="twitter:image" data-seo="1" content="${route.ogImage}">`,
    `<meta name="twitter:image:alt" data-seo="1" content="${esc(route.ogImageAlt)}">`,
  );

  if (route.type === "article" && route.publishedAt)
    tags.push(`<meta property="article:published_time" data-seo="1" content="${route.publishedAt}">`);
  if (route.author) tags.push(`<meta property="article:author" data-seo="1" content="${esc(route.author)}">`);

  for (const item of route.schema) {
    tags.push(
      `<script type="application/ld+json" data-seo="1">${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`,
    );
  }

  return tags.join("\n    ");
};

/**
 * Rewrites a built index.html so the head describes `route`:
 * strips the static defaults that would otherwise duplicate, then injects.
 */
export const renderPrerenderedHtml = (indexHtml: string, route: PrerenderRoute) => {
  let html = indexHtml
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/i, "")
    .replace(/<meta\s+property="og:(title|description|image|url|type)"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:(card|title|description|image)"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");

  html = html.replace(/<html([^>]*)lang="[^"]*"/i, `<html$1lang="${route.lang}"`);
  html = html.replace(/<\/head>/i, `  ${buildHeadTags(route)}\n  </head>`);

  // Swap the generic homepage fallback for this route's own no-JS summary.
  return html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">\n      ${route.body}\n    </div>`,
  );
};
