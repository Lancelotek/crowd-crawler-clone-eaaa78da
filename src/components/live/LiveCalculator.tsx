import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import type { LiveCopy, Verdict } from "@/content/liveCopy";
import { liveEvent } from "./liveEvents";

interface Props {
  copy: LiveCopy;
  locale: "pl" | "en";
  onResult: (pct: number) => void;
}

const FIELDS = [
  { key: "gmv", min: 20000, max: 1000000, step: 5000, suffix: "" },
  { key: "margin", min: 20, max: 90, step: 1, suffix: "%" },
  { key: "creator", min: 0, max: 30, step: 1, suffix: "%" },
  { key: "discount", min: 0, max: 30, step: 1, suffix: "%" },
  { key: "logistics", min: 0, max: 25, step: 1, suffix: "%" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

/** Animated money value. */
const Money = ({ value, locale, className }: { value: number; locale: string; className?: string }) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number>();

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = display;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(display));
  return <span className={className}>{formatted}</span>;
};

const LiveCalculator = ({ copy, locale, onResult }: Props) => {
  const c = copy.calc;
  const [values, setValues] = useState<Record<FieldKey, number>>({
    gmv: 150000,
    margin: 65,
    creator: 12,
    discount: 12,
    logistics: 10,
  });
  const [affiliate, setAffiliate] = useState(70);
  const [promo90, setPromo90] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const touchedRef = useRef(false);
  const lastVerdictRef = useRef<Verdict | null>(null);

  const result = useMemo(() => {
    const gmv = values.gmv;
    const platformRate = promo90 ? 0.02 : 0.09;

    const grossMargin = gmv * (values.margin / 100);
    const platformFee = gmv * platformRate;
    const creatorFee = gmv * (affiliate / 100) * (values.creator / 100);
    const discountCost = gmv * (values.discount / 100);
    const logisticsCost = gmv * (values.logistics / 100);
    const jay23Fee = gmv * 0.09;

    const brandResult = grossMargin - platformFee - creatorFee - discountCost - logisticsCost - jay23Fee;
    const brandResultPct = (brandResult / gmv) * 100;

    return { grossMargin, platformFee, creatorFee, discountCost, logisticsCost, jay23Fee, brandResult, brandResultPct };
  }, [values, affiliate, promo90]);

  const verdict: Verdict =
    result.brandResultPct >= 15 ? "green" : result.brandResultPct >= 5 ? "amber" : "red";

  useEffect(() => {
    onResult(Number(result.brandResultPct.toFixed(1)));
  }, [result.brandResultPct, onResult]);

  // GA4: verdict change, debounced
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!touchedRef.current) return;
      if (lastVerdictRef.current === verdict) return;
      lastVerdictRef.current = verdict;
      liveEvent("live_calc_verdict", {
        verdict,
        result_pct: Number(result.brandResultPct.toFixed(1)),
        locale,
      });
    }, 800);
    return () => window.clearTimeout(id);
  }, [verdict, result.brandResultPct, locale]);

  const markTouched = () => {
    if (touchedRef.current) return;
    touchedRef.current = true;
    liveEvent("live_calc_used", { locale });
  };

  const setField = (key: FieldKey, v: number) => {
    markTouched();
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  const verdictStyles: Record<Verdict, string> = {
    green: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    red: "bg-destructive/10 text-destructive border-destructive/30",
  };

  const costRows = [
    { label: c.rows.platform, value: result.platformFee },
    { label: c.rows.creators, value: result.creatorFee },
    { label: c.rows.discount, value: result.discountCost },
    { label: c.rows.logistics, value: result.logisticsCost },
  ];

  const maxBar = Math.max(result.grossMargin, 1);

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
      {/* Inputs */}
      <div className="space-y-7">
        {FIELDS.map((f) => {
          const label = c.fields[f.key === "gmv" ? "gmv" : f.key === "margin" ? "margin" : f.key === "creator" ? "creator" : f.key === "discount" ? "discount" : "logistics"];
          const id = `live-calc-${f.key}`;
          return (
            <div key={f.key}>
              <div className="flex items-center justify-between gap-4 mb-3">
                <label htmlFor={id} className="text-sm font-medium text-foreground">
                  {label}
                </label>
                <input
                  id={id}
                  type="number"
                  inputMode="numeric"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={values[f.key]}
                  onChange={(e) => {
                    const raw = Number(e.target.value);
                    if (Number.isNaN(raw)) return;
                    setField(f.key, Math.min(f.max, Math.max(f.min, raw)));
                  }}
                  className="w-28 rounded-md border border-input bg-card px-3 py-1.5 text-right text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Slider
                aria-label={label}
                value={[values[f.key]]}
                min={f.min}
                max={f.max}
                step={f.step}
                onValueChange={(v) => setField(f.key, v[0])}
                className="[&_[role=slider]]:focus-visible:ring-2 [&_[role=slider]]:focus-visible:ring-ring"
              />
            </div>
          );
        })}

        <label className="flex items-start gap-3 rounded-card border border-border bg-card p-4 cursor-pointer">
          <Checkbox
            checked={promo90}
            onCheckedChange={(v) => {
              markTouched();
              setPromo90(Boolean(v));
            }}
            aria-label={c.promoLabel}
            className="mt-0.5"
          />
          <span className="text-sm text-muted-foreground leading-snug">{c.promoLabel}</span>
        </label>

        <div className="rounded-card border border-border">
          <button
            type="button"
            onClick={() => setAdvancedOpen((o) => !o)}
            aria-expanded={advancedOpen}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold"
          >
            {c.advanced}
            <ChevronDown size={16} className={`transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
          </button>
          {advancedOpen && (
            <div className="px-4 pb-5 pt-1">
              <div className="flex items-center justify-between gap-4 mb-3">
                <label htmlFor="live-calc-affiliate" className="text-sm font-medium">
                  {c.fields.affiliate}
                </label>
                <input
                  id="live-calc-affiliate"
                  type="number"
                  min={0}
                  max={100}
                  value={affiliate}
                  onChange={(e) => {
                    const raw = Number(e.target.value);
                    if (Number.isNaN(raw)) return;
                    markTouched();
                    setAffiliate(Math.min(100, Math.max(0, raw)));
                  }}
                  className="w-28 rounded-md border border-input bg-card px-3 py-1.5 text-right text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Slider
                aria-label={c.fields.affiliate}
                value={[affiliate]}
                min={0}
                max={100}
                step={1}
                onValueChange={(v) => {
                  markTouched();
                  setAffiliate(v[0]);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Result panel */}
      <div className="lg:sticky lg:top-24">
        <div className="rounded-card border border-border bg-card p-6 shadow-lg shadow-foreground/5">
          <dl className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-muted-foreground">{c.rows.grossMargin}</dt>
              <dd className="text-sm font-semibold text-primary tabular-nums">
                + <Money value={result.grossMargin} locale={c.locale} /> {c.currency}
              </dd>
            </div>
            <div className="h-1 rounded-full bg-primary/70" style={{ width: "100%" }} aria-hidden />

            {costRows.map((r) => (
              <div key={r.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">{r.label}</dt>
                  <dd className="text-sm font-medium text-destructive/90 tabular-nums">
                    − <Money value={r.value} locale={c.locale} /> {c.currency}
                  </dd>
                </div>
                <div
                  className="mt-1 h-1 rounded-full bg-destructive/40 transition-all duration-200"
                  style={{ width: `${Math.min(100, (r.value / maxBar) * 100)}%` }}
                  aria-hidden
                />
              </div>
            ))}

            <div className="pt-2 border-t border-border">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm font-semibold">{c.rows.jay23}</dt>
                <dd className="text-sm font-bold text-destructive tabular-nums">
                  − <Money value={result.jay23Fee} locale={c.locale} /> {c.currency}
                </dd>
              </div>
              <div
                className="mt-1 h-1 rounded-full bg-destructive/60 transition-all duration-200"
                style={{ width: `${Math.min(100, (result.jay23Fee / maxBar) * 100)}%` }}
                aria-hidden
              />
            </div>

            <div className="pt-4 border-t border-border">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{c.rows.result}</dt>
              <dd className="font-display text-4xl font-bold text-primary tabular-nums leading-none">
                <Money value={result.brandResult} locale={c.locale} /> {c.currency}
              </dd>
              <p className="mt-1 text-sm font-semibold text-muted-foreground tabular-nums">
                {result.brandResultPct.toFixed(1).replace(".", c.locale === "pl-PL" ? "," : ".")}% GMV
              </p>
            </div>
          </dl>

          <p
            role="status"
            aria-live="polite"
            className={`mt-5 rounded-card border px-4 py-3 text-sm font-medium leading-snug ${verdictStyles[verdict]}`}
          >
            {c.verdicts[verdict]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveCalculator;
