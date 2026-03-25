import { useEffect, useRef, useState, useMemo } from "react";
import { Palette } from "lucide-react";
import socialProofLogos from "@/assets/social-proof-logos.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";

/* ── Dashboard mockup data ── */
const LEADS_DATA = [
  { name: "Aleksandra W.", email: "a.wojcik@gmail.com", tag: "Early Bird", paid: true, time: "2 min ago" },
  { name: "Tomasz K.", email: "tomasz.k@wp.pl", tag: "Early Bird", paid: true, time: "11 min ago" },
  { name: "Maria L.", email: "m.lewandowska@o2.pl", tag: "Lead", paid: false, time: "18 min ago" },
  { name: "Piotr B.", email: "piotr.b@gmail.com", tag: "Early Bird", paid: true, time: "34 min ago" },
];

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function HeroDashboard({ visible, isPl }: { visible: boolean; isPl: boolean }) {
  const [activeTab, setActiveTab] = useState("leads");
  const leads = useCounter(847, 2000, visible);
  const paid = useCounter(94, 2200, visible);

  return (
    <div style={{ background: "#12121a", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)", fontFamily: "'Inter', system-ui, sans-serif", animation: visible ? "float 6s ease-in-out infinite" : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>app.mailerlite.com / jay23-campaign</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
        {[
          { label: isPl ? "ŁĄCZNIE LEADÓW" : "TOTAL LEADS", value: leads.toLocaleString(), color: "#6C63FF" },
          { label: "EARLY BIRD ($1)", value: String(paid), color: "#10B981" },
          { label: "QUIZ CR", value: "38%", color: "#F59E0B" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#12121a", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginBottom: "4px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 16px" }}>
        {([["leads", isPl ? "Subskrybenci" : "Subscribers"], ["stripe", isPl ? "Płatności" : "Payments"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "9px 16px", fontSize: "11px", fontWeight: 500, background: "transparent", border: "none", borderBottom: activeTab === id ? "2px solid #6C63FF" : "2px solid transparent", color: activeTab === id ? "#fff" : "rgba(255,255,255,0.35)", cursor: "pointer", fontFamily: "inherit" }}>{label}</button>
        ))}
      </div>
      <div style={{ padding: "8px 0", maxHeight: "200px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {LEADS_DATA.map((l, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(108,99,255,0.15)", color: "#a89cff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700 }}>{l.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>{l.name}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{l.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: l.paid ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.06)", color: l.paid ? "#6ee7b7" : "rgba(255,255,255,0.4)" }}>{l.tag}</span>
                </td>
                <td style={{ padding: "10px 16px", fontSize: "10px", color: "rgba(255,255,255,0.25)", textAlign: "right" }}>{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "blink 2s ease-in-out infinite" }} />
        Stripe · {isPl ? "Płatności" : "Payments"} Early Bird · <strong style={{ color: "#fff" }}>94 × $1.00 {isPl ? "zebranych" : "collected"}</strong> · <span style={{ color: "#10B981", fontWeight: 600 }}>{isPl ? "Na żywo" : "Live"}</span>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const portfolio = [
  { name: "Chernobylite", cat: "Survival Horror", amt: "$206 671" },
  { name: "Gamedec", cat: "Cyberpunk RPG", amt: "$171 163" },
  { name: "Sher.ly", cat: "SaaS Security", amt: "$154 106" },
  { name: "Citywood", cat: "Design / Decor", amt: "$121 279" },
  { name: "PureShape", cat: "Desk Accessory", amt: "$27 075" },
  { name: "NapoSpy", cat: "Smart Wearable", amt: "$7 248" },
];

/* ── i18n content ── */
function useContent(isPl: boolean, langPrefix: string) {
  return useMemo(() => {
    const bookLink = `${langPrefix}/book`;
    const ctaText = isPl ? "Umów bezpłatną konsultację →" : "Book a Free Strategy Call →";

    const stats = isPl
      ? [
          { num: "46", label: "Kampanii zarządzanych\nKickstarter & Indiegogo" },
          { num: "$500K+", label: "Zebranych środków\nz klientami MVA" },
          { num: "3 000+", label: "Twórców korzysta\nz MVA" },
          { num: "90 dni", label: "Średni cykl\nwalidacji" },
        ]
      : [
          { num: "46", label: "Campaigns managed\nKickstarter & Indiegogo" },
          { num: "$500K+", label: "Funds raised\nwith MVA clients" },
          { num: "3,000+", label: "Creators using\nMVA Framework" },
          { num: "90 days", label: "Average validation\ncycle" },
        ];

    const phases = isPl
      ? [
          {
            num: "FAZA 01 / SETUP", name: "Infrastruktura", month: "Miesiąc 1",
            desc: "Pełny fundament techniczny gotowy przed wydaniem złotówki na ruch. Pixel, tracking, automacje, landing page — live w 30 dni.",
            items: ["Meta Pixel + GA4 zdarzenia", "MailerLite segmentacja + sekwencja powitalna", "High-converting prelaunch landing page", "Badanie publiczności + walidacja persony"],
            output: "Output: Lejek konwertujący zimny ruch w segmentowane leady",
          },
          {
            num: "FAZA 02 / BUILD", name: "Wzrost odbiorców", month: "Miesiące 2–3",
            desc: "Płatny ruch działa codziennie. Lista emailowa rośnie tydzień po tygodniu. Widzisz CPL w czasie rzeczywistym — żadnych czarnych skrzynek.",
            items: ["Kampanie Meta + Google zarządzane co tydzień", "Testy kreacji: 4+ warianty miesięcznie", "Sekwencja nurturująca aktywowana", "Raport tygodniowy z CPL tracking"],
            output: "Output: 1 600+ segmentowanych leadów gotowych na launch",
          },
          {
            num: "FAZA 03 / LAUNCH", name: "Start", month: "Miesiąc 4",
            desc: "Wypluj produkt do publiczności, która już czeka. Pierwsze 48 godzin uderza mocno. Kickstarter nagradza Cię za spike.",
            items: ["Sekwencja emaili na dzień startu (3-częściowa)", "Retargeting aktywowany na launch", "Playbook zaangażowania społeczności", "Review strony kampanii + szablony updateów"],
            output: "Output: Finansowanie w 48h lub precyzyjna diagnoza dlaczego nie",
          },
        ]
      : [
          {
            num: "PHASE 01 / SETUP", name: "Infrastructure", month: "Month 1",
            desc: "Full technical foundation ready before spending a dollar on traffic. Pixel, tracking, automations, landing page — live in 30 days.",
            items: ["Meta Pixel + GA4 events", "MailerLite segmentation + welcome sequence", "High-converting prelaunch landing page", "Audience research + persona validation"],
            output: "Output: Funnel converting cold traffic into segmented leads",
          },
          {
            num: "PHASE 02 / BUILD", name: "Audience Growth", month: "Months 2–3",
            desc: "Paid traffic runs daily. Email list grows week over week. You see CPL in real time — no black boxes.",
            items: ["Meta + Google campaigns managed weekly", "Creative testing: 4+ variants per month", "Nurture sequence activated", "Weekly report with CPL tracking"],
            output: "Output: 1,600+ segmented leads ready for launch",
          },
          {
            num: "PHASE 03 / LAUNCH", name: "Launch", month: "Month 4",
            desc: "Ship your product to an audience that's already waiting. The first 48 hours hit hard. Kickstarter rewards you for the spike.",
            items: ["Launch-day email sequence (3-part)", "Retargeting activated on launch", "Community engagement playbook", "Campaign page review + update templates"],
            output: "Output: Funded in 48h or precise diagnosis of why not",
          },
        ];

    const caseStudies = isPl
      ? [
          {
            cat: "Case 01 — Smart Wallet / Consumer Hardware",
            problem: "Woolet — połączony smart wallet — miał gotowy produkt i datę Kickstartera, ale żadnej publiczności, żadnych danych konwersji i niezwalidowanego messagingu.",
            solution: "Full crowdfunding campaign: strategia go-to-market od zera, testy A/B na kreacjach, dedykowany landing page i kompletna sekwencja emaili prelaunch.",
            result: "$332 694 zebranych na Kickstarterze — kampania przekroczyła cel i zamknęła się jako jeden z najsilniejszych launchów smart wallet na platformie tamtego roku.",
            amount: "$332,694", amountLabel: "Łącznie zebranych środków",
          },
          {
            cat: "Case 02 — Sports Tech / Wearable Device",
            problem: "Swimmo — Apple Watch dla pływaków wyczynowych — musiało dotrzeć do wyjątkowo precyzyjnej publiczności równocześnie na Facebooku, Google i przez email.",
            solution: "Full campaign management na FB Ads i AdWords z równoległą strategią mailingową, growth hackingiem i komunikacją social media przez cały czas kampanii.",
            result: "$184 305 zebranych — kampania przekroczyła cel z wielokanałowym footprintem płatnym i organicznym napędzającym awareness po zamknięciu.",
            amount: "$184,305", amountLabel: "Łącznie zebranych środków",
          },
        ]
      : [
          {
            cat: "Case 01 — Smart Wallet / Consumer Hardware",
            problem: "Woolet — a connected smart wallet — had a finished product and a Kickstarter date, but zero audience, no conversion data, and unvalidated messaging.",
            solution: "Full crowdfunding campaign: go-to-market strategy from scratch, A/B testing on creatives, dedicated landing page, and complete prelaunch email sequence.",
            result: "$332,694 raised on Kickstarter — the campaign exceeded its goal and closed as one of the strongest smart wallet launches on the platform that year.",
            amount: "$332,694", amountLabel: "Total funds raised",
          },
          {
            cat: "Case 02 — Sports Tech / Wearable Device",
            problem: "Swimmo — Apple Watch for competitive swimmers — needed to reach an extremely precise audience simultaneously on Facebook, Google, and via email.",
            solution: "Full campaign management on FB Ads and AdWords with a parallel email strategy, growth hacking, and social media communication throughout the campaign.",
            result: "$184,305 raised — the campaign exceeded its goal with a multi-channel paid and organic footprint driving awareness after close.",
            amount: "$184,305", amountLabel: "Total funds raised",
          },
        ];

    type BulletItem = string | { text: string; badge: string };
    const packages: {
      tier: string; name: string; forText: string; bullets: BulletItem[];
      price?: string; priceMonthly?: string; priceTotal?: string; note?: string;
      cta: string; ctaLink: string; style: "free" | "featured" | "standard"; badge?: string;
    }[] = isPl
      ? [
          {
            tier: "Bezpłatnie", name: "Strategic Call",
            forText: "30-minutowa rozmowa strategiczna. Wychodzisz z konkretnym planem MVA dla swojego produktu.",
            bullets: ["Analiza Twojego produktu i rynku", "Ocena potencjału prelaunch", "Rekomendacja platformy i kanałów", "Szacunkowy plan 90-dniowy", "Zero presji sprzedażowej"],
            price: "0 PLN", note: "30 minut · bez zobowiązań",
            cta: ctaText, ctaLink: bookLink, style: "free", badge: "KROK PIERWSZY",
          },
          {
            tier: "PAKIET 02", name: "Full MVA",
            forText: "Kompletny system zbudowany i prowadzony za Ciebie przez 90 dni.",
            bullets: ["Prelaunch landing page end-to-end", "Kampanie Meta + Google co tydzień", "MailerLite setup + sekwencja napisana", "Raport tygodniowy z CPL tracking", "Wsparcie w dniu startu", { text: "15 grafik statycznych pod reklamy", badge: "kreacje" }, { text: "4 video creatives pod reklamy", badge: "kreacje" }],
            priceMonthly: "6 000 PLN", priceTotal: "razem 24 000 PLN · 4 miesiące · + VAT",
            cta: ctaText, ctaLink: bookLink, style: "featured", badge: "Najpopularniejszy",
          },
          {
            tier: "PAKIET 03", name: "Launch Sprint",
            forText: "Stała data startu poniżej 45 dni — gdy liczy się każdy tydzień.",
            bullets: ["Wszystko z Full MVA, w 45 dniach", "Priorytetowy turnaround deliverables", "Dedykowany kanał Slack, dostęp dzienny", "Copy strony kampanii + brief wizualny", "Setup retargetingu post-launch", { text: "15 grafik statycznych pod reklamy", badge: "kreacje" }, { text: "4 video creatives pod reklamy", badge: "kreacje" }],
            price: "Wycena", note: "indywidualna · sprint 45-dniowy · + VAT",
            cta: ctaText, ctaLink: bookLink, style: "standard",
          },
        ]
      : [
          {
            tier: "Free", name: "Strategic Call",
            forText: "30-minute strategy call. You walk away with a concrete MVA plan for your product.",
            bullets: ["Product & market analysis", "Prelaunch potential assessment", "Platform & channel recommendation", "Estimated 90-day plan", "Zero sales pressure"],
            price: "$0", note: "30 minutes · no strings attached",
            cta: ctaText, ctaLink: bookLink, style: "free", badge: "STEP ONE",
          },
          {
            tier: "PACKAGE 02", name: "Full MVA",
            forText: "Complete system built and managed for you over 90 days.",
            bullets: ["Prelaunch landing page end-to-end", "Meta + Google campaigns managed weekly", "MailerLite setup + sequence written", "Weekly report with CPL tracking", "Launch day support", { text: "15 static ad creatives", badge: "creatives" }, { text: "4 video ad creatives", badge: "creatives" }],
            priceMonthly: "$1,500", priceTotal: "total $6,000 · 4 months · + VAT",
            cta: ctaText, ctaLink: bookLink, style: "featured", badge: "Most Popular",
          },
          {
            tier: "PACKAGE 03", name: "Launch Sprint",
            forText: "Hard launch date under 45 days — when every week counts.",
            bullets: ["Everything in Full MVA, in 45 days", "Priority turnaround on deliverables", "Dedicated Slack channel, daily access", "Campaign page copy + visual brief", "Post-launch retargeting setup", { text: "15 static ad creatives", badge: "creatives" }, { text: "4 video ad creatives", badge: "creatives" }],
            price: "Custom", note: "individual · 45-day sprint · + VAT",
            cta: ctaText, ctaLink: bookLink, style: "standard",
          },
        ];

    const faqs = isPl
      ? [
          { q: "Dlaczego nie zwykła agencja Kickstarterowa?", a: "Większość agencji aktywuje się podczas live kampanii — wtedy fundament jest już ustawiony. Różnica między kampanią, która finansuje się w 48 godzin, a taką, która ledwo dociąga do celu, powstaje przed startem. Agencje biorą $10 000–$50 000 i prowadzą ten sam playbook niezależnie od produktu. MVA Framework to specjalistyczny system zbudowany pod okno prelaunch, prowadzony bezpośrednio przez osobę, która go stworzyła." },
          { q: "Co jeśli mój produkt nie jest jeszcze gotowy?", a: "To idealny punkt startowy. MVA Framework działa najlepiej z działającym prototypem i 90+ dniami do launchu. Przy early development zaczynamy od walidacji publiczności — dowiadujesz się, czy rynek istnieje, zanim przeinwestujesz w produkcję. Gotowy produkt nie jest warunkiem. Jasna propozycja wartości jest." },
          { q: "Czy gwarantujesz wyniki finansowania?", a: "Żadna gwarancja na konkretną kwotę — każda agencja, która obiecuje dokładną liczbę, kłamie. Gwarantuję: każdy deliverable trafia na czas, każda kampania jest optymalizowana tygodniowo, dostajesz pełny data trail. Najlepszym wskaźnikiem wyników jest sama praca — dlatego case studies pokazują realne liczby, nie opinie." },
          { q: "Jak szybko zobaczę pierwsze leady?", a: "Landing page i pierwsze kampanie Meta wchodzą live w tygodniu 2. Pierwsze leady pojawiają się zazwyczaj w 48–72 godziny od uruchomienia reklamy. Pierwsze dwa tygodnie działamy na niższym budżecie testując kreacje — potem skalujemy to, co działa. Widzisz CPL w czasie rzeczywistym od tygodnia pierwszego." },
          { q: "Na jakich platformach reklamowych działasz?", a: "Meta (Facebook + Instagram) to główny kanał dla większości produktów B2C. Google Search działa równolegle przy wyraźnej intencji kategorijalnej. YouTube pre-roll dochodzi w Miesiącu 2 przy produktach z silnym demo wizualnym. TikTok — tylko przy wyraźnym demograficznym fit poniżej 35 lat. Mix wynika z Twojego produktu, nie z szablonu." },
          { q: "Co konkretnie zawiera program 90 dni, tydzień po tygodniu?", a: "T1–2: onboarding, setup pixela, brief landing page. T3–4: landing page live, pierwsze kampanie. T5–8: skalowanie, testy kreacji, email aktywowany. T9–12: konsolidacja listy, launch prep, review kampanii, sekwencja startowa. T13 (Miesiąc 4): egzekucja launch day, retargeting, komunikacja z backerami. Dostajesz pisemny harmonogram pierwszego dnia." },
        ]
      : [
          { q: "Why not a regular Kickstarter agency?", a: "Most agencies activate during the live campaign — by then the foundation is already set. The difference between a campaign that funds in 48 hours and one that barely crosses the line is built before launch. Agencies charge $10,000–$50,000 and run the same playbook regardless of product. MVA Framework is a specialized system built for the prelaunch window, run directly by the person who created it." },
          { q: "What if my product isn't ready yet?", a: "That's the ideal starting point. MVA Framework works best with a working prototype and 90+ days to launch. For early development, we start with audience validation — you find out if the market exists before you overinvest in production. A finished product isn't a requirement. A clear value proposition is." },
          { q: "Do you guarantee funding results?", a: "No guarantee on a specific amount — any agency that promises an exact number is lying. I guarantee: every deliverable ships on time, every campaign is optimized weekly, you get a full data trail. The best predictor of results is the work itself — that's why case studies show real numbers, not testimonials." },
          { q: "How quickly will I see the first leads?", a: "Landing page and first Meta campaigns go live in week 2. First leads typically appear within 48–72 hours of ad launch. The first two weeks run on a lower budget testing creatives — then we scale what works. You see CPL in real time from week one." },
          { q: "Which ad platforms do you work on?", a: "Meta (Facebook + Instagram) is the main channel for most B2C products. Google Search runs in parallel when there's clear category intent. YouTube pre-roll comes in Month 2 for products with strong visual demos. TikTok — only when there's a clear demographic fit under 35. The mix comes from your product, not a template." },
          { q: "What exactly does the 90-day program include, week by week?", a: "W1–2: onboarding, pixel setup, landing page brief. W3–4: landing page live, first campaigns. W5–8: scaling, creative testing, email activated. W9–12: list consolidation, launch prep, campaign review, launch sequence. W13 (Month 4): launch day execution, retargeting, backer communication. You get a written schedule on day one." },
        ];

    return { stats, phases, caseStudies, packages, faqs, ctaText, bookLink };
  }, [isPl, langPrefix]);
}

/* ── Component ── */
const Packages = () => {
  const { langPrefix } = useLanguage();
  const isPl = langPrefix === "/pl";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroRef, heroVisible] = useInView(0.1);
  const { stats, phases, caseStudies, packages, faqs, ctaText, bookLink } = useContent(isPl, langPrefix);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title={isPl ? "MVA Framework — Pakiety | JAY-23" : "MVA Framework — Packages | JAY-23"}
        description={isPl
          ? "Zbuduj 1 600 kupujących zanim startujesz. Wybierz pakiet MVA Framework i zacznij budować publiczność przed launchem."
          : "Build 1,600 buyers before you launch. Choose your MVA Framework package and start building your audience before launch day."
        }
        canonical={isPl ? "https://jay23.com/pl/packages" : "https://jay23.com/en/packages"}
        lang={isPl ? "pl" : "en"}
      />
      <MvaNavbar />
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
      <section ref={heroRef} className="relative overflow-hidden bg-[hsl(var(--dark-bg))] min-h-screen flex flex-col justify-center">
        {/* Glows */}
        <div className="absolute -top-[10%] -right-[15%] w-[65vw] h-[65vw] max-w-[760px] max-h-[760px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.18)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.08)_0%,transparent_65%)] pointer-events-none" />

        <div className="container mx-auto max-w-[1200px] px-6 pt-28 pb-20 relative z-10">
          <div className="grid lg:grid-cols-[1fr,auto] gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-xs font-semibold tracking-[0.12em] uppercase text-primary/80 mb-7 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                MVA Framework · {isPl ? "Program 90 dni" : "90-Day Program"}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="font-display text-[clamp(48px,6vw,88px)] font-black uppercase leading-[0.94] tracking-tight text-white mb-7"
              >
                {isPl ? (
                  <>ZBUDUJ<br />SWOICH<br /><span className="text-primary">1 600</span><br /><span className="text-white/25">KUPUJĄCYCH.</span></>
                ) : (
                  <>BUILD<br />YOUR<br /><span className="text-primary">1,600</span><br /><span className="text-white/25">BUYERS.</span></>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-[clamp(15px,1.5vw,18px)] font-light text-white/50 max-w-[520px] leading-relaxed mb-11"
              >
                {isPl
                  ? "Przestań startować w ciszy. Zbudujemy Ci listę płatnych subskrybentów Early Bird — zanim ruszy Twój Kickstarter lub prelaunch produktu."
                  : "Stop launching in silence. We'll build your paid Early Bird subscriber list — before your Kickstarter or product prelaunch goes live."
                }
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.7 }}
              >
                <Link to={bookLink} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_hsl(253_100%_62%/0.35)]">
                  {ctaText}
                </Link>
              </motion.div>
            </div>

            {/* Right: dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="flex items-center gap-2 mb-3 ml-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: "blink 2.5s ease-in-out infinite" }} />
                <span className="text-[11px] text-white/35">{isPl ? "Twoja kampania · Dzień 47 z 90" : "Your campaign · Day 47 of 90"}</span>
              </div>
              <HeroDashboard visible={heroVisible} isPl={isPl} />
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] rounded-card overflow-hidden mt-16"
          >
            {stats.map((s, i) => (
              <div key={i} className="bg-white/[0.04] p-7 hover:bg-white/[0.06] transition-colors">
                <div className="font-display text-[clamp(28px,4vw,44px)] font-extrabold text-primary leading-none mb-1.5">{s.num}</div>
                <div className="text-[11px] text-white/35 uppercase tracking-wider leading-snug whitespace-pre-line">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF MARQUEE ── */}
      <section className="bg-[hsl(var(--dark-bg))] py-8 overflow-hidden border-t border-white/[0.06]">
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
        <div className="flex items-center gap-0" style={{ animation: "marquee 30s linear infinite", width: "max-content" }}>
          {[0,1,2,3].map((i) => (
            <img key={i} src={socialProofLogos} alt={i === 0 ? (isPl ? "Partnerzy i współpraca" : "Partners & collaborations") : ""} className="h-20 w-auto object-contain opacity-70 shrink-0" aria-hidden={i > 0} />
          ))}
        </div>
      </section>

      {/* ── PROBLEM (light) ── */}
      <section className="bg-background">
        <div className="container mx-auto max-w-[1200px] px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-primary mb-3">Problem</p>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-[1.08] text-foreground">
                {isPl ? (
                  <>WIĘKSZOŚĆ PRODUKTÓW STARTUJE{" "}<span className="text-primary">BEZ ZBUDOWANEJ SPOŁECZNOŚCI</span></>
                ) : (
                  <>MOST PRODUCTS LAUNCH{" "}<span className="text-primary">WITHOUT A BUILT AUDIENCE</span></>
                )}
              </h2>
            </div>
            <div className="space-y-5 text-[15px] text-muted-foreground leading-relaxed">
              {isPl ? (
                <>
                  <p>Budujesz produkt i liczysz, że ludzie się pojawią. Pierwsze 48 godzin decyduje o wszystkim — algorytm Kickstartera promuje kampanie ze spike'iem, i karze te, które startują w ciszy.</p>
                  <p>Twoja konkurencja budowała listę przez 4 miesiące zanim kliknęłeś launch. <strong className="text-foreground font-semibold">Reklamy do zimnego ruchu podczas live kampanii spalają budżet</strong> w najgorszym możliwym momencie.</p>
                  <p>Fix to nie lepsze reklamy podczas launchu. Fix to publiczność zbudowana przed launchem. <strong className="text-foreground font-semibold">To właśnie dostarcza MVA Framework.</strong></p>
                </>
              ) : (
                <>
                  <p>You build a product and hope people show up. The first 48 hours decide everything — Kickstarter's algorithm promotes campaigns with a spike, and punishes those that launch in silence.</p>
                  <p>Your competition spent 4 months building a list before you hit launch. <strong className="text-foreground font-semibold">Cold traffic ads during a live campaign burn budget</strong> at the worst possible moment.</p>
                  <p>The fix isn't better ads during launch. The fix is an audience built before launch. <strong className="text-foreground font-semibold">That's exactly what MVA Framework delivers.</strong></p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHASES (light) ── */}
      <section className="bg-background">
        <div className="container mx-auto max-w-[1200px] px-6 pb-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-primary mb-3">{isPl ? "Framework MVA" : "MVA Framework"}</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase tracking-tight leading-[1.05] text-foreground mb-14">
            {isPl ? <>OD ODKRYCIA <span className="text-muted-foreground">DO STARTU</span></> : <>FROM DISCOVERY <span className="text-muted-foreground">TO LAUNCH</span></>}
          </h2>

          <div className="grid md:grid-cols-3 gap-3">
            {phases.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-card rounded-card p-8 border border-border hover:border-primary/30 hover:-translate-y-1 transition-all"
              >
                <p className="font-display text-[11px] font-semibold text-primary/70 uppercase tracking-[0.12em] mb-4">{p.num}</p>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground mb-1">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-5">{p.month}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                <ul className="mb-6 space-y-0">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex gap-2.5 items-start text-[13px] text-foreground/55 py-1.5 border-b border-border/50">
                      <span className="text-primary text-xs mt-0.5 shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-primary/10 rounded-lg px-3.5 py-2.5 text-xs font-medium text-primary leading-snug">{p.output}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES (light) ── */}
      <section className="bg-background">
        <div className="container mx-auto max-w-[1200px] px-6 pb-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-primary mb-3">Case Studies</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase tracking-tight leading-[1.05] text-foreground mb-14">
            {isPl
              ? <>UDANE STARTY <span className="text-muted-foreground">DZIĘKI STRATEGII AUDIENCE-FIRST</span></>
              : <>SUCCESSFUL LAUNCHES <span className="text-muted-foreground">WITH AUDIENCE-FIRST STRATEGY</span></>
            }
          </h2>

          <div className="grid md:grid-cols-2 gap-3 mb-3">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-card rounded-card p-9 border border-border flex flex-col"
              >
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-foreground/35 mb-7">{cs.cat}</p>
                <div className="flex-1 space-y-5 mb-8">
                  {[
                    { label: "PROBLEM", text: cs.problem },
                    { label: isPl ? "ROZWIĄZANIE" : "SOLUTION", text: cs.solution },
                    { label: isPl ? "WYNIK" : "RESULT", text: cs.result },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary/60 mb-1">{s.label}</p>
                      <p className="text-sm text-foreground/65 leading-relaxed">{s.text}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3 self-start">
                  <span className="font-display text-2xl font-extrabold text-foreground">{cs.amount}</span>
                  <span className="text-[11px] font-medium text-muted-foreground">{cs.amountLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Portfolio grid */}
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2.5 mt-4">{isPl ? "Więcej z portfolio" : "More from portfolio"}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {portfolio.map((p, i) => (
              <div key={i} className="bg-card rounded-card border border-border p-4 hover:border-primary/30 transition-colors">
                <p className="font-display text-[15px] font-bold uppercase tracking-tight text-foreground mb-0.5">{p.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">{p.cat}</p>
                <span className="inline-block bg-primary/10 rounded-md px-2.5 py-1 font-display text-sm font-extrabold text-foreground">{p.amt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES (light) ── */}
      <section id="packages" className="bg-background">
        <div className="container mx-auto max-w-[1200px] px-6 pb-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-primary mb-3">{isPl ? "Pakiety" : "Packages"}</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase tracking-tight leading-[1.05] text-foreground mb-14">
            {isPl
              ? <>TRZY SPOSOBY <span className="text-muted-foreground">NA WSPÓŁPRACĘ</span></>
              : <>THREE WAYS <span className="text-muted-foreground">TO WORK TOGETHER</span></>
            }
          </h2>

          <div className="grid md:grid-cols-3 gap-3">
            {packages.map((pkg, i) => {
              const isFeatured = pkg.style === "featured";
              const isFree = pkg.style === "free";

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={`rounded-card p-8 flex flex-col relative border transition-colors ${
                    isFeatured
                      ? "bg-[hsl(var(--dark-bg))] text-white border-transparent"
                      : isFree
                      ? "bg-background border-border"
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                >
                  {pkg.badge && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.08em] uppercase px-3.5 py-1 rounded-full whitespace-nowrap ${
                      isFree ? "bg-foreground text-background" : "bg-primary text-white"
                    }`}>
                      {pkg.badge}
                    </span>
                  )}

                  <p className={`font-display text-[11px] font-semibold uppercase tracking-[0.1em] mb-2 ${
                    isFeatured ? "text-primary" : isFree ? "text-muted-foreground" : "text-primary/70"
                  }`}>
                    {pkg.tier}
                  </p>
                  <h3 className={`font-display text-[28px] font-extrabold uppercase tracking-tight mb-1.5 ${
                    isFeatured ? "text-white" : "text-foreground"
                  }`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-[13px] leading-snug mb-6 ${
                    isFeatured ? "text-white/45" : "text-muted-foreground"
                  }`}>
                    {pkg.forText}
                  </p>

                  <hr className={`mb-5 ${
                    isFeatured ? "border-white/[0.08]" : "border-border"
                  }`} />

                  <ul className="flex-1 mb-7 space-y-0">
                    {pkg.bullets.map((b, j) => {
                      const text = typeof b === "string" ? b : b.text;
                      const badge = typeof b === "object" ? b.badge : null;
                      return (
                        <li key={j} className={`flex gap-2 items-start text-[13px] py-2 border-b leading-snug ${
                          isFeatured
                            ? "text-white/50 border-white/[0.07]"
                            : "text-foreground/60 border-border/60"
                        }`}>
                          <span className="text-primary text-xs mt-0.5 shrink-0">→</span>
                          <span>
                            {text}
                            {badge && (
                              <span className={`inline-block ml-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded align-middle ${
                                isFeatured
                                  ? "bg-primary/25 text-primary/80"
                                  : "bg-primary/10 text-primary"
                              }`}>
                                {badge}
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Price */}
                  {pkg.priceMonthly ? (
                    <div className="mb-1">
                      <span className={`font-display text-4xl font-extrabold ${isFeatured ? "text-white" : "text-foreground"}`}>
                        {pkg.priceMonthly}
                      </span>
                      <span className={`text-[13px] font-medium ml-1 ${isFeatured ? "text-white/40" : "text-muted-foreground"}`}>/ {isPl ? "miesiąc" : "month"}</span>
                      {pkg.priceTotal && (
                        <p className={`text-xs mt-1 mb-1 ${isFeatured ? "text-white/30" : "text-muted-foreground"}`}>{pkg.priceTotal}</p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-1">
                      <span className={`font-display text-4xl font-extrabold ${isFeatured ? "text-white" : "text-foreground"}`}>
                        {pkg.price}
                      </span>
                    </div>
                  )}
                  {pkg.note && (
                    <p className={`text-xs mb-5 ${isFeatured ? "text-white/35" : "text-muted-foreground"}`}>{pkg.note}</p>
                  )}

                  {/* CTA */}
                  <Link
                    to={pkg.ctaLink}
                    className={`block text-center font-semibold text-sm py-3.5 px-5 rounded-full transition-all ${
                      isFeatured
                        ? "bg-primary text-white hover:brightness-110 hover:-translate-y-0.5"
                        : isFree
                        ? "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
                        : "border-2 border-primary/25 text-primary hover:border-primary"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Creatives note */}
          <div className="flex items-start gap-4 mt-4 bg-card rounded-card border border-border p-6">
            <Palette className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-display text-sm font-bold text-foreground mb-1">
                {isPl ? "Produkcja kreacji reklamowych w cenie" : "Ad creative production included"}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isPl
                  ? "Każdy płatny pakiet zawiera 15 grafik statycznych i 4 video creatives gotowych do uruchomienia w Meta Ads i Google. Żadnych dodatkowych agencji kreatywnych — wszystko w jednym miejscu."
                  : "Every paid package includes 15 static graphics and 4 video creatives ready to run on Meta Ads and Google. No extra creative agencies — everything in one place."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (light) ── */}
      <section className="bg-background">
        <div className="container mx-auto max-w-[1200px] px-6 pb-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-primary mb-3">FAQ</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase tracking-tight leading-[1.05] text-foreground mb-14">
            {isPl
              ? <>SZCZERE ODPOWIEDZI <span className="text-muted-foreground">NA TRUDNE PYTANIA</span></>
              : <>HONEST ANSWERS <span className="text-muted-foreground">TO HARD QUESTIONS</span></>
            }
          </h2>

          <div className="border-t border-border">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex justify-between items-center gap-5 py-6 text-left font-display text-[clamp(17px,2vw,22px)] font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                  >
                    {faq.q}
                    <span className={`shrink-0 w-7 h-7 border-2 border-primary/20 rounded-full flex items-center justify-center text-primary text-lg transition-transform ${isOpen ? "rotate-45 border-primary" : ""}`}>
                      +
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px]" : "max-h-0"}`}>
                    <p className="pb-6 text-[15px] text-muted-foreground leading-relaxed max-w-[720px]">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-primary">
        <div className="container mx-auto max-w-[1200px] px-6 py-20 text-center">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/50 mb-4">{isPl ? "Zacznij teraz" : "Start now"}</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] font-black uppercase text-white leading-none mb-8">
            {isPl ? (
              <>PRZESTAŃ STARTOWAĆ W CISZY.<br />ZACZNIJ BUDOWAĆ POPYT.</>
            ) : (
              <>STOP LAUNCHING IN SILENCE.<br />START BUILDING DEMAND.</>
            )}
          </h2>
          <Link
            to={bookLink}
            className="inline-flex items-center gap-2.5 bg-white text-primary font-semibold text-[15px] px-8 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition-all"
          >
            {ctaText}
          </Link>
          <p className="text-[13px] text-white/40 mt-4 font-light">
            {isPl
              ? "Rozmowa 30 minut. Wychodzisz z planem — niezależnie czy mnie zatrudnisz."
              : "30-minute call. You walk away with a plan — whether you hire me or not."
            }
          </p>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default Packages;
