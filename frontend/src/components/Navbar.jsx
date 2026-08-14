import React from "react";
import { t } from "../i18n";

export default function Navbar({ lang, setLang, activeView, setActiveView }) {
  const toggleLang = () => {
    setLang((prev) => (prev === "vi" ? "en" : "vi"));
  };

  return (
    <header className="site-header">
      <div className="wrap nav">
        <div className="brand" onClick={() => setActiveView("home")}>
          <div className="brand-icon">L2M</div>
          <span>Lab2Market</span>
        </div>

        <nav className="nav-links">
          <button
            type="button"
            className={activeView === "home" ? "active" : ""}
            onClick={() => setActiveView("home")}
          >
            {t(lang, "navHome")}
          </button>
          <button
            type="button"
            className={activeView === "match" ? "active" : ""}
            onClick={() => setActiveView("match")}
          >
            {t(lang, "navMatch")}
          </button>
          <button
            type="button"
            className={activeView === "directory" ? "active" : ""}
            onClick={() => setActiveView("directory")}
          >
            {t(lang, "navDirectory")}
          </button>
          <button
            type="button"
            className={activeView === "analysis" ? "active" : ""}
            onClick={() => setActiveView("analysis")}
          >
            {t(lang, "navAnalysis")}
          </button>
          <button
            type="button"
            className={activeView === "checklist" ? "active" : ""}
            onClick={() => setActiveView("checklist")}
          >
            {t(lang, "navChecklist")}
          </button>
        </nav>

        <div className="nav-right">
          <span className="nav-slogan">{t(lang, "trustSlogan")}</span>
          <div className="lang-toggle">
            <button
              type="button"
              className={lang === "vi" ? "active" : ""}
              onClick={() => setLang("vi")}
            >
              VI
            </button>
            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
          {activeView !== "match" && (
            <button
              type="button"
              className="btn btn-green btn-sm"
              onClick={() => setActiveView("match")}
            >
              {t(lang, "startMatching")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
