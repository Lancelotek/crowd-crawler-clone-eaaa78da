import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-28 px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(253_100%_50%)] pointer-events-none" />
      <div className="container mx-auto max-w-[800px] text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-primary-foreground mb-6">
            Stop Launching To Silence.<br />
            <span className="opacity-80">Start Building Demand.</span>
          </h2>
          <a
            href="#calculator"
            className="bg-primary-foreground text-primary px-8 py-4 font-semibold text-sm rounded-button hover:bg-primary-foreground/90 transition-all inline-flex items-center gap-2 mb-4"
          >
            Calculate Your Minimum Viable Audience <ArrowRight size={16} />
          </a>
          <p className="text-xs text-primary-foreground/60">Free • Takes 30 seconds • No signup required</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
