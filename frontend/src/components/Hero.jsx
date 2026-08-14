import React, { useEffect, useRef, useState } from "react";
import { t, DICT } from "../i18n";

export default function Hero({ lang, onStartMatch }) {
  const [inputText, setInputText] = useState("");
  const [typedTitle, setTypedTitle] = useState("");
  const inputRef = useRef(null);

  // Typewriter effect on dynamic title suffix
  useEffect(() => {
    const table = DICT[lang] || DICT.vi;
    const phrases = table.hero_tw || [t(lang, "hero_t2")];
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = phrases[wi % phrases.length];
      setTypedTitle(current.slice(0, ci));

      if (!deleting) {
        ci++;
        if (ci > current.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
      } else {
        ci--;
        if (ci < 0) {
          deleting = false;
          wi++;
          ci = 0;
        }
      }
      timer = setTimeout(tick, deleting ? 40 : 75);
    };

    tick();
    return () => clearTimeout(timer);
  }, [lang]);

  const handleSend = () => {
    if (inputText.trim()) {
      onStartMatch(inputText.trim());
    }
  };

  const handleExample = (key) => {
    const text = t(lang, key);
    setInputText(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <div className="wrap hero-inner">
        <div className="eyebrow">
          <span className="dot" />
          <span>{t(lang, "policyBadge")}</span>
        </div>

        <h1>
          {t(lang, "hero_t1")}{" "}
          <span className="g-text">{typedTitle || t(lang, "hero_t2")}</span>
        </h1>

        <p className="sub">{t(lang, "hero_sub")}</p>

        {/* Launcher Box */}
        <div className="launcher">
          <textarea
            ref={inputRef}
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t(lang, "inputPlaceholder")}
          />
          <div className="lrow">
            <span className="launcher-tag">MCDA 100% Deterministic</span>
            <button
              type="button"
              className="send"
              onClick={handleSend}
              disabled={!inputText.trim()}
              title={t(lang, "submitText")}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="suggests">
          <span className="lbl">{t(lang, "exampleLabel")}</span>
          <button
            type="button"
            className="chip"
            onClick={() => handleExample("example1")}
          >
            AI Chatbot NLP (24m)
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => handleExample("example2")}
          >
            Robot Vision QC (12m)
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => handleExample("example3")}
          >
            Biomedical Diagnostics (18m)
          </button>
        </div>

        {/* Social / Framework Badge */}
        <div className="social">
          <span className="badge-policy">Đề án 89 &amp; 1.000 Tiến sĩ</span>
          <span>{t(lang, "socialProof")}</span>
        </div>
      </div>
    </section>
  );
}
