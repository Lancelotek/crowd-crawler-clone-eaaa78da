import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const FinalCTASection = () => {
  return (
    <section className="py-28 px-6">
      <div className="container mx-auto max-w-[800px] text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Stop Guessing.<br /><span className="text-primary">Start Building Demand.</span>
          </h2>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-8 py-4 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2 mb-4"
          >
            Calculate Your Minimum Viable Audience <ArrowRight size={16} />
          </a>
          <p className="text-xs text-muted-foreground">Takes less than 30 seconds.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
