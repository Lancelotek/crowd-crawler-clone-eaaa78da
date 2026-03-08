import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const CalculatorSection = () => {
  return (
    <section id="calculator" className="dark-section py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-[800px] text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Calculator className="text-primary mx-auto mb-6" size={36} />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Calculate Your Minimum<br />Viable Audience
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
            Use the MVA calculator to estimate how large your audience needs to be before launching your product.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-8 py-4 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2 animate-pulse-cta"
          >
            Open the MVA Calculator
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;
