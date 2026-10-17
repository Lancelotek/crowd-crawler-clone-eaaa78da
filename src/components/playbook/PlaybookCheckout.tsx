import { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { playbookCopy, checkoutPayLabel, ADD_ON_IDS, PLAYBOOK_PRODUCTS, toggleAddOn, orderItems, orderTotal, type AddOnId } from "@/content/mvaPlaybook";
import { startCheckout } from "@/lib/playbookCheckout";
import PlaybookBook from "./PlaybookBook";

export default function PlaybookCheckout() {
  const [selected, setSelected] = useState<AddOnId[]>([]);
  const [instantAccess, setInstantAccess] = useState(false);
  const [pending, setPending] = useState(false);
  const items = orderItems(selected);
  const total = orderTotal(items);
  const submit = async () => {
    if (!instantAccess || pending) return;
    setPending(true);
    try { await startCheckout(items); } finally { setPending(false); }
  };
  return <section id="checkout" className="playbook-checkout-band">
    <div className="playbook-container grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="playbook-checkout-book"><PlaybookBook /><h2 className="text-4xl sm:text-5xl text-center">Yours today for $7</h2></div>
      <div className="playbook-order-card">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-5 mb-5"><span className="font-bold">MVA Playbook (PDF)</span><span className="text-2xl font-bold">$7</span></div>
        <div className="space-y-3">{ADD_ON_IDS.map((id) => {
          const product = PLAYBOOK_PRODUCTS[id];
          return <label key={id} className={`playbook-add-on ${selected.includes(id) ? "playbook-add-on-selected" : ""}`}>
            <Checkbox aria-label={product.name} checked={selected.includes(id)} onCheckedChange={(checked) => setSelected((current) => toggleAddOn(current, id, checked === true))} className="mt-1" />
            <span className="min-w-0 flex-1"><span className="flex gap-3 justify-between text-sm font-bold"><span>{product.name}</span><span className="shrink-0">${product.price}</span></span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{product.description}</span></span>
          </label>;
        })}</div>
        <div className="flex justify-between items-center py-5 mt-3 border-t border-border"><span className="font-bold">Total</span><output aria-live="polite" aria-label="Order total" className="font-display text-4xl font-bold">${total}</output></div>
        <label className="flex items-start gap-3 mb-5 text-xs leading-relaxed text-muted-foreground"><Checkbox required checked={instantAccess} onCheckedChange={(checked) => setInstantAccess(checked === true)} aria-label="Instant PDF access acknowledgement" className="mt-1" /><span>{playbookCopy.withdrawalConsent}</span></label>
        <Button onClick={submit} disabled={pending || !instantAccess} className="playbook-button w-full">{pending ? "Opening checkout…" : checkoutPayLabel(total, selected.length > 0)}<ArrowRight /></Button>
        <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground mt-4"><LockKeyhole size={13} className="shrink-0 mt-0.5" /><span>Card, Apple Pay, Google Pay · Secure checkout · 30-day money-back guarantee</span></p>
      </div>
    </div>
  </section>;
}