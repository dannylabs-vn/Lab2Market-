import React, { useState } from "react";
import { t } from "../i18n";

export const SEED_LABS = [
  {
    id: "phd-nlp-01",
    name: "Dr. Nguyễn Văn An",
    labName: "Phòng Thí nghiệm Xử lý Ngôn ngữ Tự nhiên & LLMs",
    institution: "Đại học Quốc gia Hà Nội (VNU-HN)",
    domainKey: "natural_language_processing",
    domainCategory: "artificial_intelligence",
    domainLabelVi: "Xử lý Ngôn ngữ Tự nhiên (NLP)",
    domainLabelEn: "Natural Language Processing (NLP)",
    trlMin: 3,
    trlMax: 8,
    typicalMonths: 24,
    involvementTypes: ["industrial_phd", "co_supervision", "consulting"],
    papersCount: 14,
    patentsCount: 2,
    matchScoreEstimate: 94,
    sparkline: "M0,20 Q20,15 40,8 T80,4 T90,2",
  },
  {
    id: "phd-cv-02",
    name: "Dr. Trần Thị Mai",
    labName: "Viện Thị giác Máy tính & Robot Tự hành",
    institution: "Đại học Bách Khoa TP.HCM (HCMUT)",
    domainKey: "computer_vision",
    domainCategory: "artificial_intelligence",
    domainLabelVi: "Thị giác Máy tính & Robot",
    domainLabelEn: "Computer Vision & Robotics",
    trlMin: 4,
    trlMax: 8,
    typicalMonths: 18,
    involvementTypes: ["industrial_phd", "consulting"],
    papersCount: 9,
    patentsCount: 3,
    matchScoreEstimate: 89,
    sparkline: "M0,22 Q25,18 45,10 T75,8 T90,3",
  },
  {
    id: "phd-mfg-04",
    name: "Dr. Phạm Đức Duy",
    labName: "Trung tâm Nghiên cứu Cơ điện tử & Tự động hóa",
    institution: "Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE)",
    domainKey: "manufacturing",
    domainCategory: "manufacturing",
    domainLabelVi: "Sản xuất Thông minh & Tự động hóa",
    domainLabelEn: "Smart Manufacturing & Automation",
    trlMin: 4,
    trlMax: 8,
    typicalMonths: 24,
    involvementTypes: ["industrial_phd", "research_partnership"],
    papersCount: 11,
    patentsCount: 1,
    matchScoreEstimate: 82,
    sparkline: "M0,24 Q30,19 50,14 T80,6 T90,5",
  },
  {
    id: "phd-bio-03",
    name: "Dr. Lê Thị Cẩm",
    labName: "Phòng Thí nghiệm Sinh học Phân tử & Chẩn đoán Y sinh",
    institution: "Đại học Y Hà Nội (HMU)",
    domainKey: "biomedical",
    domainCategory: "biomedical",
    domainLabelVi: "Y sinh & Thiết bị Y tế",
    domainLabelEn: "Biomedical & Medical Devices",
    trlMin: 2,
    trlMax: 6,
    typicalMonths: 36,
    involvementTypes: ["research_partnership", "co_supervision"],
    papersCount: 21,
    patentsCount: 4,
    matchScoreEstimate: 78,
    sparkline: "M0,26 Q25,22 45,18 T70,12 T90,8",
  },
  {
    id: "phd-mat-05",
    name: "PGS.TS. Hoàng Quốc Bảo",
    labName: "Viện Khoa học Vật liệu Tiên tiến & Nanotech",
    institution: "Viện Hàn lâm KH&CN Việt Nam (VAST)",
    domainKey: "materials",
    domainCategory: "manufacturing",
    domainLabelVi: "Vật liệu Nano & Polyme",
    domainLabelEn: "Nanomaterials & Polymer",
    trlMin: 3,
    trlMax: 7,
    typicalMonths: 30,
    involvementTypes: ["industrial_phd", "research_partnership"],
    papersCount: 26,
    patentsCount: 5,
    matchScoreEstimate: 85,
    sparkline: "M0,22 Q30,16 55,10 T80,5 T90,3",
  },
  {
    id: "phd-ds-06",
    name: "Dr. Vũ Đình Toàn",
    labName: "Phòng Nghiên cứu Khoa học Dữ liệu & Tối ưu hóa",
    institution: "Đại học Bách Khoa Hà Nội (HUST)",
    domainKey: "data_science",
    domainCategory: "artificial_intelligence",
    domainLabelVi: "Khoa học Dữ liệu & AI",
    domainLabelEn: "Data Science & AI",
    trlMin: 3,
    trlMax: 8,
    typicalMonths: 20,
    involvementTypes: ["industrial_phd", "consulting", "co_supervision"],
    papersCount: 16,
    patentsCount: 2,
    matchScoreEstimate: 91,
    sparkline: "M0,25 Q20,15 45,8 T75,4 T90,2",
  },
];

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
    <section className="section" id="directory">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag">{t(lang, "dirTitle")}</div>
          <h2>{t(lang, "dirSub")}</h2>
        </div>

        <div className="table-card">
          {/* Category Tabs */}
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

          {/* Search Box */}
          <div className="table-search">
            <input
              type="text"
              placeholder={t(lang, "searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Labs Table */}
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
                          <div className="lg">
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
                        <span className="pill pill-green">
                          TRL {lab.trlMin}–{lab.trlMax} ({lab.typicalMonths}m)
                        </span>
                      </td>

                      <td>
                        <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                          {lab.papersCount}
                        </span>{" "}
                        <span style={{ color: "var(--muted)", fontSize: "12px" }}>
                          papers
                        </span>{" "}
                        ·{" "}
                        <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                          {lab.patentsCount}
                        </span>{" "}
                        <span style={{ color: "var(--muted)", fontSize: "12px" }}>
                          patents
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
                          className={`btn btn-sm ${isCompared ? "btn-dark" : "btn-ghost"}`}
                          style={{ marginRight: "6px" }}
                          onClick={() => onToggleCompare(lab)}
                        >
                          {isCompared ? t(lang, "inCompare") : t(lang, "actionCompare")}
                        </button>
                        <button
                          type="button"
                          className="btn btn-green btn-sm"
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
    </section>
  );
}
