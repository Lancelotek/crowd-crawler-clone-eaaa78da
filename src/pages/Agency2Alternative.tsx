import { Scale, Wallet, Users, Rocket } from "lucide-react";
import { LANDING_FAQS } from "@/seo/landingFaqs";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Agency 2.0 Alternative — No 7-Figure Minimum | JAY-23",
  metaDescription: "Looking for an Agency 2.0 alternative? JAY-23 runs the 90-day MVA Framework: fixed monthly fee, no minimum raise, founder-led. 46 campaigns, $1.2M+ raised.",
  canonical: "/en/agency-2-0-alternative",
  breadcrumbName: "Agency 2.0 Alternative",
  serviceType: "Crowdfunding agency (Agency 2.0 alternative)",
  eyebrow: "Agency 2.0 alternative · No minimum raise",
  h1Lead: "The Agency 2.0 alternative for creators",
  h1Accent: "below the seven-figure cutoff",
  heroSub: "Agency 2.0 built its reputation on managing massive Kickstarter and Indiegogo campaigns. Below their typical threshold, most creators can't get in the door. We run a similar pre-launch and paid-media architecture for sub-$500k projects on a fixed monthly fee. 46 campaigns, $1.2M+ raised.",
  bookSource: "agency-2-0-alternative",
  problemEyebrow: "Why creators look for an alternative",
  problemTitle: "What pushes creators to look past Agency 2.0 in 2026.",
  problemParas: [
    "Agency 2.0 is one of the most established names in crowdfunding services. The portfolio is real and the team is experienced — but the commercial model is built around large campaigns: high minimum fees, performance-based pricing tied to total raise, and a roster of past clients that skews to seven- and eight-figure projects.",
    "If you're a first- or second-time creator with a $50k–$300k goal, you typically run into one of three walls: minimum fee that eats your entire marketing budget, a percentage model where success makes the bill compound faster than your margin, or a quote that simply isn't returned because the campaign size is below their threshold.",
    "The underlying playbook — pre-launch funnel, paid traffic, email sequences, launch-day activation — isn't size-dependent. The same architecture works on a $100k campaign and a $1M campaign; only the ad budget and channel mix scale. What you don't need at sub-$500k is the agency overhead, the minimum spend tier, or the rev-share that's structured for whales.",
  ],
  reasonsEyebrow: "MVA vs Agency 2.0",
  reasonsTitle: "Four reasons sub-$500k creators pick MVA over Agency 2.0.",
  reasons: [
    { icon: Wallet, label: "No minimum raise", title: "Built for $50k–$500k campaigns, not just whales", body: "We work with first-time creators and indie studios at goals where the larger agencies won't return the email. The framework is the same; the operational footprint is sized for your campaign, not theirs." },
    { icon: Scale, label: "Fixed-fee pricing", title: "$1,500/month flat, no percentage of raise", body: "No success fee tied to total pledges, no commission on stretch goals. You keep 100% of what your campaign raises after platform fees." },
    { icon: Users, label: "Founder-led", title: "Marek runs the campaign personally", body: "No agency layer between you and the strategist. The person who scopes the engagement is the person who writes the ads, optimizes the funnel, and shows up on launch night." },
    { icon: Rocket, label: "Same architectural spine", title: "Pre-launch funnel, 4-wave activation, day-one momentum", body: "Pre-launch landing on your domain, paid funnels across Meta and Reddit, MailerLite sequences, coordinated launch-hour activation. The mechanics that work for nine-figure agencies work at $200k goals too." },
  ],
  phasesTitle: "How an MVA engagement compares to the Agency 2.0 workflow.",
  phases: [
    { n: "01", title: "Discover — offer, hook, ICP", body: "Same diagnostic rigor: positioning, reward tiers, ICP segments, category reverse-engineering. Scoped to a campaign with a $100k–$500k goal, not a $5M one." },
    { n: "02", title: "Build — pre-launch funnel & paid ads", body: "Pre-launch landing on your domain. Lead magnet that pulls pre-qualified backers at $4–$12 each. Meta + Reddit + niche-community funnels. MailerLite sequences. Tagged event layer end-to-end." },
    { n: "03", title: "Launch — 4-wave activation", body: "T-7 warm-up. Launch hour: email + retargeting + community drops fired simultaneously. First 48 hours: founder DMs, paid scaled to converting segments, organic momentum compounding through Kickstarter's algorithm." },
  ],
  deliverablesTitle: "Same architecture as a large-agency engagement, sized for your campaign.",
  deliverables: [
    "Platform recommendation (Kickstarter / Indiegogo / Gamefound)",
    "Offer, reward tier and pledge ladder review",
    "Pre-launch landing page on your domain",
    "Meta, Reddit and community ad funnels",
    "Email sequence (5–9 emails) in MailerLite",
    "Analytics + UTM layer (GA4 + Plausible)",
    "Launch-day 4-wave activation playbook",
    "Founder-led weekly reviews through funding",
  ],
  comparisonEyebrow: "MVA vs Agency 2.0",
  comparisonTitle: "Same playbook, very different access tier.",
  comparisonRightLabel: "Agency 2.0 (typical)",
  comparison: [
    { row: "Minimum campaign size accepted", mva: "$50k+", cold: "$500k+ (typical)" },
    { row: "Pricing model", mva: "Fixed $1,500/mo", cold: "Fee + % of raise" },
    { row: "Engagement length", mva: "Month-to-month", cold: "Multi-month MSA" },
    { row: "Who runs the campaign", mva: "Founder", cold: "Account team" },
    { row: "Pre-launch funnel & paid ads", mva: true, cold: true },
    { row: "4-wave launch activation", mva: true, cold: true },
    { row: "Owned audience after campaign", mva: true, cold: true },
  ],
  extraSections: [
    {
      h2: "Agency 2.0 pricing: what the minimums actually mean",
      paras: [
        "Agency 2.0 works with campaigns that expect to raise seven figures. The minimums quoted to creators — a substantial monthly retainer plus a media budget commitment — exist because that is the level at which their model works, not because smaller campaigns are badly run.",
        "For a first-time creator the practical effect is exclusion: if you cannot commit to a large monthly media budget for the full pre-launch window, you do not qualify, and no amount of negotiating changes the structure. That is what sends most creators to this page.",
        "Our number is $1,500/month with no minimum raise and no committed media budget beyond what your funnel proves it can spend profitably. Start at $2,000-3,000 of test spend, scale only into segments that convert. If your campaign genuinely is heading past seven figures, an agency at scale may serve you better — and we will tell you that on the call.",
      ],
    },
  ],
  faqs: LANDING_FAQS["/en/agency-2-0-alternative"],
  ctaLead: "Want a real crowdfunding partner",
  ctaAccent: "below the seven-figure tier",
  ctaSub: "30 minutes. Free. You walk out with a concrete MVA plan sized for your goal — whether or not you keep working with us.",
};

const Agency2Alternative = () => <SeoLandingTemplate content={content} />;
export default Agency2Alternative;
