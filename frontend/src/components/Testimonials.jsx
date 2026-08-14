import React from "react";
import { t } from "../i18n";

export default function Testimonials({ lang }) {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <div className="sec-head center">
          <div className="sec-tag">{t(lang, "testiTag")}</div>
          <h2>{t(lang, "testiTitle")}</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "22px" }}>
          {/* Card 1 */}
          <div className="card">
            <div style={{ color: "#f5a623", fontSize: "16px", marginBottom: "12px" }}>
              ★★★★★
            </div>
            <p style={{ fontStyle: "italic", marginBottom: "20px" }}>
              "{t(lang, "testi1Text")}"
            </p>
            <div>
              <div style={{ fontWeight: 800, color: "var(--ink)" }}>{t(lang, "testi1Author")}</div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)" }}>{t(lang, "testi1Role")}</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <div style={{ color: "#f5a623", fontSize: "16px", marginBottom: "12px" }}>
              ★★★★★
            </div>
            <p style={{ fontStyle: "italic", marginBottom: "20px" }}>
              "{t(lang, "testi2Text")}"
            </p>
            <div>
              <div style={{ fontWeight: 800, color: "var(--ink)" }}>{t(lang, "testi2Author")}</div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)" }}>{t(lang, "testi2Role")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
