import { toast } from "sonner";
import { orderTotal, type PlaybookItem } from "@/content/mvaPlaybook";
import { trackEvent } from "@/lib/tracking";

export async function startCheckout(items: PlaybookItem[]): Promise<void> {
  trackEvent("begin_checkout", {
    value: orderTotal(items), currency: "USD",
    items: items.map((item) => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: 1 })),
  });
  // Replace this adapter with a hosted checkout call after payments is enabled.
  // No order, payment, delivery or purchase event is created by this stub.
  toast("Checkout opens soon");
}

export type ConfirmedPlaybookOrder = { transactionId: string; total: number; items: PlaybookItem[] };
export async function getConfirmedPlaybookOrder(): Promise<ConfirmedPlaybookOrder | null> {
  // Payment integration must verify the returned checkout session server-side.
  // URL totals, localStorage and visits to /thank-you are not proof of payment.
  return null;
}

export function trackConfirmedPlaybookPurchase(order: ConfirmedPlaybookOrder): void {
  const key = `mva-purchase:${order.transactionId}`;
  if (sessionStorage.getItem(key)) return;
  trackEvent("purchase", {
    transaction_id: order.transactionId, value: order.total, currency: "USD",
    items: order.items.map((item) => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: 1 })),
  });
  sessionStorage.setItem(key, "1");
}