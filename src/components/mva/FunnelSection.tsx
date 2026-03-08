import { motion } from "framer-motion";

const stages = [
  { label: "Niche Discovery", pct: "100%" },
  { label: "Content Seeding", pct: "75%" },
  { label: "Audience Capture", pct: "55%" },
  { label: "Email List", pct: "40%" },
  { label: "Community", pct: "28%" },
  { label: "Early Buyers", pct: "15%" },
  { label: "Launch", pct: "8%" },
];

const FunnelSection = () => {
  return (
    <section id="funnel" className="py-24 px-6 bg-card">
      <div className="container mx-auto max-w-[900px]">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">MVA Funnel</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            From Discovery<br />to <span className="text-primary">Launch</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The funnel builds a qualified audience before the product launches — so day one already has customers.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          {stages.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center justify-between px-8 py-4 font-semibold text-sm tracking-wide rounded-lg transition-all hover:brightness-110"
              style={{
                width: `${100 - i * 10}%`,
                backgroundColor: `hsl(253 100% ${62 + i * 4}% / ${1 - i * 0.1})`,
                color: i < 4 ? "hsl(0 0% 100%)" : "hsl(253 100% 95%)",
              }}
            >
              <span>{s.label}</span>
              <span className="text-xs opacity-60">{s.pct}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunnelSection;
