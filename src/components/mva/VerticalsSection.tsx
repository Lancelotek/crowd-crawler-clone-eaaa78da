import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Layers } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const VerticalsSection = () => {
  const { lang, langPrefix } = useLanguage();

  const copy = lang === "pl"
    ? {
        eyebrow: "Dla kogo pracujemy",
        h2: "Dwa rynki. Jeden framework.",
        sub: "Pre-launch dla założycieli sprzedających fizyczne produkty i dla SaaS — tę samą metodę dostosowujemy do kanału, ICP i mechaniki płatności.",
        ecom: {
          tag: "eCommerce & crowdfunding",
          title: "Agencja pre-launch dla eCommerce",
          body: "DTC, Shopify, Kickstarter, Gamefound. Walidujemy SKU, finansujemy produkcję przedsprzedażą i uderzamy w launch z 1 000+ kupujących.",
          cta: "Zobacz, jak pracujemy z eCommerce",
          href: `${langPrefix}/agencja-prelaunch-ecommerce`,
        },
        saas: {
          tag: "SaaS & B2B",
          title: "Agencja pre-launch dla SaaS",
          body: "Walidacja popytu przed pierwszą linią kodu produkcyjnego. CAC i wiadomość dopasowane do rynku, zanim odpalisz launch day.",
          cta: "Zobacz, jak pracujemy z SaaS",
          href: `${langPrefix}/agencja-prelaunch-saas`,
        },
      }
    : {
        eyebrow: "Who we work with",
        h2: "Two markets. One framework.",
        sub: "Pre-launch marketing for physical-product founders and SaaS — same method, adapted to channel, ICP and payment mechanics.",
        ecom: {
          tag: "eCommerce & crowdfunding",
          title: "Pre-launch agency for eCommerce",
          body: "DTC, Shopify, Kickstarter, Gamefound. Validate the SKU, fund production with pre-orders, hit launch day with 1,000+ buyers.",
          cta: "How we work with eCommerce",
          href: `${langPrefix}/ecommerce-prelaunch-agency`,
        },
        saas: {
          tag: "SaaS & B2B",
          title: "Pre-launch agency for SaaS",
          body: "Demand validation before the first line of production code. CAC and message-market fit settled before launch day.",
          cta: "How we work with SaaS",
          href: `${langPrefix}/saas-prelaunch-marketing-agency`,
        },
      };

  const cards = [
    { ...copy.ecom, Icon: ShoppingBag },
    { ...copy.saas, Icon: Layers },
  ];

  return (
    <section className="relative bg-[hsl(var(--dark-bg))] py-28 border-t border-white/5">
      <div className="container mx-auto max-w-[1100px] px-6">
        <div className="mb-14 max-w-[680px]">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-4">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-5">
            {copy.h2}
          </h2>
          <p className="text-[16px] text-white/55 font-light leading-relaxed">{copy.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Link
                to={c.href}
                className="group block h-full rounded-2xl border border-white/8 bg-white/[0.02] p-8 hover:border-primary/40 hover:bg-white/[0.035] transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/12 border border-primary/25 flex items-center justify-center">
                    <c.Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40">
                    {c.tag}
                  </span>
                </div>
                <h3 className="text-[22px] font-bold text-white mb-3 leading-snug">{c.title}</h3>
                <p className="text-[15px] text-white/55 leading-relaxed font-light mb-7">{c.body}</p>
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary group-hover:gap-3 transition-all">
                  {c.cta} <ArrowRight size={15} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;
