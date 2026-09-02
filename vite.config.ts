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
  type BlogRow,
  type PrerenderRoute,
} from "./src/seo/prerenderRoutes";
import { blogFallbackBody } from "./src/seo/fallbackBody";

const SUPABASE_URL = "https://zquojuopxmvvzadwshjx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdW9qdW9weG12dnphZHdzaGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU1ODksImV4cCI6MjA4ODU1MTU4OX0.Gt-5MDvJ4YtBxTeOksKlobWvKnqUEc3au9AL411Zm3k";

/** Blog posts retired from the sitemap — never prerendered. */
const legacySlugs = async (): Promise<Set<string>> => {
  const mod = await import("./src/seo/legacySlugs");
  return mod.LEGACY_SLUGS;
};

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
    rows.push(toPrerenderRoute(blogRouteMeta(row, "en"), blogFallbackBody(row, "en")));
  }
  for (const row of (pl ?? []) as BlogRow[]) {
    if (legacy.has(row.slug)) continue;
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
    console.log(`✅ prerendered ${routes.length} routes (${blogRoutes.length} blog posts)`);
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
