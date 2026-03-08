import { motion } from "framer-motion";
import { Rocket, DollarSign, Clock, Zap } from "lucide-react";

const metrics = [
  { icon: Rocket, value: "49+", label: "Launches supported" },
  { icon: DollarSign, value: "$3.5M+", label: "Raised by clients" },
  { icon: Clock, value: "20+", label: "Years combined experience" },
  { icon: Zap, value: "3×", label: "Faster product validation" },
];

const logos = ["TechCo", "LaunchPad", "StartupX", "BuildFast", "GrowthLab", "ScaleUp"];

const SocialProofSection = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="container mx-auto max-w-[1100px]">
        {/* Logo row */}
        <div className="flex items-center justify-center gap-10 flex-wrap mb-16 opacity-40">
          {logos.map((name) => (
            <span key={name} className="font-display text-lg font-bold tracking-tight">{name}</span>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-card border border-border p-6 text-center hover:border-primary/30 transition-colors"
            >
              <m.icon className="mx-auto mb-3 text-primary" size={24} />
              <div className="font-display text-3xl font-extrabold text-foreground mb-1">{m.value}</div>
              <div className="text-xs text-muted-foreground font-medium">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
