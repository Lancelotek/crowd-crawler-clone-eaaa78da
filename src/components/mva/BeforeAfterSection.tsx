import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const before = ["Launching blindly", "No audience on day one", "Risky ad spend", "Guessing demand"];
const after = ["Validated demand signals", "Growing email list", "Engaged community", "Early buyers ready"];

const BeforeAfterSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[900px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Before vs After</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Stop Guessing.<br /><span className="text-primary">Start Knowing.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-card border border-border bg-card p-8">
            <h3 className="font-display text-lg font-bold text-destructive mb-6">Before MVA</h3>
            <ul className="space-y-4">
              {before.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <X className="text-destructive shrink-0" size={16} /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-card border border-primary/30 bg-card p-8">
            <h3 className="font-display text-lg font-bold text-primary mb-6">After MVA</h3>
            <ul className="space-y-4">
              {after.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <Check className="text-primary shrink-0" size={16} /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
