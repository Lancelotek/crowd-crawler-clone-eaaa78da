import { motion } from "framer-motion";
import { Search, RefreshCw, Activity, Zap } from "lucide-react";

const cards = [
  { icon: Search, title: "Audience Discovery", desc: "Identify the smallest viable niche where you can build authority fast.", step: "01" },
  { icon: RefreshCw, title: "Content Flywheel", desc: "Attract the right people with consistent ideas that compound over time.", step: "02" },
  { icon: Activity, title: "Signal Tracking", desc: "Understand what resonates with your audience through real engagement data.", step: "03" },
  { icon: Zap, title: "Launch Trigger", desc: "Release your product when real demand appears — not a moment before.", step: "04" },
];

/* Positions for orbiting dots around the central circle */
const orbitDots = [
  { x: 0, y: -120, size: 6, delay: 0 },
  { x: 85, y: -85, size: 4, delay: 0.3 },
  { x: 120, y: 0, size: 7, delay: 0.6 },
  { x: 85, y: 85, size: 5, delay: 0.9 },
  { x: 0, y: 120, size: 6, delay: 1.2 },
  { x: -85, y: 85, size: 4, delay: 1.5 },
  { x: -120, y: 0, size: 7, delay: 1.8 },
  { x: -85, y: -85, size: 5, delay: 2.1 },
  { x: 55, y: -110, size: 3, delay: 0.4 },
  { x: 110, y: 55, size: 3, delay: 1.0 },
  { x: -55, y: 110, size: 3, delay: 1.6 },
  { x: -110, y: -55, size: 3, delay: 2.3 },
];

const SystemSection = () => {
  return (
    <section id="system" className="dark-section py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1200px]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold text-primary mb-3 tracking-wide"
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-16"
        >
          The Demand Engine Behind<br /><span className="text-primary">Successful Launches</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Left cards */}
          <div className="flex flex-col gap-5">
            {cards.slice(0, 2).map((c, i) => (
              <CardItem key={i} card={c} index={i} />
            ))}
          </div>

          {/* Center animated diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[300px] h-[300px] mx-auto hidden lg:flex items-center justify-center"
          >
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="-150 -150 300 300">
              {orbitDots.map((dot, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={0} y1={0} x2={dot.x} y2={dot.y}
                  stroke="hsl(265 80% 60%)"
                  strokeWidth={0.5}
                  strokeOpacity={0.2}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: dot.delay * 0.5, duration: 0.6 }}
                />
              ))}
            </svg>

            {/* Orbit dots */}
            {orbitDots.map((dot, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute rounded-full bg-primary/40"
                style={{
                  width: dot.size,
                  height: dot.size,
                  left: `calc(50% + ${dot.x}px - ${dot.size / 2}px)`,
                  top: `calc(50% + ${dot.y}px - ${dot.size / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: dot.delay * 0.5 + 0.3, duration: 0.4 }}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.3, 1],
                }}
                // @ts-ignore
                transition2={{
                  repeat: Infinity,
                  duration: 3,
                  delay: dot.delay,
                }}
              />
            ))}

            {/* Pulsing ring */}
            <motion.div
              className="absolute w-24 h-24 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-24 h-24 rounded-full border border-primary/15"
              animate={{ scale: [1, 2, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Central circle */}
            <motion.div
              className="relative z-10 w-16 h-16 rounded-full bg-primary flex flex-col items-center justify-center shadow-[0_0_40px_hsl(265_80%_60%/0.4)]"
              animate={{ boxShadow: ["0 0 30px hsl(265 80% 60% / 0.3)", "0 0 50px hsl(265 80% 60% / 0.5)", "0 0 30px hsl(265 80% 60% / 0.3)"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <span className="text-xs font-bold text-primary-foreground leading-none">MVA</span>
              <span className="text-[8px] font-semibold text-primary-foreground/70 leading-none mt-0.5">CORE</span>
            </motion.div>

            {/* Floating metric badges */}
            <motion.div
              className="absolute top-4 right-0 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-border/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
              animate={{ y: [0, -6, 0] }}
              // @ts-ignore
              transition2={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide">AUDIENCE GROWTH</p>
              <p className="text-base font-extrabold text-primary">+1,000 →</p>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-[-20px] bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-border/50"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.5 }}
              animate={{ y: [0, 6, 0] }}
              // @ts-ignore
              transition2={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide">DEMAND SIGNAL</p>
              <p className="text-base font-extrabold text-primary">↑ 94%</p>
            </motion.div>
          </motion.div>

          {/* Right cards */}
          <div className="flex flex-col gap-5">
            {cards.slice(2, 4).map((c, i) => (
              <CardItem key={i + 2} card={c} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CardItem = ({ card, index }: { card: typeof cards[0]; index: number }) => {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ scale: 1.02, borderColor: "hsl(265 80% 60% / 0.4)" }}
      className="rounded-card border p-7 group cursor-default transition-shadow hover:shadow-[0_0_30px_hsl(265_80%_60%/0.08)]"
      style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <motion.div
            className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors"
            whileHover={{ rotate: 5 }}
          >
            <Icon className="text-primary" size={20} />
          </motion.div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-primary/60 tracking-widest">{card.step}</span>
            <h3 className="font-display text-lg font-bold">{card.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemSection;
