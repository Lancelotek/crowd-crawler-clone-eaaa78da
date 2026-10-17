import { PAGE_COPY, reasons, phases, deliverables, comparison, faqs } from "@/content/saasPrelaunchCopy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, Target, Users, LineChart, Rocket, Zap, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";

const copyIcons = { Target, Users, LineChart, Rocket };
const SaasPrelaunch = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=saas-pillar`;
  const quizLink = `${langPrefix}/quiz?source=saas-pillar`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  

  

  

  

  

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
        title={PAGE_COPY.text[0]}
        description="SaaS go-to-market strategy that ships: the 90-day MVA Framework validates demand and lands day-one paying users. 46 campaigns, $1.2M+ raised by client campaigns."
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

      {/* SAAS GO-TO-MARKET — keyword-targeted section */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[13]}</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">{PAGE_COPY.text[14]}</h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            <p>{PAGE_COPY.text[15]}<strong className="font-medium text-white">{PAGE_COPY.text[16]}</strong>{PAGE_COPY.text[17]}</p>
            <p>{PAGE_COPY.text[18]}<strong className="font-medium text-white">{PAGE_COPY.text[19]}</strong>{PAGE_COPY.text[20]}</p>
            <p>{PAGE_COPY.text[21]}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[14px] px-6 py-3 rounded-full hover:brightness-110 transition-all">{PAGE_COPY.text[22]}<ArrowRight size={14} />
            </Link>
            <Link to={`${langPrefix}/blog`} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-white/5 transition-all">{PAGE_COPY.text[23]}</Link>
          </div>
        </div>
      </section>

      {/* WHY MVA FOR SAAS */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[24]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[25]}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {reasons.map((r, i) => {
              const Icon = copyIcons[r.icon as keyof typeof copyIcons];
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[26]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[27]}</h2>
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
            <Link to={`${langPrefix}/process`} className="text-[14px] text-white/60 underline underline-offset-4 hover:text-white">{PAGE_COPY.text[28]}</Link>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[29]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[30]}</h2>
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[31]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[32]}</h2>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-[1.5fr,1fr,1fr] text-[12px] font-semibold tracking-[0.12em] uppercase text-white/45 border-b border-white/8">
              <div className="px-6 py-4">{PAGE_COPY.text[33]}</div>
              <div className="px-6 py-4 text-center bg-primary/5 text-primary">{PAGE_COPY.text[34]}</div>
              <div className="px-6 py-4 text-center">{PAGE_COPY.text[35]}</div>
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{PAGE_COPY.text[36]}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">{PAGE_COPY.text[37]}</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[16px] font-semibold text-white">{f.q}</span>
                  <span className={`text-primary text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>{PAGE_COPY.text[38]}</span>
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
          <h2 className="font-display text-[clamp(34px,5vw,64px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-6">{PAGE_COPY.text[39]}<span className="text-primary">{PAGE_COPY.text[40]}</span>{PAGE_COPY.text[41]}</h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">{PAGE_COPY.text[42]}</p>
          <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">{PAGE_COPY.text[43]}<ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default SaasPrelaunch;
