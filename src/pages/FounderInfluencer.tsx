import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Mic, Cog, TrendingUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import { supabase } from "@/integrations/supabase/client";

type Lang = "pl" | "en";

const COPY = {
  pl: {
    seoTitle: "AI Founder OS — Zero godzin przed kamerą | JAY-23",
    seoDesc: "100% AI workflow z twoim avatarem. Zero godzin przed kamerą. 1000 prawdziwych fanów w 90 dni. Bezpłatny 47-stronicowy Playbook.",
    eyebrow: "Nowość — pierwszy AI Founder OS",
    h1: "Twój produkt nie jest gotowy. Twoja kamera tym bardziej. Twój AI avatar nie ma wymówek.",
    sub: "100% AI workflow. Twoja twarz, twój głos, twój kanał — generowane i publikowane za ciebie. 1000 prawdziwych fanów w 90 dni, zero godzin przed kamerą.",
    cta: "Pobierz Founder Influencer Playbook",
    ctaSub: "Bezpłatny PDF. 47 stron. 90-dniowy plan, scripty, prompty, stack narzędzi.",
    you: "TY", yourAi: "TWÓJ AI",
    s2h: "Nie masz problemu z contentem. Masz problem z kamerą.",
    s2p1: "Masz coś do powiedzenia. Realny insight. Ostrzejsze myślenie niż 90% LinkedIna. Ale za każdym razem gdy siadasz nagrać, trzy rzeczy zabijają sesję: zapominasz tekstu, nie podoba ci się jak wyglądasz, nie masz 4 godzin na poprawki.",
    s2p2: "Więc nie shippujesz. A founder z połową twojego insightu, który mimo wszystko wcisnął REC, właśnie wyprzedał swój pre-order. Audytorium kompounduje — ale tylko gdy shippujesz. Do tej pory shipping wymagał pokazania się. Już nie.",
    checks: [
      "Mam pomysły. Po prostu zamarzam, gdy włącza się kamera.",
      "Co kwartał obiecuję sobie, że zacznę postować.",
      "Jestem zbyt zajęty budowaniem, żeby spędzić 5 godzin nad jednym filmem.",
    ],
    s3h: "Każdy founder musi być twórcą. AI właśnie usunęło jedyną wymówkę.",
    s3p1: "W 2026 roku 38,7% twórców lifestyle publikuje przez AI avatary. Faceless twórcy shippują 3–5× częściej niż face-on — a częstotliwość bije osobowość w skali 12 miesięcy. Technologia nie jest już pytaniem. Pytaniem jest strategia.",
    s3p2: "Pomagamy ci przestać być bottleneckiem. Twój AI avatar publikuje. Ty skupiasz się na produkcie.",
    stat1Big: "0 godz.", stat1Sub: "przed kamerą tygodniowo (po 2-min setupie)",
    stat2Big: "3–5×", stat2Sub: "wyższa częstotliwość publikacji vs. face-on",
    s3sources: "Źródła: D-ID 2026 AI Avatar Report, Founder-Led Marketing Trends 2026",
    s4h: "Jak to działa",
    s4sub: "Od foundera do kanału w jedno popołudnie. Potem 90 dni compoundingu.",
    steps: [
      { t: "Nagraj raz. 2 minuty.", b: "Jednorazowy setup. Usiądź przed dowolną kamerą w laptopie. Łapiemy twoją twarz, głos, gesty. Twój AI avatar gotowy. Już nigdy nie dotykasz kamery." },
      { t: "Pomysły → scripty → video. Co tydzień.", b: "Wydobywamy pomysły z twoich calli z klientami, draftów na X, voice memo i Slack DM. Piszemy scripty. Twój avatar je nagrywa. Jeden long-form YT, pięć Shortsów, trzy posty na LinkedIn. Co tydzień. Gdy śpisz." },
      { t: "1000 prawdziwych fanów w 90 dni.", b: "Nie tylko publikujemy. Aplikujemy MVA Framework — dystrybucja, engagement, capture, walidacja. Twój kanał staje się twoim MVA. Do dnia 90 masz audytorium, które kupi cokolwiek shippniesz." },
    ],
    s5h: "Dlaczego nie po prostu HeyGen, agencja albo nagrywanie samemu?",
    s5sub: "Tu jest uczciwy breakdown.",
    s5cols: ["", "Jay23 Founder Influencer", "DIY AI tool (HeyGen, Argil, Synthesia)", "Agencja (SocialRevver, Notus, Lever)", "Sam nagrywasz"],
    s5rows: [
      ["Godziny przed kamerą / tydz.", "0", "0–2", "4–10", "5–15"],
      ["Strategia / framework", "✓ MVA, plan 90 dni", "✗ Brak", "~ Generyczna", "✗ DIY"],
      ["Scripty pisane za ciebie", "✓", "✗", "✓", "✗"],
      ["Setup i utrzymanie avatara", "✓ Zarządzane", "~ DIY learning curve", "✗ N/D", "✗ N/D"],
      ["Publikacja i dystrybucja", "✓ Done for you", "✗", "✓ Done for you", "✗ DIY"],
      ["YT long + Shorts + LinkedIn", "✓ Wszystkie trzy", "~ Zależnie od tool", "~ Zwykle jeden kanał", "~ Wybierz jeden"],
      ["Multilingual (PL/EN/DE)", "✓ Natywnie przez AI", "✓ Ale skrypt każdego osobno", "✗ Jeden język", "✗ Jeden język"],
      ["Pre-product founderzy", "✓ Natywnie", "✗ Generycznie", "✗ Established brands", "n/d"],
      ["Pricing outcome-based", "✓ 1000 fanów w 90 dni", "✗ Subskrypcja SaaS", "✗ Retainer, bez gwarancji", "n/d"],
      ["Koszt miesięcznie", "$2–8K (managed)", "$30–120 (tylko tool)", "$3–15K", "$0 (twój czas)"],
    ],
    s5foot: "Jesteśmy jedynymi, którzy łączą stack AI, framework i serwis done-with-you.",
    s6h: "Plan na 90 dni.",
    s6sub: "Trzy fazy. Każda shippuje kompoundujący output.",
    phases: [
      { p: "Faza 1 · Dni 1–30", t: "Głos", items: ["Jedno 2-min nagranie → twój AI klon live", "Definicja founder thesis (spiky opinion tylko twojej)", "Ship pierwszych 8 video (1 long + 5 shorts/tydz.)"] },
      { p: "Faza 2 · Dni 31–60", t: "Rytm", items: ["4 long-form + 20 Shortsów + 12 postów LinkedIn", "Test 5 hooków, double down na tych co kompoundują", "Pierwsze 200 prawdziwych fanów przez targeted dystrybucję"] },
      { p: "Faza 3 · Dni 61–90", t: "Compounding", items: ["Multilingual deployment (PL/EN/DE jeśli relevantne)", "Pierwszy opt-in (waitlist / newsletter / pre-order)", "1000 prawdziwych fanów i przygotowanie launchu produktu"] },
    ],
    s6foot: "Playbook daje ci dokładne scripty, prompty i stack na każdą fazę. Serwis to za ciebie prowadzi.",
    s7h: "Tak, to AI. Nie ukrywamy tego.",
    s7p1: "Autentyczność nie polega na tym, że twoja szczęka jest w ostrości. Polega na twoich pomysłach, twoim osądzie, twoim głosie. AI to tylko medium — jak edytor, ghostwriter czy operator kamery. Kiedyś potrzebowałeś wszystkich trzech. Teraz jedno narzędzie.",
    s7p2: "Nie udajemy, że avatar to człowiek. Pierwsze video na twoim kanale powie: „To mój AI avatar — oto dlaczego go używam\". Twoja publiczność doceni szczerość. Część się utożsami. Founderzy z tremą przed kamerą to cicha większość.",
    s7p3: "Jeśli twój insight jest prawdziwy, AI to tylko głośnik. Jeśli twój insight jest pusty, żadna jakość produkcji cię nie uratuje.",
    s7quote: "AI to tylko medium. Substancja wciąż należy do ciebie.",
    s8h: "Pobierz Founder Influencer Playbook.",
    s8sub: "Bezpłatny. 47 stron. 90-dniowy plan, prompty, stack narzędzi, scripty. Bez upsellu.",
    s8bullets: [
      "Checklist 2-minutowego setupu klona (porównanie HeyGen, Argil, Captions)",
      "30 gotowych scriptów video dla technicznych founderów",
      "90-dniowy kalendarz publikacji (tydzień po tygodniu)",
      "MVA validation checklist — czy jesteś gotowy do launchu?",
    ],
    emailPh: "twoj@email.com",
    submit: "Wyślij mi Playbook",
    consent: "Akceptuję",
    consentLink: "politykę prywatności",
    consentTail: "i zgadzam się na otrzymywanie emaili.",
    consentError: "Musisz zaakceptować politykę prywatności.",
    emailError: "Podaj prawidłowy adres email.",
    success: "Sprawdź skrzynkę za 2 minuty. Playbook już leci.",
    successSub: "Jeśli nie widzisz maila — sprawdź spam lub napisz na hello@jay23.com.",
    micro: "Korzystamy z MailerLite. Bez spamu. Wypisz się kiedy chcesz.",
    calendlyTitle: "Wolisz porozmawiać?",
    calendlySub: "Umów 30-minutową rozmowę strategii Founder Influencer. Zero zobowiązań.",
    calendlyBtn: "Umów bezpłatną rozmowę →",
    s9h: "Najczęstsze pytania",
    faq: [
      { q: "Ludzie zobaczą, że to AI i poczują się oszukani — prawda?", a: "Tylko jeśli to ukrywasz. Uczymy cię prowadzić z odkrytymi kartami — twoja publiczność szanuje transparentność. Founderzy z tremą przed kamerą to cicha większość; wielu się z tym utożsami. Twój insight jest aktywem. Avatar to tylko megafon." },
      { q: "A jeśli jestem totalnie nieznany? Czy AI video w ogóle zadziała?", a: "Lepiej niż cokolwiek innego. Nieznani founderzy mają jedną przewagę: nic do stracenia. Avatar usuwa tarcie produkcyjne — wysyłasz 20× więcej niż founder, który wciąż 'czeka aż będzie gotowy'. Częstotliwość wygrywa." },
      { q: "Czy potrzebuję produktu zanim zacznę?", a: "Nie. To jest zaprojektowane dla pre-product founderów. Cały sens MVA to zbudowanie publiczności PRZED produktem, żeby launch nie był krzykiem w pustkę." },
      { q: "Ile czasu mi to zajmie tygodniowo?", a: "Po jednorazowym 2-minutowym setupie klona — 30–60 minut tygodniowo. Szybki review skryptów, Loom z tym co masz w głowie, czasami akceptacja. Bez nagrywania. Nigdy." },
      { q: "Czym to się różni od używania HeyGen samemu?", a: "HeyGen to narzędzie. Founder Influencer to system. Narzędzie daje pusty avatar. System daje 90-dniowy plan, skrypty, rytm publikacji, playbook dystrybucji, framework budowy audytorium — i prowadzi to za ciebie. Używamy HeyGen (i innych) pod spodem; my po prostu łączymy je w coś co wysyła." },
      { q: "Kiedy startuje pełny serwis Founder Influencer?", a: "Gdy 1000 founderów powie nam, że tego chce. Pobierz Playbook, odpowiedz na welcome email, a będziesz pierwszy w kolejce." },
    ],
  },
  en: {
    seoTitle: "AI Founder OS — Zero Hours on Camera | JAY-23",
    seoDesc: "100% AI workflow with your own avatar. Zero hours on camera. 1,000 true fans in 90 days. Free 47-page Founder Influencer Playbook.",
    eyebrow: "New — The first AI Founder OS",
    h1: "Your product isn't ready. Your camera even less so. Your AI avatar has no excuses.",
    sub: "100% AI workflow. Your face, your voice, your channel — generated and published for you. 1,000 true fans in 90 days, with zero hours on camera.",
    cta: "Get the Founder Influencer Playbook",
    ctaSub: "Free PDF. 47 pages. The 90-day plan, the scripts, the prompts, the tool stack.",
    you: "YOU", yourAi: "YOUR AI",
    s2h: "You don't have a content problem. You have a camera problem.",
    s2p1: "You have things to say. Real insight. Sharper thinking than 90% of LinkedIn. But every time you sit down to record, three things kill the session: you forget your line, you don't like how you look, you don't have 4 hours to redo it.",
    s2p2: "So you don't ship. And the founder with half your insight, who hit record anyway, just sold out their pre-order. Audience compounds — but only when you ship. Until now, shipping required showing up. It doesn't anymore.",
    checks: [
      "I have ideas. I just freeze when the camera turns on.",
      "I keep promising myself I'll start posting next quarter.",
      "I'm too busy building to spend 5 hours on one video.",
    ],
    s3h: "Every founder must be a creator. AI just removed the only excuse.",
    s3p1: "In 2026, 38.7% of lifestyle creators publish through AI avatars. Faceless creators ship 3–5× more often than face-on ones — and frequency beats personality over 12 months. The technology is no longer the question. The strategy is.",
    s3p2: "We help you stop being the bottleneck. Your AI avatar publishes. You stay focused on the product.",
    stat1Big: "0 hours", stat1Sub: "on camera per week (after 2-min setup)",
    stat2Big: "3–5×", stat2Sub: "higher publishing frequency vs. face-on",
    s3sources: "Sources: D-ID 2026 AI Avatar Report, Founder-Led Marketing Trends 2026",
    s4h: "How it works",
    s4sub: "From founder to channel in one afternoon. Then 90 days of compounding.",
    steps: [
      { t: "Record once. 2 minutes.", b: "One-time setup. Sit in front of any laptop camera. We capture your face, voice, gestures. Your AI avatar is ready. You never touch a camera again." },
      { t: "Ideas → scripts → videos. Weekly.", b: "We mine your customer calls, X drafts, voice memos, and Slack DMs for ideas. We script them. Your avatar shoots them. One long-form YouTube, five Shorts, three LinkedIn posts. Every week. While you sleep." },
      { t: "1,000 true fans in 90 days.", b: "We don't just publish. We apply the MVA Framework — distribute, engage, capture, validate. Your channel becomes your MVA. By day 90, you have an audience that buys whatever you launch next." },
    ],
    s5h: "Why not just use HeyGen, hire an agency, or post yourself?",
    s5sub: "Here's the honest breakdown.",
    s5cols: ["", "Jay23 Founder Influencer", "DIY AI tool (HeyGen, Argil, Synthesia)", "Agency (SocialRevver, Notus, Lever)", "Post yourself"],
    s5rows: [
      ["Hours on camera per week", "0", "0–2", "4–10", "5–15"],
      ["Strategy / framework", "✓ MVA, 90-day plan", "✗ None", "~ Generic", "✗ DIY"],
      ["Scripts written for you", "✓", "✗", "✓", "✗"],
      ["Avatar setup & maintenance", "✓ Managed", "~ DIY learning curve", "✗ N/A", "✗ N/A"],
      ["Publishing & distribution", "✓ Done for you", "✗", "✓ Done for you", "✗ DIY"],
      ["YT long + Shorts + LinkedIn", "✓ All three", "~ Tool dependent", "~ Usually one channel", "~ Pick one"],
      ["Multilingual (PL/EN/DE)", "✓ Native via AI", "✓ But you script each", "✗ One language", "✗ One language"],
      ["Pre-product founder focus", "✓ Native", "✗ Generic", "✗ Established brands", "n/a"],
      ["Outcome-based pricing", "✓ 1,000 fans in 90d", "✗ SaaS subscription", "✗ Retainer, no guarantee", "n/a"],
      ["Monthly cost", "$2–8K (managed)", "$30–120 (tool only)", "$3–15K", "$0 (your time)"],
    ],
    s5foot: "We're the only ones combining the AI tool stack, the framework, and the done-with-you service.",
    s6h: "The 90-day path.",
    s6sub: "Three phases. Each one ships compounding output.",
    phases: [
      { p: "Phase 1 · Days 1–30", t: "Voice", items: ["One 2-min recording → your AI clone is live", "Define your founder thesis (the spiky opinion only you have)", "Ship the first 8 videos (1 long + 5 shorts/week)"] },
      { p: "Phase 2 · Days 31–60", t: "Rhythm", items: ["4 long-form + 20 Shorts + 12 LinkedIn posts shipped", "Test 5 hooks, double down on what compounds", "Build your first 200 true fans through targeted distribution"] },
      { p: "Phase 3 · Days 61–90", t: "Compound", items: ["Multilingual deployment (PL/EN/DE if relevant)", "Open the first opt-in (waitlist / newsletter / pre-order)", "Hit 1,000 true fans and prepare the product launch"] },
    ],
    s6foot: "The Playbook gives you the exact scripts, prompts, and tool stack for each phase. The service runs it for you.",
    s7h: "Yes, it's AI. We're not hiding it.",
    s7p1: "Authenticity isn't about your jawline being in focus. It's about your ideas, your judgment, your voice. AI is just the medium — like an editor, a ghostwriter, or a camera operator. You used to need all three. Now you need one tool.",
    s7p2: "We don't pretend the avatar is human. The first video on your channel will say 'this is my AI avatar — here's why I'm using it.' Your audience will respect the honesty. Some will even relate. Camera-shy founders are the silent majority.",
    s7p3: "If your insight is real, the AI is just the loudspeaker. If your insight is fake, no production value saves you.",
    s7quote: "AI is just the medium. The substance is still yours.",
    s8h: "Get the Founder Influencer Playbook.",
    s8sub: "Free. 47 pages. The 90-day plan, the prompts, the tool stack, the scripts. No upsell.",
    s8bullets: [
      "The 2-minute clone setup checklist (HeyGen, Argil, Captions compared)",
      "30 ready-to-use video scripts for technical founders",
      "The 90-day publishing calendar (week by week)",
      "The MVA validation checklist — are you ready to launch?",
    ],
    emailPh: "your@email.com",
    submit: "Send me the Playbook",
    consent: "I accept the",
    consentLink: "privacy policy",
    consentTail: "and agree to receive emails.",
    consentError: "You must accept the privacy policy.",
    emailError: "Enter a valid email address.",
    success: "Check your inbox in 2 minutes. The Playbook is on its way.",
    successSub: "If you don't see it — check spam or email hello@jay23.com.",
    micro: "We use MailerLite. No spam. Unsubscribe whenever.",
    s9h: "Common questions",
    faq: [
      { q: "Won't people see it's AI and feel cheated?", a: "Only if you hide it. We coach you to lead with the disclosure — your audience respects transparency. Camera-shy founders are the silent majority; many will relate. Your insight is the asset. The avatar is just the megaphone." },
      { q: "What if I'm a complete unknown? Will AI video even work?", a: "Better than anything else. Unknown founders have one advantage: nothing to lose. The avatar removes the production friction so you can ship 20× more than the founder who's still 'waiting to feel ready'. Frequency wins." },
      { q: "Do I need a product before starting?", a: "No. This is designed for pre-product founders. The whole point of MVA is to build the audience first, so your eventual launch isn't shouting into the void." },
      { q: "How much time will this take per week?", a: "After the one-time 2-minute clone setup, plan for 30–60 minutes per week — a quick review of scripts, a Loom of what's on your mind, occasional approvals. No filming. Ever." },
      { q: "What's the difference between this and using HeyGen myself?", a: "HeyGen is a tool. Founder Influencer is a system. The tool gives you a blank avatar. The system gives you a 90-day plan, the scripts, the publishing rhythm, the distribution playbook, the audience-building framework — and runs it for you. We use HeyGen (and others) under the hood; we just connect them into something that ships." },
      { q: "When does the full Founder Influencer service launch?", a: "When 1,000 founders tell us they want it. Get the Playbook, reply to the welcome email, and you'll be first in line." },
    ],
  },
} as const;

