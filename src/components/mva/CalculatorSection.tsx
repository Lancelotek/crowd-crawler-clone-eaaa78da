import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Users, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/tracking";

const productTypes = {
  en: ["SaaS / Software", "Course", "Digital Product", "Community", "Service"],
  pl: ["SaaS / Oprogramowanie", "Kurs online", "Produkt cyfrowy", "Społeczność", "Usługa"],
};
const productKeys = ["SaaS / Software", "Course", "Digital Product", "Community", "Service"];
const revenueTargets = ["$1k", "$5k", "$10k", "$25k", "$50k+"];
const pricePoints = ["$20–49", "$50–199", "$200–999", "$1000+"];
const nicheOptions = {
  en: ["Broad market", "Mid niche", "Highly specific niche"],
  pl: ["Szeroki rynek", "Średnia nisza", "Bardzo specyficzna nisza"],
};
const nicheKeys = ["Broad market", "Mid niche", "Highly specific niche"];

const revenueValues: Record<string, number> = { "$1k": 1000, "$5k": 5000, "$10k": 10000, "$25k": 25000, "$50k+": 50000 };
const priceAvg: Record<string, number> = { "$20–49": 35, "$50–199": 120, "$200–999": 500, "$1000+": 1500 };
const nicheMultiplier: Record<string, number> = { "Broad market": 1.6, "Mid niche": 1.2, "Highly specific niche": 0.85 };
const productMultiplier: Record<string, number> = {
  "SaaS / Software": 1.3, "Course": 1.1, "Digital Product": 1.0, "Community": 1.2, "Service": 0.9,
};

type Step = "product" | "revenue" | "price" | "niche";
const stepOrder: Step[] = ["product", "revenue", "price", "niche"];
const stepLabels: Record<Step, Record<string, string>> = {
  product: { en: "Product Type", pl: "Typ produktu" },
  revenue: { en: "Target Monthly Revenue", pl: "Docelowy miesięczny przychód" },
  price: { en: "Price Point", pl: "Poziom cenowy" },
  niche: { en: "Niche Specificity", pl: "Specyfika niszy" },
};

const CONTENT_HEIGHT = "min-h-[320px]";

type Stage = "quiz" | "email-gate" | "result";

