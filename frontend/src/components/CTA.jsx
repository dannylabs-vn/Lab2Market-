import React from "react";
import { t } from "../i18n";

export default function CTA({ lang, onStartMatch }) {
  return (
    <section className="section" style={{ padding: "80px 0" }}>
      <div className="wrap">
        <div
          style={{
            background: "linear-gradient(135deg, var(--ink) 0%, #034e4a 100%)",
            color: "#fff",
            padding: "50px 40px",
            textAlign: "center",
            border: "1px solid var(--green-cta)",
          }}
        >
          <h2 style={{ color: "#fff", fontSize: "clamp(26px, 4vw, 38px)", marginBottom: "14px" }}>
            {lang === "vi"
              ? "Sẵn sàng giải bài toán R&D cùng các chuyên gia hàng đầu?"
              : "Ready to solve your R&D challenge with top scientists?"}
          </h2>
          <p style={{ color: "#c1dcd7", maxWidth: "620px", margin: "0 auto 28px", fontSize: "16px" }}>
            {lang === "vi"
              ? "Trải nghiệm hệ thống ghép đôi xác định, minh bạch và tuân thủ Nghị quyết 57-NQ/TW ngay hôm nay."
              : "Experience deterministic, transparent R&D matching grounded in policy today."}
          </p>
          <button
            type="button"
            className="btn btn-green"
            onClick={onStartMatch}
          >
            {t(lang, "startMatching")} →
          </button>
        </div>
      </div>
    </section>
  );
}
