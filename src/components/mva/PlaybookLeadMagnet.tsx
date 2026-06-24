import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, CheckCircle2, FileText } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent, track as trackPredef } from "@/lib/tracking";

const PDF_URL = "/prelaunch-checklist.pdf";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
});

type Props = {
  bookLink: string;
};

const track = (event: string, params: Record<string, unknown> = {}) => {
  trackEvent(event, { ...params, source: "prelaunch-playbook" });
};

const triggerDownload = () => {
  const a = document.createElement("a");
  a.href = PDF_URL;
  a.download = "JAY23-Prelaunch-Checklist.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const PlaybookLeadMagnet = ({ bookLink }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ name, email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    track("lead_magnet_submit", { magnet: "prelaunch-checklist-pdf" });
    try {
      const { error: fnError } = await supabase.functions.invoke("mailerlite-subscribe", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          source: "prelaunch-playbook-pdf",
        },
      });
      if (fnError) throw fnError;
      track("generate_lead", {
        magnet: "prelaunch-checklist-pdf",
        value: 1,
        currency: "USD",
      });
      setDone(true);
      // small delay so the click feels intentional
      setTimeout(triggerDownload, 250);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again in a moment.");
      track("lead_magnet_error", { magnet: "prelaunch-checklist-pdf" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="lead-magnet"
      className="scroll-mt-28 my-20"
      aria-label="Download the pre-launch checklist"
    >
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[hsl(253_100%_62%/0.08)] via-white/[0.02] to-transparent p-8 sm:p-12">
        <div className="absolute -top-24 -right-20 w-[360px] h-[360px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.18)_0%,transparent_65%)] pointer-events-none" />

        <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          {/* Left — pitch */}
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-primary/85 mb-4 flex items-center gap-2">
              <FileText size={13} /> Free PDF · 2 pages · printable
            </p>
            <h3 className="font-display text-[clamp(26px,3vw,38px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-4">
              The 60-day <span className="text-primary">Pre-Launch Checklist</span>.
            </h3>
            <p className="text-[15.5px] text-white/65 leading-relaxed mb-6 font-light">
              Every step from this playbook, condensed into a checklist you can print and run against
              your launch. Same framework we use across 46 campaigns and $1.2M+ raised.
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-white/75">
              {[
                "All 3 phases (Discover, Build, Launch) in checkbox form",
                "Target CPL benchmarks by category",
                "The 4-wave activation, hour by hour",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary mt-[3px] flex-none" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form / success */}
          <div className="rounded-2xl border border-white/8 bg-[hsl(var(--dark-bg))]/60 backdrop-blur p-6 sm:p-7">
            {!done ? (
              <form onSubmit={onSubmit} noValidate>
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-white/55 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  maxLength={80}
                  required
                  disabled={loading}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-colors mb-4"
                  placeholder="Marek"
                />
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-white/55 mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  maxLength={255}
                  required
                  disabled={loading}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-colors mb-4"
                  placeholder="you@company.com"
                />
                {error && (
                  <p className="text-[13px] text-red-400 mb-3" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-6 py-3.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Preparing your PDF…" : (<><Download size={16} /> Send me the checklist</>)}
                </button>
                <p className="text-[11.5px] text-white/40 mt-3 leading-relaxed">
                  We'll email you the PDF and occasional pre-launch playbook notes. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <CheckCircle2 size={20} />
                  <span className="text-[13px] font-semibold tracking-wider uppercase">PDF on the way</span>
                </div>
                <h4 className="font-display text-[22px] font-black uppercase tracking-tight text-white mb-3 leading-tight">
                  Your download has started.
                </h4>
                <p className="text-[14.5px] text-white/65 leading-relaxed mb-5 font-light">
                  Didn't see it? <button onClick={triggerDownload} className="text-primary underline underline-offset-4 hover:no-underline">Re-download the PDF</button>. We've also queued a copy to your inbox.
                </p>
                <Link
                  to={`${bookLink.split("?")[0]}?source=playbook-pdf`}
                  onClick={() =>
                    track("cta_click", {
                      cta: "book_call_after_pdf",
                      destination: "/book",
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-[14.5px] px-6 py-3.5 rounded-lg hover:brightness-110 transition-all"
                >
                  Book a free 30-min strategy call <ArrowRight size={16} />
                </Link>
                <p className="text-[11.5px] text-white/40 mt-3 leading-relaxed">
                  Same framework, run for you. Walk out of the call with a concrete MVA plan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaybookLeadMagnet;
