import { PAGE_COPY } from "@/content/prelaunchPlaybookCopy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";
import PlaybookLeadMagnet from "@/components/mva/PlaybookLeadMagnet";

const sections = [
  { id: "what-is-prelaunch", label: "1. What pre-launch marketing actually is" },
  { id: "why-cold-launches-fail", label: "2. Why cold launches fail" },
  { id: "mva-framework", label: "3. The MVA Framework" },
  { id: "phase-1-discover", label: "4. Phase 1 — Discover" },
  { id: "phase-2-build", label: "5. Phase 2 — Build" },
  { id: "phase-3-launch", label: "6. Phase 3 — Launch" },
  { id: "channels", label: "7. Channel playbooks" },
  { id: "metrics", label: "8. Metrics that matter" },
  { id: "by-product-type", label: "9. By product type" },
  { id: "mistakes", label: "10. The 7 mistakes that kill pre-launch" },
  { id: "60-day-plan", label: "11. A 60-day plan you can copy" },
  { id: "faq", label: "12. FAQ" },
];

const PrelaunchPlaybook = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=prelaunch-playbook`;
  const quizLink = `${langPrefix}/quiz?source=prelaunch-playbook`;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Complete Pre-Launch Marketing Playbook (2026 Edition)",
    description: "A 3,500-word operator's guide to pre-launch marketing using the MVA Framework. How to validate demand, build 1,000+ true fans, and launch with day-one revenue.",
    author: { "@type": "Person", name: "Marek Cieśla", url: "https://jay23.com/en/about" },
    publisher: { "@id": "https://jay23.com/#organization" },
    datePublished: "2026-06-24",
    dateModified: "2026-06-24",
    mainEntityOfPage: "https://jay23.com/en/prelaunch-marketing-playbook",
    image: "https://jay23.com/og-default.jpg",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jay23.com/en" },
      { "@type": "ListItem", position: 2, name: "Pre-Launch Marketing Playbook", item: "https://jay23.com/en/prelaunch-marketing-playbook" },
    ],
  };

  return (
    <>
      <SEOHead
        title={PAGE_COPY.text[0]}
        description="A 3,500-word operator's playbook for pre-launch marketing. Validate demand, build 1,000+ true fans, ship a launch day that produces real revenue. By JAY-23."
        canonical="/en/prelaunch-marketing-playbook"
        lang="en"
        noHreflang
        type="article"
        publishedAt="2026-06-24"
        author="Marek Cieśla"
        ogImage="https://jay23.com/og-default.jpg"
        ogImageAlt="The Complete Pre-Launch Marketing Playbook — JAY-23"
        schemaJson={[articleSchema, breadcrumbSchema]}
      />
      <MvaNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[hsl(var(--dark-bg))] pt-32 pb-16 border-b border-white/5">
        <div className="absolute -top-[10%] -right-[15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.14)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto max-w-[820px] px-6 relative z-10">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />{PAGE_COPY.text[1]}</p>
          <h1 className="font-display text-[clamp(36px,5.2vw,68px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-7">{PAGE_COPY.text[2]}<span className="text-primary">{PAGE_COPY.text[3]}</span>{PAGE_COPY.text[4]}</h1>
          <p className="text-[clamp(16px,1.5vw,19px)] font-light text-white/65 leading-relaxed">{PAGE_COPY.text[5]}</p>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="bg-[hsl(var(--dark-bg))] py-14 border-b border-white/5">
        <div className="container mx-auto max-w-[820px] px-6">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-white/40 mb-5">{PAGE_COPY.text[6]}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-[14px] text-white/70 hover:text-primary transition-colors py-1.5">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="bg-[hsl(var(--dark-bg))] py-20">
        <div className="container mx-auto max-w-[760px] px-6 prose-article">

          {/* 1 */}
          <Section id="what-is-prelaunch" eyebrow={PAGE_COPY.text[7]} title={PAGE_COPY.text[8]}>
            <p>{PAGE_COPY.text[9]}<em>{PAGE_COPY.text[10]}</em>{PAGE_COPY.text[11]}</p>
            <p>{PAGE_COPY.text[12]}</p>
            <p>{PAGE_COPY.text[13]}</p>
            <p>{PAGE_COPY.text[14]}<strong className="text-white">{PAGE_COPY.text[15]}</strong>{PAGE_COPY.text[16]}</p>
          </Section>

          {/* 2 */}
          <Section id="why-cold-launches-fail" eyebrow={PAGE_COPY.text[17]} title={PAGE_COPY.text[18]}>
            <p>{PAGE_COPY.text[19]}</p>
            <p>{PAGE_COPY.text[20]}<em>{PAGE_COPY.text[21]}</em>{PAGE_COPY.text[22]}</p>
            <p>{PAGE_COPY.text[23]}</p>
            <p>{PAGE_COPY.text[24]}</p>
            <p>{PAGE_COPY.text[25]}</p>
          </Section>

          {/* 3 */}
          <Section id="mva-framework" eyebrow={PAGE_COPY.text[26]} title={PAGE_COPY.text[27]}>
            <p>{PAGE_COPY.text[28]}<strong className="text-white">{PAGE_COPY.text[29]}</strong>{PAGE_COPY.text[30]}</p>
            <p>{PAGE_COPY.text[31]}</p>
            <p>{PAGE_COPY.text[32]}</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">{PAGE_COPY.text[33]}</strong>{PAGE_COPY.text[34]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[35]}</strong>{PAGE_COPY.text[36]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[37]}</strong>{PAGE_COPY.text[38]}</li>
            </ul>
          </Section>

          {/* LEAD MAGNET — gated PDF checklist */}
          <PlaybookLeadMagnet bookLink={bookLink} />

          {/* 4 */}
          <Section id="phase-1-discover" eyebrow={PAGE_COPY.text[39]} title={PAGE_COPY.text[40]}>
            <p>{PAGE_COPY.text[41]}</p>
            <p>{PAGE_COPY.text[42]}</p>
            <p>{PAGE_COPY.text[43]}<strong className="text-white">{PAGE_COPY.text[44]}</strong>{PAGE_COPY.text[45]}</p>
          </Section>

          {/* 5 */}
          <Section id="phase-2-build" eyebrow={PAGE_COPY.text[46]} title={PAGE_COPY.text[47]}>
            <p>{PAGE_COPY.text[48]}</p>
            <p>{PAGE_COPY.text[49]}</p>
            <p>{PAGE_COPY.text[50]}</p>
            <p>{PAGE_COPY.text[51]}</p>
            <p>{PAGE_COPY.text[52]}<strong className="text-white">{PAGE_COPY.text[53]}</strong>{PAGE_COPY.text[54]}</p>
          </Section>

          {/* 6 */}
          <Section id="phase-3-launch" eyebrow={PAGE_COPY.text[55]} title={PAGE_COPY.text[56]}>
            <p>{PAGE_COPY.text[57]}</p>
            <p>{PAGE_COPY.text[58]}</p>
            <p>{PAGE_COPY.text[59]}</p>
            <p>{PAGE_COPY.text[60]}</p>
            <p>{PAGE_COPY.text[61]}</p>
          </Section>

          {/* 7 */}
          <Section id="channels" eyebrow={PAGE_COPY.text[62]} title={PAGE_COPY.text[63]}>
            <p>{PAGE_COPY.text[64]}</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">{PAGE_COPY.text[65]}</strong>{PAGE_COPY.text[66]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[67]}</strong>{PAGE_COPY.text[68]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[69]}</strong>{PAGE_COPY.text[70]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[71]}</strong>{PAGE_COPY.text[72]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[73]}</strong>{PAGE_COPY.text[74]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[75]}</strong>{PAGE_COPY.text[76]}</li>
            </ul>
          </Section>

          {/* 8 */}
          <Section id="metrics" eyebrow={PAGE_COPY.text[77]} title={PAGE_COPY.text[78]}>
            <p>{PAGE_COPY.text[79]}</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">{PAGE_COPY.text[80]}</strong>{PAGE_COPY.text[81]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[82]}</strong>{PAGE_COPY.text[83]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[84]}</strong>{PAGE_COPY.text[85]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[86]}</strong>{PAGE_COPY.text[87]}</li>
            </ul>
            <p>{PAGE_COPY.text[88]}</p>
          </Section>

          {/* 9 */}
          <Section id="by-product-type" eyebrow={PAGE_COPY.text[89]} title={PAGE_COPY.text[90]}>
            <p>{PAGE_COPY.text[91]}<em>{PAGE_COPY.text[92]}</em>{PAGE_COPY.text[93]}<em>{PAGE_COPY.text[94]}</em>{PAGE_COPY.text[95]}</p>
            <p>{PAGE_COPY.text[96]}</p>
            <p>{PAGE_COPY.text[97]}</p>
            <p>{PAGE_COPY.text[98]}</p>
            <p>{PAGE_COPY.text[99]}</p>
          </Section>

          {/* 10 */}
          <Section id="mistakes" eyebrow={PAGE_COPY.text[100]} title={PAGE_COPY.text[101]}>
            <ol className="list-decimal list-outside pl-5 my-5 space-y-3 text-white/70">
              <li><strong className="text-white font-medium">{PAGE_COPY.text[102]}</strong>{PAGE_COPY.text[103]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[104]}</strong>{PAGE_COPY.text[105]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[106]}</strong>{PAGE_COPY.text[107]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[108]}</strong>{PAGE_COPY.text[109]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[110]}</strong>{PAGE_COPY.text[111]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[112]}</strong>{PAGE_COPY.text[113]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[114]}</strong>{PAGE_COPY.text[115]}</li>
            </ol>
          </Section>

          {/* 11 */}
          <Section id="60-day-plan" eyebrow={PAGE_COPY.text[116]} title={PAGE_COPY.text[117]}>
            <p>{PAGE_COPY.text[118]}</p>
            <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-white/70">
              <li><strong className="text-white font-medium">{PAGE_COPY.text[119]}</strong>{PAGE_COPY.text[120]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[121]}</strong>{PAGE_COPY.text[122]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[123]}</strong>{PAGE_COPY.text[124]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[125]}</strong>{PAGE_COPY.text[126]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[127]}</strong>{PAGE_COPY.text[128]}</li>
              <li><strong className="text-white font-medium">{PAGE_COPY.text[129]}</strong>{PAGE_COPY.text[130]}</li>
            </ul>
            <p>{PAGE_COPY.text[131]}</p>
          </Section>

          {/* 12 */}
          <Section id="faq" eyebrow={PAGE_COPY.text[132]} title={PAGE_COPY.text[133]}>
            <p><strong className="text-white">{PAGE_COPY.text[134]}</strong>{PAGE_COPY.text[135]}</p>
            <p><strong className="text-white">{PAGE_COPY.text[136]}</strong>{PAGE_COPY.text[137]}</p>
            <p><strong className="text-white">{PAGE_COPY.text[138]}</strong>{PAGE_COPY.text[139]}</p>
            <p><strong className="text-white">{PAGE_COPY.text[140]}</strong>{PAGE_COPY.text[141]}</p>
            <p><strong className="text-white">{PAGE_COPY.text[142]}</strong>{PAGE_COPY.text[143]}<Link to={bookLink} className="text-primary underline underline-offset-4 hover:no-underline">{PAGE_COPY.text[144]}</Link>{PAGE_COPY.text[145]}</p>
          </Section>

        </div>

        {/* INTERNAL LINKS */}
        <div className="container mx-auto max-w-[760px] px-6 mt-16">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-5">{PAGE_COPY.text[146]}</p>
            <ul className="space-y-3">
              <li><Link to={`${langPrefix}/kickstarter-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">{PAGE_COPY.text[147]}</Link></li>
              <li><Link to={`${langPrefix}/crowdfunding-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">{PAGE_COPY.text[148]}</Link></li>
              <li><Link to={`${langPrefix}/product-launch-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">{PAGE_COPY.text[149]}</Link></li>
              <li><Link to={`${langPrefix}/saas-prelaunch-marketing-agency`} className="text-white/80 hover:text-primary transition-colors text-[15px]">{PAGE_COPY.text[150]}</Link></li>
              <li><Link to={`${langPrefix}/process`} className="text-white/80 hover:text-primary transition-colors text-[15px]">{PAGE_COPY.text[151]}</Link></li>
            </ul>
          </div>
        </div>
      </article>

      {/* CASE STUDIES */}
      <CaseStudiesSection />

      {/* FINAL CTA */}
      <section className="relative bg-[hsl(var(--dark-bg))] py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto max-w-[820px] px-6 text-center relative z-10">
          <h2 className="font-display text-[clamp(34px,5vw,64px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-6">{PAGE_COPY.text[152]}<span className="text-primary">{PAGE_COPY.text[153]}</span>{PAGE_COPY.text[154]}</h2>
          <p className="text-[17px] text-white/55 mb-10 max-w-[520px] mx-auto font-light leading-relaxed">{PAGE_COPY.text[155]}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-4 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">{PAGE_COPY.text[156]}<ArrowRight size={16} />
            </Link>
            <Link to={quizLink} className="inline-flex items-center gap-2 border border-white/15 text-white/85 font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-white/5 transition-all">{PAGE_COPY.text[157]}</Link>
          </div>
        </div>
      </section>

      <FooterSection />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </>
  );
};

const Section = ({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28 mb-16">
    <p className="text-primary/70 font-mono text-[12px] font-semibold mb-3 tracking-wider">{eyebrow}</p>
    <h2 className="font-display text-[clamp(26px,3vw,38px)] font-black uppercase leading-[1.1] tracking-tight text-white mb-6">{title}</h2>
    <div className="space-y-5 text-[16.5px] text-white/70 leading-[1.75] font-light">{children}</div>
  </section>
);

export default PrelaunchPlaybook;
