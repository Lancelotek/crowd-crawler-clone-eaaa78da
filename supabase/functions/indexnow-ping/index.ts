// IndexNow ping endpoint — notifies Bing, Yandex (and partners) about updated URLs.
// Docs: https://www.indexnow.org/documentation
//
// Usage:
//   POST /functions/v1/indexnow-ping
//   Body (optional): { "urls": ["https://jay23.com/en.md", ...] }
//   If no body is provided, all known .md / llms.txt resources are pinged.
//
// GET /functions/v1/indexnow-ping  -> pings the default resource set (handy for cron).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const HOST = "jay23.com";
const BASE_URL = `https://${HOST}`;
const INDEXNOW_KEY = "45d04feba4c705426fe04b5250b15a77";
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

// All AI-agent / LLM resources we want crawlers to keep fresh.
const DEFAULT_URLS = [
  // Discovery files
  `${BASE_URL}/llms.txt`,
  `${BASE_URL}/llms-full.txt`,
  `${BASE_URL}/pl-llms.txt`,
  `${BASE_URL}/sitemap-llms.xml`,
  // EN markdown mirrors
  `${BASE_URL}/en.md`,
  `${BASE_URL}/en/process.md`,
  `${BASE_URL}/en/book.md`,
  `${BASE_URL}/en/faq.md`,
  `${BASE_URL}/en/about.md`,
  // PL markdown mirrors
  `${BASE_URL}/pl.md`,
  `${BASE_URL}/pl/process.md`,
  `${BASE_URL}/pl/book.md`,
  `${BASE_URL}/pl/faq.md`,
  `${BASE_URL}/pl/about.md`,
];

// IndexNow endpoints. Submitting to one is enough (they share the network),
// but we hit Bing + Yandex directly for redundancy.
const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/IndexNow",
  "https://yandex.com/indexnow",
];

interface PingResult {
  endpoint: string;
  status: number;
  ok: boolean;
  body?: string;
}

async function pingIndexNow(urls: string[]): Promise<PingResult[]> {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const results = await Promise.all(
    ENDPOINTS.map(async (endpoint): Promise<PingResult> => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        let body = "";
        try {
          body = await res.text();
        } catch (_) {
          /* ignore */
        }
        return { endpoint, status: res.status, ok: res.ok, body: body.slice(0, 300) };
      } catch (err) {
        return {
          endpoint,
          status: 0,
          ok: false,
          body: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );

  return results;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let urls: string[] = DEFAULT_URLS;

    if (req.method === "POST") {
      try {
        const body = await req.json();
        if (body && Array.isArray(body.urls) && body.urls.length > 0) {
          const valid = body.urls.filter(
            (u: unknown): u is string =>
              typeof u === "string" && u.startsWith(BASE_URL),
          );
          if (valid.length === 0) {
            return new Response(
              JSON.stringify({
                error: `urls must be strings starting with ${BASE_URL}`,
              }),
              {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              },
            );
          }
          urls = valid.slice(0, 10000); // IndexNow hard limit
        }
      } catch (_) {
        // empty body -> use defaults
      }
    }

    console.log(`[indexnow] pinging ${urls.length} url(s)`);
    const results = await pingIndexNow(urls);
    const success = results.some((r) => r.ok);
    results.forEach((r) =>
      console.log(`[indexnow] ${r.endpoint} -> ${r.status} ${r.ok ? "OK" : "FAIL"}`),
    );

    return new Response(
      JSON.stringify({
        success,
        host: HOST,
        keyLocation: KEY_LOCATION,
        submitted: urls.length,
        results,
      }),
      {
        status: success ? 200 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("[indexnow] error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
