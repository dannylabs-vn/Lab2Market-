import React from "react";
import { t } from "../i18n";

export default function CompareModal({
  lang,
  isOpen,
  onClose,
  compareList = [],
  onStartMatchWithLab,
}) {
  if (!isOpen || !compareList.length) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <div className="sec-tag">{t(lang, "compareTitle")}</div>
            <h2 style={{ fontSize: "24px" }}>{t(lang, "compareSub")}</h2>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
          >
            ✕ {t(lang, "closeModal")}
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ width: "200px", background: "var(--surface)" }}>Tiêu chí so sánh</th>
                {compareList.map((lab) => (
                  <th key={lab.id} style={{ minWidth: "220px", background: "var(--surface)" }}>
                    <div style={{ fontWeight: 800, fontSize: "15px", color: "var(--ink)" }}>{lab.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 400 }}>{lab.institution}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>Chuyên ngành</td>
                {compareList.map((lab) => (
                  <td key={lab.id}>
                    <span className="pill">{lang === "vi" ? lab.domainLabelVi : lab.domainLabelEn}</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ fontWeight: 700 }}>Khoảng TRL sẵn sàng</td>
                {compareList.map((lab) => (
                  <td key={lab.id}>
                    <span className="pill pill-green">TRL {lab.trlMin} → {lab.trlMax}</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ fontWeight: 700 }}>Thời gian điển hình</td>
                {compareList.map((lab) => (
                  <td key={lab.id}>
                    <strong>{lab.typicalMonths} tháng</strong>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ fontWeight: 700 }}>Công bố khoa học</td>
                {compareList.map((lab) => (
                  <td key={lab.id}>
                    <strong>{lab.papersCount} bài báo quốc tế</strong>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ fontWeight: 700 }}>Bằng sáng chế / Patent</td>
                {compareList.map((lab) => (
                  <td key={lab.id}>
                    <strong>{lab.patentsCount} bằng độc quyền</strong>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ fontWeight: 700 }}>Mô hình hợp tác</td>
                {compareList.map((lab) => (
                  <td key={lab.id}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {lab.involvementTypes.map((inv) => (
                        <span key={inv} className="pill" style={{ fontSize: "11px" }}>
                          {t(lang, `inv_${inv}`)}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ fontWeight: 700 }}>Thao tác</td>
                {compareList.map((lab) => (
                  <td key={lab.id}>
                    <button
                      type="button"
                      className="btn btn-green btn-sm"
                      style={{ width: "100%" }}
                      onClick={() => {
                        onClose();
                        onStartMatchWithLab(lab);
                      }}
                    >
                      {t(lang, "actionMatch")} →
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
