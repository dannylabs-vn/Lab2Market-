import React, { useState } from "react";
import { t } from "../i18n";
import AIAssistantMascot from "./AIAssistantMascot";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="hero-layout">
        <AIAssistantMascot
          state={disabled ? "thinking" : trimmed ? "thinking" : "idle"}
          lang={lang}
          message={
            disabled
              ? (lang === "vi" ? "Đang trích xuất dữ liệu TRL, Lĩnh vực & Thời gian..." : "Extracting TRL, Domain & Timeline data...")
              : trimmed
              ? (lang === "vi" ? "Sẵn sàng phân tích yêu cầu R&D..." : "Ready to analyze R&D request...")
              : (lang === "vi" ? "Nhập chi tiết bài toán nghiên cứu của bạn bên dưới." : "Enter your research challenge details below.")
          }
        />

        <div className="card" style={{ padding: "32px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.06em", color: "var(--green-text)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
              STEP 1 OF 3
            </span>
            <h2 style={{ fontSize: "24px", marginBottom: "6px" }}>
              {lang === "vi" ? "Mô tả bài toán R&D của doanh nghiệp" : "Describe Business R&D Challenge"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14.5px" }}>
              {t(lang, "hero_sub")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="launcher-box" style={{ marginBottom: "20px" }}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t(lang, "inputPlaceholder")}
                rows={6}
                disabled={disabled}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: "10px" }}>
                {t(lang, "exampleLabel")}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {EXAMPLE_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="btn btn-ghost btn-sm"
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
              {disabled ? t(lang, "analyzing") : (lang === "vi" ? "Phân tích bài toán R&D →" : "Analyze R&D Challenge →")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
