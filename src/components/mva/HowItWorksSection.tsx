import { motion } from "framer-motion";
import { Search, Layers, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const HowItWorksSection = () => {
  const { t, langPrefix } = useLanguage();

  const phases = [
    {
      icon: Search,
      label: t("howItWorks", "phase1Label"),
      title: t("howItWorks", "phase1Title"),
      desc: t("howItWorks", "phase1Desc"),
      accent: "hsl(var(--primary))",
    },
    {
      icon: Layers,
      label: t("howItWorks", "phase2Label"),
      title: t("howItWorks", "phase2Title"),
      desc: t("howItWorks", "phase2Desc"),
      accent: "hsl(253 100% 55%)",
    },
    {
      icon: Rocket,
      label: t("howItWorks", "phase3Label"),
      title: t("howItWorks", "phase3Title"),
      desc: t("howItWorks", "phase3Desc"),
      accent: "hsl(253 100% 48%)",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide uppercase">
            {t("howItWorks", "eyebrow")}
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            {t("howItWorks", "title")}
            <br />
            <span className="text-primary">{t("howItWorks", "titleAccent")}</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative bg-card rounded-card border border-border p-8 hover:border-primary/30 transition-colors group"
            >
              {/* Phase number bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-card"
                style={{ background: phase.accent }}
              />
              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <phase.icon className="text-primary" size={20} />
                </div>
                <span className="text-xs font-bold text-primary tracking-wider uppercase">
                  {phase.label}
                </span>
              </div>
              <h3 className="font-display text-lg font-extrabold mb-2">{phase.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{phase.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#cta"
            onClick={() => track.ctaClick("how-it-works", "calculator")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all"
          >
            {t("howItWorks", "cta")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
