/**
 * FAQ — native <details>/<summary> pattern, copied from Vaya doctrine.
 * Uses .faq / .fa CSS classes from globals.css.
 */
import React from "react";
import { t } from "../i18n";

const FAQ_KEYS = [
  { q: "faq1Q", a: "faq1A" },
  { q: "faq2Q", a: "faq2A" },
  { q: "faq3Q", a: "faq3A" },
  { q: "faq4Q", a: "faq4A" },
];

export default function Faq({ lang }) {
  const items = FAQ_KEYS.map((k) => ({
    q: t(lang, k.q),
    a: t(lang, k.a),
  }));

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head center reveal">
          <div className="sec-tag">{t(lang, "faqTag")}</div>
          <h2>{t(lang, "faqTitle")}</h2>
        </div>

        <div className="faq reveal">
          {items.map((f, i) => (
            <details key={i}>
              <summary>
                {f.q}
                <i>+</i>
              </summary>
              <div className="fa">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

