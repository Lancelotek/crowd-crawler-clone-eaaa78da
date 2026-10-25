import { useLanguage } from "@/i18n/LanguageContext";

const FrameworkComparisonSection = () => {
  const { t } = useLanguage();
  const rows = [1, 2, 3, 4, 5].map((n) => [t("frameworkComparison", `old${n}`), t("frameworkComparison", `mva${n}`)]);

  return (
    <section className="bg-[#0a0a12] text-[#ededf3] px-6 pb-20 md:pb-28">
      <div className="container mx-auto max-w-[1200px] grid lg:grid-cols-[5fr_6fr] gap-x-20 gap-y-8">
        <h2 className="font-display font-extrabold uppercase text-white leading-[1.1] tracking-[-0.5px] text-[clamp(22px,2.4vw,30px)] self-start lg:sticky lg:top-28">
          {t("frameworkComparison", "headline")}
        </h2>

        <div className="max-w-[600px]">
          <table className="w-full text-left text-[15px] mb-10">
            <thead>
              <tr className="border-b border-white/25">
                <th scope="col" className="w-8 py-3" />
                <th scope="col" className="py-3 pr-4 font-semibold text-white/50">{t("frameworkComparison", "oldWay")}</th>
                <th scope="col" className="py-3 font-semibold text-white">{t("frameworkComparison", "mvaWay")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([oldStep, mvaStep], i) => (
                <tr key={i} className="border-b border-white/10 align-top">
                  <td className="py-3 text-[13px] text-white/35 tabular-nums">{i + 1}</td>
                  <td className="py-3 pr-4 text-white/50">{oldStep}</td>
                  <td className="py-3 text-white">{mvaStep}</td>
                </tr>
              ))}
              <tr className="align-top">
                <td className="py-4" />
                <td className="py-4 pr-4 font-display font-bold text-[22px] text-white/50 tabular-nums">{t("frameworkComparison", "oldResult")}</td>
                <td className="py-4 font-display font-bold text-[22px] text-[#10b981] tabular-nums">{t("frameworkComparison", "mvaResult")}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-[18px] leading-[1.7]">
            <p className="mb-6">{t("frameworkComparison", "bodyP1")}</p>
            <p>{t("frameworkComparison", "bodyP4")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameworkComparisonSection;
