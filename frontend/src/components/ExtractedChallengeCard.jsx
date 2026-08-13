// ExtractedChallengeCard — step 2: confirm/edit AI-inferred fields (rule §2/§7).
// The user reviews the extraction, edits any field, and confirms. Editing a
// field is the explicit action that moves it AI_INFERENCE -> USER_CONFIRMED_DATA
// (recorded in confirmed_fields, never implicit). Confirm reports the assembled
// challenge upward via `onConfirm` — the parent owns the match call.

import { useState } from "react";
import { t } from "../i18n";
import ProvenanceBadge from "./ProvenanceBadge";

// The engine's required fields (mirrors backend REQUIRED_MATCH_FIELDS).
const REQUIRED_FIELDS = ["domain", "trl_current", "trl_target", "timeline_months"];

const TRL_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function buildDomainOptions(domainTaxonomy, lang) {
  // One <optgroup> per group; inside it, a group-level option plus each
  // subdomain option. This covers both group-level and subdomain-level values
  // the engine accepts (resolve_domain handles either).
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
  disabled = false,
}) {
  // Local editable state, seeded from the extracted challenge.
  const [fields, setFields] = useState({
    domain: challenge.domain ?? "",
    trl_current: challenge.trl_current ?? "",
    trl_target: challenge.trl_target ?? "",
    timeline_months: challenge.timeline_months ?? "",
    involvement_preference: challenge.involvement_preference ?? "",
  });
  // Explicitly confirmed fields (edited/touched). Starts from what the
  // client already recorded, then grows on each edit.
  const [confirmed, setConfirmed] = useState(
    () => new Set(challenge.confirmed_fields || [])
  );

  const domainOptions = buildDomainOptions(reference?.domain_taxonomy, lang);
  const involvementTypes = reference?.involvement_types || [];
  const trlLevels = reference?.trl_levels || TRL_LEVELS;

  function editField(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }));
    // Touching a field is the explicit confirmation action (rule §7).
    setConfirmed((prev) => {
      const next = new Set(prev);
      next.add(name);
      return next;
    });
  }

  function provenanceFor(name) {
    // raw_text is always the user's own; other fields flip to USER_CONFIRMED
    // only after an explicit edit. Missing (empty) fields carry no badge.
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
  // Timeline must satisfy the API contract (3-120) client-side too, so the
  // most likely 422 is caught here instead of reaching the backend.
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

  function fieldRow(label, name, control) {
    const badge = provenanceFor(name);
    const isMissing = REQUIRED_FIELDS.includes(name) && badge === null;
    return (
      <div className={`field ${isMissing ? "field--missing" : ""}`}>
        <label className="field__label">
          <span>{label}</span>
          {badge && <ProvenanceBadge classKey={badge} lang={lang} />}
        </label>
        {control}
      </div>
    );
  }

  return (
    <div className="extracted">
      <h2>{t(lang, "step2Title")}</h2>
      <p className="extracted__hint">{t(lang, "step2Hint")}</p>

      {missing.length > 0 && (
        <p className="extracted__missing-hint">{t(lang, "missingHint")}</p>
      )}

      <div className="extracted__fields">
        {fieldRow(
          t(lang, "field_domain"),
          "domain",
          <select
            className="field__control"
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
        )}

        {fieldRow(
          t(lang, "field_trl_current"),
          "trl_current",
          <select
            className="field__control"
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
        )}

        {fieldRow(
          t(lang, "field_trl_target"),
          "trl_target",
          <select
            className="field__control"
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
        )}

        {fieldRow(
          t(lang, "field_timeline_months"),
          "timeline_months",
          <input
            className="field__control"
            type="number"
            min={3}
            max={120}
            value={fields.timeline_months}
            onChange={(e) => editField("timeline_months", e.target.value)}
          />
        )}

        {fieldRow(
          t(lang, "field_involvement_preference"),
          "involvement_preference",
          <select
            className="field__control"
            value={fields.involvement_preference}
            onChange={(e) =>
              editField("involvement_preference", e.target.value)
            }
          >
            <option value="">{t(lang, "selectPlaceholder")}</option>
            {involvementTypes.map((inv) => (
              <option key={inv} value={inv}>
                {t(lang, `inv_${inv}`)}
              </option>
            ))}
          </select>
        )}

        {fieldRow(
          t(lang, "field_raw_text"),
          "raw_text",
          <div className="field__raw-text">{challenge.raw_text}</div>
        )}
      </div>

      <button
        type="button"
        className="extracted__confirm"
        disabled={!canConfirm || disabled}
        onClick={handleConfirm}
      >
        {t(lang, "confirmButton")}
      </button>
    </div>
  );
}
