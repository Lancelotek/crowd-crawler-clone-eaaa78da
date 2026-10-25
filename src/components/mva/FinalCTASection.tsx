import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const FinalCTASection = () => {
  const { t, langPrefix } = useLanguage();

  return (
    <section id="cta" className="px-6 py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-[1200px] grid lg:grid-cols-[7fr_5fr] gap-x-20 gap-y-10 lg:items-end">
        <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-1.8px] text-[clamp(34px,5vw,64px)]">
          {t("finalCTA", "title")}{" "}
          <span className="text-white/70">{t("finalCTA", "subtitle")}</span>
        </h2>
        <div>
          <p className="text-[18px] leading-[1.6] text-white/90 mb-8">{t("finalCTA", "desc")}</p>
          <Link
            to={`${langPrefix}/book`}
            onClick={() => track.bookingClick("final_cta")}
            className="inline-flex items-center px-8 py-4 font-bold text-[15px] rounded-button bg-white text-primary hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {t("finalCTA", "calcBtn")} →
          </Link>
          <p className="text-[13px] text-white/80 mt-3 mb-6">{t("finalCTA", "trust")}</p>
          <Link
            to={`${langPrefix}/quiz`}
            onClick={() => track.calcOpen()}
            className="text-[15px] text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
          >
            {t("finalCTA", "quizBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
