import { motion } from "framer-motion";
import { Target } from "lucide-react";

const tiers = [
  { title: "Micro Launch", size: "1,000", label: "true fans", desc: "Perfect for niche products and first launches." },
  { title: "Creator Economy", size: "5,000", label: "engaged followers", desc: "Ideal for creators monetizing content and courses." },
  { title: "Large Product Launch", size: "10,000+", label: "audience size", desc: "For full-scale product and SaaS launches." },
];

const AudienceSizeSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Audience Size</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            How Big Should Your<br /><span className="text-primary">Audience Be?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-background rounded-card border border-border p-8 text-center hover:border-primary/30 transition-colors"
            >
              <Target className="text-primary mx-auto mb-4" size={24} />
              <h3 className="font-display text-lg font-bold mb-1">{t.title}</h3>
              <div className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-1">{t.size}</div>
              <div className="text-xs text-muted-foreground font-medium mb-3">{t.label}</div>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSizeSection;
