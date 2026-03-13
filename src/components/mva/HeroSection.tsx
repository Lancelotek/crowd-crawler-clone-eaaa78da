import { useEffect, useRef, useState } from "react";

// ─── Mock dashboard data ────────────────────────────────────────────────────

const LEADS = [
  { name: "Aleksandra W.", email: "a.wojcik@gmail.com", tag: "Early Bird", paid: true, time: "2 min ago" },
  { name: "Tomasz K.", email: "tomasz.k@wp.pl", tag: "Early Bird", paid: true, time: "11 min ago" },
  { name: "Maria L.", email: "m.lewandowska@o2.pl", tag: "Lead", paid: false, time: "18 min ago" },
  { name: "Piotr B.", email: "piotr.b@gmail.com", tag: "Early Bird", paid: true, time: "34 min ago" },
  { name: "Karolina N.", email: "karolina.n@wp.pl", tag: "Lead", paid: false, time: "51 min ago" },
  { name: "Michał S.", email: "michal.s@gmail.com", tag: "Early Bird", paid: true, time: "1h ago" },
];

const STRIPE_PAYMENTS = [
  { name: "Aleksandra W.", amount: "$1.00", status: "paid" },
  { name: "Tomasz K.", amount: "$1.00", status: "paid" },
  { name: "Piotr B.", amount: "$1.00", status: "paid" },
  { name: "Michał S.", amount: "$1.00", status: "paid" },
];

// ─── Hooks ──────────────────────────────────────────────────────────────────

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

// ─── Dashboard mock ─────────────────────────────────────────────────────────

function HeroDashboard({ visible }: { visible: boolean }) {
  const [activeTab, setActiveTab] = useState("leads");
  const leads = useCounter(847, 2000, visible);
  const paid = useCounter(94, 2200, visible);

  return (
    <div style={{
      background: "#12121a",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
      boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      fontFamily: "'Inter', system-ui, sans-serif",
      animation: visible ? "float 6s ease-in-out infinite" : "none",
    }}>
      {/* Window chrome */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>
          app.mailerlite.com / jay23-campaign
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.04)", margin: "0" }}>
        {[
          { label: "Total leads", value: leads.toLocaleString(), color: "#6C63FF" },
          { label: "Early Bird ($1)", value: String(paid), color: "#10B981" },
          { label: "Quiz CR", value: "38%", color: "#F59E0B" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#12121a", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginBottom: "4px", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>{s.label}</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 16px" }}>
        {([["leads", "Subscribers"], ["stripe", "Payments"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding: "9px 16px",
            fontSize: "11px",
            fontWeight: 500,
            background: "transparent",
            border: "none",
            borderBottom: activeTab === id ? "2px solid #6C63FF" : "2px solid transparent",
            color: activeTab === id ? "#fff" : "rgba(255,255,255,0.35)",
            cursor: "pointer",
            fontFamily: "inherit",
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ padding: "8px 0", maxHeight: "240px", overflow: "hidden" }}>
        {activeTab === "leads" ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {LEADS.map((l, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "rgba(108,99,255,0.15)", color: "#a89cff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", fontWeight: 700,
                      }}>
                        {l.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>{l.name}</div>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{l.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px",
                      background: l.paid ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.06)",
                      color: l.paid ? "#6ee7b7" : "rgba(255,255,255,0.4)",
                    }}>
                      {l.tag}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "10px", color: "rgba(255,255,255,0.25)", textAlign: "right" as const }}>{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {STRIPE_PAYMENTS.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "10px 16px", fontSize: "12px", fontWeight: 600, color: "#fff" }}>{p.name}</td>
                  <td style={{ padding: "10px 12px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{p.amount}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right" as const }}>
                    <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: "rgba(16,185,129,0.12)", color: "#6ee7b7" }}>paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer ticker */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse 2s ease-in-out infinite" }} />
        Live · 3 new leads in the last hour
      </div>
    </div>
  );
}

// ─── Main Hero ──────────────────────────────────────────────────────────────

const HeroSection = () => {
  const [heroRef, heroVisible] = useInView(0.1);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        background: "#0a0a12",
        padding: "140px 24px 100px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-30%", right: "-15%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            {/* Eyebrow badge */}
            <div className="flex items-center gap-2 mb-6" style={{ animation: heroVisible ? "fadeSlideUp 0.6s ease 0.1s both" : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
                MVA Framework · 90-day program
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "20px",
                animation: heroVisible ? "fadeSlideUp 0.7s ease 0.2s both" : "none",
              }}
            >
              Build your first<br />
              <span style={{ color: "#6C63FF" }}>1,000 true fans</span><br />
              in 90 days.
            </h1>

            {/* Hook */}
            <p style={{
              fontSize: "17px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.5)",
              maxWidth: "460px",
              marginBottom: "32px",
              animation: heroVisible ? "fadeSlideUp 0.7s ease 0.3s both" : "none",
            }}>
              Stop launching to silence. We build you a list of{" "}
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>paying Early Bird subscribers</span>
              {" "}— before your Kickstarter or launch day.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap" style={{ marginBottom: "40px", animation: heroVisible ? "fadeSlideUp 0.6s ease 0.4s both" : "none" }}>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-bold text-sm rounded-xl hover:brightness-110 transition-all animate-pulse-cta"
              >
                Calculate your MVA
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a
                href="#solution"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                See how it works
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-4 flex-wrap" style={{ animation: heroVisible ? "fadeSlideUp 0.6s ease 0.5s both" : "none" }}>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#F59E0B">
                      <path d="M10 1l2.47 5.01L18 6.9l-4 3.9.94 5.5L10 13.77 5.06 16.3 6 10.8 2 6.9l5.53-.89L10 1z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                  Trusted by 12,000+ founders
                </span>
              </div>

              <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)" }} />

              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                $600K+ raised by MVA clients
              </span>

              <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)" }} />

              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                Avg. 3,000+ leads per campaign
              </span>
            </div>
          </div>

          {/* RIGHT — dashboard mockup */}
          <div className="relative hidden lg:block" style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}>
            {/* Floating label above */}
            <div className="flex items-center gap-2 mb-3" style={{ marginLeft: "16px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6C63FF", animation: "pulse 2.5s ease-in-out infinite" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Your campaign · Day 47 of 90</span>
            </div>

            <HeroDashboard visible={heroVisible} />

            {/* Floating stat card — Stripe */}
            <div style={{
              position: "absolute",
              bottom: "-24px",
              left: "-28px",
              background: "#16161f",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              animation: heroVisible ? "fadeSlideUp 0.6s ease 1.2s both" : "none",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "10px",
                background: "rgba(99,91,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginBottom: "2px" }}>Stripe · Early Bird payments</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>94 × $1.00 collected</div>
              </div>
              <div style={{ fontSize: "10px", color: "#10B981", fontWeight: 600 }}>Live</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
