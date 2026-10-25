import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Calculator } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const FinalCTASection = () => {
  const { t, langPrefix } = useLanguage();

  return (
    <section id="cta" className="py-20 px-6 bg-primary relative overflow-hidden">
      <div className="container mx-auto max-w-[800px] text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground mb-3">
            {t("finalCTA", "title")}<br />
            <span className="opacity-80">{t("finalCTA", "subtitle")}</span>
          </h2>
          <p className="text-base text-primary-foreground/90 mb-6 max-w-md mx-auto">
            {t("finalCTA", "desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Link
              to={`${langPrefix}/book`}
              onClick={() => track.bookingClick("final_cta")}
              className="bg-primary-foreground text-primary px-8 py-3.5 font-semibold text-sm rounded-button hover:bg-primary-foreground/90 transition-all inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary items-center gap-2"
            >
              <Phone size={16} /> {t("finalCTA", "calcBtn")} <ArrowRight size={16} />
            </Link>
            <Link
              to={`${langPrefix}/quiz`}
              onClick={() => track.calcOpen()}
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground px-8 py-3.5 font-semibold text-sm rounded-button hover:bg-primary-foreground/10 transition-all inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary items-center gap-2"
            >
              <Calculator size={16} /> {t("finalCTA", "quizBtn")} <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-[13px] text-primary-foreground/80">{t("finalCTA", "trust")}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
