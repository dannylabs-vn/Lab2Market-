/**
 * Manifesto — Vaya scroll-fill pattern.
 * Dark background section with .word elements that light up as they scroll into view.
 * CSS: .manifesto .big .word .word.on .word.hot
 */
import React, { useEffect, useRef } from "react";
import { t } from "../i18n";

const MANIFESTO_EN = [
  "Research", "is", "ready.", "But", "industry",
  "doesn't", "know", "where", "to", "look.",
  "Lab2Market", "bridges", "the", "gap",
  "with", "AI-powered", "matching",
  "that", "is", "transparent,", "weighted,",
  "and", "explainable."
];

const HOT_WORDS_EN = new Set(["Lab2Market", "AI-powered", "transparent,", "weighted,", "explainable."]);

const MANIFESTO_VI = [
  "Nghiên", "cứu", "đã", "sẵn sàng.", "Nhưng", "doanh", "nghiệp",
  "chưa", "biết", "tìm", "ở", "đâu.",
  "Lab2Market", "kết", "nối", "hai", "thế", "giới",
  "bằng", "AI", "minh", "bạch,",
  "có", "trọng", "số,", "có", "giải", "thích."
];

const HOT_WORDS_VI = new Set(["Lab2Market", "AI", "minh", "bạch,", "trọng", "số,", "giải", "thích."]);

export default function Manifesto({ lang }) {
  const ref = useRef(null);

  useEffect(() => {
    const words = ref.current?.querySelectorAll(".word");
    if (!words) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
          }
        }),
      { threshold: 0.5 }
    );
    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, [lang]);

  const isVi = lang === "vi";
  const words = isVi ? MANIFESTO_VI : MANIFESTO_EN;
  const hots = isVi ? HOT_WORDS_VI : HOT_WORDS_EN;

  return (
    <section className="section manifesto">
      <div className="wrap">
        <div className="sec-tag">
          {isVi ? "SỨ MỆNH" : "MISSION"}
        </div>
        <div className="big" ref={ref}>
          {words.map((w, i) => (
            <span
              key={i}
              className={"word" + (hots.has(w) ? " hot" : "")}
            >
              {w}{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

