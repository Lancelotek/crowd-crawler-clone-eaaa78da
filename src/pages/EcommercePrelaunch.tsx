import { PAGE_COPY } from "@/content/ecommercePrelaunchCopy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, ShoppingBag, Users, TrendingUp, Truck, Package, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";

const EcommercePrelaunch = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=ecommerce-pillar`;
  const quizLink = `${langPrefix}/quiz?source=ecommerce-pillar`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const reasons = [
    {
      icon: ShoppingBag,
      label: "Demand before inventory",
      title: "Validate the SKU before you commit to a production run",
      body: "Most DTC and crowdfunding founders order 1,000 units, then look for buyers. We do it backwards: build a landing page, run paid traffic to a waitlist with a deposit option, and only commit production once unit-economics check out. Wrong SKU caught on $400 in ad spend, not $40,000 in inventory.",
    },
    {
      icon: Users,
      label: "1,000 buyers, not 1,000 followers",
      title: "An MVA outconverts a cold Shopify launch by 8–14×",
      body: "Followers don't ship cash. An MVA is a ranked list of 1,000+ people who told you, in advance, that they want exactly this product at roughly this price. Day-one paid conversion on an MVA sits at 8–14% — what most cold Shopify launches do across their first 90 days combined.",
    },
    {
      icon: TrendingUp,
      label: "Algorithm momentum",
      title: "First 72 hours decide if Kickstarter, Gamefound or Meta scale you",
      body: "Crowdfunding algorithms (KS, Gamefound) and ad platforms (Meta, TikTok) reward early velocity. With an MVA primed in 4 activation waves, you hit funding goals or 4× ROAS in the first 3 days — and the platform amplifies you to a much larger cold audience for free.",
    },
    {
      icon: Truck,
      label: "Pre-orders fund inventory",
      title: "Customers pay for the production run instead of your cash flow",
      body: "Done right, an MVA-driven launch collects 30–80% of cost-of-goods in pre-orders or deposits before the factory invoice lands. This is how DTC brands launch a $200k SKU with $20k of working capital instead of a Shopify Capital loan.",
    },
  ];

  const phases = [
    { n: "01", title: "Discover — niche, SKU and price test", body: "We pressure-test the product: which exact buyer, which use case, which price point. Competitive teardown of adjacent eCommerce/Kickstarter campaigns, audience research on TikTok and Reddit, lead magnet design (sample, discount, deposit, or guide). Output: positioning, 3 message angles, lead magnet that pulls signups at $1.50–$3.50 CPL." },
    { n: "02", title: "Build — landing, ad funnel, email engine", body: "One conversion-optimized landing page with deposit or waitlist mechanic. Meta + TikTok + Pinterest ad funnels (Google Search if intent is there). MailerLite or Klaviyo sequences for nurture and warm-up. Pixel + GA4 + UTM event layer so day-one ROAS data is real, not directional." },
    { n: "03", title: "Launch — 4-wave activation + retargeting", body: "T-7 days: warm-up email + behind-the-scenes content. Launch day: 4 staggered email waves to MVA, retargeting to engaged non-buyers, organic drops in relevant communities. Week one: founder-led video updates, scarcity tiers, retargeting layered on lookalikes from day-one buyers. We optimize until ROAS stabilizes." },
  ];

  const deliverables = [
    "Niche, ICP and price-point validation doc",
    "1 conversion-optimized landing page (Shopify / Webflow / Framer)",
    "Lead magnet: sample, deposit page, discount or guide",
    "Meta, TikTok and Pinterest paid ad funnels",
    "Email sequence (5–9 emails) in Klaviyo / MailerLite",
    "Pixel + GA4 + Triple Whale-ready event layer",
    "Launch-day playbook with 4-wave activation",
    "Weekly ROAS, CPL and contribution-margin reporting",
  ];

  const comparison = [
    { row: "Pre-launch demand validation", mva: true, cold: false },
    { row: "Day-one paying customers", mva: "100–500", cold: "0–20" },
    { row: "Inventory risk", mva: "Funded by pre-orders", cold: "All on founder" },
    { row: "Day-one ROAS known", mva: true, cold: false },
    { row: "Launch-day platform momentum", mva: "Compound", cold: "Flatline" },
    { row: "Time to break-even on production", mva: "Day 1–14", cold: "Month 3–9" },
    { row: "Cost", mva: "$6k + ad spend", cold: "$0 + dead inventory" },
  ];

  const faqs = [
    {
      q: "We're launching on Kickstarter. Is this different from a 'crowdfunding agency'?",
      a: "Same engine, broader application. JAY-23 ran 46 crowdfunding campaigns and $1.2M+ in committed revenue, mostly on Kickstarter and Gamefound. The MVA Framework is platform-agnostic: same playbook works for KS, Gamefound, Indiegogo, Shopify pre-orders, or DTC waitlists. The lead magnet and CTA change; the audience-building physics don't.",
    },
    {
      q: "We're a DTC brand without crowdfunding. Does this still apply?",
      a: "Yes. Plenty of MVA clients launch directly on Shopify with a waitlist + deposit + early-bird tier. The framework is even cleaner outside crowdfunding — no platform deadline pressure, no 5% platform fee, full data ownership. We just swap 'launch day' for 'pre-order open' and run the same 4-wave activation.",
    },
    {
      q: "How long is the engagement and what does it cost?",
      a: "90 days is the standard MVA cycle. Pricing is $1,500/month for 3 months ($4,500 total) for the agency fee, plus your media budget — typically $3,000–$8,000 across the 90 days for sub-$300 SKUs, more for premium. Full breakdown on the packages page.",
    },
    {
      q: "What if we already tried Meta ads and they didn't work?",
      a: "That's the most common starting point. The usual diagnosis isn't 'Meta doesn't work for us' — it's 'we ran cold conversion campaigns to a checkout with no audience warmth, no message-market fit and no creative testing budget'. MVA front-loads warm-up: lead magnet first, deposit/checkout later, with creative iterated on real CPL data, not gut.",
    },
    {
      q: "What product categories does this work for?",
      a: "Strong fit: physical consumer goods $30–$500, tabletop and games, hardware/gadgets, premium accessories, design objects, niche tools. Weaker fit: pure commodities (already-saturated SKUs on Amazon), regulated categories (supplements with FDA constraints, alcohol), B2B procurement. We'll tell you on the call if your category isn't a fit.",
    },
    {
      q: "Do you guarantee revenue, units sold, or ROAS?",
      a: "We guarantee process and benchmarks: a working funnel within 30 days, CPL within the agreed range, and weekly transparent reporting. Revenue depends on price point, category and budget. Across 46 campaigns the median raise is $50k–$200k. We won't promise a number we can't model from your inputs.",
    },
    {
      q: "Can we keep working with you after launch / after Kickstarter ends?",
      a: "Yes. About half of MVA clients continue into a post-launch retainer focused on Late Pledge (for crowdfunding), Shopify pre-order extension, retention email flows and channel expansion. We're not a forever-agency — we hand off to your in-house team or a performance shop once the system is stable.",
    },
    {
      q: "Where are you based?",
      a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with founders globally — North America, EU, UK, AU. Weekly 30-min sync, async daily updates, monthly strategy review.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pre-launch marketing agency for eCommerce and crowdfunding",
    provider: { "@id": "https://jay23.com/#organization" },
    areaServed: { "@type": "Place", name: "Global" },
    name: "eCommerce Pre-Launch Marketing — MVA Framework",
    description: "Pre-launch marketing agency for eCommerce, DTC and crowdfunding founders. 90-day MVA Framework: validate demand, build 1,000+ buyers, fund production with pre-orders.",
    url: "https://jay23.com/en/ecommerce-prelaunch-agency",
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
      { "@type": "ListItem", position: 2, name: "eCommerce Pre-Launch Marketing", item: "https://jay23.com/en/ecommerce-prelaunch-agency" },
    ],
  };

  return (
    <>
      <SEOHead
        title={PAGE_COPY.text[0]}
        description="Pre-launch agency for eCommerce and DTC founders. The 90-day MVA Framework validates demand and builds 1,000+ buyers before launch. $1.2M+ raised."
        canonical="/en/ecommerce-prelaunch-agency"
        lang="en"
        ogImage="https://jay23.com/og-default.jpg"
        ogImageAlt="eCommerce Pre-Launch Marketing Agency — JAY-23"
        hreflangOverrides={{ en: "/en/ecommerce-prelaunch-agency", pl: "/pl/agencja-prelaunch-ecommerce" }}
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
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />{PAGE_COPY.text[1]}</motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-[clamp(40px,5.6vw,78px)] font-black uppercase leading-[0.98] tracking-tight text-white mb-8 max-w-[16ch]"
          >{PAGE_COPY.text[2]}<span className="text-primary">{PAGE_COPY.text[3]}</span>{PAGE_COPY.text[4]}</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(16px,1.55vw,20px)] font-light text-white/55 max-w-[680px] leading-relaxed mb-10"
          >{PAGE_COPY.text[5]}</motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">{PAGE_COPY.text[6]}<ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white/5 transition-all">{PAGE_COPY.text[7]}</Link>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[8]}</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">{PAGE_COPY.text[9]}</h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            <p>{PAGE_COPY.text[10]}</p>
            <p>{PAGE_COPY.text[11]}</p>
            <p>{PAGE_COPY.text[12]}</p>
          </div>
        </div>
      </section>

      {/* MONEY KEYWORDS — product launch / crowdfunding / kickstarter */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[13]}</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">{PAGE_COPY.text[14]}</h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            <p>{PAGE_COPY.text[15]}<strong className="font-medium text-white">{PAGE_COPY.text[16]}</strong>{PAGE_COPY.text[17]}</p>
          </div>

          <div className="mt-14">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[18]}</p>
            <h3 className="font-display text-[clamp(26px,3vw,38px)] font-black uppercase leading-[1.08] tracking-tight text-white mb-6">{PAGE_COPY.text[19]}</h3>
            <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
              <p>{PAGE_COPY.text[20]}<strong className="font-medium text-white">{PAGE_COPY.text[21]}</strong>{PAGE_COPY.text[22]}</p>
              <p>{PAGE_COPY.text[23]}</p>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[24]}</p>
            <h3 className="font-display text-[clamp(26px,3vw,38px)] font-black uppercase leading-[1.08] tracking-tight text-white mb-6">{PAGE_COPY.text[25]}</h3>
            <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
              <p>{PAGE_COPY.text[26]}<strong className="font-medium text-white">{PAGE_COPY.text[27]}</strong>{PAGE_COPY.text[28]}</p>
              <p>{PAGE_COPY.text[29]}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[14px] px-6 py-3 rounded-full hover:brightness-110 transition-all">{PAGE_COPY.text[30]}<ArrowRight size={14} />
              </Link>
              <Link to={`${langPrefix}/blog`} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-white/5 transition-all">{PAGE_COPY.text[31]}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MVA */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[32]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[33]}</h2>
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[34]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[35]}</h2>
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
            <Link to={`${langPrefix}/process`} className="text-[14px] text-white/60 underline underline-offset-4 hover:text-white">{PAGE_COPY.text[36]}</Link>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[37]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[38]}</h2>
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[39]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[40]}</h2>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-[1.5fr,1fr,1fr] text-[12px] font-semibold tracking-[0.12em] uppercase text-white/45 border-b border-white/8">
              <div className="px-6 py-4">{PAGE_COPY.text[41]}</div>
              <div className="px-6 py-4 text-center bg-primary/5 text-primary">{PAGE_COPY.text[42]}</div>
              <div className="px-6 py-4 text-center">{PAGE_COPY.text[43]}</div>
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[44]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[45]}</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[16px] font-semibold text-white">{f.q}</span>
                  <span className={`text-primary text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>{PAGE_COPY.text[46]}</span>
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
          <h2 className="font-display text-[clamp(34px,5vw,64px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-6">{PAGE_COPY.text[47]}<span className="text-primary">{PAGE_COPY.text[48]}</span>{PAGE_COPY.text[49]}</h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">{PAGE_COPY.text[50]}</p>
          <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">{PAGE_COPY.text[51]}<ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default EcommercePrelaunch;
