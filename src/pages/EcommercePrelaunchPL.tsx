import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, ShoppingBag, Users, TrendingUp, Truck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";

const EcommercePrelaunchPL = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=ecommerce-pillar-pl`;
  const quizLink = `${langPrefix}/quiz?source=ecommerce-pillar-pl`;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const reasons = [
    {
      icon: ShoppingBag,
      label: "Popyt przed produkcją",
      title: "Zwaliduj produkt, zanim zamówisz partię w fabryce",
      body: "Większość marek DTC i twórców kampanii crowdfundingowych zamawia 1000 sztuk i dopiero potem szuka kupujących. My robimy to odwrotnie: landing page, ruch płatny do listy zapisów z opcją zaliczki, a produkcję uruchamiamy dopiero gdy unit economics się spina. Zły SKU wyłapany na 1500 zł budżetu reklamowego, nie na 150 000 zł zamrożonych w magazynie.",
    },
    {
      icon: Users,
      label: "1000 kupujących, nie 1000 followersów",
      title: "MVA konwertuje 8–14× lepiej niż zimny start na Shopify",
      body: "Followersi nie wysyłają gotówki. MVA to lista 1000+ osób, które wcześniej powiedziały, że chcą dokładnie ten produkt w okolicach tej ceny. Konwersja w dniu startu na MVA to 8–14% — tyle, ile typowy zimny start na Shopify osiąga łącznie w pierwsze 90 dni.",
    },
    {
      icon: TrendingUp,
      label: "Momentum algorytmu",
      title: "Pierwsze 72 godziny decydują, czy Kickstarter, Gamefound i Meta Cię skalują",
      body: "Algorytmy crowdfundingowe (KS, Gamefound) i reklamowe (Meta, TikTok) nagradzają wczesną prędkość. Z MVA rozgrzaną 4-falową aktywacją osiągasz cel finansowania albo 4× ROAS w pierwsze 3 dni — a platforma za darmo dorzuca Ci znacznie szerszy zimny ruch.",
    },
    {
      icon: Truck,
      label: "Preorder finansuje produkcję",
      title: "Klienci płacą za partię, zanim wystawi ją fabryka",
      body: "Dobrze poprowadzony pre-launch zbiera 30–80% kosztu produkcji w preorderach lub zaliczkach jeszcze przed fakturą od dostawcy. Tak marki DTC startują SKU o budżecie 800 000 zł, mając w banku 80 000 zł kapitału obrotowego — zamiast brać kredyt na towar.",
    },
  ];

  const phases = [
    { n: "01", title: "Discover — nisza, SKU i test ceny", body: "Twardo testujemy produkt: który dokładnie kupujący, jaki use case, jaki próg cenowy. Analiza konkurencji w kategoriach eCommerce i Kickstarter/Gamefound, research odbiorców na TikToku i Reddicie, projekt lead magneta (próbka, rabat, zaliczka, poradnik). Efekt: pozycjonowanie, 3 kąty komunikacji, lead magnet, który łapie zapisy po 6–14 zł CPL." },
    { n: "02", title: "Build — landing, lejek reklamowy, silnik mailowy", body: "Jeden landing zoptymalizowany pod konwersję z mechaniką zaliczki lub waitlisty. Lejki reklamowe Meta + TikTok + Pinterest (Google Search, jeśli intencja jest). Sekwencje MailerLite lub Klaviyo do nurture i rozgrzewki. Pixel + GA4 + warstwa eventów UTM, żeby dane o ROAS dnia pierwszego były twarde, nie poglądowe." },
    { n: "03", title: "Launch — 4 fale aktywacji + retargeting", body: "T-7 dni: rozgrzewka mailowa + materiały zza kulis. Dzień startu: 4 fale maili do MVA, retargeting do zaangażowanych niekupujących, organiczne wejścia w odpowiednie społeczności. Tydzień 1: video update założyciela, progi scarcity, retargeting nakładany na lookalike z kupujących dnia pierwszego. Optymalizujemy, aż ROAS się ustabilizuje." },
  ];

  const deliverables = [
    "Dokument walidacji niszy, ICP i poziomu cenowego",
    "Jeden landing zoptymalizowany pod konwersję (Shopify / Webflow / Framer)",
    "Lead magnet: próbka, strona zaliczki, rabat lub poradnik",
    "Lejki reklamowe Meta, TikTok i Pinterest",
    "Sekwencja mailowa (5–9 maili) w Klaviyo / MailerLite",
    "Pixel + GA4 + warstwa eventów gotowa pod Triple Whale",
    "Playbook dnia startu z 4-falową aktywacją",
    "Cotygodniowy raport ROAS, CPL i contribution margin",
  ];

  const comparison = [
    { row: "Walidacja popytu przed startem", mva: true, cold: false },
    { row: "Płacący klienci w dniu startu", mva: "100–500", cold: "0–20" },
    { row: "Ryzyko magazynowe", mva: "Pokryte preorderem", cold: "Na założycielu" },
    { row: "Znany ROAS dnia pierwszego", mva: true, cold: false },
    { row: "Momentum platformy w dniu startu", mva: "Złożone", cold: "Płaska linia" },
    { row: "Czas do break-even na produkcji", mva: "Dzień 1–14", cold: "Miesiąc 3–9" },
    { row: "Koszt", mva: "6 000 zł/mies + media", cold: "0 zł + martwy stock" },
  ];

  const faqs = [
    {
      q: "Startujemy na Kickstarterze. Czym to się różni od „agencji crowdfundingowej”?",
      a: "To ten sam silnik, tylko szerzej zastosowany. JAY-23 poprowadził 46 kampanii crowdfundingowych i ponad 1,2 mln USD zebranego budżetu — głównie na Kickstarterze i Gamefoundzie. Framework MVA jest niezależny od platformy: ten sam playbook działa na KS, Gamefound, Indiegogo, preorderach Shopify czy waitlistach DTC. Lead magnet i CTA się zmieniają, fizyka budowania publiczności — nie.",
    },
    {
      q: "Jesteśmy marką DTC bez crowdfundingu. Czy to wciąż ma sens?",
      a: "Tak. Spora część klientów MVA startuje bezpośrednio na Shopify z waitlistą + zaliczką + early bird. Framework działa nawet czyściej poza crowdfundingiem — brak deadline'u platformy, brak 5% prowizji, pełne dane u Ciebie. Po prostu zamieniamy „dzień startu” na „otwarcie preorderu” i robimy te same 4 fale aktywacji.",
    },
    {
      q: "Ile trwa współpraca i ile kosztuje?",
      a: "Standardowy cykl MVA to 90 dni. Cena: 6 000 zł netto/mies przez 3 miesiące (18 000 zł netto razem) za pracę agencji, plus budżet mediowy — zwykle 12 000–32 000 zł na 90 dni dla SKU poniżej 1 200 zł, więcej dla premium. Pełny rozkład na stronie packages.",
    },
    {
      q: "Próbowaliśmy już reklam na Meta i nie zadziałały. Co teraz?",
      a: "To najczęstszy punkt wyjścia. Zwykła diagnoza nie brzmi „Meta u nas nie działa” — brzmi „odpaliliśmy zimne konwersje na checkout bez rozgrzania publiczności, bez message-market fit i bez budżetu na testy kreacji”. MVA przesuwa ciężar na rozgrzewkę: najpierw lead magnet, dopiero potem zaliczka/checkout, a kreacje iterujemy na realnych danych CPL, nie na intuicji.",
    },
    {
      q: "Dla jakich kategorii produktów to działa?",
      a: "Mocne dopasowanie: produkty fizyczne 150–2000 zł, gry planszowe i tabletop, hardware/gadżety, akcesoria premium, design, niszowe narzędzia. Słabsze: czyste commodity (zasycone SKU na Allegro/Amazon), kategorie regulowane (suplementy z ograniczeniami, alkohol), zakupowy B2B. Na rozmowie szczerze powiemy, jeśli Twoja kategoria nie pasuje.",
    },
    {
      q: "Czy gwarantujecie przychód, sprzedane sztuki albo ROAS?",
      a: "Gwarantujemy proces i benchmarki: działający lejek w 30 dni, CPL w uzgodnionym przedziale i cotygodniowy transparentny raport. Przychód zależy od ceny, kategorii i budżetu. W 46 kampaniach mediana zbiórki to 50–200 tys. USD. Nie obiecujemy liczby, której nie potrafimy wymodelować z Twoich danych wejściowych.",
    },
    {
      q: "Czy można kontynuować współpracę po starcie / po Kickstarterze?",
      a: "Tak. Około połowa klientów MVA przechodzi w retainer po starcie — Late Pledge (dla crowdfundingu), przedłużenie preorderu na Shopify, flowy retencyjne, ekspansja na nowe kanały. Nie jesteśmy agencją „na zawsze” — w pewnym momencie przekazujemy system Twojemu zespołowi in-house lub agencji performance.",
    },
    {
      q: "Gdzie jesteście zarejestrowani?",
      a: "JAY-23 to JAY23 LLC z siedzibą w Wyoming, USA. Pracujemy zdalnie z założycielami z Polski, EU, UK, USA i Australii. Cotygodniowy 30-minutowy sync, codzienne async updaty, miesięczny przegląd strategii.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Agencja prelaunch dla eCommerce i crowdfundingu",
    provider: { "@id": "https://jay23.com/#organization" },
    areaServed: { "@type": "Place", name: "Polska" },
    name: "Agencja prelaunch eCommerce — Framework MVA",
    description: "Agencja prelaunch marketingu dla marek eCommerce, DTC i twórców kampanii crowdfundingowych. 90-dniowy framework MVA: walidacja popytu, 1000+ kupujących, finansowanie produkcji z preorderów.",
    url: "https://jay23.com/pl/agencja-prelaunch-ecommerce",
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
      { "@type": "ListItem", position: 2, name: "Agencja prelaunch eCommerce", item: "https://jay23.com/pl/agencja-prelaunch-ecommerce" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Agencja eCommerce dla założycieli przed startem | Framework MVA | JAY-23"
        description="Agencja ecommerce specjalizująca się w prelaunchu: walidacja popytu, 1000+ kupujących i finansowanie produkcji z preorderów. 46 kampanii, 1,2 mln USD+ zebrane na Kickstarterze, Gamefoundzie i DTC."
        canonical="/pl/agencja-prelaunch-ecommerce"
        lang="pl"
        ogImage="https://jay23.com/og-default.jpg"
        ogImageAlt="Agencja ecommerce dla założycieli przed startem — JAY-23"
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
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Prelaunch marketing · Dla eCommerce i crowdfundingu
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-[clamp(40px,5.6vw,78px)] font-black uppercase leading-[0.98] tracking-tight text-white mb-8 max-w-[16ch]"
          >
            Agencja prelaunch dla założycieli <span className="text-primary">eCommerce i crowdfundingu</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(16px,1.55vw,20px)] font-light text-white/55 max-w-[680px] leading-relaxed mb-10"
          >
            Większość startów produktów fizycznych umiera, bo publiczność buduje się po wysyłce towaru, nie przed.
            Prowadzimy 90-dniowy framework MVA — walidujemy popyt, budujemy 1000+ kupujących, finansujemy produkcję preorderem.
            46 kampanii, 1,2 mln USD+ zebrane na Kickstarterze, Gamefoundzie i DTC.
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

      {/* PROBLEM */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Pułapka zimnego startu</p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-8">
            Dlaczego większość startów produktów fizycznych gaśnie w drugim tygodniu.
          </h2>
          <div className="space-y-5 text-[16px] text-white/65 leading-relaxed font-light">
            <p>Domyślny playbook eCommerce: zamów towar, postaw Shopify, włącz reklamy Meta, módl się o ROAS 2× zanim skończy się kapitał obrotowy. Błąd jest strukturalny — zimna reklama konwersyjna pokazana komuś, kto nigdy nie słyszał o marce, konwertuje na 0,3–0,7%. Płacisz za odkrycie i konwersję w tym samym kliknięciu.</p>
            <p>Crowdfunding ma ten sam problem w ostrzejszej formie: dzień startu na Kickstarterze albo Gamefoundzie jest zerojedynkowy. Jeśli pierwsze 72 godziny nie złapią prędkości finansowania, algorytm platformy przestaje Cię promować i kampania toczy się w stronę cichej porażki przez kolejne 28 dni.</p>
            <p>Lekarstwem nie jest lepszy hook ani większy budżet — jest publiczność, która już Cię zna, chce produkt i jest gotowa kupić w dniu pierwszym. To Minimum Viable Audience: 1000+ samozidentyfikowanych kupujących zbudowanych w 90 dni. Dobrze wykorzystana MVA robi 8–14× konwersję dnia pierwszego względem zimnego startu i finansuje partię produkcyjną zaliczkami.</p>
          </div>
        </div>
      </section>

      {/* WHY MVA */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="mb-16 max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Dlaczego MVA dla eCommerce</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Cztery powody, dla których założyciele DTC i crowdfundingu używają MVA, zanim wyślą towar.
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">90-dniowy framework MVA</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Jak prowadzimy produkt fizyczny od pomysłu do startu z kupującymi już pierwszego dnia.
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

      {/* DELIVERABLES */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">Co dostajesz</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Konkretne dostawy. Każdy artefakt zostaje u Ciebie.
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
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">MVA vs zimny start</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Ten sam produkt, dwie strategie startu, bardzo różne pierwsze tygodnie.
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

      {/* CASE STUDIES */}
      <CaseStudiesSection />

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
            Gotowy startować z <span className="text-primary">kupującymi, nie obcymi</span>?
          </h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">
            30 minut. Bezpłatnie. Wychodzisz z konkretnym planem MVA dla swojego produktu — niezależnie od tego, czy zostajesz z nami.
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

export default EcommercePrelaunchPL;
