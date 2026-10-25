import { useLanguage } from "@/i18n/LanguageContext";
import caseWoolet from "@/assets/case-woolet.webp";

const CaseStudyDeepSection = () => {
  const { t, lang } = useLanguage();
  const results = [1, 2, 3, 4].map((n) => ({
    value: t("caseStudyDeep", `result${n}Value`),
    label: t("caseStudyDeep", `result${n}Label`),
  }));
  const intro = ["body1", "body2", "body3"].map((k) => t("caseStudyDeep", k)).filter(Boolean);
  const weeks = ["phase1", "phase2", "phase3"].map((k) => {
    const [head, ...rest] = t("caseStudyDeep", k).split("\n");
    return { head, text: rest.join(" ") };
  });

  return (
    <section id="case-study" className="px-6 py-20 md:py-28 bg-[#ededf3]">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-[13px] font-semibold text-muted-foreground mb-4">
          {lang === "pl" ? "Case study · Woolet · Kickstarter" : "Case study · Woolet · Kickstarter"}
        </p>
        <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-1.8px] text-[clamp(28px,4vw,50px)] max-w-[900px] mb-4">
          {t("caseStudyDeep", "headline")}
        </h2>
        <p className="text-[18px] text-muted-foreground mb-14 max-w-[640px]">{t("caseStudyDeep", "subheadline")}</p>

        <div className="grid lg:grid-cols-[6fr_5fr] gap-x-20 gap-y-12">
          <div className="text-[18px] leading-[1.7] max-w-[620px]">
            {intro.map((p, i) => (
              <p key={i} className="mb-6 whitespace-pre-line">{p}</p>
            ))}
            <ol className="mt-10 border-t border-foreground/15">
              {weeks.map((w) => (
                <li key={w.head} className="grid sm:grid-cols-[110px_1fr] gap-1 sm:gap-4 py-5 border-b border-foreground/15">
                  <span className="text-[14px] font-semibold tabular-nums pt-1">{w.head}</span>
                  <span className="text-[17px] leading-[1.6]">{w.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-[20px] font-semibold">{t("caseStudyDeep", "closing")}</p>
          </div>

          <div>
            <img src={caseWoolet} alt="Woolet smart wallet" width={800} height={600} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover rounded-card mb-8" />
            <dl className="grid grid-cols-2 gap-x-8">
              {results.map((r) => (
                <div key={r.label} className="border-t border-foreground/15 py-5">
                  <dd className="font-display font-extrabold text-[40px] leading-none tracking-[-1px] tabular-nums">{r.value}</dd>
                  <dt className="text-[14px] text-muted-foreground mt-2">{r.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDeepSection;
