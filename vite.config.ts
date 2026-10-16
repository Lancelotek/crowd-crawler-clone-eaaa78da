import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import {
  PRERENDER_ROUTES,
  getPrerenderRoute,
  renderPrerenderedHtml,
  blogRouteMeta,
  toPrerenderRoute,
  renderEntryDocuments,
  type BlogRow,
  type PrerenderRoute,
} from "./src/seo/prerenderRoutes";
import { blogFallbackBody, bodyToPlainText } from "./src/seo/fallbackBody";
import { findMetaLengthViolations, ROUTE_META, BASE_URL } from "./src/seo/routeMeta";

const SUPABASE_URL = "https://zquojuopxmvvzadwshjx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdW9qdW9weG12dnphZHdzaGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU1ODksImV4cCI6MjA4ODU1MTU4OX0.Gt-5MDvJ4YtBxTeOksKlobWvKnqUEc3au9AL411Zm3k";

/** Blog posts retired from the sitemap — never prerendered. */
const legacySlugs = async (): Promise<Set<string>> => {
  const mod = await import("./src/seo/legacySlugs");
  return mod.LEGACY_SLUGS;
};

type BlogEntry = { row: BlogRow; lang: "en" | "pl" };
const blogEntries: BlogEntry[] = [];

const fetchBlogRoutes = async (): Promise<PrerenderRoute[]> => {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const legacy = await legacySlugs();
  const columns =
    "slug, title, excerpt, content, cover_image, published_at, author, counterpart_slug";
  const [{ data: en }, { data: pl }] = await Promise.all([
    supabase.from("blog_posts").select(columns),
    supabase.from("blog_posts_pl").select(columns),
  ]);
  const rows: PrerenderRoute[] = [];
  for (const row of (en ?? []) as BlogRow[]) {
    if (legacy.has(row.slug)) continue;
    blogEntries.push({ row, lang: "en" });
    rows.push(toPrerenderRoute(blogRouteMeta(row, "en"), blogFallbackBody(row, "en")));
  }
  for (const row of (pl ?? []) as BlogRow[]) {
    if (legacy.has(row.slug)) continue;
    blogEntries.push({ row, lang: "pl" });
    rows.push(toPrerenderRoute(blogRouteMeta(row, "pl"), blogFallbackBody(row, "pl")));
  }
  return rows;
};

/** Every <loc> path found in the generated sitemaps. */
const sitemapPaths = () => {
  const paths = new Set<string>();
  for (const file of ["sitemap-en.xml", "sitemap-pl.xml"]) {
    const p = path.resolve(__dirname, "public", file);
    if (!fs.existsSync(p)) continue;
    const xml = fs.readFileSync(p, "utf-8");
    for (const m of xml.matchAll(/<loc>https:\/\/jay23\.com([^<]*)<\/loc>/g)) {
      paths.add(m[1].replace(/\/+$/, "") || "/");
    }
  }
  return paths;
};


/* ─── Generated AI + feed artefacts ─────────────────────────── */
const xmlEsc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const sectionOf = (route: PrerenderRoute): string => {
  const p = route.path;
  if (/-alternative$/.test(p)) return "Comparisons";
  if (/\/blog\//.test(p)) return route.lang === "pl" ? "Blog PL" : "Blog EN";
  if (/(privacy-policy|terms-of-service|impressum)$/.test(p)) return "Legal";
  if (/(about|faq|process|packages|book|quiz|blog)$/.test(p) || /^\/(en|pl)$/.test(p))
    return "Company";
  return "Services";
};

const SECTION_ORDER = ["Services", "Comparisons", "Company", "Blog EN", "Blog PL", "Legal"];

const indexableRoutes = (routes: PrerenderRoute[]) =>
  routes.filter((r) => !r.robots && !r.noIndex && !r.path.startsWith("/404") && r.path !== "/" &&
    !ROUTE_META.some((m) => m.path === r.path && m.alias));

const writeLlmsFiles = (dist: string, routes: PrerenderRoute[]) => {
  const today = new Date().toISOString().split("T")[0];
  const list = indexableRoutes(routes);
  const grouped = new Map<string, PrerenderRoute[]>();
  for (const r of list) {
    const key = sectionOf(r);
    grouped.set(key, [...(grouped.get(key) ?? []), r]);
  }

  const header = [
    "# JAY-23 — MVA Framework",
    "",
    `> Updated: ${today}`,
    "> Pre-launch growth agency (JAY23 LLC). The 90-day MVA Framework for Kickstarter,",
    "> Gamefound, TikTok Shop, eCommerce and SaaS launches. 46 campaigns, $1.2M+ raised.",
    "> Contact: hello@jay23.com — Book a call: https://jay23.com/en/book",
    "",
    "## Pages",
    "",
  ];

  const indexLines: string[] = [];
  for (const section of SECTION_ORDER) {
    const rows = grouped.get(section);
    if (!rows?.length) continue;
    indexLines.push(`### ${section}`, "");
    for (const r of rows) {
      indexLines.push(`- [${r.title}](${BASE_URL}${r.path}): ${r.description}`);
    }
    indexLines.push("");
  }

  fs.writeFileSync(path.join(dist, "llms.txt"), [...header, ...indexLines].join("\n"));

  const bodies: string[] = ["## Full content", ""];
  for (const r of list) {
    const section = sectionOf(r);
    if (section === "Legal" || section === "Company") continue;
    bodies.push(`---`, ``, `# ${r.title}`, `URL: ${BASE_URL}${r.path}`, ``, bodyToPlainText(r.body), ``);
  }
  fs.writeFileSync(
    path.join(dist, "llms-full.txt"),
    [...header, ...indexLines, ...bodies].join("\n"),
  );
  return list.length;
};

const writeFeeds = (dist: string, entries: BlogEntry[]) => {
  const now = new Date().toUTCString();
  const build = (lang: "en" | "pl", file: string, title: string, description: string) => {
    const items = entries
      .filter((e) => e.lang === lang)
      .sort(
        (a, b) =>
          new Date(b.row.published_at ?? 0).getTime() - new Date(a.row.published_at ?? 0).getTime(),
      )
      .map(({ row }) => {
        const url = `${BASE_URL}/${lang}/blog/${row.slug}`;
        const pub = row.published_at ? new Date(row.published_at).toUTCString() : now;
        return [
          "    <item>",
          `      <title>${xmlEsc(row.title)}</title>`,
          `      <link>${url}</link>`,
          `      <guid isPermaLink="true">${url}</guid>`,
          `      <pubDate>${pub}</pubDate>`,
          `      <description>${xmlEsc(row.excerpt ?? row.title)}</description>`,
          "    </item>",
        ].join("\n");
      });
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
      "  <channel>",
      `    <title>${xmlEsc(title)}</title>`,
      `    <link>${BASE_URL}/${lang}/blog</link>`,
      `    <description>${xmlEsc(description)}</description>`,
      `    <language>${lang === "pl" ? "pl-PL" : "en-US"}</language>`,
      `    <lastBuildDate>${now}</lastBuildDate>`,
      `    <atom:link href="${BASE_URL}/${file}" rel="self" type="application/rss+xml" />`,
      ...items,
      "  </channel>",
      "</rss>",
    ].join("\n");
    fs.writeFileSync(path.join(dist, file), xml);
    return items.length;
  };
  const en = build("en", "rss.xml", "Articles by JAY-23", "Pre-launch marketing, crowdfunding and MVA Framework articles.");
  const pl = build("pl", "rss-pl.xml", "Artykuły JAY-23", "Marketing prelaunch, crowdfunding i MVA Framework.");
  return { en, pl };
};

