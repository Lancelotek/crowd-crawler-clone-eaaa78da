import { Scale, Wallet, Users, Rocket } from "lucide-react";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Agency 2.0 Alternative — Crowdfunding Without 7-Figure Minimums | JAY-23",
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
  faqs: [
    { q: "Is Agency 2.0 bad?", a: "No. They're one of the most established crowdfunding agencies and their portfolio is real. They're built for a specific tier of campaign — typically large hardware, high-AOV consumer products, and creators with existing audiences. If you fit that profile and the commercial terms work, they're a strong pick. The reason you'd land on this page is almost always that your campaign size or budget is below their threshold." },
    { q: "What's the largest campaign you've worked on?", a: "Our top single-campaign result is $332,694 (Woolet on Kickstarter). Across 46 campaigns we've raised $1.2M+. We're transparent that we're not a fit for $5M hardware launches — for those, Agency 2.0 or LaunchBoom at their top tier is the right call." },
    { q: "Do you take a percentage of what we raise?", a: "No. Fixed $1,500/month, period. Ad budget is separate and goes directly to your Meta/Reddit account on your card." },
    { q: "Do you work on Indiegogo, not just Kickstarter?", a: "Yes — Kickstarter, Indiegogo and Gamefound. Platform recommendation is part of the Discover phase based on your category and ICP, not a default." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  ctaLead: "Want a real crowdfunding partner",
  ctaAccent: "below the seven-figure tier",
  ctaSub: "30 minutes. Free. You walk out with a concrete MVA plan sized for your goal — whether or not you keep working with us.",
};

const Agency2Alternative = () => <SeoLandingTemplate content={content} />;
export default Agency2Alternative;
