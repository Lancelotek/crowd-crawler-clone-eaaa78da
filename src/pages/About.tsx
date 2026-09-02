import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";
import { ABOUT_COPY as content } from "@/content/aboutCopy";


const About = () => {
  const { lang, langPrefix } = useLanguage();
  const c = content[lang];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marek Ciesla",
    alternateName: "Marek Cieśla",
    jobTitle: "Founder & CEO",
    image: "https://jay23.com/assets/jay23-logo-C_2EM8Im.webp",
    url: `https://jay23.com${langPrefix}/about`,
    worksFor: {
      "@type": "Organization",
      name: "JAY-23",
      url: "https://jay23.com",
      logo: {
        "@type": "ImageObject",
        url: "https://jay23.com/assets/jay23-logo-C_2EM8Im.webp",
      },
    },
    sameAs: [
      "https://www.linkedin.com/in/marekciesla/",
      "https://twitter.com/jay23com",
    ],
    description: lang === "pl"
      ? "Strateg marketingowy specjalizujący się w budowaniu Minimum Viable Audience. Twórca MVA Framework. Doświadczenie w 50+ współpracach ze startupami i ponad $1M pozyskanych w crowdfundingu."
      : "Marketing strategist specializing in building Minimum Viable Audiences. Creator of the MVA Framework. Experience with 50+ startup collaborations and over $1M raised in crowdfunding.",
    knowsAbout: [
      "Minimum Viable Audience",
      "prelaunch strategy",
      "community building",
      "crowdfunding",
      "growth marketing",
      "content marketing",
    ],
  };

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: lang === "pl" ? "O nas — JAY-23" : "About — JAY-23",
    url: `https://jay23.com${langPrefix}/about`,
    description: lang === "pl"
      ? "Pomagamy founderom budować publiczność przed premierą produktu — MVA Framework 90 dni"
      : "We help founders build an audience before product launch — MVA Framework 90 days",
    mainEntity: personJsonLd,
    publisher: {
      "@type": "Organization",
      name: "JAY-23",
      url: "https://jay23.com",
      logo: {
        "@type": "ImageObject",
        url: "https://jay23.com/assets/jay23-logo-C_2EM8Im.webp",
      },
    },
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
        jsonLd={[
          aboutPageJsonLd,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://jay23.com/${lang}` },
              { "@type": "ListItem", "position": 2, "name": lang === "pl" ? "O nas" : "About", "item": `https://jay23.com${langPrefix}/about` },
            ],
          },
        ]}
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
