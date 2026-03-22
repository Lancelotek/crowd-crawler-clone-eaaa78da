import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Users, Loader2, Mail, DollarSign, Star, Rocket, Handshake, Target, User, UsersRound, Building2, Landmark, ShoppingCart, Sprout, Leaf, TreePine, Trees, Mountain, Lightbulb, Wrench, Package, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/tracking";

// Step definitions
interface QuizStep {
  key: string;
  label: Record<string, string>;
  subtitle?: Record<string, string>;
  options: {
    en: string[];
    pl: string[];
    keys: string[];
    icons?: LucideIcon[];
  };
}

const quizSteps: QuizStep[] = [
  {
    key: "product",
    label: { en: "Product Type", pl: "Typ produktu" },
    subtitle: { en: "Choose the category closest to your product", pl: "Wybierz kategorię najbliższą Twojemu produktowi" },
    options: {
      en: ["SaaS / Software", "Course", "Digital Product", "Physical Product", "Community", "Service"],
      pl: ["SaaS / Oprogramowanie", "Kurs online", "Produkt cyfrowy", "Produkt fizyczny", "Społeczność", "Usługa"],
      keys: ["SaaS / Software", "Course", "Digital Product", "Physical Product", "Community", "Service"],
    },
  },
  {
    key: "revenue",
    label: { en: "Target Monthly Revenue", pl: "Docelowy miesięczny przychód" },
    subtitle: { en: "How much do you want to earn monthly?", pl: "Ile chcesz zarabiać miesięcznie?" },
    options: {
      en: ["$1k", "$5k", "$10k", "$25k", "$50k+"],
      pl: ["$1k", "$5k", "$10k", "$25k", "$50k+"],
      keys: ["$1k", "$5k", "$10k", "$25k", "$50k+"],
    },
  },
  {
    key: "price",
    label: { en: "Price Point", pl: "Poziom cenowy" },
    subtitle: { en: "What's your product price range?", pl: "W jakim przedziale cenowym jest Twój produkt?" },
    options: {
      en: ["$20–49", "$50–199", "$200–999", "$1000+"],
      pl: ["$20–49", "$50–199", "$200–999", "$1000+"],
      keys: ["$20–49", "$50–199", "$200–999", "$1000+"],
    },
  },
  {
    key: "niche",
    label: { en: "Niche Specificity", pl: "Specyfika niszy" },
    subtitle: { en: "How narrow is your market niche?", pl: "Jak wąska jest Twoja nisza rynkowa?" },
    options: {
      en: ["Broad market", "Mid niche", "Highly specific niche"],
      pl: ["Szeroki rynek", "Średnia nisza", "Bardzo specyficzna nisza"],
      keys: ["Broad market", "Mid niche", "Highly specific niche"],
    },
  },
  {
    key: "uvp",
    label: { en: "Unique Value (UVP)", pl: "Unikalna wartość (UVP)" },
    subtitle: { en: "What sets your product apart?", pl: "Co wyróżnia Twój produkt na tle konkurencji?" },
    options: {
      en: ["Lowest price", "Premium quality", "Unique technology", "Best customer service", "Niche problem solution"],
      pl: ["Najniższa cena na rynku", "Najwyższa jakość / premium", "Unikalna technologia / innowacja", "Najlepsza obsługa klienta", "Rozwiązanie niszowego problemu"],
      keys: ["lowest_price", "premium_quality", "unique_tech", "best_service", "niche_solution"],
      emojis: ["💰", "⭐", "🚀", "🤝", "🎯"],
    },
  },
  {
    key: "targetAudience",
    label: { en: "Target Audience", pl: "Grupa docelowa" },
    subtitle: { en: "Who is your ideal customer?", pl: "Kim jest Twój idealny klient?" },
    options: {
      en: ["Solopreneurs / freelancers", "Small businesses (2–10)", "Medium businesses (11–50)", "Large companies (50+)", "Individual consumers (B2C)"],
      pl: ["Solopreneurzy / freelancerzy", "Małe firmy (2–10 osób)", "Średnie firmy (11–50 osób)", "Duże firmy / korporacje (50+)", "Konsumenci indywidualni (B2C)"],
      keys: ["solopreneurs", "small_business", "medium_business", "enterprise", "b2c_consumers"],
      emojis: ["👤", "👥", "🏢", "🏛️", "🛒"],
    },
  },
  {
    key: "currentAudience",
    label: { en: "Current Audience", pl: "Obecna publiczność" },
    subtitle: { en: "What's your current reach?", pl: "Jaki jest Twój obecny zasięg (email + social media łącznie)?" },
    options: {
      en: ["Starting from zero (0–100)", "Early start (100–500)", "Growing base (500–2,000)", "Solid base (2,000–10,000)", "Large audience (10,000+)"],
      pl: ["Zaczynam od zera (0–100)", "Mam początek (100–500)", "Rosnąca baza (500–2 000)", "Solidna baza (2 000–10 000)", "Duża publiczność (10 000+)"],
      keys: ["starting", "early", "growing", "solid", "large"],
      emojis: ["🌱", "🌿", "🌳", "🌲", "🏔️"],
    },
  },
  {
    key: "stage",
    label: { en: "Development Stage", pl: "Etap rozwoju produktu" },
    subtitle: { en: "Where is your product at?", pl: "Na jakim etapie jest Twój produkt?" },
    options: {
      en: ["Idea / validation", "MVP / early prototype", "First product on market", "Product with first customers", "Scaling existing product"],
      pl: ["Pomysł / walidacja", "MVP / wczesny prototyp", "Pierwszy produkt na rynku", "Produkt z pierwszymi klientami", "Skalowanie istniejącego produktu"],
      keys: ["idea", "mvp", "launched", "early_customers", "scaling"],
      emojis: ["💡", "🔧", "📦", "📈", "🚀"],
    },
  },
];

