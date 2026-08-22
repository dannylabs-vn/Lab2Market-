import React from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left", // "left" | "center"
  className = "",
}) {
  return (
    <div className={`sec-header sec-header-${align} ${className}`}>
      {eyebrow && (
        <div className="sec-eyebrow">
          <span className="sec-eyebrow-dot" />
          <span>{eyebrow}</span>
        </div>
      )}
      {title && <h2 className="sec-title">{title}</h2>}
      {description && <p className="sec-desc">{description}</p>}
    </div>
  );
}
