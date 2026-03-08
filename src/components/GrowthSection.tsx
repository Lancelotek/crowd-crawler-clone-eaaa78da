const tactics = [
  { icon: "🎯", title: "Comment Bombing", desc: "Leave 10 high-value comments daily on accounts followed by your ICA. Genuine insights that attract attention — not empty compliments." },
  { icon: "🔁", title: "Content Loops", desc: "Create posts that provoke a response from other creators. Contrarian opinions, rankings, unpopular takes — the algorithm rewards debate." },
  { icon: "⚡", title: "Trend Surfing", desc: "Don't follow trends — attach your content to trending audio/hashtags as a backdrop for your own POV. External reach, internal brand." },
  { icon: "🤝", title: "Micro Collabs", desc: "Partner with creators 3×–10× bigger through value-first outreach: prepare a ready post idea for them. Outreach conversion increases 5×." },
  { icon: "💾", title: "Save Triggers", desc: "Every post needs \"save value\": list, rule, template, cheatsheet. Saves are the #1 distribution signal for the algorithm in 2025." },
  { icon: "📊", title: "Data-Driven Week", desc: "Every Sunday: review top 3 posts by reach. Find the pattern. Next week: 50% of content is variations of that winning pattern." },
  { icon: "🧲", title: "Lead Magnet Posts", desc: "Posts that promise value in response to a comment (\"comment WANT and I'll send you…\"). Builds engagement and contacts simultaneously." },
  { icon: "🔥", title: "First Hour Push", desc: "First 60 min after publishing: reply to every comment, ask 5 trusted people to engage. The algorithm scores your post in 90 minutes." },
];

const GrowthSection = () => {
  return (
    <section id="growth" className="py-24 px-6 bg-card">
      <div className="container mx-auto">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          // Organic Growth Tactics
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.94] tracking-tight mb-16">
          Growth
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>
            Hacking Stack
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {tactics.map((t, i) => (
            <div key={i} className="bg-card p-6 hover:bg-secondary transition-colors">
              <div className="text-3xl mb-3.5">{t.icon}</div>
              <h3 className="text-base font-extrabold uppercase tracking-tight mb-2">{t.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
