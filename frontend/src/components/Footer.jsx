import React from "react";
import { t } from "../i18n";

export default function Footer({ lang, setActiveView }) {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <div className="f-brand">
            <img src="/logo-white.png" alt="Lab2Market" style={{ height: "32px", marginBottom: "14px", objectFit: "contain" }} />
            <div style={{ fontFamily: "var(--font-disp)", fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Lab2Market</div>
            <p style={{ color: "var(--muted-2)", fontSize: "14px", lineHeight: "1.6", maxWidth: "340px" }}>
              {lang === "vi"
                ? "Nền tảng thương mại hóa nghiên cứu sâu AI-Powered. Nối liền khoảng cách từ Phòng thí nghiệm đến Thị trường."
                : "AI-Powered Deep-Tech Commercialization Platform. Bridging the gap from Research Lab to Market."}
            </p>
          </div>

          <div className="f-links">
            <div className="f-col">
              <h5>{lang === "vi" ? "Sản phẩm" : "Product"}</h5>
              <a onClick={() => setActiveView("match")}>{lang === "vi" ? "Bài toán R&D" : "R&D Challenges"}</a>
              <a onClick={() => setActiveView("directory")}>{lang === "vi" ? "Danh mục Lab" : "Labs Directory"}</a>
              <a onClick={() => setActiveView("analysis")}>{lang === "vi" ? "Ma trận TRL" : "TRL Matrix"}</a>
              <a onClick={() => setActiveView("checklist")}>{lang === "vi" ? "Checklist Chuyển giao" : "Transfer Checklist"}</a>
            </div>

            <div className="f-col">
              <h5>{lang === "vi" ? "Phương pháp" : "Methodology"}</h5>
              <a href="#">MCDA Multi-Criteria</a>
              <a href="#">TRL Assessment</a>
              <a href="#">Trust Layer Badges</a>
              <a href="#">Deterministic Engine</a>
            </div>

            <div className="f-col">
              <h5>{lang === "vi" ? "Hợp tác & Đề án" : "Initiatives"}</h5>
              <a href="#">Đề án 89 - 1.000 Tiến sĩ</a>
              <a href="#">Đại học Quốc gia</a>
              <a href="#">Trung tâm Đổi mới Sáng tạo</a>
              <a href="#">Tech Transfer Offices</a>
            </div>
          </div>
        </div>

        <div className="f-bottom">
          <span>© 2026 Lab2Market. All rights reserved.</span>
          <div className="f-legals">
            <a href="#">{lang === "vi" ? "Bảo mật" : "Privacy"}</a>
            <a href="#">{lang === "vi" ? "Điều khoản" : "Terms"}</a>
            <a href="#">{lang === "vi" ? "Liên hệ" : "Contact"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
