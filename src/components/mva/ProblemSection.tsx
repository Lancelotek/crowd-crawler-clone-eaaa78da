import { motion } from "framer-motion";
import { UserX, HelpCircle, VolumeX } from "lucide-react";

const problems = [
  { icon: UserX, title: "No Audience", desc: "You build something great but nobody is waiting to see it." },
  { icon: HelpCircle, title: "No Validation", desc: "You don't know if people actually want what you're creating." },
  { icon: VolumeX, title: "No Demand", desc: "Marketing starts only after launch — when it's already too late." },
];

const ProblemSection = () => {
  return (
    <section className="py-16 px-6 bg-card">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-xs font-semibold text-primary mb-2 tracking-wide">The Problem</p>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-10">
          Most Products Launch<br /><span className="text-primary">To Silence</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-background rounded-card border border-border p-6 hover:border-destructive/30 transition-colors group"
            >
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
