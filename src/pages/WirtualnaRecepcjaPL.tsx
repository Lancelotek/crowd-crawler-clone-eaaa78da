import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import "@/styles/wirtualna-recepcja.css";
import {
  hero, callCard, proofStats, problem, calculator, how, compare, cases, demo, pricing, faq, finalCta,
  computeLoss, formatPl, PACKAGE_COST, type CalcKey, type Cell,
} from "@/content/wirtualnaRecepcjaPLCopy";

const Mark = ({ m }: { m: "y" | "h" | "n" }) => <span className={m}>{m === "y" ? "✓" : m === "h" ? "~" : "-"}</span>;

const CellView = ({ c }: { c: Cell }) => (
  <>
    {c.mark ? <Mark m={c.mark} /> : c.text}
    {c.note && <small>{c.note}</small>}
  </>
);

const WirtualnaRecepcjaPL = () => {
  const { langPrefix } = useLanguage();
  const bookLink = `${langPrefix}/book?source=wirtualna-recepcja-pl`;
  const [preset, setPreset] = useState(calculator.presets[0].id);
  const [vals, setVals] = useState<Record<CalcKey, number>>(calculator.presets[0].v);
  const r = useMemo(() => computeLoss(vals), [vals]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const choosePreset = (id: string) => {
    const p = calculator.presets.find((x) => x.id === id)!;
    setPreset(id);
    setVals(p.v);
  };

  const fieldOut = (k: CalcKey) =>
    k === "calls" ? formatPl(vals.calls) : k === "value" ? `${formatPl(vals.value)} zł` : `${vals[k]}%`;

  return (
    <>
      <SEOHead
        title="Wirtualna Recepcja AI dla gabinetów i firm usługowych | JAY-23"
        description="AI recepcja odbiera każdy telefon, umawia wizyty w FELG Dent i ZnanyLekarz, a call tracking pokazuje, która reklama przyniosła pacjenta. Policz, ile tracisz."
        canonical="/pl/wirtualna-recepcja"
        lang="pl"
      />
      <MvaNavbar />
      <div className="wr">
        <header className="hero" id="top">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <p className="eyebrow">{hero.eyebrow}</p>
                <h1>{hero.h1Lead}<em>{hero.h1Accent}</em></h1>
                <p className="lead">{hero.leadBefore}<strong>{hero.leadStrong}</strong>{hero.leadAfter}</p>
                <div className="hero-ctas">
                  <Link className="btn btn-primary" to={bookLink}>{hero.cta}</Link>
                  <a className="btn btn-ghost" href="#kalkulator">{hero.ctaSecondary}</a>
                </div>
              </div>
              <aside className="callcard" aria-label="Przykładowy dzień w panelu">
                <div className="cc-top"><span>{callCard.label}</span><span className="live"><i />{callCard.live}</span></div>
                {callCard.rows.map((row) => (
                  <div className="cc-row" key={row.time}>
                    <time>{row.time}</time>
                    <p>
                      {row.tags.map((t) => <span key={t.t} className={`tag ${t.k}`}>{t.t}</span>)}
                      {row.main}
                      <small>{row.small}</small>
                    </p>
                  </div>
                ))}
                <div className="cc-sum"><span>{callCard.sumLabel}</span><b>{callCard.sumValue}</b></div>
              </aside>
            </div>
            <div className="proof">
              {proofStats.map((s) => <div key={s.value}><b>{s.value}</b><span>{s.label}</span></div>)}
            </div>
          </div>
        </header>

        <main>
          <section id="problem">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">{problem.eyebrow}</p>
                <h2>{problem.h2}</h2>
                <p className="lead">{problem.lead}</p>
              </div>
              <div className="problem-grid">
                <div className="chart-card">
                  <h3>{problem.chartTitle}</h3>
                  <div className="rate">
                    <div><span>{problem.beforeLabel}</span><b>{problem.beforeValue}</b><div className="meter"><i style={{ width: "84.5%" }} /></div></div>
                    <div className="after"><span>{problem.afterLabel}</span><b>{problem.afterValue}</b><div className="meter"><i style={{ width: "68.6%" }} /></div></div>
                  </div>
                  <p className="note">{problem.note}</p>
                </div>
                <div className="pains">
                  {problem.pains.map((p, i) => (
                    <div className="pain" key={p.title}><b>{i + 1}</b><p><strong>{p.title}</strong>{p.body}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="kalkulator" className="band">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">{calculator.eyebrow}</p>
                <h2>{calculator.h2}</h2>
                <p className="lead">{calculator.lead}</p>
              </div>
              <div className="calc">
                <div className="calc-in">
                  <div className="presets" role="group" aria-label="Branża">
                    {calculator.presets.map((p) => (
                      <button key={p.id} type="button" aria-pressed={preset === p.id} onClick={() => choosePreset(p.id)}>{p.label}</button>
                    ))}
                  </div>
                  {calculator.fields.map((f) => (
                    <div className="field" key={f.key}>
                      <div className="field-top"><label htmlFor={`wr-${f.key}`}>{f.label}</label><output>{fieldOut(f.key)}</output></div>
                      <input
                        type="range" id={`wr-${f.key}`} min={f.min} max={f.max} step={f.step} value={vals[f.key]}
                        onChange={(e) => setVals((v) => ({ ...v, [f.key]: Number(e.target.value) }))}
                      />
                      {f.hint && <small>{f.hint}</small>}
                    </div>
                  ))}
                </div>
                <div className="calc-out" aria-live="polite">
                  <div>
                    <p className="out-label">{calculator.outLabel}</p>
                    <p className="loss-big">{r.lossText}<small>zł</small></p>
                  </div>
                  <div className="out-grid">
                    <div><span>{calculator.outMissed}</span><b>{r.missedText}</b></div>
                    <div><span>{calculator.outLost}</span><b>{r.lostText}</b></div>
                    <div><span>{calculator.outYear}</span><b>{r.yearText}</b></div>
                    <div className="gain"><span>{calculator.outGain}</span><b>{r.gainText}</b></div>
                  </div>
                  <div className="roi">
                    <b>{r.roiText}</b>
                    <p>{calculator.roiBefore}<strong>{calculator.roiStrong}</strong>{calculator.roiMid}{formatPl(PACKAGE_COST)}{calculator.roiAfter}</p>
                  </div>
                  <Link className="btn btn-white" to={bookLink}>{calculator.cta}</Link>
                  <p className="calc-foot">{calculator.foot}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="jak-dziala">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">{how.eyebrow}</p>
                <h2>{how.h2}</h2>
                <p className="lead">{how.lead}</p>
              </div>
              <div className="steps">
                {how.steps.map((s, i) => (
                  <article key={s.num} className={`step${i === 2 ? " proofstep" : ""}`}>
                    <p className="num">{s.num}</p>
                    <h3>{s.title}</h3>
                    <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="porownanie" className="band">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">{compare.eyebrow}</p>
                <h2>{compare.h2}</h2>
                <p className="lead">{compare.lead}</p>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">{compare.headFeature}</th>
                      {compare.headers.map((h, i) => (
                        <th scope="col" key={h[0]} className={i === 0 ? "us" : undefined}>
                          {h[0]}{h[1] && <><br />{h[1]}</>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compare.rows.map((row) => (
                      <tr key={row.feature}>
                        <td>{row.feature}</td>
                        {row.cells.map((c, i) => <td key={i} className={i === 0 ? "us" : undefined}><CellView c={c} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="legend">
                <span><Mark m="y" /> {compare.legendYes}</span>
                <span><Mark m="h" /> {compare.legendHalf}</span>
                <span><Mark m="n" /> {compare.legendNo}</span>
                <span>{compare.legendSource}</span>
              </div>
            </div>
          </section>

          <section id="efekty">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">{cases.eyebrow}</p>
                <h2>{cases.h2}</h2>
              </div>
              <div className="cases">
                {cases.items.map((c) => (
                  <article className="case" key={c.label}><span>{c.label}</span><b>{c.value}</b><p>{c.body}</p></article>
                ))}
              </div>
            </div>
          </section>

          <section id="demo" className="band">
            <div className="wrap demo">
              <div className="sec-head" style={{ margin: 0 }}>
                <p className="eyebrow">{demo.eyebrow}</p>
                <h2>{demo.h2}</h2>
                <p className="lead">{demo.lead}</p>
              </div>
              <div className="phones">
                {demo.phones.map((p) => (
                  <a className="phone" key={p.tel} href={`tel:${p.tel}`}><span>{p.label}</span><b>{p.number}</b></a>
                ))}
              </div>
            </div>
          </section>

          <section id="cennik">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">{pricing.eyebrow}</p>
                <h2>{pricing.h2}</h2>
                <p className="lead">{pricing.lead}</p>
              </div>
              <div className="plans">
                {pricing.plans.map((p) => (
                  <article key={p.title} className={`plan${p.featured ? " feat" : ""}`}>
                    {p.featured && <span className="badge">{p.featured}</span>}
                    <h3>{p.title}</h3>
                    <p className="price">{p.price} <small>{pricing.per}</small></p>
                    <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                    <p className="free">{p.extra}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="band">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">{faq.eyebrow}</p>
                <h2>{faq.h2}</h2>
              </div>
              <div className="faq">
                {faq.items.map((f) => (
                  <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                ))}
              </div>
            </div>
          </section>

          <section id="audyt" className="cta">
            <div className="wrap cta-grid">
              <div>
                <p className="eyebrow">{finalCta.eyebrow}</p>
                <h2>{finalCta.h2}</h2>
                <p className="lead">{finalCta.lead}</p>
                <ul>{finalCta.checks.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
              <div>
                <Link className="btn btn-white btn-big" to={bookLink}>{finalCta.cta}</Link>
              </div>
            </div>
          </section>
        </main>
      </div>
      <FooterSection />
    </>
  );
};

export default WirtualnaRecepcjaPL;
