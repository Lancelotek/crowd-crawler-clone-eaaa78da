import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BRAVE_ENDPOINT = "https://api.search.brave.com/res/v1/web/search";

const SYSTEM_PROMPT = `You are a lead research analyst for JAY-23, a Kickstarter pre-launch agency.

JAY-23 targets: Founders/CEOs of hardware/physical product companies (10-50 people) planning 
a Kickstarter or crowdfunding campaign in the next 3-12 months.

Product categories: electronics, gadgets, wearables, EDC, smart home, outdoor gear.

You will receive raw web search results. Extract and structure REAL company leads from this data.

Return ONLY a valid JSON array. No markdown fences, no preamble. No invented data.

Each object must have exactly these keys:
company_name, domain, founder_name, founder_linkedin, employees,
product_description, funding_stage, kickstarter_signal,
buying_signal, signal_reason, source_url, notes

buying_signal: HOT | WARM | COLD
HOT = confirmed Kickstarter/crowdfunding intent + hardware product + right size
WARM = hardware startup + funding/launch interest, no confirmed date
COLD = hardware ICP fit, no launch signal found

Rules:
- Write UNKNOWN for any field you cannot confirm from the search results
- Never invent company names, domains, or founder names
- Skip any company that is clearly SaaS/software-only
- Skip companies >200 employees
- If company already ran Kickstarter, note it in kickstarter_signal as "Past campaign — potential repeat"
- Deduplicate — skip companies already extracted from previous batches`;

async function braveSearch(query: string, apiKey: string, count = 10) {
  const url = new URL(BRAVE_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(count));
  url.searchParams.set("search_lang", "en");
  url.searchParams.set("freshness", "py1");

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
  const results = data?.web?.results ?? [];
  return results.map((r: any) => ({
    title: r.title ?? "",
    url: r.url ?? "",
    description: r.description ?? "",
  }));
}

async function extractLeads(
  apiKey: string,
  searchResults: any[],
  alreadyFound: string[],
  targetCount: number
) {
  const resultsText = searchResults
    .map(
      (r: any, i: number) =>
        `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.description}`
    )
    .join("\n\n");

  const existing = alreadyFound.length ? alreadyFound.join(", ") : "none yet";

  const userMsg = `Extract up to ${targetCount} hardware startup leads from these search results.
Already extracted (skip these): ${existing}

SEARCH RESULTS:
${resultsText}

Return the JSON array.`;

  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMsg },
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

  const match = text.match(/\[[\s\S]*\]/);
  if (!match) return [];

  try {
    return JSON.parse(match[0]);
  } catch {
    return [];
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

    const { queries, leadsTarget = 20, alreadyFound = [] } = await req.json();

    if (!queries || !Array.isArray(queries) || queries.length === 0) {
      throw new Error("queries array is required");
    }

    const allLeads: any[] = [];
    const seenCompanies: string[] = [...alreadyFound];
    const logs: string[] = [];

    for (let i = 0; i < queries.length; i++) {
      const remaining = leadsTarget - allLeads.length;
      if (remaining <= 0) {
        logs.push(`Target of ${leadsTarget} reached. Stopping.`);
        break;
      }

      const query = queries[i];
      logs.push(`[${i + 1}/${queries.length}] Searching: ${query.slice(0, 70)}...`);

      let results: any[];
      try {
        results = await braveSearch(query, BRAVE_API_KEY, 10);
        logs.push(`  Brave returned ${results.length} results`);
      } catch (e: any) {
        logs.push(`  Brave error: ${e.message}`);
        continue;
      }

      if (results.length === 0) continue;

      try {
        const batch = await extractLeads(
          LOVABLE_API_KEY,
          results,
          seenCompanies,
          Math.min(remaining, 5)
        );

        if (batch.length > 0) {
          allLeads.push(...batch);
          seenCompanies.push(
            ...batch.map((l: any) => l.company_name || "")
          );
          const hot = allLeads.filter((l: any) => l.buying_signal === "HOT").length;
          const warm = allLeads.filter((l: any) => l.buying_signal === "WARM").length;
          const cold = allLeads.filter((l: any) => l.buying_signal === "COLD").length;
          logs.push(
            `  +${batch.length} leads | Total: ${allLeads.length} | HOT=${hot} WARM=${warm} COLD=${cold}`
          );
        } else {
          logs.push("  No new leads in this batch");
        }
      } catch (e: any) {
        logs.push(`  Extraction error: ${e.message}`);
      }

      // Rate limiting between queries
      if (i < queries.length - 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    return new Response(
      JSON.stringify({ leads: allLeads, logs }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e: any) {
    console.error("lead-researcher error:", e);
    return new Response(
      JSON.stringify({ error: e.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
