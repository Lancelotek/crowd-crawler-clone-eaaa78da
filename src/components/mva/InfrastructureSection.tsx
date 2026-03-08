import { motion } from "framer-motion";
import { Users, Video, BarChart3, Megaphone, Mail, ShoppingCart } from "lucide-react";

const cards = [
  { icon: Users, title: "Community Seeding", desc: "Reddit, Discord, niche forums — planting seeds where your audience already lives." },
  { icon: Video, title: "Content Engine", desc: "Short-form video and creator amplification to drive organic discovery." },
  { icon: BarChart3, title: "Demand Signals", desc: "Search data, community trends, and category signals to validate direction." },
  { icon: Megaphone, title: "Launch Amplification", desc: "Ads, creators, PR, and partnerships for maximum launch-day impact." },
  { icon: Mail, title: "Audience Capture", desc: "Email lists and waitlists that convert interested visitors into subscribers." },
  { icon: ShoppingCart, title: "Conversion Engine", desc: "Pre-orders, crowdfunding pages, and beta launches that generate revenue." },
];

const InfrastructureSection = () => {
  return (
    <section className="dark-section py-24 px-6">
      <div className="container mx-auto max-w-[1100px]">
        <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Launch Infrastructure</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-14">
          Growth Infrastructure<br />Behind the <span className="text-primary">MVA System</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-card border p-7 hover:border-primary/40 transition-colors group"
              style={{ backgroundColor: "hsl(265 60% 12%)", borderColor: "hsl(265 30% 20%)" }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <c.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-base font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
