import logo from "@/assets/jay23-logo.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

const FooterSection = () => {
  const { t, lang, switchLang, langPrefix } = useLanguage();

  return (
    <footer className="px-6 py-16 border-t border-border">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-12">
          {lang === "en" && (
            <div className="md:col-span-6 pb-6 mb-2 border-b border-border/60">
              <h2 className="font-display text-sm font-bold mb-3 tracking-wide">Guides</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <li><a href="/en/blog/kickstarter-pre-launch-page-12-elements" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kickstarter pre-launch page: 12 elements</a></li>
                <li><a href="/en/blog/how-to-launch-kickstarter-campaign-2025-complete-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">How to launch a Kickstarter campaign (2026)</a></li>
                <li><a href="/en/blog/hardware-startup-marketing-strategy-pre-launch" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hardware startup marketing: pre-launch strategy</a></li>
                <li><a href="/en/blog/prelaunch-strategy-waitlist-conversion-framework" className="text-sm text-muted-foreground hover:text-primary transition-colors">Prelaunch waitlist conversion framework</a></li>
                <li><a href="/en/blog/product-launch-strategy-90-day-framework" className="text-sm text-muted-foreground hover:text-primary transition-colors">Product launch strategy: 90-day framework</a></li>
                <li><a href="/en/quiz" className="text-sm text-primary font-semibold hover:underline">MVA calculator — how many true fans you need →</a></li>
              </ul>
            </div>
          )}
          {/* Brand */}
          <div className="md:col-span-2">
            <a href={langPrefix || "/"}><img src={logo} alt="JAY-23 logo" width={120} height={32} className="h-8 w-auto object-contain mb-4" /></a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-4">
              {t("footer", "desc")}
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Crowdfunding zone by JAY23 LLC</p>
              <p>412 N. Main Street, STE 100</p>
              <p>Buffalo, Wyoming 82834</p>
              <p>+1 (628) 241-7366</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className="font-display text-sm font-bold mb-4 tracking-wide">{t("footer", "framework")}</h2>
            <ul className="space-y-2.5">
              <li><a href={`${langPrefix}#solution`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "howItWorks")}</a></li>
              <li><a href={`${langPrefix}/quiz`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "mvaCalc")}</a></li>
              <li><a href={`${langPrefix}/quiz`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "strategyQuiz")}</a></li>
              <li><a href={`${langPrefix}/process`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "process")}</a></li>
              <li><a href={`${langPrefix}/packages`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "packages")}</a></li>
              <li><a href={`${langPrefix}/founder-influencer`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "founderInfluencer")}</a></li>
              <li><a href={`${langPrefix}/book`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "bookCall")}</a></li>
              <li><a href={`${langPrefix}/faq`} className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href={`${langPrefix}/about`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav", "about")}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="font-display text-sm font-bold mb-4 tracking-wide">{t("footer", "resources")}</h2>
            <ul className="space-y-2.5">
              <li><a href={`${langPrefix}/blog`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav", "blog")}</a></li>
              <li>
                <a href="https://discord.com/invite/FqCY7yQuwV" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
                  Discord
              </a>
              </li>
              <li><a href="https://prelaunch.live/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">New Campaigns</a></li>
              <li><a href={`${langPrefix}/privacy-policy`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "privacyPolicy")}</a></li>
              <li><a href={`${langPrefix}/terms-of-service`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "termsOfService")}</a></li>
              <li><a href={`${langPrefix}/impressum`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "impressum")}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-display text-sm font-bold mb-4 tracking-wide">{t("footer", "services")}</h2>
            <ul className="space-y-2.5">
              <li><a href={lang === "pl" ? `${langPrefix}/agencja-prelaunch-ecommerce` : `${langPrefix}/ecommerce-prelaunch-agency`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "ecommerce")}</a></li>
              <li><a href={lang === "pl" ? `${langPrefix}/agencja-prelaunch-saas` : `${langPrefix}/saas-prelaunch-marketing-agency`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "saas")}</a></li>
              <li><a href={`${langPrefix}/tiktok-shop-agency`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{lang === "pl" ? "Agencja TikTok Shop" : "TikTok Shop agency"}</a></li>
              {lang === "en" && (
                <>
                  <li><a href={`${langPrefix}/kickstarter-agency`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Kickstarter agency</a></li>
                  <li><a href={`${langPrefix}/kickstarter-marketing-agency`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Kickstarter marketing</a></li>
                  <li><a href={`${langPrefix}/crowdfunding-agency`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Crowdfunding agency</a></li>
                  <li><a href={`${langPrefix}/product-launch-agency`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Product launch agency</a></li>
                  <li><a href={`${langPrefix}/gamefound`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Gamefound agency</a></li>
                </>
              )}
              <li>
                <a
                  href={`${langPrefix}/click2pack`}
                  onClick={() => {
                    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
                      (window as any).gtag("event", "click2pack_footer_click", {
                        event_category: "navigation",
                        event_label: "footer_services",
                        link_url: `${langPrefix}/click2pack`,
                        lang,
                      });
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  click2pack — live commerce
                </a>
              </li>
            </ul>
          </div>

          {/* Alternatives (EN-only competitive cluster) */}
          {lang === "en" && (
            <div>
              <h2 className="font-display text-sm font-bold mb-4 tracking-wide">Alternatives</h2>
              <ul className="space-y-2.5">
                <li><a href={`${langPrefix}/launchboom-alternative`} className="text-sm text-muted-foreground hover:text-primary transition-colors">LaunchBoom alternative</a></li>
                <li><a href={`${langPrefix}/jellop-alternative`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Jellop alternative</a></li>
                <li><a href={`${langPrefix}/agency-2-0-alternative`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Agency 2.0 alternative</a></li>
                <li><a href={`${langPrefix}/founder-influencer`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Founder-led influencer</a></li>
              </ul>
            </div>
          )}
        </div>


        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Crowdfunding zone by JAY23 LLC. {t("footer", "copyright")}</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{t("footer", "tagline")}</span>
            {/* Language switcher */}
            <div className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5">
              <Globe size={14} className="text-muted-foreground" />
              <button
                onClick={() => switchLang("en")}
                className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </button>
              <button
                onClick={() => switchLang("pl")}
                className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${lang === "pl" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                PL
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
