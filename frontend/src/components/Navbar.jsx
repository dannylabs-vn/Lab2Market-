import React from "react";
import { t } from "../i18n";

export default function Navbar({ lang, setLang, activeView, setActiveView }) {
  return (
    <header>
      <div className="wrap nav">
        <div 
          className="brand" 
          style={{ cursor: "pointer" }} 
          onClick={() => setActiveView("home")}
        >
          <img src="/logo-white.png" alt="Lab2Market" style={{ height: "26px", objectFit: "contain" }} />
          <span style={{ marginLeft: "8px" }}>Lab2Market</span>
        </div>

        <div className="links">
          <a onClick={() => setActiveView("match")}>
            {lang === "vi" ? "Bài toán R&D" : "R&D Challenges"}
          </a>
          <a onClick={() => setActiveView("directory")}>
            {lang === "vi" ? "Công nghệ" : "Technologies"}
          </a>
          <a onClick={() => setActiveView("analysis")}>
            {lang === "vi" ? "Phân tích MCDA" : "Analysis"}
          </a>
          <a onClick={() => setActiveView("checklist")}>
            {lang === "vi" ? "Checklist Chuyển giao" : "Checklist"}
          </a>
        </div>

        <div className="right">
          <div className="lang">
            <button
              className={lang === "vi" ? "on" : ""}
              onClick={() => setLang("vi")}
            >
              VI
            </button>
            <button
              className={lang === "en" ? "on" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>

          {activeView !== "match" && (
            <button
              className="btn btn-green btn-sm"
              onClick={() => setActiveView("match")}
            >
              {t(lang, "startMatching")} →
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
