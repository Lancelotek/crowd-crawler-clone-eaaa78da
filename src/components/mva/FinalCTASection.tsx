import { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Phone } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const CalculatorSection = lazy(() => import("@/components/mva/CalculatorSection"));
const QuizFunnelSection = lazy(() => import("@/components/mva/QuizFunnelSection"));

const FinalCTASection = () => {
  const { t, lang, langPrefix } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [calcOpen, setCalcOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("quiz") === "open") {
      setCalcOpen(true);
      searchParams.delete("quiz");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <section id="cta" className="py-20 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(253_100%_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-[800px] text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground mb-3">
              {t("finalCTA", "title")}<br />
              <span className="opacity-80">{t("finalCTA", "subtitle")}</span>
            </h2>
            <p className="text-sm text-primary-foreground/60 mb-6 max-w-md mx-auto">
              {t("finalCTA", "desc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <button onClick={() => { setCalcOpen(true); track.calcOpen(); }} className="bg-primary-foreground text-primary px-8 py-3.5 font-semibold text-sm rounded-button hover:bg-primary-foreground/90 transition-all inline-flex items-center gap-2">
                <Calculator size={16} /> {t("finalCTA", "calcBtn")} <ArrowRight size={16} />
              </button>
              <Link
                to={`${langPrefix}/book`}
                onClick={() => track.bookingClick("final_cta")}
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground px-8 py-3.5 font-semibold text-sm rounded-button hover:bg-primary-foreground/10 transition-all inline-flex items-center gap-2"
              >
                <Phone size={16} /> {t("finalCTA", "quizBtn")} <ArrowRight size={16} />
              </Link>
            </div>
            <p className="text-xs text-primary-foreground/40">{t("finalCTA", "trust")}</p>
          </motion.div>
        </div>
      </section>

      <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent shadow-none [&>button]:text-white [&>button]:z-50">
          <Suspense fallback={<div className="py-16 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <CalculatorSection />
          </Suspense>
        </DialogContent>
      </Dialog>

      <Dialog open={quizOpen} onOpenChange={setQuizOpen}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent shadow-none [&>button]:text-foreground [&>button]:z-50">
          <Suspense fallback={<div className="py-16 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <QuizFunnelSection />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinalCTASection;
