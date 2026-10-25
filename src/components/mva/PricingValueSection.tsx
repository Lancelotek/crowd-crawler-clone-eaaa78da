import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const PricingValueSection = () => {
  const { t, lang, langPrefix } = useLanguage();
  const items = Array.from({ length: 7 }, (_, i) => ({
    name: t("pricingValue", `item${i + 1}Name`),
    desc: t("pricingValue", `item${i + 1}Desc`),
  }));

  return (
    <section id="pricing-value" className="bg-background px-6 py-20 md:py-28 border-t border-border">
      <div className="container mx-auto max-w-[1200px] grid lg:grid-cols-[5fr_6fr] gap-x-20 gap-y-12">
        <div className="lg:sticky lg:top-28 self-start">
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-1.8px] text-[clamp(30px,4vw,52px)] mb-8">
            {t("pricingValue", "headline")}
          </h2>
          <p className="font-display font-extrabold text-[56px] leading-none tracking-[-1.8px] tabular-nums">
            {t("pricingValue", "investmentAmount")}
          </p>
          <p className="text-[15px] text-muted-foreground mt-3 mb-8">
            {t("pricingValue", "price")}
            <br />
            {t("pricingValue", "investmentNote").replace(/^\(|\)$/g, "")}
          </p>
          <Link
            to={`${langPrefix}/book`}
            onClick={() => track.bookingClick("pricing-value")}
            className="inline-flex items-center px-7 py-4 font-bold text-[15px] rounded-button bg-primary text-primary-foreground hover:brightness-110 transition-[filter]"
          >
            {t("pricingValue", "cta")}
          </Link>
          <p className="text-[13px] text-muted-foreground mt-3">{t("pricingValue", "ctaTrust")}</p>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold text-muted-foreground mb-2">{lang === "pl" ? "W cenie" : "Included"}</h3>
          <ul className="border-t-2 border-foreground mb-12">
            {items.map((item) => (
              <li key={item.name} className="py-4 border-b border-border">
                <p className="text-[17px] font-semibold leading-snug">{item.name}</p>
                <p className="text-[15px] text-muted-foreground mt-1">{item.desc}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-card bg-[#ededf3] p-6">
            <h3 className="text-[15px] font-bold mb-2">{t("pricingValue", "guaranteeLabel")}</h3>
            <p className="text-[16px] leading-[1.65]">{t("pricingValue", "guaranteeP1")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingValueSection;
