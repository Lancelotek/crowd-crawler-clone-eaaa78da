import { useEffect } from "react";
import { trackAdsConversion } from "@/lib/tracking";
import ScrollReveal from "./ScrollReveal";

const checklist = [
  "Full content audit (worth $300)",
  "Custom MVA roadmap for your niche",
  "Top 3 growth hacks for your platform",
  "Ad strategy recommendations",
  "Zero sales pitch — pure strategy",
];

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const FinalCTASection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Calendly → Google Ads conversion tracking
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event && e.data.event === "calendly.event_scheduled") {
        trackAdsConversion("1xSfCInJ56IaEILXrOsD");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <section id="book-call" className="py-24 px-6 bg-primary">
      <div className="container mx-auto max-w-[1000px]">
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-primary-foreground mb-6">
              Ready to Build Your<br />First 1,000 True Fans?
            </h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto leading-relaxed mb-10">
              Book a free 30-minute strategy call. We'll audit your current content, identify your 3 biggest growth gaps, and give you a custom 90-day MVA roadmap.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <ul className="flex flex-col gap-2.5 items-center mb-10">
              {checklist.map((item, i) => (
                <li key={i} className="text-sm text-primary-foreground/90 font-medium">
                  ✓ {item}
                </li>
              ))}
            </ul>
            <p className="text-primary-foreground/60 text-sm font-semibold mb-2">
              <span className="animate-blink inline-block text-destructive">🔴</span> Only 3 spots available this month
            </p>
            <p className="text-xs text-primary-foreground/50 tracking-wide">
              No commitment required. 30 minutes. 100% free.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="bg-background rounded-card p-2">
            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=F6F6FA&text_color=0B0B0F&primary_color=6C3BFF`}
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTASection;