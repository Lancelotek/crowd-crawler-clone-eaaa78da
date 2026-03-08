import { motion } from "framer-motion";
import { Flame, ShoppingBag, Code, GitBranch } from "lucide-react";

const cases = [
  { icon: Flame, title: "Crowdfunding Launch", desc: "Kickstarter campaigns with ready backers from day one." },
  { icon: ShoppingBag, title: "eCommerce Launch", desc: "Products launching with pre-built demand and email lists." },
  { icon: Code, title: "SaaS Beta", desc: "Waitlists and early adopters before product release." },
  { icon: GitBranch, title: "Product Spin-offs", desc: "Testing new product ideas without full GTM risk." },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-24 px-6 bg-card">
      <div className="container mx-auto max-w-[1100px]">
        <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Use Cases</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-14">
          Works Across<br /><span className="text-primary">Launch Types</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background rounded-card border border-border p-7 hover:border-primary/30 transition-colors group"
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
