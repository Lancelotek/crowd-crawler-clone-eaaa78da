import { bodyToPlainText } from "./fallbackBody";

export const mainWordCount = (body: string): number => {
  const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const text = bodyToPlainText(main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ""));
  return text.split(/\s+/u).filter(Boolean).length;
};

type BodyRoute = { path: string; body: string; noIndex?: boolean; robots?: string };
export const findShortSitemapBodies = (routes: BodyRoute[], sitemap: Set<string>): { path: string; words: number }[] =>
  routes.filter(route => sitemap.has(route.path) && !route.noIndex && !route.robots?.includes("noindex"))
    .map(route => ({ path: route.path, words: mainWordCount(route.body) }))
    .filter(route => route.words < 250);

export const assertSitemapBodyWords = (routes: BodyRoute[], sitemap: Set<string>) => {
  const short = findShortSitemapBodies(routes, sitemap);
  if (short.length) throw new Error(`[prerender] sitemap bodies below 250 words inside <main>:\n${short.map(r => `  ${r.path}: ${r.words}/250`).join("\n")}`);
};