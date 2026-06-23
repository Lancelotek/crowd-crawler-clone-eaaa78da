import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, Target, Users, LineChart, Rocket, Zap, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";

const SaasPrelaunch = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=saas-pillar`;
  const quizLink = `${langPrefix}/quiz?source=saas-pillar`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const reasons = [
    {
      icon: Target,
      label: "Demand validation",
      title: "Stop building for an audience that may not exist",
      body: "Most SaaS founders write code for 6–12 months before they know if anyone wants the product. We invert the order: validate buying intent with a landing page, lead magnet and paid traffic before the first line of production code. If the cost-per-lead is wrong, the idea is wrong — and you saved a year.",
    },
    {
      icon: Users,
      label: "1,000 true fans",
      title: "Build a Minimum Viable Audience, not just a waitlist",
      body: "A waitlist is a list of email addresses. An MVA is 1,000+ people who self-identified as having the exact problem your SaaS solves, ranked by intent. Day-one paid conversion on an MVA is 8–14×, not 2–3% like a cold launch on Product Hunt.",
    },
    {
      icon: LineChart,
      label: "Real GTM data",
      title: "Know your CAC, payback and message before you launch",
      body: "By the time we hand off, you have CPL benchmarks, the message-market fit angle that actually converted, the channel mix that worked, and a rough LTV/CAC model — not a deck of assumptions. Investors and your future Head of Growth get a base camp instead of a blank page.",
    },
    {
      icon: Rocket,
      label: "Launch day with leverage",
      title: "Day-one revenue that doesn't depend on a single tweet",
      body: "Cold launches put 100% of risk on launch-day virality. We script a 4-wave activation across email, retargeting and Slack/Discord communities so even a quiet launch day produces 50–200 paying activations and 1,500+ trials in week one.",
    },
  ];

  const phases = [
    { n: "01", title: "Discover — narrow positioning & ICP", body: "We pressure-test the wedge: which exact ICP segment, which pain, which willingness to pay. We map adjacent SaaS that already monetizes a similar audience and reverse-engineer their messaging gaps. Output: positioning doc, 3 message angles, lead magnet that pulls signups for $1.50–$4 CPL." },
    { n: "02", title: "Build — landing, lead magnet, paid funnel", body: "One sharp landing page on your domain. A lead magnet that's actually useful (template, mini-tool, benchmark report), not a generic ebook. Meta + LinkedIn + Reddit ad funnels, MailerLite or Customer.io sequences, and a tagged event layer so day-one cohorts are tracked from day one." },
    { n: "03", title: "Launch — activate the MVA across 4 waves", body: "T-7 days: warm-up email + Loom video. Launch day: 4 staggered email waves + retargeting + community drops. Week one: founder-led DMs to top 5% engaged leads, onboarding loops, weekly close calls. We optimize until activation curves stabilize, not until launch night ends." },
  ];

  const deliverables = [
    "Positioning, ICP and message-market fit doc",
    "1 conversion-optimized landing page (your domain)",
    "Lead magnet (template / mini-tool / benchmark report)",
    "Meta, LinkedIn and Reddit paid ad funnels",
    "Email sequence (5–9 emails) in MailerLite / Customer.io",
    "Analytics + UTM event layer (GA4 + Plausible)",
    "Launch-day playbook and 4-wave activation script",
    "Weekly metrics review and CPL/CAC benchmarks",
  ];

  const comparison = [
    { row: "Pre-launch demand validation", mva: true, cold: false },
    { row: "Day-one paying users", mva: "50–200", cold: "0–10" },
    { row: "CAC known before launch", mva: true, cold: false },
    { row: "Launch-day risk concentration", mva: "Distributed", cold: "All on PH/X" },
    { row: "Time to first revenue cohort", mva: "Day 1", cold: "Month 2–4" },
    { row: "Investor narrative", mva: "Demand-validated", cold: "We hope" },
    { row: "Cost", mva: "$6k + ad spend", cold: "$0 + opportunity cost" },
  ];

  const faqs = [
    {
      q: "How is this different from a generic SaaS marketing agency?",
      a: "Most agencies optimize a launched product — they take what you built and try to grow it. We work the other side of the line: we validate demand, build the audience, and de-risk launch day. Once you've launched and CAC stabilizes, a performance agency is the right next vendor. Hiring one before MVA is putting media spend behind an unvalidated message.",
    },
    {
      q: "We're a B2B SaaS with a $50k ACV. Does pre-launch marketing apply?",
      a: "Yes, with adjustments. For high-ACV B2B we don't run a 1,000-lead MVA — we build a 100–250 named-account list, qualify it manually, and use LinkedIn + warm intros instead of broad Meta. Same framework, different channels and scoring.",
    },
    {
      q: "How long is the engagement and what does it cost?",
      a: "90 days is the standard MVA cycle. Pricing is $1,500/month for 3 months ($4,500 total) for the agency fee, plus your media budget — typically $3,000–$8,000 across the 90 days. Full breakdown on the packages page.",
    },
    {
      q: "Do you guarantee a number of leads or sign-ups?",
      a: "We guarantee process and benchmarks: a working funnel within 30 days, CPL within the agreed range, and weekly transparent reporting. Volume depends on category, ICP and budget — across 46 campaigns the median MVA size is 1,200–2,500. We won't promise a number we can't model.",
    },
    {
      q: "What if our SaaS is already launched but stuck?",
      a: "Different problem, different playbook. If you have a live product with low conversion, we run a Reset Sprint instead: redefine ICP, rewrite landing, retest channel-message fit. Some SaaS need pre-launch logic re-applied post-launch — we can scope that on the call.",
    },
    {
      q: "Can we keep working with you after launch?",
      a: "Yes. About 40% of MVA clients continue with us into a launch + first 90 days post-launch retainer focused on activation, retention loops and channel expansion. We're not a forever-agency — we hand off to your in-house growth lead when the system is stable.",
    },
    {
      q: "Which tools and stack do you work with?",
      a: "Landing: Webflow / Framer / Next.js (your call). Email: MailerLite, Customer.io or Loops. Ads: Meta, LinkedIn, Reddit, sometimes Google Search for high-intent. Analytics: GA4 + Plausible + your product analytics (PostHog / Mixpanel). We adapt to your stack — no forced migrations.",
    },
    {
      q: "Where are you based and how do we communicate?",
      a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with founders globally. Weekly 30-min sync, async daily updates in Slack or your tool, monthly strategy review.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pre-launch marketing agency for SaaS",
    provider: { "@id": "https://jay23.com/#organization" },
    areaServed: { "@type": "Place", name: "Global" },
    name: "SaaS Pre-Launch Marketing — MVA Framework",
    description: "Pre-launch marketing agency for SaaS founders. 90-day MVA Framework: positioning, landing, paid funnel and 1,000+ true fans before launch day.",
    url: "https://jay23.com/en/saas-prelaunch-marketing-agency",
    offers: { "@type": "Offer", price: "1500", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", price: "1500", priceCurrency: "USD", unitText: "MONTH" } },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jay23.com/en" },
      { "@type": "ListItem", position: 2, name: "SaaS Pre-Launch Marketing", item: "https://jay23.com/en/saas-prelaunch-marketing-agency" },
    ],
  };

  return (
    <>
      <SEOHead
        title="SaaS Go-to-Market & Pre-Launch Marketing Agency | JAY-23"
        description="SaaS go-to-market strategy that ships: 90-day MVA Framework validates demand, builds 1,000+ true fans, and lands day-one paying users. 46 campaigns, $1.2M+ raised."
        canonical="/en/saas-prelaunch-marketing-agency"
        lang="en"
        ogImage="https://jay23.com/og-default.jpg"
        ogImageAlt="SaaS Pre-Launch Marketing Agency — JAY-23"
        hreflangOverrides={{ en: "/en/saas-prelaunch-marketing-agency", pl: "/pl/agencja-prelaunch-saas" }}
        schemaJson={[serviceSchema, faqSchema, breadcrumbSchema]}
      />
      <MvaNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[hsl(var(--dark-bg))] min-h-screen flex flex-col justify-center">
        <div className="absolute -top-[10%] -right-[15%] w-[65vw] h-[65vw] max-w-[760px] max-h-[760px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.18)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.08)_0%,transparent_65%)] pointer-events-none" />

        <div className="container mx-auto max-w-[1100px] px-6 pt-32 pb-20 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-7 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Pre-launch marketing · For SaaS founders
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-[clamp(40px,5.6vw,78px)] font-black uppercase leading-[0.98] tracking-tight text-white mb-8 max-w-[16ch]"
          >
            Pre-launch marketing agency for <span className="text-primary">SaaS founders</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(16px,1.55vw,20px)] font-light text-white/55 max-w-[680px] leading-relaxed mb-10"
          >
            Most SaaS launches die in silence because the audience is built after the product, not before it.
            We run the 90-day MVA Framework: validate demand, build 1,000+ true fans, ship to a launch day that actually has buyers.
            46 campaigns, $1.2M+ in committed revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
              Book a free strategy call <ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white/5 transition-all">
              Calculate your MVA
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">The cold-launch trap</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">
            Why 9 out of 10 SaaS launches go quiet on day one.
          </h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            <p>The default SaaS playbook looks like this: build for a year, launch on Product Hunt, hope for #1 of the day, then panic when MRR plateaus at $4k. The bug is structural — the audience is being asked to discover the product the same week it's available to buy.</p>
            <p>Day-one cold launches concentrate 100% of risk on a single 24-hour window. If the tweet underperforms, the launch underperforms. If a competitor launches the same day, you're invisible. If your message doesn't land in the first 6 seconds of a hunter's scroll, you're at 30 upvotes by 11am.</p>
            <p>The fix isn't a better launch — it's an audience that already exists when the launch happens. That audience is what we call a Minimum Viable Audience: 1,000+ self-identified buyers who told you, in advance, that they have the exact problem your SaaS solves. Built right, an MVA does 8–14× the day-one conversion of a cold launch and gives you a working CAC model before you spend on growth.</p>
          </div>
        </div>
      </section>

      {/* WHY MVA FOR SAAS */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Why MVA for SaaS</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Four reasons SaaS founders use MVA before they write production code.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/12 border border-primary/25 flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40">{r.label}</span>
                  </div>
                  <h3 className="text-[20px] font-bold text-white mb-3 leading-snug">{r.title}</h3>
                  <p className="text-[15px] text-white/55 leading-relaxed font-light">{r.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">90-day MVA Framework</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              How we take a SaaS from idea to launch with paying users on day one.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {phases.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-8"
              >
                <div className="text-primary/70 font-mono text-[13px] font-semibold mb-4 tracking-wider">{p.n}</div>
                <h3 className="text-[19px] font-bold text-white mb-3 leading-snug">{p.title}</h3>
                <p className="text-[14.5px] text-white/55 leading-relaxed font-light">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to={`${langPrefix}/process`} className="text-[14px] text-white/60 underline underline-offset-4 hover:text-white">
              See the full process breakdown →
            </Link>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">What you get</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Concrete deliverables. No retainers without artifacts.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-5">
                <Check size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-[15px] text-white/80 font-light leading-relaxed">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">MVA vs cold launch</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              The same SaaS, two launch strategies, very different day-ones.
            </h2>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-[1.5fr,1fr,1fr] text-[12px] font-semibold tracking-[0.12em] uppercase text-white/45 border-b border-white/8">
              <div className="px-6 py-4">Criterion</div>
              <div className="px-6 py-4 text-center bg-primary/5 text-primary">MVA Framework</div>
              <div className="px-6 py-4 text-center">Cold launch</div>
            </div>
            {comparison.map((c, i) => (
              <div key={i} className={`grid grid-cols-[1.5fr,1fr,1fr] text-[14px] ${i < comparison.length - 1 ? "border-b border-white/5" : ""}`}>
                <div className="px-6 py-4 text-white/80 font-medium">{c.row}</div>
                <div className="px-6 py-4 text-center bg-primary/[0.03]">
                  {typeof c.mva === "boolean"
                    ? c.mva ? <Check size={18} className="text-primary inline" /> : <X size={18} className="text-white/30 inline" />
                    : <span className="text-white">{c.mva}</span>}
                </div>
                <div className="px-6 py-4 text-center">
                  {typeof c.cold === "boolean"
                    ? c.cold ? <Check size={18} className="text-white/60 inline" /> : <X size={18} className="text-white/30 inline" />
                    : <span className="text-white/60">{c.cold}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <CaseStudiesSection />

      {/* FAQ */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">FAQ</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[16px] font-semibold text-white">{f.q}</span>
                  <span className={`text-primary text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[15px] text-white/60 leading-relaxed font-light">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto max-w-[820px] px-6 text-center relative z-10">
          <h2 className="font-display text-[clamp(34px,5vw,64px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-6">
            Ready for a SaaS launch with <span className="text-primary">paying users on day one</span>?
          </h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">
            30 minutes. Free. You walk out with a concrete MVA plan for your SaaS — whether or not you keep working with us.
          </p>
          <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
            Book a strategy call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default SaasPrelaunch;
