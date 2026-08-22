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
          <h3 style={{ fontSize: "18px", color: "var(--ink)", marginBottom: "4px" }}>
            ⚡ {t(lang, "weightsTitle")}
          </h3>
          <p style={{ fontSize: "13.5px", color: "var(--muted)" }}>
            {t(lang, "weightsHint")}
          </p>
        </div>
        <span className="pill pill-green" style={{ textTransform: "uppercase" }}>
          {lang === "vi" ? "Tự động sắp xếp 0ms" : "0ms Instant Rerank"}
        </span>
      </div>

      {total === 0 && (
        <div style={{ padding: "10px 14px", background: "var(--amber-soft)", borderLeft: "3px solid var(--amber)", borderRadius: "var(--radius-sm)", fontSize: "13px", color: "#92400e", marginBottom: "16px", fontWeight: 600 }}>
          ℹ️ {t(lang, "weightsZeroHint")}
        </div>
      )}

      <div className="weight-rows">
        {CRITERIA.map((name) => {
          const pct = total > 0 ? Math.round((values[name] / total) * 100) : 0;

          return (
            <div key={name} className="weight-row">
              <label htmlFor={`weight-${name}`} style={{ fontWeight: 700, color: "var(--ink)" }}>
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
              <span style={{ fontWeight: 800, textAlign: "right", color: "var(--green-cta)" }}>{values[name]}</span>
              <span style={{ color: "var(--muted)", textAlign: "right", fontWeight: 600 }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
