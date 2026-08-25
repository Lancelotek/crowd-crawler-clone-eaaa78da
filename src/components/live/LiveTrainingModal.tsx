import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check, X } from "lucide-react";
import type { LiveCopy } from "@/content/liveCopy";
import { liveEvent, sendLiveForm } from "./liveEvents";

interface Props {
  copy: LiveCopy;
  locale: "pl" | "en";
  open: boolean;
  onClose: () => void;
}

const LiveTrainingModal = ({ copy, locale, open, onClose }: Props) => {
  const t = copy.trainingForm;
  const f = copy.form;
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const schema = z.object({
    fullName: z.string().trim().min(2, f.required),
    company: z.string().trim().min(1, f.required),
    email: z.string().trim().email(f.invalidEmail),
    phone: z.string().optional(),
    participants: z.string().min(1, f.required),
    format: z.string().min(1, f.required),
    timing: z.string().min(1, f.required),
    consent: z.literal(true, { errorMap: () => ({ message: f.required }) }),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", company: "", email: "", phone: "", participants: "", format: "", timing: "" },
  });

  const onSubmit = async (values: Values) => {
    setState("sending");
    try {
      await sendLiveForm({
        ...values,
        form_type: "live_training",
        locale,
        price_quoted: 2900,
        page_url: window.location.href,
      });
      liveEvent("live_training_submit", { locale, participants: values.participants, format: values.format });
      setState("success");
    } catch (err) {
      console.error("live_training submit failed:", err);
      setState("error");
    }
  };

  if (!open) return null;

  const inputCls =
    "w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "block text-sm font-medium mb-1.5";
  const errCls = "mt-1 text-xs text-destructive";

  return (
    <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-labelledby="lt-title" className="relative w-full max-w-lg my-8 rounded-card border border-border bg-card p-6 sm:p-8 shadow-2xl">
        <button type="button" onClick={onClose} aria-label={t.close} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={20} aria-hidden />
        </button>
        <h3 id="lt-title" className="font-display text-2xl font-bold mb-6 pr-8">{t.title}</h3>

        {state === "success" ? (
          <div className="rounded-card border border-primary/30 bg-primary/5 p-6">
            <Check className="text-primary mb-3" size={26} aria-hidden />
            <p className="text-base font-medium leading-relaxed">{t.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label className={labelCls} htmlFor="lt-name">{t.fullName} *</label>
              <input id="lt-name" {...register("fullName")} className={inputCls} aria-describedby={errors.fullName ? "lt-name-err" : undefined} />
              {errors.fullName && <p id="lt-name-err" className={errCls}>{errors.fullName.message}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="lt-company">{t.company} *</label>
                <input id="lt-company" {...register("company")} className={inputCls} aria-describedby={errors.company ? "lt-company-err" : undefined} />
                {errors.company && <p id="lt-company-err" className={errCls}>{errors.company.message}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="lt-email">{t.email} *</label>
                <input id="lt-email" type="email" {...register("email")} className={inputCls} aria-describedby={errors.email ? "lt-email-err" : undefined} />
                {errors.email && <p id="lt-email-err" className={errCls}>{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="lt-phone">{t.phone}</label>
                <input id="lt-phone" type="tel" {...register("phone")} className={inputCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="lt-participants">{t.participants} *</label>
                <select id="lt-participants" {...register("participants")} className={inputCls} aria-describedby={errors.participants ? "lt-part-err" : undefined}>
                  <option value="">{f.choose}…</option>
                  {t.participantOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.participants && <p id="lt-part-err" className={errCls}>{errors.participants.message}</p>}
              </div>
            </div>

            <fieldset>
              <legend className={labelCls}>{t.format} *</legend>
              <div className="flex gap-3">
                {t.formatOptions.map((o) => (
                  <label key={o} className="flex items-center gap-2 text-sm rounded-md border border-input px-4 py-2.5 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" value={o} {...register("format")} className="accent-primary" />
                    {o}
                  </label>
                ))}
              </div>
              {errors.format && <p className={errCls}>{errors.format.message}</p>}
            </fieldset>

            <div>
              <label className={labelCls} htmlFor="lt-timing">{t.timing} *</label>
              <select id="lt-timing" {...register("timing")} className={inputCls} aria-describedby={errors.timing ? "lt-timing-err" : undefined}>
                <option value="">{f.choose}…</option>
                {t.timingOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.timing && <p id="lt-timing-err" className={errCls}>{errors.timing.message}</p>}
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" {...register("consent")} className="mt-1 accent-primary" aria-describedby={errors.consent ? "lt-consent-err" : undefined} />
              <span>
                {t.consent}{" "}
                <a href={f.privacyHref} className="underline hover:text-primary">
                  {locale === "pl" ? "Polityka prywatności" : "Privacy policy"}
                </a>
              </span>
            </label>
            {errors.consent && <p id="lt-consent-err" className={errCls}>{errors.consent.message}</p>}

            {state === "error" && <p className="text-sm text-destructive">{f.error}</p>}

            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold rounded-button hover:brightness-110 transition-all disabled:opacity-60"
            >
              {state === "sending" && <Loader2 size={16} className="animate-spin" aria-hidden />}
              {state === "sending" ? f.sending : t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LiveTrainingModal;
