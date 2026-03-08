import { motion } from "framer-motion";
import caseWoolet from "@/assets/case-woolet.jpg";
import caseChernobylite from "@/assets/case-chernobylite.jpg";
import caseSwimmo from "@/assets/case-swimmo.jpg";
import caseGamedec from "@/assets/case-gamedec.jpg";
import caseSherly from "@/assets/case-sherly.jpg";
import caseCitywood from "@/assets/case-citywood.jpg";
import casePureshape from "@/assets/case-pureshape.jpg";
import caseNapospy from "@/assets/case-napospy.jpg";

const cases = [
  {
    image: caseWoolet,
    title: "Woolet",
    desc: "Full crowdfunding campaign: strategy, A/B testing, and website creation.",
    metric: "$332 694",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseChernobylite,
    title: "Chernobylite",
    desc: "Survival horror game with open-world exploration and non-linear storyline.",
    metric: "$206 671",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseSwimmo,
    title: "Swimmo",
    desc: "End-to-end campaign: social media, paid ads, email marketing & growth hacking.",
    metric: "$184 305",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseGamedec,
    title: "Gamedec",
    desc: "Cyberpunk RPG set in the 22nd century. Funded in just 36 hours on Kickstarter.",
    metric: "$171 163",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseSherly,
    title: "Sher.ly",
    desc: "Full market launch: branding, website, crowdfunding campaign & sales optimization.",
    metric: "$154 106",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseCitywood,
    title: "Citywood",
    desc: "Minimal laser-cut 3D wooden maps of cities you love. Perfect for home & office.",
    metric: "$121 279",
    metricLabel: "Total Funds Raised",
  },
  {
    image: casePureshape,
    title: "PureShape",
    desc: "Mousepad for Apple Magic Mouse — less friction, more precision and freedom.",
    metric: "$27 075",
    metricLabel: "Total Funds Raised",
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-20 px-6 bg-secondary">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide">Case Studies</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            Successful Launches Using<br />
            <span className="text-primary">Audience-First Strategy</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-card rounded-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-display text-base font-bold mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-3">{c.desc}</p>

                <div className="bg-primary/10 rounded-lg px-3 py-2.5 text-center">
                  <div className="font-display text-lg font-extrabold text-primary">{c.metric}</div>
                  <p className="text-[11px] font-semibold text-muted-foreground tracking-wide">{c.metricLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
