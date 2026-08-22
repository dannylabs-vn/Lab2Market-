import React from "react";
import { t } from "../i18n";

export default function ValueBand({ lang }) {
  const values = [
    { num: t(lang, "val1Num"), lab: t(lang, "val1Lab") },
    { num: t(lang, "val2Num"), lab: t(lang, "val2Lab") },
    { num: t(lang, "val3Num"), lab: t(lang, "val3Lab") },
    { num: t(lang, "val4Num"), lab: t(lang, "val4Lab") },
  ];

  return (
    <div className="py-12 md:py-20 mt-12" style={{ background: "linear-gradient(to right, var(--ink), #022c2a)" }}>
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <h4 style={{ fontFamily: "var(--font-disp)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: "#00DFFF", marginBottom: "8px" }}>
                {v.num}
              </h4>
              <p style={{ color: "#E2E8F0", fontSize: "16px", lineHeight: 1.6, maxWidth: "200px" }}>
                {v.lab}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
