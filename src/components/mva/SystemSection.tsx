import { motion } from "framer-motion";
import { Search, Users, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Demand Discovery",
    desc: "Identify niche audiences and real market demand before building anything.",
    bullets: ["Keyword demand analysis", "Community insights mapping", "Market gap identification"],
  },
  {
    icon: Users,
    step: "02",
    title: "Audience Build",
    desc: "Grow your Minimum Viable Audience through organic and strategic channels.",
    bullets: ["Waitlist creation", "Email capture systems", "Community building", "Content seeding"],
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch Amplification",
    desc: "Convert your audience into launch-day momentum and early revenue.",
    bullets: ["Pre-order campaigns", "Crowdfunding launches", "Early adopter activation", "Product launch events"],
  },
];

const SystemSection = () => {
  return (
    <section id="system" className="dark-section py-24 px-6">
      <div className="container mx-auto max-w-[1100px]">
        <p className="text-xs font-semibold text-primary mb-3 tracking-wide">The MVA System</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          The Demand Engine Behind<br />
          <span className="text-primary">Successful Launches</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mb-16">Three phases that take you from zero audience to launch-ready demand.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="rounded-card border p-8 hover:border-primary/40 transition-colors"
              style={{
                backgroundColor: "hsl(265 60% 12%)",
                borderColor: "hsl(265 30% 20%)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <s.icon className="text-primary" size={20} />
                </div>
                <span className="text-xs font-bold text-primary/60 tracking-widest">STEP {s.step}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2">
                {s.bullets.map((b, j) => (
                  <li key={j} className="text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemSection;