const CalculatorSection = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [product, setProduct] = useState("");
  const [productKey, setProductKey] = useState("");
  const [revenue, setRevenue] = useState("");
  const [price, setPrice] = useState("");
  const [niche, setNiche] = useState("");
  const [nicheKey, setNicheKey] = useState("");
  const [mvaResult, setMvaResult] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("quiz");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [gateEmail, setGateEmail] = useState("");
  const [gateName, setGateName] = useState("");
  const [gateConsent, setGateConsent] = useState(false);
  const [gateSubmitting, setGateSubmitting] = useState(false);

  const isPl = lang === "pl";

  const getOptions = (step: Step): string[] => {
    if (step === "product") return isPl ? productTypes.pl : productTypes.en;
    if (step === "niche") return isPl ? nicheOptions.pl : nicheOptions.en;
    if (step === "revenue") return revenueTargets;
    return pricePoints;
  };

  const selections: Record<Step, { value: string; set: (v: string) => void }> = {
    product: { value: product, set: setProduct },
    revenue: { value: revenue, set: setRevenue },
    price: { value: price, set: setPrice },
    niche: { value: niche, set: setNiche },
  };

  const handleSelect = (value: string, index: number) => {
    const step = stepOrder[current];
    if (current === 0) track.calculatorStart();
    track.calculatorStep(step, value);
    selections[step].set(value);

    // Store canonical keys for calculation
    if (step === "product") setProductKey(productKeys[index]);
    if (step === "niche") setNicheKey(nicheKeys[index]);

    if (current < 3) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      // Calculate result
      const rev = revenueValues[revenue] || revenueValues[revenueTargets[0]];
      const avg = priceAvg[price === "" ? pricePoints[0] : price] || priceAvg[pricePoints[0]];
      const nk = step === "niche" ? nicheKeys[index] : nicheKey;
      const pk = step === "product" ? productKeys[index] : productKey;
      const nm = nicheMultiplier[nk] || 1;
      const pm = productMultiplier[pk] || 1;
      const customersNeeded = Math.ceil(rev / avg);
      const conversionRate = 0.02;
      const mva = Math.ceil((customersNeeded / conversionRate) * nm * pm);
      setMvaResult(mva);
      track.calculatorResult(mva, pk, revenue);

      if (isPl) {
        setTimeout(() => setStage("email-gate"), 300);
      } else {
        setTimeout(() => setStage("result"), 300);
      }
    }
  };

  const reset = () => {
    setCurrent(0); setProduct(""); setProductKey(""); setRevenue(""); setPrice(""); setNiche(""); setNicheKey(""); setMvaResult(null); setStage("quiz");
    setEmail(""); setName(""); setConsent(false); setGateEmail(""); setGateName(""); setGateConsent(false);
  };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateName.trim() || !gateEmail.trim()) return;
    setGateSubmitting(true);
    try {
      await supabase.functions.invoke('add-subscriber', {
        body: {
          name: gateName.trim(),
          email: gateEmail.trim(),
          answers: [`MVA Calculator Gate: ${product}, ${revenue}/mo, ${price}, ${niche}, Result: ${mvaResult?.toLocaleString()}`],
          lang,
        },
      });
      track.leadSubmit("calculator-gate");
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setGateSubmitting(false);
      setStage("result");
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
          answers: [`MVA Calculator: ${product}, ${revenue}/mo, ${price}, ${niche}, Result: ${mvaResult?.toLocaleString()}`],
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

  const progress = stage !== "quiz" ? 100 : ((current) / 4) * 100;
  const step = stepOrder[current];

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

        <div className={CONTENT_HEIGHT}>
          <AnimatePresence mode="wait">
            {stage === "quiz" && (
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <p className="text-xs text-muted-foreground mb-2">
                  {isPl ? `Krok ${current + 1} z 4` : `Step ${current + 1} of 4`}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-5">{stepLabels[step][lang] || stepLabels[step].en}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getOptions(step).map((opt, i) => (
                    <motion.button key={opt} onClick={() => handleSelect(opt, i)} whileHover={{ y: -2 }}
                      className="text-left rounded-card p-4 transition-colors cursor-pointer border"
                      style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: selections[step].value === opt ? "hsl(253 100% 62%)" : "hsl(265 30% 20%)" }}>
                      <span className="text-sm font-medium">{opt}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === "email-gate" && (
              <motion.div key="email-gate" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="text-center">
                <Mail className="text-primary mx-auto mb-3" size={28} />
                <h3 className="font-display text-xl md:text-2xl font-extrabold mb-2">Twój wynik MVA jest gotowy!</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  Podaj email, a wyślemy Ci pełną analizę wraz z rekomendacjami.
                </p>
                <form onSubmit={handleGateSubmit} className="max-w-sm mx-auto space-y-3">
                  <input type="text" placeholder="Twoje imię" value={gateName} onChange={(e) => setGateName(e.target.value)} required maxLength={100}
                    className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                  <input type="email" placeholder="Twój email" value={gateEmail} onChange={(e) => setGateEmail(e.target.value)} required maxLength={255}
                    className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                  <label className="flex items-start gap-2 text-left cursor-pointer">
                    <input type="checkbox" checked={gateConsent} onChange={(e) => setGateConsent(e.target.checked)} required
                      className="mt-0.5 accent-primary w-4 h-4 shrink-0" />
                    <span className="text-[11px] text-muted-foreground leading-tight">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Polityką Prywatności</a>.
                    </span>
                  </label>
                  <button type="submit" disabled={gateSubmitting || !gateConsent}
                    className="w-full bg-gradient-to-r from-primary to-[hsl(253_100%_55%)] text-primary-foreground py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60">
                    {gateSubmitting ? <><Loader2 size={16} className="animate-spin" /> Ładowanie...</> : <>Pokaż mój wynik <ArrowRight size={16} /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {stage === "result" && mvaResult !== null && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <div className="rounded-card p-6 border mb-6" style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}>
                  <Users className="text-primary mx-auto mb-2" size={24} />
                  <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-1">
                    {isPl ? "TWOJE MINIMUM VIABLE AUDIENCE" : "YOUR MINIMUM VIABLE AUDIENCE"}
                  </p>
                  <motion.p className="font-display text-5xl md:text-6xl font-extrabold text-primary" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                    {mvaResult.toLocaleString()}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isPl ? "osób potrzebnych w Twojej publiczności" : "people needed in your audience"}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-3 text-xs text-muted-foreground">
                    <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{product}</span>
                    <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{revenue}/mo</span>
                    <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{price}</span>
                    <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{niche}</span>
                  </div>
                </div>

                <div className="rounded-card p-5 border mb-4" style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}>
                  <h4 className="font-display text-lg font-bold mb-1">
                    {isPl
                      ? `Chcesz pomoc w zbudowaniu publiczności ${mvaResult.toLocaleString()} osób?`
                      : `Want help building your ${mvaResult.toLocaleString()}-person audience?`}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isPl
                      ? "Umów się na bezpłatną 30-minutową konsultację strategiczną."
                      : "Leave your details and we'll reach out with a tailored plan."}
                  </p>
                  <form onSubmit={handleContactSubmit} className="max-w-sm mx-auto space-y-3">
                    <input type="text" placeholder={isPl ? "Twoje imię" : "Your name"} value={name} onChange={(e) => setName(e.target.value)} required maxLength={100}
                      className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                    <input type="email" placeholder={isPl ? "Twój email" : "Your email"} value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255}
                      className="w-full px-4 py-3 rounded-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ backgroundColor: "hsl(265 60% 8%)", borderColor: "hsl(265 30% 20%)", color: "white" }} />
                    <label className="flex items-start gap-2 text-left cursor-pointer">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required
                        className="mt-0.5 accent-primary w-4 h-4 shrink-0" />
                      <span className="text-[11px] text-muted-foreground leading-tight">
                        {isPl ? (
                          <>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Polityką Prywatności</a>.</>
                        ) : (
                          <>I agree to the processing of my personal data in accordance with the <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Privacy Policy</a>.</>
                        )}
                      </span>
                    </label>
                    <button type="submit" disabled={submitting || !consent}
                      className="w-full bg-gradient-to-r from-primary to-[hsl(253_100%_55%)] text-primary-foreground py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60">
                      {submitting
                        ? <><Loader2 size={16} className="animate-spin" /> {isPl ? "Wysyłanie..." : "Sending..."}</>
                        : <>{isPl ? "Umów bezpłatną konsultację" : "Get In Touch"} <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </div>

                <button onClick={reset} className="text-xs text-muted-foreground underline hover:text-primary transition-colors">
                  {isPl ? "Przelicz ponownie" : "Recalculate"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
