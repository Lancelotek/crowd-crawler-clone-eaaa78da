import { motion } from "framer-motion";
import caseWoolet from "@/assets/case-woolet.jpg";
import caseChernobylite from "@/assets/case-chernobylite.jpg";
import caseSwimmo from "@/assets/case-swimmo.jpg";
import caseGamedec from "@/assets/case-gamedec.jpg";
import caseSherly from "@/assets/case-sherly.jpg";
import caseCitywood from "@/assets/case-citywood.jpg";
import casePureshape from "@/assets/case-pureshape.jpg";

const cases = [
  {
    image: caseWoolet,
    title: "Woolet",
    desc: "As part of our collaboration, we prepared and executed a crowdfunding campaign, including A/B testing, strategy development, and website creation.",
    metric: "$332 694",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseChernobylite,
    title: "Chernobylite",
    desc: '"Chernobylite" is a survival horror game featuring open-world exploration, a non-linear storyline, challenging encounters and combat, and a unique crafting system.',
    metric: "$206 671",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseSwimmo,
    title: "Swimmo",
    desc: "We managed the crowdfunding campaign end-to-end. Our work included social media communication, paid advertising campaigns (Facebook Ads and Google Ads), email marketing, and growth hacking initiatives.",
    metric: "$184 305",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseGamedec,
    title: "Gamedec",
    desc: '"Gamedec" is a cyberpunk RPG set in the 22nd century. You play as a detective solving crimes in virtual worlds. The choices you make shape the course of the game.',
    metric: "$171 163",
    metricLabel: "Total Funds Raised",
  },
  {
    image: caseSherly,
    title: "Sher.ly",
    desc: "Dla Sher.ly zajęliśmy się pełnym wypuszczeniem usługi na rynek. Od kreacji, brandingu, stworzeniem strony www po kampanię crowdfundingową, optymalizację sprzedaży i growth hacking.",
    metric: "$154 106",
    metricLabel: "Zebranych funduszy",
  },
  {
    image: caseCitywood,
    title: "Citywood",
    desc: "Piękne, minimalistyczne, wycinane laserowo mapy 3D, opowiadające o mieście, które kochasz. Idealne do domu i biura.",
    metric: "$121 279",
    metricLabel: "Zebranych funduszy",
  },
  {
    image: casePureshape,
    title: "PureShape",
    desc: "PureShape poprawia działanie Apple Magic Mouse, zmniejszając tarcie, aby poprawić jej swobodę i precyzję ruchu.",
    metric: "$27 075",
    metricLabel: "Zebranych funduszy",
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

        {/* Horizontal scroll on all sizes, grid on xl */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide xl:grid xl:grid-cols-7 xl:overflow-visible xl:pb-0">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="min-w-[220px] xl:min-w-0 snap-start bg-card rounded-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group flex flex-col"
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
              <div className="p-3 flex flex-col flex-1">
                <h3 className="font-display text-sm font-bold mb-1">{c.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-4">{c.desc}</p>

                {/* Metric badge */}
                <div className="bg-primary/10 rounded-lg px-3 py-2.5 text-center">
                  <div className="font-display text-base font-extrabold text-primary">{c.metric}</div>
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
