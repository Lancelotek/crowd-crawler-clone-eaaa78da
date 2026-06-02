import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, MapPin, Percent, Users, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";

const Gamefound = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=gamefound`;
  const quizLink = `${langPrefix}/quiz?source=gamefound`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const reasons = [
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
  ];

  const comparison = [
    { row: "Prowizja platformy", gf: "5%", ks: "5%" },
    { row: "Płatności (Stripe)", gf: "ok. 3% + €0.25", ks: "3–5%" },
    { row: "Late Pledge natywny", gf: true, ks: false },
    { row: "Pledge Manager wbudowany", gf: true, ks: false },
    { row: "Audytorium polskie", gf: "wysokie", ks: "średnie" },
    { row: "Audytorium board games", gf: "bardzo wysokie", ks: "wysokie" },
    { row: "Audytorium tech/design", gf: "niskie", ks: "bardzo wysokie" },
    { row: "Rozliczenia z Polski", gf: "proste", ks: "wymagają US/UK entity" },
  ];

  const phases = [
    { n: "01", title: "Walidacja niszy Gamefound", body: "Przed wydaniem złotówki na reklamę sprawdzamy, czy Twoja kategoria ma backerów na platformie. Analiza top kampanii w Twojej niszy, benchmark conversion rate, realistyczna prognoza." },
    { n: "02", title: "Lista 1000+ Early Birds", body: "Budujemy MVA — Minimum Viable Audience. Landing page, lead magnet, Meta Ads, sekwencja email. 90 dni do startu = 1000–2500 zapisanych z CPL €1.50–€3.00." },
    { n: "03", title: "Launch day i Late Pledge", body: "Pierwsze 72 godziny decydują o algorytmie Gamefound. Aktywujemy listę w 4 falach, retargeting backerów innych kampanii, Late Pledge przez kolejne 12 miesięcy." },
  ];

  const faqs = [
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
  ];

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Gamefound campaign agency",
    provider: { "@id": "https://jay23.com/#organization" },
    areaServed: { "@type": "Country", name: "Poland" },
    name: "Agencja Gamefound — MVA Framework",
    description: "Prowadzenie kampanii Gamefound dla polskich founderów. Walidacja niszy, lista 1000+ Early Birds, launch day support, Late Pledge.",
    url: "https://jay23.com/pl/gamefound",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SEOHead
        title="Agencja Gamefound — kampanie polskiej platformy crowdfundingowej | JAY-23"
        description="Prowadzimy kampanie Gamefound dla polskich founderów. MVA Framework: lista 1000+ Early Birds przed startem, launch day support, Late Pledge. Bezpłatna konsultacja."
        canonical="/pl/gamefound"
        lang="pl"
        hreflangOverrides={{ en: "/en", pl: "/pl/gamefound" }}
        schemaJson={[orgSchema, faqSchema]}
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
            Agencja Gamefound · Polska
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-[clamp(44px,6vw,84px)] font-black uppercase leading-[0.95] tracking-tight text-white mb-8 max-w-[14ch]"
          >
            Twoja kampania <span className="text-primary">Gamefound</span> zrobiona właściwie.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(16px,1.6vw,20px)] font-light text-white/55 max-w-[640px] leading-relaxed mb-10"
          >
            Gamefound to najsilniejsza platforma crowdfundingowa dla gier planszowych — i jedyna z polskim zespołem.
            Budujemy Twoją listę 1000+ płatnych Early Birds, zanim ruszy kampania. 46 zrealizowanych kampanii, $1.2M+ zebranych.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
              Umów bezpłatną konsultację <ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white/5 transition-all">
              Policz swój MVA
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY GAMEFOUND */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Dlaczego Gamefound</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              4 powody, dla których polski founder powinien rozważyć Gamefound zamiast Kickstartera.
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

      {/* COMPARISON TABLE */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Porównanie 1:1</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Gamefound vs Kickstarter — z perspektywy polskiego foundera.
            </h2>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-[1.5fr,1fr,1fr] text-[12px] font-semibold tracking-[0.12em] uppercase text-white/45 border-b border-white/8">
              <div className="px-6 py-4">Kryterium</div>
              <div className="px-6 py-4 text-center bg-primary/5 text-primary">Gamefound</div>
              <div className="px-6 py-4 text-center">Kickstarter</div>
            </div>
            {comparison.map((c, i) => (
              <div key={i} className={`grid grid-cols-[1.5fr,1fr,1fr] text-[14px] ${i < comparison.length - 1 ? "border-b border-white/5" : ""}`}>
                <div className="px-6 py-4 text-white/80 font-medium">{c.row}</div>
                <div className="px-6 py-4 text-center bg-primary/[0.03]">
                  {typeof c.gf === "boolean"
                    ? c.gf ? <Check size={18} className="text-primary inline" /> : <X size={18} className="text-white/30 inline" />
                    : <span className="text-white">{c.gf}</span>}
                </div>
                <div className="px-6 py-4 text-center">
                  {typeof c.ks === "boolean"
                    ? c.ks ? <Check size={18} className="text-white/60 inline" /> : <X size={18} className="text-white/30 inline" />
                    : <span className="text-white/70">{c.ks}</span>}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-white/40 mt-4 text-center font-light">
            Pełna analiza w artykule:{" "}
            <Link to={`${langPrefix}/blog/gamefound-vs-kickstarter`} className="text-primary/80 underline underline-offset-4 hover:text-primary">
              Gamefound vs Kickstarter — co wybrać w 2026
            </Link>
          </p>
        </div>
      </section>

      {/* MVA FRAMEWORK FOR GAMEFOUND */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Jak pracujemy</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              90 dni MVA Framework pod Gamefound.
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
            <Link to={`${langPrefix}/packages`} className="text-[14px] text-white/60 underline underline-offset-4 hover:text-white">
              Zobacz pełny cennik i zakres pakietów →
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
              Najczęściej zadawane pytania.
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
            Gotowy na launch <span className="text-primary">Gamefound</span>?
          </h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">
            30 minut. Bezpłatnie. Wychodzisz z konkretnym planem MVA pod swoją kampanię — niezależnie czy ze mną pracujesz dalej.
          </p>
          <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
            Umów rozmowę strategiczną <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default Gamefound;
