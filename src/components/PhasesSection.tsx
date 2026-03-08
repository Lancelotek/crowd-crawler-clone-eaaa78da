import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const phases = [
  {
    num: "01",
    week: "Week 1–3",
    title: "Niche Discovery",
    desc: "Find your unique angle. Don't copy what everyone does — build a viewpoint that attracts people through polarisation, not compromise.",
    items: ["Competitor gap analysis", "ICA definition (Ideal Content Avatar)", "Content Pillar Mapping (3–5 pillars)", "Hook banking — first 30 ideas", "Select 1 platform as headquarters"],
    result: "Client X went from 200 to 800 followers in 3 weeks",
  },
  {
    num: "02",
    week: "Week 4–8",
    title: "Traction Engine",
    desc: "Launch the testing machine. Every post is a hypothesis. Data decides what to scale — intuition decides what to create.",
    items: ["Content Velocity: 5–7 posts/week", "A/B tests on hooks and formats", "Micro-ads: $5–$20/day cold audiences", "Engagement loops and replies", "First 100 true fans identification"],
    result: "Average 3.2× reach increase by week 6",
  },
  {
    num: "03",
    week: "Week 9–12",
    title: "MVA Amplification",
    desc: "You know what works. Now push. Scale winning formats, fuel paid distribution and close your first 1,000 true fans.",
    items: ["Scaled ads on proven content", "Lookalike audiences from engagers", "Community activation (Discord, newsletter)", "Collabs and cross-promos in niche", "MVA Event: launch / challenge / drop"],
    result: "847 true fans acquired in 90 days on average",
  },
];

const PhasesSection = () => {
  return (
    <section id="phases" className="py-24 px-6">
      <div className="container mx-auto">
        <ScrollReveal>
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">03 Build Phases</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-16">
            From Zero to<br />
            <span className="text-primary">True Fans</span>
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-5">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card rounded-card p-8 md:p-10 relative overflow-hidden border border-border hover:border-primary/30 transition-colors group"
            >
              <span className="absolute right-4 top-2 font-display text-[80px] font-extrabold leading-none text-primary/5 select-none">{phase.num}</span>
              <span className="inline-block text-xs font-semibold text-destructive bg-destructive/10 px-3 py-1 rounded-full mb-4">{phase.week}</span>
              <h3 className="font-display text-2xl font-bold mb-3">{phase.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-7">{phase.desc}</p>
              <ul className="flex flex-col gap-2.5 mb-6">
                {phase.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground/65 pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-primary before:text-xs">{item}</li>
                ))}
              </ul>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium text-primary">{phase.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhasesSection;