import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const results = [
  {
    metric: "0 → 4,200 followers",
    detail: "In 11 weeks. E-commerce founder, fashion niche.",
    extra: "Started with 0 budget. Phase 3: $800/month ads.",
  },
  {
    metric: "847 true fans acquired",
    detail: "In 90 days. Business coach, LinkedIn + Instagram.",
    extra: "3 high-ticket clients from the first 200 followers.",
  },
  {
    metric: "12× reach increase",
    detail: "In 6 weeks. Photographer, no paid ads.",
    extra: "Algorithm change + content system redesign.",
  },
];

const SocialProofSection = () => {
  return (
    <section id="results" className="py-24 px-6">
      <div className="container mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">// Client Results</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.94] tracking-tight mb-16">
            What Happens When<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>You Build MVA</span>
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card p-8 md:p-10 relative overflow-hidden group hover:bg-secondary transition-colors"
            >
              <div className="font-display text-3xl font-black text-primary leading-tight mb-3">{r.metric}</div>
              <p className="text-sm text-foreground leading-relaxed mb-2">{r.detail}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{r.extra}</p>
              <div className="text-primary text-sm tracking-wider">★★★★★</div>
            </motion.div>
          ))}
        </div>
        <ScrollReveal>
          <p className="font-mono text-[10px] text-muted-foreground text-center mt-6 tracking-wide uppercase">
            Results based on aggregated client data
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SocialProofSection;