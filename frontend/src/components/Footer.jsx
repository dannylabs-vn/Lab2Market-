import React from "react";
import { t } from "../i18n";

export default function Footer({ lang, setActiveView }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Col 1 */}
          <div>
            <div className="brand" style={{ color: "#fff", marginBottom: "14px" }}>
              <div className="brand-icon">L2M</div>
              <span>Lab2Market</span>
            </div>
            <p style={{ fontSize: "13.5px", color: "#a3b8b4", lineHeight: 1.6, maxWidth: "340px" }}>
              {t(lang, "footerDesc")}
            </p>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h5>{t(lang, "footerCol1")}</h5>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); setActiveView("home"); }}>
                  {t(lang, "navHome")}
                </a>
              </li>
              <li>
                <a href="#match" onClick={(e) => { e.preventDefault(); setActiveView("match"); }}>
                  {t(lang, "navMatch")}
                </a>
              </li>
              <li>
                <a href="#directory" onClick={(e) => { e.preventDefault(); setActiveView("directory"); }}>
                  {t(lang, "navDirectory")}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h5>{t(lang, "footerCol2")}</h5>
            <ul>
              <li>
                <a href="#analysis" onClick={(e) => { e.preventDefault(); setActiveView("analysis"); }}>
                  {t(lang, "navAnalysis")}
                </a>
              </li>
              <li>
                <a href="#checklist" onClick={(e) => { e.preventDefault(); setActiveView("checklist"); }}>
                  {t(lang, "navChecklist")}
                </a>
              </li>
              <li>MCDA Engine v1.0</li>
              <li>Trust Layer (5 Tiers)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <h5>{t(lang, "footerCol3")}</h5>
            <ul>
              <li>Nghị quyết 57-NQ/TW</li>
              <li>Nghị quyết 71/NQ-CP</li>
              <li>Đề án 1.000 Tiến sĩ</li>
              <li>AI Riser Vietnam 2026</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t(lang, "footerCopy")}</span>
          <span>Open Source AI Decision Support System</span>
        </div>
      </div>
    </footer>
  );
}
