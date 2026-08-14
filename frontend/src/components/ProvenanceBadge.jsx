import React from "react";
import { t } from "../i18n";

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
  if (!meta) return null;

  return (
    <span
      className={`prov-badge prov-badge--${classKey}`}
      style={{ "--badge-color": meta.colorVar }}
      title={t(lang, meta.labelKey)}
    >
      <span className="prov-badge__dot" aria-hidden="true" />
      {t(lang, meta.labelKey)}
    </span>
  );
}
