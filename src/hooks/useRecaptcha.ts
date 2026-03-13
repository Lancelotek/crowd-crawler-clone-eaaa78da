import { useEffect, useCallback, useState } from "react";

const RECAPTCHA_SITE_KEY = "6LdYVYksAAAAANb_bHmi8-oQnzb7yuHUZCQMftiP";

let scriptLoaded = false;

export function useRecaptcha() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (scriptLoaded && window.grecaptcha) {
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoaded = true;
      setReady(true);
    };
    document.head.appendChild(script);
  }, []);

  const renderRecaptcha = useCallback(
    (containerId: string, callback: (token: string) => void) => {
      if (!window.grecaptcha?.render) return;
      // Clear container first
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = "";
      window.grecaptcha.render(containerId, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback,
        theme: "light",
        size: "normal",
      });
    },
    []
  );

  const resetRecaptcha = useCallback((containerId: string) => {
    if (!window.grecaptcha?.reset) return;
    try {
      window.grecaptcha.reset();
    } catch {}
  }, []);

  return { ready, renderRecaptcha, resetRecaptcha };
}

// Global type augmentation
declare global {
  interface Window {
    grecaptcha: {
      render: (container: string, params: Record<string, unknown>) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}
