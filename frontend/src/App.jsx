// App — the 3-step state machine: input -> extracted -> report (rule §2/§9).
// Owns all shared state (lang, challenge, confirmed fields, weights, report,
// reference, error, loading). Components never call fetch directly — all
// network goes through api.js. Provenance transitions happen only through
// explicit user action recorded in confirmed_fields.

import { useEffect, useState } from "react";
import {
  fetchReference,
  extractChallenge,
  matchChallenge,
} from "./api";
import { t } from "./i18n";
import OnboardingForm from "./components/OnboardingForm";
import ExtractedChallengeCard from "./components/ExtractedChallengeCard";
import WeightSimulator from "./components/WeightSimulator";
import MatchExplanationCard from "./components/MatchExplanationCard";

// Slider values are 0–100; the engine normalizes to sum 1. Defaults are the
// raw (pre-normalization) values matching the paper-default profile scaled to
// sum 100 (semantic 35 / domain 25 / trl 15 / timeline 15 / involvement 10).
const DEFAULT_SLIDER = {
  semantic: 35,
  domain: 25,
  trl: 15,
  timeline: 15,
  involvement: 10,
};

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") || "vi";
    } catch {
      return "vi";
    }
  });
  const [step, setStep] = useState("input");
  const [reference, setReference] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [sliderValues, setSliderValues] = useState(DEFAULT_SLIDER);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null); // null | "analyzing" | "matching"
  // Whether the latest extraction used the deterministic mock (no API key).
  // Disclosed to the user so mock mode is never silent (rule §5).
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // localStorage may be unavailable (privacy mode) — ignore, non-fatal.
    }
  }, [lang]);

  useEffect(() => {
    fetchReference(lang)
      .then(setReference)
      .catch((e) => setError(e.message || String(e)));
  }, [lang]);

  function toggleLang() {
    setLang((prev) => (prev === "vi" ? "en" : "vi"));
  }

  async function handleExtract(text) {
    setLoading("analyzing");
    setError(null);
    try {
      const data = await extractChallenge(text, lang);
      setChallenge(data.challenge);
      setIsMock(Boolean(data.mock));
      setReport(null);
      setStep("extracted");
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(null);
    }
  }

  async function runMatch(nextChallenge, nextSliders) {
    setLoading("matching");
    setError(null);
    try {
      // Sliders are 0–100 for usability; the API contract is 0–1 weights.
      // Dividing by 100 preserves ratios; the engine normalizes to sum 1.
      const weights = {
        semantic: nextSliders.semantic / 100,
        domain: nextSliders.domain / 100,
        trl: nextSliders.trl / 100,
        timeline: nextSliders.timeline / 100,
        involvement: nextSliders.involvement / 100,
      };
      const data = await matchChallenge(nextChallenge, weights, lang);
      setReport(data);
      setStep("report");
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(null);
    }
  }

  function handleBackToEdit() {
    setStep("extracted");
  }

  function handleConfirm(nextChallenge) {
    setChallenge(nextChallenge);
    // Confirming (re)runs the match with current slider values.
    runMatch(nextChallenge, sliderValues);
  }

  function handleWeightsChange(nextSliders) {
    setSliderValues(nextSliders);
    if (challenge) {
      runMatch(challenge, nextSliders);
    }
  }

  function handleStartOver() {
    setChallenge(null);
    setSliderValues(DEFAULT_SLIDER);
    setReport(null);
    setError(null);
    setIsMock(false);
    setStep("input");
  }

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">{t(lang, "appTitle")}</h1>
          <p className="app__tagline">{t(lang, "tagline")}</p>
        </div>
        <div className="app__header-actions">
          <span className="app__slogan">{t(lang, "trustSlogan")}</span>
          <button type="button" className="app__lang" onClick={toggleLang}>
            {t(lang, "langToggle")}
          </button>
        </div>
      </header>

      {error && (
        <div className="app__error">
          <strong>{t(lang, "errorTitle")}</strong> {error}
          <button type="button" onClick={() => setError(null)}>
            {t(lang, "retry")}
          </button>
        </div>
      )}

      {loading && <p className="app__loading">{t(lang, loading)}</p>}

      <main className="app__main">
        {step === "input" && (
          <OnboardingForm lang={lang} onSubmit={handleExtract} disabled={!!loading} />
        )}

        {step === "extracted" && challenge && (
          <>
            {isMock && (
              <p className="app__mock-notice" role="status">
                {t(lang, "mockNotice")}
              </p>
            )}
            <ExtractedChallengeCard
              challenge={challenge}
              reference={reference}
              lang={lang}
              onConfirm={handleConfirm}
              disabled={!!loading}
            />
          </>
        )}

        {step === "report" && report && challenge && (
          <>
            <WeightSimulator
              weights={sliderValues}
              lang={lang}
              onWeightsChange={handleWeightsChange}
            />
            <MatchExplanationCard report={report} lang={lang} />
            <div className="app__footer-actions">
              <button
                type="button"
                className="app__back"
                onClick={handleBackToEdit}
              >
                {t(lang, "backToEdit")}
              </button>
              <button
                type="button"
                className="app__start-over"
                onClick={handleStartOver}
              >
                {t(lang, "startOver")}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
