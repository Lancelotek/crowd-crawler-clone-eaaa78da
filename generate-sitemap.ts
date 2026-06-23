import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const SUPABASE_URL = "https://zquojuopxmvvzadwshjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdW9qdW9weG12dnphZHdzaGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU1ODksImV4cCI6MjA4ODU1MTU4OX0.Gt-5MDvJ4YtBxTeOksKlobWvKnqUEc3au9AL411Zm3k";
const BASE_URL = "https://jay23.com";

const LEGACY_SLUGS = new Set([
  "climbstation-review-17-reasons-why-its-the-future-of-indoor-climbing",
  "unlock-customer-needs-maximize-product-impact-discovery-roxart",
  "buying-an-electronic-chess-board-a-comprehensive-comparison",
  "motorhead-3d-collection---official-self-crowdfunded-tribute-for-fans-collectors-and-3d-print-enthusiasts",
  "kuduare-offline-reflex-trainer-gamers-esports-kickstarter",
  "twistpod-the-ultimate-8-in-1-outdoor-station-redefining-adventure-gear-kickstarter",
  "no-scroll-journal---a-new-kickstarter-project-that-helps-you-reclaim-time-and-focus",
  "top-meta-quest-2-accessories-for-2023",
  "best-fire-extinguishers-of-2022-crowdfunding-zone",
  "reversible-zip-hoodies-as-one-of-the-best-multifunctional-clothes",
  "how-smart-is-a-smart-jacket",
  "anxious-about-money-change-worries-to-financial-action-plan",
  "glaze-a-superhero-prosthetic-arm",
  "the-problem-of-an-open-drink-in-a-can",
  "safety-is-in-fashion-this-hat-replaces-a-helmet",
  "the-best-travel-jacket-what-should-it-have",
  "smart-outfit-in-2021-what-is-a-reversible-hoodie",
  "woolet-classic-2-0-review-the-ultra-slim-trackable-wallet",
]);

type Page = { loc: string; changefreq: string; priority: string };

const enStaticPages: Page[] = [
  { loc: "/en", changefreq: "weekly", priority: "1.0" },
  { loc: "/en/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/en/book", changefreq: "monthly", priority: "0.7" },
  { loc: "/en/process", changefreq: "monthly", priority: "0.8" },
  { loc: "/en/faq", changefreq: "monthly", priority: "0.6" },
  { loc: "/en/about", changefreq: "monthly", priority: "0.6" },
  { loc: "/en/ecommerce-prelaunch-agency", changefreq: "monthly", priority: "0.8" },
  { loc: "/en/packages", changefreq: "monthly", priority: "0.7" },
  { loc: "/en/saas-prelaunch-marketing-agency", changefreq: "monthly", priority: "0.8" },
  { loc: "/en/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/en/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/en/impressum", changefreq: "yearly", priority: "0.3" },
];

const plStaticPages: Page[] = [
  { loc: "/pl", changefreq: "weekly", priority: "1.0" },
  { loc: "/pl/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/pl/book", changefreq: "monthly", priority: "0.7" },
  { loc: "/pl/process", changefreq: "monthly", priority: "0.8" },
  { loc: "/pl/faq", changefreq: "monthly", priority: "0.6" },
  { loc: "/pl/about", changefreq: "monthly", priority: "0.6" },
  { loc: "/pl/report", changefreq: "monthly", priority: "0.5" },
  { loc: "/pl/agencja-prelaunch-ecommerce", changefreq: "monthly", priority: "0.8" },
  { loc: "/pl/packages", changefreq: "monthly", priority: "0.7" },
  { loc: "/pl/agencja-prelaunch-saas", changefreq: "monthly", priority: "0.8" },
  { loc: "/pl/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/pl/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/pl/impressum", changefreq: "yearly", priority: "0.3" },
];

function buildUrlset(entries: { loc: string; lastmod: string; changefreq: string; priority: string }[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (const e of entries) {
    xml += `
  <url>
    <loc>${BASE_URL}${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;
  }
  xml += `
</urlset>`;
  return xml;
}

async function generateSitemap() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const [{ data: enPosts }, { data: plPosts }] = await Promise.all([
    supabase.from("blog_posts").select("slug, published_at").order("published_at", { ascending: false }),
    supabase.from("blog_posts_pl").select("slug, published_at").order("published_at", { ascending: false }),
  ]);

  const today = new Date().toISOString().split("T")[0];

  // EN entries
  const enEntries = [
    ...enStaticPages.map((p) => ({ loc: p.loc, lastmod: today, changefreq: p.changefreq, priority: p.priority })),
    ...((enPosts ?? [])
      .filter((p) => !LEGACY_SLUGS.has(p.slug))
      .map((p) => ({
        loc: `/en/blog/${p.slug}`,
        lastmod: p.published_at ? p.published_at.split("T")[0] : today,
        changefreq: "monthly",
        priority: "0.6",
      }))),
  ];

  // PL entries
  const plEntries = [
    ...plStaticPages.map((p) => ({ loc: p.loc, lastmod: today, changefreq: p.changefreq, priority: p.priority })),
    ...((plPosts ?? []).map((p) => ({
      loc: `/pl/blog/${p.slug}`,
      lastmod: p.published_at ? p.published_at.split("T")[0] : today,
      changefreq: "monthly",
      priority: "0.6",
    }))),
  ];

  const enXml = buildUrlset(enEntries);
  const plXml = buildUrlset(plEntries);

  // Combined sitemap (kept for backward compatibility)
  const combinedXml = buildUrlset([...enEntries, ...plEntries]);

  // Sitemap index
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-en.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-pl.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Write to public/ so the dev server and preview serve them at /sitemap*.xml,
  // and Vite will copy them into dist/ at build time.
  writeFileSync("public/sitemap-en.xml", enXml);
  writeFileSync("public/sitemap-pl.xml", plXml);
  writeFileSync("public/sitemap_index.xml", indexXml);
  writeFileSync("public/sitemap.xml", combinedXml);

  console.log(
    `✅ Sitemaps generated: sitemap_index.xml + sitemap-en.xml (${enEntries.length} URLs) + sitemap-pl.xml (${plEntries.length} URLs). Combined sitemap.xml kept for backward compatibility (${enEntries.length + plEntries.length} URLs).`
  );
}

generateSitemap().catch(console.error);
