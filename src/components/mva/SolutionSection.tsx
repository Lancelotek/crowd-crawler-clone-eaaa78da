import { motion } from "framer-motion";
import { Search, Pen, BarChart3, Rocket, Users } from "lucide-react";

const steps = [
  { icon: Search, num: "01", title: "Discovery", desc: "Find a niche with real demand and unmet needs." },
  { icon: Pen, num: "02", title: "Audience Growth", desc: "Publish ideas that attract your future audience organically." },
  { icon: BarChart3, num: "03", title: "Demand Signals", desc: "Measure what resonates through real engagement data." },
  { icon: Users, num: "04", title: "Community", desc: "Build a tight group of early fans who trust you." },
  { icon: Rocket, num: "05", title: "Launch", desc: "Release your product to an audience already waiting." },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-16 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="max-w-[600px] mb-10">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide">The MVA Framework</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-3">
            From Discovery<br /><span className="text-primary">To Launch</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Instead of building first and hoping people show up, the MVA framework focuses on building a small but highly engaged audience before launch.
          </p>
        </div>

        {/* Horizontal flow bar on desktop */}
        <div className="hidden md:flex items-end gap-1.5 justify-center max-w-[900px] mx-auto mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex-1 flex items-center justify-center font-semibold text-xs md:text-sm tracking-wide rounded-lg origin-bottom"
              style={{
                height: `${70 + i * 24}px`,
                backgroundColor: `hsl(253 100% ${68 - i * 3}%)`,
                color: "hsl(0 0% 100%)",
              }}
            >
              {s.title}
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex md:hidden flex-col items-center gap-1.5 mb-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="flex items-center justify-center font-semibold text-sm tracking-wide py-3 rounded-lg w-full"
              style={{
                width: `${100 - i * 6}%`,
                backgroundColor: `hsl(253 100% ${68 - i * 3}%)`,
                color: "hsl(0 0% 100%)",
              }}
            >
              {s.title}
            </motion.div>
          ))}
        </div>

        {/* Detail cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-card rounded-card border border-border p-5 hover:border-primary/30 transition-colors group relative"
            >
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
