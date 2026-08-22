import React, { useEffect, useRef, useState } from "react";
import { t } from "../i18n";
import AIAssistantMascot from "./AIAssistantMascot";

export default function Hero({ lang, onStartMatch }) {
  const inputRef = useRef(null);
  const [typed, setTyped] = useState("");

  const send = () => {
    const text = inputRef.current?.value || "";
    if (text.trim()) {
      onStartMatch(text.trim());
    }
  };

  const suggestKeys = ["example1", "example2", "example3"];

  // Placeholder typewriter effect (adapted from Vaya)
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const phrases = [
      lang === "vi" ? "Chúng tôi cần tìm chuyên gia xử lý ngôn ngữ tự nhiên..." : "We need an NLP expert to optimize our LLM...",
      lang === "vi" ? "Tìm đối tác phát triển cảm biến sinh học TRL 5..." : "Looking for biosensor development partner at TRL 5...",
      lang === "vi" ? "Hợp tác R&D về vật liệu siêu dẫn trong 18 tháng..." : "R&D collaboration on superconducting materials for 18 months...",
    ];
    let pi = 0, pc = 0, del = false, paused = false;
    let timer;
    const onFocus = () => { paused = true; el.setAttribute("placeholder", ""); };
    const onBlur = () => { if (!el.value) paused = false; };
    const onInput = () => { paused = !!el.value; };
    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);
    el.addEventListener("input", onInput);
    
    const tick = () => {
      if (paused) {
        timer = setTimeout(tick, 400);
        return;
      }
      const w = phrases[pi % phrases.length];
      el.setAttribute("placeholder", w.slice(0, pc) + "▋");
      if (!del) {
        pc++;
        if (pc > w.length) { del = true; timer = setTimeout(tick, 1600); return; }
      } else {
        pc--;
        if (pc < 0) { del = false; pi++; pc = 0; }
      }
      timer = setTimeout(tick, del ? 34 : 64);
    };
    tick();
    return () => {
      clearTimeout(timer);
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("blur", onBlur);
      el.removeEventListener("input", onInput);
    };
  }, [lang]);

  // Title typewriter effect
  useEffect(() => {
    const phrases = [
      lang === "vi" ? "ứng dụng y tế." : "healthcare applications.",
      lang === "vi" ? "sản xuất thông minh." : "smart manufacturing.",
      lang === "vi" ? "năng lượng tái tạo." : "renewable energy.",
    ];
    let wi = 0, ci = 0, del = false;
    let timer;
    const tick = () => {
      const w = phrases[wi % phrases.length];
      setTyped(w.slice(0, ci));
      if (!del) {
        ci++;
        if (ci > w.length) { del = true; timer = setTimeout(tick, 1600); return; }
      } else {
        ci--;
        if (ci < 0) { del = false; wi++; ci = 0; }
      }
      timer = setTimeout(tick, del ? 45 : 82);
    };
    tick();
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <div className="hero-mascot" style={{ zIndex: 2, pointerEvents: "none" }}>
        <img src="/mascot/lab2market-mascot.png" alt="Lab2Market AI Mascot" style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scale(1.2)" }} />
      </div>

      <div className="wrap hero-inner">
        <span className="eyebrow">
          <span className="dot" /> <span>{lang === "vi" ? "AI R&D MATCHING" : "AI R&D MATCHING"}</span>
        </span>
        
        <h1>
          <span className="hl-1">{lang === "vi" ? "Tìm kiếm công nghệ " : "Find technology for "}</span>
          <br className="hide-sm" />
          <span className="hl-2">
            <span className="g-text type-tw">{typed}</span>
            <span className="tw-caret" />
          </span>
        </h1>
        
        <p className="sub">{t(lang, "hero_sub")}</p>

        <div className="launcher">
          <textarea
            ref={inputRef}
            id="heroInput"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="lrow">
            <div style={{ fontSize: "12.5px", color: "var(--muted)", fontWeight: 600, paddingLeft: "8px" }}>
              {lang === "vi" ? "Phân tích 100% minh bạch & MCDA" : "100% transparent MCDA analysis"}
            </div>
            <button className="send" aria-label="Ask" type="button" onClick={send}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="suggests">
          <span className="lbl">{lang === "vi" ? "Bài toán mẫu:" : "Try examples:"}</span>
          {suggestKeys.map((k) => (
            <button
              key={k}
              className="chip"
              type="button"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = t(lang, k);
                  inputRef.current.focus();
                }
              }}
            >
              {k === "example1" ? (lang === "vi" ? "LLM tiếng Việt" : "Vietnamese LLM") : 
               k === "example2" ? (lang === "vi" ? "Kiểm định QC bằng AI" : "AI Vision QC") : 
               (lang === "vi" ? "Chẩn đoán sinh học" : "Biomedical Diagnostics")}
            </button>
          ))}
        </div>

        <div className="social">
          <div className="avs">
            <span>R</span>
            <span>T</span>
            <span>+</span>
          </div>
          <span className="stars">★★★★★</span>
          <span>{lang === "vi" ? "Hỗ trợ 50+ dự án R&D" : "Trusted by 50+ R&D projects"}</span>
        </div>
      </div>
    </section>
  );
}
