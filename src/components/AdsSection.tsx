import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const rows = [
  { phase: "PHASE 1", campaign: "Content Boost — Top Posts", budget: "$5–$10", objective: "Reach + Engagement", audience: "Cold: Interest targeting (niche)" },
  { phase: "PHASE 1", campaign: "Profile Visit Ads", budget: "$5", objective: "Follows", audience: "Cold: Similar interests" },
  { phase: "PHASE 2", campaign: "Video View Campaigns", budget: "$15–$25", objective: "ThruPlay + Retargeting seed", audience: "Cold: Broad + Interests" },
  { phase: "PHASE 2", campaign: "Retargeting Engagers", budget: "$10", objective: "Convert to follow / click", audience: "Warm: Page engagers 30 days" },
  { phase: "PHASE 3", campaign: "Lookalike 1% Followers", budget: "$30–$50", objective: "Scaled growth", audience: "LAL: current followers" },
  { phase: "PHASE 3", campaign: "Community Launch Ads", budget: "$20–$40", objective: "Discord / Newsletter join", audience: "Warm: All engagers + LAL" },
];

const rules = [
  { id: "RULE_01", title: "Boost Only Proven Content", desc: "Never pay to boost a post that didn't work organically. Minimum threshold: 3× average reach before boosting." },
  { id: "RULE_02", title: "Measure CPF Not CPM", desc: "Cost Per Follow is the only MVA metric that matters. Everything else is a vanity metric until you hit 1K true fans." },
  { id: "RULE_03", title: "Always Retarget", desc: "A person who saw 3 posts is 12× more likely to convert. Set your pixel and build audiences from day 1." },
];

const AdsSection = () => {
  return (
    <section id="ads" className="py-24 px-6 bg-card">
      <div className="container mx-auto">
        <ScrollReveal>
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Paid Growth Stack</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-16">
            Ad<br />
            <span className="text-primary">Strategy</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto mb-6 rounded-card border border-border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  {["Phase", "Campaign Type", "Budget/day", "Objective", "Audience"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold px-5 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{r.phase}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.campaign}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.budget}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.objective}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.audience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-card border border-border p-7"
            >
              <p className="text-xs font-medium text-primary mb-2.5">{rule.id}</p>
              <h3 className="font-display text-base font-bold mb-2">{rule.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{rule.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdsSection;