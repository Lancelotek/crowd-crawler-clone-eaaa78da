import logo from "@/assets/jay23-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

const FooterSection = () => {
  const { t, lang, switchLang, langPrefix } = useLanguage();

  return (
    <footer className="px-6 py-16 border-t border-border">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="JAY-23" className="h-8 w-auto object-contain mb-4" />
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
            <h4 className="font-display text-sm font-bold mb-4 tracking-wide">{t("footer", "framework")}</h4>
            <ul className="space-y-2.5">
              <li><a href={`${langPrefix}#solution`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "howItWorks")}</a></li>
              <li><a href={`${langPrefix}#calculator`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "mvaCalc")}</a></li>
              <li><a href={`${langPrefix}#quiz`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "strategyQuiz")}</a></li>
              <li><a href={`${langPrefix}/process`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "process")}</a></li>
              <li><a href={`${langPrefix}/packages`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "packages")}</a></li>
              <li><a href={`${langPrefix}/book`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer", "bookCall")}</a></li>
              <li><a href={`${langPrefix}/faq`} className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href={`${langPrefix}/about`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav", "about")}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4 tracking-wide">{t("footer", "resources")}</h4>
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
