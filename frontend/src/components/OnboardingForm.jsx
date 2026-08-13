// OnboardingForm — step 1: natural-language challenge input (rule §2).
// Local state only (Phase 2): it owns the textarea value and example chips,
// and reports the submitted text upward via `onSubmit`. It does NOT call the
// API itself — the parent (App) owns data flow and will wire the real
// extractChallenge call in Phase 3.

import { useState } from "react";
import { t } from "../i18n";

const EXAMPLE_KEYS = ["example1", "example2", "example3"];

export default function OnboardingForm({ lang, onSubmit, disabled = false }) {
  const [text, setText] = useState("");
  const trimmed = text.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmed || disabled) return; // guard: button is disabled anyway, but be safe
    onSubmit(trimmed);
  }

  return (
    <form className="onboarding" onSubmit={handleSubmit}>
      <h1>{t(lang, "step1Title")}</h1>
      <p className="onboarding__hint">{t(lang, "step1Hint")}</p>

      <textarea
        className="onboarding__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t(lang, "inputPlaceholder")}
        rows={6}
      />

      <div className="onboarding__examples">
        <span className="onboarding__examples-label">
          {t(lang, "exampleLabel")}
        </span>
        {EXAMPLE_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className="onboarding__chip"
            onClick={() => setText(t(lang, key))}
          >
            {t(lang, key)}
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="onboarding__submit"
        disabled={!trimmed || disabled}
      >
        {t(lang, "submitText")}
      </button>
    </form>
  );
}
