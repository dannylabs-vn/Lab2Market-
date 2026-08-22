import React, { useEffect, useRef, useState } from "react";
import { fetchReference, extractChallenge, matchChallenge } from "./api";
import { clientRerank } from "./mcda";
import { t } from "./i18n";

// Navigation & Landing Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustMarquee from "./components/TrustMarquee";
import DomainPicker from "./components/DomainPicker";
import LabsDirectory from "./components/LabsDirectory";
import WhySection from "./components/WhySection";
import HowSection from "./components/HowSection";
import Manifesto from "./components/Manifesto";
import ValueBand from "./components/ValueBand";
import TRLAnalysis from "./components/TRLAnalysis";
import PartnershipChecklist from "./components/PartnershipChecklist";
import CompareBar from "./components/CompareBar";
import CompareModal from "./components/CompareModal";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

// Match Flow Components
import OnboardingForm from "./components/OnboardingForm";
import ExtractedChallengeCard from "./components/ExtractedChallengeCard";
import WeightSimulator from "./components/WeightSimulator";
import MatchExplanationCard from "./components/MatchExplanationCard";
import AIAssistantMascot from "./components/AIAssistantMascot";

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

  const [activeView, setActiveView] = useState("home"); // home | match | directory | analysis | checklist
  const [step, setStep] = useState("input"); // input | extracted | report
  const [reference, setReference] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [sliderValues, setSliderValues] = useState(DEFAULT_SLIDER);
  const [report, setReport] = useState(null);
  const [displayReport, setDisplayReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null); // null | "analyzing" | "matching"
  const [isMock, setIsMock] = useState(false);

  // Comparison tray state
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    fetchReference(lang)
      .then(setReference)
      .catch((e) => setError(e.message || String(e)));
  }, [lang]);

  // Reveal-on-scroll IntersectionObserver
  useEffect(() => {
    if (activeView !== "home") return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    }, 100);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [activeView]);

  async function handleExtract(text) {
    setLoading("analyzing");
    setError(null);
    try {
      const data = await extractChallenge(text, lang);
      setChallenge(data.challenge);
      setIsMock(Boolean(data.mock));
      setReport(null);
      setStep("extracted");
      setActiveView("match");
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      const weights = {
        semantic: nextSliders.semantic / 100,
        domain: nextSliders.domain / 100,
        trl: nextSliders.trl / 100,
        timeline: nextSliders.timeline / 100,
        involvement: nextSliders.involvement / 100,
      };
      const data = await matchChallenge(nextChallenge, weights, lang);
      setReport(data);
      setDisplayReport({ ...data, ranked: clientRerank(data.ranked, nextSliders) });
      setStep("report");
      setActiveView("match");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(null);
    }
  }

  function handleConfirm(nextChallenge) {
    setChallenge(nextChallenge);
    runMatch(nextChallenge, sliderValues);
  }

  function handleWeightsChange(nextSliders) {
    setSliderValues(nextSliders);
    if (report) {
      setDisplayReport((prev) => ({
        ...(prev || report),
        ranked: clientRerank(report.ranked, nextSliders),
      }));
    }
  }

  function handleStartOver() {
    setChallenge(null);
    setSliderValues(DEFAULT_SLIDER);
    setReport(null);
    setDisplayReport(null);
    setError(null);
    setIsMock(false);
    setStep("input");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectDomainFromPicker() {
    setActiveView("directory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleStartMatchWithLab(lab) {
    const defaultText = `Chúng tôi cần hợp tác R&D trong lĩnh vực ${lab.domainLabelVi}, giải quyết bài toán nghiên cứu nâng cao TRL từ ${lab.trlMin} lên ${lab.trlMax} trong ${lab.typicalMonths} tháng.`;
    handleExtract(defaultText);
  }

  function toggleCompare(lab) {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === lab.id);
      if (exists) {
        return prev.filter((item) => item.id !== lab.id);
      }
      if (prev.length >= 3) {
        alert(lang === "vi" ? "Chỉ có thể so sánh tối đa 3 đối tác cùng lúc." : "You can compare up to 3 partners at a time.");
        return prev;
      }
      return [...prev, lab];
    });
  }

  function handleRemoveCompareItem(id) {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Universal Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Global Error Banner */}
      {error && (
        <div className="wrap" style={{ marginTop: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", background: "var(--red-soft)", borderLeft: "4px solid var(--red)", color: "#b91c1c", fontSize: "14px", borderRadius: "var(--radius-sm)" }}>
            <strong>{t(lang, "errorTitle")}:</strong> {error}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ marginLeft: "auto", color: "#b91c1c", borderColor: "#fca5a5" }}
              onClick={() => setError(null)}
            >
              {t(lang, "retry")}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area - wrapped in page-above to fix footer overlap */}
      <div className="page-above">
        {/* View: Home */}
        {activeView === "home" && (
          <main id="homeView">
            <Hero
              lang={lang}
              onStartMatch={handleExtract}
            />

            <TrustMarquee lang={lang} />

            <DomainPicker
              lang={lang}
              onSelectDomain={handleSelectDomainFromPicker}
            />

            <LabsDirectory
              lang={lang}
              onStartMatchWithLab={handleStartMatchWithLab}
              compareList={compareList}
              onToggleCompare={toggleCompare}
            />

            <WhySection lang={lang} />
            <HowSection lang={lang} />
            <Manifesto lang={lang} />
            <ValueBand lang={lang} />
            <Testimonials lang={lang} />
            <Faq lang={lang} />
            <CTA lang={lang} onStartMatch={() => setActiveView("match")} />
          </main>
        )}

      {/* View: Match / Decision Studio */}
      {activeView === "match" && (
        <main style={{ flex: 1 }} className="match-view">
          <div className="wrap match-container">
            {/* Stepper Header */}
            <div className="stepper">
              <div className={`stepper-step ${step === "input" ? "active" : ""}`}>
                <div className="stepper-num">1</div>
                <span>{lang === "vi" ? "Mô tả bài toán" : "Describe Problem"}</span>
              </div>
              <span style={{ color: "var(--line-2)" }}>→</span>
              <div className={`stepper-step ${step === "extracted" ? "active" : ""}`}>
                <div className="stepper-num">2</div>
                <span>{lang === "vi" ? "Kiểm tra suy luận" : "Verify Inferences"}</span>
              </div>
              <span style={{ color: "var(--line-2)" }}>→</span>
              <div className={`stepper-step ${step === "report" ? "active" : ""}`}>
                <div className="stepper-num">3</div>
                <span>{lang === "vi" ? "Báo cáo MCDA" : "Decision Report"}</span>
              </div>
            </div>

            {loading && (
              <div style={{ display: "grid", placeItems: "center", padding: "40px 0" }}>
                <AIAssistantMascot
                  state={loading === "analyzing" ? "researching" : "matching"}
                  lang={lang}
                  message={
                    loading === "analyzing"
                      ? (lang === "vi" ? "Đang phân tích và trích xuất TRL bài toán..." : "Extracting TRL & domain details...")
                      : (lang === "vi" ? "Đang chạy thuật toán MCDA khớp nối đối tác..." : "Running MCDA partner matching matrix...")
                  }
                />
              </div>
            )}

            {step === "input" && !loading && (
              <OnboardingForm
                lang={lang}
                onSubmit={handleExtract}
                disabled={!!loading}
              />
            )}

            {step === "extracted" && challenge && !loading && (
              <>
                {isMock && (
                  <div style={{ padding: "12px 16px", background: "var(--amber-soft)", borderLeft: "4px solid var(--amber)", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "14px", color: "#92400e" }}>
                    ℹ️ {t(lang, "mockNotice")}
                  </div>
                )}
                <ExtractedChallengeCard
                  challenge={challenge}
                  reference={reference}
                  lang={lang}
                  onConfirm={handleConfirm}
                  onBack={() => setStep("input")}
                  disabled={!!loading}
                />
              </>
            )}

            {step === "report" && report && challenge && !loading && (
              <>
                <WeightSimulator
                  weights={sliderValues}
                  lang={lang}
                  onWeightsChange={handleWeightsChange}
                />
                <MatchExplanationCard report={displayReport || report} lang={lang} />
                <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setStep("extracted")}
                  >
                    ← {t(lang, "backToEdit")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleStartOver}
                  >
                    {t(lang, "startOver")}
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      )}

      {/* View: Directory */}
      {activeView === "directory" && (
        <main style={{ flex: 1 }}>
          <LabsDirectory
            lang={lang}
            onStartMatchWithLab={handleStartMatchWithLab}
            compareList={compareList}
            onToggleCompare={toggleCompare}
          />
        </main>
      )}

      {/* View: TRL Feasibility Matrix */}
      {activeView === "analysis" && (
        <main style={{ flex: 1 }}>
          <TRLAnalysis
            lang={lang}
            onNavigateToMatch={() => setActiveView("match")}
          />
        </main>
      )}

        {/* View: Partnership Checklist */}
        {activeView === "checklist" && (
          <main style={{ flex: 1 }}>
            <PartnershipChecklist lang={lang} />
          </main>
        )}
      </div> {/* End page-above */}

      {/* Universal Compare Bar */}
      <CompareBar
        lang={lang}
        compareList={compareList}
        onRemoveItem={handleRemoveCompareItem}
        onClearAll={() => setCompareList([])}
        onOpenModal={() => setIsCompareModalOpen(true)}
      />

      {/* Universal Compare Modal */}
      <CompareModal
        lang={lang}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareList={compareList}
        onStartMatchWithLab={handleStartMatchWithLab}
      />

      {/* Universal Footer */}
      <Footer lang={lang} setActiveView={setActiveView} />
    </div>
  );
}
