/** GA4 events for the Jay23 LIVE pages. */
export function liveEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

export const LIVE_WEBHOOK_URL = import.meta.env.VITE_MAKE_LIVE_WEBHOOK_URL as string | undefined;

export async function sendLiveForm(payload: Record<string, unknown>) {
  if (!LIVE_WEBHOOK_URL) {
    throw new Error("VITE_MAKE_LIVE_WEBHOOK_URL is not configured");
  }
  const res = await fetch(LIVE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Webhook responded ${res.status}`);
  }
}
