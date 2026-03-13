import { motion } from "framer-motion";
import { Search, Pen, BarChart3, Rocket, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const SolutionSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Search, num: "01", title: t("solution", "s1"), desc: t("solution", "s1Desc") },
    { icon: Pen, num: "02", title: t("solution", "s2"), desc: t("solution", "s2Desc") },
    { icon: BarChart3, num: "03", title: t("solution", "s3"), desc: t("solution", "s3Desc") },
    { icon: Users, num: "04", title: t("solution", "s4"), desc: t("solution", "s4Desc") },
    { icon: Rocket, num: "05", title: t("solution", "s5"), desc: t("solution", "s5Desc") },
  ];

  return (
    <section id="solution" className="py-20 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="max-w-[600px] mb-10">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide">{t("solution", "eyebrow")}</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-3">
            {t("solution", "title")}<br /><span className="text-primary">{t("solution", "titleAccent")}</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{t("solution", "desc")}</p>
        </div>
        <div className="hidden md:flex items-end gap-1.5 justify-center max-w-[900px] mx-auto mb-10">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="flex-1 flex items-center justify-center font-semibold text-xs md:text-sm tracking-wide rounded-lg origin-bottom" style={{ height: `${70 + i * 24}px`, backgroundColor: `hsl(253 100% ${68 - i * 3}%)`, color: "hsl(0 0% 100%)" }}>{s.title}</motion.div>
          ))}
        </div>
        <div className="flex md:hidden flex-col items-center gap-1.5 mb-8">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.3 }} className="flex items-center justify-center font-semibold text-sm tracking-wide py-3 rounded-lg w-full" style={{ width: `${100 - i * 6}%`, backgroundColor: `hsl(253 100% ${68 - i * 3}%)`, color: "hsl(0 0% 100%)" }}>{s.title}</motion.div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }} className="bg-card rounded-card border border-border p-5 hover:border-primary/30 transition-colors group relative">
              <span className="absolute top-4 right-4 text-[10px] font-bold text-primary/30 tracking-widest">{s.num}</span>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={18} />
              </div>
              <h3 className="font-display text-sm font-bold mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
