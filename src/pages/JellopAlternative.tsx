import { Wallet, Users, Layers, Rocket } from "lucide-react";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Jellop Alternative — Kickstarter Marketing Without 25% Performance Cut | JAY-23",
  metaDescription: "Looking for a Jellop alternative? JAY-23 runs the 90-day MVA Framework: fixed monthly fee, no performance percentage, full pre-launch + paid + email.",
  canonical: "/en/jellop-alternative",
  breadcrumbName: "Jellop Alternative",
  serviceType: "Kickstarter ad agency (Jellop alternative)",
  eyebrow: "Jellop alternative · Full funnel, not just paid",
  h1Lead: "The Jellop alternative for creators who want",
  h1Accent: "the full funnel, not just live-campaign ads",
  heroSub: "Jellop is a paid-media specialist that drives traffic to live Kickstarter campaigns on a performance-based fee. That model works when your campaign is already funded. We run the layer before that: 90 days of pre-launch funnels and audience building, then a 4-wave launch activation — for a fixed monthly fee, no performance cut.",
  bookSource: "jellop-alternative",
  problemEyebrow: "Why creators look for an alternative",
  problemTitle: "What Jellop is great at — and where the gap is.",
  problemParas: [
    "Jellop has a strong reputation for one specific thing: scaling paid ads to a live Kickstarter campaign that already has product-market fit and early momentum. If your campaign is already on the Popular page on day 2, pointing Jellop's paid-media operation at it is a legitimate way to scale.",
    "The gap creators hit is the inverse problem: campaigns that don't reach Popular on day 2 don't get the algorithmic placement that makes paid-to-live-page ROI work. Cold traffic to a struggling campaign converts at 1–2% and burns budget. By the time you'd hand it to a performance-ads agency, the algorithmic window has already closed.",
    "The fix is to do the audience layer before the campaign goes live, not after. Build 1,000+ pre-qualified backers in the 60–90 days before launch, activate them in coordinated waves during the first 48 hours, then — once you have day-one momentum — paid-media scaling actually has something to compound. That's the layer MVA delivers and Jellop, by design, doesn't.",
  ],
  reasonsEyebrow: "MVA vs Jellop",
  reasonsTitle: "Four reasons creators pick MVA over Jellop (or run both).",
  reasons: [
    { icon: Layers, label: "Full funnel", title: "Pre-launch, launch, paid — not just live-page ads", body: "We own the demand side: positioning, landing page, lead magnet, email sequences, launch-day activation. Paid is one channel inside the funnel, not the whole engagement." },
    { icon: Wallet, label: "Pricing model", title: "Fixed monthly fee, no performance percentage", body: "$1,500/month flat. No 15–25% performance cut on ad-attributed pledges, no commission on raise. Your ad spend goes straight to Meta/Reddit on your card." },
    { icon: Users, label: "Pre-launch audience", title: "Build 1,000+ pre-qualified backers before launch", body: "An owned email list scored by intent, on your MailerLite — re-usable for product #2. Paid ads to a live campaign give you backers; pre-launch ads give you an audience you keep." },
    { icon: Rocket, label: "Day-one momentum", title: "Trigger the algorithm that makes paid ROI work", body: "4-wave activation puts 40–70% of goal on the board in 48 hours. That's the algorithmic momentum that makes live-page paid traffic ROI-positive — including, if you want, a Jellop or similar performance engagement after launch." },
  ],
  phasesTitle: "How an MVA engagement compares to a Jellop-style paid engagement.",
  phases: [
    { n: "01", title: "Discover — offer, hook, ICP", body: "Positioning, reward tiers, ICP segments, category reverse-engineering. Decide channel mix (Meta, Reddit, niche communities) based on where your backers actually live." },
    { n: "02", title: "Build — pre-launch funnel & paid ads", body: "Pre-launch landing on your domain. Lead magnet that pulls pre-qualified backers at $4–$12 each. Meta + Reddit + niche-community funnels. MailerLite sequences. Tagged event layer end-to-end — so paid attribution holds up." },
    { n: "03", title: "Launch — 4-wave activation", body: "T-7 warm-up. Launch hour: email + retargeting + community drops fired simultaneously. First 48 hours: founder DMs, paid scaled to converting segments only. From day 3 onward, paid economics actually compound." },
  ],
  deliverablesTitle: "What you get instead of (or alongside) a Jellop engagement.",
  deliverables: [
    "Offer, reward tier and pledge ladder review",
    "Pre-launch landing page on your domain",
    "Lead magnet that pulls pre-qualified backers",
    "Meta, Reddit and community ad funnels (creative + targeting)",
    "Email sequence (5–9 emails) in MailerLite",
    "Analytics + UTM layer (GA4 + Plausible)",
    "Launch-day 4-wave activation playbook",
    "Founder-led weekly reviews through funding",
  ],
  comparisonEyebrow: "MVA vs Jellop",
  comparisonTitle: "Different layer of the campaign — pick the one your campaign needs.",
  comparisonRightLabel: "Jellop (typical)",
  comparison: [
    { row: "Pre-launch audience build", mva: true, cold: false },
    { row: "Live-campaign paid scaling", mva: "Yes (day 3+)", cold: "Core focus" },
    { row: "Pricing model", mva: "Fixed $1,500/mo", cold: "Fee + % of ad-attributed pledges" },
    { row: "Email sequences & lifecycle", mva: true, cold: false },
    { row: "Owned audience after campaign", mva: "1,000+ leads", cold: "~0" },
    { row: "Best fit", mva: "Pre-launch + launch", cold: "Already-funded campaigns" },
    { row: "Can be combined", mva: "Yes (post-launch)", cold: "Yes (post-launch)" },
  ],
  faqs: [
    { q: "Is Jellop bad?", a: "No. They're one of the most respected paid-media operators in crowdfunding and they do their specific job well. The point isn't that Jellop is wrong — it's that paid-to-live-page is one layer of a Kickstarter campaign, and it only works when there's already momentum to scale. If you're trying to figure out who builds the momentum in the first place, that's a different vendor." },
    { q: "Can we run MVA before launch and Jellop after?", a: "Yes, and that's a sensible stack for larger campaigns. MVA builds the audience and runs days 1–3; once the campaign is on Popular and has organic compounding, a performance-paid specialist scaling Meta and Google can extract additional ROI. We're explicit about that hand-off and don't try to monopolize the engagement." },
    { q: "Do you take a percentage of pledges or ad-attributed revenue?", a: "No. Fixed $1,500/month, period. Ad spend goes directly to Meta/Reddit on your card — no markup, no performance cut." },
    { q: "What if our campaign goes live next week and we never did pre-launch?", a: "Then MVA isn't the right fit and we'll say so on the first call. A live-campaign performance specialist (Jellop, Funded Today, etc.) is a better choice for a campaign already in-market. We'll tell you that for free." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  ctaLead: "Want the pre-launch layer that makes",
  ctaAccent: "paid-media ROI actually work",
  ctaSub: "30 minutes. Free. You walk out with a concrete MVA plan and an honest read on whether you also need a performance-paid vendor post-launch.",
};

const JellopAlternative = () => <SeoLandingTemplate content={content} />;
export default JellopAlternative;
