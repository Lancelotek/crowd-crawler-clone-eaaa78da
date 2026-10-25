import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";
import { CAMPAIGNS, formatUsd } from "@/content/campaigns";

const HeroSection = () => {
  const { t, lang, langPrefix } = useLanguage();
  const ledger = CAMPAIGNS.slice(0, 6);
  const isHome = /^\/(en|pl)?\/?$/.test(useLocation().pathname);

  return (
    <section className="relative bg-[#0a0a12] text-white px-6 pt-[132px] pb-20 md:pb-24 font-sans">
      <div className="container mx-auto max-w-[1200px] lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20 lg:items-end">
        <div className="max-w-[640px]">
          <p className="text-[13px] font-medium text-white/60 mb-6">{t("hero", "eyebrow")}</p>
          <h1 className="font-display font-extrabold uppercase text-white leading-[1.02] tracking-[-1.8px] text-[clamp(38px,5.4vw,66px)] mb-7">
            <span dangerouslySetInnerHTML={{ __html: t("hero", "h1_line1").replace(/SaaS &amp; eCommerce|SaaS & eCommerce/g, '<span class="text-primary">$&</span>') }} />
            <br />
            {t("hero", "h1_line2")}
          </h1>
          <p className="text-[18px] leading-[1.6] text-[#ededf3] max-w-[520px] mb-9">
            {t("hero", "hook")} <strong className="font-semibold text-white">{t("hero", "hookBold")}</strong>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-4 mb-5">
            <Link
              to={`${langPrefix}/book`}
              onClick={() => track.bookingClick("hero")}
              className="cta-green whitespace-nowrap inline-flex items-center justify-center px-7 py-4 font-bold text-[15px] transition-[filter] hover:brightness-110 w-fit"
            >
              {t("hero", "ctaPrimary")}
            </Link>
            <Link
              to={`${langPrefix}/quiz`}
              onClick={() => track.ctaClick("hero", "quiz")}
              className="inline-flex items-center min-h-[44px] text-[15px] text-[#c4c4cc] underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors w-fit"
            >
              {t("hero", "ctaSecondary")}
            </Link>
          </div>
          <p className="text-[13px] text-[#a1a1aa]">{t("hero", "trustBar")}</p>
        </div>

        {/* Ledger: real campaigns with real totals, checkable on Kickstarter */}
        <div className="mt-16 lg:mt-0 border-t border-white/15">
          <table className="w-full text-left">
            <caption className="sr-only">{lang === "pl" ? "Wybrane kampanie i zebrane kwoty" : "Selected campaigns and amounts raised"}</caption>
            <tbody>
              {ledger.map((c) => (
                <tr key={c.name} className="border-b border-white/10">
                  <th scope="row" className="py-3 pr-4 font-medium text-[15px] text-white">{c.name}</th>
                  <td className="py-3 pr-4 text-[13px] text-white/50 hidden sm:table-cell">{c.category[lang]}</td>
                  <td className="py-3 text-right font-display font-bold text-[20px] tabular-nums tracking-tight text-white">{formatUsd(c.raised, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-baseline justify-between pt-4">
            <span className="text-[13px] text-white/60">{t("hero", "leads")}</span>
            {isHome && <a href="#case-studies" className="text-[13px] text-[#a48bff] hover:text-white underline-offset-4 hover:underline">
              {lang === "pl" ? "Wszystkie kampanie" : "All campaigns"}
            </a>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
