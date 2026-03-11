import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const BookCall = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Book a Free Strategy Call — JAY-23"
        description="Schedule a free 30-minute strategy call to review your audience growth plan and get personalized recommendations."
        canonical="/book"
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold mb-2">Book Your Free Strategy Call</h1>
        <p className="text-muted-foreground mb-6">Pick a time that works for you. 30 minutes, no strings attached.</p>
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
