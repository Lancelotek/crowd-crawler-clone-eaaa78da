/**
 * Google Ads Conversion Event Snippets
 * Conversion ID: AW-1030433666
 *
 * These fire actual Google Ads conversion events via gtag().
 * The base gtag.js tag is already loaded in index.html.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const AW_ID = "AW-1030433666";

// ── 1. Purchase – EasyCart ────────────────────────────────
export function trackPurchaseConversion(
  value = 1.0,
  transactionId = "",
) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${AW_ID}/78DpCL2Bkq8aEILXrOsD`,
      value,
      currency: "PLN",
      transaction_id: transactionId,
    });
  }
}

// ── 2. Consultation / Booking (Calendly) ──────────────────
export function trackConsultationConversion() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${AW_ID}/1xSfCInJ56IaEILXrOsD`,
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
      window.gtag("event", "conversion", {
        send_to: `${AW_ID}/yAhNCPC-7KIaEILXrOsD`,
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
