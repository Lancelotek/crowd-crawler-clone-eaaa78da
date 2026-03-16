import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BRAVE_ENDPOINT = "https://api.search.brave.com/res/v1/web/search";

const SYSTEM_PROMPT = `You extract structured data from Brave Search results about a founder and their hardware company.
Return ONLY valid JSON, no markdown, no preamble.

{
  "founder_name": "Full Name or UNKNOWN",
  "founder_title": "CEO/Founder etc or UNKNOWN",
  "x_handle": "@handle or UNKNOWN",
  "x_url": "https://x.com/handle or UNKNOWN",
  "x_bio": "their X bio text or UNKNOWN",
  "x_followers": "follower count or UNKNOWN",
  "recent_x_posts": [{"text":"post content summary","url":"x.com post url","date":"approx date","engagement":"likes/RTs if visible"}],
  "email_found": "actual confirmed email@domain.com or UNKNOWN",
  "email_pattern": "guessed pattern firstname@domain.com or UNKNOWN",
  "email_confidence": "high|medium|low",
  "email_source": "source URL or UNKNOWN",
  "founder_linkedin": "https://linkedin.com/in/... or UNKNOWN",
  "linkedin_url": "https://linkedin.com/in/... or UNKNOWN",
  "company_linkedin": "https://linkedin.com/company/... or UNKNOWN",
  "employee_count": "12-25 or UNKNOWN",
  "company_description": "one sentence hardware product description or UNKNOWN",
  "project_mentions": [{"source":"site name","title":"title","url":"url","date":"date","summary":"1 sentence"}],
  "kickstarter_signal": "specific Kickstarter/crowdfunding mention or UNKNOWN",
  "product_stage": "prototype|pre-launch|launched|unknown",
  "recent_news": "most recent notable event or UNKNOWN",
  "data_confidence": 0
}

Rules:
- UNKNOWN if not found in search results — never invent
- x_handle must start with @
- Max 3 recent_x_posts, max 4 project_mentions
- data_confidence: 0-100 (how much real data you found)
- Prefer LinkedIn URLs from search results for founder data`;

async function braveSearch(query: string, apiKey: string, count = 8) {
  const url = new URL(BRAVE_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(count));
  url.searchParams.set("search_lang", "en");
  url.searchParams.set("freshness", "py2");

  const resp = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip",
      "X-Subscription-Token": apiKey,
    },
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Brave Search error ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  return (data?.web?.results ?? []).map((r: any) => ({
    title: r.title ?? "",
    url: r.url ?? "",
    description: r.description ?? "",
  }));
}

