import { useCallback, useState } from "react";
import { Check, X, ArrowRight, Radio } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { livePl, liveEn } from "@/content/liveCopy";
import LiveCalculator from "@/components/live/LiveCalculator";
import LiveAuditForm from "@/components/live/LiveAuditForm";
import LiveTrainingModal from "@/components/live/LiveTrainingModal";
import { liveEvent } from "@/components/live/liveEvents";

const BASE = "https://jay23.com";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Live = () => {
  const { lang } = useLanguage();
  const locale: "pl" | "en" = lang === "pl" ? "pl" : "en";
  const copy = locale === "pl" ? livePl : liveEn;

  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [trainingOpen, setTrainingOpen] = useState(false);

  const handleResult = useCallback((pct: number) => setCalcResult(pct), []);

  const cta = (ctaId: string, section: string, target: string) => () => {
    liveEvent("live_cta_click", { cta_id: ctaId, section, locale });
    scrollTo(target);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "pl" ? "Jay23 LIVE — sprzedaż na żywo dla marek e-commerce" : "Jay23 LIVE — live selling for e-commerce brands",
    serviceType: "Live commerce management",
    provider: {
      "@type": "Organization",
      name: "Jay23",
      url: BASE,
    },
    areaServed: locale === "pl" ? { "@type": "Country", name: "Poland" } : { "@type": "Place", name: "European Union" },
    url: `${BASE}${copy.meta.canonical}`,
    description: copy.meta.description,
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "PLN",
        description:
          locale === "pl"
            ? "9% od GMV netto z prowadzonych kanałów, bez abonamentu. Onboarding jednorazowo 4 900 PLN. Szkolenie LIVE Sprint 2 900 PLN za firmę."
            : "9% of net GMV from the channels we run, no retainer. One-off onboarding 4,900 PLN. LIVE Sprint training 2,900 PLN per company.",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        canonical={copy.meta.canonical}
        ogImage={`${BASE}/og/live.jpg`}
        ogImageAlt={copy.meta.title}
        lang={locale}
        type="website"
        hreflangOverrides={{ en: "/en/live", pl: "/pl/live" }}
        schemaJson={[serviceSchema, faqSchema]}
      />
      <MvaNavbar />

      {/* 1 — Hero */}
      <header className="relative overflow-hidden bg-[hsl(var(--dark-bg))] pt-32 pb-20 px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(circle at 20% 0%, hsl(253 100% 62% / 0.28), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative container mx-auto max-w-[1200px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            <Radio size={12} aria-hidden /> {copy.hero.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] font-bold text-white max-w-4xl">
            {copy.hero.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">{copy.hero.lead}</p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={cta("hero_primary", "hero", "kontakt")}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold rounded-button hover:brightness-110 transition-all"
            >
              {copy.hero.ctaPrimary} <ArrowRight size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={cta("hero_secondary", "hero", "kalkulator")}
              className="inline-flex items-center justify-center border border-white/25 text-white px-8 py-4 text-sm font-semibold rounded-button hover:border-white transition-colors"
            >
              {copy.hero.ctaSecondary}
            </button>
          </div>
          <p className="mt-5 text-sm text-white/50 max-w-md">{copy.hero.micro}</p>
        </div>
      </header>

      {/* 2 — Market numbers */}
      <section className="bg-[hsl(var(--dark-card))] px-6 py-14 border-t border-white/5">
        <div className="container mx-auto max-w-[1200px]">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {copy.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-4xl lg:text-5xl font-bold text-white leading-none">{s.value}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-white/55">{s.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-xs text-white/35">{copy.statsSource}</p>
        </div>
      </section>

      {/* 3 — Problem */}
      <section className="px-6 py-24">
        <div className="container mx-auto max-w-[760px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">{copy.problem.heading}</h2>
          <div className="space-y-6">
            {copy.problem.paragraphs.map((p, i) => (
              <p key={i} className={`leading-relaxed ${i === 1 ? "text-lg font-medium text-foreground" : "text-muted-foreground"}`}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — How it works */}
      <section className="px-6 py-24 bg-secondary/60 border-y border-border">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{copy.how.heading}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {copy.how.steps.map((s, i) => (
              <li key={s.title} className="rounded-card border border-border bg-card p-6">
                <span className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-bold leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Calculator */}
      <section id="kalkulator" className="px-6 py-24 scroll-mt-20">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">{copy.calc.heading}</h2>
          <p className="mt-4 mb-12 max-w-2xl text-muted-foreground leading-relaxed">{copy.calc.lead}</p>
          <LiveCalculator copy={copy} locale={locale} onResult={handleResult} />
          <div className="mt-12 max-w-3xl">
            <button
              type="button"
              onClick={cta("calc_primary", "calculator", "kontakt")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              {copy.calc.cta} <ArrowRight size={15} aria-hidden />
            </button>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{copy.calc.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* 6 — Pricing model */}
      <section className="px-6 py-24 bg-[hsl(var(--dark-bg))]">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{copy.pricing.heading}</h2>
          <blockquote className="mt-10 max-w-3xl font-display text-2xl sm:text-3xl font-bold leading-snug text-white border-l-2 border-primary pl-6">
            {copy.pricing.quote}
          </blockquote>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {copy.pricing.cards.map((c) => (
              <div key={c.title} className="rounded-card border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-display text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-card border border-primary/30 bg-primary/10 p-7 max-w-4xl">
            <h3 className="font-display text-lg font-bold text-white">{copy.pricing.onboardingTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{copy.pricing.onboarding}</p>
          </div>
        </div>
      </section>

      {/* 7 — Channels */}
      <section className="px-6 py-24">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{copy.channels.heading}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {copy.channels.items.map((ch) => (
              <article key={ch.name} className="rounded-card border border-border bg-card p-7 flex flex-col">
                <span className="self-start rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {ch.badge}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{ch.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ch.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Fit */}
      <section className="px-6 py-24 bg-secondary/60 border-y border-border">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{copy.fit.heading}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-card border border-border bg-card p-7">
              <h3 className="font-display text-lg font-bold mb-5">{copy.fit.yesTitle}</h3>
              <ul className="space-y-3">
                {copy.fit.yes.map((i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <Check size={17} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border bg-card p-7">
              <h3 className="font-display text-lg font-bold mb-5">{copy.fit.noTitle}</h3>
              <ul className="space-y-3">
                {copy.fit.no.map((i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <X size={17} className="mt-0.5 shrink-0 text-destructive" aria-hidden />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-10 max-w-2xl text-lg font-medium leading-relaxed">{copy.fit.closing}</p>
        </div>
      </section>

      {/* 9 — Training */}
      <section id="szkolenie" className="px-6 py-24 bg-[hsl(var(--dark-card))] scroll-mt-20">
        <div className="container mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">{copy.training.heading}</h2>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{copy.training.product}</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">{copy.training.price}</p>
              <p className="mt-6 text-base leading-relaxed text-white/65">{copy.training.lead}</p>

              <h3 className="mt-10 font-display text-base font-bold text-white">{copy.training.deliverablesTitle}</h3>
              <ul className="mt-4 space-y-2">
                {copy.training.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm text-white/65">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-white/45">{copy.training.details}</p>
              <button
                type="button"
                onClick={() => {
                  liveEvent("live_cta_click", { cta_id: "training_modal", section: "training", locale });
                  setTrainingOpen(true);
                }}
                className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold rounded-button hover:brightness-110 transition-all"
              >
                {copy.training.cta} <ArrowRight size={16} aria-hidden />
              </button>
              <p className="mt-4 text-xs text-white/45 max-w-md">{copy.training.micro}</p>
            </div>

            <div className="rounded-card border border-white/10 bg-white/[0.03] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">{copy.training.agendaHead.time}</th>
                    <th scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">{copy.training.agendaHead.block}</th>
                    <th scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">{copy.training.agendaHead.outcome}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.training.agenda.map((a) => (
                    <tr key={a.block} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-4 align-top text-sm font-semibold text-primary whitespace-nowrap">{a.time}</td>
                      <td className="px-5 py-4 align-top text-sm text-white">{a.block}</td>
                      <td className="px-5 py-4 align-top text-sm text-white/55">{a.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="px-6 py-24">
        <div className="container mx-auto max-w-[820px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">{copy.faq.heading}</h2>
          <Accordion type="single" collapsible className="w-full">
            {copy.faq.items.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-bold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 11 — Contact */}
      <section id="kontakt" className="px-6 pb-24 scroll-mt-20">
        <div className="container mx-auto max-w-[820px]">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">{copy.contact.heading}</h2>
          <p className="mt-4 mb-10 text-muted-foreground leading-relaxed">{copy.contact.lead}</p>
          <LiveAuditForm copy={copy} locale={locale} calculatorResult={calcResult} />
        </div>
      </section>

      <FooterSection />

      <LiveTrainingModal copy={copy} locale={locale} open={trainingOpen} onClose={() => setTrainingOpen(false)} />
    </div>
  );
};

export default Live;
