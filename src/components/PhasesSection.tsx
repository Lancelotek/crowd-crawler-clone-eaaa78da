const phases = [
  {
    num: "01",
    week: "Week 1–3",
    title: "Niche Discovery",
    desc: "Find your unique angle. Don't copy what everyone does — build a viewpoint that attracts people through polarisation, not compromise.",
    items: [
      "Competitor gap analysis",
      "ICA definition (Ideal Content Avatar)",
      "Content Pillar Mapping (3–5 pillars)",
      "Hook banking — first 30 ideas",
      "Select 1 platform as headquarters",
    ],
  },
  {
    num: "02",
    week: "Week 4–8",
    title: "Traction Engine",
    desc: "Launch the testing machine. Every post is a hypothesis. Data decides what to scale — intuition decides what to create.",
    items: [
      "Content Velocity: 5–7 posts/week",
      "A/B tests on hooks and formats",
      "Micro-ads: $5–$20/day cold audiences",
      "Engagement loops and replies",
      "First 100 true fans identification",
    ],
  },
  {
    num: "03",
    week: "Week 9–12",
    title: "MVA Amplification",
    desc: "You know what works. Now push. Scale winning formats, fuel paid distribution and close your first 1,000 true fans.",
    items: [
      "Scaled ads on proven content",
      "Lookalike audiences from engagers",
      "Community activation (Discord, newsletter)",
      "Collabs and cross-promos in niche",
      "MVA Event: launch / challenge / drop",
    ],
  },
];

const PhasesSection = () => {
  return (
    <section id="phases" className="py-24 px-6">
      <div className="container mx-auto">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          // 03 Build Phases
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.94] tracking-tight mb-16">
          From Zero to
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>
            True Fans
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {phases.map((phase) => (
            <div key={phase.num} className="bg-card p-8 md:p-10 relative overflow-hidden group hover:bg-secondary transition-colors">
              <span className="absolute right-3 top-1 text-[96px] font-black leading-none text-primary/5 select-none">
                {phase.num}
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-destructive mb-3">
                {phase.week}
              </p>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-3">{phase.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-7">{phase.desc}</p>
              <ul className="flex flex-col gap-2.5">
                {phase.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground/65 pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-primary before:text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhasesSection;
