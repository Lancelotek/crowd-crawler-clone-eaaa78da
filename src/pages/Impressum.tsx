import { PAGE_COPY } from "@/content/impressumCopy";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const Impressum = () => {
  const { lang, langPrefix } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={lang === "pl" ? "Impressum — dane firmy JAY23 LLC | JAY-23" : "Impressum — JAY23 LLC Company Details | JAY-23"} description={lang === "pl" ? "Dane rejestrowe JAY23 LLC (Wyoming, USA), operatora strony JAY-23 i frameworku MVA. Adres, kontakt i informacje prawne." : "Registered details for JAY23 LLC (Wyoming, USA), operator of the JAY-23 site and the MVA Framework. Address, contact and legal information."} canonical={`/${lang}/impressum`} lang={lang} hreflangOverrides={{ en: "/en/impressum", pl: "/pl/impressum" }} />
      <div className="container mx-auto max-w-[800px] px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} />{PAGE_COPY.text[0]}</Link>

        <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-8">{PAGE_COPY.text[1]}</h1>

        <div className="prose prose-sm max-w-none text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline">
          <p className="text-base font-medium text-foreground">{PAGE_COPY.text[2]}</p>
          <p>{PAGE_COPY.text[3]}</p>

          <div className="bg-card rounded-card border border-border p-6 my-8 space-y-2">
            <p className="!text-foreground font-medium">{PAGE_COPY.text[4]}<a href="tel:+16282417366">{PAGE_COPY.text[5]}</a></p>
            <p>{PAGE_COPY.text[6]}</p>
            <p className="!text-foreground font-medium">{PAGE_COPY.text[7]}<a href="mailto:crowdfunding_zone@jay23.com">{PAGE_COPY.text[8]}</a></p>
          </div>

          <p>{PAGE_COPY.text[9]}</p>
          <p>{PAGE_COPY.text[10]}</p>

          <h2 className="font-display text-xl font-bold mt-10 mb-3">{PAGE_COPY.text[11]}</h2>
          <ul>
            <li><Link to={`${langPrefix}/privacy-policy`}>{PAGE_COPY.text[12]}</Link></li>
            <li><Link to={`${langPrefix}/terms-of-service`}>{PAGE_COPY.text[13]}</Link></li>
            <li><Link to={`${langPrefix}/about`}>{PAGE_COPY.text[14]}</Link></li>
            <li><Link to={`${langPrefix}/packages`}>{PAGE_COPY.text[15]}</Link></li>
            <li><Link to={`${langPrefix}/book`}>{PAGE_COPY.text[16]}</Link></li>
            <li><Link to={`${langPrefix}/faq`}>{PAGE_COPY.text[17]}</Link></li>
            <li><Link to={`${langPrefix}/blog`}>{PAGE_COPY.text[18]}</Link></li>
            <li><Link to={langPrefix || "/en"}>{PAGE_COPY.text[19]}</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
