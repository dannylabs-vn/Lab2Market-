// MatchExplanationCard — step 3: renders the engine's ranked shortlist with
// full explainability (rule §4/§7). Every number is VERIFIED CALCULATION; the
// Trust Layer provenance is rendered per field/section via ProvenanceBadge.
// All prose is i18n keys + params — never hardcoded (rule §9).

import { t } from "../i18n";
import ProvenanceBadge from "./ProvenanceBadge";

const CRITERIA = ["semantic", "domain", "trl", "timeline", "involvement"];

function percent(score) {
  return Math.round(score * 100);
}

function BreakdownBars({ breakdown, lang }) {
  return (
    <div className="breakdown">
      {CRITERIA.map((name) => {
        const pct = percent(breakdown[name]);
        return (
          <div key={name} className="breakdown__row">
            <span className="breakdown__label">
              {t(lang, `criterion_${name}`)}
            </span>
            <div className="breakdown__track">
              <div
                className="breakdown__fill"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="breakdown__pct">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}

function ExplanationList({ items, lang, kind }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className={`explain-list explain-list--${kind}`}>
      {items.map((item, i) => (
        <li key={i}>{t(lang, item.key, item.params)}</li>
      ))}
    </ul>
  );
}

function RankedCard({ match, lang }) {
  const { explanation } = match;
  return (
    <article className="match-card">
      <header className="match-card__header">
        <div>
          <h3 className="match-card__name">{match.name}</h3>
          <p className="match-card__institution">{match.institution}</p>
        </div>
        <div className="match-card__score">
          <span className="match-card__score-value">
            {percent(match.score)}%
          </span>
          <span className="match-card__score-label">
            {t(lang, "scoreLabel")}
          </span>
        </div>
      </header>

      <ProvenanceBadge classKey="VERIFIED_CALCULATION" lang={lang} />

      <div className="match-card__section">
        <h4>{t(lang, "breakdownTitle")}</h4>
        <BreakdownBars breakdown={match.breakdown} lang={lang} />
      </div>

      {explanation.strengths.length > 0 && (
        <div className="match-card__section">
          <h4>{t(lang, "strengthsTitle")}</h4>
          <ExplanationList items={explanation.strengths} lang={lang} kind="strength" />
        </div>
      )}

      {explanation.risks.length > 0 && (
        <div className="match-card__section">
          <h4>{t(lang, "risksTitle")}</h4>
          <ExplanationList items={explanation.risks} lang={lang} kind="risk" />
        </div>
      )}

      <div className="match-card__section">
        <h4>{t(lang, "actionTitle")}</h4>
        <p className="match-card__action">
          {t(lang, explanation.recommended_action.key, explanation.recommended_action.params)}
        </p>
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
    <section className="report">
      <h2>{t(lang, "step3Title")}</h2>

      {report.report_action && (
        <div className="report__action">
          {t(lang, report.report_action.key, report.report_action.params)}
        </div>
      )}

      {/* Legend first: the Trust Layer key is visible without scrolling,
          so every badge a reader sees below is decodable immediately. */}
      <div className="report__legend">
        <h3>{t(lang, "provLegendTitle")}</h3>
        <div className="report__legend-badges">
          {LEGEND_CLASSES.map((c) => (
            <ProvenanceBadge key={c} classKey={c} lang={lang} />
          ))}
        </div>
      </div>

      {report.ranked.length === 0 ? (
        <p className="report__empty">{t(lang, "noMatches")}</p>
      ) : (
        <div className="report__cards">
          {report.ranked.map((m) => (
            <RankedCard key={m.profile_id} match={m} lang={lang} />
          ))}
        </div>
      )}

      {report.rejected.length > 0 && (
        <div className="report__rejected">
          <h3>{t(lang, "rejectedTitle")}</h3>
          <ul>
            {report.rejected.map((r) => (
              <li key={r.profile_id}>
                <strong>{r.name}</strong> — {t(lang, r.reason_key, r.reason_params)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="report__asof">
        {t(lang, "profilesAsOf")} {report.profiles_as_of}
      </p>
    </section>
  );
}
