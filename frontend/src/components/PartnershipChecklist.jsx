import React, { useState } from "react";
import { t } from "../i18n";

const CHECKLIST_ITEMS = [
  {
    id: "doc1",
    titleKey: "checkDoc1",
    categoryVi: "Giai đoạn Tiếp cận & Khởi tạo",
    categoryEn: "Initiation & Approach Stage",
    descVi: "Thư xác nhận nhu cầu nghiên cứu, cam kết đồng hành tài chính và cơ sở vật chất từ phía doanh nghiệp.",
    descEn: "Confirmation of corporate research demand, funding commitment, and access to testing facilities.",
    required: true,
  },
  {
    id: "doc2",
    titleKey: "checkDoc2",
    categoryVi: "Pháp lý & Bảo mật",
    categoryEn: "Legal & Confidentiality",
    descVi: "Cam kết bảo mật dữ liệu sản xuất thực tế, thuật toán lõi và thông tin kinh doanh của doanh nghiệp.",
    descEn: "Non-disclosure agreement covering production data, core algorithms, and proprietary trade secrets.",
    required: true,
  },
  {
    id: "doc3",
    titleKey: "checkDoc3",
    categoryVi: "Sở hữu Trí tuệ (IP)",
    categoryEn: "Intellectual Property (IP)",
    descVi: "Quy định tỷ lệ sở hữu sáng chế, bản quyền bài báo khoa học và quyền thương mại hóa theo Nghị quyết 57-NQ/TW.",
    descEn: "Commercialization rights, patent ownership ratio, and academic publication terms per Resolution 57.",
    required: true,
  },
  {
    id: "doc4",
    titleKey: "checkDoc4",
    categoryVi: "Kế hoạch R&D",
    categoryEn: "R&D Roadmap",
    descVi: "Phân chia giai đoạn nghiên cứu (TRL milestones), cổng kiểm soát (Stage-gates) và chỉ số KPI đầu ra.",
    descEn: "TRL stage-gate milestones, deliverables timeline, and measurable KPI benchmarks.",
    required: true,
  },
  {
    id: "doc5",
    titleKey: "checkDoc5",
    categoryVi: "Đào tạo & Nhân lực",
    categoryEn: "Doctoral Training & Personnel",
    descVi: "Hợp đồng phân công GS/PGS hướng dẫn chính và Chuyên gia doanh nghiệp làm đồng hướng dẫn NCS.",
    descEn: "Dual mentorship contract between university faculty and corporate R&D technical lead.",
    required: false,
  },
];

export default function PartnershipChecklist({ lang }) {
  const [checkedState, setCheckedState] = useState({
    doc1: true,
    doc2: true,
    doc3: false,
    doc4: false,
    doc5: false,
  });

  const toggleCheck = (id) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const progressPct = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag">{t(lang, "checklistTitle")}</div>
          <h2>{t(lang, "checklistSub")}</h2>
        </div>

        <div className="chart-card" style={{ maxWidth: "840px", margin: "0 auto", padding: "32px" }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>
                Tiến độ chuẩn bị hồ sơ hợp tác
              </span>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--green-text)" }}>
                {completedCount}/{CHECKLIST_ITEMS.length} văn bản ({progressPct}%)
              </span>
            </div>
            <div style={{ height: "8px", background: "var(--surface2)", borderRadius: 0, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: "var(--green-cta)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!checkedState[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "16px",
                    background: isChecked ? "var(--surface)" : "#fff",
                    border: `1.5px solid ${isChecked ? "var(--green-cta)" : "var(--line)"}`,
                    cursor: "pointer",
                    transition: "0.15s",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginTop: "2px",
                      accentColor: "var(--green-cta)",
                      cursor: "pointer",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: isChecked ? "var(--ink)" : "var(--ink-2)" }}>
                        {t(lang, item.titleKey)}
                      </span>
                      <span className={`pill ${item.required ? "pill-green" : ""}`}>
                        {item.required ? "Bắt buộc" : "Tùy chọn"}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px", fontWeight: 600 }}>
                      {lang === "vi" ? item.categoryVi : item.categoryEn}
                    </div>
                    <p style={{ fontSize: "13.5px", color: "var(--muted)", marginTop: "6px", lineHeight: 1.5 }}>
                      {lang === "vi" ? item.descVi : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              Chuẩn hóa theo quy định của Bộ KH&amp;CN &amp; Bộ GD&amp;ĐT
            </span>
            <button
              type="button"
              className="btn btn-green btn-sm"
              onClick={() => alert(lang === "vi" ? "Đã tải bộ mẫu hồ sơ hợp tác chuẩn!" : "Downloaded Partnership Kit!")}
            >
              📥 Xuất trọn bộ hồ sơ mẫu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
