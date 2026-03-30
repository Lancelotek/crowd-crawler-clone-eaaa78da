import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Loads MailerLite Universal script only on /pl routes */
export default function MailerLiteLoader() {
  const { pathname } = useLocation();
  const isPolish = pathname.startsWith("/pl");

  useEffect(() => {
    if (!isPolish) return;
    // Avoid loading twice
    if ((window as any).__mlLoaded) return;
    (window as any).__mlLoaded = true;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://assets.mailerlite.com/js/universal.js";
    s.onload = () => {
      const ml = (window as any).ml;
      if (ml) ml("account", "462864");
    };
    document.head.appendChild(s);
  }, [isPolish]);

  return null;
}
