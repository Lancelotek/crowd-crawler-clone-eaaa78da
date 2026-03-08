import { useState } from "react";

const prompts = [
  { id: "PROMPT_01", title: "Pattern Break Architect", text: "Act as a senior Instagram growth strategist. Analyse my niche [NICHE] and identify oversaturated content patterns. Create 10 post ideas that break those patterns while working with the algorithm. Each idea must feel unexpected and stop the scroll.", tag: "Discovery" },
  { id: "PROMPT_02", title: "Hook Hijacker", text: "Act as a viral copywriter who studies high-retention Instagram posts. Rewrite my idea [IDEA] into 5 brutally strong opening hooks designed to stop scrolling instantly. Each hook must create curiosity and tension without clickbait.", tag: "Hooks" },
  { id: "PROMPT_03", title: "Silent Content Multiplier", text: "Act as a faceless content expert. Convert this idea [IDEA] into a text-only or visual-only post that requires no talking, no face, and no trends. Optimise for saves, shares, and re-reads while keeping it simple enough to post consistently.", tag: "Format" },
  { id: "PROMPT_04", title: "Algorithm Rewrite", text: "Act as an Instagram algorithm analyst. Rewrite this post [POST] to maximise watch time, completion rate, and saves. Structure the copy so each line pulls the reader to the next — creating natural momentum without sounding promotional.", tag: "Algorithm" },
  { id: "PROMPT_05", title: "Scroll Retention Engineer", text: "Act as a retention specialist. Break this post [POST] into a line-by-line sequence that forces readers to keep scrolling. Each line should slightly increase curiosity or value so people feel compelled to read the entire post.", tag: "Retention" },
  { id: "PROMPT_06", title: "Repurpose Everywhere", text: "Act as a content repurposing strategist. Turn this single Instagram post [POST] into 5 variations native to Threads, Stories, Reels caption, LinkedIn and newsletter. Each version should feel fresh — not recycled.", tag: "Distribution" },
  { id: "PROMPT_07", title: "Invisible Authority Builder", text: "Act as a brand positioning expert. Rewrite my content [CONTENT] so it subtly positions me as someone who knows what they're doing without bragging, flexing numbers, or sounding like a guru. The goal is trust, not hype.", tag: "Brand" },
  { id: "PROMPT_08", title: "True Fan Activator", text: "Act as a community architect. Design 3 posts that activate lurkers to comment for the first time in niche [NICHE]. Each post must contain a built-in action trigger: question, challenge, or controversy — low barrier to entry, high engagement.", tag: "Community" },
];

const PromptsSection = () => {
  const [copied, setCopied] = useState<number | null>(null);

  const copyPrompt = (index: number) => {
    navigator.clipboard.writeText(prompts[index].text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="ai-prompts" className="py-24 px-6">
      <div className="container mx-auto">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          // AI Prompt System
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.94] tracking-tight mb-16">
          The Content
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>
            Machine
          </span>
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {prompts.map((p, i) => (
            <div
              key={i}
              onClick={() => copyPrompt(i)}
              className="bg-background p-7 cursor-pointer relative overflow-hidden group hover:bg-card transition-colors"
            >
              <span className="absolute top-3.5 right-3.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {copied === i ? "COPIED ✓" : "COPY PROMPT"}
              </span>
              <p className="text-[10px] font-semibold tracking-[0.06em] text-primary mb-2.5">{p.id}</p>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">{p.text}</p>
              <span className="inline-block mt-4 text-[9px] font-semibold uppercase tracking-[0.1em] bg-destructive text-destructive-foreground px-2.5 py-1">
                {p.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromptsSection;
