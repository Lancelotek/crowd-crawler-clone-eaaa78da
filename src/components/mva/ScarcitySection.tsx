import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const ScarcitySection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-[800px] text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Shield className="text-primary mx-auto mb-5" size={32} />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            We Only Work With A Few<br /><span className="text-primary">Founders Each Month</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-8 text-sm">
            To ensure every launch gets the attention it deserves, we only work with a limited number of founders at a time.
          </p>
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-5 py-2 rounded-full text-xs font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            Limited to 5 founders per month
          </div>
          <div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              Apply For An Audience Strategy Call <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScarcitySection;
