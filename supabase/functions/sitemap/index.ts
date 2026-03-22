import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

const staticPages = [
  { loc: "/en", changefreq: "weekly", priority: "1.0" },
  { loc: "/en/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/en/book", changefreq: "monthly", priority: "0.7" },
  { loc: "/en/process", changefreq: "monthly", priority: "0.8" },
  { loc: "/en/faq", changefreq: "monthly", priority: "0.6" },
  { loc: "/en/about", changefreq: "monthly", priority: "0.6" },
  { loc: "/en/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/en/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/en/impressum", changefreq: "yearly", priority: "0.3" },
  { loc: "/pl", changefreq: "weekly", priority: "1.0" },
  { loc: "/pl/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/pl/book", changefreq: "monthly", priority: "0.7" },
  { loc: "/pl/faq", changefreq: "monthly", priority: "0.6" },
  { loc: "/pl/about", changefreq: "monthly", priority: "0.6" },
  { loc: "/pl/report", changefreq: "monthly", priority: "0.5" },
  { loc: "/pl/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/pl/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/pl/impressum", changefreq: "yearly", priority: "0.3" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    const [{ data: enPosts }, { data: plPosts }] = await Promise.all([
      supabase.from("blog_posts").select("slug, published_at").order("published_at", { ascending: false }),
      supabase.from("blog_posts_pl").select("slug, published_at").order("published_at", { ascending: false }),
    ]);

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

    if (enPosts) {
      for (const post of enPosts) {
        if (LEGACY_SLUGS.has(post.slug)) continue;
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

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Sitemap error:", err);
    return new Response("Error generating sitemap", { status: 500, headers: corsHeaders });
  }
});
