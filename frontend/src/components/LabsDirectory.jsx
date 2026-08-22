import React, { useState } from "react";
import { t } from "../i18n";
import { SEED_LABS } from "./LabsDirectoryData"; // I'll extract data to a separate file to keep it clean

export default function LabsDirectory({
  lang,
  onStartMatchWithLab,
  compareList = [],
  onToggleCompare,
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", labelVi: "Tất cả lĩnh vực", labelEn: "All Domains" },
    { id: "artificial_intelligence", labelVi: "Trí tuệ nhân tạo", labelEn: "AI & NLP" },
    { id: "manufacturing", labelVi: "Sản xuất & Vật liệu", labelEn: "Manufacturing" },
    { id: "biomedical", labelVi: "Y sinh & Y tế", labelEn: "Biomedical" },
  ];

  const filteredLabs = SEED_LABS.filter((lab) => {
    const matchesCategory =
      selectedCategory === "all" || lab.domainCategory === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      lab.name.toLowerCase().includes(query) ||
      lab.labName.toLowerCase().includes(query) ||
      lab.institution.toLowerCase().includes(query) ||
      lab.domainLabelVi.toLowerCase().includes(query) ||
      lab.domainLabelEn.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section" id="markets" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag">{t(lang, "dirTitle")}</div>
          <h2>{t(lang, "dirSub")}</h2>
        </div>

        <div className="mkt-grid reveal">
          <div className="chart-card hide-sm">
            <h4>{lang === "vi" ? "Tổng chuyên gia R&D" : "Total R&D Experts"}</h4>
            <p className="csub">{lang === "vi" ? "Đã sẵn sàng chuyển giao" : "Ready for commercialization"}</p>
            <div className="big-num">
              24<span className="delta">↑ +6</span>
            </div>
            
            <div style={{ marginTop: "26px", display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
              <div style={{ background: "var(--surface2)", flex: 1, height: "40%", borderRadius: "2px 2px 0 0" }} />
              <div style={{ background: "var(--surface2)", flex: 1, height: "60%", borderRadius: "2px 2px 0 0" }} />
              <div style={{ background: "var(--surface2)", flex: 1, height: "30%", borderRadius: "2px 2px 0 0" }} />
              <div style={{ background: "var(--surface2)", flex: 1, height: "80%", borderRadius: "2px 2px 0 0" }} />
              <div style={{ background: "var(--surface2)", flex: 1, height: "50%", borderRadius: "2px 2px 0 0" }} />
              <div style={{ background: "var(--green)", flex: 1, height: "100%", borderRadius: "2px 2px 0 0" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--muted)", marginTop: "8px", fontWeight: 600 }}>
              <span>T1</span>
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span style={{ color: "var(--green-text)" }}>T6</span>
            </div>
          </div>

          <div className="table-card">
            <div className="filters">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={selectedCategory === cat.id ? "on" : ""}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {lang === "vi" ? cat.labelVi : cat.labelEn}
                </button>
              ))}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>{t(lang, "colLab")}</th>
                    <th>{t(lang, "colDomain")}</th>
                    <th>{t(lang, "colTRL")}</th>
                    <th>{t(lang, "colOutputs")}</th>
                    <th>{t(lang, "colTrend")}</th>
                    <th style={{ textAlign: "right" }}>{t(lang, "colAction")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLabs.map((lab) => {
                    const isCompared = compareList.some((c) => c.id === lab.id);

                    return (
                      <tr key={lab.id}>
                        <td>
                          <div className="bk">
                            <div className="lg" style={{ background: "var(--surface2)", color: "var(--ink)", fontWeight: 700 }}>
                              {lab.name.split(" ").pop()?.charAt(0) || "L"}
                            </div>
                            <div>
                              <div className="nm">{lab.name}</div>
                              <div className="pd">{lab.institution}</div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="pill">
                            {lang === "vi" ? lab.domainLabelVi : lab.domainLabelEn}
                          </span>
                        </td>

                        <td>
                          <span className="pill" style={{ background: "var(--green-soft)", color: "var(--green-text)" }}>
                            TRL {lab.trlMin}–{lab.trlMax} ({lab.typicalMonths}m)
                          </span>
                        </td>

                        <td>
                          <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                            {lab.papersCount}
                          </span>{" "}
                          <span style={{ color: "var(--muted)", fontSize: "12px" }}>
                            papers
                          </span>
                        </td>

                        <td>
                          <svg className="spark" viewBox="0 0 100 30" fill="none">
                            <path
                              d={lab.sparkline}
                              stroke="var(--green-cta)"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </td>

                        <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                          <button
                            type="button"
                            className="ask"
                            onClick={() => onStartMatchWithLab(lab)}
                          >
                            {t(lang, "actionMatch")}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
