import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const ColdLaunchTrapSection = () => {
  const { t, langPrefix } = useLanguage();
  const body = ["p1", "p2", "p3", "p5", "p6"].map((k) => t("coldLaunchTrap", k));

  return (
    <section id="cold-launch-trap" className="bg-[#0a0a12] text-[#ededf3] px-6 py-20 md:py-28 border-t border-white/10">
      <div className="container mx-auto max-w-[1200px] grid lg:grid-cols-[5fr_6fr] gap-x-20 gap-y-10">
        <h2 className="font-display font-extrabold uppercase text-white leading-[1.05] tracking-[-1px] text-[clamp(28px,3.6vw,44px)] lg:sticky lg:top-28 self-start">
          {t("coldLaunchTrap", "headline1")}{" "}
          <span className="text-white/55">{t("coldLaunchTrap", "headline2")}</span>
        </h2>

        <div className="text-[18px] leading-[1.7] max-w-[600px]">
          {body.map((p, i) => (
            <p key={i} className="mb-6 whitespace-pre-line">{p}</p>
          ))}
          <p className="mt-10 mb-4 text-[22px] font-semibold text-white">{t("coldLaunchTrap", "highlight")}</p>
          <p className="mb-10 whitespace-pre-line">{t("coldLaunchTrap", "p7")}</p>
          <Link
            to={`${langPrefix}/book`}
            onClick={() => track.bookingClick("cold-launch-trap")}
            className="cta-green whitespace-nowrap inline-flex items-center px-7 py-4 font-bold text-[15px] hover:brightness-110 transition-[filter]"
          >
            {t("coldLaunchTrap", "cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ColdLaunchTrapSection;
