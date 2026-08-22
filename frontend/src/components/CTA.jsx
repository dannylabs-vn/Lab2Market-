import React from "react";
import { t } from "../i18n";

export default function CTA({ lang, onStartMatch }) {
  return (
    <section className="section" style={{ padding: "80px 0" }}>
      <div className="wrap max-w-4xl mx-auto">
        <div className="reveal text-center rounded-3xl p-12 md:p-16 shadow-2xl" style={{ background: "linear-gradient(135deg, var(--ink), #003366, #001f3f)", color: "white" }}>
          <h2 className="text-3xl md:text-5xl font-disp font-extrabold mb-6 leading-tight text-white">
            {lang === "vi"
              ? "Sẵn sàng giải bài toán R&D cùng các chuyên gia hàng đầu?"
              : "Ready to solve your R&D challenge with top scientists?"}
          </h2>
          <p className="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto">
            {lang === "vi"
              ? "Trải nghiệm hệ thống ghép đôi xác định, minh bạch và tuân thủ Nghị quyết 57-NQ/TW ngay hôm nay."
              : "Experience deterministic, transparent R&D matching grounded in policy today."}
          </p>
          <button
            type="button"
            className="btn btn-green px-8 py-4 text-lg rounded-full"
            onClick={onStartMatch}
          >
            {t(lang, "startMatching")} →
          </button>
        </div>
      </div>
    </section>
  );
}
