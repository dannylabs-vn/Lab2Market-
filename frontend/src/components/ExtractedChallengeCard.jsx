import React, { useState } from "react";
import { t } from "../i18n";
import ProvenanceBadge from "./ProvenanceBadge";

const REQUIRED_FIELDS = ["domain", "trl_current", "trl_target", "timeline_months"];
const TRL_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function buildDomainOptions(domainTaxonomy, lang) {
  return Object.entries(domainTaxonomy || {}).map(([group, subdomains]) => ({
    group,
    groupLabel: t(lang, `domain_${group}`),
    subdomains: (subdomains || []).map((sub) => ({
      value: sub,
      label: t(lang, `domain_${sub}`),
    })),
  }));
}

export default function ExtractedChallengeCard({
  challenge,
  reference,
  lang,
  onConfirm,
  onBack,
  disabled = false,
}) {
  const [fields, setFields] = useState({
    domain: challenge.domain ?? "",
    trl_current: challenge.trl_current ?? "",
    trl_target: challenge.trl_target ?? "",
    timeline_months: challenge.timeline_months ?? "",
    involvement_preference: challenge.involvement_preference ?? "",
  });

  const [confirmed, setConfirmed] = useState(
    () => new Set(challenge.confirmed_fields || [])
  );

  const domainOptions = buildDomainOptions(reference?.domain_taxonomy, lang);
  const involvementTypes = reference?.involvement_types || [
    "industrial_phd",
    "co_supervision",
    "consulting",
    "research_partnership",
    "none",
  ];
  const trlLevels = reference?.trl_levels || TRL_LEVELS;

  function editField(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }));
    setConfirmed((prev) => {
      const next = new Set(prev);
      next.add(name);
      return next;
    });
  }

  function provenanceFor(name) {
    if (name === "raw_text") return "USER_PROVIDED_DATA";
    if (fields[name] === "" || fields[name] === null) return null;
    return confirmed.has(name) ? "USER_CONFIRMED_DATA" : "AI_INFERENCE";
  }

  const missing = REQUIRED_FIELDS.filter(
    (f) => fields[f] === "" || fields[f] === null
  );

  const targetAfterCurrent =
    fields.trl_target !== "" &&
    fields.trl_current !== "" &&
    Number(fields.trl_target) > Number(fields.trl_current);

  const timelineValid =
    fields.timeline_months === "" ||
    (Number(fields.timeline_months) >= 3 && Number(fields.timeline_months) <= 120);

  const canConfirm = missing.length === 0 && targetAfterCurrent && timelineValid;

  function handleConfirm() {
    if (!canConfirm || disabled) return;
    const nextChallenge = {
      raw_text: challenge.raw_text,
      lang: challenge.lang,
      domain: fields.domain || null,
      trl_current: fields.trl_current === "" ? null : Number(fields.trl_current),
      trl_target: fields.trl_target === "" ? null : Number(fields.trl_target),
      timeline_months:
        fields.timeline_months === "" ? null : Number(fields.timeline_months),
      involvement_preference: fields.involvement_preference || null,
      confirmed_fields: [...confirmed],
    };
    onConfirm(nextChallenge);
  }

  return (
    <div className="card extracted-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.06em", color: "var(--green-text)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
            STEP 2 OF 3
          </span>
          <h2 style={{ fontSize: "24px", marginBottom: "4px" }}>{t(lang, "step2Title")}</h2>
          <p style={{ color: "var(--muted)", fontSize: "14.5px" }}>{t(lang, "step2Hint")}</p>
        </div>
        {onBack && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onBack}>
            ← {t(lang, "backToEdit")}
          </button>
        )}
      </div>

      {missing.length > 0 && (
        <div style={{ padding: "12px 16px", background: "var(--amber-soft)", borderLeft: "4px solid var(--amber)", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "14px", color: "#92400e", fontWeight: 600 }}>
          ⚠️ {t(lang, "missingHint")}
        </div>
      )}

      {fields.trl_target !== "" && fields.trl_current !== "" && !targetAfterCurrent && (
        <div style={{ padding: "12px 16px", background: "var(--red-soft)", borderLeft: "4px solid var(--red)", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "14px", color: "#b91c1c", fontWeight: 600 }}>
          ⚠️ TRL mục tiêu phải lớn hơn TRL hiện tại.
        </div>
      )}

      <div className="extracted-fields">
        {/* Domain */}
        <div className="form-group">
          <label>
            <span>{t(lang, "field_domain")}</span>
            <ProvenanceBadge classKey={provenanceFor("domain")} lang={lang} />
          </label>
          <select
            className="form-control"
            value={fields.domain}
            onChange={(e) => editField("domain", e.target.value)}
          >
            <option value="">{t(lang, "selectPlaceholder")}</option>
            {domainOptions.map((opt) => (
              <optgroup key={opt.group} label={opt.groupLabel}>
                <option value={opt.group}>{opt.groupLabel}</option>
                {opt.subdomains.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Current TRL */}
        <div className="form-group">
          <label>
            <span>{t(lang, "field_trl_current")}</span>
            <ProvenanceBadge classKey={provenanceFor("trl_current")} lang={lang} />
          </label>
          <select
            className="form-control"
            value={fields.trl_current}
            onChange={(e) => editField("trl_current", e.target.value)}
          >
            <option value="">{t(lang, "selectPlaceholder")}</option>
            {trlLevels.map((level) => (
              <option key={level} value={level}>
                {t(lang, `trl_${level}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Target TRL */}
        <div className="form-group">
          <label>
            <span>{t(lang, "field_trl_target")}</span>
            <ProvenanceBadge classKey={provenanceFor("trl_target")} lang={lang} />
          </label>
          <select
            className="form-control"
            value={fields.trl_target}
            onChange={(e) => editField("trl_target", e.target.value)}
          >
            <option value="">{t(lang, "selectPlaceholder")}</option>
            {trlLevels.map((level) => (
              <option key={level} value={level}>
                {t(lang, `trl_${level}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline */}
        <div className="form-group">
          <label>
            <span>{t(lang, "field_timeline_months")}</span>
            <ProvenanceBadge classKey={provenanceFor("timeline_months")} lang={lang} />
          </label>
          <input
            className="form-control"
            type="number"
            min={3}
            max={120}
            value={fields.timeline_months}
            onChange={(e) => editField("timeline_months", e.target.value)}
          />
        </div>

        {/* Involvement Model */}
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>
            <span>{t(lang, "field_involvement_preference")}</span>
            <ProvenanceBadge classKey={provenanceFor("involvement_preference")} lang={lang} />
          </label>
          <select
            className="form-control"
            value={fields.involvement_preference}
            onChange={(e) => editField("involvement_preference", e.target.value)}
          >
            <option value="">{t(lang, "selectPlaceholder")}</option>
            {involvementTypes.map((inv) => (
              <option key={inv} value={inv}>
                {t(lang, `inv_${inv}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Original Description */}
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>
            <span>{t(lang, "field_raw_text")}</span>
            <ProvenanceBadge classKey="USER_PROVIDED_DATA" lang={lang} />
          </label>
          <div style={{ padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "var(--radius-md)", fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.55 }}>
            {challenge.raw_text}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-green"
        disabled={!canConfirm || disabled}
        onClick={handleConfirm}
        style={{ width: "100%", padding: "14px 24px" }}
      >
        {disabled ? t(lang, "matching") : t(lang, "confirmButton")} →
      </button>
    </div>
  );
}
