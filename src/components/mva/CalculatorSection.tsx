import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Users } from "lucide-react";

const productTypes = ["SaaS / Software", "Course", "Digital Product", "Community", "Service"];
const revenueTargets = ["$1k", "$5k", "$10k", "$25k", "$50k+"];
const pricePoints = ["$20–49", "$50–199", "$200–999", "$1000+"];
const nicheOptions = ["Broad market", "Mid niche", "Highly specific niche"];

const revenueValues: Record<string, number> = { "$1k": 1000, "$5k": 5000, "$10k": 10000, "$25k": 25000, "$50k+": 50000 };
const priceAvg: Record<string, number> = { "$20–49": 35, "$50–199": 120, "$200–999": 500, "$1000+": 1500 };
const nicheMultiplier: Record<string, number> = { "Broad market": 1.6, "Mid niche": 1.2, "Highly specific niche": 0.85 };
const productMultiplier: Record<string, number> = {
  "SaaS / Software": 1.3, "Course": 1.1, "Digital Product": 1.0, "Community": 1.2, "Service": 0.9,
};

type Step = "product" | "revenue" | "price" | "niche";
const stepOrder: Step[] = ["product", "revenue", "price", "niche"];
const stepLabels: Record<Step, string> = {
  product: "Product Type",
  revenue: "Target Monthly Revenue",
  price: "Price Point",
  niche: "Niche Specificity",
};

const CalculatorSection = () => {
  const [current, setCurrent] = useState(0);
  const [product, setProduct] = useState("");
  const [revenue, setRevenue] = useState("");
  const [price, setPrice] = useState("");
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const selections: Record<Step, { options: string[]; value: string; set: (v: string) => void }> = {
    product: { options: productTypes, value: product, set: setProduct },
    revenue: { options: revenueTargets, value: revenue, set: setRevenue },
    price: { options: pricePoints, value: price, set: setPrice },
    niche: { options: nicheOptions, value: niche, set: setNiche },
  };

  const handleSelect = (value: string) => {
    const step = stepOrder[current];
    selections[step].set(value);

    if (current < 3) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      // Calculate
      const rev = revenueValues[revenue] || revenueValues[revenueTargets[0]];
      const avg = priceAvg[price === "" ? pricePoints[0] : price] || priceAvg[pricePoints[0]];
      const nm = nicheMultiplier[value] || 1;
      const pm = productMultiplier[product] || 1;
      const customersNeeded = Math.ceil(rev / avg);
      const conversionRate = 0.02;
      const mva = Math.ceil((customersNeeded / conversionRate) * nm * pm);
      setTimeout(() => setResult(mva), 300);
    }
  };

  const reset = () => {
    setCurrent(0);
    setProduct("");
    setRevenue("");
    setPrice("");
    setNiche("");
    setResult(null);
  };

  const progress = result !== null ? 100 : ((current) / 4) * 100;
  const step = stepOrder[current];

  return (
    <section id="calculator" className="dark-section py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-[720px] relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-10">
            <Calculator className="text-primary mx-auto mb-4" size={32} />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3">
              Calculate Your Minimum<br />Viable Audience
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm">
              Answer 4 quick questions to estimate how large your audience needs to be before launching.
            </p>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="w-full h-1.5 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: "hsl(265 30% 20%)" }}>
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {result === null ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-muted-foreground mb-2">Step {current + 1} of 4</p>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-6">{stepLabels[step]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selections[step].options.map((opt) => (
                  <motion.button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    whileHover={{ y: -3 }}
                    className="text-left rounded-card p-5 transition-colors cursor-pointer border"
                    style={{
                      backgroundColor: "hsl(265 60% 12%)",
                      borderColor: selections[step].value === opt ? "hsl(253 100% 62%)" : "hsl(265 30% 20%)",
                    }}
                  >
                    <span className="text-sm font-medium">{opt}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="rounded-card p-8 border mb-8" style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}>
                <Users className="text-primary mx-auto mb-3" size={28} />
                <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-1">YOUR MINIMUM VIABLE AUDIENCE</p>
                <motion.p
                  className="font-display text-5xl md:text-6xl font-extrabold text-primary"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {result.toLocaleString()}
                </motion.p>
                <p className="text-xs text-muted-foreground mt-2">people needed in your audience</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4 text-xs text-muted-foreground">
                  <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{product}</span>
                  <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{revenue}/mo</span>
                  <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{price}</span>
                  <span className="px-3 py-1 rounded-full border" style={{ borderColor: "hsl(265 30% 20%)" }}>{niche}</span>
                </div>
              </div>

              <a
                href="#quiz"
                className="bg-primary text-primary-foreground px-8 py-4 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2 animate-pulse-cta"
              >
                Continue to Audience Strategy Quiz <ArrowRight size={16} />
              </a>
              <p className="text-xs text-muted-foreground mt-3">Get a personalized growth strategy →</p>
              <button onClick={reset} className="mt-4 text-xs text-muted-foreground underline hover:text-primary transition-colors">
                Recalculate
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CalculatorSection;
