import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Users, ArrowRight, Copy, Check, RotateCcw } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";

interface ReportData {
  answers: Record<string, string>;
  answerKeys: Record<string, string>;
  mvaResult: number;
  userName: string;
  userEmail: string;
}

const stepLabels: Record<string, string> = {
  product: "Typ produktu",
  revenue: "Docelowy przychód",
  price: "Poziom cenowy",
  niche: "Specyfika niszy",
  uvp: "Unikalna wartość",
  targetAudience: "Grupa docelowa",
  currentAudience: "Obecna publiczność",
  stage: "Etap rozwoju",
};

const stepOrder = ["product", "revenue", "price", "niche", "uvp", "targetAudience", "currentAudience", "stage"];

function getMvaAssessment(mva: number) {
  if (mva < 200) return { label: "Bardzo osiągalne", color: "hsl(142 71% 45%)", text: "Twoje MVA jest realistyczne do osiągnięcia w 60-90 dni przy konsekwentnej strategii content marketingu." };
  if (mva <= 500) return { label: "Osiągalne", color: "hsl(80 60% 45%)", text: "Potrzebujesz solidnej strategii i 3-6 miesięcy konsekwentnej pracy, ale cel jest realistyczny." };
  if (mva <= 1500) return { label: "Wymagające", color: "hsl(45 93% 47%)", text: "Budowa publiczności tej wielkości wymaga przemyślanej strategii wielokanałowej i minimum 6 miesięcy." };
  return { label: "Ambitne", color: "hsl(25 95% 53%)", text: "To ambitny cel. Rozważ zwiększenie ceny lub zawężenie niszy, aby zmniejszyć wymagane MVA." };
}

function getTamAnalysis(target: string, niche: string, mva: number) {
  const tamMap: Record<string, Record<string, { tam: number; text: string }>> = {
    solopreneurs: {
      "Broad market": { tam: 3500000, text: "Szacunkowy TAM: 2-5M osób w Polsce." },
      "Mid niche": { tam: 500000, text: "Szacunkowy TAM: 200K-800K osób." },
      "Highly specific niche": { tam: 60000, text: "Szacunkowy TAM: 20K-100K osób. Przy tak niszowym rynku wymaga precyzyjnego targetowania." },
    },
    small_business: {
      "Broad market": { tam: 1000000, text: "Szacunkowy TAM: 500K-1.5M firm w Polsce." },
      "Mid niche": { tam: 200000, text: "Szacunkowy TAM: 100K-300K firm." },
      "Highly specific niche": { tam: 30000, text: "Szacunkowy TAM: 10K-50K firm. Precyzyjne targetowanie jest kluczowe." },
    },
    medium_business: {
      "Broad market": { tam: 300000, text: "Szacunkowy TAM: 150K-500K firm." },
      "Mid niche": { tam: 80000, text: "Szacunkowy TAM: 40K-120K firm." },
      "Highly specific niche": { tam: 15000, text: "Szacunkowy TAM: 5K-25K firm." },
    },
    enterprise: {
      "Broad market": { tam: 50000, text: "Szacunkowy TAM: 20K-80K dużych firm." },
      "Mid niche": { tam: 10000, text: "Szacunkowy TAM: 5K-15K firm." },
      "Highly specific niche": { tam: 3000, text: "Szacunkowy TAM: 1K-5K firm. ABM (Account Based Marketing) będzie kluczowy." },
    },
    b2c_consumers: {
      "Broad market": { tam: 10000000, text: "Szacunkowy TAM: 5-15M konsumentów." },
      "Mid niche": { tam: 2000000, text: "Szacunkowy TAM: 1-3M konsumentów." },
      "Highly specific niche": { tam: 200000, text: "Szacunkowy TAM: 100K-300K konsumentów." },
    },
  };

  const entry = tamMap[target]?.[niche] || { tam: 500000, text: "Szacunkowy TAM: trudny do oszacowania bez dodatkowych danych." };
  const pct = ((mva / entry.tam) * 100).toFixed(2);
  return `${entry.text} Twoje MVA (${mva.toLocaleString()}) to zaledwie ${pct}% tego rynku.`;
}