/**
 * Emits dist/<route>/index.html copies of the built shell with a fully
 * rewritten <head> per route, so social + non-JS crawlers see real metadata.
 * In dev it does the same on the fly for parity/verification.
 */
const prerenderHead = (): Plugin => ({
  name: "jay23-prerender-head",
  apply: () => true,
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = (req.url || "").split("?")[0];
      const route = getPrerenderRoute(url);
      if (!route) return next();
      try {
        const raw = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        const transformed = await server.transformIndexHtml(url, raw);
        res.setHeader("Content-Type", "text/html");
        res.end(renderPrerenderedHtml(transformed, route));
      } catch {
        next();
      }
    });
  },
  async closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const indexPath = path.join(dist, "index.html");
    if (!fs.existsSync(indexPath)) return;
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    let blogRoutes: PrerenderRoute[] = [];
    try {
      blogRoutes = await fetchBlogRoutes();
    } catch (err) {
      throw new Error(
        `[prerender] failed to fetch blog posts for prerendering: ${(err as Error).message}`,
      );
    }

    const routes = [...PRERENDER_ROUTES, ...blogRoutes];

    // Build-time assertion: nothing Google would truncate ships.
    const tooLong = [
      ...findMetaLengthViolations(),
      ...blogRoutes.flatMap((r) => {
        const out: string[] = [];
        if ([...r.title].length > 60) out.push(`${r.path} — title ${[...r.title].length}/60`);
        if ([...r.description].length > 158)
          out.push(`${r.path} — description ${[...r.description].length}/158`);
        return out;
      }),
    ];
    if (tooLong.length) {
      throw new Error(`[prerender] metadata too long:\n  ${tooLong.join("\n  ")}`);
    }

    for (const route of routes) {
      const dir = path.join(dist, route.path.replace(/^\//, ""));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), renderPrerenderedHtml(indexHtml, route));
    }

    // Guard: every sitemap URL must have a prerendered head.
    const covered = new Set(routes.map((r) => r.path));
    const missing = [...sitemapPaths()].filter((p) => !covered.has(p));
    if (missing.length) {
      throw new Error(
        `[prerender] ${missing.length} sitemap URL(s) have no prerender entry:\n  ${missing.join("\n  ")}\n` +
          `Add them to src/seo/routeMeta.ts (or the blog source) and rebuild.`,
      );
    }
    // The host serves index.html at / and for SPA fallbacks; keep 404 separate.
    for (const [file, html] of Object.entries(renderEntryDocuments(indexHtml))) {
      fs.writeFileSync(path.join(dist, file), html);
    }

    const llmsCount = writeLlmsFiles(dist, routes);
    const feeds = writeFeeds(dist, blogEntries);

    console.log(
      `✅ prerendered ${routes.length} routes (${blogRoutes.length} blog posts), ` +
        `llms.txt with ${llmsCount} pages, rss.xml ${feeds.en} items, rss-pl.xml ${feeds.pl} items`,
    );
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), prerenderHead()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
