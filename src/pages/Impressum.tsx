import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const Impressum = () => {
  const { lang, langPrefix } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Impressum" description="Legal disclosure (Impressum) for JAY23 LLC, operator of the MVA Framework website." canonical="/en/impressum" noHreflang lang={lang} />
      <div className="container mx-auto max-w-[800px] px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-8">Impressum</h1>

        <div className="prose prose-sm max-w-none text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline">
          <p className="text-base font-medium text-foreground">
            This website is operated by JAY23 LLC, 412 N. Main Street, STE 100 Buffalo, Wyoming 82834, United States.
          </p>
          <p>If you have any questions, contact the editorial team or would like to share your experience with us, please use our contact information below.</p>

          <div className="bg-card rounded-card border border-border p-6 my-8 space-y-2">
            <p className="!text-foreground font-medium">Phone: <a href="tel:+16282417366">+1 (628) 241-7366</a></p>
            <p>Mon. – Sun. from 10:00 to 16:00</p>
            <p className="!text-foreground font-medium">Email: <a href="mailto:crowdfunding_zone@jay23.com">crowdfunding_zone@jay23.com</a></p>
          </div>

          <p>JAY23 LLC is legally represented by the Board of Management (Kenneth Graham).</p>
          <p>Registered court: Buffalo, EIN Number 86–2209145</p>

          <h2 className="font-display text-xl font-bold mt-10 mb-3">Related</h2>
          <ul>
            <li><Link to={`${langPrefix}/privacy-policy`}>Privacy Policy</Link></li>
            <li><Link to={`${langPrefix}/terms-of-service`}>Terms of Service</Link></li>
            <li><Link to={`${langPrefix}/about`}>About JAY-23</Link></li>
            <li><Link to={`${langPrefix}/packages`}>MVA Packages & Pricing</Link></li>
            <li><Link to={`${langPrefix}/book`}>Book a Strategy Call</Link></li>
            <li><Link to={`${langPrefix}/faq`}>Frequently Asked Questions</Link></li>
            <li><Link to={`${langPrefix}/blog`}>Articles by JAY-23</Link></li>
            <li><Link to={langPrefix || "/en"}>Home</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
