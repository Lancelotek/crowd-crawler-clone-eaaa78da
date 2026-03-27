/**
 * Google Ads Conversion Event Snippets + GA4 Custom Events
 * Google Ads Conversion ID: AW-1030433666
 * GA4 Measurement ID: G-HTY7ZLKH38
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const AW_ID = "AW-1030433666";
const GA4_ID = "G-HTY7ZLKH38";

// ── 1. Purchase – EasyCart ────────────────────────────────
export function trackPurchaseConversion(
  value = 1.0,
  transactionId = "",
) {
  if (typeof window.gtag === "function") {
    // Google Ads conversion
    window.gtag("event", "conversion", {
      send_to: `${AW_ID}/78DpCL2Bkq8aEILXrOsD`,
      value,
      currency: "PLN",
      transaction_id: transactionId,
    });
    // GA4 event
    window.gtag("event", "purchase_easycart", {
      send_to: GA4_ID,
      value,
      currency: "PLN",
      transaction_id: transactionId,
    });
  }
}

// ── 2. Consultation / Booking (Calendly) ──────────────────
export function trackConsultationConversion() {
  if (typeof window.gtag === "function") {
    // Google Ads conversion
    window.gtag("event", "conversion", {
      send_to: `${AW_ID}/1xSfCInJ56IaEILXrOsD`,
      value: 1.0,
      currency: "PLN",
    });
    // GA4 event
    window.gtag("event", "consultation_booked", {
      send_to: GA4_ID,
      value: 1.0,
      currency: "PLN",
    });
  }
}

// ── 3. Engagement: scroll 70% + 60 seconds ───────────────
let engagementInitialized = false;

export function initEngagementTracking() {
  if (engagementInitialized || typeof window === "undefined") return;
  engagementInitialized = true;

  let scrolled70 = false;
  let timeSpent60 = false;
  let conversionFired = false;

  const fireConversion = () => {
    if (!conversionFired && typeof window.gtag === "function") {
      conversionFired = true;
      // Google Ads conversion
      window.gtag("event", "conversion", {
        send_to: `${AW_ID}/yAhNCPC-7KIaEILXrOsD`,
      });
      // GA4 event
      window.gtag("event", "engaged_visitor", {
        send_to: GA4_ID,
      });
    }
  };

  setTimeout(() => {
    timeSpent60 = true;
    if (scrolled70) fireConversion();
  }, 60_000);

  window.addEventListener(
    "scroll",
    () => {
      if (scrolled70) return;
      const scrollPercent =
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
        100;
      if (scrollPercent >= 70) {
        scrolled70 = true;
        if (timeSpent60) fireConversion();
      }
    },
    { passive: true },
  );
}

// ── 4. Calendly message listener ──────────────────────────
let calendlyListenerInitialized = false;

export function initCalendlyTracking() {
  if (calendlyListenerInitialized || typeof window === "undefined") return;
  calendlyListenerInitialized = true;

  window.addEventListener("message", (e) => {
    if (
      e.origin === "https://calendly.com" &&
      e.data?.event === "calendly.event_scheduled"
    ) {
      trackConsultationConversion();
    }
  });
}
