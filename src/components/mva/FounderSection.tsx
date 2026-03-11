import { motion } from "framer-motion";
import { Award, Rocket, Users, BookOpen, Linkedin, Code, Globe } from "lucide-react";
import portrait from "@/assets/founder-portrait.png";
import maciejPortrait from "@/assets/maciej-portrait.png";

const marekHighlights = [
  { icon: Rocket, text: "Multiple successful product launches" },
  { icon: Users, text: "Audience growth strategies for 3,000+ founders" },
  { icon: BookOpen, text: "Creator & founder mentoring programs" },
  { icon: Award, text: "Demand validation specialist" },
];

const maciejHighlights = [
  { icon: Code, text: "Full-stack founder & engineer" },
  { icon: Rocket, text: "From zero to pilot in 2 months (ReaktorX)" },
  { icon: Award, text: "AI-first product builder" },
  { icon: Globe, text: "Backed by Smok VC & ReaktorX" },
];

const FounderSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">About The Creators</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Built By <span className="text-primary">Launch Strategists</span>
          </h2>
        </div>

        {/* Marek */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-card overflow-hidden bg-secondary max-w-[400px] mx-auto">
              <img src={portrait} alt="Marek Ciesla — Launch Strategist" className="w-full h-auto object-contain" />
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
              {marekHighlights.map((h, i) => (
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

        {/* Maciej */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative md:order-2"
          >
            <div className="rounded-card overflow-hidden bg-secondary max-w-[400px] mx-auto">
              <img src={maciejPortrait} alt="Maciej Mikołajek — Founder & Engineer" className="w-full h-auto object-contain" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:order-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-display text-xl font-extrabold text-foreground">Maciej Mikołajek</h3>
              <a
                href="https://mikolajek.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe size={18} />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founder & engineer obsessed with clarity and products that don't waste people's time. From visual programming languages at Enso to building AI-first tools — Maciej designs and ships fast, calm products for people drowning in complexity.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Currently running SalesPad.ai (concept to real-world pilot in 2 months), previously built Blinkfeed — a privacy-first AI email client. Backed by ReaktorX & Smok VC. Dropped out of a Masters to go all-in on building.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {maciejHighlights.map((h, i) => (
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
