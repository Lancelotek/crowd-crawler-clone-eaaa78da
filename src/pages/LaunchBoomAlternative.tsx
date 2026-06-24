import { Scale, Wallet, Users, Rocket } from "lucide-react";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "LaunchBoom Alternative — Kickstarter Pre-Launch Without Revenue Share | JAY-23",
  metaDescription: "Looking for a LaunchBoom alternative? JAY-23 runs the 90-day MVA Framework: fixed monthly fee, no revenue share, founder-led. 46 campaigns, $1.2M+ raised.",
  canonical: "/en/launchboom-alternative",
  breadcrumbName: "LaunchBoom Alternative",
  serviceType: "Kickstarter pre-launch agency (LaunchBoom alternative)",
  eyebrow: "LaunchBoom alternative · Fixed fee, no rev-share",
  h1Lead: "The LaunchBoom alternative for creators who want",
  h1Accent: "fixed pricing and a founder in the room",
  heroSub: "LaunchBoom built the playbook. We took the same underlying logic — TYP page, pre-launch funnel, day-one activation — and rebuilt it as a fixed-fee, founder-led engagement. No revenue share, no junior account managers, no 12-page MSAs. 46 campaigns, $1.2M+ raised.",
  bookSource: "launchboom-alternative",
  problemEyebrow: "Why creators look for an alternative",
  problemTitle: "What pushes creators to look past LaunchBoom in 2026.",
  problemParas: [
    "LaunchBoom popularized the pre-launch playbook for Kickstarter — VIP/TYP pages, $1 reservation deposits, ManyChat sequences. The framework works. The complaints we hear from creators evaluating us against them are almost always structural, not strategic: minimum spend that puts them out of reach for first-time creators, percentage-of-pledges that compounds painfully on big campaigns, and account-team turnover where the senior strategist who sold the deal hands the campaign to a junior 30 days in.",
    "The underlying audience-building logic isn't proprietary. A pre-launch landing page, a low-friction reservation, a tagged email list and a 4-wave launch activation is the same architecture any competent pre-launch agency runs. The differentiator isn't the framework — it's pricing model, who actually executes, and how the contract is structured.",
    "If you've already talked to LaunchBoom and the spend, the percentage, or the team structure didn't fit, you don't need a worse version of the same playbook — you need the same playbook on different commercial terms. That's where MVA fits.",
  ],
  reasonsEyebrow: "MVA vs LaunchBoom",
  reasonsTitle: "Four reasons creators pick MVA over LaunchBoom.",
  reasons: [
    { icon: Wallet, label: "Pricing model", title: "Fixed monthly fee, zero revenue share", body: "$1,500/month flat. No percentage of pledges, no success fee, no minimum spend tier. On a $300k campaign that's a five-figure difference; on a $1M campaign it's six." },
    { icon: Users, label: "Founder-led", title: "The person who sells you the deal runs the campaign", body: "Marek leads every engagement personally. No handoff to an account manager after week 2. You get one number to text on launch night, not a ticket queue." },
    { icon: Scale, label: "Contract structure", title: "Month-to-month, not 12-month MSAs", body: "Rolling monthly engagement. If we're not earning it in month 2, you cancel. No claw-backs, no notice periods, no exit fees." },
    { icon: Rocket, label: "Same playbook spine", title: "TYP-equivalent funnel, 4-wave activation, day-one momentum", body: "Pre-launch landing, low-friction reservation, tagged MailerLite, simultaneous launch-hour activation. The architecture that makes LaunchBoom campaigns work is what makes MVA campaigns work — without the commercial overhead." },
  ],
  phasesTitle: "How an MVA engagement compares to the LaunchBoom workflow.",
  phases: [
    { n: "01", title: "Discover — offer, hook, ICP", body: "Same diagnostic depth: positioning, reward tiers, ICP segments, competitor reverse-engineering. Done with the founder, not a junior strategist filling in a templated brief." },
    { n: "02", title: "Build — pre-launch funnel & paid ads", body: "Pre-launch landing on your domain. Reservation flow scoped to your category (full deposit, $1 hold, or pure email — your call). Meta + Reddit + niche-community funnels. MailerLite sequences. Tagged event layer end-to-end." },
    { n: "03", title: "Launch — 4-wave activation", body: "T-7 warm-up. Launch hour: email + retargeting + community drops fired simultaneously. First 48 hours: founder DMs to top 5% engaged leads, paid scaled to converting segments only, organic momentum compounding." },
  ],
  deliverablesTitle: "Same artifacts as a LaunchBoom engagement, different commercial terms.",
  deliverables: [
    "Offer, reward tier and pledge ladder review",
    "Pre-launch landing page on your domain",
    "Reservation funnel (deposit / $1 hold / email — your call)",
    "Meta, Reddit and community ad funnels",
    "Email sequence (5–9 emails) in MailerLite",
    "Analytics + UTM layer (GA4 + Plausible)",
    "Launch-day 4-wave activation playbook",
    "Founder-led weekly reviews through funding",
  ],
  comparisonEyebrow: "MVA vs LaunchBoom",
  comparisonTitle: "Same Kickstarter playbook, different commercial model.",
  comparisonRightLabel: "LaunchBoom (typical)",
  comparison: [
    { row: "Pricing model", mva: "Fixed $1,500/mo", cold: "Fee + % of pledges" },
    { row: "Minimum engagement", mva: "Month-to-month", cold: "12-month MSA" },
    { row: "Revenue share on pledges", mva: false, cold: true },
    { row: "Who runs the campaign", mva: "Founder", cold: "Account team" },
    { row: "Reservation flow", mva: "Deposit / $1 / email", cold: "TYP / $1 hold" },
    { row: "4-wave launch activation", mva: true, cold: true },
    { row: "Owned audience after campaign", mva: "Yes", cold: "Yes" },
  ],
  faqs: [
    { q: "Are you saying LaunchBoom doesn't work?", a: "No — the opposite. LaunchBoom built the modern pre-launch playbook for Kickstarter and their results speak for themselves. We respect the work. The reason creators end up on this page is almost always commercial: the percentage of pledges doesn't fit their margin model, the minimum spend is out of reach, or they want the senior person on the call to also be the senior person on the campaign. If those things don't bother you, LaunchBoom is a perfectly valid pick." },
    { q: "Do you offer a TYP-style reservation page like LaunchBoom?", a: "Yes, with options. We run three reservation models depending on your category: full deposit (hardware with strong margin), $1 hold (most products), pure email opt-in (creative, tabletop, lower AOV). The point isn't to copy a specific UI — it's to match the friction level to your buyer's intent." },
    { q: "Are you a smaller team — does that mean less capacity?", a: "Yes and yes. JAY-23 is intentionally a small operator-led shop, not an agency at scale. We cap concurrent campaigns so the founder can actually run each one. If we're booked, we say so." },
    { q: "What happens after the campaign ends?", a: "The MailerLite list, the ad accounts, the landing page and the funnel are all on your domain and your tools. We hand over everything; you keep the audience and re-use it for product #2. No data lock-in." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  ctaLead: "Want the LaunchBoom playbook on",
  ctaAccent: "fixed-fee terms",
  ctaSub: "30 minutes. Free. You walk out with a concrete MVA plan and a fee comparison against the LaunchBoom quote you already have — whether or not you keep working with us.",
};

const LaunchBoomAlternative = () => <SeoLandingTemplate content={content} />;
export default LaunchBoomAlternative;
