/**
 * Single source of truth for routes that get a fully pre-rendered <head> at build time.
 *
 * The build plugin (see vite.config.ts) clones the built index.html into
 * dist/<path>/index.html and rewrites the head with these values, so social
 * crawlers and non-JS crawlers see the real per-page head instead of the
 * static index.html defaults. The React app still hydrates normally.
 *
 * Keep this file dependency-free — it is imported both by the app and by the
 * Vite config (Node context).
 */
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
  /** Absolute URLs for hreflang alternates. */
  alternates: { en: string; pl: string };
};

export const BASE_URL = "https://jay23.com";

export const PRERENDER_ROUTES: PrerenderRoute[] = [
  {
    path: "/pl/click2pack",
    lang: "pl",
    title: "click2pack — commerce dla twórców | katalog i sklepy",
    description:
      "Katalog produktów wielu dostawców, sieć twórców i system, który obsługuje zamówienia z transmisji, filmów i sklepów twórców. Beauty na start.",
    ogTitle: "click2pack — commerce dla twórców",
    ogDescription: "Jeden katalog. Sieć twórców. Każdy sprzedaje po swojemu.",
    ogImage: `${BASE_URL}/og/click2pack.jpg`,
    ogImageAlt: "click2pack — commerce dla twórców",
    alternates: { en: `${BASE_URL}/en/click2pack`, pl: `${BASE_URL}/pl/click2pack` },
  },
  {
    path: "/en/click2pack",
    lang: "en",
    title: "click2pack — creator commerce catalogue & storefronts",
    description:
      "A multi-supplier product catalogue, a network of creators and one system handling orders from streams, videos and creator storefronts. Starting with beauty.",
    ogTitle: "click2pack — creator commerce",
    ogDescription: "One catalogue. A network of creators. Each one sells their own way.",
    ogImage: `${BASE_URL}/og/click2pack.jpg`,
    ogImageAlt: "click2pack — creator commerce",
    alternates: { en: `${BASE_URL}/en/click2pack`, pl: `${BASE_URL}/pl/click2pack` },
  },
];

export const getPrerenderRoute = (path: string) =>
  PRERENDER_ROUTES.find((r) => r.path === path.replace(/\/+$/, ""));

/** Builds the head fragment for a pre-rendered route. */
export const buildHeadTags = (route: PrerenderRoute) => {
  const url = `${BASE_URL}${route.path}`;
  const esc = (v: string) =>
    v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" hreflang="en" href="${route.alternates.en}">`,
    `<link rel="alternate" hreflang="pl" href="${route.alternates.pl}">`,
    `<link rel="alternate" hreflang="x-default" href="${route.alternates.en}">`,
    `<meta property="og:title" content="${esc(route.ogTitle)}">`,
    `<meta property="og:description" content="${esc(route.ogDescription)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${route.ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(route.ogImageAlt)}">`,
    `<meta property="og:locale" content="${route.lang === "pl" ? "pl_PL" : "en_US"}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(route.ogTitle)}">`,
    `<meta name="twitter:description" content="${esc(route.ogDescription)}">`,
    `<meta name="twitter:image" content="${route.ogImage}">`,
    `<meta name="twitter:image:alt" content="${esc(route.ogImageAlt)}">`,
  ].join("\n    ");
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
  return html.replace(/<\/head>/i, `  ${buildHeadTags(route)}\n  </head>`);
};
