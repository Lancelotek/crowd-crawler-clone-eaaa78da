import { motion } from "framer-motion";
import { Award, Rocket, Users, BookOpen, Linkedin } from "lucide-react";
import portrait from "@/assets/founder-portrait.png";

const highlights = [
  { icon: Rocket, text: "Multiple successful product launches" },
  { icon: Users, text: "Audience growth strategies for 3,000+ founders" },
  { icon: BookOpen, text: "Creator & founder mentoring programs" },
  { icon: Award, text: "Demand validation specialist" },
];

const FounderSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">About The Creator</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Built By A <span className="text-primary">Launch Strategist</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-card overflow-hidden bg-secondary max-w-[400px] mx-auto">
              <img src={portrait} alt="Founder" className="w-full h-auto object-contain" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-display text-xl font-extrabold text-foreground">Marek Ciesla</h3>
              <a
                href="https://www.linkedin.com/in/marekciesla/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Built multiple successful launches and helped founders validate ideas before building products. Focused on audience-first product development and demand validation strategies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The MVA Framework was born from years of experience working with creators and startups — seeing the same pattern over and over: products launched to silence because the audience wasn't built first.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 bg-secondary rounded-card p-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <h.icon className="text-primary" size={16} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{h.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
