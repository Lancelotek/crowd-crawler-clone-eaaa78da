import { Target, Users, LineChart, Rocket } from "lucide-react";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Product Launch Agency — Demand Before Launch Day | JAY-23",
  metaDescription: "Product launch agency that builds demand before launch day. 90-day MVA Framework: 1,000+ pre-qualified buyers and day-one revenue, not day-one silence.",
  canonical: "/en/product-launch-agency",
  breadcrumbName: "Product Launch Agency",
  serviceType: "Product launch marketing agency",
  eyebrow: "Product launch agency · Pre-launch marketing",
  h1Lead: "The product launch agency for",
  h1Accent: "day-one revenue, not day-one silence",
  heroSub: "Most product launches concentrate 100% of risk on a single 24-hour window. We invert that: 90 days before launch we validate demand, build 1,000+ pre-qualified buyers, and script a 4-wave activation so day one produces real revenue. Hardware, software, DTC, B2B — same framework, different channels.",
  bookSource: "product-launch-agency",
  problemEyebrow: "The launch-day trap",
  problemTitle: "Why most product launches go quiet on day one.",
  problemParas: [
    "The default product launch playbook: build for 6–18 months, polish the launch page, schedule the tweet, send the email, hope. It almost always disappoints because the audience is asked to discover the product the same week it's available to buy — which is the worst-converting moment in any funnel.",
    "A cold launch puts every dollar of risk on a single 24-hour window. If the tweet underperforms, the launch underperforms. If a competitor launches the same day, you're invisible. If the message doesn't land in the first 6 seconds, the algorithm de-ranks you and the moment is over.",
    "The fix isn't a louder launch — it's an audience that already exists when launch day arrives. Built right, a Minimum Viable Audience does 8–14× the day-one conversion of a cold launch and gives you a working CAC model before you spend on growth.",
  ],
  reasonsEyebrow: "Why MVA for product launches",
  reasonsTitle: "Four reasons founders use MVA before they hit publish.",
  reasons: [
    { icon: Target, label: "Demand validation", title: "Stop launching products no one was waiting for", body: "We validate buying intent with a landing page and paid traffic before launch. If cost-per-lead is wrong, the positioning is wrong — fix it on a $400 ad test, not on launch day." },
    { icon: Users, label: "1,000 true fans", title: "Build a buyer list, not a vanity waitlist", body: "1,000+ pre-qualified buyers tagged by intent. Day-one paid conversion runs 8–14× a cold launch — and the list compounds for every product you ship after this one." },
    { icon: LineChart, label: "Real GTM data", title: "Know your CAC and message before you launch", body: "CPL benchmarks, the winning hook, the channel mix, and a rough LTV/CAC model. Investors and your future growth hire get a base camp instead of a blank page." },
    { icon: Rocket, label: "Launch day with leverage", title: "Day-one revenue that doesn't depend on one tweet", body: "4-wave activation across email, retargeting and community drops. Even a quiet launch day produces 50–200 paying customers and a real revenue cohort to learn from." },
  ],
  phasesTitle: "How we take a product from idea to launch with paying customers on day one.",
  phases: [
    { n: "01", title: "Discover — positioning & ICP", body: "Pressure-test the wedge: which segment, which pain, which willingness to pay. Map adjacent products that already monetize a similar audience and reverse-engineer their messaging gaps." },
    { n: "02", title: "Build — landing, lead magnet, paid funnel", body: "One sharp landing page. A lead magnet that's actually useful. Meta, LinkedIn, Reddit and category-specific funnels. MailerLite or Customer.io sequences. Tagged event layer so day-one cohorts are tracked from day one." },
    { n: "03", title: "Launch — activate the MVA across 4 waves", body: "T-7 warm-up. Launch day: 4 staggered email waves + retargeting + community drops. Week one: founder DMs to top 5% engaged leads, onboarding loops, weekly close calls. We optimize until activation curves stabilize." },
  ],
  deliverablesTitle: "Concrete deliverables. No retainers without artifacts.",
  deliverables: [
    "Positioning, ICP and message-market fit doc",
    "1 conversion-optimized launch landing page",
    "Lead magnet (template / mini-tool / report)",
    "Meta, LinkedIn and Reddit paid ad funnels",
    "Email sequence (5–9 emails) in MailerLite / Customer.io",
    "Analytics + UTM event layer (GA4 + Plausible)",
    "Launch-day 4-wave activation playbook",
    "Weekly metrics review and CPL/CAC benchmarks",
  ],
  comparisonEyebrow: "MVA vs cold launch",
  comparisonTitle: "Same product, two launch strategies, very different day-ones.",
  comparisonRightLabel: "Cold launch",
  comparison: [
    { row: "Pre-launch demand validation", mva: true, cold: false },
    { row: "Day-one paying customers", mva: "50–200", cold: "0–10" },
    { row: "CAC known before launch", mva: true, cold: false },
    { row: "Launch-day risk concentration", mva: "Distributed", cold: "All on day-one" },
    { row: "Time to first revenue cohort", mva: "Day 1", cold: "Month 2–4" },
    { row: "Investor narrative", mva: "Demand-validated", cold: "We hope" },
    { row: "Cost", mva: "$1.5k/mo + ad spend", cold: "$0 + opportunity cost" },
  ],
  faqs: [
    { q: "What kinds of products do you launch?", a: "Hardware, software, DTC, B2B SaaS, creator products, marketplaces, and crowdfunded products. The MVA framework holds; channels and lead-magnet shape change by category. We're a poor fit for pure local services, single-city restaurants, and anything with sub-$100k LTV at a sub-$500 ACV." },
    { q: "How is this different from a launch PR or growth agency?", a: "PR agencies pitch press for launch week. Growth agencies optimize a launched product. Neither builds the demand side before launch. MVA fills that gap — and once you've launched and CAC stabilizes, a growth agency is the right next vendor." },
    { q: "What does it cost?", a: "Fixed $1,500/month. No revenue share, no success fee. Ad budget is separate — typical launches spend $5k–$20k on paid traffic over 90 days." },
    { q: "Can you work with our existing brand, agency, or product team?", a: "Yes. We're a dedicated launch layer, not a full-service replacement. We coordinate with your existing brand studio, PR firm, and product team. We bring the demand strategy, audience build and launch playbook." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with founders globally." },
  ],
  ctaLead: "Ready for a product launch with",
  ctaAccent: "paying customers on day one",
  ctaSub: "30 minutes. Free. You walk out with a concrete MVA plan for your launch — whether or not you keep working with us.",
};

const ProductLaunchAgency = () => <SeoLandingTemplate content={content} />;
export default ProductLaunchAgency;
