import React, { useState } from "react";
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
  const [showWhy, setShowWhy] = useState(false);

  return (
    <article className="partner-card">
      <div className="partner-head">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="pill pill-green">Top Match</span>
            <ProvenanceBadge classKey="VERIFIED_CALCULATION" lang={lang} />
          </div>
          <h3 style={{ fontSize: "22px", color: "var(--ink)" }}>{match.name}</h3>
          <p style={{ color: "var(--muted)", fontSize: "14.5px" }}>{match.institution}</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-disp)", fontSize: "32px", fontWeight: 800, color: "var(--green-cta)" }}>
            {(match.score * 100).toFixed(1)} <span style={{ fontSize: "16px", color: "var(--muted)" }}>/ 100</span>
          </div>
          <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>
            {t(lang, "scoreLabel")}
          </div>
        </div>
      </div>

      {/* Breakdown Bars */}
      <BreakdownBars breakdown={match.breakdown} lang={lang} />

      {/* Expandable Explainability Section */}
      <div style={{ margin: "16px 0" }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ width: "100%", justifyContent: "space-between" }}
          onClick={() => setShowWhy((prev) => !prev)}
        >
          <span style={{ fontWeight: 700, color: "var(--ink)" }}>
            {lang === "vi" ? "Vì sao đối tác này có điểm số cao?" : "Why does this partner rank high?"}
          </span>
          <span>{showWhy ? "▲" : "▼"}</span>
        </button>

        {showWhy && (
          <div style={{ padding: "16px", background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "var(--radius-md)", marginTop: "8px", fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.6 }}>
            <p style={{ marginBottom: "10px" }}>
              <strong>{lang === "vi" ? "Giải thích thuật toán MCDA:" : "MCDA Algorithmic Reasoning:"}</strong>
            </p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>
                {lang === "vi"
                  ? `Độ phù hợp ngữ nghĩa đạt ${percent(match.breakdown?.semantic)}% dựa trên phân tích tương đồng vector bài toán.`
                  : `Semantic alignment reaches ${percent(match.breakdown?.semantic)}% based on vector similarity.`}
              </li>
              <li>
                {lang === "vi"
                  ? `Khả năng nâng TRL đạt ${percent(match.breakdown?.trl)}% đáp ứng ngưỡng triển khai công nghiệp.`
                  : `TRL progression capability of ${percent(match.breakdown?.trl)}% satisfies industrial deployment threshold.`}
              </li>
              <li>
                {lang === "vi"
                  ? `Mô hình hợp tác và thời gian thực hiện khớp ${percent(match.breakdown?.timeline)}% theo mong muốn của doanh nghiệp.`
                  : `Involvement model and timeline alignment of ${percent(match.breakdown?.timeline)}% matches business constraints.`}
              </li>
            </ul>
          </div>
        )}
      </div>

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
        <div style={{ marginTop: "18px", padding: "14px 16px", background: "var(--surface)", borderLeft: "4px solid var(--green-cta)", borderRadius: "var(--radius-sm)" }}>
          <span style={{ fontSize: "11.5px", textTransform: "uppercase", fontWeight: 800, color: "var(--green-text)", display: "block", marginBottom: "4px" }}>
            {t(lang, "actionTitle")}
          </span>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
            {t(lang, explanation.recommended_action.key, explanation.recommended_action.params)}
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
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
  const topMatch = report?.ranked?.[0];
  const topScore = topMatch ? (topMatch.score * 100).toFixed(1) : "0.0";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.06em", color: "var(--green-text)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
          STEP 3 OF 3
        </span>
        <h2 style={{ fontSize: "28px", marginBottom: "6px" }}>{t(lang, "step3Title")}</h2>
        {report.report_action && (
          <p style={{ color: "var(--green-text)", fontWeight: 600, fontSize: "15px" }}>
            {t(lang, report.report_action.key, report.report_action.params)}
          </p>
        )}
      </div>

      {/* Primary Overall MCDA Score Focal Point */}
      {topMatch && (
        <div className="overall-score-hero">
          <div className="score-main-display">
            <div>
              <span className="score-big-val">{topScore}</span>
              <span className="score-big-denom">/ 100</span>
            </div>
            <div className="score-label">
              {lang === "vi" ? "Tiềm năng thương mại hóa" : "Commercialization Potential"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "rgba(255, 255, 255, 0.9)" }}>
              {lang === "vi" ? "Đánh giá đa tiêu chí MCDA đối tác hàng đầu:" : "Top Partner Multi-Criteria Analysis:"}
            </div>

            <div className="score-metrics-grid">
              <div className="score-metric-item">
                <div className="score-metric-lbl">{lang === "vi" ? "Tính khả thi" : "Feasibility"}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
                  {percent(topMatch.breakdown?.trl)}%
                </div>
                <div className="score-metric-bar-track">
                  <div className="score-metric-bar-fill" style={{ width: `${percent(topMatch.breakdown?.trl)}%` }} />
                </div>
              </div>

              <div className="score-metric-item">
                <div className="score-metric-lbl">{lang === "vi" ? "Độ tương đồng" : "Semantic Match"}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
                  {percent(topMatch.breakdown?.semantic)}%
                </div>
                <div className="score-metric-bar-track">
                  <div className="score-metric-bar-fill" style={{ width: `${percent(topMatch.breakdown?.semantic)}%` }} />
                </div>
              </div>

              <div className="score-metric-item">
                <div className="score-metric-lbl">{lang === "vi" ? "Lĩnh vực R&D" : "Domain Fit"}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
                  {percent(topMatch.breakdown?.domain)}%
                </div>
                <div className="score-metric-bar-track">
                  <div className="score-metric-bar-fill" style={{ width: `${percent(topMatch.breakdown?.domain)}%` }} />
                </div>
              </div>

              <div className="score-metric-item">
                <div className="score-metric-lbl">{lang === "vi" ? "Tiến độ thời gian" : "Timeline Fit"}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
                  {percent(topMatch.breakdown?.timeline)}%
                </div>
                <div className="score-metric-bar-track">
                  <div className="score-metric-bar-fill" style={{ width: `${percent(topMatch.breakdown?.timeline)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust Layer Legend */}
      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>🛡️</span> {t(lang, "provLegendTitle")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {LEGEND_CLASSES.map((c) => (
            <ProvenanceBadge key={c} classKey={c} lang={lang} />
          ))}
        </div>
      </div>

      {/* Ranked List */}
      {report.ranked.length === 0 ? (
        <div className="card" style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
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
        <div style={{ padding: "20px", background: "var(--amber-soft)", border: "1px solid #fde68a", borderRadius: "var(--radius-md)" }}>
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
