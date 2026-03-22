import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";

const content = {
  en: {
    seoTitle: "About JAY-23 — MVA Framework",
    seoDesc: "Meet the team behind the MVA Framework. JAY-23 helps founders build audiences before product launch.",
    heroTitle: "We help founders build an audience BEFORE they build a product",
    heroSub: "JAY-23 is a growth marketing studio specializing in prelaunch strategies and building Minimum Viable Audiences.",
    founderName: "Marek Ciesla",
    founderTitle: "Founder & CEO, JAY-23",
    bio1: "Marek Ciesla is a marketing strategist with over 10 years of experience building and launching digital and physical products. He has worked with 50+ startups and founders, helping them build audiences and generate demand before product launch.",
    bio2: "Creator of the MVA (Minimum Viable Audience) Framework — a 90-day methodology for building 1,000 true fans before the product hits the market. The audience-first approach that JAY-23 applies is based on combining content marketing, community building, and prelaunch strategy.",
    bio3: "Marek is also an experienced crowdfunding practitioner — he has collaborated on campaigns that collectively raised over $1M in funding on Kickstarter and Indiegogo.",
    whatWeDoTitle: "What we do",
    card1Title: "MVA Framework",
    card1Desc: "A 90-day audience-building program before launch. From idea to 1,000 ready customers.",
    card2Title: "Prelaunch Strategy",
    card2Desc: "Waitlist, content, community — we build demand for your product before you create it.",
    card3Title: "Growth Consulting",
    card3Desc: "Free 30-minute strategy consultation. We assess what you can do RIGHT NOW.",
    stat1: "50+ startup collaborations",
    stat2: "1,000+ founders on our list",
    stat3: "$1M+ raised in crowdfunding",
    stat4: "90 days to MVA",
    ctaTitle: "Want to build your MVA?",
    ctaCalc: "Calculate Your MVA",
    ctaBook: "Book a Free Consultation",
  },
  pl: {
    seoTitle: "O nas — JAY-23 MVA Framework",
    seoDesc: "Poznaj zespół stojący za MVA Framework. JAY-23 pomaga founderom budować publiczność przed premierą produktu.",
    heroTitle: "Pomagamy founderom budować publiczność ZANIM zbudują produkt",
    heroSub: "JAY-23 to studio growth marketingu specjalizujące się w strategiach prelaunch i budowaniu Minimum Viable Audience.",
    founderName: "Marek Cieśla",
    founderTitle: "Founder & CEO, JAY-23",
    bio1: "Marek Cieśla to strateg marketingowy z ponad 10-letnim doświadczeniem w budowaniu i launchowaniu produktów cyfrowych i fizycznych. Pracował z ponad 50 startupami i founderami, pomagając im budować publiczność i generować popyt przed premierą produktu.",
    bio2: "Twórca frameworka MVA (Minimum Viable Audience) — 90-dniowej metodologii budowania 1000 prawdziwych fanów zanim produkt trafi na rynek. Podejście audience-first, które JAY-23 stosuje, bazuje na połączeniu content marketingu, community buildingu i strategii prelaunch.",
    bio3: "Marek jest również doświadczonym praktykiem crowdfundingu — współpracował przy kampaniach, które łącznie pozyskały ponad $1M finansowania na platformach Kickstarter i Indiegogo.",
    whatWeDoTitle: "Co robimy",
    card1Title: "MVA Framework",
    card1Desc: "90-dniowy program budowania publiczności przed launchem. Od pomysłu do 1000 gotowych klientów.",
    card2Title: "Strategia Prelaunch",
    card2Desc: "Waitlist, content, community — budujemy popyt na Twój produkt zanim go stworzysz.",
    card3Title: "Growth Consulting",
    card3Desc: "Bezpłatna 30-minutowa konsultacja strategiczna. Sprawdzamy co możesz zrobić TERAZ.",
    stat1: "50+ współprac ze startupami",
    stat2: "1000+ founderów na naszej liście",
    stat3: "$1M+ pozyskane w crowdfundingu",
    stat4: "90 dni do MVA",
    ctaTitle: "Chcesz zbudować swoje MVA?",
    ctaCalc: "Oblicz swoje MVA",
    ctaBook: "Umów bezpłatną konsultację",
  },
};

const About = () => {
  const { lang, langPrefix } = useLanguage();
  const c = content[lang];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marek Ciesla",
    jobTitle: "Founder & CEO",
    worksFor: { "@type": "Organization", name: "JAY-23", url: "https://jay23.com" },
    url: `https://jay23.com${langPrefix}/about`,
    description: "Marketing strategist specializing in building Minimum Viable Audiences. Creator of the MVA Framework.",
    knowsAbout: ["Minimum Viable Audience", "prelaunch strategy", "community building", "crowdfunding", "growth marketing"],
  };

  const stats = [c.stat1, c.stat2, c.stat3, c.stat4];
  const cards = [
    { title: c.card1Title, desc: c.card1Desc },
    { title: c.card2Title, desc: c.card2Desc },
    { title: c.card3Title, desc: c.card3Desc },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={c.seoTitle}
        description={c.seoDesc}
        canonical={`${langPrefix}/about`}
        lang={lang}
        jsonLd={personJsonLd}
      />
      <MvaNavbar />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-[800px]">
          {/* Hero */}
          <section className="mb-20 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
              {c.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{c.heroSub}</p>
          </section>

          {/* Founder */}
          <section className="mb-20">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0" data-founder-photo>
                <span className="text-4xl font-bold text-primary">MC</span>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold mb-1 text-foreground">{c.founderName}</h2>
                <p className="text-sm text-primary font-semibold mb-4">{c.founderTitle}</p>
                <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                  <p>{c.bio1}</p>
                  <p>{c.bio2}</p>
                  <p>{c.bio3}</p>
                </div>
                <div className="flex gap-3 mt-5">
                  <a href="https://www.linkedin.com/in/marekciesla" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
                  <a href="https://twitter.com/jay23com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
                </div>
              </div>
            </div>
          </section>

          {/* What we do */}
          <section className="mb-20">
            <h2 className="font-display text-2xl font-bold mb-8 text-foreground">{c.whatWeDoTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cards.map((card) => (
                <div key={card.title} className="rounded-xl border border-border bg-card/50 p-6">
                  <h3 className="font-display text-base font-bold mb-2 text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat} className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
                  <span className="text-sm font-semibold text-foreground">{stat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">{c.ctaTitle}</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={`${langPrefix}#calculator`} className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors">
                {c.ctaCalc} →
              </Link>
              <Link to={`${langPrefix}/book`} className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-semibold hover:bg-accent transition-colors">
                {c.ctaBook} →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default About;
