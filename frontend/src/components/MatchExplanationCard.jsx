import React from "react";
import { t } from "../i18n";
import ProvenanceBadge from "./ProvenanceBadge";

const CRITERIA = ["semantic", "domain", "trl", "timeline", "involvement"];

function percent(score) {
  return Math.round((score || 0) * 100);
}

function BreakdownBars({ breakdown, lang }) {
  return (
    <div className="breakdown-bars">
      {CRITERIA.map((name) => {
        const pct = percent(breakdown?.[name]);
        return (
          <div key={name} className="breakdown-item">
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-2)", fontWeight: 600 }}>
              <span>{t(lang, `criterion_${name}`)}</span>
              <span>{pct}%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RankedCard({ match, lang }) {
  const { explanation } = match;

  return (
    <article className="partner-card">
      <div className="partner-head">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span className="pill pill-green">Top Match</span>
            <ProvenanceBadge classKey="VERIFIED_CALCULATION" lang={lang} />
          </div>
          <h3 style={{ fontSize: "20px", color: "var(--ink)" }}>{match.name}</h3>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>{match.institution}</p>
        </div>

        <div className="partner-score-badge">
          <div className="score-num">{percent(match.score)}%</div>
          <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>
            {t(lang, "scoreLabel")}
          </div>
        </div>
      </div>

      {/* Breakdown Bars */}
      <BreakdownBars breakdown={match.breakdown} lang={lang} />

      {/* Strengths & Risks */}
      <div className="strengths-risks">
        {explanation?.strengths?.length > 0 && (
          <div className="explain-box green">
            <h5 style={{ color: "#16a34a" }}>✓ {t(lang, "strengthsTitle")}</h5>
            <ul>
              {explanation.strengths.map((item, i) => (
                <li key={i}>{t(lang, item.key, item.params)}</li>
              ))}
            </ul>
          </div>
        )}

        {explanation?.risks?.length > 0 && (
          <div className="explain-box amber">
            <h5 style={{ color: "#d97706" }}>⚠️ {t(lang, "risksTitle")}</h5>
            <ul>
              {explanation.risks.map((item, i) => (
                <li key={i}>{t(lang, item.key, item.params)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommended Action */}
      {explanation?.recommended_action && (
        <div style={{ marginTop: "18px", padding: "12px 14px", background: "var(--surface)", borderLeft: "3px solid var(--green-cta)" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--green-text)", display: "block", marginBottom: "4px" }}>
            {t(lang, "actionTitle")}
          </span>
          <p style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--ink)" }}>
            {t(lang, explanation.recommended_action.key, explanation.recommended_action.params)}
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          className="btn btn-green btn-sm"
          onClick={() => alert(lang === "vi" ? `Đã tạo dự thảo Thư ý định (LOI) cho ${match.name}!` : `Generated LOI Draft for ${match.name}!`)}
        >
          📄 {t(lang, "generateLOI")}
        </button>
      </div>
    </article>
  );
}

const LEGEND_CLASSES = [
  "VERIFIED_CALCULATION",
  "CITED_SOURCE",
  "USER_PROVIDED_DATA",
  "AI_INFERENCE",
  "USER_CONFIRMED_DATA",
];

export default function MatchExplanationCard({ report, lang }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h2 style={{ fontSize: "24px", marginBottom: "6px" }}>{t(lang, "step3Title")}</h2>
        {report.report_action && (
          <p style={{ color: "var(--green-text)", fontWeight: 600, fontSize: "14.5px" }}>
            {t(lang, report.report_action.key, report.report_action.params)}
          </p>
        )}
      </div>

      {/* Trust Layer Legend */}
      <div style={{ padding: "16px", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
          🛡️ {t(lang, "provLegendTitle")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {LEGEND_CLASSES.map((c) => (
            <ProvenanceBadge key={c} classKey={c} lang={lang} />
          ))}
        </div>
      </div>

      {/* Ranked List */}
      {report.ranked.length === 0 ? (
        <div className="card" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
          <p>{t(lang, "noMatches")}</p>
        </div>
      ) : (
        <div className="report-ranked-list">
          {report.ranked.map((m) => (
            <RankedCard key={m.profile_id} match={m} lang={lang} />
          ))}
        </div>
      )}

      {/* Rejections */}
      {report.rejected?.length > 0 && (
        <div style={{ padding: "20px", background: "#fffbeb", border: "1px solid #fde68a" }}>
          <h4 style={{ color: "#92400e", fontSize: "15px", marginBottom: "10px" }}>
            🚫 {t(lang, "rejectedTitle")}
          </h4>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "13.5px", color: "#92400e" }}>
            {report.rejected.map((r) => (
              <li key={r.profile_id}>
                <strong>{r.name}</strong> ({r.institution}): {t(lang, r.reason_key, r.reason_params)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ fontSize: "12.5px", color: "var(--muted)", textAlign: "center" }}>
        {t(lang, "profilesAsOf")} {report.profiles_as_of}
      </p>
    </div>
  );
}