function OptInForm({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) { setError(c.emailError); return; }
    if (!consent) { setError(c.consentError); return; }
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("founder-influencer-subscribe", {
        body: { email: email.trim(), lang, consent },
      });
      if (fnError || (data && data.success === false)) {
        throw new Error(fnError?.message || data?.error || "Subscription failed");
      }
      setSent(true);
    } catch (err) {
      console.error("founder-influencer subscribe error", err);
      setError(c.emailError);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-foreground">
        <p className="text-lg font-medium">{c.success}</p>
        <p className="mt-2 text-sm text-muted-foreground">{c.successSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <label htmlFor="fi-email" className="sr-only">Email</label>
      <input
        id="fi-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={c.emailPh}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <label className="flex cursor-pointer items-start gap-3 py-1 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary"
          aria-describedby="fi-consent-text"
        />
        <span id="fi-consent-text">
          {c.consent}{" "}
          <Link to={`/${lang}/privacy-policy`} target="_blank" rel="noopener" className="text-primary underline-offset-2 hover:underline">
            {c.consentLink}
          </Link>{" "}
          {c.consentTail}
        </span>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "..." : c.submit}
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">{c.micro}</p>
    </form>
  );
}

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-foreground md:text-lg">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-6 pr-8 text-muted-foreground">{a}</p>}
    </div>
  );
}

