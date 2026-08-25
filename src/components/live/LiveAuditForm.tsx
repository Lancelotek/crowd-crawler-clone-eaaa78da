import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";
import type { LiveCopy } from "@/content/liveCopy";
import { liveEvent, sendLiveForm } from "./liveEvents";

interface Props {
  copy: LiveCopy;
  locale: "pl" | "en";
  calculatorResult: number | null;
}

const LiveAuditForm = ({ copy, locale, calculatorResult }: Props) => {
  const f = copy.form;
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const schema = z.object({
    name: z.string().trim().min(2, f.required),
    brand: z.string().trim().min(1, f.required),
    email: z.string().trim().email(f.invalidEmail),
    shop: z.string().trim().url(f.invalidEmail).optional().or(z.literal("")),
    category: z.string().min(1, f.required),
    revenue: z.string().min(1, f.required),
    selling: z.string().min(1, f.required),
    message: z.string().optional(),
    consent: z.literal(true, { errorMap: () => ({ message: f.required }) }),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", brand: "", email: "", shop: "", category: "", revenue: "", selling: "", message: "" },
  });

  // ── Funnel tracking: start, validation errors, abandonment ──
  const startedRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (startedRef.current && !submittedRef.current) {
        liveEvent("live_form_abandon", { locale, form_type: "live_audit" });
      }
    };
  }, [locale]);

  const trackStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      liveEvent("live_form_start", { locale, form_type: "live_audit" });
    }
  };

  const onInvalid = (fieldErrors: Record<string, unknown>) => {
    const fields = Object.keys(fieldErrors);
    liveEvent("live_form_validation_error", {
      locale,
      form_type: "live_audit",
      error_fields: fields.join(","),
      error_count: fields.length,
    });
  };

  const onSubmit = async (values: Values) => {
    setState("sending");
    try {
      await sendLiveForm({
        ...values,
        form_type: "live_audit",
        locale,
        calculator_result: calculatorResult,
        page_url: window.location.href,
      });
      submittedRef.current = true;
      liveEvent("live_audit_submit", { locale, revenue_band: values.revenue, category: values.category });
      setState("success");
    } catch (err) {
      console.error("live_audit submit failed:", err);
      liveEvent("live_form_submit_error", { locale, form_type: "live_audit" });
      setState("error");
    }
  };

  const inputCls =
    "w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "block text-sm font-medium mb-1.5";
  const errCls = "mt-1 text-xs text-destructive";

  if (state === "success") {
    return (
      <div className="rounded-card border border-primary/30 bg-primary/5 p-8">
        <Check className="text-primary mb-3" size={28} aria-hidden />
        <p className="text-base font-medium leading-relaxed">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} onFocus={trackStart} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="la-name">{f.name} *</label>
          <input id="la-name" {...register("name")} className={inputCls} aria-describedby={errors.name ? "la-name-err" : undefined} />
          {errors.name && <p id="la-name-err" className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="la-brand">{f.brand} *</label>
          <input id="la-brand" {...register("brand")} className={inputCls} aria-describedby={errors.brand ? "la-brand-err" : undefined} />
          {errors.brand && <p id="la-brand-err" className={errCls}>{errors.brand.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="la-email">{f.email} *</label>
          <input id="la-email" type="email" {...register("email")} className={inputCls} aria-describedby={errors.email ? "la-email-err" : undefined} />
          {errors.email && <p id="la-email-err" className={errCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="la-shop">{f.shop}</label>
          <input id="la-shop" placeholder="https://" {...register("shop")} className={inputCls} aria-describedby={errors.shop ? "la-shop-err" : undefined} />
          {errors.shop && <p id="la-shop-err" className={errCls}>{errors.shop.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="la-category">{f.category} *</label>
          <select id="la-category" {...register("category")} className={inputCls} aria-describedby={errors.category ? "la-cat-err" : undefined}>
            <option value="">{f.choose}…</option>
            {f.categories.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.category && <p id="la-cat-err" className={errCls}>{errors.category.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="la-revenue">{f.revenue} *</label>
          <select id="la-revenue" {...register("revenue")} className={inputCls} aria-describedby={errors.revenue ? "la-rev-err" : undefined}>
            <option value="">{f.choose}…</option>
            {f.revenues.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.revenue && <p id="la-rev-err" className={errCls}>{errors.revenue.message}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>{f.selling} *</legend>
        <div className="flex flex-col sm:flex-row gap-3">
          {f.sellingOptions.map((o) => (
            <label key={o} className="flex items-center gap-2 text-sm rounded-md border border-input bg-card px-4 py-2.5 cursor-pointer hover:border-primary transition-colors">
              <input type="radio" value={o} {...register("selling")} className="accent-primary" />
              {o}
            </label>
          ))}
        </div>
        {errors.selling && <p className={errCls}>{errors.selling.message}</p>}
      </fieldset>

      <div>
        <label className={labelCls} htmlFor="la-message">{f.message}</label>
        <textarea id="la-message" rows={4} {...register("message")} className={inputCls} />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" {...register("consent")} className="mt-1 accent-primary" aria-describedby={errors.consent ? "la-consent-err" : undefined} />
        <span>
          {f.consent}{" "}
          <a href={f.privacyHref} className="underline hover:text-primary">
            {locale === "pl" ? "Polityka prywatności" : "Privacy policy"}
          </a>
        </span>
      </label>
      {errors.consent && <p id="la-consent-err" className={errCls}>{errors.consent.message}</p>}

      {state === "error" && <p className="text-sm text-destructive">{f.error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold rounded-button hover:brightness-110 transition-all disabled:opacity-60"
      >
        {state === "sending" && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {state === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
};

export default LiveAuditForm;