// EN version uses only first 4 steps
const EN_STEPS = 4;

const revenueValues: Record<string, number> = { "$1k": 1000, "$5k": 5000, "$10k": 10000, "$25k": 25000, "$50k+": 50000 };
const priceAvg: Record<string, number> = { "$20–49": 35, "$50–199": 120, "$200–999": 500, "$1000+": 1500 };
const nicheMultiplier: Record<string, number> = { "Broad market": 1.6, "Mid niche": 1.2, "Highly specific niche": 0.85 };
const productMultiplier: Record<string, number> = {
  "SaaS / Software": 1.3, "Course": 1.1, "Digital Product": 1.0, "Physical Product": 1.4, "Community": 1.2, "Service": 0.9,
};

type Stage = "quiz" | "email-gate" | "result";

const CalculatorSection = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const isPl = lang === "pl";
  const totalSteps = isPl ? quizSteps.length : EN_STEPS;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerKeys, setAnswerKeys] = useState<Record<string, string>>({});
  const [mvaResult, setMvaResult] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("quiz");

  // Email gate state
  const [gateEmail, setGateEmail] = useState("");
  const [gateName, setGateName] = useState("");
  const [gateConsent, setGateConsent] = useState(false);
  const [gateSubmitting, setGateSubmitting] = useState(false);

  // EN result contact form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calculateMVA = (keys: Record<string, string>) => {
    const rev = revenueValues[keys.revenue] || 1000;
    const avg = priceAvg[keys.price] || 35;
    const nm = nicheMultiplier[keys.niche] || 1;
    const pm = productMultiplier[keys.product] || 1;
    const customersNeeded = Math.ceil(rev / avg);
    const conversionRate = 0.02;
    return Math.ceil((customersNeeded / conversionRate) * nm * pm);
  };

  const handleSelect = (displayValue: string, index: number) => {
    const stepDef = quizSteps[current];
    const key = stepDef.options.keys[index];

    if (current === 0) track.calculatorStart();
    track.calculatorStep(stepDef.key, key);

    const newAnswers = { ...answers, [stepDef.key]: displayValue };
    const newKeys = { ...answerKeys, [stepDef.key]: key };
    setAnswers(newAnswers);
    setAnswerKeys(newKeys);

    if (current < totalSteps - 1) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      const mva = calculateMVA(newKeys);
      setMvaResult(mva);
      track.calculatorResult(mva, newKeys.product, newKeys.revenue);

      if (isPl) {
        setTimeout(() => setStage("email-gate"), 300);
      } else {
        setTimeout(() => setStage("result"), 300);
      }
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setAnswerKeys({});
    setMvaResult(null);
    setStage("quiz");
    setEmail("");
    setName("");
    setConsent(false);
    setGateEmail("");
    setGateName("");
    setGateConsent(false);
  };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateName.trim() || !gateEmail.trim()) return;
    setGateSubmitting(true);
    try {
      await supabase.functions.invoke('mailerlite-subscribe', {
        body: {
          name: gateName.trim(),
          email: gateEmail.trim(),
          quizData: { ...answerKeys, mvaResult },
        },
      });
      track.leadSubmit("calculator-gate");
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setGateSubmitting(false);
      // Navigate to report page with data in localStorage
      const reportData = {
        answers,
        answerKeys,
        mvaResult,
        userName: gateName.trim(),
        userEmail: gateEmail.trim(),
      };
      localStorage.setItem("mva-report-data", JSON.stringify(reportData));
      navigate(`/${lang}/report`);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await supabase.functions.invoke('add-subscriber', {
        body: {
          name: name.trim(),
          email: email.trim(),
          answers: [`MVA Calculator: ${answers.product}, ${answers.revenue}/mo, ${answers.price}, ${answers.niche}, Result: ${mvaResult?.toLocaleString()}`],
          lang,
        },
      });
      track.leadSubmit("calculator");
      navigate(`/${lang}/thank-you`);
    } catch (err) {
      console.error('Error:', err);
      navigate(`/${lang}/thank-you`);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = stage !== "quiz" ? 100 : (current / totalSteps) * 100;
  const stepDef = quizSteps[current];

  return (
    <section id="calculator" className="dark-section py-12 px-6 relative overflow-hidden rounded-card">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-[720px] relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <Calculator className="text-primary mx-auto mb-3" size={28} />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-2">
              {isPl ? <>Oblicz swoje Minimum<br />Viable Audience</> : <>Calculate Your Minimum<br />Viable Audience</>}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm">
              {isPl ? "Sprawdź, jak dużą publiczność potrzebujesz zanim wystartujesz." : "Estimate how large your audience needs to be before launching your product."}
            </p>
          </div>
        </motion.div>

        <div className="w-full h-1.5 rounded-full mb-6 overflow-hidden" style={{ backgroundColor: "hsl(265 30% 20%)" }}>
          <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>

        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {stage === "quiz" && (
              <motion.div key={`step-${current}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <p className="text-xs text-muted-foreground mb-1">
                  {isPl ? `Krok ${current + 1} z ${totalSteps}` : `Step ${current + 1} of ${totalSteps}`}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-1">
                  {stepDef.label[lang] || stepDef.label.en}
                </h3>
                {stepDef.subtitle && (
                  <p className="text-sm text-muted-foreground mb-5">
                    {stepDef.subtitle[lang] || stepDef.subtitle.en}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(isPl ? stepDef.options.pl : stepDef.options.en).map((opt, i) => (
                    <motion.button
                      key={opt}
                      onClick={() => handleSelect(opt, i)}
                      whileHover={{ y: -2 }}
                      className="text-left rounded-card p-4 transition-colors cursor-pointer border"
                      style={{
                        backgroundColor: "hsl(265 60% 12%)",
                        borderColor: answers[stepDef.key] === opt ? "hsl(253 100% 62%)" : "hsl(265 30% 20%)",
                      }}
                    >
                      <span className="text-sm font-medium">
                        {stepDef.options.emojis ? `${stepDef.options.emojis[i]} ` : ""}{opt}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === "email-gate" && (
              <motion.div key="email-gate" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="text-center">
                <Mail className="text-primary mx-auto mb-3" size={28} />
                <h3 className="font-display text-xl md:text-2xl font-extrabold mb-2">
                  {isPl ? "Twoja analiza MVA jest gotowa!" : "Your MVA analysis is ready!"}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  {isPl ? "Podaj dane, a pokażemy Ci pełny raport z rekomendacjami." : "Enter your details to see your full report with recommendations."}
                </p>
                <form onSubmit={handleGateSubmit} className="max-w-sm mx-auto space-y-3">
                  <input type="text" placeholder={isPl ? "Twoje imię" : "Your name"} value={gateName} onChange={(e) => setGateName(e.target.value)} required maxLength={100}
                    className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                  <input type="email" placeholder={isPl ? "Twój email" : "Your email"} value={gateEmail} onChange={(e) => setGateEmail(e.target.value)} required maxLength={255}
                    className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                  <label className="flex items-start gap-2 text-left cursor-pointer">
                    <input type="checkbox" checked={gateConsent} onChange={(e) => setGateConsent(e.target.checked)} required
                      className="mt-0.5 accent-primary w-4 h-4 shrink-0" />
                    <span className="text-[11px] text-muted-foreground leading-tight">
                      {isPl
                        ? <>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <a href={`/${lang}/privacy-policy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Polityką Prywatności</a>.</>
                        : <>I agree to the processing of my personal data in accordance with the <a href={`/${lang}/privacy-policy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Privacy Policy</a>.</>}
                    </span>
                  </label>
                  <button type="submit" disabled={gateSubmitting || !gateConsent}
                    className="w-full bg-gradient-to-r from-primary to-[hsl(253_100%_55%)] text-primary-foreground py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60">
                    {gateSubmitting ? <><Loader2 size={16} className="animate-spin" /> Ładowanie...</> : <>{isPl ? "Zobacz mój raport" : "See my report"} <ArrowRight size={16} /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* EN-only: result inside modal */}
            {stage === "result" && !isPl && mvaResult !== null && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <div className="rounded-card p-6 border mb-6" style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}>
                  <Users className="text-primary mx-auto mb-2" size={24} />
                  <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-1">YOUR MINIMUM VIABLE AUDIENCE</p>
                  <motion.p className="font-display text-5xl md:text-6xl font-extrabold text-primary" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                    {mvaResult.toLocaleString()}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">people needed in your audience</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-3 text-xs text-muted-foreground">
                    {["product", "revenue", "price", "niche"].map((k) => (
                      <span key={k} className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{answers[k]}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-card p-5 border mb-4" style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}>
                  <h4 className="font-display text-lg font-bold mb-1">
                    Want help building your {mvaResult.toLocaleString()}-person audience?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">Leave your details and we'll reach out with a tailored plan.</p>
                  <form onSubmit={handleContactSubmit} className="max-w-sm mx-auto space-y-3">
                    <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100}
                      className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                    <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255}
                      className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                    <label className="flex items-start gap-2 text-left cursor-pointer">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required
                        className="mt-0.5 accent-primary w-4 h-4 shrink-0" />
                      <span className="text-[11px] text-muted-foreground leading-tight">
                        I agree to the processing of my personal data in accordance with the <a href={`/${lang}/privacy-policy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Privacy Policy</a>.
                      </span>
                    </label>
                    <button type="submit" disabled={submitting || !consent}
                      className="w-full bg-gradient-to-r from-primary to-[hsl(253_100%_55%)] text-primary-foreground py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60">
                      {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Get In Touch <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </div>

                <button onClick={reset} className="text-xs text-muted-foreground underline hover:text-primary transition-colors">Recalculate</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
