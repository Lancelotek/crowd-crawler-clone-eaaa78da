import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroTeam from "@/assets/hero-team.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-[120px] pb-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--hero-gradient)] pointer-events-none" />
      <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-[1200px] relative z-10">
        {/* Two-column hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left — copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/8 px-4 py-1.5 rounded-full border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Minimum Viable Audience Framework
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.05] tracking-tight mb-6">
              Launch With
              <br />
              Demand
              <br />
              <span className="text-primary">— Not Hope</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-lg text-muted-foreground max-w-[480px] leading-relaxed mb-4">
              Build a Minimum Viable Audience before your product launches so your first customers are already waiting.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="text-sm text-muted-foreground max-w-[440px] leading-relaxed mb-8">
              Our MVA system identifies demand, builds your audience, and converts them into early buyers before launch.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }} className="flex items-center gap-4 flex-wrap">
              <a href="#cta" className="bg-primary text-primary-foreground px-8 py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2 animate-pulse-cta">
                Build Your MVA <ArrowRight size={16} />
              </a>
              <a href="#system" className="border border-border px-7 py-3.5 text-sm font-medium rounded-button hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2">
                See How It Works <ChevronDown size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right — team photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-card overflow-hidden border border-border shadow-xl shadow-primary/5">
              <img src={heroTeam} alt="Our team of launch strategists" className="w-full h-auto object-cover" />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-card border border-border shadow-lg px-5 py-3">
              <div className="font-display text-2xl font-extrabold text-primary leading-none">49+</div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">Launches supported</div>
            </div>
          </motion.div>
        </div>

        {/* Funnel visual below */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-[600px] mx-auto">
          <div className="flex flex-col items-center gap-2">
            {["Audience Discovery", "Community Building", "Demand Validation", "Early Buyers", "Launch"].map((label, i) => (
              <div
                key={label}
                className="flex items-center justify-center font-semibold text-xs md:text-sm tracking-wide py-3.5 rounded-lg transition-all"
                style={{
                  width: `${100 - i * 15}%`,
                  backgroundColor: `hsl(253 100% ${62 + i * 5}% / ${1 - i * 0.12})`,
                  color: i < 3 ? "hsl(0 0% 100%)" : "hsl(253 100% 95%)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">Your audience grows into launch momentum →</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
