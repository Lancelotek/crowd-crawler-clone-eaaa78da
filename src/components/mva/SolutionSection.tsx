import { motion } from "framer-motion";
import { Search, Pen, BarChart3, Rocket } from "lucide-react";

const steps = [
  { icon: Search, num: "01", title: "Audience Discovery", desc: "Find a niche with real demand and unmet needs." },
  { icon: Pen, num: "02", title: "Content Engine", desc: "Publish ideas that attract your future audience organically." },
  { icon: BarChart3, num: "03", title: "Demand Signals", desc: "Measure what people care about and what resonates." },
  { icon: Rocket, num: "04", title: "Launch With Momentum", desc: "Release your product to an audience already waiting." },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="max-w-[600px] mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">The Solution</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            The Minimum Viable<br /><span className="text-primary">Audience Framework</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Instead of building first and hoping people show up, the MVA framework focuses on building a small but highly engaged audience before launch.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-card border border-border p-7 hover:border-primary/30 transition-colors group relative"
            >
              <span className="absolute top-6 right-6 text-xs font-bold text-primary/30 tracking-widest">{s.num}</span>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-base font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
