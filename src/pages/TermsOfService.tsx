import { PAGE_COPY } from "@/content/termsOfServiceCopy";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const TermsOfService = () => {
  const { lang, langPrefix } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={lang === "pl" ? "Regulamin serwisu JAY-23 | Warunki korzystania" : "Terms of Service — JAY-23 Website Terms of Use"}
        description={lang === "pl" ? "Regulamin korzystania ze strony JAY-23 i usług JAY23 LLC: zakres usług, płatności, odpowiedzialność i prawa autorskie." : "Terms of use for the JAY-23 website and JAY23 LLC services: scope of work, payments, liability and intellectual property."}
        canonical={`/${lang}/terms-of-service`}
        lang={lang}
        hreflangOverrides={{ en: "/en/terms-of-service", pl: "/pl/terms-of-service" }}
      />
      <div className="container mx-auto max-w-[800px] px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} />{PAGE_COPY.text[0]}</Link>

        <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-8">{PAGE_COPY.text[1]}</h1>

        <div className="prose prose-sm max-w-none text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline">
          <p className="italic">{PAGE_COPY.text[2]}</p>

          <p>{PAGE_COPY.text[3]}</p>

          <h2>{PAGE_COPY.text[4]}</h2>
          <p>{PAGE_COPY.text[5]}</p>

          <h2>{PAGE_COPY.text[6]}</h2>
          <p>{PAGE_COPY.text[7]}</p>

          <h2>{PAGE_COPY.text[8]}</h2>
          <p>{PAGE_COPY.text[9]}</p>

          <h2>{PAGE_COPY.text[10]}</h2>
          <p>{PAGE_COPY.text[11]}</p>
          <ul>
            <li>{PAGE_COPY.text[12]}</li>
            <li>{PAGE_COPY.text[13]}</li>
            <li>{PAGE_COPY.text[14]}</li>
            <li>{PAGE_COPY.text[15]}</li>
            <li>{PAGE_COPY.text[16]}</li>
            <li>{PAGE_COPY.text[17]}</li>
          </ul>

          <h2>{PAGE_COPY.text[18]}</h2>
          <p>{PAGE_COPY.text[19]}</p>

          <h2>{PAGE_COPY.text[20]}</h2>
          <p>{PAGE_COPY.text[21]}</p>

          <h2>{PAGE_COPY.text[22]}</h2>
          <p>{PAGE_COPY.text[23]}</p>

          <h2>{PAGE_COPY.text[24]}</h2>
          <p>{PAGE_COPY.text[25]}</p>

          <h2>{PAGE_COPY.text[26]}</h2>
          <p>{PAGE_COPY.text[27]}</p>

          <h2>{PAGE_COPY.text[28]}</h2>
          <p>{PAGE_COPY.text[29]}</p>

          <h2>{PAGE_COPY.text[30]}</h2>
          <p>{PAGE_COPY.text[31]}<a href="/privacy-policy">{PAGE_COPY.text[32]}</a>{PAGE_COPY.text[33]}</p>

          <h2>{PAGE_COPY.text[34]}</h2>
          <p>{PAGE_COPY.text[35]}</p>

          <h2>{PAGE_COPY.text[36]}</h2>
          <p>{PAGE_COPY.text[37]}</p>

          <h2>{PAGE_COPY.text[38]}</h2>
          <p>{PAGE_COPY.text[39]}</p>

          <h2>{PAGE_COPY.text[40]}</h2>
          <p>{PAGE_COPY.text[41]}</p>
          <ul>
            <li>{PAGE_COPY.text[42]}</li>
            <li>{PAGE_COPY.text[43]}</li>
            <li>{PAGE_COPY.text[44]}<a href="tel:+16282417366">{PAGE_COPY.text[45]}</a></li>
            <li>{PAGE_COPY.text[46]}<a href="mailto:crowdfunding_zone@jay23.com">{PAGE_COPY.text[47]}</a></li>
          </ul>

          <h2>{PAGE_COPY.text[48]}</h2>
          <ul>
            <li><Link to={`${langPrefix}/privacy-policy`}>{PAGE_COPY.text[49]}</Link></li>
            <li><Link to={`${langPrefix}/impressum`}>{PAGE_COPY.text[50]}</Link></li>
            <li><Link to={`${langPrefix}/about`}>{PAGE_COPY.text[51]}</Link></li>
            <li><Link to={`${langPrefix}/faq`}>{PAGE_COPY.text[52]}</Link></li>
            <li><Link to={`${langPrefix}/packages`}>{PAGE_COPY.text[53]}</Link></li>
            <li><Link to={`${langPrefix}/book`}>{PAGE_COPY.text[54]}</Link></li>
            <li><Link to={`${langPrefix}/blog`}>{PAGE_COPY.text[55]}</Link></li>
            <li><Link to={langPrefix || "/en"}>{PAGE_COPY.text[56]}</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
