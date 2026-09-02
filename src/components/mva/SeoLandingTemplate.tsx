import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  HelpCircle,
  Layers,
  LineChart,
  Radio,
  Rocket,
  Scale,
  Target,
  TrendingUp,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { SeoLandingContent } from "@/content/landings/types";

export type { SeoLandingContent };

/** Landing copy stores icons by lucide name so the copy files stay pure data. */
const ICONS: Record<string, LucideIcon> = {
  Layers,
  LineChart,
  Radio,
  Rocket,
  Scale,
  Target,
  TrendingUp,
  Users,
  Video,
  Wallet,
};
const resolveIcon = (name: string): LucideIcon => ICONS[name] ?? HelpCircle;
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";


const SeoLandingTemplate = ({ content, lang = "en" }: { content: SeoLandingContent; lang?: "en" | "pl" }) => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=${content.bookSource}`;
  const quizLink = `${langPrefix}/quiz?source=${content.bookSource}`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const t = lang === "pl" ? {
    bookHero: "Umów bezpłatną rozmowę strategiczną",
    quiz: "Policz swoje MVA",
    framework90: "90-dniowy framework MVA",
    whatYouGet: "Co dostajesz",
    fullProcess: "Zobacz pełny proces →",
    criterion: "Kryterium",
    faq: "FAQ",
    faqTitle: "Najczęściej zadawane pytania.",
    bookCta: "Umów rozmowę strategiczną",
    homeCrumb: "Strona główna",
  } : {
    bookHero: "Book a free strategy call",
    quiz: "Calculate your MVA",
    framework90: "90-day MVA Framework",
    whatYouGet: "What you get",
    fullProcess: "See the full process breakdown →",
    criterion: "Criterion",
    faq: "FAQ",
    faqTitle: "Frequently asked questions.",
    bookCta: "Book a strategy call",
    homeCrumb: "Home",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: content.serviceType,
    provider: { "@id": "https://jay23.com/#organization" },
    areaServed: { "@type": "Place", name: "Global" },
    name: content.metaTitle,
    description: content.metaDescription,
    url: `https://jay23.com${content.canonical}`,
    offers: { "@type": "Offer", price: "1500", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", price: "1500", priceCurrency: "USD", unitText: "MONTH" } },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.homeCrumb, item: `https://jay23.com/${lang}` },
      { "@type": "ListItem", position: 2, name: content.breadcrumbName, item: `https://jay23.com${content.canonical}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={content.metaTitle}
        description={content.metaDescription}
        canonical={content.canonical}
        lang={lang}
        noHreflang={!content.hreflangOverrides}
        hreflangOverrides={content.hreflangOverrides}
        ogImage="https://jay23.com/og-default.jpg"
        ogImageAlt={content.breadcrumbName}
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
            {content.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-[clamp(40px,5.6vw,78px)] font-black uppercase leading-[0.98] tracking-tight text-white mb-8 max-w-[16ch]"
          >
            {content.h1Lead} <span className="text-primary">{content.h1Accent}</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(16px,1.55vw,20px)] font-light text-white/55 max-w-[680px] leading-relaxed mb-10"
          >
            {content.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
              {t.bookHero} <ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white/5 transition-all">
              {t.quiz}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{content.problemEyebrow}</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">
            {content.problemTitle}
          </h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            {content.problemParas.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* REASONS */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{content.reasonsEyebrow}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {content.reasonsTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {content.reasons.map((r, i) => {
              const Icon = resolveIcon(r.icon);
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{t.framework90}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {content.phasesTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {content.phases.map((p, i) => (
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
              {t.fullProcess}
            </Link>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{t.whatYouGet}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {content.deliverablesTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {content.deliverables.map((d, i) => (
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{content.comparisonEyebrow}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {content.comparisonTitle}
            </h2>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-[1.5fr,1fr,1fr] text-[12px] font-semibold tracking-[0.12em] uppercase text-white/45 border-b border-white/8">
              <div className="px-6 py-4">{t.criterion}</div>
              <div className="px-6 py-4 text-center bg-primary/5 text-primary">MVA Framework</div>
              <div className="px-6 py-4 text-center">{content.comparisonRightLabel}</div>
            </div>
            {content.comparison.map((c, i) => (
              <div key={i} className={`grid grid-cols-[1.5fr,1fr,1fr] text-[14px] ${i < content.comparison.length - 1 ? "border-b border-white/5" : ""}`}>
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

      {/* LONG-FORM SECTIONS */}
      {content.extraSections?.length ? (
        <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
          <div className="container mx-auto max-w-[820px] px-6 space-y-16">
            {content.extraSections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display text-[clamp(26px,3.2vw,40px)] font-black uppercase leading-[1.08] tracking-tight text-white mb-6">
                  {s.h2}
                </h2>
                <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
                  {s.paras.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}

      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{t.faq}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {t.faqTitle}
            </h2>
          </div>
          <div className="space-y-3">
            {content.faqs.map((f, i) => (
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
            {content.ctaLead} <span className="text-primary">{content.ctaAccent}</span>?
          </h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">
            {content.ctaSub}
          </p>
          <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
            {t.bookCta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default SeoLandingTemplate;
