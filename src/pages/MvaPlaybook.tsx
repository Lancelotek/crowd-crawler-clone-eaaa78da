import { useEffect, useState } from "react";
import { ArrowRight, Check, X, ShieldCheck, Users, Target, CreditCard, Cpu, Gamepad2, Code2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import PlaybookHeader from "@/components/playbook/PlaybookHeader";
import PlaybookBook from "@/components/playbook/PlaybookBook";
import PlaybookCheckout from "@/components/playbook/PlaybookCheckout";
import { playbookCopy as c } from "@/content/mvaPlaybook";
import "@/styles/mva-playbook.css";

const categoryIcons = [Cpu, Gamepad2, Code2, ShoppingBag];
const stepIcons = [Users, Target, CreditCard];

export default function MvaPlaybook() {
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  useEffect(() => {
    const checkout = document.getElementById("checkout");
    if (!checkout) return;
    const observer = new IntersectionObserver(([entry]) => setCheckoutVisible(entry?.isIntersecting ?? false));
    observer.observe(checkout);
    return () => observer.disconnect();
  }, []);
  return <div className="mva-playbook">
    <SEOHead title="MVA Playbook — Build a Paying Audience for $7 | JAY-23" description="Build your ICP, test ad angles and collect $1-3 pre-payments before launch. Get the $7 MVA Playbook with a 30-day money-back guarantee." canonical="/en/mva-playbook" lang="en" />
    <PlaybookHeader />
    <main>
      <section className="playbook-hero">
        <div className="playbook-container">
          <p className="playbook-proof">{c.proof}</p>
          <div className="playbook-hero-grid">
            <div><h1>STOP LAUNCHING<br />TO <span className="text-primary">STRANGERS.</span></h1><p className="playbook-hero-sub">{c.sub}</p><Button asChild className="playbook-button"><a href="#checkout">{c.cta}<ArrowRight /></a></Button><p className="playbook-micro">{c.micro}</p></div>
            <PlaybookBook />
          </div>
        </div>
      </section>
      <section className="playbook-results playbook-container"><div className="grid gap-3 sm:grid-cols-3">{c.results.map((result) => { const [number, name] = result.split(" raised - "); return <div className="playbook-result-card" key={result}><span className="font-display text-4xl sm:text-5xl font-bold">{number}</span><span className="text-sm text-muted-foreground">raised - {name}</span></div>; })}</div><p className="text-center text-sm text-muted-foreground mt-5">{c.resultsNote}</p></section>
      <section className="playbook-section"><div className="playbook-container grid gap-10 lg:grid-cols-2"><h2>{c.problemTitle}</h2><ul className="space-y-0">{c.problems.map((problem) => <li className="flex items-start gap-4 py-4 border-b border-border" key={problem}><X size={20} className="text-destructive shrink-0 mt-0.5" /><span>{problem}</span></li>)}</ul></div></section>
      <section className="playbook-section bg-secondary"><div className="playbook-container"><div className="max-w-2xl"><h2>{c.mechanismTitle}</h2><p className="mt-5 text-muted-foreground">{c.mechanismIntro}</p></div><div className="grid gap-4 md:grid-cols-3 mt-8">{c.commitments.map((text, i) => <div className="playbook-step-card" key={text}><span className="playbook-step-number">0{i + 1}</span><p className="font-bold mt-5">{i + 1}. {text}</p></div>)}</div><h3 className="mt-14 text-3xl">{c.systemTitle}</h3><div className="grid gap-4 md:grid-cols-3 mt-6">{c.steps.map((step, i) => { const Icon = stepIcons[i]; return <div key={step.title} className="playbook-system-card"><Icon className="text-primary mb-6" size={24} /><h4 className="text-2xl leading-tight">{step.title}</h4><p className="text-sm text-muted-foreground mt-4 leading-relaxed">{step.body}</p></div>; })}</div></div></section>
      <section className="playbook-section"><div className="playbook-container grid lg:grid-cols-[0.8fr_1.2fr] gap-10"><div><h2>{c.insideTitle}</h2><div className="playbook-inside-art hidden lg:block"><PlaybookBook /></div></div><ul>{c.inside.map((text) => <li className="flex items-start gap-4 border-b border-border py-4" key={text}><Check size={20} className="text-success shrink-0 mt-0.5" /><span>{text}</span></li>)}</ul></div></section>
      <section className="playbook-section bg-secondary"><div className="playbook-container"><div className="max-w-3xl"><h2>{c.objectionTitle}</h2><p className="text-lg text-muted-foreground mt-5">{c.objectionBody}</p></div><h2 className="mt-14">{c.categoryTitle}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8">{c.categories.map((category, i) => { const Icon = categoryIcons[i]; return <div className="playbook-system-card" key={category.title}><Icon size={26} className="text-primary mb-6" /><h3 className="text-2xl">{category.title}</h3><p className="text-sm text-muted-foreground mt-3">{category.body}</p></div>; })}</div></div></section>
      <section className="playbook-section"><div className="playbook-container"><div className="playbook-guarantee"><ShieldCheck size={38} className="text-success shrink-0" /><div><h2 className="text-success">{c.guaranteeTitle}</h2><p className="mt-3">{c.guaranteeBody}</p></div></div></div></section>
      <PlaybookCheckout />
      <section className="playbook-section"><div className="playbook-container max-w-3xl"><h2 className="mb-6">FAQ</h2><Accordion type="single" collapsible>{c.faqs.map((faq, i) => <AccordionItem value={`faq-${i}`} key={faq.q}><AccordionTrigger className="text-left text-base font-bold">{faq.q}</AccordionTrigger><AccordionContent className="text-muted-foreground text-base leading-relaxed">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    </main>
    {!checkoutVisible && <div className="playbook-mobile-cta"><Button asChild className="playbook-button w-full"><a href="#checkout">{c.cta}<ArrowRight /></a></Button></div>}
  </div>;
}