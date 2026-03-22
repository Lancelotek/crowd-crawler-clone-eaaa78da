import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const SUPABASE_URL = "https://zquojuopxmvvzadwshjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdW9qdW9weG12dnphZHdzaGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU1ODksImV4cCI6MjA4ODU1MTU4OX0.Gt-5MDvJ4YtBxTeOksKlobWvKnqUEc3au9AL411Zm3k";
const BASE_URL = "https://jay23.com";

const staticPages = [
  // EN pages
  { loc: "/en", changefreq: "weekly", priority: "1.0" },
  { loc: "/en/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/en/book", changefreq: "monthly", priority: "0.7" },
  { loc: "/en/process", changefreq: "monthly", priority: "0.8" },
  { loc: "/en/faq", changefreq: "monthly", priority: "0.6" },
  { loc: "/en/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/en/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/en/impressum", changefreq: "yearly", priority: "0.3" },
  // PL pages
  { loc: "/pl", changefreq: "weekly", priority: "1.0" },
  { loc: "/pl/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/pl/book", changefreq: "monthly", priority: "0.7" },
  { loc: "/pl/faq", changefreq: "monthly", priority: "0.6" },
  { loc: "/pl/report", changefreq: "monthly", priority: "0.5" },
  { loc: "/pl/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/pl/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/pl/impressum", changefreq: "yearly", priority: "0.3" },
];

async function generateSitemap() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const [{ data: enPosts }, { data: plPosts }] = await Promise.all([
    supabase.from("blog_posts").select("slug, published_at").order("published_at", { ascending: false }),
    supabase.from("blog_posts_pl").select("slug, published_at").order("published_at", { ascending: false }),
  ]);

  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  if (enPosts) {
    for (const post of enPosts) {
      const lastmod = post.published_at ? post.published_at.split("T")[0] : today;
      xml += `
  <url>
    <loc>${BASE_URL}/en/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
  }

  if (plPosts) {
    for (const post of plPosts) {
      const lastmod = post.published_at ? post.published_at.split("T")[0] : today;
      xml += `
  <url>
    <loc>${BASE_URL}/pl/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  writeFileSync("dist/sitemap.xml", xml);
  const totalUrls = staticPages.length + (enPosts?.length || 0) + (plPosts?.length || 0);
  console.log(`✅ Sitemap generated with ${totalUrls} URLs`);
}

generateSitemap().catch(console.error);
