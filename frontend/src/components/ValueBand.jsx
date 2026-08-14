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
    <div className="value-band">
      <div className="wrap">
        <div className="value-grid">
          {values.map((v, i) => (
            <div key={i} className="value-item">
              <h4>{v.num}</h4>
              <p>{v.lab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
