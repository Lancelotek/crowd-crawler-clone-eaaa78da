import { Target, Users, LineChart, Rocket } from "lucide-react";
import { LANDING_FAQS } from "@/seo/landingFaqs";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Crowdfunding Agency for Kickstarter, Indiegogo & Gamefound",
  metaDescription: "Crowdfunding agency for Kickstarter, Indiegogo and Gamefound. 90-day MVA Framework, 1,000+ pre-qualified backers, $1.2M+ raised across 46 campaigns.",
  canonical: "/en/crowdfunding-agency",
  breadcrumbName: "Crowdfunding Agency",
  serviceType: "Crowdfunding marketing agency",
  eyebrow: "Crowdfunding agency · Kickstarter · Indiegogo · Gamefound",
  h1Lead: "The crowdfunding agency that",
  h1Accent: "builds backers before campaigns",
  heroSub: "Most crowdfunding campaigns die in week one because the audience shows up after the page does. We work the other side: 90 days before launch we build 1,000+ pre-qualified backers, then activate them in waves so the campaign funds on day one. Works on Kickstarter, Indiegogo and Gamefound.",
  bookSource: "crowdfunding-agency",
  problemEyebrow: "The crowdfunding trap",
  problemTitle: "Why most crowdfunding campaigns underperform their pitch deck.",
  problemParas: [
    "The pitch deck says \"$250k campaign, here's our category benchmark.\" The launch hits $42k. The gap isn't the product or the page — it's that the campaign launched without an audience and tried to recruit one in real time. Cold traffic to a brand-new campaign converts at 1–2%, which is not enough to compound.",
    "Kickstarter, Indiegogo and Gamefound all reward early momentum. Day-one funding triggers algorithmic placement; algorithmic placement brings organic traffic; organic traffic compounds for the rest of the campaign. Miss the first 48 hours and you're paying for every pledge for the next 28 days.",
    "The fix is the same on every platform: build the audience before the campaign, score it by intent, activate it in coordinated waves. Different categories use different channels, but the underlying framework — Minimum Viable Audience — is identical across hardware, tabletop, board games, and creative.",
  ],
  reasonsEyebrow: "Why MVA for crowdfunding",
  reasonsTitle: "Four reasons creators use MVA before they pick a platform.",
  reasons: [
    { icon: Target, label: "Demand validation", title: "Test the offer before you commit to a platform", body: "We validate hook and pledge tiers on a simple landing page. The same MVA data tells you whether Kickstarter, Indiegogo or Gamefound is the right platform for your category and audience." },
    { icon: Users, label: "1,000 true fans", title: "A backer list scored by intent, not a vanity waitlist", body: "1,000+ pre-qualified backers segmented by tier interest. Day-one conversion runs 8–14× a cold launch — exactly the signal every crowdfunding algorithm rewards." },
    { icon: LineChart, label: "Real CAC data", title: "Know your cost-per-backer before launch week", body: "CPL benchmarks, winning hook, channel mix, realistic pledge forecast. No more guessing whether the campaign will fund — you have the numbers." },
    { icon: Rocket, label: "Day-one funding", title: "Hit goal in 48 hours on any major platform", body: "4-wave activation across email, retargeting and category-specific communities (BGG, Reddit, Discord, niche Slacks) puts 40–70% of goal on the board in the first day." },
  ],
  phasesTitle: "How we take a crowdfunding campaign from idea to funded on day one.",
  phases: [
    { n: "01", title: "Discover — platform, offer, ICP", body: "Decide Kickstarter vs Indiegogo vs Gamefound based on category and ICP. Pressure-test reward tiers, stretch goals, and the 1–2 backer segments that buy fastest." },
    { n: "02", title: "Build — landing, lead magnet, paid funnel", body: "Pre-launch landing page on your domain. Lead magnet that pulls pre-qualified backers at $1.50–$4 CPL. Meta, Reddit and community funnels with a tagged event layer." },
    { n: "03", title: "Launch — activate across 4 waves", body: "T-7 warm-up. Launch hour: email blast, retargeting and community drops. First 48 hours: founder DMs to high-intent leads. We optimize until you're funded, then push stretch goals." },
  ],
  deliverablesTitle: "Concrete deliverables. No retainers without artifacts.",
  deliverables: [
    "Platform recommendation (Kickstarter / Indiegogo / Gamefound)",
    "Offer, reward tier and pledge ladder review",
    "1 pre-launch landing page on your domain",
    "Lead magnet that pulls pre-qualified backers",
    "Meta, Reddit and community-drop ad funnels",
    "Email sequence (5–9 emails) in MailerLite",
    "Launch-day 4-wave activation playbook",
    "Weekly metrics review through funding",
  ],
  comparisonEyebrow: "MVA vs cold crowdfunding launch",
  comparisonTitle: "Same campaign, two strategies, very different funding outcomes.",
  comparisonRightLabel: "Cold launch",
  comparison: [
    { row: "Pre-launch audience built", mva: true, cold: false },
    { row: "Day-one pledges", mva: "40–70% of goal", cold: "0–5% of goal" },
    { row: "Cost per backer", mva: "$4–$12", cold: "$15–$40" },
    { row: "Algorithm momentum", mva: "Triggered", cold: "Missed" },
    { row: "Funding probability", mva: "85%+", cold: "~40%" },
    { row: "Time to first revenue cohort", mva: "Hour 1", cold: "Week 2–3" },
    { row: "Cost", mva: "$1.5k/mo + ad spend", cold: "$0 + missed goal" },
  ],
  faqs: LANDING_FAQS["/en/crowdfunding-agency"],
  ctaLead: "Ready for a crowdfunding campaign that funds",
  ctaAccent: "before day one ends",
  ctaSub: "30 minutes. Free. You walk out with a concrete MVA plan and a platform recommendation — whether or not you keep working with us.",
};

const CrowdfundingAgency = () => <SeoLandingTemplate content={content} />;
export default CrowdfundingAgency;
