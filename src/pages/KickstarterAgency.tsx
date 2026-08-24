import { Target, Users, LineChart, Rocket } from "lucide-react";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Kickstarter Agency for Day-One Fully Funded Campaigns",
  metaDescription: "Kickstarter agency that builds 1,000+ true fans before launch day. 90-day MVA Framework, fixed fee, no revenue share. 46 campaigns, $1.2M+ raised.",
  canonical: "/en/kickstarter-agency",
  breadcrumbName: "Kickstarter Agency",
  serviceType: "Kickstarter marketing agency",
  eyebrow: "Kickstarter agency · Pre-launch marketing",
  h1Lead: "The Kickstarter agency for",
  h1Accent: "day-one fully funded campaigns",
  heroSub: "Most Kickstarter campaigns fail in the first 48 hours because the audience is built after the page goes live, not before. We run the 90-day MVA Framework: validate the product, build 1,000+ pre-qualified backers, and ship a launch day that hits goal before lunch. 46 campaigns, $1.2M+ raised.",
  bookSource: "kickstarter-agency",
  problemEyebrow: "The Kickstarter trap",
  problemTitle: "Why 60% of Kickstarter campaigns never reach goal.",
  problemParas: [
    "The default Kickstarter playbook is to build the product, polish the page, hit launch, and pray traffic shows up. It almost never does. Kickstarter is not a discovery platform — algorithmic placement is reserved for projects that already have momentum in the first 24 hours.",
    "Without a pre-built audience, you spend launch week buying cold traffic at $15–$40 per pledge while your conversion rate sits at 1–2%. Margins disappear before stretch goals do. Then the page drops off the Popular tab on day 4, and the campaign limps to 30–60% of goal.",
    "The fix is structural: build an audience of pre-qualified backers in the 60–90 days before launch, then activate them in waves during the first 48 hours. That's what the MVA Framework does — it manufactures the launch-day momentum Kickstarter rewards algorithmically.",
  ],
  reasonsEyebrow: "Why MVA for Kickstarter",
  reasonsTitle: "Four reasons creators use MVA before the launch button.",
  reasons: [
    { icon: Target, label: "Demand validation", title: "Prove backers will pay before you commit to production", body: "We validate the offer with a landing page and paid traffic before you place the manufacturing order. If cost-per-lead is wrong, the offer is wrong — fix it on a $400 ad test, not a $40k production run." },
    { icon: Users, label: "1,000 true fans", title: "Build a backer list, not a vanity waitlist", body: "1,000+ pre-qualified backers tagged by intent. Day-one conversion runs 8–14× a cold launch, which is what triggers Kickstarter's Popular and Staff Pick algorithms." },
    { icon: LineChart, label: "Real CAC data", title: "Know your cost-per-backer before launch week", body: "By launch day you have CPL benchmarks, the winning hook, the channel mix, and a realistic pledge forecast. No more guessing what the campaign will hit." },
    { icon: Rocket, label: "Day-one funding", title: "Hit goal in the first 48 hours, every time", body: "A 4-wave activation across email, retargeting and community drops puts 40–70% of goal on the board in the first day. Algorithm sees momentum, organic traffic compounds." },
  ],
  phasesTitle: "How we take a Kickstarter campaign from idea to funded on day one.",
  phases: [
    { n: "01", title: "Discover — offer, hook, ICP", body: "Pressure-test the product positioning, reward structure and pledge tiers. Identify the 1–2 backer segments that convert and reverse-engineer competitor campaigns in the category." },
    { n: "02", title: "Build — landing, lead magnet, paid funnel", body: "One sharp pre-launch landing page on your domain. A lead magnet that pulls signups for $1.50–$4 CPL. Meta + Reddit + niche-community funnels, MailerLite sequences, tagged event layer." },
    { n: "03", title: "Launch — activate the MVA across 4 waves", body: "T-7 warm-up. Launch hour: simultaneous email blast, retargeting and community drops. First 48 hours: founder DMs to top 5% engaged leads. We optimize until you're funded — then push for stretch goals." },
  ],
  deliverablesTitle: "Concrete deliverables. No retainers without artifacts.",
  deliverables: [
    "Offer, reward tier and pledge ladder review",
    "1 conversion-optimized pre-launch landing page",
    "Lead magnet that pulls pre-qualified backers",
    "Meta, Reddit and community-drop ad funnels",
    "Email sequence (5–9 emails) in MailerLite",
    "Analytics + UTM layer (GA4 + Plausible)",
    "Launch-day 4-wave activation playbook",
    "Weekly metrics review through funding",
  ],
  comparisonEyebrow: "MVA vs cold Kickstarter launch",
  comparisonTitle: "Same product, two launches, very different funding days.",
  comparisonRightLabel: "Cold launch",
  comparison: [
    { row: "Pre-launch demand validation", mva: true, cold: false },
    { row: "Day-one pledges", mva: "40–70% of goal", cold: "0–5% of goal" },
    { row: "Cost per backer", mva: "$4–$12", cold: "$15–$40" },
    { row: "Algorithm momentum", mva: "Triggered", cold: "Missed" },
    { row: "Funding probability", mva: "85%+", cold: "~40%" },
    { row: "Stretch goal hit rate", mva: "Common", cold: "Rare" },
    { row: "Cost", mva: "$1.5k/mo + ad spend", cold: "$0 + missed goal" },
  ],
  faqs: [
    { q: "How is this different from a Kickstarter PR or video agency?", a: "PR agencies pitch journalists; video agencies make the campaign film. Both are valuable, neither builds the backer audience the algorithm rewards. We do the audience layer — the demand side of the campaign. We're often hired alongside a video studio or PR firm, not instead of one." },
    { q: "What does it cost — and do you take a percentage of pledges?", a: "Fixed monthly fee of $1,500 (PLN equivalent for Polish creators). No revenue share, no percentage of pledges, no success fee. You own 100% of what you raise. Ad budget is separate — typical campaigns spend $3k–$15k on paid traffic over 90 days." },
    { q: "We have 6 weeks until launch. Can we still work together?", a: "Tight but possible for simpler products. The framework is built for 90 days; in 6 weeks we compress the discover phase and accept slightly higher CPLs. For complex hardware, we'd recommend pushing launch back 4 weeks rather than running a half-baked MVA." },
    { q: "Do you only work with hardware/product campaigns or also tabletop, games, and creative?", a: "All Kickstarter categories. Tabletop games and creative projects often have the highest MVA leverage because backer communities are tightly clustered (BoardGameGeek, Reddit r/boardgames, Discord servers) — exactly where MVA targeting excels." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally. Weekly sync, async daily updates, monthly strategy review." },
  ],
  ctaLead: "Ready for a Kickstarter launch that hits goal",
  ctaAccent: "before the first day ends",
  ctaSub: "30 minutes. Free. You walk out with a concrete MVA plan for your campaign — whether or not you keep working with us.",
};

const KickstarterAgency = () => <SeoLandingTemplate content={content} />;
export default KickstarterAgency;
