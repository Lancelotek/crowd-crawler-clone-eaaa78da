import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { PHASES, OUTCOMES } from "@/content/processCopy";
import ScrollReveal from "@/components/ScrollReveal";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import { useLanguage } from "@/i18n/LanguageContext";



const OWNER_STYLE = {
  Agency: { className: "bg-primary/15 text-primary", label: "Agency" },
  Client: { className: "bg-emerald-500/15 text-emerald-400", label: "Client" },
  Both: { className: "bg-amber-500/15 text-amber-300", label: "Agency + Client" },
} as const;

type OwnerKey = keyof typeof OWNER_STYLE;

const OwnerBadge = ({ owner }: { owner: OwnerKey }) => {
  const s = OWNER_STYLE[owner];
  return (
    <span className={`inline-block text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full mt-1.5 ${s.className}`}>
      {s.label}
    </span>
  );
};

const Process = () => {
  const { t, lang, langPrefix } = useLanguage();

  const processJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: lang === "pl"
      ? "Trzy fazy budowania Minimum Viable Audience: 1000 prawdziwych fanów przed startem produktu"
      : "Three phases of building a Minimum Viable Audience: 1,000 true fans before product launch",
    description: lang === "pl"
      ? "90-dniowy program MVA Framework podzielony na 3 fazy: Build (budowa lejka i automatyzacji), Drive (reklamy i aktywacja społeczności), Launch (kampania launchowa i raport końcowy)."
      : "90-day MVA Framework program split into 3 phases: Build (funnel & automation setup), Drive (ads & community activation), Launch (launch campaign & final report).",
    totalTime: "P90D",
    step: [
      {
        "@type": "HowToStep",
        name: lang === "pl" ? "Discover — Dni 1–30" : "Discover — Days 1–30",
        text: lang === "pl"
          ? "Zdefiniuj niszę, zidentyfikuj 1000 prawdziwych fanów i stwórz przekaz, który rezonuje. Zawiera szablony badań odbiorców i canvas pozycjonowania."
          : "Define your niche, identify 1,000 true fans, and craft messaging that resonates. Includes audience research templates and positioning canvas.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: lang === "pl" ? "Build — Dni 31–60" : "Build — Days 31–60",
        text: lang === "pl"
          ? "Uruchom waitlistę Early Bird, skonfiguruj silnik społeczności i buduj momentum przed startem. Sprawdzone szablony landing page i sekwencje email."
          : "Launch your Early Bird waitlist, set up a community engine, and build momentum before launch. Proven landing page templates and email sequences.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: lang === "pl" ? "Launch — Dni 61–90" : "Launch — Days 61–90",
        text: lang === "pl"
          ? "Aktywuj społeczność, przeprowadź kampanię pre-launch i zamień fanów w pierwszych klientów. Coaching w czasie rzeczywistym i optymalizacja kampanii."
          : "Activate your community, run your pre-launch campaign, and turn fans into first customers. Real-time coaching and campaign optimization.",
        position: 3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t("process", "seoTitle")}
        description={t("process", "seoDesc")}
        canonical={`${langPrefix}/process`}
        lang={lang}
        jsonLd={[
          processJsonLd,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://jay23.com/${lang}` },
              { "@type": "ListItem", "position": 2, "name": lang === "pl" ? "Proces" : "Process", "item": `https://jay23.com${langPrefix}/process` },
            ],
          },
        ]}
      />
      <MvaNavbar />
      <main>
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-[900px] mx-auto">
            <ScrollReveal>
              <Link to={langPrefix} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                {t("process", "back")}
              </Link>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-4">{t("process", "eyebrow")}</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight mb-4">
                {t("process", "h1_1")}{" "}
                <span className="text-primary">{t("process", "h1_2")}</span>
                <br />{t("process", "h1_3")}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[520px] mb-12">
                {t("process", "desc")}
              </p>
            </ScrollReveal>

            <div className="flex gap-5 mb-12 flex-wrap">
              {(Object.entries(OWNER_STYLE) as [OwnerKey, typeof OWNER_STYLE[OwnerKey]][]).map(([key, s]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-sm ${s.className.split(" ")[1]} opacity-80`} style={{ backgroundColor: "currentColor" }} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              {PHASES.map((phase, i) => (
                <ScrollReveal key={phase.number}>
                  <div className="grid gap-x-5 md:gap-x-7" style={{ gridTemplateColumns: "72px 1px 1fr", paddingBottom: i < PHASES.length - 1 ? "56px" : "0" }}>
                    <div className="text-right pt-0.5">
                      <div className="text-[11px] font-bold tracking-[0.1em] uppercase mb-1.5" style={{ color: phase.theme }}>Phase {phase.number}</div>
                      <h2 className="text-xl md:text-[22px] font-bold text-foreground leading-tight mb-1.5">{phase.label}</h2>
                      <div className="text-[11px] text-muted-foreground/50 leading-snug">{phase.sub}</div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="w-3.5 h-3.5 rounded-full border-[3px] border-background flex-shrink-0 mt-1 z-[2]" style={{ backgroundColor: phase.theme, boxShadow: `0 0 12px ${phase.theme}88` }} />
                      {i < PHASES.length - 1 && <div className="flex-1 w-px bg-border mt-2" />}
                    </div>
                    <div className="rounded-2xl border p-6 md:p-7" style={{ backgroundColor: `${phase.theme}0D`, borderColor: `${phase.theme}22` }}>
                      <div className="flex flex-col gap-5">
                        {phase.steps.map((step, j) => (
                          <div key={j} className={`flex flex-col gap-1 ${j < phase.steps.length - 1 ? "pb-5 border-b border-border/30" : ""}`}>
                            <h3 className="text-[15px] font-semibold text-foreground leading-snug">{step.title}</h3>
                            <div className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</div>
                            <OwnerBadge owner={step.owner} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border/50">
                {OUTCOMES.map((o, i) => (
                  <div key={i} className="bg-background p-6 md:p-7 flex flex-col gap-2">
                    <div className="text-2xl md:text-[32px] font-extrabold text-foreground tracking-tight leading-none">{o.value}</div>
                    <div className="text-[13px] text-muted-foreground leading-snug">{o.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <div className="mt-12 flex gap-3 flex-wrap">
              <Link to={`${langPrefix}/#calculator`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                {t("process", "calcMVA")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to={`${langPrefix}/book`} className="inline-flex items-center gap-2 bg-transparent text-muted-foreground px-7 py-3.5 rounded-xl text-sm font-medium border border-border hover:border-foreground/30 hover:text-foreground transition-colors">
                {t("footer", "bookCall")}
              </Link>
            </div>

            {lang === "en" && (
              <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-[620px]">
                Want the full method in writing? Read{" "}
                <Link to="/en/prelaunch-marketing-playbook" className="text-foreground font-semibold underline underline-offset-4 hover:text-primary transition-colors">
                  The Complete Pre-Launch Marketing Playbook
                </Link>{" "}
                or the{" "}
                <Link to="/en/blog/product-launch-strategy-90-day-framework" className="text-foreground font-semibold underline underline-offset-4 hover:text-primary transition-colors">
                  90-day product launch strategy
                </Link>
                .
              </p>
            )}
          </div>
        </section>

      </main>
      <FooterSection />
    </div>
  );
};

export default Process;
