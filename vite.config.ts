import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { PRERENDER_ROUTES, getPrerenderRoute, renderPrerenderedHtml } from "./src/seo/prerenderRoutes";

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
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const indexPath = path.join(dist, "index.html");
    if (!fs.existsSync(indexPath)) return;
    const indexHtml = fs.readFileSync(indexPath, "utf-8");
    for (const route of PRERENDER_ROUTES) {
      const dir = path.join(dist, route.path.replace(/^\//, ""));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), renderPrerenderedHtml(indexHtml, route));
    }
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
