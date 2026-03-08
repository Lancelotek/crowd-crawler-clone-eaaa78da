import { motion } from "framer-motion";
import { ArrowRight, PenLine } from "lucide-react";

const articles = [
  {
    title: "How To Build An Audience Before Launch",
    desc: "The step-by-step process to attract your first 1,000 fans before writing a single line of code.",
    tag: "Strategy",
  },
  {
    title: "Why Most Products Fail At Launch",
    desc: "The #1 mistake founders make — and how audience-first thinking fixes it.",
    tag: "Insights",
  },
  {
    title: "The Audience-First Startup Strategy",
    desc: "How to validate demand, build a community, and launch with momentum.",
    tag: "Framework",
  },
];

const AuthoritySection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Thought Leadership</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Insights On<br /><span className="text-primary">Building Demand</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <motion.a
              key={i}
              href="/blog"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background rounded-card border border-border p-7 hover:border-primary/30 hover:shadow-lg transition-all group block"
            >
              <div className="flex items-center gap-2 mb-4">
                <PenLine className="text-primary" size={16} />
                <span className="text-[10px] font-semibold text-primary tracking-wide">{a.tag.toUpperCase()}</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{a.desc}</p>
              <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read more <ArrowRight size={12} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
