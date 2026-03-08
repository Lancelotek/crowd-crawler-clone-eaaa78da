import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Activity, Zap, X } from "lucide-react";
import { useState } from "react";

const cards = [
  { icon: Search, title: "Audience Discovery", desc: "Identify the smallest viable niche where you can build authority fast.", step: "01" },
  { icon: RefreshCw, title: "Content Flywheel", desc: "Attract the right people with consistent ideas that compound over time.", step: "02" },
  { icon: Activity, title: "Signal Tracking", desc: "Understand what resonates with your audience through real engagement data.", step: "03" },
  { icon: Zap, title: "Launch Trigger", desc: "Release your product when real demand appears — not a moment before.", step: "04" },
];

const orbitNodes = [
  { x: 0, y: -120, label: "Landing Page", detail: "Konwertujący landing z jasnym CTA i walidacją pomysłu.", color: "253 100% 62%" },
  { x: 104, y: -60, label: "Email List", detail: "Budowanie listy mailingowej z segmentacją odbiorców.", color: "280 80% 60%" },
  { x: 104, y: 60, label: "Social Ads", detail: "Targetowane kampanie w social media z A/B testami.", color: "220 90% 60%" },
  { x: 0, y: 120, label: "Community", detail: "Zaangażowana społeczność wokół produktu przed premierą.", color: "160 70% 50%" },
  { x: -104, y: 60, label: "Content", detail: "Strategiczna treść budująca autorytet i organiczny ruch.", color: "30 90% 55%" },
  { x: -104, y: -60, label: "Analytics", detail: "Śledzenie sygnałów popytu i optymalizacja w czasie rzeczywistym.", color: "340 80% 60%" },
];

const smallDots = [
  { x: 55, y: -110, size: 3, delay: 0.4 },
  { x: 110, y: 55, size: 3, delay: 1.0 },
  { x: -55, y: 110, size: 3, delay: 1.6 },
  { x: -110, y: -55, size: 3, delay: 2.3 },
  { x: 85, y: -85, size: 4, delay: 0.3 },
  { x: -85, y: 85, size: 4, delay: 1.5 },
];

const SystemSection = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

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
            className="relative w-[320px] h-[320px] mx-auto hidden lg:flex items-center justify-center"
          >
            {/* Orbit ring */}
            <svg className="absolute inset-0 w-full h-full" viewBox="-160 -160 320 320">
              <motion.circle
                cx={0} cy={0} r={120}
                fill="none"
                stroke="hsl(253 100% 62% / 0.12)"
                strokeWidth={1}
                strokeDasharray="4 6"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              />
              {/* Connection lines to active node */}
              {orbitNodes.map((node, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={0} y1={0} x2={node.x} y2={node.y}
                  stroke={`hsl(${node.color} / ${activeNode === i ? 0.4 : 0.1})`}
                  strokeWidth={activeNode === i ? 1.5 : 0.5}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                />
              ))}
            </svg>

            {/* Small ambient dots */}
            {smallDots.map((dot, i) => (
              <motion.div
                key={`small-${i}`}
                className="absolute rounded-full bg-primary/30"
                style={{
                  width: dot.size,
                  height: dot.size,
                  left: `calc(50% + ${dot.x}px - ${dot.size / 2}px)`,
                  top: `calc(50% + ${dot.y}px - ${dot.size / 2}px)`,
                }}
                animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: dot.delay }}
              />
            ))}

            {/* Clickable orbit nodes */}
            {orbitNodes.map((node, i) => (
              <motion.button
                key={`node-${i}`}
                className="absolute z-20 group"
                style={{
                  left: `calc(50% + ${node.x}px - 18px)`,
                  top: `calc(50% + ${node.y}px - 18px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveNode(activeNode === i ? null : i)}
              >
                {/* Pulse ring on active */}
                {activeNode === i && (
                  <motion.div
                    className="absolute inset-[-8px] rounded-full border-2"
                    style={{ borderColor: `hsl(${node.color} / 0.5)` }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: `hsl(${node.color})`,
                    boxShadow: activeNode === i
                      ? `0 0 20px hsl(${node.color} / 0.6)`
                      : `0 0 10px hsl(${node.color} / 0.3)`,
                  }}
                >
                  {node.label.slice(0, 2).toUpperCase()}
                </div>
                {/* Hover label */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-7 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-semibold text-primary-foreground bg-primary/90 px-2 py-0.5 rounded-md pointer-events-none">
                  {node.label}
                </div>
              </motion.button>
            ))}

            {/* Detail popup */}
            <AnimatePresence>
              {activeNode !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute z-30 bottom-[-80px] left-1/2 -translate-x-1/2 w-[260px] bg-card/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-border/50"
                >
                  <button
                    onClick={() => setActiveNode(null)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={14} />
                  </button>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: `hsl(${orbitNodes[activeNode].color})` }}
                    />
                    <span className="text-sm font-bold">{orbitNodes[activeNode].label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {orbitNodes[activeNode].detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulsing rings */}
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
              className="relative z-10 w-16 h-16 rounded-full bg-primary flex flex-col items-center justify-center cursor-pointer"
              animate={{
                boxShadow: [
                  "0 0 30px hsl(253 100% 62% / 0.3)",
                  "0 0 50px hsl(253 100% 62% / 0.5)",
                  "0 0 30px hsl(253 100% 62% / 0.3)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveNode(null)}
            >
              <span className="text-xs font-bold text-primary-foreground leading-none">MVA</span>
              <span className="text-[8px] font-semibold text-primary-foreground/70 leading-none mt-0.5">CORE</span>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute top-2 right-[-10px] bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-border/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
              animate={{ y: [0, -6, 0] }}
            >
              <p className="text-[9px] font-semibold text-muted-foreground tracking-wide">GROWTH</p>
              <p className="text-sm font-extrabold text-primary">+1,000 →</p>
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-[-16px] bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-border/50"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.5 }}
              animate={{ y: [0, 6, 0] }}
            >
              <p className="text-[9px] font-semibold text-muted-foreground tracking-wide">DEMAND</p>
              <p className="text-sm font-extrabold text-primary">↑ 94%</p>
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
      whileHover={{ scale: 1.02, borderColor: "hsl(253 100% 62% / 0.4)" }}
      className="rounded-card border p-7 group cursor-default transition-shadow hover:shadow-[0_0_30px_hsl(253_100%_62%/0.08)]"
      style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="text-primary" size={20} />
        </motion.div>
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
