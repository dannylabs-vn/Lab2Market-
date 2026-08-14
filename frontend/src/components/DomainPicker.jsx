import React from "react";
import { t } from "../i18n";

const DOMAIN_CARDS = [
  {
    id: "artificial_intelligence",
    icon: "🤖",
    titleVi: "Trí tuệ Nhân tạo & NLP",
    titleEn: "Artificial Intelligence & NLP",
    descVi: "Xử lý ngôn ngữ tiếng Việt, mô hình ngôn ngữ lớn (LLM), Chatbot thông minh và trích xuất tri thức.",
    descEn: "Vietnamese NLP, Large Language Models (LLMs), conversational agents, and knowledge extraction.",
    labsCount: "12+ Labs",
    trlSpan: "TRL 3–8",
  },
  {
    id: "computer_vision",
    icon: "👁️",
    titleVi: "Thị giác Máy tính & Robot",
    titleEn: "Computer Vision & Robotics",
    descVi: "Kiểm tra chất lượng tự động (QC), nhận diện vật thể, cánh tay robot công nghiệp và thị giác nhúng.",
    descEn: "Automated QC visual inspection, object detection, industrial robotic arms, and embedded vision.",
    labsCount: "9+ Labs",
    trlSpan: "TRL 4–8",
  },
  {
    id: "biomedical",
    icon: "🧬",
    titleVi: "Y sinh & Công nghệ Dược",
    titleEn: "Biomedical & Diagnostics",
    descVi: "Kit xét nghiệm nhanh, thiết bị y tế IoT, hoạt chất sinh học và phân tích dữ liệu lâm sàng.",
    descEn: "Rapid diagnostics kits, IoT medical devices, bio-active compounds, and clinical data analytics.",
    labsCount: "8+ Labs",
    trlSpan: "TRL 2–7",
  },
  {
    id: "manufacturing",
    icon: "⚙️",
    titleVi: "Sản xuất Thông minh & Vật liệu",
    titleEn: "Smart Manufacturing & Materials",
    descVi: "Vật liệu nano, tối ưu hóa dây chuyền sản xuất, cảm biến công nghiệp và bảo trì dự đoán.",
    descEn: "Nanomaterials, production line optimization, industrial sensors, and predictive maintenance.",
    labsCount: "11+ Labs",
    trlSpan: "TRL 3–8",
  },
];

export default function DomainPicker({ lang, onSelectDomain }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag">{t(lang, "domainsTitle")}</div>
          <h2>{t(lang, "domainsSub")}</h2>
        </div>

        <div className="domains-grid">
          {DOMAIN_CARDS.map((d) => (
            <div
              key={d.id}
              className="domain-card"
              onClick={() => onSelectDomain(d.id)}
            >
              <div>
                <div className="domain-card__icon">{d.icon}</div>
                <h3>{lang === "vi" ? d.titleVi : d.titleEn}</h3>
                <p>{lang === "vi" ? d.descVi : d.descEn}</p>
              </div>
              <div className="domain-card__footer">
                <span>{d.labsCount} · {d.trlSpan}</span>
                <span>{t(lang, "viewDomainLabs")} →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
