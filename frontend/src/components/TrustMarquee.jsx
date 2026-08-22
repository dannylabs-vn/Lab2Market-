import React, { useEffect, useRef } from "react";
import { t } from "../i18n";

const PARTNERS = [
  { code: "VNU", name: "ĐHQG Hà Nội (VNU-HN)" },
  { code: "VNU-HCM", name: "ĐHQG TP.HCM (VNU-HCM)" },
  { code: "HUST", name: "ĐH Bách Khoa Hà Nội (HUST)" },
  { code: "HCMUT", name: "ĐH Bách Khoa TP.HCM (HCMUT)" },
  { code: "VAST", name: "Viện Hàn lâm KH&CN (VAST)" },
  { code: "NASATI", name: "Cục Thông tin KH&CN Quốc gia" },
  { code: "NAFOSTED", name: "Quỹ Phát triển KH&CN Quốc gia" },
  { code: "UD", name: "Đại học Đà Nẵng" },
  { code: "HCMUTE", name: "ĐH Sư phạm Kỹ thuật TP.HCM" },
];

export default function TrustMarquee({ lang }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    let rafId;
    let x = 0;

    const animate = () => {
      const halfWidth = el.scrollWidth / 2;
      x -= 0.5;
      if (halfWidth > 0 && -x >= halfWidth) {
        x += halfWidth;
      }
      el.style.transform = `translateX(${x.toFixed(1)}px)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="trust">
      <div className="lab">{t(lang, "trust")}</div>
      <div className="mq" id="mq" ref={marqueeRef}>
        {[...Array(10)].flatMap(() => PARTNERS).map((p, idx) => (
          <span key={`${p.code}-${idx}`}>
            {p.name}
          </span>
        ))}
      </div>
    </section>
  );
}
