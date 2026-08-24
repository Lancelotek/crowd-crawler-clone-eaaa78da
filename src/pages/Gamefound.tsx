import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, MapPin, Percent, Users, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";

const copy = {
  pl: {
    metaTitle: "Agencja Gamefound — kampanie na polskiej platformie | JAY-23",
    metaDescription:
      "Prowadzimy kampanie Gamefound: lista 1000+ Early Birds przed startem, launch day support i Late Pledge. 46 kampanii, $1.2M+ zebranych.",
    eyebrow: "Agencja Gamefound · Polska",
    h1Lead: "Twoja kampania",
    h1Accent: "Gamefound",
    h1Tail: "zrobiona właściwie.",
    heroSub:
      "Gamefound to najsilniejsza platforma crowdfundingowa dla gier planszowych — i jedyna z polskim zespołem. Budujemy Twoją listę 1000+ płatnych Early Birds, zanim ruszy kampania. 46 zrealizowanych kampanii, $1.2M+ zebranych.",
    ctaHero: "Umów bezpłatną konsultację",
    ctaQuiz: "Policz swój MVA",
    whyEyebrow: "Dlaczego Gamefound",
    whyTitle: "4 powody, dla których polski founder powinien rozważyć Gamefound zamiast Kickstartera.",
    compareEyebrow: "Porównanie 1:1",
    compareTitle: "Gamefound vs Kickstarter — z perspektywy polskiego foundera.",
    criterion: "Kryterium",
    articleLead: "Pełna analiza w artykule:",
    articleAnchor: "Gamefound vs Kickstarter — co wybrać w 2026",
    articleSlug: "gamefound-vs-kickstarter",
    howEyebrow: "Jak pracujemy",
    howTitle: "90 dni MVA Framework pod Gamefound.",
    pricingLink: "Zobacz pełny cennik i zakres pakietów →",
    faqTitle: "Najczęściej zadawane pytania.",
    ctaLead: "Gotowy na launch",
    ctaAccent: "Gamefound",
    ctaSub:
      "30 minut. Bezpłatnie. Wychodzisz z konkretnym planem MVA pod swoją kampanię — niezależnie czy ze mną pracujesz dalej.",
    ctaButton: "Umów rozmowę strategiczną",
    reasons: [
      {
        icon: MapPin,
        label: "Polska platforma",
        title: "Gamefound powstał we Wrocławiu",
        body: "Zespół, support i większość operacji są w Polsce. To realne ułatwienie dla polskich founderów: kontakt po polsku, lokalne rozumienie rynku gier planszowych, brak bariery językowej w eskalacjach.",
      },
      {
        icon: Percent,
        label: "Niższa prowizja",
        title: "5% vs 5% Kickstarter — ale bez podatku jak na KS",
        body: "Gamefound bierze 5% od zebranej kwoty (plus opłaty processingu). Kickstarter też 5%, ale rozliczenia z Polski na KS są bardziej skomplikowane podatkowo. Gamefound rozlicza się jako polski podmiot — to mniej księgowości na Twojej głowie.",
      },
      {
        icon: Users,
        label: "Społeczność tabletop",
        title: "70% ruchu to backerzy planszówek",
        body: "Jeśli Twój produkt to gra planszowa, karciana, RPG lub akcesoria gamingowe — Gamefound ma już zbudowaną publiczność, która wraca na platformę. Na Kickstarterze konkurujesz o uwagę z 20 kategoriami.",
      },
      {
        icon: Calendar,
        label: "Late Pledge przez 12 miesięcy",
        title: "Kampania nie kończy się w dniu zamknięcia",
        body: "Late Pledge Manager na Gamefound jest natywny — backerzy mogą doładowywać przez rok po kampanii. Średnio dodaje to 20–35% do pierwotnej kwoty. Na KS musisz integrować BackerKit zewnętrznie.",
      },
    ],
    comparison: [
      { row: "Prowizja platformy", gf: "5%", ks: "5%" },
      { row: "Płatności (Stripe)", gf: "ok. 3% + €0.25", ks: "3–5%" },
      { row: "Late Pledge natywny", gf: true, ks: false },
      { row: "Pledge Manager wbudowany", gf: true, ks: false },
      { row: "Audytorium polskie", gf: "wysokie", ks: "średnie" },
      { row: "Audytorium board games", gf: "bardzo wysokie", ks: "wysokie" },
      { row: "Audytorium tech/design", gf: "niskie", ks: "bardzo wysokie" },
      { row: "Rozliczenia z Polski", gf: "proste", ks: "wymagają US/UK entity" },
    ],
    phases: [
      { n: "01", title: "Walidacja niszy Gamefound", body: "Przed wydaniem złotówki na reklamę sprawdzamy, czy Twoja kategoria ma backerów na platformie. Analiza top kampanii w Twojej niszy, benchmark conversion rate, realistyczna prognoza." },
      { n: "02", title: "Lista 1000+ Early Birds", body: "Budujemy MVA — Minimum Viable Audience. Landing page, lead magnet, Meta Ads, sekwencja email. 90 dni do startu = 1000–2500 zapisanych z CPL €1.50–€3.00." },
      { n: "03", title: "Launch day i Late Pledge", body: "Pierwsze 72 godziny decydują o algorytmie Gamefound. Aktywujemy listę w 4 falach, retargeting backerów innych kampanii, Late Pledge przez kolejne 12 miesięcy." },
    ],
    faqs: [
      {
        q: "Czy MVA Framework działa dla gier planszowych?",
        a: "Tak — i Gamefound to często lepsza platforma niż Kickstarter dla planszówek z polskim founderem. MVA Framework jest agnostyczny platformowo: budujemy listę kupujących przed startem, niezależnie czy lądujesz na KS, Gamefound, czy własnym sklepie WooCommerce. Różnica jest w lead magnecie i targetowaniu Meta Ads — pod Gamefound celujemy w istniejących backerów board games.",
      },
      {
        q: "Mam już produkt gotowy, czy nie za późno na MVA?",
        a: "Optymalne okno to 60–90 dni przed startem kampanii. Jeśli masz mniej (np. 30 dni) — pracujemy w trybie Launch Sprint i osiągamy 400–800 leadów zamiast 1500+. Lepiej startować z listą 500 niż z listą 0. Najgorszy scenariusz to start z zerową publicznością — wtedy pierwsze 48h kampanii to cisza i algorytm Gamefound nie podbija Twojej kampanii.",
      },
      {
        q: "Ile kosztuje kampania na Gamefound z agencją?",
        a: "Pakiet Full MVA to 6 000 PLN/mies. przez 4 miesiące (razem 24 000 PLN netto) — strategia, landing page, Meta Ads, MailerLite, kreacje. Do tego budżet reklamowy: minimum 8 000 PLN przez 90 dni, optymalnie 15 000–25 000 PLN. Pełny breakdown na stronie cennika.",
      },
      {
        q: "Czy pomagacie też w samej kampanii (nie tylko prelaunch)?",
        a: "Tak. Launch day support, komunikacja z backerami w pierwszym tygodniu, retargeting i Late Pledge są częścią Full MVA. Sama strona kampanii Gamefound (copy, layout, gallery) to dodatkowy zakres — robimy lub współpracujemy z dedykowanym studiem.",
      },
    ],
  },
  en: {
    metaTitle: "Gamefound Agency — Pre-Launch Campaigns That Fund | JAY-23",
    metaDescription:
      "Gamefound agency running full campaigns: 1,000+ Early Birds before launch, launch-day support and Late Pledge. 46 campaigns, $1.2M+ raised.",
    eyebrow: "Gamefound agency · Tabletop & collectibles",
    h1Lead: "Your",
    h1Accent: "Gamefound",
    h1Tail: "campaign, run properly.",
    heroSub:
      "Gamefound is the strongest crowdfunding platform for tabletop games, and the only major one with native Late Pledge. We build your list of 1,000+ committed Early Birds before the campaign goes live. 46 campaigns delivered, $1.2M+ raised.",
    ctaHero: "Book a free strategy call",
    ctaQuiz: "Calculate your MVA",
    whyEyebrow: "Why Gamefound",
    whyTitle: "Four reasons tabletop creators pick Gamefound over Kickstarter.",
    compareEyebrow: "Side by side",
    compareTitle: "Gamefound vs Kickstarter — from a creator's perspective.",
    criterion: "Criterion",
    articleLead: "Full breakdown in the article:",
    articleAnchor: "Gamefound vs Kickstarter — which to choose in 2026",
    articleSlug: "gamefound-vs-kickstarter",
    howEyebrow: "How we work",
    howTitle: "The 90-day MVA Framework, tuned for Gamefound.",
    pricingLink: "See full pricing and package scope →",
    faqTitle: "Frequently asked questions.",
    ctaLead: "Ready for your",
    ctaAccent: "Gamefound",
    ctaSub:
      "30 minutes. Free. You leave with a concrete MVA plan for your campaign — whether or not you keep working with us.",
    ctaButton: "Book a strategy call",
    reasons: [
      {
        icon: MapPin,
        label: "Platform focus",
        title: "Built for tabletop, not for everything",
        body: "Gamefound was built in Wrocław specifically around board games, card games and RPGs. The platform, the editorial surfaces and the recommendation logic all serve that audience instead of splitting attention across twenty unrelated categories.",
      },
      {
        icon: Percent,
        label: "Fees",
        title: "5% platform fee, same as Kickstarter",
        body: "Gamefound charges 5% of funds raised plus payment processing (roughly 3% + €0.25). The fee is a wash against Kickstarter — the real difference is what the platform does for discovery and for post-campaign pledges.",
      },
      {
        icon: Users,
        label: "Tabletop community",
        title: "Around 70% of traffic is tabletop backers",
        body: "If your product is a board game, card game, RPG or gaming accessory, Gamefound already has a returning audience with buying intent. On Kickstarter you compete for attention against every other category on the homepage.",
      },
      {
        icon: Calendar,
        label: "Late Pledge for 12 months",
        title: "The campaign doesn't end on closing day",
        body: "Gamefound's Late Pledge manager is native — backers can keep pledging for up to a year after the campaign closes. In practice that adds 20–35% on top of the original raise. On Kickstarter you bolt on BackerKit to get the same thing.",
      },
    ],
    comparison: [
      { row: "Platform fee", gf: "5%", ks: "5%" },
      { row: "Payment processing", gf: "~3% + €0.25", ks: "3–5%" },
      { row: "Native Late Pledge", gf: true, ks: false },
      { row: "Built-in pledge manager", gf: true, ks: false },
      { row: "Tabletop audience", gf: "very high", ks: "high" },
      { row: "Tech / design audience", gf: "low", ks: "very high" },
      { row: "European backer base", gf: "high", ks: "medium" },
      { row: "Post-campaign upsell", gf: "native, 12 months", ks: "third-party tools" },
    ],
    phases: [
      { n: "01", title: "Validate your Gamefound niche", body: "Before a dollar goes into ads we check whether your category actually has backers on the platform: top campaigns in your niche, conversion benchmarks, and a realistic funding forecast." },
      { n: "02", title: "Build a list of 1,000+ Early Birds", body: "We build your Minimum Viable Audience: landing page, lead magnet, Meta ads, email sequence. 90 days to launch usually means 1,000–2,500 opt-ins at €1.50–€3.00 per lead." },
      { n: "03", title: "Launch day and Late Pledge", body: "The first 72 hours decide how Gamefound's algorithm treats your campaign. We activate the list in four waves, retarget backers of adjacent campaigns, and keep Late Pledge running for 12 months." },
    ],
    faqs: [
      {
        q: "Does the MVA Framework work for board games?",
        a: "Yes — and for tabletop projects Gamefound is often the better platform. The MVA Framework is platform-agnostic: we build a list of buyers before you launch, whether you land on Kickstarter, Gamefound or your own store. What changes for Gamefound is the lead magnet and the Meta targeting, which we point at existing tabletop backers.",
      },
      {
        q: "My product is finished — is it too late for MVA?",
        a: "The optimal window is 60–90 days before launch. With less time (say 30 days) we run a Launch Sprint and land 400–800 leads instead of 1,500+. Launching with 500 people beats launching with zero: a silent first 48 hours is the single most reliable way to lose the algorithm.",
      },
      {
        q: "What does a Gamefound campaign with an agency cost?",
        a: "Full MVA is $1,500/month, typically over four months, covering strategy, landing page, paid ads, email and creative. Ad budget sits on top: $2,000 minimum across 90 days, $4,000–6,000 optimal. Full breakdown on the pricing page.",
      },
      {
        q: "Do you support the live campaign too, not just pre-launch?",
        a: "Yes. Launch-day support, backer communication in week one, retargeting and Late Pledge are part of Full MVA. The Gamefound campaign page itself (copy, layout, gallery) is additional scope — we either build it or work with a dedicated studio.",
      },
    ],
  },
} as const;

