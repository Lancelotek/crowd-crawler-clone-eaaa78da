import { motion } from "framer-motion";
import { Target, RefreshCw, Zap, Users, Bookmark, BarChart3, Magnet, Flame } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import type { LucideIcon } from "lucide-react";

const tactics: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Target, title: "Comment Bombing", desc: "Leave 10 high-value comments daily on accounts followed by your ICA. Genuine insights that attract attention — not empty compliments." },
  { icon: RefreshCw, title: "Content Loops", desc: "Create posts that provoke a response from other creators. Contrarian opinions, rankings, unpopular takes — the algorithm rewards debate." },
  { icon: Zap, title: "Trend Surfing", desc: "Don't follow trends — attach your content to trending audio/hashtags as a backdrop for your own POV. External reach, internal brand." },
  { icon: Users, title: "Micro Collabs", desc: "Partner with creators 3×–10× bigger through value-first outreach: prepare a ready post idea for them. Outreach conversion increases 5×." },
  { icon: Bookmark, title: "Save Triggers", desc: "Every post needs \"save value\": list, rule, template, cheatsheet. Saves are the #1 distribution signal for the algorithm in 2025." },
  { icon: BarChart3, title: "Data-Driven Week", desc: "Every Sunday: review top 3 posts by reach. Find the pattern. Next week: 50% of content is variations of that winning pattern." },
  { icon: Magnet, title: "Lead Magnet Posts", desc: "Posts that promise value in response to a comment (\"comment WANT and I'll send you…\"). Builds engagement and contacts simultaneously." },
  { icon: Flame, title: "First Hour Push", desc: "First 60 min after publishing: reply to every comment, ask 5 trusted people to engage. The algorithm scores your post in 90 minutes." },
];

const GrowthSection = () => {
  return (
    <section id="growth" className="py-24 px-6 bg-card">
      <div className="container mx-auto">
        <ScrollReveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">// Organic Growth Tactics</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.94] tracking-tight mb-16">
            Growth<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>Hacking Stack</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {tactics.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.07 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="bg-card p-6 hover:bg-secondary transition-colors"
            >
              <t.icon className="w-7 h-7 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-extrabold uppercase tracking-tight mb-2">{t.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
