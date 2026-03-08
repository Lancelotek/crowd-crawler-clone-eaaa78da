import { motion } from "framer-motion";
import { Target } from "lucide-react";

const examples = [
  { title: "Kickstarter Launch", mva: "3,000 email subscribers", desc: "Enough to guarantee funding on day one." },
  { title: "DTC Product Launch", mva: "5,000 audience", desc: "Community + email list for a profitable first batch." },
  { title: "SaaS Beta Launch", mva: "1,500 waitlist", desc: "Sufficient early adopters for product-market fit signals." },
];

const MetricSection = () => {
  return (
    <section id="metrics" className="py-24 px-6">
      <div className="container mx-auto max-w-[1100px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">The MVA Metric</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            How Big Should Your<br /><span className="text-primary">Audience Be?</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            The Minimum Viable Audience is the smallest audience required to guarantee a successful launch. It varies by product type, price point, and conversion rate.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {examples.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-card rounded-card border border-border p-8 text-center hover:border-primary/30 transition-colors"
            >
              <Target className="text-primary mx-auto mb-4" size={24} />
              <h3 className="font-display text-lg font-bold mb-1">{e.title}</h3>
              <div className="font-display text-2xl font-extrabold text-primary mb-2">{e.mva}</div>
              <p className="text-sm text-muted-foreground">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricSection;
