import { motion } from "framer-motion";
import caseWoolet from "@/assets/case-woolet.jpg";
import caseChernobylite from "@/assets/case-chernobylite.jpg";
import caseSwimmo from "@/assets/case-swimmo.jpg";
import caseGamedec from "@/assets/case-gamedec.jpg";
import caseSherly from "@/assets/case-sherly.jpg";
import caseCitywood from "@/assets/case-citywood.jpg";
import casePureshape from "@/assets/case-pureshape.jpg";
import caseNapospy from "@/assets/case-napospy.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const cases = [
  { image: caseWoolet, title: "Woolet", desc: "Full crowdfunding campaign: strategy, A/B testing, and website creation.", metric: "$332 694" },
  { image: caseChernobylite, title: "Chernobylite", desc: "Survival horror game with open-world exploration and non-linear storyline.", metric: "$206 671" },
  { image: caseSwimmo, title: "Swimmo", desc: "End-to-end campaign: social media, paid ads, email marketing & growth hacking.", metric: "$184 305" },
  { image: caseGamedec, title: "Gamedec", desc: "Cyberpunk RPG set in the 22nd century. Funded in just 36 hours on Kickstarter.", metric: "$171 163" },
  { image: caseSherly, title: "Sher.ly", desc: "Full market launch: branding, website, crowdfunding campaign & sales optimization.", metric: "$154 106" },
  { image: caseCitywood, title: "Citywood", desc: "Minimal laser-cut 3D wooden maps of cities you love. Perfect for home & office.", metric: "$121 279" },
  { image: casePureshape, title: "PureShape", desc: "Mousepad for Apple Magic Mouse — less friction, more precision and freedom.", metric: "$27 075" },
  { image: caseNapospy, title: "NapoSpy", desc: "Smart leather gloves with tracking, remote buzzer, and touchscreen functionality.", metric: "$7 248" },
];

const CaseStudiesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="case-studies" className="py-20 px-6 bg-secondary">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide">{t("caseStudies", "eyebrow")}</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            {t("caseStudies", "title")}<br /><span className="text-primary">{t("caseStudies", "titleAccent")}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cases.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }} className="bg-card rounded-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-display text-base font-bold mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-3">{c.desc}</p>
                <div className="bg-primary/10 rounded-lg px-3 py-2.5 text-center">
                  <div className="font-display text-lg font-extrabold text-primary">{c.metric}</div>
                  <p className="text-[11px] font-semibold text-muted-foreground tracking-wide">{t("caseStudies", "fundsRaised")}</p>
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
