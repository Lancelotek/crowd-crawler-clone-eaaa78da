import { motion } from "framer-motion";
import { Search, RefreshCw, Activity, Zap } from "lucide-react";

const cards = [
  { icon: Search, title: "Audience Discovery", desc: "Identify the smallest viable niche where you can build authority fast." },
  { icon: RefreshCw, title: "Content Flywheel", desc: "Attract the right people with consistent ideas that compound over time." },
  { icon: Activity, title: "Signal Tracking", desc: "Understand what resonates with your audience through real engagement data." },
  { icon: Zap, title: "Launch Trigger", desc: "Release your product when real demand appears — not a moment before." },
];

const SystemSection = () => {
  return (
    <section id="system" className="dark-section py-24 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-xs font-semibold text-primary mb-3 tracking-wide">How It Works</p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-14">
          The Demand Engine Behind<br /><span className="text-primary">Successful Launches</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-card border p-8 hover:border-primary/40 transition-colors group"
              style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <c.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemSection;
