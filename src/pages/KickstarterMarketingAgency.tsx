import { Target, Users, LineChart, Rocket } from "lucide-react";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Kickstarter Marketing Agency — Fixed Fee, No Revenue Share",
  metaDescription: "Kickstarter marketing agency: paid ads, pre-launch funnels and email sequences. Fixed monthly fee, no revenue share. 46 campaigns, $1.2M+ raised.",
  canonical: "/en/kickstarter-marketing-agency",
  breadcrumbName: "Kickstarter Marketing Agency",
  serviceType: "Kickstarter marketing and paid ads agency",
  eyebrow: "Kickstarter marketing · Paid ads · Pre-launch funnels",
  h1Lead: "The Kickstarter marketing agency for",
  h1Accent: "campaigns that fund themselves",
  heroSub: "Most Kickstarter campaigns waste 60% of their ad budget driving cold traffic to a live campaign. We do it the other way: 90 days of paid funnels build a list of 1,000+ pre-qualified backers, then a 4-wave launch activation converts them in the first 48 hours. 46 campaigns, $1.2M+ raised, fixed monthly fee.",
  bookSource: "kickstarter-marketing-agency",
  problemEyebrow: "The Kickstarter marketing trap",
  problemTitle: "Why running ads to a live Kickstarter campaign is the most expensive way to fund one.",
  problemParas: [
    "When you point Meta or Reddit ads at a live Kickstarter page, cold-traffic conversion sits at 1–2% and cost-per-pledge runs $15–$40. By day 5, the math breaks: every pledge costs more than the platform fee plus shipping plus production margin. You're funding losses, not the campaign.",
    "The other problem is timing. Kickstarter's algorithm decides whether to promote your campaign in the first 24–48 hours. If you spend launch week building an audience through ads, you miss the algorithmic window — and the back half of the campaign is a slow grind to goal that often falls short.",
    "Kickstarter marketing only works when the audience-building happens before launch. The same ad budget, deployed 60–90 days before the launch date into a pre-launch funnel, produces a list of pre-qualified backers at $4–$12 each — then converts at 30–50% on launch day. The ROI swing is 4–8×.",
  ],
  reasonsEyebrow: "Why MVA-driven Kickstarter marketing",
  reasonsTitle: "Four reasons our Kickstarter marketing playbook outperforms ads-to-live-page.",
  reasons: [
    { icon: Target, label: "Pre-launch funnels", title: "Spend ad budget where it actually converts", body: "Pre-launch landing pages convert cold traffic at 8–15% to email — 5–10× a Kickstarter project page. Same dollars, more leads, lower CPL." },
    { icon: Users, label: "1,000 true fans", title: "An owned list, not borrowed Kickstarter traffic", body: "1,000+ pre-qualified backers in your MailerLite, scored by intent. You own them after the campaign, so the next product is launched with a head start." },
    { icon: LineChart, label: "Real funnel math", title: "Predictable cost-per-backer, not launch-week panic", body: "By day 30 we know CPL by channel and creative. By day 60 we know which segment converts highest. Launch day is a deployment, not a gamble." },
    { icon: Rocket, label: "4-wave activation", title: "Day-one funding that triggers the algorithm", body: "Coordinated email + retargeting + community drops put 40–70% of goal on the board in 48 hours. Kickstarter rewards momentum with organic placement; compounding starts." },
  ],
  phasesTitle: "How our Kickstarter marketing engine takes you from idea to funded.",
  phases: [
    { n: "01", title: "Discover — offer, hook, ICP", body: "Pressure-test the campaign hook, reward tiers and the 1–2 backer segments that buy fastest. Reverse-engineer top-funded campaigns in your category for messaging and creative angles." },
    { n: "02", title: "Build — pre-launch funnel & paid ads", body: "Pre-launch landing page on your domain. Lead magnet that pulls pre-qualified backers. Meta + Reddit + niche-community ad funnels. MailerLite sequences. Tagged event layer end-to-end." },
    { n: "03", title: "Launch — activate the MVA across 4 waves", body: "T-7 warm-up. Launch hour: email + retargeting + community drops fired simultaneously. First 48 hours: founder DMs, social proof updates, paid ads scaled to the converting segments only." },
  ],
  deliverablesTitle: "Concrete Kickstarter marketing deliverables.",
  deliverables: [
    "Hook, offer and reward tier review",
    "1 pre-launch landing page on your domain",
    "Lead magnet that pulls pre-qualified backers",
    "Meta, Reddit and community ad funnels (creative + targeting)",
    "Email sequence (5–9 emails) in MailerLite",
    "Analytics + UTM layer (GA4 + Plausible)",
    "Launch-day 4-wave activation playbook",
    "Weekly metrics review through funding",
  ],
  comparisonEyebrow: "MVA marketing vs ads-to-live-page",
  comparisonTitle: "Same ad budget, two strategies, very different ROI.",
  comparisonRightLabel: "Ads to live page",
  comparison: [
    { row: "Cost per backer", mva: "$4–$12", cold: "$15–$40" },
    { row: "Day-one funding contribution", mva: "40–70% of goal", cold: "0–5% of goal" },
    { row: "Algorithm momentum", mva: "Triggered", cold: "Missed" },
    { row: "Owned audience after campaign", mva: "1,000+ leads", cold: "~0" },
    { row: "Funding probability", mva: "85%+", cold: "~40%" },
    { row: "Re-usable for product #2", mva: true, cold: false },
    { row: "Cost", mva: "$1.5k/mo + ad spend", cold: "Burned ad spend" },
  ],
  faqs: [
    { q: "What's the ad budget you recommend?", a: "Typical 90-day Kickstarter MVA runs $3k–$15k in paid spend, with most going to Meta (broad reach) and Reddit (niche communities). Hardware and design products skew higher; tabletop and creative often hit goal on the lower end thanks to dense community channels." },
    { q: "Do you only run Meta ads, or other channels too?", a: "Meta, Reddit, niche newsletters, Discord and Slack community drops, and selectively LinkedIn for B2B-adjacent products. Channel mix is decided during Discover based on where your ICP actually lives — we don't force a default stack." },
    { q: "What if our ad creative isn't ready?", a: "We script and direct the creative — short-form video, static, and copy. You provide product footage and brand assets; we shape it into ad units. For complex hardware we coordinate with your video studio so the campaign film and ad creative use the same source material." },
    { q: "What does it cost — and do you take a percentage of pledges?", a: "Fixed $1,500/month. No revenue share, no percentage of pledges, no success fee. Ad budget is separate." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  ctaLead: "Ready to spend Kickstarter ad budget where",
  ctaAccent: "it actually compounds",
  ctaSub: "30 minutes. Free. You walk out with a concrete Kickstarter marketing plan and a realistic ad budget for your category — whether or not you keep working with us.",
};

const KickstarterMarketingAgency = () => <SeoLandingTemplate content={content} />;
export default KickstarterMarketingAgency;
