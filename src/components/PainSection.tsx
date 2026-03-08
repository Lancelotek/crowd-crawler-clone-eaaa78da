import { motion } from "framer-motion";
import { Eye, Users, Repeat } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const cards = [
  {
    icon: Eye,
    title: "The Algorithm Trap",
    desc: "You post consistently but the algorithm shows your content to 2% of followers. Not because you're bad — because you don't have a distribution system.",
  },
  {
    icon: Users,
    title: "The Follower Illusion",
    desc: "10,000 followers who don't buy, engage, or share = 0 business value. MVA is about 1,000 people who become your tribe.",
  },
  {
    icon: Repeat,
    title: "The Content Treadmill",
    desc: "Without a system, content creation burns you out before you see results. You need leverage, not hustle.",
  },
];

const PainSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary">
      <div className="container mx-auto">
        <ScrollReveal>
          <p className="text-xs font-semibold text-destructive mb-3 tracking-wide">The Problem</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-16">
            Why Most Creators<br />
            <span className="text-primary">Are Stuck</span>
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card rounded-card p-8 md:p-10 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-destructive" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
        <ScrollReveal>
          <p className="text-center mt-10 text-muted-foreground">
            Sound familiar? →{" "}
            <a href="#quiz" className="text-primary font-semibold hover:underline">
              Take the Free Audit Quiz
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PainSection;