function getUvpInsight(uvp: string) {
  const map: Record<string, string> = {
    lowest_price: "Strategia najniższej ceny wymaga dużego wolumenu. Musisz dotrzeć do szerokiej publiczności szybko. Rekomendacja: kampanie performance marketing + content porównawczy (vs konkurencja).",
    premium_quality: "Strategia premium pozwala na mniejsze MVA, ale wymaga silnego social proof. Rekomendacja: case studies, testimoniale, content edukacyjny budujący autorytet.",
    unique_tech: "Innowacyjny produkt wymaga edukacji rynku. Rekomendacja: content typu 'problem-solution', webinary demo, partnerstwa z influencerami technicznymi.",
    best_service: "Obsługa jako wyróżnik = lojalność i referrale. Rekomendacja: buduj społeczność wokół produktu, program referralowy, content o customer success.",
    niche_solution: "Niszowe rozwiązanie = precyzyjne targetowanie. Rekomendacja: SEO na long-tail keywords, grupy branżowe, content ekspercki w niszowych mediach.",
  };
  return map[uvp] || "Zdefiniuj swoją unikalną wartość, aby lepiej targetować komunikację.";
}

function getStrategyInsight(stage: string, audience: string, mva: number) {
  const key = `${stage}_${audience}`;
  const strategies: Record<string, string> = {
    idea_starting: `Jesteś na samym początku — idealne miejsce na budowanie publiczności PRZED produktem. Zacznij od waitlist landinga, codziennego contentu na LinkedIn, i budowania email listy. Cel na 90 dni: ${Math.min(mva, 500)} osób na liście.`,
    idea_early: "Masz pierwszy zalążek publiczności. Wykorzystaj go do walidacji pomysłu — ankiety, rozmowy 1:1, testy koncepcji.",
    mvp_starting: "Masz prototyp, ale brak publiczności. Priorytet: walidacja + budowanie listy jednocześnie. Beta testing z early adopterami, build-in-public content.",
    mvp_early: "Dobry start. Masz 100-500 osób — wykorzystaj ich do walidacji MVP. Ankiety, wywiady z odbiorcami, iteracja produktu na żywo.",
    mvp_growing: "MVP + rosnąca baza to silna pozycja. Czas na feedback loop: zbieraj opinie, iteruj, buduj case studies z early users.",
    launched_starting: "Masz produkt na rynku, ale brakuje publiczności. Priorytet: content marketing, SEO, partnerstwa strategiczne.",
    launched_growing: "Masz produkt i rosnącą bazę. Czas skalować. Optymalizacja lejka, paid ads, content marketing na skalę.",
    launched_solid: "Solidna pozycja. Skup się na konwersji istniejącej bazy i referralach.",
    early_customers_growing: "Masz traction! Teraz potrzebujesz systemu do skalowania. Referral program, partnerstwa strategiczne, SEO.",
    early_customers_solid: `Masz traction i solidną bazę! Potrzebujesz systemu do skalowania do ${mva.toLocaleString()}. Referral program, partnerstwa strategiczne, SEO.`,
    scaling_solid: "Skalujesz z solidną bazą. Optymalizuj unit economics, testuj nowe kanały, buduj zespół content marketingowy.",
    scaling_large: "Masz dużą publiczność i skalujesz produkt. Skup się na retencji, LTV i ekspansji na nowe segmenty.",
  };
  return strategies[key] || `Na Twoim etapie rozwoju kluczowe jest systematyczne budowanie publiczności. Cel: dotrzeć do ${mva.toLocaleString()} osób w Twojej niszy poprzez content marketing i community building.`;
}

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const Report = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [data, setData] = useState<ReportData | null>(null);
  const [copied, setCopied] = useState(false);
  const [countUp, setCountUp] = useState(0);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("mva-report-data");
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {
        setData(null);
      }
    }
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!data?.mvaResult) return;
    const target = data.mvaResult;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    countRef.current = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCountUp(target);
        if (countRef.current) clearInterval(countRef.current);
      } else {
        setCountUp(Math.floor(current));
      }
    }, duration / steps);
    return () => { if (countRef.current) clearInterval(countRef.current); };
  }, [data?.mvaResult]);

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) {
    return (
      <>
        <SEOHead title="Raport MVA — JAY23" description="Spersonalizowany raport Minimum Viable Audience." noindex />
        <MvaNavbar />
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-2xl font-bold mb-4">Nie znaleziono danych quizu</h1>
            <p className="text-muted-foreground mb-6">Wypełnij quiz MVA, aby zobaczyć swój raport.</p>
            <button
              onClick={() => navigate(`/${lang}?quiz=open`)}
              className="bg-primary text-primary-foreground px-8 py-3 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              Przejdź do quizu <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <FooterSection />
      </>
    );
  }

  const { answers, answerKeys, mvaResult, userName } = data;
  const assessment = getMvaAssessment(mvaResult);
  const tamText = getTamAnalysis(answerKeys.targetAudience || "solopreneurs", answerKeys.niche || "Broad market", mvaResult);
  const uvpText = getUvpInsight(answerKeys.uvp || "");
  const strategyText = getStrategyInsight(answerKeys.stage || "idea", answerKeys.currentAudience || "starting", mvaResult);

  return (
    <>
      <SEOHead title="Twoja Analiza MVA — JAY23" description="Spersonalizowany raport Minimum Viable Audience. Sprawdź, ile osób potrzebujesz w swojej publiczności." noindex />
      <MvaNavbar />
      <main className="min-h-screen bg-background py-16 px-6">
        <div className="container mx-auto max-w-[800px]">

          {/* Section 1: Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">Twoja Analiza MVA</h1>
            <p className="text-muted-foreground mb-2">Pełna analiza Minimum Viable Audience dla Twojego produktu</p>
            <p className="text-primary font-semibold">Raport dla: {userName}</p>
            <p className="text-xs text-muted-foreground mt-1">Wygenerowano: {new Date().toLocaleDateString("pl-PL")}</p>
          </motion.div>

          {/* Section 2: MVA Result Hero */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-card p-8 border mb-10 text-center"
            style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(253 100% 62%)" }}>
            <Users className="text-primary mx-auto mb-3" size={32} />
            <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-2">MINIMUM VIABLE AUDIENCE</p>
            <p className="font-display text-6xl md:text-7xl font-extrabold text-primary mb-2">
              {countUp.toLocaleString()}
            </p>
            <p className="text-muted-foreground">osób potrzebnych w Twojej publiczności</p>
          </motion.div>

          {/* Section 3: Answers Grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mb-10">
            <h2 className="font-display text-xl font-bold mb-4">Podsumowanie Twoich wyborów</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stepOrder.map((key) => (
                <div key={key} className="rounded-card p-4 border" style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)" }}>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "hsl(265 30% 55%)" }}>{stepLabels[key]}</p>
                  <p className="text-sm font-semibold" style={{ color: "hsl(0 0% 95%)" }}>{answers[key] || "—"}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 4a: Assessment */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-card p-6 border mb-6" style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)" }}>
            <h2 className="font-display text-xl font-bold mb-3" style={{ color: "hsl(0 0% 95%)" }}>Ocena Twojego MVA</h2>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: assessment.color, color: "#fff" }}>
              {assessment.label}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(265 20% 75%)" }}>{assessment.text}</p>
          </motion.div>

          {/* Section 4b: TAM */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="rounded-card p-6 border mb-6" style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)" }}>
            <h2 className="font-display text-xl font-bold mb-3">Analiza Twojego rynku (TAM)</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{tamText}</p>
          </motion.div>

          {/* Section 4c: UVP */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-card p-6 border mb-6" style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)" }}>
            <h2 className="font-display text-xl font-bold mb-3">Twoja przewaga konkurencyjna</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{uvpText}</p>
          </motion.div>

          {/* Section 4d: Strategy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
            className="rounded-card p-6 border mb-10" style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)" }}>
            <h2 className="font-display text-xl font-bold mb-3">Rekomendowana strategia startu</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{strategyText}</p>
          </motion.div>

          {/* Section 5: Calendly CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
            className="rounded-card p-8 border mb-10" style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(253 100% 62%)" }}>
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-2">Chcesz spersonalizowaną strategię budowania Twojego MVA?</h2>
              <p className="text-muted-foreground text-sm">Umów się na bezpłatną 30-minutową konsultację strategiczną z ekspertem JAY23.</p>
            </div>
            <div className="bg-background rounded-card p-2">
              <div
                className="calendly-inline-widget"
                data-url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0B0B0F&text_color=F6F6FA&primary_color=6C5CE7`}
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
          </motion.div>

          {/* Section 6: Footer actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="text-center">
            <p className="text-xs text-muted-foreground mb-4">Ten raport został wygenerowany przez kalkulator MVA na jay23.com</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate(`/${lang}?quiz=open`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-button hover:brightness-110 transition-all"
              >
                <RotateCcw size={16} /> Przelicz ponownie
              </button>
              <button
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold text-sm rounded-button hover:bg-accent transition-all"
              >
                {copied ? <><Check size={16} /> Skopiowano!</> : <><Copy size={16} /> Udostępnij raport</>}
              </button>
            </div>
          </motion.div>

        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default Report;
