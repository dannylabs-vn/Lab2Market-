import React from "react";
import { t } from "../i18n";

export default function CompareBar({
  lang,
  compareList = [],
  onRemoveItem,
  onClearAll,
  onOpenModal,
}) {
  if (!compareList.length) return null;

  return (
    <div className="compare-bar">
      <div className="wrap compare-bar-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "14px", overflowX: "auto" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, whiteSpace: "nowrap" }}>
            {compareList.length} {t(lang, "compareBarSelected")}:
          </span>
          <div className="compare-slots">
            {compareList.map((lab) => (
              <div key={lab.id} className="compare-chip">
                <span>{lab.name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveItem(lab.id)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)", background: "transparent" }}
            onClick={onClearAll}
          >
            {t(lang, "btnClearCompare")}
          </button>
          <button
            type="button"
            className="btn btn-green btn-sm"
            onClick={onOpenModal}
          >
            {t(lang, "btnViewCompare")} ({compareList.length}) →
          </button>
        </div>
      </div>
    </div>
  );
}
