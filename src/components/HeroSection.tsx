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
            <div className="flex items-center gap-3 text-xs font-medium text-primary mb-6">
              <span className="w-7 h-px bg-primary" />
              Minimum Viable Audience Framework
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[88px] font-extrabold leading-[1] tracking-tight mb-6">
              You're Creating
              <br />
              Content. But
              <br />
              Nobody's
              <br />
              <span className="text-primary">Watching</span>
              <span className="animate-pulse text-primary">_</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.22}>
            <p className="text-lg text-muted-foreground max-w-[480px] leading-relaxed mb-4">
              JAY-23 builds your Minimum Viable Audience — your first 1,000 true fans — in 90 days using growth hacking, precision ads, and AI content systems.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.28}>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-10">
              <span className="text-primary">★★★★★</span>
              <span>Trusted by 40+ creators</span>
              <span className="opacity-30">|</span>
              <span>Avg. 847% follower growth</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.36}>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#book-call"
                className="bg-primary text-primary-foreground px-8 py-3.5 font-semibold text-sm rounded-button hover:bg-[hsl(253_100%_55%)] transition-colors animate-pulse-cta"
              >
                Get My Free Growth Audit →
              </a>
              <a
                href="#phases"
                className="border border-border px-7 py-3.5 text-sm font-medium rounded-button hover:border-primary hover:text-primary transition-colors"
              >
                See How It Works ↓
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className="bg-card rounded-card p-8 relative group overflow-hidden border border-border hover:border-primary/30 transition-colors"
              >
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-400 rounded-full" />
                <div className="font-display text-5xl font-extrabold text-primary leading-none mb-1.5">
                  {stat.ref ? <span ref={counterRef}>0</span> : stat.value}
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-2">
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