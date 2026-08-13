// ProvenanceBadge — shared Trust Layer chip (rule §7).
// One badge per element: each field's origin is labeled exactly once.
// `classKey` is a ProvenanceClass enum value; the label comes from the
// matching `prov_*` i18n key, never hardcoded prose (rule §9).

import { t } from "../i18n";

// Fixed mapping: class key -> i18n label key + color token. Colors live in
// styles.css as CSS custom properties so the badge stays presentational.
const CLASS_META = {
  VERIFIED_CALCULATION: {
    colorVar: "var(--prov-verified)",
    labelKey: "prov_VERIFIED_CALCULATION",
  },
  CITED_SOURCE: {
    colorVar: "var(--prov-cited)",
    labelKey: "prov_CITED_SOURCE",
  },
  USER_PROVIDED_DATA: {
    colorVar: "var(--prov-user)",
    labelKey: "prov_USER_PROVIDED_DATA",
  },
  AI_INFERENCE: {
    colorVar: "var(--prov-ai)",
    labelKey: "prov_AI_INFERENCE",
  },
  USER_CONFIRMED_DATA: {
    colorVar: "var(--prov-confirmed)",
    labelKey: "prov_USER_CONFIRMED_DATA",
  },
};

export default function ProvenanceBadge({ classKey, lang }) {
  const meta = CLASS_META[classKey];
  // Unknown class key renders nothing rather than a misleading label.
  if (!meta) return null;

  return (
    <span
      className="prov-badge"
      style={{ "--badge-color": meta.colorVar }}
      title={t(lang, meta.labelKey)}
    >
      <span className="prov-badge__dot" aria-hidden="true" />
      {t(lang, meta.labelKey)}
    </span>
  );
}
