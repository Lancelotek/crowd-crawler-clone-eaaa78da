import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, TrendingDown, DollarSign, HelpCircle, Sprout, Clock, Frown, Flame, Gift, Coins, Wallet, Rocket } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import type { LucideIcon } from "lucide-react";

const steps: { title: string; options: { icon: LucideIcon; text: string }[] }[] = [
  {
    title: "What's your biggest growth challenge right now?",
    options: [
      { icon: Target, text: "I'm posting but getting no reach" },
      { icon: TrendingDown, text: "My follower growth has stalled" },
      { icon: DollarSign, text: "I can't convert followers to clients" },
      { icon: HelpCircle, text: "I don't know what content to create" },
    ],
  },
  {
    title: "How long have you been struggling with this?",
    options: [
      { icon: Sprout, text: "Less than 3 months — just starting out" },
      { icon: Clock, text: "3-12 months — been trying but stuck" },
      { icon: Frown, text: "1-2 years — seriously frustrated" },
      { icon: Flame, text: "2+ years — ready for a real system" },
    ],
  },
  {
    title: "What's your current monthly content budget?",
    options: [
      { icon: Gift, text: "$0 — all organic only" },
      { icon: Coins, text: "$100-500 — small paid boost" },
      { icon: Wallet, text: "$500-2000 — ready to invest" },
      { icon: Rocket, text: "$2000+ — serious about scaling" },
    ],
  },
];

const QuizSection = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = answers.length === 3;
  const progress = done ? 100 : (answers.length / 3) * 100;

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (newAnswers.length < 3) {
      setTimeout(() => setStep(step + 1), 400);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section id="quiz" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-[720px]">
        <ScrollReveal>
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide text-center">Free Growth Audit</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-12 text-center">
            Diagnose Your<br />
            <span className="text-primary">Growth Gaps</span>
          </h2>
        </ScrollReveal>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-border rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-muted-foreground mb-3">
                Step {step + 1} of 3
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-8">{steps[step].title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps[step].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    whileHover={{ y: -4 }}
                    className="text-left bg-card border border-border rounded-card p-5 hover:border-primary transition-colors group cursor-pointer"
                  >
                    <span className="text-xl mb-2 block">{opt.emoji}</span>
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">{opt.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold mb-4">
                Your JAY-23 Growth<br />Diagnosis is Ready
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                Based on your answers, we've identified 3 specific gaps in your content strategy. Your free 30-minute strategy call will include a custom MVA roadmap for your situation.
              </p>
              <a
                href="#book-call"
                className="inline-block bg-primary text-primary-foreground px-10 py-4 font-semibold text-sm rounded-button hover:bg-[hsl(253_100%_55%)] transition-colors animate-pulse-cta mb-4"
              >
                Book Your Free Strategy Call ↓
              </a>
              <p className="text-xs text-muted-foreground tracking-wide">
                ⏱ 30 min • 100% free • No pitch, just strategy
              </p>
              <p className="mt-2 text-destructive text-sm font-semibold">
                <span className="animate-blink inline-block">🔴</span> Only 2 slots remaining this week
              </p>
              <button onClick={reset} className="mt-6 text-xs text-muted-foreground underline hover:text-primary transition-colors">
                Retake quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuizSection;