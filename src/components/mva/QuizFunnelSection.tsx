import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";



const quizSteps = [
  { question: "What are you building?", options: ["SaaS", "Course", "Creator brand", "Digital product", "Community"] },
  { question: "Do you currently have an audience?", options: ["None", "Under 500", "500–5k", "5k+"] },
  { question: "Where is your audience today?", options: ["Twitter/X", "LinkedIn", "YouTube", "Email list", "No platform yet"] },
  { question: "What is your biggest challenge?", options: ["Finding the right niche", "Growing an audience", "Validating demand", "Converting followers into buyers"] },
  { question: "How soon do you want to launch?", options: ["1–3 months", "3–6 months", "6–12 months", "Just exploring"] },
];

type FunnelStage = "quiz" | "lead";

const strategyMap: Record<string, { strategy: string; platforms: string; audience: string }> = {
  SaaS: { strategy: "Audience-first validation", platforms: "Twitter/X and newsletter", audience: "6,920" },
  Course: { strategy: "Content-led launch funnel", platforms: "YouTube and email list", audience: "4,200" },
  "Creator brand": { strategy: "Personal brand growth engine", platforms: "Twitter/X and LinkedIn", audience: "3,500" },
  "Digital product": { strategy: "Niche community building", platforms: "Newsletter and Twitter/X", audience: "5,100" },
  Community: { strategy: "Platform-first engagement loop", platforms: "Discord and newsletter", audience: "2,800" },
};

const QuizFunnelSection = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [stage, setStage] = useState<FunnelStage>("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const progress = stage === "quiz" ? (answers.length / quizSteps.length) * 100 : 100;

  const selectAnswer = (option: string) => {
    if (answers.length === 0) track.quizStart();
    track.quizStep(step + 1, option);
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (newAnswers.length < quizSteps.length) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      track.quizComplete(newAnswers);
      setTimeout(() => setStage("lead"), 350);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const { error } = await supabase.functions.invoke('add-subscriber', {
        body: { name: name.trim(), email: email.trim(), answers, recaptchaToken },
      });
      if (error) throw error;
      track.leadSubmit("quiz");
      navigate(`/${lang}/thank-you`);
    } catch (err: any) {
      console.error('Error:', err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  const reset = () => { setStage("quiz"); setStep(0); setAnswers([]); setName(""); setEmail(""); setConsent(false); };

  return (
    <section id="quiz" className="py-12 px-6 bg-secondary rounded-card">
      <div className="container mx-auto max-w-[720px]">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-primary mb-2 tracking-wide">Audience Strategy Quiz</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-2">
              Find Your Audience<br /><span className="text-primary">Growth Strategy</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">Answer a few questions to get a personalized strategy.</p>
          </div>
        </motion.div>

        <div className="w-full h-1.5 bg-border rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
        <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {stage === "quiz" && (
            <motion.div key={`quiz-${step}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <p className="text-xs text-muted-foreground mb-2">Question {step + 1} of {quizSteps.length}</p>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-5">{quizSteps[step].question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizSteps[step].options.map((opt) => (
                  <motion.button key={opt} onClick={() => selectAnswer(opt)} whileHover={{ y: -2 }}
                    className="text-left bg-card border border-border rounded-card p-4 hover:border-primary transition-colors cursor-pointer group">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{opt}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="text-center">
              <Sparkles className="text-primary mx-auto mb-3" size={24} />
              <h3 className="font-display text-xl md:text-2xl font-extrabold mb-2">Get Your Personalized Strategy</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">Enter your details to see your custom growth recommendation.</p>
              <form onSubmit={handleLeadSubmit} className="max-w-sm mx-auto space-y-3">
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100}
                  className="w-full px-4 py-3 rounded-card border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255}
                  className="w-full px-4 py-3 rounded-card border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <label className="flex items-start gap-2 text-left cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required
                    className="mt-0.5 accent-primary w-4 h-4 shrink-0" />
                  <span className="text-[11px] text-muted-foreground leading-tight">
                    {lang === "pl" ? (
                      <>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Polityką Prywatności</a>.</>
                    ) : (
                      <>I agree to the processing of my personal data in accordance with the <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:brightness-110">Privacy Policy</a>.</>
                    )}
                  </span>
                </label>
                <div id="quiz-recaptcha" className="flex justify-center" />
                <button type="submit" disabled={submitting || !consent || !recaptchaToken}
                  className="w-full bg-primary text-primary-foreground py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60">
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <>Show My Strategy <ArrowRight size={16} /></>}
                </button>
                {submitError && <p className="text-destructive text-xs">{submitError}</p>}
              </form>
              <p className="text-xs text-muted-foreground mt-3">🔒 {lang === "pl" ? "Bez spamu. Szanujemy Twoją prywatność." : "No spam. We respect your privacy."}</p>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuizFunnelSection;
