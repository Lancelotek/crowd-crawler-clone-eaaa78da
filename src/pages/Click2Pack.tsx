import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  Repeat,
  Zap,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ──────────────────────────────────────────────────────────────────────────
   click2pack — standalone sub-brand landing page.
   Lives at /:lang/click2pack. Reuses jay23.com fonts (Rajdhani + Inter)
   but renders its own header/footer with the emerald/purple palette
   requested for the sub-brand.
   ────────────────────────────────────────────────────────────────────────── */

const COPY = {
  pl: {
    seoTitle: "click2pack — Sprzedaż live dla marek beauty & skincare | JAY-23",
    seoDesc:
      "Agencja live commerce dla marek beauty i skincare DTC. Łączymy Twój produkt z twórcami sprzedającymi na żywo na TikTok Shop — bierzemy na siebie twórców, umowy, logistykę i prowizje.",
    nav: {
      problem: "Problem",
      how: "Jak działamy",
      why: "Dlaczego beauty",
      cta: "Bezpłatna konsultacja",
    },
    hero: {
      eyebrow: "Live commerce dla beauty & skincare",
      h1a: "Twój kosmetyk sprzedany na żywo.",
      h1b: "My ogarniamy resztę.",
      sub: "click2pack łączy marki beauty i skincare z twórcami, którzy sprzedają na żywo na TikTok Shop — i bierze na siebie dobór twórców, umowy, logistykę oraz rozliczenia prowizji. Ty patrzysz, jak rośnie GMV.",
      primary: "Umów bezpłatną konsultację",
      ghost: "Zobacz, jak to działa",
      micro: "30 min · bez zobowiązań · bez pitchu · odpowiadamy w 24h",
      stats: [
        "8–12% konwersja z dobrego live",
        "#1 kategoria na TikTok Shop",
        "25% Polaków kupiło już na live",
      ],
      loopTitle: "Pętla, którą zamykamy za Ciebie",
      loop: [
        ["Dobieramy twórców", "Beauty pod Twój asortyment i widownię."],
        ["Umowy i prowizje", "Kontrakty, stawki, prawa do treści."],
        ["Live & sprzedaż", "Transmisje z demo i before/after."],
        ["Pakujemy i wysyłamy", "Fulfillment przy skokach z live."],
        ["Rozliczenie & raport", "Prowizje twórców + ROI dla Ciebie."],
      ],
    },
    band: [
      ["18–22%", "udział beauty w GMV TikTok Shop"],
      ["~310 zł", "śr. wartość zakupu na live"],
      ["2×", "konwersja LIVE vs zwykłe wideo"],
      ["+791%", "wzrost beauty na live (r/r)"],
    ],
    problem: {
      eyebrow: "Pułapka pełnego magazynu",
      h2: "Masz świetny produkt. Nikt go nie widzi na żywo.",
      sub: "Marki beauty mają już wszystko poza jednym — obecnością tam, gdzie dziś podejmuje się decyzję zakupową: w transmisji na żywo.",
      cards: [
        [
          "Brak twórców",
          "Nie masz dostępu do hostów, którzy potrafią sprzedać serum czy krem na żywo i mają zaangażowaną widownię.",
        ],
        [
          "Brak operacji",
          "Umowy, stawki prowizji, prawa do treści, RODO — każda współpraca to godziny ustaleń zamiast sprzedaży.",
        ],
        [
          "Strach przed logistyką",
          "Udany live to nagły skok zamówień. Bez gotowego fulfillmentu sukces zamienia się w chaos i opóźnione wysyłki.",
        ],
      ],
      closing: "Produkt jest gotowy. Brakuje tylko sceny i operacji — to robimy my.",
    },
    compare: {
      eyebrow: "Dwie drogi",
      h2: "Tak samo dobry produkt. Inna kolejność działań.",
      leftTitle: "Bez click2pack",
      left: [
        "Sam szukasz i negocjujesz z twórcami",
        "Pojedyncze, nieregularne transmisje bez systemu",
        "Ręczne rozliczanie prowizji w arkuszu",
        "Logistyka nie wyrabia przy skoku zamówień",
        "Brak danych: nie wiesz, co realnie sprzedaje",
      ],
      leftResult: "→ Dużo pracy, niestabilny wynik",
      rightTitle: "Z click2pack",
      right: [
        "Gotowa sieć sprawdzonych twórców beauty",
        "Regularny kalendarz transmisji, które konwertują",
        "Automatyczny tracking i wypłata prowizji",
        "Fulfillment elastyczny na piki sprzedaży z live",
        "Miesięczny raport GMV, konwersji i ROI",
      ],
      rightResult: "→ Skalowalny, przewidywalny kanał sprzedaży",
    },
    why: {
      eyebrow: "Dlaczego beauty wygrywa na live",
      h2: "Kategoria stworzona do sprzedaży na żywo",
      sub: "Beauty to dziś największa i najszybciej rosnąca kategoria live commerce — i nie bez powodu.",
      cards: [
        ["Demo na żywo", "Swatche, tekstury, before/after — produkt sprzedaje się, gdy widać go w działaniu."],
        ["Zakup powtarzalny", "Kosmetyki kończą się i kupuje się je ponownie — wysoka wartość życiowa klienta."],
        ["Impuls + marża", "Atrakcyjna cena impulsowa i marża, która udźwignie prowizje twórców i ads."],
        ["Trend wznoszący", "TikTok Shop ruszył w PL w 2025 — to okno first-mover dla Twojej marki."],
      ],
    },
    how: {
      eyebrow: "Jak działamy",
      h2: "Od podpisu do skalowania w 3 fazach",
      sub: "Bierzemy na siebie operacje. Ty dostarczasz produkt i patrzysz na wyniki.",
      phases: [
        ["01", "FAZA 1 · SETUP", "Dobór i konfiguracja", "Analizujemy asortyment i marże, konfigurujemy TikTok Shop, dobieramy twórców beauty z naszej sieci, podpisujemy umowy i spinamy logistykę."],
        ["02", "FAZA 2 · LIVE", "Transmisje, które sprzedają", "Twórcy prowadzą live z demonstracją produktu i mechanikami (flash sale, dropy, Q&A). My obsługujemy zamówienia, pakowanie i wysyłki."],
        ["03", "FAZA 3 · SKALA", "Optymalizacja i wzrost", "Mierzymy GMV i konwersję na twórcę i transmisję, rozliczamy prowizje, rozszerzamy sieć twórców i zwiększamy częstotliwość live."],
      ],
    },
    model: {
      tag: "Model przykładowy",
      h3: "Co potrafi zrobić regularny live dla marki beauty",
      stats: [
        ["8", "transmisji / mies."],
        ["8–12%", "konwersja na live"],
        ["200k+ zł", "GMV / mies. (cel)"],
        ["1 partner", "zero chaosu"],
      ],
      note: "Wartości ilustracyjne, oparte na benchmarkach rynkowych live commerce (konwersja 8–12% vs 1–3% w klasycznym e-commerce; beauty = największa kategoria TikTok Shop). Realny wynik zależy od asortymentu, ceny i częstotliwości transmisji — ustalamy go wspólnie na konsultacji.",
    },
    form: {
      eyebrow: "Bezpłatna konsultacja",
      h2: "Sprawdźmy potencjał Twojej marki na live",
      sub: "Zostaw kontakt — w 24h wrócimy z oceną dopasowania asortymentu i pierwszymi pomysłami na transmisje oraz twórców.",
      bullets: [
        "Konkretna ocena Twoich produktów pod sprzedaż live",
        "Pierwsi twórcy beauty dopasowani do marki",
        "Szacunek GMV i modelu współpracy — bez zobowiązań",
      ],
      guarantee: "Gwarancja startu. Jeśli w 30 dni od setupu nie przeprowadzimy pierwszej transmisji sprzedażowej z dobranym twórcą — pracujemy dalej bez kolejnej opłaty, aż ruszymy.",
      labels: {
        name: "Imię i nazwisko",
        brand: "Marka beauty / skincare",
        email: "E-mail służbowy",
        revenue: "Miesięczny obrót e-commerce",
        revenueOpts: ["do 50 tys. zł", "50–200 tys. zł", "200–500 tys. zł", "powyżej 500 tys. zł"],
        submit: "Umów bezpłatną konsultację",
        sending: "Wysyłam…",
        success: "Dziękujemy! Odezwiemy się w ciągu 24h.",
        error: "Coś poszło nie tak. Spróbuj ponownie lub napisz na hello@jay23.com.",
        consent: "Wysyłając formularz akceptujesz kontakt w sprawie usług click2pack.",
        placeholder: "Wybierz przedział",
      },
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Częste pytania",
      items: [
        ["Czym się różnicie od zwykłej agencji od transmisji?", "Nie produkujemy tylko pojedynczych live. Budujemy sieć twórców beauty i domykamy całość operacyjnie: umowy, towar, wysyłka, prowizje, raport. Jesteśmy Twoim operacyjnym partnerem live, nie tylko produkcją."],
        ["Nie mam doświadczenia z TikTok Shop. To problem?", "Nie. Konfigurujemy konto, integrujemy logistykę i prowadzimy Cię przez cały proces — od zera albo z przejścia z „live na FB”."],
        ["Ile to kosztuje?", "Model hybrydowy: jednorazowy setup + miesięczny retainer + prowizja od wygenerowanego GMV oraz marża na logistyce. Płacisz głównie za wynik. Dokładną wycenę ustalamy na konsultacji."],
        ["Obsługujecie logistykę przy nagłych skokach zamówień?", "Tak — to nasz filar. Współpracujemy z partnerami fulfillment elastycznymi na piki typowe dla live, z obsługą pakowania, wysyłek i zwrotów."],
        ["Czy moja marża udźwignie prowizje twórców?", "Beauty to jedna z najwyżej marżowych kategorii i dlatego wygrywa na live. Na konsultacji policzymy wynik netto po prowizjach platformy i twórców."],
      ],
    },
    footer: {
      tagline: "Live commerce pod klucz dla marek beauty & skincare · Polska & CEE",
      copy: "© 2026 click2pack. Część grupy JAY-23.",
    },
  },
  en: {
    seoTitle: "click2pack — Live commerce for beauty & skincare brands | JAY-23",
    seoDesc:
      "Live commerce agency for beauty and skincare DTC brands. We connect your products with creators selling live on TikTok Shop — and handle creators, contracts, fulfilment and commissions for you.",
    nav: {
      problem: "Problem",
      how: "How we work",
      why: "Why beauty",
      cta: "Free consultation",
    },
    hero: {
      eyebrow: "Live commerce for beauty & skincare",
      h1a: "Your product sold live.",
      h1b: "We handle the rest.",
      sub: "click2pack connects beauty and skincare brands with creators selling live on TikTok Shop — and takes care of creator sourcing, contracts, fulfilment and commission payouts. You watch GMV grow.",
      primary: "Book a free consultation",
      ghost: "See how it works",
      micro: "30 min · no strings · no pitch · we reply within 24h",
      stats: [
        "8–12% conversion from a strong live",
        "#1 category on TikTok Shop",
        "25% of EU shoppers already bought live",
      ],
      loopTitle: "The loop we close for you",
      loop: [
        ["Source creators", "Beauty hosts matched to your range & audience."],
        ["Contracts & rates", "Agreements, commission rates, content rights."],
        ["Live & selling", "Streams with demos and before/after."],
        ["Pack & ship", "Fulfilment ready for live spikes."],
        ["Payouts & report", "Creator commissions + ROI report for you."],
      ],
    },
    band: [
      ["18–22%", "beauty share of TikTok Shop GMV"],
      ["~€70", "avg. live basket value"],
      ["2×", "LIVE vs regular video conversion"],
      ["+791%", "beauty live growth (YoY)"],
    ],
    problem: {
      eyebrow: "The full-warehouse trap",
      h2: "Great product. Nobody sees it live.",
      sub: "Beauty brands have everything except one thing — presence where the buying decision actually happens today: inside a live stream.",
      cards: [
        ["No creators", "You don't have access to hosts who can sell a serum or cream live and have engaged audiences."],
        ["No operations", "Contracts, commission rates, content rights, GDPR — every collaboration becomes hours of admin instead of sales."],
        ["Fear of logistics", "A successful live means a sudden order spike. Without ready fulfilment, success turns into chaos and late shipments."],
      ],
      closing: "The product is ready. What's missing is the stage and the ops — that's what we run.",
    },
    compare: {
      eyebrow: "Two paths",
      h2: "Same product. Different order of operations.",
      leftTitle: "Without click2pack",
      left: [
        "You source and negotiate with creators yourself",
        "One-off, irregular streams with no system",
        "Manual commission tracking in a spreadsheet",
        "Logistics breaks under live order spikes",
        "No data: you don't know what actually sells",
      ],
      leftResult: "→ A lot of work, unstable results",
      rightTitle: "With click2pack",
      right: [
        "A vetted network of beauty creators on tap",
        "A regular calendar of streams that convert",
        "Automated commission tracking and payouts",
        "Fulfilment that scales with live spikes",
        "Monthly GMV, conversion and ROI report",
      ],
      rightResult: "→ A scalable, predictable sales channel",
    },
    why: {
      eyebrow: "Why beauty wins on live",
      h2: "A category built for live selling",
      sub: "Beauty is the largest and fastest-growing live commerce category today — and not by accident.",
      cards: [
        ["Live demos", "Swatches, textures, before/after — the product sells when people see it in action."],
        ["Repeat purchase", "Cosmetics run out and get repurchased — high customer lifetime value."],
        ["Impulse + margin", "Attractive impulse price and margin that supports creator commissions and ads."],
        ["Tailwind trend", "TikTok Shop went live in PL in 2025 — a first-mover window for your brand."],
      ],
    },
    how: {
      eyebrow: "How we work",
      h2: "From signature to scale in 3 phases",
      sub: "We take on operations. You deliver the product and watch the results.",
      phases: [
        ["01", "PHASE 1 · SETUP", "Sourcing & configuration", "We analyse your range and margins, configure TikTok Shop, match beauty creators from our network, sign contracts and wire up logistics."],
        ["02", "PHASE 2 · LIVE", "Streams that sell", "Creators run live with product demos and mechanics (flash sales, drops, Q&A). We handle orders, packing and shipping."],
        ["03", "PHASE 3 · SCALE", "Optimisation & growth", "We measure GMV and conversion per creator and stream, settle commissions, expand the creator network and increase live frequency."],
      ],
    },
    model: {
      tag: "Sample model",
      h3: "What regular live can do for a beauty brand",
      stats: [
        ["8", "streams / month"],
        ["8–12%", "live conversion"],
        ["€45k+", "GMV / month (target)"],
        ["1 partner", "zero chaos"],
      ],
      note: "Illustrative figures based on live commerce market benchmarks (8–12% conversion vs 1–3% in classic e-commerce; beauty = #1 TikTok Shop category). Real results depend on range, price and stream frequency — we'll align on them in the consultation.",
    },
    form: {
      eyebrow: "Free consultation",
      h2: "Let's check your brand's live potential",
      sub: "Leave your contact — within 24h we'll come back with a fit assessment of your range and first ideas for streams and creators.",
      bullets: [
        "Concrete assessment of your products for live selling",
        "First beauty creators matched to your brand",
        "GMV and collaboration model estimate — no strings",
      ],
      guarantee: "Launch guarantee. If we don't run the first sales stream with a matched creator within 30 days of setup — we keep working at no extra fee until we do.",
      labels: {
        name: "Full name",
        brand: "Beauty / skincare brand",
        email: "Work email",
        revenue: "Monthly e-commerce revenue",
        revenueOpts: ["under €10k", "€10k–€50k", "€50k–€120k", "over €120k"],
        submit: "Book my free consultation",
        sending: "Sending…",
        success: "Thanks! We'll be in touch within 24h.",
        error: "Something went wrong. Try again or email hello@jay23.com.",
        consent: "By submitting this form you agree to be contacted about click2pack services.",
        placeholder: "Choose a range",
      },
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Common questions",
      items: [
        ["How are you different from a regular live-streaming agency?", "We don't just produce one-off streams. We build a beauty creator network and close the loop operationally: contracts, stock, shipping, commissions, reporting. We're your live operations partner, not just production."],
        ["I have no TikTok Shop experience. Is that a problem?", "No. We configure the account, integrate logistics and walk you through the whole process — from scratch or migrating from “FB Lives”."],
        ["How much does it cost?", "Hybrid model: one-off setup + monthly retainer + commission on generated GMV plus logistics margin. You pay mostly for results. We confirm exact pricing in the consultation."],
        ["Do you handle logistics during sudden order spikes?", "Yes — it's a core pillar. We work with fulfilment partners that scale for live-typical peaks, including packing, shipping and returns."],
        ["Will my margin support creator commissions?", "Beauty is one of the highest-margin categories, which is exactly why it wins on live. In the consultation we'll model net result after platform and creator commissions."],
      ],
    },
    footer: {
      tagline: "Turnkey live commerce for beauty & skincare brands · Poland & CEE",
      copy: "© 2026 click2pack. Part of the JAY-23 group.",
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Click2Pack = () => {
  const { lang, langPrefix } = useLanguage();
  const c = COPY[lang];

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#0B0B0F]">
      <Helmet>
        <html lang={lang} />
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDesc} />
        <link rel="canonical" href={`https://jay23.com${langPrefix}/click2pack`} />
        <link rel="alternate" hrefLang="pl" href="https://jay23.com/pl/click2pack" />
        <link rel="alternate" hrefLang="en" href="https://jay23.com/en/click2pack" />
        <link rel="alternate" hrefLang="x-default" href="https://jay23.com/en/click2pack" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={c.seoTitle} />
        <meta property="og:description" content={c.seoDesc} />
        <meta property="og:url" content={`https://jay23.com${langPrefix}/click2pack`} />
        <meta property="og:locale" content={lang === "pl" ? "pl_PL" : "en_US"} />
        <meta property="og:locale:alternate" content={lang === "pl" ? "en_US" : "pl_PL"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={c.seoTitle} />
        <meta name="twitter:description" content={c.seoDesc} />
      </Helmet>

      <C2PNav nav={c.nav} langPrefix={langPrefix} />
      <Hero c={c.hero} />
      <StatBand items={c.band} />
      <ProblemSection c={c.problem} />
      <CompareSection c={c.compare} />
      <WhySection c={c.why} />
      <HowSection c={c.how} />
      <ModelSection c={c.model} />
      <LeadForm c={c.form} lang={lang} />
      <FAQ c={c.faq} />
      <C2PFooter c={c.footer} />
    </div>
  );
};

/* ─── Brand mark ───────────────────────────────────────────────────────── */
const Logo = ({ light = false }: { light?: boolean }) => (
  <span
    className={`font-display font-bold text-xl tracking-tight ${
      light ? "text-white" : "text-[#0B0B0F]"
    }`}
  >
    click<span className="text-emerald-500">2</span>pack
  </span>
);

/* ─── Navigation ───────────────────────────────────────────────────────── */
const C2PNav = ({
  nav,
  langPrefix,
}: {
  nav: typeof COPY.pl.nav;
  langPrefix: string;
}) => (
  <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A12]/85 border-b border-white/5">
    <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-6">
      <a href="#top" className="flex items-center">
        <Logo light />
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
        <a href="#problem" className="hover:text-white transition-colors">{nav.problem}</a>
        <a href="#jak" className="hover:text-white transition-colors">{nav.how}</a>
        <a href="#dlaczego" className="hover:text-white transition-colors">{nav.why}</a>
      </nav>
      <div className="flex items-center gap-3">
        <Link
          to={langPrefix}
          className="hidden sm:inline text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          ← jay23.com
        </Link>
        <a
          href="#kontakt"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          {nav.cta} <ArrowRight size={14} />
        </a>
      </div>
    </div>
  </header>
);

/* ─── Hero ─────────────────────────────────────────────────────────────── */
const Hero = ({ c }: { c: typeof COPY.pl.hero }) => (
  <section
    id="top"
    className="relative overflow-hidden text-white"
    style={{ background: "linear-gradient(135deg, #0A0A12 0%, #110029 100%)" }}
  >
    <div
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 50% at 80% 0%, rgba(103,61,255,0.35) 0%, transparent 60%), radial-gradient(40% 40% at 10% 100%, rgba(16,185,129,0.25) 0%, transparent 70%)",
      }}
    />
    <div className="relative container mx-auto max-w-6xl px-6 py-20 lg:py-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400 mb-5">
          {c.eyebrow}
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
          <span className="text-emerald-400">{c.h1a}</span>{" "}
          <span className="text-[#A78BFA]">{c.h1b}</span>
        </h1>
        <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">{c.sub}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)]"
          >
            {c.primary} <ArrowRight size={16} />
          </a>
          <a
            href="#jak"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white px-6 py-3.5 rounded-xl transition-colors"
          >
            {c.ghost}
          </a>
        </div>
        <p className="mt-4 text-xs text-white/40">{c.micro}</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          {c.stats.map((s, i) => (
            <div key={i} className="text-sm text-white/60 leading-snug">
              <span className="font-display text-emerald-400 text-base font-semibold block mb-1">
                {s.split(" ")[0]}
              </span>
              {s.split(" ").slice(1).join(" ")}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.15 }}
        className="relative"
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-5 font-semibold">
            {c.loopTitle}
          </p>
          <ol className="space-y-4">
            {c.loop.map(([title, desc], i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #10B981 0%, #673DFF 100%)",
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Stat band ────────────────────────────────────────────────────────── */
const StatBand = ({ items }: { items: readonly (readonly [string, string])[] }) => (
  <section className="bg-[#0A0A12] text-white border-t border-white/5">
    <div className="container mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map(([num, label], i) => (
        <div key={i}>
          <div className="font-display font-bold text-3xl md:text-4xl text-emerald-400 tracking-tight">
            {num}
          </div>
          <p className="text-white/55 text-sm mt-1 leading-snug">{label}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Problem ──────────────────────────────────────────────────────────── */
const ProblemSection = ({ c }: { c: typeof COPY.pl.problem }) => (
  <section id="problem" className="bg-[#0d0710] text-white py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} eyebrowColor="text-red-400" h2={c.h2} sub={c.sub} dark />
      <div className="grid md:grid-cols-3 gap-5 mt-12">
        {c.cards.map(([title, desc], i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-red-500/30 bg-red-500/[0.05] p-7"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/20 text-red-400 mb-4">
              <X size={18} strokeWidth={2.5} />
            </span>
            <h3 className="font-display text-xl font-bold mb-2 normal-case tracking-tight">
              {title}
            </h3>
            <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-12 text-center font-display text-xl md:text-2xl text-white normal-case tracking-tight">
        <span className="text-emerald-400">{c.closing}</span>
      </p>
    </div>
  </section>
);

/* ─── Before / After ───────────────────────────────────────────────────── */
const CompareSection = ({ c }: { c: typeof COPY.pl.compare }) => (
  <section className="bg-[#F6F6F9] text-[#0B0B0F] py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.h2} />
      <div className="grid md:grid-cols-2 gap-5 mt-12">
        <div className="rounded-2xl border border-[#E7E8EF] bg-white p-7">
          <h3 className="font-display text-xl font-bold mb-5 normal-case tracking-tight text-red-600">
            {c.leftTitle}
          </h3>
          <ul className="space-y-3">
            {c.left.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#0B0B0F]/75">
                <X size={18} className="shrink-0 text-red-500 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 pt-5 border-t border-[#E7E8EF] font-semibold text-red-600 text-sm">
            {c.leftResult}
          </p>
        </div>
        <div
          className="rounded-2xl p-7 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0A0A12 0%, #110029 100%)" }}
        >
          <h3 className="font-display text-xl font-bold mb-5 normal-case tracking-tight text-emerald-400">
            {c.rightTitle}
          </h3>
          <ul className="space-y-3">
            {c.right.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/80">
                <Check size={18} className="shrink-0 text-emerald-400 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 pt-5 border-t border-white/10 font-semibold text-emerald-400 text-sm">
            {c.rightResult}
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Why beauty ───────────────────────────────────────────────────────── */
const WhySection = ({ c }: { c: typeof COPY.pl.why }) => {
  const icons = [Sparkles, Repeat, Zap, TrendingUp];
  return (
    <section id="dlaczego" className="bg-white text-[#0B0B0F] py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={c.eyebrow} eyebrowColor="text-[#673DFF]" h2={c.h2} sub={c.sub} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {c.cards.map(([title, desc], i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-[#E7E8EF] bg-[#F6F6F9] p-6 hover:border-[#673DFF]/30 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#673DFF]/10 text-[#673DFF] mb-4">
                  <Icon size={18} />
                </span>
                <h3 className="font-display text-base font-bold mb-2 normal-case tracking-tight">
                  {title}
                </h3>
                <p className="text-sm text-[#0B0B0F]/65 leading-relaxed">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── How we work ──────────────────────────────────────────────────────── */
const HowSection = ({ c }: { c: typeof COPY.pl.how }) => (
  <section id="jak" className="bg-[#0A0A12] text-white py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.h2} sub={c.sub} dark />
      <div className="mt-14 space-y-5">
        {c.phases.map(([num, tag, title, desc], i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start overflow-hidden"
          >
            <div className="font-display font-bold text-7xl md:text-8xl text-white/[0.07] leading-none tracking-tight">
              {num}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-400 mb-2">{tag}</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 normal-case tracking-tight">
                {title}
              </h3>
              <p className="text-white/65 text-base leading-relaxed max-w-3xl">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Sample model ─────────────────────────────────────────────────────── */
const ModelSection = ({ c }: { c: typeof COPY.pl.model }) => (
  <section className="bg-[#0A0A12] py-12 md:py-16">
    <div className="container mx-auto max-w-6xl px-6">
      <div
        className="rounded-3xl p-8 md:p-12 text-white relative overflow-hidden border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(103,61,255,0.18) 100%), #110029",
        }}
      >
        <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400 mb-3">
          {c.tag}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold normal-case tracking-tight max-w-2xl">
          {c.h3}
        </h3>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {c.stats.map(([num, label], i) => (
            <div key={i}>
              <div
                className={`font-display font-bold text-3xl md:text-4xl tracking-tight ${
                  i >= 2 ? "text-[#A78BFA]" : "text-emerald-400"
                }`}
              >
                {num}
              </div>
              <p className="text-white/60 text-sm mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-white/45 leading-relaxed max-w-3xl">{c.note}</p>
      </div>
    </div>
  </section>
);

/* ─── Lead form ────────────────────────────────────────────────────────── */
const LeadForm = ({
  c,
  lang,
}: {
  c: typeof COPY.pl.form;
  lang: "pl" | "en";
}) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    email: "",
    revenue: "",
    company: "", // honeypot
  });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return; // honeypot tripped
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const { error } = await supabase.from("click2pack_leads" as never).insert({
        name: form.name.trim().slice(0, 200),
        brand: form.brand.trim().slice(0, 200) || null,
        email: form.email.trim().slice(0, 320),
        monthly_revenue: form.revenue || null,
        lang,
        source: "click2pack-landing",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
        referrer: typeof document !== "undefined" ? document.referrer.slice(0, 500) : null,
      } as never);
      if (error) throw error;
      setState("success");
      setForm({ name: "", brand: "", email: "", revenue: "", company: "" });
    } catch (err) {
      console.error("click2pack lead submit", err);
      setState("error");
    }
  };

  return (
    <section
      id="kontakt"
      className="relative py-20 md:py-28 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #064E3B 0%, #10B981 50%, #0EA371 100%)",
      }}
    >
      <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-white/80 mb-4">
            {c.eyebrow}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl normal-case tracking-tight leading-tight">
            {c.h2}
          </h2>
          <p className="mt-4 text-white/85 text-lg leading-relaxed max-w-lg">{c.sub}</p>
          <ul className="mt-8 space-y-3">
            {c.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-white/90 text-sm">
                <ArrowRight size={16} className="shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-white/25 bg-white/10 backdrop-blur-sm p-5 flex gap-3">
            <ShieldCheck size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm text-white/90 leading-relaxed">{c.guarantee}</p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white text-[#0B0B0F] rounded-2xl p-7 md:p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] space-y-4"
        >
          <Field label={c.labels.name} required>
            <input
              type="text"
              required
              maxLength={200}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E7E8EF] bg-[#F6F6F9] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition"
            />
          </Field>
          <Field label={c.labels.brand}>
            <input
              type="text"
              maxLength={200}
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E7E8EF] bg-[#F6F6F9] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition"
            />
          </Field>
          <Field label={c.labels.email} required>
            <input
              type="email"
              required
              maxLength={320}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E7E8EF] bg-[#F6F6F9] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition"
            />
          </Field>
          <Field label={c.labels.revenue}>
            <select
              value={form.revenue}
              onChange={(e) => setForm({ ...form, revenue: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E7E8EF] bg-[#F6F6F9] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition"
            >
              <option value="">{c.labels.placeholder}</option>
              {c.labels.revenueOpts.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>

          {/* honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="hidden"
            aria-hidden="true"
          />

          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            {state === "loading" ? c.labels.sending : c.labels.submit}{" "}
            {state !== "loading" && <ArrowRight size={16} />}
          </button>

          {state === "success" && (
            <p className="text-sm text-emerald-600 font-medium text-center">{c.labels.success}</p>
          )}
          {state === "error" && (
            <p className="text-sm text-red-600 font-medium text-center">{c.labels.error}</p>
          )}

          <p className="text-[11px] text-[#0B0B0F]/55 text-center leading-relaxed">
            {c.labels.consent}
          </p>
        </form>
      </div>
    </section>
  );
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="text-xs font-semibold text-[#0B0B0F]/70 uppercase tracking-wide mb-1.5 inline-block">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </span>
    {children}
  </label>
);

/* ─── FAQ ──────────────────────────────────────────────────────────────── */
const FAQ = ({ c }: { c: typeof COPY.pl.faq }) => (
  <section className="bg-[#F6F6F9] text-[#0B0B0F] py-20 md:py-28">
    <div className="container mx-auto max-w-3xl px-6">
      <SectionHeader eyebrow={c.eyebrow} eyebrowColor="text-[#673DFF]" h2={c.h2} center />
      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {c.items.map(([q, a], i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-[#E7E8EF] rounded-2xl bg-white px-5 data-[state=open]:border-emerald-500/40"
          >
            <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5 normal-case">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#0B0B0F]/70 leading-relaxed pb-5">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

/* ─── Footer ───────────────────────────────────────────────────────────── */
const C2PFooter = ({ c }: { c: typeof COPY.pl.footer }) => (
  <footer className="bg-[#0A0A12] text-white/70 py-12">
    <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <Logo light />
        <p className="text-xs text-white/50 mt-2">{c.tagline}</p>
      </div>
      <p className="text-xs text-white/40">{c.copy}</p>
    </div>
  </footer>
);

/* ─── Shared section header ────────────────────────────────────────────── */
const SectionHeader = ({
  eyebrow,
  eyebrowColor = "text-emerald-500",
  h2,
  sub,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  eyebrowColor?: string;
  h2: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) => (
  <div className={center ? "text-center" : "max-w-3xl"}>
    <span
      className={`inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3 ${eyebrowColor}`}
    >
      {eyebrow}
    </span>
    <h2
      className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl normal-case tracking-tight leading-[1.1] ${
        dark ? "text-white" : "text-[#0B0B0F]"
      }`}
    >
      {h2}
    </h2>
    {sub && (
      <p
        className={`mt-4 text-base md:text-lg leading-relaxed ${
          dark ? "text-white/65" : "text-[#0B0B0F]/65"
        }`}
      >
        {sub}
      </p>
    )}
  </div>
);

export default Click2Pack;
