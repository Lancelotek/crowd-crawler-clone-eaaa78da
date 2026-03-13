/**
 * GTM / GA4 event tracking utility.
 * Pushes custom events to the dataLayer for Google Tag Manager.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, params?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// ── Predefined conversion events ──────────────────────────

export const track = {
  ctaClick: (location: string, destination: string) =>
    trackEvent("cta_click", { cta_location: location, cta_destination: destination }),

  calculatorStart: () =>
    trackEvent("calculator_start"),

  calculatorStep: (step: string, value: string) =>
    trackEvent("calculator_step", { calc_step: step, calc_value: value }),

  calculatorResult: (result: number, product: string, revenue: string) =>
    trackEvent("calculator_result", { calc_result: result, calc_product: product, calc_revenue: revenue }),

  quizStart: () =>
    trackEvent("quiz_start"),

  quizStep: (step: number, answer: string) =>
    trackEvent("quiz_step", { quiz_step: step, quiz_answer: answer }),

  quizComplete: (answers: string[]) =>
    trackEvent("quiz_complete", { quiz_answers: answers.join(" | ") }),

  leadSubmit: (source: string) =>
    trackEvent("lead_submit", { lead_source: source }),

  bookingClick: (location: string) =>
    trackEvent("booking_click", { booking_location: location }),

  videoPlay: (videoId: string) =>
    trackEvent("video_play", { video_id: videoId }),

  calcOpen: () =>
    trackEvent("calculator_open"),

  quizOpen: () =>
    trackEvent("quiz_open"),

  scrollDepth: (percent: number) =>
    trackEvent("scroll_depth", { scroll_percent: percent }),
};

// ── Scroll depth tracker ──────────────────────────────────
// Fires events at 25%, 50%, 75%, 90% thresholds (once each per page load)

let scrollInitialized = false;

export function initScrollDepthTracking() {
  if (scrollInitialized || typeof window === "undefined") return;
  scrollInitialized = true;

  const thresholds = [25, 50, 75, 90];
  const fired = new Set<number>();

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((scrollTop / docHeight) * 100);

    for (const t of thresholds) {
      if (percent >= t && !fired.has(t)) {
        fired.add(t);
        track.scrollDepth(t);
      }
    }

    if (fired.size === thresholds.length) {
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}
