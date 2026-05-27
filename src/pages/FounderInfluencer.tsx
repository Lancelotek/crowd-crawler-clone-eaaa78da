import { useEffect, useRef, useState } from "react";
import { Check, Mic, Cog, TrendingUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";

const FAQ_ITEMS = [
  {
    q: "Ludzie zobaczą, że to AI i poczują się oszukani — prawda?",
    a: "Tylko jeśli to ukrywasz. Uczymy cię prowadzić z odkrytymi kartami — twoja publiczność szanuje transparentność. Founderzy z tremą przed kamerą to cicha większość; wielu się z tym utożsami. Twój insight jest aktywem. Avatar to tylko megafon.",
  },
  {
    q: "A jeśli jestem totalnie nieznany? Czy AI video w ogóle zadziała?",
    a: "Lepiej niż cokolwiek innego. Nieznani founderzy mają jedną przewagę: nic do stracenia. Avatar usuwa tarcie produkcyjne — wysyłasz 20× więcej niż founder, który wciąż 'czeka aż będzie gotowy'. Częstotliwość wygrywa.",
  },
  {
    q: "Czy potrzebuję produktu zanim zacznę?",
    a: "Nie. To jest zaprojektowane dla pre-product founderów. Cały sens MVA to zbudowanie publiczności PRZED produktem, żeby launch nie był krzykiem w pustkę.",
  },
  {
    q: "Ile czasu mi to zajmie tygodniowo?",
    a: "Po jednorazowym 2-minutowym setupie klona — 30–60 minut tygodniowo. Szybki review skryptów, Loom z tym co masz w głowie, czasami akceptacja. Bez nagrywania. Nigdy.",
  },
  {
    q: "Czym to się różni od używania HeyGen samemu?",
    a: "HeyGen to narzędzie. Founder Influencer to system. Narzędzie daje pusty avatar. System daje 90-dniowy plan, skrypty, rytm publikacji, playbook dystrybucji, framework budowy audytorium — i prowadzi to za ciebie. Używamy HeyGen (i innych) pod spodem; my po prostu łączymy je w coś co wysyła.",
  },
  {
    q: "Kiedy startuje pełny serwis Founder Influencer?",
    a: "Gdy 1000 founderów powie nam, że tego chce. Pobierz Playbook, odpowiedz na welcome email, a będziesz pierwszy w kolejce.",
  },
];

const PROBLEM_CHECKS = [
  "Mam pomysły. Po prostu zamarzam, gdy włącza się kamera.",
  "Co kwartał obiecuję sobie, że zacznę postować.",
  "Jestem zbyt zajęty budowaniem, żeby spędzić 5 godzin nad jednym filmem.",
];

const COMPARISON_ROWS: Array<{ label: string; us: string; tool: string; agency: string; self: string }> = [
  { label: "Godziny przed kamerą / tydz.", us: "0", tool: "0–2", agency: "4–10", self: "5–15" },
  { label: "Strategia / framework", us: "✓ MVA, plan 90 dni", tool: "✗ Brak", agency: "~ Generyczna", self: "✗ DIY" },
  { label: "Skrypty pisane za ciebie", us: "✓", tool: "✗", agency: "✓", self: "✗" },
  { label: "Setup i utrzymanie avatara", us: "✓ Zarządzane", tool: "~ DIY learning curve", agency: "✗ N/D", self: "✗ N/D" },
  { label: "Publikacja i dystrybucja", us: "✓ Done for you", tool: "✗", agency: "✓ Done for you", self: "✗ DIY" },
  { label: "YT long + Shorts + LinkedIn", us: "✓ Wszystkie trzy", tool: "~ Zależnie od tool", agency: "~ Zwykle jeden kanał", self: "~ Wybierz jeden" },
  { label: "Multilingual (PL/EN/DE)", us: "✓ Natywnie przez AI", tool: "✓ Ale skrypt każdego osobno", agency: "✗ Jeden język", self: "✗ Jeden język" },
  { label: "Pre-product founderzy", us: "✓ Natywnie", tool: "✗ Generycznie", agency: "✗ Established brands", self: "n/d" },
  { label: "Pricing outcome-based", us: "✓ 1000 fanów w 90 dni", tool: "✗ Subskrypcja SaaS", agency: "✗ Retainer, bez gwarancji", self: "n/d" },
  { label: "Koszt miesięcznie", us: "$2–8K (managed)", tool: "$30–120 (tylko tool)", agency: "$3–15K", self: "$0 (twój czas)" },
];

function OptInForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError("Podaj prawidłowy adres email.");
      return;
    }
    console.log("submit", email);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-foreground">
        <p className="text-lg font-medium">Sprawdź skrzynkę za 2 minuty. Playbook już leci.</p>
        <p className="mt-2 text-sm text-muted-foreground">Jeśli nie widzisz maila — sprawdź spam lub napisz na hello@jay23.com.</p>
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
        placeholder="twoj@email.com"
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Wyślij mi Playbook
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">Korzystamy z MailerLite. Bez spamu. Wypisz się kiedy chcesz.</p>
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
  const optInRef = useRef<HTMLDivElement>(null);

  const scrollToOptIn = () => optInRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    // ensure top on first paint
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Pierwszy AI Founder OS — Zero godzin przed kamerą"
        description="100% AI workflow z twoim avatarem. Zero godzin przed kamerą. 1000 prawdziwych fanów w 90 dni. Bezpłatny 47-stronicowy Playbook."
        canonical="/pl/founder-influencer"
        lang={lang}
        hreflangOverrides={{ en: "/pl/founder-influencer", pl: "/pl/founder-influencer" }}
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Founder Influencer — AI Founder OS",
          description: "100% AI workflow z twoim avatarem. Zero godzin przed kamerą. 1000 fanów w 90 dni.",
          url: "https://jay23.com/pl/founder-influencer",
          inLanguage: "pl",
        }}
      />
      <MvaNavbar />

      <main className="mx-auto max-w-[1100px] px-5 pt-28 md:px-8">
        {/* SECTION 1 — HERO */}
        <section className="grid gap-12 py-12 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <p className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Nowość — pierwszy AI Founder OS
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
              Twój produkt nie jest gotowy. Twoja kamera tym bardziej. Twój AI avatar nie ma wymówek.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              100% AI workflow. Twoja twarz, twój głos, twój kanał — generowane i publikowane za ciebie. 1000 prawdziwych fanów w 90 dni, zero godzin przed kamerą.
            </p>
            <div className="mt-8">
              <button
                onClick={scrollToOptIn}
                className="rounded-lg bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Pobierz Founder Influencer Playbook
              </button>
              <p className="mt-3 text-sm text-muted-foreground">
                Bezpłatny PDF. 47 stron. 90-dniowy plan, scripty, prompty, stack narzędzi.
              </p>
            </div>
          </div>

          {/* AI Avatar duality SVG */}
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
              {/* left silhouette - real */}
              <circle cx="110" cy="100" r="42" fill="url(#real)" />
              <path d="M50 200 Q110 150 170 200 L170 240 L50 240 Z" fill="url(#real)" />
              <text x="110" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))">TY</text>
              {/* divider */}
              <line x1="200" y1="40" x2="200" y2="280" stroke="hsl(var(--border))" strokeDasharray="4 4" />
              {/* right silhouette - AI */}
              <circle cx="290" cy="100" r="42" fill="url(#ai)" />
              <path d="M230 200 Q290 150 350 200 L350 240 L230 240 Z" fill="url(#ai)" />
              <text x="290" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))">TWÓJ AI</text>
              {/* video thumbnails grid */}
              <g transform="translate(60,300)">
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={i * 56} y={0} width="48" height="32" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
                ))}
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 2 — PROBLEM */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Nie masz problemu z contentem. Masz problem z kamerą.
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>
              Masz coś do powiedzenia. Realny insight. Ostrzejsze myślenie niż 90% LinkedIna. Ale za każdym razem gdy siadasz nagrać, trzy rzeczy zabijają sesję: zapominasz tekstu, nie podoba ci się jak wyglądasz, nie masz 4 godzin na poprawki.
            </p>
            <p>
              Więc nie shippujesz. A founder z połową twojego insightu, który mimo wszystko wcisnął REC, właśnie wyprzedał swój pre-order. Audytorium kompounduje — ale tylko gdy shippujesz. Do tej pory shipping wymagał pokazania się. Już nie.
            </p>
          </div>
          <ul className="mt-10 space-y-3">
            {PROBLEM_CHECKS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 3 — THE SHIFT */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Każdy founder musi być twórcą. AI właśnie usunęło jedyną wymówkę.
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>
              W 2026 roku 38,7% twórców lifestyle publikuje przez AI avatary. Faceless twórcy shippują 3–5× częściej niż face-on — a częstotliwość bije osobowość w skali 12 miesięcy. Technologia nie jest już pytaniem. Pytaniem jest strategia.
            </p>
            <p>Pomagamy ci przestać być bottleneckiem. Twój AI avatar publikuje. Ty skupiasz się na produkcie.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-3xl font-bold text-primary">0 godz.</p>
              <p className="mt-2 text-muted-foreground">przed kamerą tygodniowo (po 2-min setupie)</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-3xl font-bold text-primary">3–5×</p>
              <p className="mt-2 text-muted-foreground">wyższa częstotliwość publikacji vs. face-on</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Źródła: D-ID 2026 AI Avatar Report, Founder-Led Marketing Trends 2026</p>
        </section>

        {/* SECTION 4 — HOW IT WORKS */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Jak to działa</h2>
          <p className="mt-3 text-lg text-muted-foreground">Od foundera do kanału w jedno popołudnie. Potem 90 dni compoundingu.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: 1, icon: Mic, t: "Nagraj raz. 2 minuty.", b: "Jednorazowy setup. Usiądź przed dowolną kamerą w laptopie. Łapiemy twoją twarz, głos, gesty. Twój AI avatar gotowy. Już nigdy nie dotykasz kamery." },
              { n: 2, icon: Cog, t: "Pomysły → scripty → video. Co tydzień.", b: "Wydobywamy pomysły z twoich calli z klientami, draftów na X, voice memo i Slack DM. Piszemy scripty. Twój avatar je nagrywa. Jeden long-form YT, pięć Shortsów, trzy posty na LinkedIn. Co tydzień. Gdy śpisz." },
              { n: 3, icon: TrendingUp, t: "1000 prawdziwych fanów w 90 dni.", b: "Nie tylko publikujemy. Aplikujemy MVA Framework — dystrybucja, engagement, capture, walidacja. Twój kanał staje się twoim MVA. Do dnia 90 masz audytorium, które kupi cokolwiek shippniesz." },
            ].map(({ n, icon: Icon, t, b }) => (
              <div key={n} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{n}</span>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 — COMPARISON */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Dlaczego nie po prostu HeyGen, agencja albo nagrywanie samemu?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">Tu jest uczciwy breakdown.</p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th scope="col" className="py-3 pr-4 font-medium text-muted-foreground"></th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-primary">Jay23 Founder Influencer</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-muted-foreground">DIY AI tool (HeyGen, Argil, Synthesia)</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-muted-foreground">Agencja (SocialRevver, Notus, Lever)</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-muted-foreground">Sam nagrywasz</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-border align-top">
                    <th scope="row" className="py-3 pr-4 text-left font-medium text-foreground">{r.label}</th>
                    <td className="py-3 pr-4 text-foreground">{r.us}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r.tool}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r.agency}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r.self}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-muted-foreground">
            Jesteśmy jedynymi, którzy łączą stack AI, framework i serwis done-with-you.
          </p>
        </section>

        {/* SECTION 6 — 90-DAY PATH */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Plan na 90 dni.</h2>
          <p className="mt-3 text-lg text-muted-foreground">Trzy fazy. Każda shippuje kompoundujący output.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { p: "Faza 1 · Dni 1–30", t: "Głos", items: ["Jedno 2-min nagranie → twój AI klon live", "Definicja founder thesis (spiky opinion tylko twojej)", "Ship pierwszych 8 video (1 long + 5 shorts/tydz.)"] },
              { p: "Faza 2 · Dni 31–60", t: "Rytm", items: ["4 long-form + 20 Shortsów + 12 postów LinkedIn", "Test 5 hooków, double down na tych co kompoundują", "Pierwsze 200 prawdziwych fanów przez targeted dystrybucję"] },
              { p: "Faza 3 · Dni 61–90", t: "Compounding", items: ["Multilingual deployment (PL/EN/DE jeśli relevantne)", "Pierwszy opt-in (waitlist / newsletter / pre-order)", "1000 prawdziwych fanów i przygotowanie launchu produktu"] },
            ].map((ph) => (
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
          <p className="mt-6 text-muted-foreground">
            Playbook daje ci dokładne scripty, prompty i stack na każdą fazę. Serwis to za ciebie prowadzi.
          </p>
        </section>

        {/* SECTION 7 — ELEPHANT */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Tak, to AI. Nie ukrywamy tego.</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>
              Autentyczność nie polega na tym, że twoja szczęka jest w ostrości. Polega na twoich pomysłach, twoim osądzie, twoim głosie. AI to tylko medium — jak edytor, ghostwriter czy operator kamery. Kiedyś potrzebowałeś wszystkich trzech. Teraz jedno narzędzie.
            </p>
            <p>
              Nie udajemy, że avatar to człowiek. Pierwsze video na twoim kanale powie: „To mój AI avatar — oto dlaczego go używam". Twoja publiczność doceni szczerość. Część się utożsami. Founderzy z tremą przed kamerą to cicha większość.
            </p>
            <p>
              Jeśli twój insight jest prawdziwy, AI to tylko głośnik. Jeśli twój insight jest pusty, żadna jakość produkcji cię nie uratuje.
            </p>
          </div>
          <blockquote className="mt-10 border-l-4 border-primary pl-6 text-xl font-medium italic text-foreground md:text-2xl">
            AI to tylko medium. Substancja wciąż należy do ciebie.
          </blockquote>
        </section>

        {/* SECTION 8 — OPT-IN */}
        <section id="get-the-playbook" ref={optInRef} className="border-t border-border py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Pobierz Founder Influencer Playbook.</h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Bezpłatny. 47 stron. 90-dniowy plan, prompty, stack narzędzi, scripty. Bez upsellu.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Checklist 2-minutowego setupu klona (porównanie HeyGen, Argil, Captions)",
                  "30 gotowych scriptów video dla technicznych founderów",
                  "90-dniowy kalendarz publikacji (tydzień po tygodniu)",
                  "MVA validation checklist — czy jesteś gotowy do launchu?",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <OptInForm />
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Najczęstsze pytania</h2>
          <div className="mt-8">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
