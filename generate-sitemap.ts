import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const SUPABASE_URL = "https://zquojuopxmvvzadwshjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdW9qdW9weG12dnphZHdzaGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU1ODksImV4cCI6MjA4ODU1MTU4OX0.Gt-5MDvJ4YtBxTeOksKlobWvKnqUEc3au9AL411Zm3k";
const BASE_URL = "https://jay23.com";

const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/process", changefreq: "monthly", priority: "0.8" },
  { loc: "/book", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/impressum", changefreq: "yearly", priority: "0.3" },
];

async function generateSitemap() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, published_at")
    .order("published_at", { ascending: false });

  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  if (posts) {
    for (const post of posts) {
      const lastmod = post.published_at
        ? post.published_at.split("T")[0]
        : today;
      xml += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  writeFileSync("dist/sitemap.xml", xml);
  console.log(`✅ Sitemap generated with ${staticPages.length + (posts?.length || 0)} URLs`);
}

generateSitemap().catch(console.error);
