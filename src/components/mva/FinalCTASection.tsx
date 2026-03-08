import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const FinalCTASection = () => {
  return (
    <section id="cta" className="dark-section py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-[800px] text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Get Started</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Calculate Your<br />Minimum Viable Audience
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
            Find out how big your audience needs to be before launching your product. Get a custom MVA analysis for your niche.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={`${CALENDLY_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2 animate-pulse-cta"
            >
              Run MVA Analysis <ArrowRight size={16} />
            </a>
            <a
              href={`${CALENDLY_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-current/20 px-7 py-3.5 text-sm font-medium rounded-button hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
              style={{ borderColor: "hsl(265 30% 30%)" }}
            >
              <Phone size={16} /> Book Strategy Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
