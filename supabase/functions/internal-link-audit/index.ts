import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const HOST = 'https://jay23.com';

// Footer links (mirrors src/components/mva/FooterSection.tsx). Update when footer changes.
const FOOTER_EN = [
  '/en', '/en/blog', '/en/quiz', '/en/process', '/en/packages', '/en/founder-influencer',
  '/en/book', '/en/faq', '/en/about',
  '/en/privacy-policy', '/en/terms-of-service', '/en/impressum',
  '/en/ecommerce-prelaunch-agency', '/en/saas-prelaunch-marketing-agency', '/en/tiktok-shop-agency',
  '/en/kickstarter-agency', '/en/kickstarter-marketing-agency', '/en/crowdfunding-agency',
  '/en/product-launch-agency', '/en/gamefound', '/en/click2pack',
  '/en/launchboom-alternative', '/en/jellop-alternative', '/en/agency-2-0-alternative',
  '/en/blog/kickstarter-pre-launch-page-12-elements',
  '/en/blog/how-to-launch-kickstarter-campaign-2025-complete-guide',
  '/en/blog/hardware-startup-marketing-strategy-pre-launch',
  '/en/blog/prelaunch-strategy-waitlist-conversion-framework',
  '/en/blog/product-launch-strategy-90-day-framework',
];
const FOOTER_PL = [
  '/pl', '/pl/blog', '/pl/quiz', '/pl/process', '/pl/packages', '/pl/founder-influencer',
  '/pl/book', '/pl/faq', '/pl/about',
  '/pl/privacy-policy', '/pl/terms-of-service', '/pl/impressum',
  '/pl/agencja-prelaunch-ecommerce', '/pl/agencja-prelaunch-saas', '/pl/tiktok-shop-agency',
  '/pl/click2pack',
];

// Homepage links (Index.tsx sections + main CTAs). Conservative snapshot.
const HOMEPAGE_EN = ['/en/quiz', '/en/book', '/en/blog', '/en/process', '/en/packages', '/en/about'];
const HOMEPAGE_PL = ['/pl/quiz', '/pl/book', '/pl/blog', '/pl/process', '/pl/packages', '/pl/about'];

// Blog index page (/en/blog, /pl/blog) links to every blog post automatically — treated separately.

async function fetchSitemap(url: string): Promise<string[]> {
  try {
    const r = await fetch(url);
    if (!r.ok) return [];
    const text = await r.text();
    const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return locs.map((u) => u.replace(HOST, '')).filter((p) => p.startsWith('/'));
  } catch { return []; }
}

function extractInternalLinks(html: string): string[] {
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const out = new Set<string>();
  for (let h of hrefs) {
    if (h.startsWith(HOST)) h = h.slice(HOST.length);
    if (!h.startsWith('/')) continue;
    // strip hash & query
    h = h.split('#')[0].split('?')[0].replace(/\/$/, '');
    if (!h) continue;
    if (/^\/(en|pl)(\/|$)/.test(h)) out.add(h);
  }
  return [...out];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const [urlsEn, urlsPl, blogEn, blogPl] = await Promise.all([
      fetchSitemap(`${HOST}/sitemap-en.xml`),
      fetchSitemap(`${HOST}/sitemap-pl.xml`),
      supabase.from('blog_posts').select('slug, content'),
      supabase.from('blog_posts_pl').select('slug, content'),
    ]);

    const allUrls = [...new Set([...urlsEn, ...urlsPl])].map((u) => u.replace(/\/$/, '')).sort();

    const footerSet = new Set([...FOOTER_EN, ...FOOTER_PL]);
    const homepageSet = new Set([...HOMEPAGE_EN, ...HOMEPAGE_PL]);

    // Blog inbound links: parse each post's content
    const blogInbound = new Map<string, Set<string>>(); // targetPath -> set of source slugs
    const blogPostPaths = new Set<string>();

    const addBlog = (rows: any[] | null, lang: 'en' | 'pl') => {
      if (!rows) return;
      for (const row of rows) {
        const sourcePath = `/${lang}/blog/${row.slug}`;
        blogPostPaths.add(sourcePath);
        const links = extractInternalLinks(row.content || '');
        for (const t of links) {
          if (!blogInbound.has(t)) blogInbound.set(t, new Set());
          blogInbound.get(t)!.add(sourcePath);
        }
      }
    };
    addBlog(blogEn.data, 'en');
    addBlog(blogPl.data, 'pl');

    const report = allUrls.map((url) => {
      const lang: 'en' | 'pl' = url.startsWith('/pl') ? 'pl' : 'en';
      const inFooter = footerSet.has(url);
      const inHome = homepageSet.has(url);
      const isBlogPost = /^\/(en|pl)\/blog\/[^/]+$/.test(url);
      // blog index links to every post in same lang
      const inBlogIndex = isBlogPost;
      const blogSources = [...(blogInbound.get(url) || [])];
      const totalSources =
        (inFooter ? 1 : 0) + (inHome ? 1 : 0) + (inBlogIndex ? 1 : 0) + blogSources.length;
      const orphan = totalSources === 0;
      const gaps: string[] = [];
      if (!inFooter) gaps.push('footer');
      if (!inHome) gaps.push('homepage');
      if (!isBlogPost && blogSources.length === 0) gaps.push('blog');
      return {
        url, lang, inFooter, inHome, inBlogIndex,
        blogSources, totalSources, orphan, gaps, isBlogPost,
      };
    });

    const summary = {
      totalUrls: report.length,
      orphans: report.filter((r) => r.orphan).length,
      missingFooter: report.filter((r) => !r.inFooter).length,
      missingHomepage: report.filter((r) => !r.inHome).length,
      missingBlog: report.filter((r) => !r.isBlogPost && r.blogSources.length === 0).length,
      blogPostsParsed: blogPostPaths.size,
    };

    return new Response(JSON.stringify({
      generatedAt: new Date().toISOString(),
      summary,
      report,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('internal-link-audit error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
