import React, { useState } from "react";
import { t } from "../i18n";

export default function TRLAnalysis({ lang, onNavigateToMatch }) {
  const [trlCurrent, setTrlCurrent] = useState(3);
  const [trlTarget, setTrlTarget] = useState(7);
  const [monthsBiz, setMonthsBiz] = useState(24);
  const [monthsLab, setMonthsLab] = useState(24);

  const gap = Math.max(1, trlTarget - trlCurrent);
  const ratio = (monthsLab / Math.max(1, monthsBiz)).toFixed(2);

  // Compute feasibility tier
  let tierKey = "tierRobust";
  let tierColor = "#16a34a";
  let tierBg = "#f0fdf4";
  let adviceVi = "Lộ trình R&D rất khả thi. Tiến độ và độ dài bước nhảy TRL phù hợp cho đề án Tiến sĩ công nghiệp 2-3 năm.";
  let adviceEn = "Highly feasible R&D roadmap. Timeline and TRL jump are optimal for a 2-3 year Industrial PhD project.";

  if (ratio > 1.5 || gap >= 6) {
    tierKey = "tierInfeasible";
    tierColor = "#e5533b";
    tierBg = "#fef2f2";
    adviceVi = "Cảnh báo: Tỷ lệ thời gian lab vượt 1.5× hoặc bước nhảy TRL quá lớn. Cần chia nhỏ bài toán thành 2 giai đoạn R&D riêng biệt.";
    adviceEn = "Warning: Lab timeline exceeds 1.5x or TRL span is too wide. Divide challenge into 2 separate R&D phases.";
  } else if (ratio > 1.2 || gap >= 4) {
    tierKey = "tierTight";
    tierColor = "#d97706";
    tierBg = "#fffbeb";
    adviceVi = "Rủi ro tiến độ: Cần bổ sung nguồn lực đồng hướng dẫn (Co-supervision) hoặc ứng dụng cơ chế thử nghiệm Sandbox.";
    adviceEn = "Timeline risk: Add co-supervision faculty or apply sandbox mechanisms to accelerate deployment.";
  } else if (gap >= 3 || ratio > 1.0) {
    tierKey = "tierViable";
    tierColor = "#0284c7";
    tierBg = "#f0f9ff";
    adviceVi = "Khả thi có điều kiện: Cần thiết lập cổng đánh giá kiểm soát (Stage-gate review) mỗi 6 tháng.";
    adviceEn = "Conditionally viable: Establish strict stage-gate review milestones every 6 months.";
  }

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag">{t(lang, "analysisTitle")}</div>
          <h2>{t(lang, "analysisSub")}</h2>
        </div>

        <div className="mkt-grid">
          {/* Controls Card */}
          <div className="chart-card">
            <h4>Tham số TRL &amp; Tiến độ</h4>
            <div className="csub">Điều chỉnh để mô phỏng tính khả thi</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                  <span>TRL Hiện tại</span>
                  <span style={{ color: "var(--green-text)" }}>TRL {trlCurrent}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={trlCurrent}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTrlCurrent(val);
                    if (val >= trlTarget) setTrlTarget(val + 1);
                  }}
                  style={{ width: "100%", accentColor: "var(--green-cta)" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                  <span>TRL Mục tiêu</span>
                  <span style={{ color: "var(--green-text)" }}>TRL {trlTarget}</span>
                </label>
                <input
                  type="range"
                  min={trlCurrent + 1}
                  max={9}
                  value={trlTarget}
                  onChange={(e) => setTrlTarget(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--green-cta)" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                  <span>Thời gian Doanh nghiệp</span>
                  <span style={{ color: "var(--ink)" }}>{monthsBiz} tháng</span>
                </label>
                <input
                  type="range"
                  min={6}
                  max={48}
                  step={6}
                  value={monthsBiz}
                  onChange={(e) => setMonthsBiz(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--green-cta)" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                  <span>Thời gian Lab ước tính</span>
                  <span style={{ color: "var(--ink)" }}>{monthsLab} tháng</span>
                </label>
                <input
                  type="range"
                  min={6}
                  max={48}
                  step={6}
                  value={monthsLab}
                  onChange={(e) => setMonthsLab(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--green-cta)" }}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-green btn-sm"
              style={{ width: "100%", marginTop: "24px" }}
              onClick={onNavigateToMatch}
            >
              {t(lang, "startMatching")} →
            </button>
          </div>

          {/* Results Analysis */}
          <div className="table-card" style={{ padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>
                  ĐÁNH GIÁ MỨC ĐỘ RỦI RO
                </span>
                <h3 style={{ fontSize: "24px", color: tierColor, marginTop: "4px" }}>
                  {t(lang, tierKey)}
                </h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>Khoảng cách TRL</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--ink)" }}>
                  +{gap} bậc TRL
                </div>
              </div>
            </div>

            {/* Metric Bars */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "20px 0" }}>
              <div style={{ padding: "16px", background: "var(--surface)", border: "1px solid var(--line)" }}>
                <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>
                  {t(lang, "trlGapLabel")}
                </div>
                <div style={{ fontSize: "26px", fontWeight: 800, color: "var(--ink)", margin: "4px 0" }}>
                  TRL {trlCurrent} → {trlTarget}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {gap <= 3 ? "✓ Bước nhảy tiêu chuẩn" : "⚠️ Cần lộ trình bậc thang"}
                </div>
              </div>

              <div style={{ padding: "16px", background: "var(--surface)", border: "1px solid var(--line)" }}>
                <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>
                  {t(lang, "timelineRatioLabel")}
                </div>
                <div style={{ fontSize: "26px", fontWeight: 800, color: "var(--ink)", margin: "4px 0" }}>
                  {ratio}×
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {ratio <= 1.0 ? "✓ Tiến độ lab nhanh hơn" : ratio <= 1.5 ? "⚠️ Rủi ro nhẹ" : "❌ Quá hạn định"}
                </div>
              </div>
            </div>

            {/* Advice Box */}
            <div
              style={{
                background: tierBg,
                borderLeft: `4px solid ${tierColor}`,
                padding: "16px 20px",
                marginTop: "20px",
              }}
            >
              <h5 style={{ color: tierColor, fontSize: "13px", textTransform: "uppercase", marginBottom: "6px" }}>
                {t(lang, "analysisAdvice")}
              </h5>
              <p style={{ fontSize: "14.5px", color: "var(--ink)", lineHeight: 1.6 }}>
                {lang === "vi" ? adviceVi : adviceEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
