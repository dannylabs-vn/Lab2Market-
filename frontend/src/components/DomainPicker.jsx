import React from "react";
import { t } from "../i18n";

const DOMAIN_CARDS = [
  {
    id: "artificial_intelligence",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 7.49-2 11-2 11s-2-3.51-2-11a2 2 0 0 1 2-2z"></path>
        <path d="M10 15v4a2 2 0 0 0 4 0v-4"></path>
        <path d="M8 9h8"></path>
      </svg>
    ),
    titleVi: "Trí tuệ Nhân tạo & NLP",
    titleEn: "Artificial Intelligence & NLP",
    descVi: "Xử lý ngôn ngữ tiếng Việt, mô hình ngôn ngữ lớn (LLM), Chatbot thông minh và trích xuất tri thức.",
    descEn: "Vietnamese NLP, Large Language Models (LLMs), conversational agents, and knowledge extraction.",
    labsCount: "12+ Labs",
    trlSpan: "TRL 3–8",
  },
  {
    id: "computer_vision",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    titleVi: "Thị giác Máy tính & Robot",
    titleEn: "Computer Vision & Robotics",
    descVi: "Kiểm tra chất lượng tự động (QC), nhận diện vật thể, cánh tay robot công nghiệp và thị giác nhúng.",
    descEn: "Automated QC visual inspection, object detection, industrial robotic arms, and embedded vision.",
    labsCount: "9+ Labs",
    trlSpan: "TRL 4–8",
  },
  {
    id: "biomedical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31"></path>
        <path d="M14 9.3V1.99"></path>
        <path d="M8.5 2h7"></path>
        <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
        <path d="M5.52 16h12.96"></path>
      </svg>
    ),
    titleVi: "Y sinh & Công nghệ Dược",
    titleEn: "Biomedical & Diagnostics",
    descVi: "Kit xét nghiệm nhanh, thiết bị y tế IoT, hoạt chất sinh học và phân tích dữ liệu lâm sàng.",
    descEn: "Rapid diagnostics kits, IoT medical devices, bio-active compounds, and clinical data analytics.",
    labsCount: "8+ Labs",
    trlSpan: "TRL 2–7",
  },
];

export default function DomainPicker({ lang, onSelectDomain }) {
  return (
    <section className="section" id="purposes">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag">{t(lang, "domainsTitle")}</div>
          <h2>{t(lang, "domainsSub")}</h2>
        </div>

        <div className="cards reveal">
          {DOMAIN_CARDS.map((d) => (
            <div
              key={d.id}
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => onSelectDomain(d.id)}
            >
              <div className="ico">{d.icon}</div>
              <h3>{lang === "vi" ? d.titleVi : d.titleEn}</h3>
              <p>{lang === "vi" ? d.descVi : d.descEn}</p>
              <div className="num-badge" style={{ marginTop: "14px" }}>
                {d.labsCount} · {d.trlSpan}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
