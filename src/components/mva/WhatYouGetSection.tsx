import { motion } from "framer-motion";
import { BarChart3, CalendarCheck, Target, Mail, Phone, Layout } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WhatYouGetSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: BarChart3, title: t("whatYouGet", "f1Title"), desc: t("whatYouGet", "f1Desc") },
    { icon: CalendarCheck, title: t("whatYouGet", "f2Title"), desc: t("whatYouGet", "f2Desc") },
    { icon: Target, title: t("whatYouGet", "f3Title"), desc: t("whatYouGet", "f3Desc") },
    { icon: Mail, title: t("whatYouGet", "f4Title"), desc: t("whatYouGet", "f4Desc") },
    { icon: Phone, title: t("whatYouGet", "f5Title"), desc: t("whatYouGet", "f5Desc") },
    { icon: Layout, title: t("whatYouGet", "f6Title"), desc: t("whatYouGet", "f6Desc") },
  ];

  return (
    <section className="py-20 px-6 bg-card">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide uppercase">
            {t("whatYouGet", "eyebrow")}
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            {t("whatYouGet", "title")}
            <br />
            <span className="text-primary">{t("whatYouGet", "titleAccent")}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-background rounded-card border border-border p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-base font-bold mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
