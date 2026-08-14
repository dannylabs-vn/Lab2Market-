import React from "react";
import { t } from "../i18n";

export default function WhySection({ lang }) {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <div className="sec-head center">
          <div className="sec-tag">{t(lang, "whyTag")}</div>
          <h2>{t(lang, "whyTitle")}</h2>
          <p>{t(lang, "whySub")}</p>
        </div>

        <div className="why-bento">
          {/* Card 1: Pure Deterministic Engine */}
          <div className="bento-card col-7">
            <div>
              <div className="bento-card__badge">{t(lang, "bento1Badge")}</div>
              <h3>{t(lang, "bento1Title")}</h3>
              <p>{t(lang, "bento1Desc")}</p>
            </div>
            <div className="bento-code-preview">
              <code>
                Score = w_sem·S_sem + w_dom·S_dom + w_trl·S_trl + w_time·S_time + w_inv·S_inv
              </code>
            </div>
          </div>

          {/* Card 2: 5-Tier Provenance */}
          <div className="bento-card col-5">
            <div>
              <div className="bento-card__badge">{t(lang, "bento2Badge")}</div>
              <h3>{t(lang, "bento2Title")}</h3>
              <p>{t(lang, "bento2Desc")}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
              <span className="prov-badge prov-badge--VERIFIED_CALCULATION">
                <span className="prov-badge__dot" />
                {t(lang, "prov_VERIFIED_CALCULATION")}
              </span>
              <span className="prov-badge prov-badge--CITED_SOURCE">
                <span className="prov-badge__dot" />
                {t(lang, "prov_CITED_SOURCE")}
              </span>
              <span className="prov-badge prov-badge--USER_CONFIRMED_DATA">
                <span className="prov-badge__dot" />
                {t(lang, "prov_USER_CONFIRMED_DATA")}
              </span>
            </div>
          </div>

          {/* Card 3: Instant Simulation */}
          <div className="bento-card col-5">
            <div>
              <div className="bento-card__badge">{t(lang, "bento3Badge")}</div>
              <h3>{t(lang, "bento3Title")}</h3>
              <p>{t(lang, "bento3Desc")}</p>
            </div>
            <div style={{ marginTop: "14px", color: "var(--green-text)", fontWeight: 700, fontSize: "13px" }}>
              ⚡ 0ms latency · Pure client-side state reordering
            </div>
          </div>

          {/* Card 4: Policy & Framework */}
          <div className="bento-card col-7">
            <div>
              <div className="bento-card__badge">{t(lang, "bento4Badge")}</div>
              <h3>{t(lang, "bento4Title")}</h3>
              <p>{t(lang, "bento4Desc")}</p>
            </div>
            <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
              <span className="pill pill-green">Nghị quyết 57-NQ/TW</span>
              <span className="pill">Nghị quyết 71/NQ-CP</span>
              <span className="pill">Đề án 1.000 Tiến sĩ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
