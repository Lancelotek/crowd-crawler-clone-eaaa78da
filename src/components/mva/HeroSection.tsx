import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroTeam from "@/assets/hero-team.png";

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] pt-[120px] pb-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--hero-gradient)] pointer-events-none" />
      <div className="absolute top-1/3 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/8 px-4 py-1.5 rounded-full border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                MVA Framework
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6">
              Build Your First
              <br />
              1,000 True Fans
              <br />
              <span className="text-primary">Before You Launch</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-base md:text-lg text-muted-foreground max-w-[480px] leading-relaxed mb-8">
              The Minimum Viable Audience framework helps founders validate ideas, build demand, and launch with an audience already waiting.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex items-center gap-4 flex-wrap">
              <a href="#calculator" className="bg-primary text-primary-foreground px-7 py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2 animate-pulse-cta">
                Calculate Your MVA <ArrowRight size={16} />
              </a>
              <a href="#solution" className="border border-border px-6 py-3.5 text-sm font-medium rounded-button hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2">
                See How It Works <ChevronDown size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right — visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
            <div className="rounded-card overflow-hidden border border-border shadow-xl shadow-primary/5">
              <img src={heroTeam} alt="Founders building their audience" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card rounded-card border border-border shadow-lg px-5 py-3">
              <div className="font-display text-2xl font-extrabold text-primary leading-none">1,000+</div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">Founders using MVA</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
