import { motion } from "framer-motion";
import { Users, DollarSign, Flame, Clock } from "lucide-react";
import clientLogos from "@/assets/client-logos-light.png";

const metrics = [
  { icon: Users, value: "12,000+", label: "Waitlist subscribers built" },
  { icon: DollarSign, value: "$500K+", label: "Product launches" },
  { icon: Flame, value: "3,000+", label: "Creators using MVA" },
  { icon: Clock, value: "90 days", label: "Avg. validation cycle" },
];

const SocialProofSection = () => {
  return (
    <section className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-xs font-semibold text-primary mb-2 tracking-wide text-center">Social Proof</p>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold leading-tight tracking-tight mb-10 text-center">
          Creators Are Launching <span className="text-primary">With Demand</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-card rounded-card border border-border p-5 text-center hover:border-primary/30 transition-colors"
            >
              <m.icon className="mx-auto mb-2 text-primary" size={20} />
              <div className="font-display text-xl md:text-2xl font-extrabold text-foreground mb-0.5">{m.value}</div>
              <div className="text-[11px] text-muted-foreground font-medium">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <img src={clientLogos} alt="Trusted by leading brands" className="h-5 w-auto object-contain opacity-40" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
