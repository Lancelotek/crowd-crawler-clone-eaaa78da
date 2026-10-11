import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import PlaybookHeader from "@/components/playbook/PlaybookHeader";
import { playbookCopy as c, PLAYBOOK_PRODUCTS } from "@/content/mvaPlaybook";
import { startCheckout, getConfirmedPlaybookOrder, trackConfirmedPlaybookPurchase } from "@/lib/playbookCheckout";
import "@/styles/mva-playbook.css";

export default function MvaPlaybookThankYou() {
  useEffect(() => {
    let active = true;
    void getConfirmedPlaybookOrder().then((order) => { if (active && order) trackConfirmedPlaybookPurchase(order); });
    return () => { active = false; };
  }, []);
  return <div className="mva-playbook playbook-thank-you">
    <SEOHead title="Your MVA Playbook Is on Its Way | JAY-23" description="Your MVA Playbook is on its way. Add a 1-hour strategic audit to build your ICP, ad angles and pre-payment plan with JAY-23." canonical="/en/mva-playbook/thank-you" noIndex lang="en" />
    <PlaybookHeader />
    <main className="playbook-container py-16 sm:py-24 max-w-3xl">
      <div className="playbook-success-mark"><Check size={30} /></div>
      <h1 className="mt-8 text-5xl sm:text-6xl">{c.thankTitle}</h1><p className="mt-6 text-lg text-muted-foreground leading-relaxed">{c.thankBody}</p>
      <div className="playbook-upsell"><h2>{c.upsellTitle}</h2><p className="mt-5 text-muted-foreground leading-relaxed">{c.upsellBody}</p><Button className="playbook-button mt-8 w-full" onClick={() => void startCheckout([PLAYBOOK_PRODUCTS.audit])}>{c.upsellCta}<ArrowRight /></Button></div>
      <Link to="/en" className="block text-center text-sm text-muted-foreground underline underline-offset-4 mt-7">{c.decline}</Link>
    </main>
  </div>;
}