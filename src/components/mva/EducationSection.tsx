import { motion } from "framer-motion";
import { Users, Signal, Target } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Build Audience Before Product",
    desc: "Demand validation reduces launch risk. Know your audience wants it before you build it.",
  },
  {
    icon: Users,
    title: "Small Audience, High Engagement",
    desc: "1,000 true fans can sustain many businesses. Quality beats quantity every time.",
  },
  {
    icon: Signal,
    title: "Signals Before Scale",
    desc: "Focus on demand signals before scaling. Let the data tell you when to grow.",
  },
];

const EducationSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Core Principles</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Audience Building<br /><span className="text-primary">Principles</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-card border border-border p-8 text-center hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <p.icon className="text-primary" size={22} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
