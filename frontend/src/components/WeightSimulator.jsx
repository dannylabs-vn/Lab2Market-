import React, { useEffect, useRef, useState } from "react";
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
  }, [values]);

  const total = Object.values(values).reduce((a, b) => a + b, 0);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: Number(value) }));
  }

  return (
    <div className="weight-sim">
      <div className="weight-sim-head">
        <div>
          <h3 style={{ fontSize: "17px", color: "var(--ink)", marginBottom: "4px" }}>
            ⚡ {t(lang, "weightsTitle")}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            {t(lang, "weightsHint")}
          </p>
        </div>
      </div>

      {total === 0 && (
        <div style={{ padding: "8px 12px", background: "#fffbeb", borderLeft: "3px solid #d97706", fontSize: "12.5px", color: "#92400e", marginBottom: "14px" }}>
          ℹ️ {t(lang, "weightsZeroHint")}
        </div>
      )}

      <div className="weight-rows">
        {CRITERIA.map((name) => {
          const pct = total > 0 ? Math.round((values[name] / total) * 100) : 0;

          return (
            <div key={name} className="weight-row">
              <label htmlFor={`weight-${name}`} style={{ fontWeight: 600 }}>
                {t(lang, `criterion_${name}`)}
              </label>
              <input
                id={`weight-${name}`}
                type="range"
                min={0}
                max={100}
                value={values[name]}
                onChange={(e) => handleChange(name, e.target.value)}
              />
              <span style={{ fontWeight: 700, textAlign: "right" }}>{values[name]}</span>
              <span style={{ color: "var(--muted)", textAlign: "right" }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
