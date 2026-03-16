import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const JAY23_SYSTEM = `You write cold email sequences for JAY-23, a pre-launch agency that builds Early Bird waitlists for hardware founders before their Kickstarter launches.

JAY-23 core messaging (use these exact phrases and numbers):
- Hero: "Build Your First 1,000 True Fans in 90 Days"
- Problem: "Most products launch to silence" / "No audience, no validation, no demand"
- Solution: "MVA Framework — we build your paying Early Bird subscriber list before launch day"
- Proof: 98+ founders, $600K+ raised by MVA clients, avg 3,000+ leads per campaign, 90-day cycle
- Key case study: Bluetooth tracking smart wallet — $330K raised on Kickstarter after JAY-23 built their pre-launch community from 0
- CTA: "Free 15-min Strategy Call" at jay23.com/call
- Positioning: Done-for-you, not a course or tool. JAY-23 runs the whole pre-launch.

Tone: Direct, founder-to-founder. No buzzwords. Short sentences. Active voice.
NEVER use: "leverage", "synergy", "circle back", "touch base", "hope this finds you well", "I wanted to reach out".

The 3-touch structure:
TOUCH 1 (Day 0): 1 specific observation about their situation → 1-sentence what JAY-23 does → proof point → soft CTA. Max 100 words body.
TOUCH 2 (Day 4): Lead with $330K case study result → connect to their specific product/situation → CTA. Max 90 words body.
TOUCH 3 (Day 9): One question only. Max 2 sentences. Reference their product or launch year.

Return ONLY valid JSON, no markdown:
{"touch1":{"subject":"...","body":"...","send_day":0},"touch2":{"subject":"...","body":"...","send_day":4},"touch3":{"subject":"...","body":"...","send_day":9}}`;

function buildUserPrompt(lead: any, config: any): string {
  const nameParts = (lead.founder_name || "").split(/\s+/);
  const firstName = nameParts[0] && nameParts[0] !== "UNKNOWN" ? nameParts[0] : "there";
  const extraCase = config.extraCaseStudy ? `\nAdditional case study to optionally reference: ${config.extraCaseStudy}` : "";

  return `Write a 3-touch cold email sequence for this lead.

Language: ${config.language === "Polish" ? "Polish" : "English"}
Sender name: ${config.senderName || "Marek"}${extraCase}

LEAD:
Company: ${lead.company_name || ""}
Founder first name: ${firstName}
Product: ${lead.product_description || lead.company_description || "hardware product"}
Employees: ${lead.employee_count || lead.employees || "unknown"}
Funding: ${lead.funding_stage || "unknown"}
Buying signal: ${lead.buying_signal || "COLD"}
Why they're a fit: ${lead.signal_reason || "unknown"}
Kickstarter signal: ${lead.kickstarter_signal || "unknown"}
Recent news: ${lead.recent_news || "unknown"}

Important: Touch 1 must open with ONE specific observation referencing their actual situation (product type, kickstarter signal, or recent news). No generic openers.
Touch 3 subject must reference their product name or launch year.

Return JSON only.`;
}

async function callAI(apiKey: string, systemPrompt: string, userPrompt: string): Promise<any> {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      await new Promise((r) => setTimeout(r, 10000));
      return callAI(apiKey, systemPrompt, userPrompt);
    }
    const text = await response.text();
    throw new Error(`AI error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON in response");
  return JSON.parse(match[0]);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { leads, config = {}, singleLead } = await req.json();

    // Single lead mode (regenerate)
    if (singleLead) {
      const email = singleLead.email_pattern || "";
      if (!email || email === "UNKNOWN") {
        return new Response(
          JSON.stringify({ error: "No email for this lead" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const prompt = buildUserPrompt(singleLead, config);
      const seq = await callAI(LOVABLE_API_KEY, JAY23_SYSTEM, prompt);
      const nameParts = (singleLead.founder_name || "").split(/\s+/);
      return new Response(
        JSON.stringify({
          sequence: {
            lead: singleLead,
            sequence: seq,
            first_name: nameParts[0] !== "UNKNOWN" ? nameParts[0] : "",
            last_name: nameParts.slice(1).join(" "),
            email,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Batch mode
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
        const prompt = buildUserPrompt(lead, config);
        const seq = await callAI(LOVABLE_API_KEY, JAY23_SYSTEM, prompt);
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

    return new Response(
      JSON.stringify({ sequences, logs }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    console.error("email-sequencer error:", e);
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
