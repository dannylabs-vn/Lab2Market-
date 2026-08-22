import React from "react";

export default function AIAssistantMascot({
  state = "idle", // "idle" | "thinking" | "researching" | "matching" | "success"
  message,
  lang = "vi",
  size = "md", // "sm" | "md" | "lg"
  className = "",
}) {
  const stateLabels = {
    idle: lang === "vi" ? "Sẵn sàng hỗ trợ" : "Ready to assist",
    thinking: lang === "vi" ? "Đang phân tích bài toán..." : "Analyzing problem...",
    researching: lang === "vi" ? "Đang trích xuất TRL & Lĩnh vực..." : "Extracting TRL & Domain...",
    matching: lang === "vi" ? "Đang tính toán ma trận MCDA..." : "Calculating MCDA Matrix...",
    success: lang === "vi" ? "Hoàn tất khớp nối!" : "Matching complete!",
  };

  const currentTip = message || stateLabels[state] || stateLabels.idle;

  return (
    <div className={`mascot-card mascot-size-${size} mascot-state-${state} ${className}`}>
      <div className="mascot-avatar-wrapper">
        <div className="mascot-aura" />
        <svg
          className="mascot-svg"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ring / Orbit */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="var(--green-cta)"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="mascot-orbit"
          />

          {/* Core Robot Head */}
          <rect
            x="30"
            y="32"
            width="60"
            height="52"
            rx="16"
            fill="var(--ink)"
            stroke="var(--line-2)"
            strokeWidth="2"
          />

          {/* Screen / Visor */}
          <rect
            x="36"
            y="40"
            width="48"
            height="28"
            rx="10"
            fill="#061826"
          />

          {/* Eyes */}
          {state === "thinking" || state === "researching" || state === "matching" ? (
            <>
              <circle cx="48" cy="54" r="4" fill="var(--green)" className="mascot-eye-pulse" />
              <circle cx="72" cy="54" r="4" fill="var(--green)" className="mascot-eye-pulse" style={{ animationDelay: "0.2s" }} />
            </>
          ) : state === "success" ? (
            <>
              <path d="M44 54 Q48 48 52 54" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" />
              <path d="M68 54 Q72 48 76 54" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="48" cy="54" r="4.5" fill="var(--green)" />
              <circle cx="72" cy="54" r="4.5" fill="var(--green)" />
            </>
          )}

          {/* Antenna */}
          <line x1="60" y1="32" x2="60" y2="20" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="18" r="5" fill="var(--green)" className="mascot-antenna-beacon" />

          {/* Ear Nodes */}
          <rect x="24" y="48" width="6" height="20" rx="3" fill="var(--green-cta)" />
          <rect x="90" y="48" width="6" height="20" rx="3" fill="var(--green-cta)" />

          {/* Cute Smile / Status Line */}
          <path
            d="M52 74 Q60 80 68 74"
            stroke="var(--green-cta)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <span className="mascot-status-badge">
          <span className={`mascot-status-dot dot-${state}`} />
          {stateLabels[state]}
        </span>
      </div>

      <div className="mascot-speech-bubble">
        <span className="mascot-eyebrow">
          {lang === "vi" ? "TRỢ LÝ AI R&D" : "AI RESEARCH ASSISTANT"}
        </span>
        <p>{currentTip}</p>
      </div>
    </div>
  );
}
