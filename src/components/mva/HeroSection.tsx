import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* Positions for satellite nodes around center (cx=250, cy=250, r~170) */
const satellites = [
  { x: 250, y: 80, r: 8, delay: 0.6 },
  { x: 400, y: 120, r: 6, delay: 0.7 },
  { x: 420, y: 250, r: 10, delay: 0.8 },
  { x: 380, y: 380, r: 7, delay: 0.9 },
  { x: 250, y: 420, r: 9, delay: 1.0 },
  { x: 120, y: 380, r: 6, delay: 1.1 },
  { x: 80, y: 250, r: 10, delay: 0.65 },
  { x: 100, y: 130, r: 7, delay: 0.75 },
  // outer ring
  { x: 170, y: 50, r: 5, delay: 0.85 },
  { x: 340, y: 60, r: 4, delay: 0.95 },
  { x: 450, y: 180, r: 5, delay: 1.05 },
  { x: 460, y: 340, r: 4, delay: 1.15 },
  { x: 330, y: 450, r: 5, delay: 0.55 },
  { x: 140, y: 440, r: 4, delay: 0.72 },
  { x: 40, y: 320, r: 5, delay: 0.88 },
  { x: 50, y: 170, r: 4, delay: 0.98 },
];

const NetworkVisual = () => (
  <svg viewBox="0 0 500 500" className="w-full h-full" fill="none">
    {/* Dashed orbit rings */}
    <circle cx="250" cy="250" r="120" stroke="hsl(253 100% 62% / 0.1)" strokeWidth="1" strokeDasharray="6 4" />
    <circle cx="250" cy="250" r="180" stroke="hsl(253 100% 62% / 0.07)" strokeWidth="1" strokeDasharray="4 6" />

    {/* Connection lines */}
    {satellites.map((s, i) => (
      <motion.line
        key={`line-${i}`}
        x1="250" y1="250" x2={s.x} y2={s.y}
        stroke="hsl(253 100% 62% / 0.12)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: s.delay, duration: 0.6 }}
      />
    ))}

    {/* Satellite nodes */}
    {satellites.map((s, i) => (
      <motion.circle
        key={`node-${i}`}
        cx={s.x} cy={s.y} r={s.r}
        stroke="hsl(253 100% 62% / 0.4)"
        strokeWidth="1.5"
        fill="hsl(253 100% 62% / 0.08)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: s.delay + 0.2, duration: 0.4, type: "spring" }}
      />
    ))}

    {/* Center node */}
    <motion.circle
      cx="250" cy="250" r="48"
      fill="hsl(253 100% 62%)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
    />
    <motion.text
      x="250" y="244" textAnchor="middle" fill="white"
      fontSize="14" fontWeight="700" fontFamily="Rajdhani, sans-serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
    >
      MVA
    </motion.text>
    <motion.text
      x="250" y="262" textAnchor="middle" fill="hsl(253 100% 90%)"
      fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="2"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
    >
      CORE
    </motion.text>
  </svg>
);

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] pt-[120px] pb-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--hero-gradient)] pointer-events-none" />
      <div className="absolute top-1/3 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

          {/* Right — network visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-[500px] mx-auto"
          >
            <NetworkVisual />

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute left-0 top-[55%] bg-card rounded-card border border-border shadow-lg px-4 py-2.5"
            >
              <div className="text-[10px] font-semibold text-muted-foreground tracking-wide mb-0.5">DEMAND SIGNAL</div>
              <div className="font-display text-lg font-extrabold text-primary leading-none">↑ 94%</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute right-0 top-[35%] bg-card rounded-card border border-border shadow-lg px-4 py-2.5"
            >
              <div className="text-[10px] font-semibold text-muted-foreground tracking-wide mb-0.5">AUDIENCE GROWTH</div>
              <div className="font-display text-lg font-extrabold text-primary leading-none">+1,000 →</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
