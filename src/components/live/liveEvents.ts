import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";

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
  // Primary destination: MailerLite (Click2Pack PL group) + e-mail notification.
  const { error } = await supabase.functions.invoke("live-audit-subscribe", { body: payload });

  if (error) {
    const details =
      error instanceof FunctionsHttpError ? await error.context.text() : error.message;
    console.error("live-audit-subscribe failed:", details);
    throw new Error(details);
  }

  // Optional secondary destination (Make.com automation), best effort.
  if (LIVE_WEBHOOK_URL) {
    try {
      await fetch(LIVE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (webhookError) {
      console.error("Make webhook failed:", webhookError);
    }
  }
}
