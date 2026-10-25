import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const HowItWorksSection = () => {
  const { t, langPrefix } = useLanguage();
  const phases = [1, 2, 3].map((n) => ({
    label: t("howItWorks", `phase${n}Label`),
    title: t("howItWorks", `phase${n}Title`),
    desc: t("howItWorks", `phase${n}Desc`),
  }));

  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-1.8px] text-[clamp(30px,4vw,52px)]">
            {t("howItWorks", "title")}
          </h2>
          <Link
            to={`${langPrefix}/quiz`}
            onClick={() => track.ctaClick("how-it-works", "calculator")}
            className="text-[15px] font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary w-fit"
          >
            {t("howItWorks", "cta")}
          </Link>
        </div>

        <ol className="grid md:grid-cols-3 border-t-2 border-foreground">
          {phases.map((p, i) => (
            <li key={i} className={`pt-6 pb-8 md:pr-10 ${i > 0 ? "border-t md:border-t-0 md:border-l border-border md:pl-10" : ""}`}>
              <p className="text-[13px] font-semibold text-muted-foreground tabular-nums mb-3">{p.label}</p>
              <h3 className="font-display font-extrabold uppercase text-[28px] tracking-[-0.5px] leading-none mb-4">{p.title}</h3>
              <p className="text-[16px] leading-[1.65] text-foreground/80">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorksSection;
