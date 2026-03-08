import { motion } from "framer-motion";
import caseSaas from "@/assets/case-saas.jpg";
import caseCourse from "@/assets/case-course.jpg";
import caseIndie from "@/assets/case-indie.jpg";
import caseNewsletter from "@/assets/case-newsletter.jpg";
import caseCommunity from "@/assets/case-community.jpg";

const cases = [
  {
    image: caseSaas,
    title: "SaaS Analytics",
    desc: "Built a 2,400-person waitlist using audience-first validation. A/B tested messaging, grew newsletter, and launched to warm demand.",
    metric: "$82,000",
    metricLabel: "Launch Revenue",
  },
  {
    image: caseCourse,
    title: "Creator Course",
    desc: "Grew a 6,000-subscriber newsletter with consistent content strategy. Sold out the flagship course within 48 hours of launch.",
    metric: "$206,671",
    metricLabel: "Total Revenue",
  },
  {
    image: caseIndie,
    title: "Indie Product",
    desc: "Cultivated 1,300 early fans through community-driven development. Achieved profitability from day one without paid ads.",
    metric: "$154,106",
    metricLabel: "First Year Revenue",
  },
  {
    image: caseNewsletter,
    title: "Newsletter Growth",
    desc: "Scaled from 0 to 34,000 subscribers in 6 months. Monetized through sponsorships and a premium tier with 12% conversion.",
    metric: "$171,163",
    metricLabel: "Annual Revenue",
  },
  {
    image: caseCommunity,
    title: "Community Platform",
    desc: "Built a paid community of 800+ members using the MVA framework. Validated demand before writing a single line of code.",
    metric: "$121,279",
    metricLabel: "Recurring Revenue",
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-16 px-6 bg-secondary">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide">Case Studies</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            Successful Launches Using<br />
            <span className="text-primary">Audience-First Strategy</span>
          </h2>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="min-w-[260px] md:min-w-0 snap-start bg-card rounded-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group flex flex-col"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-display text-sm font-bold mb-1.5">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{c.desc}</p>

                {/* Metric badge */}
                <div className="bg-primary/10 rounded-lg px-3 py-2.5 text-center">
                  <div className="font-display text-lg font-extrabold text-primary">{c.metric}</div>
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wide">{c.metricLabel}</p>
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
