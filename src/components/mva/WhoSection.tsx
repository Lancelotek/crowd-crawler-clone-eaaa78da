import { motion } from "framer-motion";
import { Lightbulb, Box, ShoppingBag, Megaphone } from "lucide-react";

const personas = [
  { icon: Lightbulb, title: "Startup Founders", desc: "Launching their first product and needing validation before investing in development." },
  { icon: Box, title: "Product Teams", desc: "Testing new product ideas before committing full GTM resources and budget." },
  { icon: ShoppingBag, title: "eCommerce Brands", desc: "Building audience before inventory and ads to reduce launch risk." },
  { icon: Megaphone, title: "Crowdfunding Creators", desc: "Launching Kickstarter / Indiegogo campaigns with ready buyers on day one." },
];

const WhoSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="container mx-auto max-w-[1100px]">
        <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Who This Is For</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-14">
          Built for Builders<br />Who Ship <span className="text-primary">Products</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background rounded-card border border-border p-7 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <p.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoSection;
