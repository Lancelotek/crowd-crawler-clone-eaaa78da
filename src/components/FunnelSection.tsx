const steps = [
  { label: "REACH — Organic + Paid", pct: "100%", width: "100%" },
  { label: "STOP — Scroll stopper hook", pct: "40%", width: "90%" },
  { label: "CONSUME — Watch / Read to end", pct: "20%", width: "80%" },
  { label: "ENGAGE — Comment, Save, Share", pct: "8%", width: "70%" },
  { label: "FOLLOW / JOIN — True Fan", pct: "3%", width: "60%" },
];

const FunnelSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="container mx-auto">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          // Conversion Funnel
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.94] tracking-tight mb-16">
          The MVA
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>
            Funnel
          </span>
        </h2>
        <div className="flex flex-col items-center gap-1 max-w-[620px] mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="w-full flex justify-between items-center px-8 py-4 font-bold text-sm uppercase tracking-wide hover:brightness-110 transition"
              style={{
                width: step.width,
                backgroundColor: `hsl(var(--primary) / ${1 - i * 0.18})`,
                color: i < 3 ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                clipPath: "polygon(0 0, 100% 0, 96.5% 100%, 3.5% 100%)",
              }}
            >
              <span>{step.label}</span>
              <span className="text-xs opacity-70 font-mono">{step.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunnelSection;
