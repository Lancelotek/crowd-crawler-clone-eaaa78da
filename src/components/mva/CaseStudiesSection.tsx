import { useLanguage } from "@/i18n/LanguageContext";
import { CAMPAIGNS, formatUsd } from "@/content/campaigns";

const CaseStudiesSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="case-studies" className="px-6 py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-1.8px] text-[clamp(30px,4vw,52px)]">
            {t("caseStudies", "title")}
          </h2>
          <p className="text-[15px] text-muted-foreground">{t("hero", "raised")}</p>
        </div>

        <ul className="border-t-2 border-foreground">
          {CAMPAIGNS.map((c) => (
            <li key={c.name} className="grid grid-cols-[72px_1fr] sm:grid-cols-[120px_1fr_auto] items-center gap-x-4 gap-y-2 sm:gap-8 py-4 border-b border-border">
              <img src={c.image} alt={c.name} width={240} height={180} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover rounded-md" />
              <div className="min-w-0">
                <h3 className="font-semibold text-[17px] leading-tight">
                  {c.name} <span className="font-normal text-[13px] text-muted-foreground ml-1">{c.category[lang]}</span>
                </h3>
                <p className="text-[14px] text-muted-foreground mt-1 leading-snug">{c.desc[lang]}</p>
              </div>
              <p className="col-start-2 sm:col-start-auto sm:text-right">
                <span className="inline sm:block mr-2 sm:mr-0 font-display font-extrabold text-[22px] sm:text-[30px] leading-none tracking-[-0.5px] tabular-nums">{formatUsd(c.raised, lang)}</span>
                <span className="text-[12px] text-muted-foreground">{t("caseStudies", "fundsRaised")}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
