import { motion } from "framer-motion";
import { Users, DollarSign, Flame, Clock } from "lucide-react";

const metrics = [
  { icon: Users, value: "10,000+", label: "Waitlist subscribers built" },
  { icon: DollarSign, value: "$500K+", label: "Product launches" },
  { icon: Flame, value: "1,000+", label: "Founders using the framework" },
  { icon: Clock, value: "90 days", label: "Avg. validation cycle" },
];

const SocialProofSection = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-xs font-semibold text-primary mb-3 tracking-wide text-center">Social Proof</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-12 text-center">
          Creators Are Launching <span className="text-primary">With Demand</span>
        </h2>

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
              <m.icon className="mx-auto mb-3 text-primary" size={22} />
              <div className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-1">{m.value}</div>
              <div className="text-xs text-muted-foreground font-medium">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
