import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/tracking";
import { quizBookingUrl, quizResultCopy } from "@/content/quizResultCopy";

interface Props {
  lang: "en" | "pl";
  count: number;
  answers: Record<string, string>;
  initialName?: string;
  initialEmail?: string;
}

export default function QuizResultActions({ lang, count, answers, initialName = "", initialEmail = "" }: Props) {
  const t = quizResultCopy[lang];
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!consent || pending || !name.trim() || !email.trim()) return;
    setPending(true);
    setError(false);
    try {
      const { data, error: failure } = await supabase.functions.invoke(lang === "pl" ? "mailerlite-subscribe" : "add-subscriber", {
        body: lang === "pl"
          ? { name: name.trim(), email: email.trim(), quizData: { ...answers, mvaResult: count } }
          : { name: name.trim(), email: email.trim(), answers: [`MVA Calculator: ${Object.values(answers).join(", ")}, Result: ${count}`], lang },
      });
      if (failure || data?.success !== true) throw new Error("Subscription failed");
      track.leadSubmit("calculator");
      setSentTo(email.trim());
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };
  return <div className="space-y-8 mb-8">
    <Button asChild className="rounded-button h-auto min-h-12 w-full whitespace-normal py-4 px-5 text-base">
      <Link to={quizBookingUrl(lang, name, email)} onClick={() => track.bookingClick("quiz_result")}>
        {t.booking(count.toLocaleString(lang === "pl" ? "pl-PL" : "en-US"))}<ArrowRight />
      </Link>
    </Button>
    <div className="text-left">
      <h3 className="font-display text-xl font-bold mb-4 text-center">{t.heading}</h3>
      {sentTo ? <p role="status" className="text-center">{t.success(sentTo)}</p> : <form onSubmit={submit} className="max-w-sm mx-auto space-y-4">
        <label className="block text-sm font-medium">{t.name}<input autoComplete="name" name="name" type="text" placeholder={t.nameExample} value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="mt-1 block w-full px-4 py-3 rounded-card border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" /></label>
        <label className="block text-sm font-medium">{t.email}<input autoComplete="email" name="email" type="email" placeholder={t.emailExample} value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} className="mt-1 block w-full px-4 py-3 rounded-card border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" /></label>
        <label className="flex items-start gap-2 text-xs leading-relaxed"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 accent-primary" /><span>{t.consent} <a href={`/${lang}/privacy-policy`} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">{t.privacy}</a>.</span></label>
        {error && <p role="alert" className="text-destructive text-sm">{t.error}</p>}
        <Button type="submit" disabled={pending || !consent} className="w-full rounded-button h-12">{pending ? <><Loader2 className="animate-spin" />{t.sending}</> : <>{t.submit}<ArrowRight /></>}</Button>
      </form>}
    </div>
  </div>;
}