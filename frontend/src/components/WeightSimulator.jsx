// WeightSimulator — step 3 top: 5 sliders (0–100) that re-run the SAME
// deterministic MCDA via the parent's match call (rule §4/§9). Debounced
// ~250ms so a slider drag fires ONE re-match, not one per tick.
//
// Contract: props = { weights, lang, onWeightsChange }. `weights` is the raw
// (pre-normalization) 0–100 vector; `onWeightsChange(nextWeights)` is called
// once after the user stops dragging. Normalized % is shown next to each bar.

import { useEffect, useRef, useState } from "react";
import { t } from "../i18n";

const CRITERIA = ["semantic", "domain", "trl", "timeline", "involvement"];
const DEBOUNCE_MS = 250;

export default function WeightSimulator({ weights, lang, onWeightsChange }) {
  const [values, setValues] = useState(() => ({
    semantic: weights?.semantic ?? 0,
    domain: weights?.domain ?? 0,
    trl: weights?.trl ?? 0,
    timeline: weights?.timeline ?? 0,
    involvement: weights?.involvement ?? 0,
  }));
  const timerRef = useRef(null);
  const firstRenderRef = useRef(true);

  // Debounce: clear any pending call, then schedule one after inactivity.
  // Skip the initial mount — the parent already has a report for these exact
  // slider values, so firing onWeightsChange would only re-run a no-op match.
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onWeightsChange(values);
    }, DEBOUNCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const total = Object.values(values).reduce((a, b) => a + b, 0);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: Number(value) }));
  }

  return (
    <section className="weights">
      <h3>{t(lang, "weightsTitle")}</h3>
      <p className="weights__hint">{t(lang, "weightsHint")}</p>

      {total === 0 && (
        <p className="weights__zero-hint" role="status">
          {t(lang, "weightsZeroHint")}
        </p>
      )}

      <div className="weights__rows">
        {CRITERIA.map((name) => {
          const pct = total > 0 ? Math.round((values[name] / total) * 100) : 0;
          return (
            <div key={name} className="weights__row">
              <label className="weights__label" htmlFor={`weight-${name}`}>
                {t(lang, `criterion_${name}`)}
              </label>
              <input
                id={`weight-${name}`}
                type="range"
                min={0}
                max={100}
                value={values[name]}
                onChange={(e) => handleChange(name, e.target.value)}
                className="weights__slider"
              />
              <span className="weights__value">{values[name]}</span>
              <span className="weights__pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