const Gamefound = () => {
  const { lang, langPrefix } = useLanguage();
  const isPl = lang === "pl";
  const c = isPl ? copy.pl : copy.en;
  const bookLink = `${langPrefix}/book?source=gamefound`;
  const quizLink = `${langPrefix}/quiz?source=gamefound`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Gamefound campaign agency",
    provider: { "@id": "https://jay23.com/#organization" },
    areaServed: { "@type": "Place", name: isPl ? "Poland" : "Global" },
    name: c.metaTitle,
    description: c.metaDescription,
    url: `https://jay23.com/${isPl ? "pl" : "en"}/gamefound`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SEOHead
        title={c.metaTitle}
        description={c.metaDescription}
        canonical={`/${isPl ? "pl" : "en"}/gamefound`}
        lang={isPl ? "pl" : "en"}
        ogImage="https://jay23.com/og/gamefound-pl.jpg"
        ogImageAlt={isPl ? "Agencja Gamefound — JAY-23" : "Gamefound agency — JAY-23"}
        hreflangOverrides={{ en: "/en/gamefound", pl: "/pl/gamefound" }}
        schemaJson={[serviceSchema, faqSchema]}
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
            {c.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-[clamp(44px,6vw,84px)] font-black uppercase leading-[0.95] tracking-tight text-white mb-8 max-w-[14ch]"
          >
            {c.h1Lead} <span className="text-primary">{c.h1Accent}</span> {c.h1Tail}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(16px,1.6vw,20px)] font-light text-white/55 max-w-[640px] leading-relaxed mb-10"
          >
            {c.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
              {c.ctaHero} <ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white/5 transition-all">
              {c.ctaQuiz}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY GAMEFOUND */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{c.whyEyebrow}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {c.whyTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {c.reasons.map((r, i) => {
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

      {/* COMPARISON TABLE */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{c.compareEyebrow}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {c.compareTitle}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-[1.5fr,1fr,1fr] text-[12px] font-semibold tracking-[0.12em] uppercase text-white/45 border-b border-white/8">
              <div className="px-6 py-4">{c.criterion}</div>
              <div className="px-6 py-4 text-center bg-primary/5 text-primary">Gamefound</div>
              <div className="px-6 py-4 text-center">Kickstarter</div>
            </div>
            {c.comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1.5fr,1fr,1fr] text-[14px] ${i < c.comparison.length - 1 ? "border-b border-white/5" : ""}`}>
                <div className="px-6 py-4 text-white/80 font-medium">{row.row}</div>
                <div className="px-6 py-4 text-center bg-primary/[0.03]">
                  {typeof row.gf === "boolean"
                    ? row.gf ? <Check size={18} className="text-primary inline" /> : <X size={18} className="text-white/30 inline" />
                    : <span className="text-white">{row.gf}</span>}
                </div>
                <div className="px-6 py-4 text-center">
                  {typeof row.ks === "boolean"
                    ? row.ks ? <Check size={18} className="text-white/60 inline" /> : <X size={18} className="text-white/30 inline" />
                    : <span className="text-white/70">{row.ks}</span>}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-white/40 mt-4 text-center font-light">
            {c.articleLead}{" "}
            <Link to={`${langPrefix}/blog/${c.articleSlug}`} className="text-primary/80 underline underline-offset-4 hover:text-primary">
              {c.articleAnchor}
            </Link>
          </p>
        </div>
      </section>

      {/* MVA FRAMEWORK FOR GAMEFOUND */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">{c.howEyebrow}</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {c.howTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {c.phases.map((p, i) => (
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
            <Link to={`${langPrefix}/packages`} className="text-[14px] text-white/60 underline underline-offset-4 hover:text-white">
              {c.pricingLink}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">FAQ</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {c.faqTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {c.faqs.map((f, i) => (
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
            {c.ctaLead} <span className="text-primary">{c.ctaAccent}</span>?
          </h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">
            {c.ctaSub}
          </p>
          <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
            {c.ctaButton} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default Gamefound;
