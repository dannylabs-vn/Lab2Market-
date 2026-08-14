import React from "react";
import { t } from "../i18n";

export default function HowSection({ lang }) {
  const steps = [
    { num: "01", title: t(lang, "how1Title"), desc: t(lang, "how1Desc") },
    { num: "02", title: t(lang, "how2Title"), desc: t(lang, "how2Desc") },
    { num: "03", title: t(lang, "how3Title"), desc: t(lang, "how3Desc") },
    { num: "04", title: t(lang, "how4Title"), desc: t(lang, "how4Desc") },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag">{t(lang, "howTag")}</div>
          <h2>{t(lang, "howTitle")}</h2>
        </div>

        <div className="how-steps">
          {steps.map((s) => (
            <div key={s.num} className="step-card">
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
