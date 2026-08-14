import React, { useState } from "react";
import { t } from "../i18n";

const EXAMPLE_KEYS = ["example1", "example2", "example3"];

export default function OnboardingForm({
  lang,
  onSubmit,
  disabled = false,
  initialText = "",
}) {
  const [text, setText] = useState(initialText);
  const trimmed = text.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
  }

  return (
    <div className="card" style={{ padding: "32px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "6px" }}>
          {lang === "vi" ? "1. Nhập bài toán R&D của doanh nghiệp" : "1. Enter Business R&D Challenge"}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          {t(lang, "hero_sub")}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="launcher" style={{ marginBottom: "20px" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t(lang, "inputPlaceholder")}
            rows={5}
            disabled={disabled}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: "8px" }}>
            {t(lang, "exampleLabel")}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {EXAMPLE_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className="chip"
                onClick={() => setText(t(lang, key))}
                disabled={disabled}
              >
                {t(lang, key)}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-green"
          disabled={!trimmed || disabled}
          style={{ width: "100%" }}
        >
          {disabled ? t(lang, "analyzing") : t(lang, "submitText")} →
        </button>
      </form>
    </div>
  );
}
