import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SEQUENCE_PROMPT = `Write a 3-touch cold email sequence for JAY-23 (pre-launch Kickstarter agency).

LEAD DATA:
Company: {company}
Founder first name: {first_name}
Product: {product}
Employees: {employees}
Funding: {funding}
Buying signal: {signal}
Signal reason: {signal_reason}
Kickstarter signal: {ks_signal}
Recent news: {recent_news}

SENDER: {sender} from JAY-23 (jay23.com)
CASE STUDY: {case_study}

SEQUENCE RULES:
Language: {lang}

Touch 1 (Day 0): Short research-backed cold email.
- Open with 1 specific observation about their situation (use lead data above)
- 1 sentence: what JAY-23 does
- Soft CTA: 15-min call
- Max 120 words body. No "I hope this finds you well". No buzzwords.

Touch 2 (Day 4): Case study email.
- Lead with the result ({case_study})
- Connect to their specific situation
- CTA: same 15-min call
- Max 100 words body.

Touch 3 (Day 9): Breakup email.
- One simple question only
- Max 50 words body.

Tone: Direct, founder-to-founder. Active voice. Short sentences.
No "leverage", "synergy", "circle back", "touch base", "hope this finds you well".

Return ONLY valid JSON, no markdown, no preamble:
{{
  "touch1": {{"subject": "...", "body": "...", "send_day": 0}},
  "touch2": {{"subject": "...", "body": "...", "send_day": 4}},
  "touch3": {{"subject": "...", "body": "...", "send_day": 9}}
}}`;

function buildPrompt(lead: any, config: any): string {
  const nameParts = (lead.founder_name || "").split(/\s+/);
  const firstName = nameParts[0] && nameParts[0] !== "UNKNOWN" ? nameParts[0] : "there";

  return SEQUENCE_PROMPT
    .replace("{company}", lead.company_name || "")
    .replace("{first_name}", firstName)
    .replace("{product}", lead.company_description || lead.product_description || "hardware product")
    .replace("{employees}", lead.employee_count || lead.employees || "unknown")
    .replace("{funding}", lead.funding_stage || "unknown")
    .replace("{signal}", lead.buying_signal || "COLD")
    .replace("{signal_reason}", lead.signal_reason || "unknown")
    .replace("{ks_signal}", lead.kickstarter_signal || "unknown")
    .replace("{recent_news}", lead.recent_news || "unknown")
    .replace(/{sender}/g, config.senderName || "Marek")
    .replace(/{case_study}/g, config.caseStudy || "Bluetooth tracking smart wallet – $330K raised on Kickstarter after we built their pre-launch community from 0")
    .replace(/{lang}/g, config.language || "English");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { leads, config = {} } = await req.json();

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      throw new Error("leads array is required");
    }

    const sequences: any[] = [];
    const logs: string[] = [];

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      const name = lead.company_name || `Lead ${i + 1}`;
      const email = lead.email_pattern || "";

      if (!email || email === "UNKNOWN") {
        logs.push(`[${i + 1}/${leads.length}] ${name} — skipped (no email)`);
        continue;
      }

      logs.push(`[${i + 1}/${leads.length}] Generating sequence for ${name}...`);

      try {
        const prompt = buildPrompt(lead, config);

        const response = await fetch(
          "https://ai.gateway.lovable.dev/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [{ role: "user", content: prompt }],
            }),
          }
        );

        if (!response.ok) {
          const text = await response.text();
          if (response.status === 429) {
            logs.push(`  ⚠ Rate limited — waiting 10s...`);
            await new Promise((r) => setTimeout(r, 10000));
            // retry once
            const retry = await fetch(
              "https://ai.gateway.lovable.dev/v1/chat/completions",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${LOVABLE_API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  model: "google/gemini-2.5-flash",
                  messages: [{ role: "user", content: prompt }],
                }),
              }
            );
            if (!retry.ok) throw new Error(`AI error ${retry.status}`);
            const retryData = await retry.json();
            const retryText = retryData.choices?.[0]?.message?.content ?? "";
            const match = retryText.match(/\{[\s\S]*\}/);
            if (!match) throw new Error("No JSON in retry response");
            const seq = JSON.parse(match[0]);

            const nameParts = (lead.founder_name || "").split(/\s+/);
            sequences.push({
              lead,
              sequence: seq,
              first_name: nameParts[0] !== "UNKNOWN" ? nameParts[0] : "",
              last_name: nameParts.slice(1).join(" "),
              email,
            });
            logs.push(`  ✓ T1: ${seq.touch1?.subject || "?"}`);
            continue;
          }
          throw new Error(`AI Gateway error ${response.status}: ${text}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content ?? "";
        const match = text.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("No JSON in response");

        const seq = JSON.parse(match[0]);
        const nameParts = (lead.founder_name || "").split(/\s+/);

        sequences.push({
          lead,
          sequence: seq,
          first_name: nameParts[0] !== "UNKNOWN" ? nameParts[0] : "",
          last_name: nameParts.slice(1).join(" "),
          email,
        });

        logs.push(`  ✓ T1: ${seq.touch1?.subject || "?"}`);
        logs.push(`    T2: ${seq.touch2?.subject || "?"}`);
        logs.push(`    T3: ${seq.touch3?.subject || "?"}`);
      } catch (e: any) {
        logs.push(`  ✗ Error: ${e.message}`);
      }

      if (i < leads.length - 1) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    logs.push(`\n--- Summary ---`);
    logs.push(`Sequences generated: ${sequences.length}/${leads.length}`);
    const skipped = leads.length - sequences.length;
    if (skipped > 0) logs.push(`Skipped (no email): ${skipped}`);

    return new Response(
      JSON.stringify({ sequences, logs }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    console.error("email-sequencer error:", e);
    return new Response(
      JSON.stringify({ error: e.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
