import { motion } from "framer-motion";
import { Code, Mic, BookOpen, Wrench } from "lucide-react";

const cases = [
  { icon: Code, title: "SaaS Founders", desc: "Validate startup ideas before building anything." },
  { icon: Mic, title: "Creators", desc: "Build a fanbase before selling products or services." },
  { icon: BookOpen, title: "Course Creators", desc: "Launch with a pre-built audience ready to buy." },
  { icon: Wrench, title: "Indie Makers", desc: "Avoid building products nobody wants." },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-24 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Use Cases</p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-14">
          Works Across Different<br /><span className="text-primary">Launch Types</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-card border border-border p-7 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <c.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