export default function FounderInfluencer() {
  const { lang } = useLanguage();
  const safeLang: Lang = lang === "pl" ? "pl" : "en";
  const c = COPY[safeLang];
  const optInRef = useRef<HTMLDivElement>(null);
  const scrollToOptIn = () => optInRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const stepIcons = [Mic, Cog, TrendingUp];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={c.seoTitle}
        description={c.seoDesc}
        canonical={`/${safeLang}/founder-influencer`}
        lang={safeLang}
        hreflangOverrides={{ en: "/en/founder-influencer", pl: "/pl/founder-influencer" }}
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Founder Influencer — AI Founder OS",
          description: c.seoDesc,
          url: `https://jay23.com/${safeLang}/founder-influencer`,
          inLanguage: safeLang,
        }}
      />
      <MvaNavbar />

      <main className="mx-auto max-w-[1100px] px-5 pt-28 md:px-8">
        {/* HERO */}
        <section className="grid gap-12 py-12 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <p className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {c.eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">{c.h1}</h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">{c.sub}</p>
            <div className="mt-8">
              <button
                onClick={scrollToOptIn}
                className="rounded-lg bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {c.cta}
              </button>
              <p className="mt-3 text-sm text-muted-foreground">{c.ctaSub}</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <svg viewBox="0 0 400 360" className="w-full max-w-[380px]" aria-hidden="true">
              <defs>
                <linearGradient id="real" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="ai" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <circle cx="110" cy="100" r="42" fill="url(#real)" />
              <path d="M50 200 Q110 150 170 200 L170 240 L50 240 Z" fill="url(#real)" />
              <text x="110" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))">{c.you}</text>
              <line x1="200" y1="40" x2="200" y2="280" stroke="hsl(var(--border))" strokeDasharray="4 4" />
              <circle cx="290" cy="100" r="42" fill="url(#ai)" />
              <path d="M230 200 Q290 150 350 200 L350 240 L230 240 Z" fill="url(#ai)" />
              <text x="290" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))">{c.yourAi}</text>
              <g transform="translate(60,300)">
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={i * 56} y={0} width="48" height="32" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
                ))}
              </g>
            </svg>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s2h}</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>{c.s2p1}</p>
            <p>{c.s2p2}</p>
          </div>
          <ul className="mt-10 space-y-3">
            {c.checks.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SHIFT */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s3h}</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>{c.s3p1}</p>
            <p>{c.s3p2}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-3xl font-bold text-primary">{c.stat1Big}</p>
              <p className="mt-2 text-muted-foreground">{c.stat1Sub}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-3xl font-bold text-primary">{c.stat2Big}</p>
              <p className="mt-2 text-muted-foreground">{c.stat2Sub}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{c.s3sources}</p>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s4h}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{c.s4sub}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={s.t} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                  <p className="mt-3 text-muted-foreground">{s.b}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMPARISON */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s5h}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{c.s5sub}</p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {c.s5cols.map((col, i) => (
                    <th key={i} scope="col" className={`py-3 pr-4 ${i === 1 ? "font-semibold text-primary" : i === 0 ? "font-medium text-muted-foreground" : "font-medium text-muted-foreground"}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.s5rows.map((r) => (
                  <tr key={r[0]} className="border-b border-border align-top">
                    <th scope="row" className="py-3 pr-4 text-left font-medium text-foreground">{r[0]}</th>
                    <td className="py-3 pr-4 text-foreground">{r[1]}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r[2]}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r[3]}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-muted-foreground">{c.s5foot}</p>
        </section>

        {/* 90-DAY PATH */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s6h}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{c.s6sub}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.phases.map((ph) => (
              <div key={ph.t} className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{ph.p}</p>
                <h3 className="mt-2 text-2xl font-semibold">{ph.t}</h3>
                <ul className="mt-4 space-y-2">
                  {ph.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">{c.s6foot}</p>
        </section>

        {/* ELEPHANT */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s7h}</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>{c.s7p1}</p>
            <p>{c.s7p2}</p>
            <p>{c.s7p3}</p>
          </div>
          <blockquote className="mt-10 border-l-4 border-primary pl-6 text-xl font-medium italic text-foreground md:text-2xl">
            {c.s7quote}
          </blockquote>
        </section>

        {/* OPT-IN */}
        <section id="get-the-playbook" ref={optInRef} className="border-t border-border py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s8h}</h2>
              <p className="mt-3 text-lg text-muted-foreground">{c.s8sub}</p>
              <ul className="mt-6 space-y-3">
                {c.s8bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <OptInForm lang={safeLang} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.s9h}</h2>
          <div className="mt-8">
            {c.faq.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
