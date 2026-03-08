import { motion } from "framer-motion";
import { Rocket, Users, ShoppingBag } from "lucide-react";

const cases = [
  {
    icon: Rocket,
    type: "AI SaaS",
    metric: "2,400",
    metricLabel: "waitlist subscribers",
    result: "$82k launch revenue",
  },
  {
    icon: Users,
    type: "Creator Course",
    metric: "5,100",
    metricLabel: "newsletter audience",
    result: "Sold out in 48 hours",
  },
  {
    icon: ShoppingBag,
    type: "Indie Product",
    metric: "1,300",
    metricLabel: "early fans",
    result: "Profitable from day one",
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Case Studies</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Successful Launches Using<br /><span className="text-primary">Audience-First Strategy</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-card border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                <c.icon className="text-primary" size={22} />
              </div>
              <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-3">{c.type.toUpperCase()}</p>
              <div className="font-display text-4xl font-extrabold text-primary mb-1">{c.metric}</div>
              <p className="text-xs text-muted-foreground mb-4">{c.metricLabel}</p>
              <div className="bg-primary/8 rounded-lg px-4 py-2.5">
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
