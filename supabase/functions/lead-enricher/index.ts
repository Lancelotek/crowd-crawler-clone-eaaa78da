import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BRAVE_ENDPOINT = "https://api.search.brave.com/res/v1/web/search";

const SYSTEM_PROMPT = `You are a B2B lead enrichment agent for JAY-23, a Kickstarter pre-launch agency.
Extract founder/CEO data from Brave Search results for a hardware company.
Return ONLY valid JSON, no markdown, no preamble.

Required JSON fields:
{
  "founder_name": "Full Name or UNKNOWN",
  "founder_title": "CEO/Founder/Co-Founder or UNKNOWN",
  "linkedin_url": "https://linkedin.com/in/... or UNKNOWN",
  "company_linkedin": "https://linkedin.com/company/... or UNKNOWN",
  "email_pattern": "firstname@domain.com or UNKNOWN",
  "email_confidence": "high|medium|low",
  "employee_count": "12-25 or UNKNOWN",
  "company_description": "one sentence hardware product description or UNKNOWN",
  "recent_news": "most recent notable event or UNKNOWN",
  "kickstarter_signal": "any Kickstarter/crowdfunding mention or UNKNOWN",
  "data_confidence": 0
}

Rules:
- UNKNOWN if not found in search results — never invent
- Prefer LinkedIn URLs from search results for founder data
- data_confidence: 0-100 (how much real data you found)`;

async function braveSearch(query: string, apiKey: string, count = 7) {
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
  return (data?.web?.results ?? []).map((r: any) => ({
    title: r.title ?? "",
    url: r.url ?? "",
    description: r.description ?? "",
  }));
}

async function enrichCompany(
  lovableKey: string,
  braveKey: string,
  companyName: string,
  domain: string
) {
  const queries = [
    `"${companyName}" founder CEO site:linkedin.com`,
    `"${companyName}" "${domain}" founder CEO hardware startup`,
    `"${companyName}" hardware Kickstarter crowdfunding pre-launch`,
  ];

  const allResults: any[] = [];
  for (const q of queries) {
    try {
      const results = await braveSearch(q, braveKey, 7);
      allResults.push(...results);
    } catch (e: any) {
      // continue with other queries
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  const resultsText = allResults
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
            content: `Company: ${companyName}\nDomain: ${domain}\n\nSearch results:\n${resultsText}\n\nReturn JSON enrichment.`,
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

    // Auto email pattern guess
    if (
      enriched.founder_name &&
      enriched.founder_name !== "UNKNOWN" &&
      (!enriched.email_pattern || enriched.email_pattern === "UNKNOWN") &&
      domain &&
      domain !== "UNKNOWN"
    ) {
      const parts = enriched.founder_name
        .toLowerCase()
        .replace(/[^a-z ]/g, "")
        .split(/\s+/);
      if (parts.length >= 2) {
        enriched.email_pattern = `${parts[0]}@${domain}`;
        enriched.email_confidence = "medium";
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

      if (!name) {
        logs.push(`[${i + 1}] Skipped — no company name`);
        enrichedLeads.push({ ...lead, data_confidence: 0 });
        continue;
      }

      logs.push(`[${i + 1}/${leads.length}] Enriching: ${name} (${domain})`);

      try {
        const enriched = await enrichCompany(
          LOVABLE_API_KEY,
          BRAVE_API_KEY,
          name,
          domain
        );
        enrichedLeads.push({ ...lead, ...enriched });
        logs.push(
          `  ✓ founder=${enriched.founder_name || "?"} | confidence=${enriched.data_confidence || 0}%`
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
    const found = enrichedLeads.filter(
      (l) => l.founder_name && l.founder_name !== "UNKNOWN"
    ).length;
    const liFound = enrichedLeads.filter(
      (l) => l.linkedin_url && l.linkedin_url !== "UNKNOWN"
    ).length;
    const emailFound = enrichedLeads.filter(
      (l) => l.email_pattern && l.email_pattern !== "UNKNOWN"
    ).length;
    const avgConf = enrichedLeads.length
      ? Math.round(
          enrichedLeads.reduce((s, l) => s + (Number(l.data_confidence) || 0), 0) /
            enrichedLeads.length
        )
      : 0;

    logs.push(`\n--- Summary ---`);
    logs.push(`Founders found: ${found}/${enrichedLeads.length}`);
    logs.push(`LinkedIn URLs:  ${liFound}`);
    logs.push(`Email patterns: ${emailFound}`);
    logs.push(`Avg confidence: ${avgConf}%`);

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
