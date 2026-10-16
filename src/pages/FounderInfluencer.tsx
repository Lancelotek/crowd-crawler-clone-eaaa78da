import { PAGE_COPY, COPY } from "@/content/founderInfluencerCopy";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Mic, Cog, TrendingUp, ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { trackAdsConversion } from "@/lib/tracking";
import founderVideo from "@/assets/founder-avatar.mp4.asset.json";

function FounderVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [unmuted, setUnmuted] = useState(false);

  const unmute = () => {
    const v = ref.current;
    if (!v || unmuted) return;
    v.muted = false;
    v.volume = 1;
    const p = v.play();
    if (p && typeof p.then === "function") p.catch(() => {});
    setUnmuted(true);
  };

  useEffect(() => {
    if (unmuted) return;
    const handler = () => unmute();
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", handler, opts);
    window.addEventListener("keydown", handler, opts);
    window.addEventListener("touchstart", handler, opts);
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [unmuted]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      controls
      controlsList="nodownload"
      preload="metadata"
      className="h-auto w-full"
      aria-label={label}
      onClick={unmute}
    />
  );
}

type Lang = "pl" | "en";



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
      <label htmlFor="fi-email" className="sr-only">{PAGE_COPY.text[0]}</label>
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

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Calendly → Google Ads conversion tracking
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event && e.data.event === "calendly.event_scheduled") {
        trackAdsConversion("1xSfCInJ56IaEILXrOsD");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

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
              <a
                href="https://calendly.com/marekciesla/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {c.calendlyBtn} <ArrowRight size={18} />
              </a>
              <p className="mt-3 text-sm text-muted-foreground">{c.calendlySub}</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-border bg-secondary shadow-xl">
              <FounderVideo src={founderVideo.url} label={c.yourAi} />
            </div>
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

        {/* PERSONAL BRAND WEDGE */}
        <section className="border-t border-border py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.brandH}</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>{c.brandP1}</p>
            <p>{c.brandP2}</p>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {c.brandBullets.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span className="text-foreground">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            {c.brandBlog}
            <Link
              to={lang === "pl" ? "/pl/blog/heygen-po-polsku-czy-dziala" : "/en/founder-influencer"}
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              {c.brandBlogLink}
            </Link>
          </p>
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

        {/* CTA — Calendly (primary) */}
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
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col justify-center text-center">
              <h3 className="text-2xl font-bold tracking-tight">{c.calendlyTitle}</h3>
              <p className="mt-3 text-muted-foreground">{c.calendlySub}</p>
              <a
                href="https://calendly.com/marekciesla/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {c.calendlyBtn} <ArrowRight size={18} />
              </a>
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

        {/* CALENDLY EMBED */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-[680px] text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.calendlyTitle}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{c.calendlySub}</p>
          </div>
          <div className="mx-auto max-w-[900px] rounded-card border border-border bg-background overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/marekciesla/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0B0B0F&text_color=F6F6FA&primary_color=6C5CE7"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
