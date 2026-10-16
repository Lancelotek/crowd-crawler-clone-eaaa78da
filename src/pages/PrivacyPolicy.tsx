import { PAGE_COPY } from "@/content/privacyPolicyCopy";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const PrivacyPolicy = () => {
  const { lang, langPrefix } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={lang === "pl"
          ? "Polityka prywatności — RODO i cookies | JAY-23"
          : "Privacy Policy — Data, Cookies & GDPR Rights | JAY-23"}
        description={lang === "pl"
          ? "Polityka prywatności JAY23 LLC: jakie dane zbieramy, na jakiej podstawie RODO, jak długo je przechowujemy i jak skorzystać z praw użytkownika."
          : "Full privacy policy for JAY23 LLC: how we collect, process, and store personal data through forms, cookies, and email; your rights under GDPR and CCPA; retention periods and contact details."}
        canonical={`/${lang}/privacy-policy`}
        lang={lang}
      />

      <div className="container mx-auto max-w-[800px] px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} />{PAGE_COPY.text[0]}</Link>

        <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-8">{PAGE_COPY.text[1]}</h1>

        <div className="prose prose-sm max-w-none text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline">
          <h2>{PAGE_COPY.text[2]}</h2>
          <p>{PAGE_COPY.text[3]}</p>
          <p>{PAGE_COPY.text[4]}</p>
          <p>{PAGE_COPY.text[5]}</p>
          <ul>
            <li>{PAGE_COPY.text[6]}</li>
            <li>{PAGE_COPY.text[7]}</li>
            <li>{PAGE_COPY.text[8]}</li>
            <li>{PAGE_COPY.text[9]}</li>
          </ul>
          <p>{PAGE_COPY.text[10]}</p>
          <p>{PAGE_COPY.text[11]}</p>

          <h2>{PAGE_COPY.text[12]}</h2>
          <p>{PAGE_COPY.text[13]}</p>
          <ul>
            <li>{PAGE_COPY.text[14]}</li>
            <li>{PAGE_COPY.text[15]}</li>
            <li>{PAGE_COPY.text[16]}</li>
            <li>{PAGE_COPY.text[17]}</li>
            <li>{PAGE_COPY.text[18]}</li>
          </ul>

          <h2>{PAGE_COPY.text[19]}</h2>
          <p>{PAGE_COPY.text[20]}</p>
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
          <p>{PAGE_COPY.text[31]}</p>

          <h2>{PAGE_COPY.text[32]}</h2>
          <p>{PAGE_COPY.text[33]}</p>

          <h2>{PAGE_COPY.text[34]}</h2>
          <p>{PAGE_COPY.text[35]}</p>

          <h2>{PAGE_COPY.text[36]}</h2>
          <p>{PAGE_COPY.text[37]}</p>

          <h2>{PAGE_COPY.text[38]}</h2>
          <p>{PAGE_COPY.text[39]}</p>

          <h2>{PAGE_COPY.text[40]}</h2>
          <p>{PAGE_COPY.text[41]}<a href="mailto:operations@jay23.com">{PAGE_COPY.text[42]}</a>{PAGE_COPY.text[43]}</p>

          <h2>{PAGE_COPY.text[44]}</h2>
          <p>{PAGE_COPY.text[45]}</p>
          <ul>
            <li>{PAGE_COPY.text[46]}</li>
            <li>{PAGE_COPY.text[47]}</li>
            <li>{PAGE_COPY.text[48]}</li>
            <li>{PAGE_COPY.text[49]}<a href="mailto:operations@jay23.com">{PAGE_COPY.text[50]}</a></li>
          </ul>

          <h2>{PAGE_COPY.text[51]}</h2>
          <p>{PAGE_COPY.text[52]}</p>
          <p className="italic">{PAGE_COPY.text[53]}</p>

          <h2>{PAGE_COPY.text[54]}</h2>
          <p>{PAGE_COPY.text[55]}</p>

          <p className="mt-8 text-xs font-semibold uppercase">{PAGE_COPY.text[56]}</p>

          <h2>{PAGE_COPY.text[57]}</h2>
          <ul>
            <li><Link to={`${langPrefix}/terms-of-service`}>{PAGE_COPY.text[58]}</Link></li>
            <li><Link to={`${langPrefix}/impressum`}>{PAGE_COPY.text[59]}</Link></li>
            <li><Link to={`${langPrefix}/about`}>{PAGE_COPY.text[60]}</Link></li>
            <li><Link to={`${langPrefix}/faq`}>{PAGE_COPY.text[61]}</Link></li>
            <li><Link to={`${langPrefix}/packages`}>{PAGE_COPY.text[62]}</Link></li>
            <li><Link to={`${langPrefix}/book`}>{PAGE_COPY.text[63]}</Link></li>
            <li><Link to={`${langPrefix}/blog`}>{PAGE_COPY.text[64]}</Link></li>
            <li><Link to={langPrefix || "/en"}>{PAGE_COPY.text[65]}</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
