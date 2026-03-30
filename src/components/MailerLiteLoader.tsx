import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Loads MailerLite Universal script only on /pl routes and removes it when leaving */
export default function MailerLiteLoader() {
  const { pathname } = useLocation();
  const isPolish = pathname.startsWith("/pl");

  useEffect(() => {
    if (!isPolish) return;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://assets.mailerlite.com/js/universal.js";
    s.id = "mailerlite-universal";
    s.onload = () => {
      const ml = (window as any).ml;
      if (ml) ml("account", "462864");
    };
    document.head.appendChild(s);

    return () => {
      // Remove script and MailerLite artifacts when leaving /pl
      const existing = document.getElementById("mailerlite-universal");
      if (existing) existing.remove();

      // Remove any MailerLite injected elements (popups, forms)
      document.querySelectorAll('[class*="ml-"], [id*="mlb2"]').forEach((el) => el.remove());

      delete (window as any).ml;
      delete (window as any).__mlLoaded;
    };
  }, [isPolish]);

  return null;
}
