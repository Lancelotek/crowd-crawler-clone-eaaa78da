import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count = Math.min(count + 3, 90);
      if (counterRef.current) counterRef.current.textContent = String(count);
      if (count >= 90) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "1K", label: "True Fans Target" },
    { value: null, label: "Days to MVA", ref: true },
    { value: "7×", label: "Content Multiplier" },
    { value: "3%", label: "Min Conversion Rate" },
  ];

  return (
    <section className="min-h-screen pt-[120px] pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--hero-gradient)] pointer-events-none" />
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-6">
              <span className="w-7 h-px bg-primary" />
              Minimum Viable Audience Framework
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-6xl md:text-7xl lg:text-[104px] font-black leading-[0.9] tracking-tight uppercase mb-8">
              Build
              <br />
              <span className="text-primary">Real</span>
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>
                Audience
              </span>
              <span className="animate-pulse">_</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.22}>
            <p className="text-lg text-muted-foreground max-w-[440px] leading-relaxed mb-10">
              JAY-23 combines growth hacking, precision ads, and an AI-powered content system to build your first 1,000 true fans — before you scale.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.36}>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#phases"
                className="bg-primary text-primary-foreground px-8 py-3.5 font-bold text-sm uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
              >
                See the Framework
              </a>
              <a
                href="#ai-prompts"
                className="border border-border px-7 py-3.5 text-xs font-semibold tracking-[0.06em] hover:border-primary hover:text-primary transition-colors"
              >
                AI Prompts →
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-2 gap-px bg-border">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className="bg-card p-8 relative group overflow-hidden hover:bg-secondary transition-colors"
              >
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-400" />
                <div className="text-5xl font-black text-primary leading-none mb-1.5">
                  {stat.ref ? <span ref={counterRef}>0</span> : stat.value}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