async function deepEnrich(
  lovableKey: string,
  braveKey: string,
  companyName: string,
  domain: string,
  founderName?: string
) {
  const fn = founderName && founderName.toLowerCase() !== "unknown" && founderName.trim()
    ? founderName.trim()
    : null;

  const queries: string[] = [];

  // X/Twitter queries
  if (fn) {
    queries.push(`"${fn}" "${companyName}" site:x.com OR site:twitter.com`);
    queries.push(`"${fn}" hardware startup crowdfunding site:twitter.com OR site:x.com`);
  } else {
    queries.push(`"${companyName}" founder CEO site:x.com OR site:twitter.com`);
  }

  // Email queries
  queries.push(`"${domain}" email contact founder`);
  if (fn) {
    queries.push(`"${fn}" "${domain}" contact email`);
  }

  // General + LinkedIn
  if (fn) {
    queries.push(`"${fn}" "${companyName}" founder CEO`);
  }
  queries.push(`"${companyName}" founder CEO site:linkedin.com`);

  // Kickstarter / crowdfunding mentions
  queries.push(`"${companyName}" Kickstarter OR crowdfunding OR "pre-launch" 2024 2025 2026`);

  // News / interviews
  queries.push(`"${companyName}" hardware startup news interview OR launch OR funding`);

  const allResults: any[] = [];
  for (const q of queries) {
    try {
      const results = await braveSearch(q, braveKey, 8);
      allResults.push(...results);
    } catch (e: any) {
      // continue with other queries
    }
    await new Promise((r) => setTimeout(r, 350));
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  const unique = allResults.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  const resultsText = unique
    .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.description}`)
    .join("\n\n");

  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Company: ${companyName}\nFounder: ${fn || "unknown"}\nDomain: ${domain}\n\nSearch results:\n${resultsText}\n\nReturn JSON.`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AI Gateway error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content ?? "";

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return { founder_name: "UNKNOWN", data_confidence: 0 };

  try {
    const enriched = JSON.parse(match[0]);

    // Serialize arrays to JSON strings for DB storage
    if (Array.isArray(enriched.recent_x_posts)) {
      enriched.recent_x_posts = JSON.stringify(enriched.recent_x_posts);
    }
    if (Array.isArray(enriched.project_mentions)) {
      enriched.project_mentions = JSON.stringify(enriched.project_mentions);
    }

    // Auto email pattern fallback
    if (
      (!enriched.email_found || enriched.email_found === "UNKNOWN") &&
      (!enriched.email_pattern || enriched.email_pattern === "UNKNOWN") &&
      domain && domain !== "UNKNOWN"
    ) {
      const name = enriched.founder_name && enriched.founder_name !== "UNKNOWN"
        ? enriched.founder_name
        : fn || "";
      const parts = name.toLowerCase().replace(/[^a-z ]/g, "").split(/\s+/);
      if (parts.length >= 2) {
        enriched.email_pattern = `${parts[0]}@${domain}`;
        enriched.email_confidence = "medium";
        enriched.email_source = "auto-pattern";
      }
    }

    return enriched;
  } catch {
    return { founder_name: "UNKNOWN", data_confidence: 0 };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BRAVE_API_KEY = Deno.env.get("BRAVE_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!BRAVE_API_KEY) throw new Error("BRAVE_API_KEY is not configured");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { leads } = await req.json();

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      throw new Error("leads array is required");
    }

    const enrichedLeads: any[] = [];
    const logs: string[] = [];

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      const name = lead.company_name || "";
      const domain = lead.domain || "UNKNOWN";
      const founder = lead.founder_name || "";

      if (!name) {
        logs.push(`[${i + 1}] Skipped — no company name`);
        enrichedLeads.push({ ...lead, data_confidence: 0 });
        continue;
      }

      logs.push(`[${i + 1}/${leads.length}] Deep enriching: ${name} (${domain})`);

      try {
        const enriched = await deepEnrich(
          LOVABLE_API_KEY,
          BRAVE_API_KEY,
          name,
          domain,
          founder
        );
        enrichedLeads.push({ ...lead, ...enriched });

        const xh = enriched.x_handle || "?";
        const em = enriched.email_found && enriched.email_found !== "UNKNOWN"
          ? enriched.email_found
          : enriched.email_pattern || "?";
        logs.push(
          `  ✓ founder=${enriched.founder_name || "?"} | X=${xh} | email=${em} | conf=${enriched.data_confidence || 0}%`
        );
      } catch (e: any) {
        logs.push(`  ✗ Error: ${e.message}`);
        enrichedLeads.push({ ...lead, founder_name: "UNKNOWN", data_confidence: 0 });
      }

      // Rate limiting between companies
      if (i < leads.length - 1) {
        await new Promise((r) => setTimeout(r, 1200));
      }
    }

    // Summary
    const total = enrichedLeads.length;
    const foundersFound = enrichedLeads.filter(l => l.founder_name && l.founder_name !== "UNKNOWN").length;
    const xFound = enrichedLeads.filter(l => l.x_handle && l.x_handle !== "UNKNOWN").length;
    const liFound = enrichedLeads.filter(l => (l.linkedin_url || l.founder_linkedin) && (l.linkedin_url || l.founder_linkedin) !== "UNKNOWN").length;
    const emailFound = enrichedLeads.filter(l => l.email_found && l.email_found !== "UNKNOWN").length;
    const patternFound = enrichedLeads.filter(l => l.email_pattern && l.email_pattern !== "UNKNOWN").length;
    const avgConf = total
      ? Math.round(enrichedLeads.reduce((s, l) => s + (Number(l.data_confidence) || 0), 0) / total)
      : 0;

    logs.push(`\n--- Deep Enrichment Summary ---`);
    logs.push(`Founders found:   ${foundersFound}/${total}`);
    logs.push(`X handles:        ${xFound}/${total}`);
    logs.push(`LinkedIn URLs:    ${liFound}/${total}`);
    logs.push(`Emails found:     ${emailFound}/${total}`);
    logs.push(`Email patterns:   ${patternFound}/${total}`);
    logs.push(`Avg confidence:   ${avgConf}%`);

    return new Response(
      JSON.stringify({ leads: enrichedLeads, logs }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    console.error("lead-enricher error:", e);
    return new Response(
      JSON.stringify({ error: e.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
