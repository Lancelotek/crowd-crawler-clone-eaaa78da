import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import { useLanguage } from "@/i18n/LanguageContext";

const PHASES = [
  {
    number: "01",
    label: "Build",
    sub: "Month 1 · Weeks 1–4",
    theme: "hsl(var(--primary))",
    themeRaw: "var(--primary)",
    steps: [
      { owner: "Agency" as const, title: "Persona mapping + quiz strategy", desc: "We define 1–3 buyer personas. Each gets a dedicated quiz path, a tailored PDF report as incentive, and a unique funnel track." },
      { owner: "Agency" as const, title: "Landing page on prelaunch.live", desc: "Quiz → email capture → Thank You page with WhatsApp VIP QR. Full Meta Pixel + GA4 setup. Visitor cookied for remarketing." },
      { owner: "Client" as const, title: "WhatsApp VIP Group + account access", desc: "Client creates the VIP group, generates QR code, and grants access to Meta, TikTok/Google, Stripe, and MailerLite." },
      { owner: "Agency" as const, title: "7-mail sequence + Stripe $1 flow", desc: "Full MailerLite automation. Mail 1 delivers the report + Early Bird reservation link. Webhook moves paying leads into a dedicated segment." },
    ],
  },
  {
    number: "02",
    label: "Drive",
    sub: "Month 2 · Weeks 5–8",
    theme: "hsl(160 70% 50%)",
    themeRaw: "160 70% 50%",
    steps: [
      { owner: "Agency" as const, title: "Ads live — Andromeda framework", desc: "Meta + TikTok (Standard) or Google Search + PMax (Starter). Videos use comment-CTA mechanic → ManyChat → quiz. A/B hook testing from day 1." },
      { owner: "Both" as const, title: "Community activation", desc: "Agency manages the ads. Client runs the VIP group — 3+ posts/week, polls, sneak peeks, Q&A. Both respond to ad comments." },
      { owner: "Agency" as const, title: "Weekly optimization + creative rotation", desc: "New creatives every 2 weeks. Quiz drop-off analysis. Google Display remarketing for cookied visitors. Weekly CPL and Stripe CR reports." },
    ],
  },
  {
    number: "03",
    label: "Launch",
    sub: "Month 3 · Weeks 9–12",
    theme: "hsl(40 95% 55%)",
    themeRaw: "40 95% 55%",
    steps: [
      { owner: "Agency" as const, title: "Lookalike campaigns from paying segment", desc: "Paying $1 subscribers → Meta Custom Audience → 1–3% Lookalike. Google Customer Match. Budget shifted to the warmest cold traffic possible." },
      { owner: "Agency" as const, title: "Full launch campaign — all channels", desc: "Launch email to full list + exclusive offer to paying segment. Ads target Custom Audiences + Lookalike. 100% conversion objective." },
      { owner: "Both" as const, title: "Final report + handover", desc: "MVA report: leads, paying segment, ROAS, funnel CR per stage. All access and documentation transferred. Retainer or self-managed — your call." },
    ],
  },
];

const OUTCOMES = [
  { value: "300+", label: "Qualified leads minimum by end of month 3" },
  { value: "30+", label: "Paying Early Bird subscribers before launch" },
  { value: "<25 PLN", label: "Max cost per lead — guaranteed" },
  { value: "3×", label: "Channels: ads, email, WhatsApp community" },
];

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
  const { t, langPrefix } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t("process", "seoTitle")}
        description={t("process", "seoDesc")}
        canonical={`${langPrefix}/process`}
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
                      <div className="text-xl md:text-[22px] font-bold text-foreground leading-tight mb-1.5">{phase.label}</div>
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
                            <div className="text-[15px] font-semibold text-foreground leading-snug">{step.title}</div>
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
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Process;
