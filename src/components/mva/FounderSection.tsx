import { motion } from "framer-motion";
import { Award, Rocket, Users, BookOpen, Linkedin, Code, Globe } from "lucide-react";
import portrait from "@/assets/founder-portrait.png";
import maciejPortrait from "@/assets/maciej-portrait.png";
import { useLanguage } from "@/i18n/LanguageContext";

const FounderSection = () => {
  const { t } = useLanguage();

  const marekHighlights = [
    { icon: Rocket, text: t("founder", "marekH1") },
    { icon: Users, text: t("founder", "marekH2") },
    { icon: BookOpen, text: t("founder", "marekH3") },
    { icon: Award, text: t("founder", "marekH4") },
  ];

  const maciejHighlights = [
    { icon: Code, text: t("founder", "maciejH1") },
    { icon: Rocket, text: t("founder", "maciejH2") },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">{t("founder", "eyebrow")}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            {t("founder", "title")} <span className="text-primary">{t("founder", "titleAccent")}</span>
          </h2>
        </div>
        {/* Marek */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="rounded-card overflow-hidden bg-secondary max-w-[400px] mx-auto">
              <img src={portrait} alt="Marek Ciesla — Launch Strategist" className="w-full h-auto object-contain" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-display text-xl font-extrabold text-foreground">Marek Ciesla</h3>
              <a href="https://www.linkedin.com/in/marekciesla/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={18} /></a>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("founder", "marekDesc1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t("founder", "marekDesc2")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {marekHighlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 bg-secondary rounded-card p-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><h.icon className="text-primary" size={16} /></div>
                  <span className="text-sm font-medium text-foreground">{h.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Maciej */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative md:order-2">
            <div className="rounded-card overflow-hidden bg-secondary max-w-[400px] mx-auto relative" style={{ maxHeight: '480px' }}>
              <img src={maciejPortrait} alt="Maciej Mikołajek — Founder & Engineer" className="w-full h-auto object-cover scale-110 origin-top" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--secondary)))' }} />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="md:order-1">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-display text-xl font-extrabold text-foreground">Maciej Mikołajek</h3>
              <a href="https://mikolajek.xyz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Globe size={18} /></a>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("founder", "maciejDesc1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t("founder", "maciejDesc2")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {maciejHighlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 bg-secondary rounded-card p-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><h.icon className="text-primary" size={16} /></div>
                  <span className="text-sm font-medium text-foreground">{h.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
