import { motion } from "framer-motion";
import { Users, DollarSign, Flame, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const SocialProofSection = () => {
  const { t } = useLanguage();

  const metrics = [
    { icon: Users, value: t("socialProof", "metric1Value"), label: t("socialProof", "metric1Label") },
    { icon: DollarSign, value: t("socialProof", "metric2Value"), label: t("socialProof", "metric2Label") },
    { icon: Flame, value: t("socialProof", "metric3Value"), label: t("socialProof", "metric3Label") },
    { icon: Clock, value: t("socialProof", "metric4Value"), label: t("socialProof", "metric4Label") },
  ];

  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-xs font-semibold text-primary mb-2 tracking-wide text-center">{t("socialProof", "eyebrow")}</p>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold leading-tight tracking-tight mb-10 text-center">
          {t("socialProof", "title")} <span className="text-primary">{t("socialProof", "titleAccent")}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="bg-card rounded-card border border-border p-5 text-center hover:border-primary/30 transition-colors">
              <m.icon className="mx-auto mb-2 text-primary" size={20} />
              <div className="font-display text-xl md:text-2xl font-extrabold text-foreground mb-0.5">{m.value}</div>
              <div className="text-[11px] text-muted-foreground font-medium">{m.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="w-full">
          <img alt="Trusted by leading brands" className="w-full object-contain opacity-50" loading="lazy" decoding="async" src="/lovable-uploads/9e17c3fc-0fe1-43f4-979f-f144aa260b0d.png" />
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
