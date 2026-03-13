import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const BookCall = () => {
  const { t, langPrefix } = useLanguage();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t("bookCall", "seoTitle")}
        description={t("bookCall", "seoDesc")}
        canonical={`${langPrefix}/book`}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to={langPrefix} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          {t("bookCall", "back")}
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold mb-2">{t("bookCall", "title")}</h1>
        <p className="text-muted-foreground mb-6">{t("bookCall", "desc")}</p>
        <div className="bg-card rounded-card border border-border p-2 mb-6">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/-45huMr_7ls"
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="bg-card rounded-card border border-border p-2">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/marekciesla/30min?hide_event_type_details=1&hide_gdpr_banner=1"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookCall;
