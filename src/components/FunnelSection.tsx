import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  { label: "REACH — Organic + Paid", pct: "100%", width: "100%" },
  { label: "STOP — Scroll stopper hook", pct: "40%", width: "90%" },
  { label: "CONSUME — Watch / Read to end", pct: "20%", width: "80%" },
  { label: "ENGAGE — Comment, Save, Share", pct: "8%", width: "70%" },
  { label: "FOLLOW / JOIN — True Fan", pct: "3%", width: "60%" },
];

const FunnelSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="container mx-auto">
        <ScrollReveal>
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Conversion Funnel</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-16">
            The MVA<br />
            <span className="text-primary">Funnel</span>
          </h2>
        </ScrollReveal>
        <div className="flex flex-col items-center gap-2 max-w-[620px] mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full flex justify-between items-center px-8 py-4 font-semibold text-sm tracking-wide hover:brightness-110 transition rounded-lg"
              style={{
                width: step.width,
                backgroundColor: `hsl(253 100% ${62 + i * 6}% / ${1 - i * 0.15})`,
                color: i < 3 ? "hsl(0 0% 100%)" : "hsl(240 20% 97%)",
              }}
            >
              <span>{step.label}</span>
              <span className="text-xs opacity-70">{step.pct}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunnelSection;