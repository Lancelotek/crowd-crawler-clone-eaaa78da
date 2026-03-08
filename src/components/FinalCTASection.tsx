import ScrollReveal from "./ScrollReveal";

const checklist = [
  "Full content audit (worth $300)",
  "Custom MVA roadmap for your niche",
  "Top 3 growth hacks for your platform",
  "Ad strategy recommendations",
  "Zero sales pitch — pure strategy",
];

const FinalCTASection = () => {
  return (
    <section id="book-call" className="py-24 px-6 bg-primary">
      <div className="container mx-auto max-w-[800px] text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.94] tracking-tight text-primary-foreground mb-6">
            Ready to Build Your<br />First 1,000 True Fans?
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto leading-relaxed mb-10">
            Book a free 30-minute strategy call. We'll audit your current content, identify your 3 biggest growth gaps, and give you a custom 90-day MVA roadmap.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ul className="flex flex-col gap-2.5 items-center mb-10">
            {checklist.map((item, i) => (
              <li key={i} className="text-sm text-primary-foreground/90 font-medium">
                ✓ {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-background text-foreground px-10 py-4 font-bold text-sm uppercase tracking-[0.1em] hover:opacity-90 transition-opacity mb-4"
          >
            Book Your Free Strategy Call →
          </a>
          <p className="mt-4 text-primary-foreground/60 text-sm font-semibold">
            <span className="animate-blink inline-block text-destructive">🔴</span> Only 3 spots available this month
          </p>
          <p className="font-mono text-[10px] text-primary-foreground/50 tracking-wide mt-2">
            No commitment required. 30 minutes. 100% free.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTASection;