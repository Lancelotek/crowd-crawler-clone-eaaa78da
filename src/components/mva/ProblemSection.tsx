import { motion } from "framer-motion";
import { UserX, HelpCircle, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ProblemSection = () => {
  const { t } = useLanguage();

  const problems = [
    { icon: UserX, title: t("problem", "p1Title"), desc: t("problem", "p1Desc") },
    { icon: HelpCircle, title: t("problem", "p2Title"), desc: t("problem", "p2Desc") },
    { icon: VolumeX, title: t("problem", "p3Title"), desc: t("problem", "p3Desc") },
  ];

  return (
    <section className="py-20 px-6 bg-card">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-xs font-semibold text-primary mb-2 tracking-wide">{t("problem", "eyebrow")}</p>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-10">
          {t("problem", "title")}<br /><span className="text-primary">{t("problem", "titleAccent")}</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="bg-background rounded-card border border-border p-6 hover:border-destructive/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/15 transition-colors">
                <p.icon className="text-destructive" size={20} />
              </div>
              <h3 className="font-display text-base font-bold mb-1.5">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
