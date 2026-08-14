---
description: "Lab2Market backend and logic invariants, layer boundaries, matching engine rules, and API contracts."
globs: ["backend/app/**/*.py", "frontend/src/**/*.js", "frontend/src/**/*.jsx"]
alwaysApply: true
---

# LAB2MARKET — PROJECT ARCHITECTURE RULES

This document defines the backend architecture, layer boundaries, and request lifecycle invariants.

---

## 1. THE ONE CONTRACT (Matching Engine Independence)
The **Matching Engine** owns every number; the LLM only extracts and explains.
*   **Engine Decides:** Every score, rank, hard-constraint verdict, and criterion breakdown shown to the user MUST be computed by deterministic code inside the matching engine — **NEVER by the LLM**.
*   **Purity Requirement:** `backend/app/services/matching_engine.py` must remain a **pure function**: input → output only. It must not depend on network calls, database queries, file systems, environment variables, clocks, or random number generators (RNG).
*   **Determinism:** Identical inputs must yield identical outputs.

---

## 2. PROJECT STACK & DIRECTORY SCHEMAS

### Backend (Python 3.12 + FastAPI + Pytest)
```
backend/app/
  main.py                  # API router registration & CORS only
  models.py                # Pydantic schemas (Shared API contract)
  sample_data.py           # Seed registries: PhD profiles (as-of dated)
  messages.py              # Server-side localized VI/EN error catalog
  prompts/
    extraction_prompts.py  # Gemini system prompts & TRL guidelines
  services/
    gemini_service.py      # Live Gemini API calls with deterministic mock fallback
    embeddings.py          # Gemini embedding client with TF-IDF fallback
    matching_engine.py     # Pure deterministic matching logic
    validation.py          # Data sanitization and verification logic
    explanation.py         # Rule-based strength/risk builder (no LLM)
    provenance.py          # Trust Layer metadata builder
  routers/
    extract.py             # Router for POST /api/extract
    match.py               # Router for POST /api/match
```

### Frontend (React 18 + Vite 5 + Vanilla CSS)
```
frontend/src/
  App.jsx                  # Main 3-step state machine (input -> extracted -> report)
  api.js                   # Single fetch layer (components never call fetch directly)
  i18n.js                  # Shared VI/EN dictionary containing ALL UI strings
  styles.css               # Clean styling system matching alibaba-vaya doctrine
  components/
    OnboardingForm.jsx         # natural language input with examples
    ExtractedChallengeCard.jsx # editable fields for AI-inferred data
    WeightSimulator.jsx        # MCDA weight sliders (0-100)
    MatchExplanationCard.jsx   # matching results with provenance badges
    ProvenanceBadge.jsx        # tiny chip showing data confidence class
```

---

## 3. PIPELINE & TRUST BOUNDARIES
All requests must process through these boundaries in sequential order (never bypass):

```
[Request Input] 
      ↓
API Router      → Rate limit (10 req/30s per IP) + Input Guard (SQL/Prompt Injection check)
      ↓
Validation      → Sanitizer (drop invalid enum values/numbers) → Pydantic models.py parsing
      ↓
Matching Engine → Verify hard constraints → Calculate semantic cosine similarity → MCDA weighted sum
      ↓
Explanation     → Rule-based strengths, risks, and recommended actions mapping
      ↓
[JSON Response]
```

*   **Extraction LLM Failure Matrix:** If the Gemini API is down or key is missing, fall back to the deterministic mock extraction parser and display the mock notice banner (`mockNotice`).
*   **Embeddings LLM Failure Matrix:** If the Gemini embedding service fails, fall back to the local TF-IDF cosine similarity search.
*   **Input Sanitization:** A new extraction must never overwrite fields already confirmed or modified by the user.

---

## 4. CODE QUALITY & VERIFICATION PROTOCOLS

### Hard Constraints
*   Functions must not exceed 60 lines of code. Split if larger.
*   No magic numbers. All engine coefficients, weights, and thresholds must live in constants at the top of the module.
*   Never catch exceptions silently. Always log and bubble up structured messages.

### Local Verification Commands
To ensure code compliance before committing:

1.  **Backend Pytest Suite:**
    ```powershell
    cd backend
    python -m pytest tests/ -q
    ```
    *Criterion: 13/13 tests must pass green with zero errors.*

2.  **Frontend Production Build:**
    ```powershell
    cd frontend
    npm run build
    ```
    *Criterion: Must build without warnings or compilation failures.*
