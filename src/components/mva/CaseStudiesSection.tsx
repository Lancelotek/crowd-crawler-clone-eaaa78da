import { motion } from "framer-motion";
import { Rocket, Users, ShoppingBag } from "lucide-react";

const cases = [
  { icon: Rocket, type: "SaaS Founder", metric: "2,400", metricLabel: "waitlist subscribers", result: "$82k launch revenue" },
  { icon: Users, type: "Creator", metric: "6,000", metricLabel: "newsletter audience", result: "Sold out course in 48h" },
  { icon: ShoppingBag, type: "Indie Maker", metric: "1,300", metricLabel: "early fans", result: "Profitable from day one" },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-16 px-6 bg-secondary">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide">Case Studies</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            Successful Launches Using<br /><span className="text-primary">Audience-First Strategy</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-card rounded-card border border-border p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                <c.icon className="text-primary" size={20} />
              </div>
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide mb-2">{c.type.toUpperCase()}</p>
              <div className="font-display text-3xl font-extrabold text-primary mb-0.5">{c.metric}</div>
              <p className="text-xs text-muted-foreground mb-3">{c.metricLabel}</p>
              <div className="bg-primary/8 rounded-lg px-3 py-2">
                <p className="text-sm font-semibold text-foreground">{c.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
