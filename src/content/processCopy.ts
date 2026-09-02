/** Process page copy. Pure data — shared with the build-time no-JS fallback. */
export const PHASES = [
  {
    number: "01",
    label: "Build",
    sub: "Month 1 · Weeks 1–4",
    theme: "hsl(var(--primary))",
    themeRaw: "var(--primary)",
    steps: [
      { owner: "Agency" as const, title: "Persona mapping + quiz strategy", desc: "We define 1–3 buyer personas. Each gets a dedicated quiz path, a tailored PDF report as incentive, and a unique funnel track." },
      { owner: "Agency" as const, title: "Landing page on prelaunch.live", desc: "Quiz → email capture → Thank You page with WhatsApp VIP QR. Full Meta Pixel + GA4 setup. Visitor cookied for remarketing." },
      { owner: "Client" as const, title: "WhatsApp VIP Group + account access", desc: "Client creates the VIP group, generates QR code, and grants access to Meta, TikTok/Google, Stripe, and MailerLite." },
      { owner: "Agency" as const, title: "7-mail sequence + Stripe $1 flow", desc: "Full MailerLite automation. Mail 1 delivers the report + Early Bird reservation link. Webhook moves paying leads into a dedicated segment." },
    ],
  },
  {
    number: "02",
    label: "Drive",
    sub: "Month 2 · Weeks 5–8",
    theme: "hsl(160 70% 50%)",
    themeRaw: "160 70% 50%",
    steps: [
      { owner: "Agency" as const, title: "Ads live — Andromeda framework", desc: "Meta + TikTok (Standard) or Google Search + PMax (Starter). Videos use comment-CTA mechanic → ManyChat → quiz. A/B hook testing from day 1." },
      { owner: "Both" as const, title: "Community activation", desc: "Agency manages the ads. Client runs the VIP group — 3+ posts/week, polls, sneak peeks, Q&A. Both respond to ad comments." },
      { owner: "Agency" as const, title: "Weekly optimization + creative rotation", desc: "New creatives every 2 weeks. Quiz drop-off analysis. Google Display remarketing for cookied visitors. Weekly CPL and Stripe CR reports." },
    ],
  },
  {
    number: "03",
    label: "Launch",
    sub: "Month 3 · Weeks 9–12",
    theme: "hsl(40 95% 55%)",
    themeRaw: "40 95% 55%",
    steps: [
      { owner: "Agency" as const, title: "Lookalike campaigns from paying segment", desc: "Paying $1 subscribers → Meta Custom Audience → 1–3% Lookalike. Google Customer Match. Budget shifted to the warmest cold traffic possible." },
      { owner: "Agency" as const, title: "Full launch campaign — all channels", desc: "Launch email to full list + exclusive offer to paying segment. Ads target Custom Audiences + Lookalike. 100% conversion objective." },
      { owner: "Both" as const, title: "Final report + handover", desc: "MVA report: leads, paying segment, ROAS, funnel CR per stage. All access and documentation transferred. Retainer or self-managed — your call." },
    ],
  },
];

export const OUTCOMES = [
  { value: "300+", label: "Qualified leads minimum by end of month 3" },
  { value: "30+", label: "Paying Early Bird subscribers before launch" },
  { value: "<25 PLN", label: "Max cost per lead — guaranteed" },
  { value: "3×", label: "Channels: ads, email, WhatsApp community" },
];
