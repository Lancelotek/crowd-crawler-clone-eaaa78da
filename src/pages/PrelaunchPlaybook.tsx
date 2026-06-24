import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";
import PlaybookLeadMagnet from "@/components/mva/PlaybookLeadMagnet";

const sections = [
  { id: "what-is-prelaunch", label: "1. What pre-launch marketing actually is" },
  { id: "why-cold-launches-fail", label: "2. Why cold launches fail" },
  { id: "mva-framework", label: "3. The MVA Framework" },
  { id: "phase-1-discover", label: "4. Phase 1 — Discover" },
  { id: "phase-2-build", label: "5. Phase 2 — Build" },
  { id: "phase-3-launch", label: "6. Phase 3 — Launch" },
  { id: "channels", label: "7. Channel playbooks" },
  { id: "metrics", label: "8. Metrics that matter" },
  { id: "by-product-type", label: "9. By product type" },
  { id: "mistakes", label: "10. The 7 mistakes that kill pre-launch" },
  { id: "60-day-plan", label: "11. A 60-day plan you can copy" },
  { id: "faq", label: "12. FAQ" },
];

const PrelaunchPlaybook = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=prelaunch-playbook`;
  const quizLink = `${langPrefix}/quiz?source=prelaunch-playbook`;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Complete Pre-Launch Marketing Playbook (2026 Edition)",
    description: "A 3,500-word operator's guide to pre-launch marketing using the MVA Framework. How to validate demand, build 1,000+ true fans, and launch with day-one revenue.",
    author: { "@type": "Person", name: "Marek Cieśla", url: "https://jay23.com/en/about" },
    publisher: { "@id": "https://jay23.com/#organization" },
    datePublished: "2026-06-24",
    dateModified: "2026-06-24",
    mainEntityOfPage: "https://jay23.com/en/prelaunch-marketing-playbook",
    image: "https://jay23.com/og-default.jpg",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jay23.com/en" },
      { "@type": "ListItem", position: 2, name: "Pre-Launch Marketing Playbook", item: "https://jay23.com/en/prelaunch-marketing-playbook" },
    ],
  };

  return (
    <>
      <SEOHead
        title="The Complete Pre-Launch Marketing Playbook (2026) | MVA Framework"
        description="A 3,500-word operator's playbook for pre-launch marketing. Validate demand, build 1,000+ true fans, ship a launch day that produces real revenue. By JAY-23."
        canonical="/en/prelaunch-marketing-playbook"
        lang="en"
        noHreflang
        type="article"
        publishedAt="2026-06-24"
        author="Marek Cieśla"
        ogImage="https://jay23.com/og-default.jpg"
        ogImageAlt="The Complete Pre-Launch Marketing Playbook — JAY-23"
        schemaJson={[articleSchema, breadcrumbSchema]}
      />
      <MvaNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[hsl(var(--dark-bg))] pt-32 pb-16 border-b border-white/5">
        <div className="absolute -top-[10%] -right-[15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.14)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto max-w-[820px] px-6 relative z-10">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Pillar guide · 3,500 words · 14-min read
          </p>
          <h1 className="font-display text-[clamp(36px,5.2vw,68px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-7">
            The Complete <span className="text-primary">Pre-Launch Marketing</span> Playbook.
          </h1>
          <p className="text-[clamp(16px,1.5vw,19px)] font-light text-white/65 leading-relaxed">
            An operator's guide to validating demand, building 1,000+ true fans, and shipping a launch day that produces real revenue.
            Distilled from 46 campaigns and $1.2M+ raised across Kickstarter, Indiegogo, SaaS, and DTC. Written by Marek Cieśla, JAY-23.
          </p>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="bg-[hsl(var(--dark-bg))] py-14 border-b border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-white/40 mb-5">Table of contents</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-[14px] text-white/70 hover:text-primary transition-colors py-1.5">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="bg-[hsl(var(--dark-bg))] py-20">
        <div className="container mx-auto max-w-[760px] px-6 prose-article">

          {/* 1 */}
          <Section id="what-is-prelaunch" eyebrow="01" title="What pre-launch marketing actually is.">
            <p>Pre-launch marketing is the work you do to build a paying audience <em>before</em> a product exists in the market. Not after a beta. Not the week of launch. Months before, while the product is still being designed, manufactured, or coded.</p>
            <p>Most founders treat marketing as something that happens once the product is finished — a press release, a Product Hunt post, a few hopeful tweets. That is the cold launch model, and it is the single largest predictor of a campaign that underperforms its pitch deck. The reason isn't that the product is bad. The reason is that you're asking the audience to discover the product the same week it's available to buy, which is the worst-converting moment in any commercial funnel.</p>
            <p>Pre-launch flips that order. Demand validation happens first, then audience build, then production decisions get pressure-tested against real cost-per-lead data, and only then does launch day arrive — by which point a thousand or more pre-qualified buyers already know the product exists, have raised their hand to say they want it, and are sitting in your email list waiting for the buy button to appear.</p>
            <p>The mechanism that makes this work is the same in every category we've run it in: <strong className="text-white">hardware on Kickstarter, board games on Gamefound, SaaS on the open web, DTC on Shopify</strong>. The channels shift, the lead magnets change, the messaging adapts — but the core architecture (validate, build, activate) is identical.</p>
          </Section>

          {/* 2 */}
          <Section id="why-cold-launches-fail" eyebrow="02" title="Why cold launches fail predictably — and why most founders blame the wrong thing.">
            <p>When a launch underperforms, the post-mortem almost always blames the product or the page. The product wasn't differentiated enough. The hero copy didn't land. The video was too long. The reward tiers were priced wrong. Sometimes those are real — but in 80% of the underperforming launches we've audited, the actual failure was upstream of the page entirely.</p>
            <p>A cold launch concentrates 100% of commercial risk on a single 24-hour window. If the tweet underperforms, the launch underperforms. If a competitor launches the same day, you're invisible. If the message doesn't land in the first 6 seconds of a hunter's scroll, you're at 30 upvotes by 11am and the algorithmic momentum is gone for the rest of the day. None of those things have anything to do with the product itself; they're all about <em>distribution at the moment of launch</em>.</p>
            <p>On Kickstarter and Indiegogo the failure mode is even more mechanical. The platforms reward early momentum with organic placement — Popular, Staff Pick, the category page. A campaign that hits 40%+ of goal in the first 24 hours gets surfaced to thousands of additional backers automatically. A campaign that hits 5% in the first 24 hours gets buried, no matter how good the product is. The first day isn't just the first day; it's the only day that determines whether the algorithm will help you for the remaining 28.</p>
            <p>The cold launch math, in practice, looks like this: cold traffic converts at 1–2% to a Kickstarter page, cost-per-pledge runs $15–$40, and by the time you've spent enough ads to hit goal, margin is gone. By contrast, an MVA-built audience converts at 30–50% on launch day, cost-per-backer (averaged over pre-launch ads) is $4–$12, and the same campaign hits goal in the first 48 hours.</p>
            <p>The fix isn't a better page, a louder PR push, or a more clever influencer deal. The fix is structural: build the audience before the campaign exists, then activate it in coordinated waves on day one.</p>
          </Section>

          {/* 3 */}
          <Section id="mva-framework" eyebrow="03" title="The MVA Framework — Minimum Viable Audience.">
            <p>A Minimum Viable Audience is a list of <strong className="text-white">1,000+ self-identified buyers</strong> who have, in advance of the product being available, told you they have the exact problem the product solves and that they want to be notified when it ships. Scored by intent, segmented by tier or use-case, owned in your email tool.</p>
            <p>A thousand is not arbitrary. It's roughly the floor at which a pre-launch list, activated in coordinated waves with a typical day-one conversion of 30–50%, produces the launch-day volume that triggers algorithmic momentum on Kickstarter and Indiegogo, hits the day-one revenue cohort needed to extract meaningful learning on SaaS, and produces a defensible CAC model on DTC. Below 1,000 the math is too noisy; above 1,000 each additional thousand is incremental rather than structural.</p>
            <p>The framework has three phases — Discover, Build, Launch — and runs 90 days end-to-end. Compressing it to 60 days is possible for simpler products at the cost of slightly higher CPLs. Stretching it past 120 days is wasted; the list goes cold faster than you can grow it.</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">Discover (Days 1–14):</strong> validate offer, positioning, and ICP. Lock the wedge.</li>
              <li><strong className="text-white font-medium">Build (Days 15–75):</strong> stand up landing page, lead magnet and paid funnel. Pull the 1,000+ list. Score it.</li>
              <li><strong className="text-white font-medium">Launch (Days 76–90):</strong> 4-wave activation. Day-one revenue. Optimize through funding.</li>
            </ul>
          </Section>

          {/* LEAD MAGNET — gated PDF checklist */}
          <PlaybookLeadMagnet bookLink={bookLink} />

          {/* 4 */}
          <Section id="phase-1-discover" eyebrow="04" title="Phase 1 — Discover. Find the wedge before you spend a dollar on ads.">
            <p>Most pre-launch work fails in this phase before the founder realizes it has started. The mistake is launching ads against the broadest possible audience with the message that lives in the pitch deck. The pitch-deck message is written for investors; it's a story about market size and competitive advantage. The pre-launch message is written for buyers; it's a story about a specific pain you have today and the relief that's coming.</p>
            <p>Discover is two weeks of structured work to produce three deliverables: a tight positioning doc, a ranked list of 1–2 ICP segments, and three message angles ready to test. We do this through founder interviews, reverse-engineering of 3–5 adjacent products that already monetize a similar audience, and a sharp "who would be most pissed off if this product disappeared tomorrow" exercise that surfaces the buyer segment with the highest intensity of need.</p>
            <p>The deliverable that matters most is the <strong className="text-white">lead magnet concept</strong>. A pre-launch funnel lives or dies on whether the lead magnet actually pulls — not whether it's clever, but whether it gets cold traffic to give up an email at a $1.50–$4 CPL. Generic ebooks don't pull anymore. Templates, mini-tools, benchmark reports, and category-specific calculators do. The Discover phase ends when we have a lead magnet thesis we can ship in week three.</p>
          </Section>

          {/* 5 */}
          <Section id="phase-2-build" eyebrow="05" title="Phase 2 — Build. Stand up the funnel, then run it for 60 days.">
            <p>Build is the longest phase and the one most agencies under-resource. The work is unglamorous: one sharp pre-launch landing page on the founder's own domain (not a Kickstarter coming-soon page, not a Notion doc), a working lead magnet, paid funnels across two to four channels, an email sequence of five to nine emails in MailerLite or equivalent, and an analytics layer that tags every signup by source, segment, and intent score.</p>
            <p>The landing page is built around one promise and one CTA. Three sections: hero with the promise, a "who this is for" qualifier, and the lead magnet capture. No team page, no roadmap, no FAQ, no investor logos. Every additional section is a chance to lose a lead. The job of the landing page is to convert a curious scroll into an email; the job of the email sequence is to convert that email into someone who'll buy on launch day.</p>
            <p>Paid funnels are the cold-traffic acquisition layer. Meta works for almost every category. Reddit works for niche communities (board games, hardware, developer tools, dev productivity). LinkedIn works for B2B SaaS and high-AOV products. Google Search works for problem-aware buyers in mature categories. We typically run two channels in parallel for the first three weeks, then concentrate spend in whichever produces lower CPL at higher intent scores.</p>
            <p>Email sequences need to do three things: deliver the lead magnet, build trust through useful content (not "we're so excited"), and pre-sell the launch with progressively concrete signals (a specific date, a specific reward tier, a specific reason this segment should buy first). The final email in the sequence is sent T-7 days before launch and is the warm-up that the 4-wave activation builds on.</p>
            <p>Throughout Build, the metric we report on weekly is not signups — it's <strong className="text-white">CPL by channel by intent score</strong>. A thousand low-intent leads will underperform 300 high-intent leads on launch day. Scoring matters more than volume.</p>
          </Section>

          {/* 6 */}
          <Section id="phase-3-launch" eyebrow="06" title="Phase 3 — Launch. The 4-wave activation.">
            <p>By launch day the audience already exists. The job in week 13 is to convert it in a coordinated burst that produces the day-one momentum the algorithm (or the investor narrative, or the launch-week press cycle) needs to compound.</p>
            <p>We run launches in four waves spaced over the first 48 hours. Wave 1 is launch hour: an email to the entire MVA, simultaneous retargeting ads firing to anyone who opened the email but didn't click, and coordinated drops in 3–5 high-affinity communities (Discord servers, subreddits, niche Slacks). The goal of wave 1 is to put 25–40% of the day-one number on the board in the first three hours, which is what most algorithmic systems read as "this is winning, surface it."</p>
            <p>Wave 2 is hour 12: a re-send to non-openers with a different subject line, a content drop on Twitter/LinkedIn with social proof from wave 1, and the first round of founder DMs to the top 5% engaged leads.</p>
            <p>Wave 3 is day 2 morning: a third email focused on the highest-converting message angle from waves 1 and 2 (we know which by then), retargeting refresh, and a second community wave with day-one results as the hook ("we hit goal in 7 hours — here's why").</p>
            <p>Wave 4 is day 2 evening: scarcity-anchored push to the warmest segment of the list (the people who opened but didn't buy in waves 1–3), often with an early-bird-extension framing. By the end of wave 4, you've extracted the day-one revenue the campaign needed and the organic compounding (algorithm, press, word-of-mouth) takes over for the back half of the campaign.</p>
          </Section>

          {/* 7 */}
          <Section id="channels" eyebrow="07" title="Channel playbooks. Which channel for which category.">
            <p>Channel choice should follow ICP, not vendor preference. The most expensive pre-launch mistake we see is founders running the same paid stack everyone else in their category runs, because the cost of attention there is already saturated. Below is the practical mapping, refined across 46 campaigns:</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">Hardware & design (Kickstarter):</strong> Meta primary, Reddit secondary, niche design newsletters tertiary. Email lead magnet: spec sheet, comparison table, or "what to look for in a [category]" guide.</li>
              <li><strong className="text-white font-medium">Tabletop & board games (Gamefound, Kickstarter):</strong> BoardGameGeek + Reddit (r/boardgames, r/tabletopgamedesign) + Discord servers. Meta works but expensive. Lead magnet: free print-and-play, designer diary subscription.</li>
              <li><strong className="text-white font-medium">B2B SaaS (open web):</strong> LinkedIn primary, niche newsletters secondary, content + SEO long-game. Lead magnet: template, ROI calculator, benchmark report.</li>
              <li><strong className="text-white font-medium">PLG / self-serve SaaS:</strong> Reddit, Twitter, Indie Hackers, Product Hunt Ship. Meta for high-intent search-substitute keywords. Lead magnet: free tier of a mini-tool that solves 20% of the problem.</li>
              <li><strong className="text-white font-medium">DTC consumer (Shopify, Amazon):</strong> Meta + TikTok + creator partnerships. Lead magnet: discount-anchored email capture with an actually-useful guide.</li>
              <li><strong className="text-white font-medium">Creator / course / community:</strong> Twitter, YouTube, the creator's own audience first, then paid lookalikes off the engaged list.</li>
            </ul>
          </Section>

          {/* 8 */}
          <Section id="metrics" eyebrow="08" title="The metrics that actually matter (and the ones that lie).">
            <p>Pre-launch is a metrics-heavy phase precisely because the launch outcome is months away — without leading indicators you're flying blind. The numbers that matter, in order:</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">CPL by channel by segment:</strong> the leading indicator of launch-day economics. Sub-$4 in DTC, sub-$8 in SaaS, sub-$12 in B2B at $20k+ ACV. If CPL is wrong, the positioning is wrong.</li>
              <li><strong className="text-white font-medium">Intent score by lead:</strong> based on engagement (opens, clicks, lead-magnet usage). High-intent leads convert at 5–10× the rate of low-intent leads on launch day.</li>
              <li><strong className="text-white font-medium">Email open and click rates on the warm-up sequence:</strong> if the T-14 email gets 35%+ opens and 8%+ clicks, the launch wave will hit. If it gets 15% opens, the message is broken and needs a rewrite before launch day.</li>
              <li><strong className="text-white font-medium">Reply rate on T-7 founder check-in:</strong> the single best predictor of day-one conversion. A 5%+ reply rate means the list is hot.</li>
            </ul>
            <p>The metrics that lie: total signups (volume without intent scoring is vanity), Meta ROAS during pre-launch (there's no revenue event yet, so the platform's optimization signal is noise), and click-through rate on top-of-funnel ads (cheap clicks from disqualified audiences will inflate this without producing leads). Discount these and watch CPL and intent score.</p>
          </Section>

          {/* 9 */}
          <Section id="by-product-type" eyebrow="09" title="How the playbook flexes by product type.">
            <p>The MVA framework is category-agnostic, but the operational details differ enough that copy-pasting between categories will produce disappointing CPLs. The two-axis decision is <em>average order value</em> (low/mid/high) and <em>buyer concentration</em> (broad-mass vs niche-community).</p>
            <p>Broad-mass low-AOV (DTC consumer, $30–$200): high-volume Meta + TikTok pre-launch with discount-anchored lead capture, short warm-up sequence, single launch wave plus 48-hour scarcity.</p>
            <p>Niche-community mid-AOV (board games $80, hardware $200–$500): low-volume but high-intent acquisition through 3–5 named communities, long warm-up sequence (8–12 emails over 60 days), 4-wave activation. This is where MVA has the largest delta vs cold launch — often 10×+ on day-one conversion.</p>
            <p>Broad-mass high-AOV ($500–$2k DTC, mid-market SaaS): hybrid Meta + LinkedIn + content-led inbound, founder content as primary lead magnet, longer 90–120 day cycle, sales-assisted launch wave for the top 10% of the list.</p>
            <p>Niche-community high-AOV (B2B SaaS at $20k+ ACV, prosumer hardware): named-account pre-launch with LinkedIn outbound, expert content, and founder-led DMs. The "audience" is 100–250 named accounts rather than 1,000+ leads, and the activation is sales-led rather than email-led.</p>
          </Section>

          {/* 10 */}
          <Section id="mistakes" eyebrow="10" title="The 7 mistakes that kill pre-launch — every time.">
            <ol className="list-decimal list-outside pl-5 my-5 space-y-3 text-white/70">
              <li><strong className="text-white font-medium">Starting too late.</strong> Six weeks is the minimum viable runway and even then you'll pay for it in higher CPLs. Twelve weeks is the right floor.</li>
              <li><strong className="text-white font-medium">Building the lead magnet last.</strong> The lead magnet determines whether the funnel pulls. Design it in week one, not week six.</li>
              <li><strong className="text-white font-medium">Optimizing for signups instead of intent.</strong> A list of 3,000 unscored leads will underperform a list of 800 high-intent leads. Scoring is the multiplier.</li>
              <li><strong className="text-white font-medium">Launching the landing page on a "coming soon" page on the marketplace.</strong> Kickstarter coming-soon pages and similar tools don't let you own the email list, segment by intent, or run paid traffic with proper attribution. Always build on your own domain.</li>
              <li><strong className="text-white font-medium">Skipping the warm-up sequence.</strong> A cold list that sees a launch email out of nowhere converts at 1/5 the rate of the same list that received a 5-email warm-up over the prior 14 days.</li>
              <li><strong className="text-white font-medium">Running ads to the live campaign instead of pre-launch.</strong> The same ad budget, deployed pre-launch, produces 4–8× the campaign-day ROI. Live-campaign ads are an optimization, not a substitute.</li>
              <li><strong className="text-white font-medium">Calling launch day the finish line.</strong> Launch day is the start of the data — week one is where you extract the learning about which segment, message, and channel actually monetizes.</li>
            </ol>
          </Section>

          {/* 11 */}
          <Section id="60-day-plan" eyebrow="11" title="A 60-day pre-launch plan you can copy.">
            <p>If you have to compress the framework — and many founders do — here is the 60-day operating plan we run when the calendar is tight. It works for most product categories below the $1k AOV ceiling and below 7-figure goal sizes.</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">Days 1–7:</strong> Founder interviews + ICP definition + competitor reverse-engineering. Pick 1 lead magnet concept. Draft positioning + 3 message angles.</li>
              <li><strong className="text-white font-medium">Days 8–14:</strong> Ship landing page (one promise, one CTA, lead magnet capture). Ship lead magnet. Set up MailerLite with welcome + 5-email warm-up. Tag analytics layer.</li>
              <li><strong className="text-white font-medium">Days 15–35:</strong> Launch paid funnels on 2 channels. Iterate creative weekly. Watch CPL by intent score, not raw volume. Target 30–60 leads/day at $4–$10 CPL.</li>
              <li><strong className="text-white font-medium">Days 36–50:</strong> Concentrate spend on the winning channel + segment. Push warm-up email engagement. Launch a second-tier lead magnet for re-engagement.</li>
              <li><strong className="text-white font-medium">Days 51–58:</strong> Final warm-up sequence with concrete launch date. Founder T-7 check-in. Prep the 4-wave activation: copy, ads, community drops.</li>
              <li><strong className="text-white font-medium">Days 59–60 (launch + 48h):</strong> Run the 4 waves. Hit day-one number. Optimize the back half on data, not feelings.</li>
            </ul>
            <p>At 60 days end-to-end with a competent operator and $5k–$15k ad budget, this plan reliably produces 600–1,200 pre-qualified leads and a day-one launch that hits 40–70% of a realistic goal in the first 48 hours.</p>
          </Section>

          {/* 12 */}
          <Section id="faq" eyebrow="12" title="Common questions, answered.">
            <p><strong className="text-white">Do I need 1,000 leads — what if I only get 500?</strong> 500 leads is still significantly better than zero, but the math gets noisier. At 500 high-intent leads, a typical 30–50% day-one conversion produces 150–250 buyers on launch day, which can be enough for SaaS or DTC categories but is often short of Kickstarter-algorithm thresholds. If you finish pre-launch at 500, extend by 30 days rather than launching short.</p>
            <p><strong className="text-white">Can I do this without paid ads?</strong> Yes, but the timeline doubles to triples. Organic-only pre-launch through founder content, community participation and partnerships is real and works for some categories — particularly creator and B2B SaaS where the founder already has a small but engaged audience. For most consumer hardware, board games, and DTC, paid is the realistic acquisition layer.</p>
            <p><strong className="text-white">How much ad budget do I need?</strong> $3k–$15k over 60–90 days for most categories. Hardware and high-AOV SaaS skew toward the upper end; niche-community products often hit at the lower end thanks to dense community channels.</p>
            <p><strong className="text-white">What tools do I need?</strong> Landing page on your domain (Framer, Webflow, Next.js — your call). Email tool with segmentation (MailerLite, ConvertKit, Customer.io). Analytics (GA4 + Plausible). Ad accounts on the channels you'll run. That's it — additional tooling is usually procrastination.</p>
            <p><strong className="text-white">Can you run this for us?</strong> Yes — that's the JAY-23 service. Fixed-fee, founder-led, month-to-month. 46 campaigns, $1.2M+ raised. <Link to={bookLink} className="text-primary underline underline-offset-4 hover:no-underline">Book a free 30-minute call</Link> and we'll tell you on the call whether MVA is the right fit for your launch.</p>
          </Section>

        </div>

        {/* INTERNAL LINKS */}
        <div className="container mx-auto max-w-[760px] px-6 mt-16">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-5">Go deeper</p>
            <ul className="space-y-3">
              <li><Link to={`${langPrefix}/kickstarter-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">→ Kickstarter agency — pre-launch for crowdfunding</Link></li>
              <li><Link to={`${langPrefix}/crowdfunding-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">→ Crowdfunding agency — Kickstarter, Indiegogo, Gamefound</Link></li>
              <li><Link to={`${langPrefix}/product-launch-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">→ Product launch agency — pre-launch marketing for new products</Link></li>
              <li><Link to={`${langPrefix}/saas-prelaunch-marketing-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">→ SaaS go-to-market & pre-launch marketing</Link></li>
              <li><Link to={`${langPrefix}/process`} className="text-white/80 hover:text-primary transition-colors text-[15px]">→ Our 90-day process, step by step</Link></li>
            </ul>
          </div>
        </div>
      </article>

      {/* CASE STUDIES */}
      <CaseStudiesSection />

      {/* FINAL CTA */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto max-w-[820px] px-6 text-center relative z-10">
          <h2 className="font-display text-[clamp(34px,5vw,64px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-6">
            Want this playbook <span className="text-primary">run for you</span>?
          </h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">
            30 minutes. Free. You walk out with a concrete MVA plan for your launch — whether or not you keep working with us.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
              Book a strategy call <ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-white/5 transition-all">
              Calculate your MVA
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </>
  );
};

const Section = ({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28 mb-16">
    <p className="text-primary/70 font-mono text-[12px] font-semibold mb-3 tracking-wider">{eyebrow}</p>
    <h2 className="font-display text-[clamp(26px,3vw,38px)] font-black uppercase leading-[1.1] tracking-tight text-white mb-6">{title}</h2>
    <div className="space-y-5 text-[16.5px] text-white/70 leading-[1.75] font-light">{children}</div>
  </section>
);

export default PrelaunchPlaybook;
