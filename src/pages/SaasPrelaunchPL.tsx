import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, Target, Users, LineChart, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";

const SaasPrelaunchPL = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=saas-pillar-pl`;
  const quizLink = `${langPrefix}/quiz?source=saas-pillar-pl`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const reasons = [
    {
      icon: Target,
      label: "Walidacja popytu",
      title: "Sprawdź popyt, zanim zespół spędzi pół roku na produkcie",
      body: "Większość founderów SaaS najpierw buduje, a dopiero potem pyta rynek, czy problem jest wystarczająco bolesny. My odwracamy kolejność: pozycjonowanie, landing, lead magnet i płatny ruch testują intencję zakupu przed developmentem. Jeśli CPL, aktywacja albo deklarowana gotowość płatności się nie spina — dowiadujesz się tego po 30 dniach, nie po roku kodowania.",
    },
    {
      icon: Users,
      label: "1000 właściwych leadów",
      title: "Buduj Minimum Viable Audience, nie martwą waitlistę",
      body: "Lista zapisów to adresy e-mail. MVA to 1000+ osób, które same wskazały konkretny problem, segment i poziom intencji. Dla SaaS oznacza to bazę użytkowników gotowych do bety, rozmów discovery, onboardingów i płatnej aktywacji w pierwszym tygodniu startu.",
    },
    {
      icon: LineChart,
      label: "Dane GTM przed startem",
      title: "Poznaj CAC, komunikat i kanał, zanim produkt trafi na rynek",
      body: "Po 90 dniach masz benchmark CPL, zwycięskie kąty komunikacji, dane z paid social / LinkedIn / Reddita i pierwszą mapę LTV/CAC. To twardy materiał do roadmapy, pitch decka i rozmów z inwestorami — nie slajd z założeniami o rynku.",
    },
    {
      icon: Rocket,
      label: "Launch z dźwignią",
      title: "Dzień startu nie może zależeć od jednego posta na Product Hunt",
      body: "Zimny launch koncentruje całe ryzyko w jednym dniu. MVA rozkłada je na 4 fale aktywacji: e-mail, retargeting, społeczności i founder-led outreach do najbardziej zaangażowanych leadów. Efekt: triale, rozmowy sprzedażowe i pierwsi płacący użytkownicy od dnia pierwszego.",
    },
  ];

  const phases = [
    { n: "01", title: "Discover — ICP, problem i obietnica", body: "Zawężamy segment: kto ma problem, ile dziś za niego płaci, jaki trigger powoduje zakup. Analizujemy konkurencyjne SaaS, alternatywy manualne i język rynku. Efekt: dokument pozycjonowania, 3 kąty komunikacji i lead magnet, który zbiera sygnały intencji, nie przypadkowe zapisy." },
    { n: "02", title: "Build — landing, lead magnet, płatny lejek", body: "Budujemy jedną ostrą stronę na Twojej domenie, lead magnet przydatny dla ICP oraz kampanie Meta, LinkedIn, Reddit lub Google Search. Do tego sekwencja e-mail, tracking GA4/UTM i scoring leadów, żeby odróżnić ciekawość od realnej gotowości zakupu." },
    { n: "03", title: "Launch — aktywacja MVA i pierwszy cohort", body: "T-7 dni: rozgrzewka, founder story i segmentacja leadów. Dzień startu: 4 fale maili, retargeting i outreach do top 5% zaangażowanych. Tydzień 1: onboarding, rozmowy sprzedażowe, feedback loop i pierwsze decyzje produktowe oparte na zachowaniu użytkowników." },
  ];

  const deliverables = [
    "Dokument pozycjonowania, ICP i message-market fit",
    "Landing page zoptymalizowany pod zapisy / betę / demo",
    "Lead magnet: template, mini-tool, benchmark albo raport",
    "Lejki reklamowe Meta, LinkedIn, Reddit lub Google Search",
    "Sekwencja e-mailowa 5–9 wiadomości w MailerLite / Customer.io",
    "GA4, UTM, event layer i scoring intencji leadów",
    "Playbook startu SaaS z 4-falową aktywacją",
    "Cotygodniowy raport CPL, activation rate i sygnałów CAC",
  ];

  const comparison = [
    { row: "Walidacja popytu przed developmentem", mva: true, cold: false },
    { row: "Płacący użytkownicy w dniu startu", mva: "20–100", cold: "0–5" },
    { row: "Znany komunikat i ICP", mva: true, cold: false },
    { row: "Wstępny CAC przed launch'em", mva: true, cold: false },
    { row: "Ryzyko dnia startu", mva: "Rozłożone", cold: "Wszystko na PH/X" },
    { row: "Pierwszy cohort użytkowników", mva: "Dzień 1", cold: "Miesiąc 2–4" },
    { row: "Koszt", mva: "6 000 zł/mies + media", cold: "0 zł + spalony runway" },
  ];

  const faqs = [
    {
      q: "Czym różni się agencja prelaunch SaaS od zwykłej agencji marketingowej?",
      a: "Typowa agencja marketingowa skaluje produkt, który już istnieje. My pracujemy wcześniej: walidujemy popyt, budujemy publiczność, testujemy komunikat i przygotowujemy launch tak, żeby pierwszy cohort użytkowników nie był przypadkiem. Performance agency ma sens po ustabilizowaniu CAC; przed MVA często tylko przepala budżet na niezwalidowany przekaz.",
    },
    {
      q: "Czy to działa dla B2B SaaS z wysokim ACV?",
      a: "Tak, ale inaczej niż dla self-serve. Przy wysokim ACV nie celujemy w 1000 przypadkowych leadów. Budujemy mniejszą, jakościową listę nazwanych kont, testujemy komunikat przez LinkedIn, warm intro, eksperckie treści i demo requesty. Framework MVA zostaje ten sam, zmienia się kanał i scoring intencji.",
    },
    {
      q: "Na jakim etapie SaaS powinniśmy zacząć prelaunch?",
      a: "Najlepiej przed pełnym developmentem albo przy MVP/becie. Jeśli masz już produkt, ale launch był cichy, nadal możemy użyć frameworku MVA jako resetu: zawężenie ICP, nowa strona, nowe kąty komunikacji i ponowny test kanałów przed większym budżetem growth.",
    },
    {
      q: "Ile trwa współpraca i ile kosztuje?",
      a: "Standardowy cykl MVA trwa 90 dni. Cena w Polsce: 6 000 zł netto miesięcznie przez 3 miesiące, plus budżet mediowy — zwykle 12 000–32 000 zł na cały cykl. Zakres zależy od segmentu, ACV i kanałów. Pełny rozkład jest na stronie packages.",
    },
    {
      q: "Czy gwarantujecie liczbę leadów albo płacących użytkowników?",
      a: "Gwarantujemy proces, tempo wdrożenia i transparentne benchmarki: działający lejek w 30 dni, test komunikacji, cotygodniowe dane CPL i rekomendacje. Nie obiecujemy liczby bez modelu. W SaaS wolimy uczciwie policzyć potencjał niż sprzedać gwarancję, której nie da się kontrolować bez ceny, kategorii i budżetu.",
    },
    {
      q: "Jakie kanały najlepiej działają dla prelaunch SaaS?",
      a: "Najczęściej: LinkedIn dla B2B, Reddit i społeczności niszowe dla produktów prosumenckich, Meta dla szerokich problemów oraz Google Search przy wyraźnej intencji. Kanał wybieramy po researchu ICP. Nie zaczynamy od kanału — zaczynamy od problemu, języka rynku i gotowości do zapisu lub rozmowy.",
    },
    {
      q: "Czy pomagacie z Product Hunt?",
      a: "Tak, ale Product Hunt traktujemy jako amplifikator, nie strategię. Przygotowujemy assets, copy, sekwencję aktywacji i community drops, ale nie opieramy startu wyłącznie na rankingu dnia. MVA ma działać nawet wtedy, gdy PH nie dowiezie oczekiwanej ekspozycji.",
    },
    {
      q: "Gdzie jesteście zarejestrowani i jak pracujemy?",
      a: "JAY-23 to JAY23 LLC z siedzibą w Wyoming, USA. Pracujemy zdalnie z founderami z Polski, EU, UK i USA. Standard: cotygodniowy 30-minutowy sync, asynchroniczne update'y, wspólna tablica z eksperymentami i miesięczny przegląd strategii.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Agencja prelaunch dla SaaS",
    provider: { "@id": "https://jay23.com/#organization" },
    areaServed: { "@type": "Place", name: "Polska" },
    name: "Agencja prelaunch SaaS — Framework MVA",
    description: "Agencja prelaunch dla founderów SaaS. 90-dniowy framework MVA: walidacja popytu, 1000+ leadów, launch z płacącymi użytkownikami od dnia pierwszego.",
    url: "https://jay23.com/pl/agencja-prelaunch-saas",
    offers: { "@type": "Offer", price: "6000", priceCurrency: "PLN", priceSpecification: { "@type": "UnitPriceSpecification", price: "6000", priceCurrency: "PLN", unitText: "MONTH" } },
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
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://jay23.com/pl" },
      { "@type": "ListItem", position: 2, name: "Agencja prelaunch SaaS", item: "https://jay23.com/pl/agencja-prelaunch-saas" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Agencja prelaunch SaaS — marketing przed startem | JAY-23"
        description="Agencja prelaunch dla SaaS: 90-dniowy MVA Framework, walidacja popytu, 1000+ leadów i launch z płacącymi użytkownikami od dnia pierwszego."
        canonical="/pl/agencja-prelaunch-saas"
        lang="pl"
        ogImage="https://jay23.com/og-default.jpg"
        ogImageAlt="Agencja prelaunch SaaS — JAY-23"
        hreflangOverrides={{ en: "/en/saas-prelaunch-marketing-agency", pl: "/pl/agencja-prelaunch-saas" }}
        schemaJson={[serviceSchema, faqSchema, breadcrumbSchema]}
      />
      <MvaNavbar />

      <section className="relative overflow-hidden bg-[hsl(var(--dark-bg))] min-h-screen flex flex-col justify-center">
        <div className="absolute -top-[10%] -right-[15%] w-[65vw] h-[65vw] max-w-[760px] max-h-[760px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.18)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.08)_0%,transparent_65%)] pointer-events-none" />

        <div className="container mx-auto max-w-[1100px] px-6 pt-32 pb-20 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-7 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Prelaunch marketing · Dla founderów SaaS
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-[clamp(40px,5.6vw,78px)] font-black uppercase leading-[0.98] tracking-tight text-white mb-8 max-w-[16ch]"
          >
            Agencja prelaunch dla założycieli <span className="text-primary">SaaS</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(16px,1.55vw,20px)] font-light text-white/55 max-w-[700px] leading-relaxed mb-10"
          >
            Większość startupów SaaS startuje za późno z marketingiem: najpierw produkt, potem publiczność, potem paniczne szukanie pierwszych użytkowników.
            JAY-23 prowadzi 90-dniowy framework MVA — walidujemy popyt, budujemy 1000+ leadów i przygotowujemy launch SaaS z płacącymi użytkownikami od dnia pierwszego.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
              Umów bezpłatną rozmowę strategiczną <ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white/5 transition-all">
              Policz swoją MVA
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Pułapka cichego launchu</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">
            Dlaczego dobry SaaS może nie dostać drugiej szansy na pierwszy start.
          </h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            <p>Domyślny scenariusz wygląda znajomo: roadmapa, MVP, kilka miesięcy developmentu, launch na Product Hunt, post na LinkedIn i nadzieja, że rynek sam zrozumie wartość produktu. Problem nie leży w samym launchu. Problem polega na tym, że publiczność poznaje produkt dopiero wtedy, gdy powinna już kupować.</p>
            <p>Prelaunch marketing dla SaaS przesuwa najważniejsze decyzje wcześniej: kto jest realnym ICP, jaki problem sprzedaje się najostrzej, który kanał dowozi intencję i jaki komunikat obniża koszt zapisu. To nie jest „budowanie hype'u”. To kontrolowany test rynku przed startem.</p>
            <p>Minimum Viable Audience daje founderowi bazę ludzi, którzy już rozumieją problem i czekają na rozwiązanie. Dzięki temu launch nie jest zimnym krzykiem w próżnię, tylko aktywacją rozgrzanej grupy użytkowników, z której da się zbudować pierwszy cohort, case study i roadmapę opartą na danych.</p>
          </div>
        </div>
      </section>

      {/* GO TO MARKET — keyword-targeted section */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Go to market dla SaaS</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">
            Go to market dla SaaS — strategia, której nie zbudujesz w deku inwestorskim.
          </h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            <p>Większość strategii <strong className="font-medium text-white">go to market</strong> dla SaaS w Polsce żyje w PDF-ie: jest ICP, są persony, są kanały, jest plan na 12 miesięcy. Nie ma jednego: dowodu, że ktoś naprawdę zapłaci. MVA jest praktyczną wersją GTM — zamiast slajdów dostajesz działający lejek, realny CPL, mapę kanałów i listę leadów gotowych do bety jeszcze przed pierwszym sprintem produktowym.</p>
            <p>Pracujemy zarówno z self-serve SaaS (PLG, freemium, $10–$100 MRR), jak i z B2B o wysokim ACV ($10k–$100k), gdzie GTM oznacza named accounts, LinkedIn outbound i discovery calls. Framework zostaje ten sam, zmieniają się kanał, scoring intencji i lead magnet. Dla self-serve — Meta, Reddit, społeczności. Dla enterprise — LinkedIn, warm intro, eksperckie treści i webinary z analitykami.</p>
            <p>Po 90 dniach masz konkretne odpowiedzi pod decyzje GTM: który segment kupuje najszybciej, jaki komunikat ma najniższy CAC, który kanał skaluje się przy podwojeniu budżetu, jakie zastrzeżenia blokują zakup. To materiał na pierwszy hire growth lead, rozmowę z inwestorem i obronę roadmapy — nie kolejny dokument „strategiczny", który zestarzeje się w 3 miesiące.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[14px] px-6 py-3 rounded-full hover:brightness-110 transition-all">
              Zbuduj GTM dla swojego SaaS <ArrowRight size={14} />
            </Link>
            <Link to={`${langPrefix}/blog`} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-white/5 transition-all">
              Zobacz playbooki marketingu SaaS
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Dlaczego MVA dla SaaS</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Cztery powody, dla których founderzy SaaS budują publiczność przed produktem.
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

      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">90-dniowy framework MVA</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Jak prowadzimy SaaS od hipotezy do startu z realną intencją zakupu.
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
              Zobacz pełny rozkład procesu →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Co dostajesz</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Konkretne artefakty dla launchu SaaS, nie ogólny consulting.
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

      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">MVA vs zimny start</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Ten sam SaaS, dwie strategie startu, zupełnie inny pierwszy cohort.
            </h2>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-[1.5fr,1fr,1fr] text-[12px] font-semibold tracking-[0.12em] uppercase text-white/45 border-b border-white/8">
              <div className="px-6 py-4">Kryterium</div>
              <div className="px-6 py-4 text-center bg-primary/5 text-primary">Framework MVA</div>
              <div className="px-6 py-4 text-center">Zimny start</div>
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

      <CaseStudiesSection />

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

      <section className="relative bg-[hsl(var(--dark-bg))] py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto max-w-[820px] px-6 text-center relative z-10">
          <h2 className="font-display text-[clamp(34px,5vw,64px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-6">
            Gotowy startować z <span className="text-primary">użytkownikami, nie z ciszą</span>?
          </h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[540px] mx-auto font-light leading-relaxed">
            30 minut. Bezpłatnie. Wychodzisz z konkretnym planem MVA dla swojego SaaS — nawet jeśli nie będziemy dalej pracować razem.
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

export default SaasPrelaunchPL;