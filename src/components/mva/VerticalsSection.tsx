import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const VerticalsSection = () => {
  const { lang, langPrefix } = useLanguage();

  const copy = lang === "pl"
    ? {
        h2: "Produkt fizyczny albo SaaS",
        sub: "Ta sama metoda, dopasowana do kanału, ICP i mechaniki płatności.",
        cards: [
          {
            tag: "eCommerce i crowdfunding",
            title: "Pre-launch dla eCommerce",
            body: "DTC, Shopify, Kickstarter, Gamefound. Walidujemy SKU, finansujemy produkcję przedsprzedażą i startujemy z 1 000+ kupujących.",
            cta: "Jak pracujemy z eCommerce",
            href: `${langPrefix}/agencja-prelaunch-ecommerce`,
          },
          {
            tag: "SaaS i B2B",
            title: "Pre-launch dla SaaS",
            body: "Walidacja popytu przed pierwszą linią kodu produkcyjnego. CAC i przekaz dopasowany do rynku, zanim nadejdzie launch day.",
            cta: "Jak pracujemy z SaaS",
            href: `${langPrefix}/agencja-prelaunch-saas`,
          },
        ],
      }
    : {
        h2: "Physical product or SaaS",
        sub: "Same method, adapted to channel, ICP and payment mechanics.",
        cards: [
          {
            tag: "eCommerce & crowdfunding",
            title: "Pre-launch for eCommerce",
            body: "DTC, Shopify, Kickstarter, Gamefound. We validate the SKU, fund production with pre-orders and launch to 1,000+ buyers.",
            cta: "How we work with eCommerce",
            href: `${langPrefix}/ecommerce-prelaunch-agency`,
          },
          {
            tag: "SaaS & B2B",
            title: "Pre-launch for SaaS",
            body: "Demand validated before the first line of production code. CAC and message-market fit settled before launch day.",
            cta: "How we work with SaaS",
            href: `${langPrefix}/saas-prelaunch-marketing-agency`,
          },
        ],
      };

  return (
    <section className="bg-[#0a0a12] text-white px-6 py-20 md:py-28">
      <div className="container mx-auto max-w-[1200px]">
        <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-1.8px] text-[clamp(30px,4vw,52px)] mb-3">
          {copy.h2}
        </h2>
        <p className="text-[17px] text-white/65 mb-12">{copy.sub}</p>

        <div className="grid md:grid-cols-2 border-t border-white/20">
          {copy.cards.map((c, i) => (
            <div key={c.title} className={`pt-8 pb-4 md:pr-12 ${i > 0 ? "border-t md:border-t-0 md:border-l border-white/20 md:pl-12" : ""}`}>
              <p className="text-[13px] text-white/50 mb-3">{c.tag}</p>
              <h3 className="text-[24px] font-bold mb-3 leading-snug">{c.title}</h3>
              <p className="text-[16px] text-white/75 leading-[1.65] mb-6 max-w-[480px]">{c.body}</p>
              <Link to={c.href} className="text-[15px] font-semibold text-[#a48bff] underline underline-offset-4 decoration-[#a48bff]/40 hover:decoration-[#a48bff]">
                {c.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;
