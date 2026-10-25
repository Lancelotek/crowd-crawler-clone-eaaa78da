import portrait from "@/assets/founder-portrait.webp";
import maciejPortrait from "@/assets/maciej-portrait.webp";
import { useLanguage } from "@/i18n/LanguageContext";

type Person = {
  name: string;
  role: { en: string; pl: string };
  img: string;
  imgClass: string;
  link: { href: string; label: string };
  desc: string[];
  facts: string[];
};

const FounderSection = () => {
  const { t, lang } = useLanguage();

  const people: Person[] = [
    {
      name: "Marek Cieśla",
      role: { en: "Strategy, ads, launch", pl: "Strategia, reklamy, launch" },
      img: portrait,
      imgClass: "object-contain",
      link: { href: "https://www.linkedin.com/in/marekciesla/", label: "LinkedIn" },
      desc: [t("founder", "marekDesc1"), t("founder", "marekDesc2")],
      facts: [t("founder", "marekH1"), t("founder", "marekH2"), t("founder", "marekH3"), t("founder", "marekH4")],
    },
    {
      name: "Maciej Mikołajek",
      role: { en: "Pages, funnels, automation", pl: "Strony, funnele, automatyzacje" },
      img: maciejPortrait,
      imgClass: "object-cover object-top",
      link: { href: "https://mikolajek.xyz", label: "mikolajek.xyz" },
      desc: [t("founder", "maciejDesc1"), t("founder", "maciejDesc2")],
      facts: [t("founder", "maciejH1"), t("founder", "maciejH2")],
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto max-w-[1200px]">
        <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-1.8px] text-[clamp(30px,4vw,52px)] mb-12">
          {t("founder", "title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
          {people.map((p) => (
            <article key={p.name}>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-6 items-end mb-6">
                <div className="aspect-[4/5] overflow-hidden rounded-card bg-[#ededf3]">
                  <img src={p.img} alt={p.name} width={360} height={450} loading="lazy" decoding="async" className={`w-full h-full ${p.imgClass}`} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold uppercase text-[26px] leading-none tracking-[-0.5px]">{p.name}</h3>
                  <p className="text-[14px] text-muted-foreground mt-2">{p.role[lang]}</p>
                  <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="inline-block text-[14px] font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary mt-3">
                    {p.link.label}
                  </a>
                </div>
              </div>
              {p.desc.map((d, i) => (
                <p key={i} className="text-[16px] leading-[1.7] text-foreground/80 mb-4">{d}</p>
              ))}
              <ul className="mt-6 border-t border-border">
                {p.facts.map((f) => (
                  <li key={f} className="py-2.5 border-b border-border text-[15px] font-medium">{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
