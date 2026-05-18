import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SITE = 'sc-domain:jay23.com';
const SITE_ENCODED = encodeURIComponent(SITE);
const GATEWAY = 'https://connector-gateway.lovable.dev/google_search_console/webmasters/v3';
const HOST = 'https://jay23.com';

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function gscFetch(path: string, init?: RequestInit) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const GSC_KEY = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY');
  if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY missing');
  if (!GSC_KEY) throw new Error('GOOGLE_SEARCH_CONSOLE_API_KEY missing');
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': GSC_KEY,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* keep text */ }
  if (!res.ok) throw new Error(`GSC ${res.status}: ${text.slice(0, 200)}`);
  return json;
}

async function searchAnalytics(dimensions: string[], rowLimit = 10) {
  const end = new Date(); end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end); start.setUTCDate(start.getUTCDate() - 28);
  return gscFetch(`/sites/${SITE_ENCODED}/searchAnalytics/query`, {
    method: 'POST',
    body: JSON.stringify({
      startDate: ymd(start),
      endDate: ymd(end),
      dimensions,
      rowLimit,
    }),
  });
}

async function checkUrl(url: string) {
  try {
    const r = await fetch(url, { redirect: 'follow' });
    const text = r.ok ? await r.text() : '';
    return { url, status: r.status, ok: r.ok, body: text };
  } catch (e) {
    return { url, status: 0, ok: false, error: String(e) };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const [robotsRes, indexRes, enRes, plRes, totals, queries, pages, countries, devices, sitemaps] =
      await Promise.all([
        checkUrl(`${HOST}/robots.txt`),
        checkUrl(`${HOST}/sitemap_index.xml`),
        checkUrl(`${HOST}/sitemap-en.xml`),
        checkUrl(`${HOST}/sitemap-pl.xml`),
        searchAnalytics([], 1),
        searchAnalytics(['query'], 25),
        searchAnalytics(['page'], 25),
        searchAnalytics(['country'], 10),
        searchAnalytics(['device'], 5),
        gscFetch(`/sites/${SITE_ENCODED}/sitemaps`).catch((e) => ({ error: String(e) })),
      ]);

    const countUrls = (body: string) => (body.match(/<loc>/g) || []).length;

    const summarize = (r: any) => ({
      url: r.url,
      status: r.status,
      ok: r.ok,
      urlCount: r.body ? countUrls(r.body) : 0,
    });

    return new Response(JSON.stringify({
      generatedAt: new Date().toISOString(),
      site: SITE,
      files: {
        robots: { ...summarize(robotsRes), preview: robotsRes.body?.slice(0, 500) || null },
        sitemapIndex: summarize(indexRes),
        sitemapEn: summarize(enRes),
        sitemapPl: summarize(plRes),
      },
      gsc: {
        totals: totals?.rows?.[0] || null,
        topQueries: queries?.rows || [],
        topPages: pages?.rows || [],
        countries: countries?.rows || [],
        devices: devices?.rows || [],
        sitemaps: sitemaps?.sitemap || sitemaps || [],
      },
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('seo-dashboard error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
