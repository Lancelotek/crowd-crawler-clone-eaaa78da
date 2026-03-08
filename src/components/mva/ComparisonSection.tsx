import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const productFirst = [
  "Build product first",
  "Uncertain demand",
  "Hard launch to silence",
  "High risk of failure",
];

const audienceFirst = [
  "Build audience first",
  "Validated demand",
  "Momentum at launch",
  "Higher success probability",
];

const ComparisonSection = () => {
  return (
    <section className="dark-section py-24 px-6">
      <div className="container mx-auto max-w-[900px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">The Difference</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Audience First<br /><span className="text-primary">vs Product First</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Product First */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-card border p-6 md:p-8"
            style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}
          >
            <h3 className="font-display text-base md:text-lg font-bold mb-6 text-muted-foreground">Product First</h3>
            <ul className="space-y-4">
              {productFirst.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
                    <X className="text-destructive" size={12} />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Audience First */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-card border-2 border-primary p-6 md:p-8 relative"
            style={{ backgroundColor: "hsl(265 60% 12%)" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
              RECOMMENDED
            </div>
            <h3 className="font-display text-base md:text-lg font-bold mb-6 text-primary">Audience First</h3>
            <ul className="space-y-4">
              {audienceFirst.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="text-primary" size={12} />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
