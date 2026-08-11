# Lab2Market — Working Context / Handoff

> Status document for the build session. Read this first when resuming work.
> Governing architecture rules: `.qoder/rules/Lab2Market-Architecture.md` (restored, active).
> Product blueprint: the "Lab2Market — Master Audit & Optimization Prompt" (AI Riser Vietnam 2026, target Top 10).

**One-line product:** Lab2Market turns a plain-language business R&D problem into an explainable, ranked shortlist of PhD research partners — a deterministic matching engine owns every number; Gemini only extracts input.

**The One Contract (never violate):** the matching engine is 100% pure/deterministic/offline. The LLM never calculates, scores, ranks, or decides — it only extracts (and optionally narrates).

---

## 1. WHERE WE ARE RIGHT NOW

**Backend: COMPLETE and verified — 6/6 pytest green.** Frontend: scaffold done, components in progress.

### Done — backend (`backend/`, FastAPI, runs with NO API key in mock mode)

| File                                                            | Status | Notes                                                                                                                  |
| --------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `app/models.py`                                                 | ✅     | Pydantic contract; expertise-first default weights (0.35/0.25/0.15/0.15/0.10)                                          |
| `app/sample_data.py`                                            | ✅     | 4 seed PhD profiles (AI-NLP, AI-CV, biomedical, manufacturing) + domain taxonomy; as-of dated 2026-08                  |
| `app/prompts/extraction_prompts.py`                             | ✅     | Extraction system prompt + TRL_GUIDE (1–9) + EXTRACTION_SCHEMA                                                         |
| `app/services/matching_engine.py`                               | ✅     | PURE: hard constraints (TRL window, timeline ratio ≤1.5) → 5-criterion scores → weighted MCDA → ranked report          |
| `app/services/explanation.py`                                   | ✅     | Rule-based strengths/risks/recommended_action — i18n keys + params, no prose                                           |
| `app/services/gemini_service.py`                                | ✅     | Real Gemini (lazy import) + deterministic mock fallback (VI/EN keyword heuristics)                                     |
| `app/services/embeddings.py`                                    | ✅     | Gemini embeddings + TF-IDF fallback with sqrt scaling                                                                  |
| `app/services/validation.py`                                    | ✅     | Sanitizer (drop-not-repair; drops `trl_target` if ≤ current) + required-field check                                    |
| `app/services/provenance.py`                                    | ✅     | Trust Layer: 5 classes (VERIFIED_CALCULATION / CITED_SOURCE / USER_PROVIDED_DATA / AI_INFERENCE / USER_CONFIRMED_DATA) |
| `app/services/security.py`                                      | ✅     | Rate limit (10 req/30s per IP), sanitize, injection guard                                                              |
| `app/messages.py`                                               | ✅     | Server-side VI/EN error catalog                                                                                        |
| `app/routers/extract.py`, `match.py`, `reference.py`, `main.py` | ✅     | Guards → validation → engine → provenance. CORS env-driven. `/api/health` for Cloud Run                                |
| `backend/tests/test_api.py`                                     | ✅ 6/6 | VI extraction, ranking+breakdown+provenance, weight-change reorder, missing-fields 400, injection 400, determinism     |

**Verified ranking** (VI NLP challenge, default weights): NLP lab 0.631 → CV lab 0.578 → MFG 0.442 → BIO 0.291. Weight sliders genuinely reorder (tested).

**Calibration decisions already made** (don't re-derive): domain scoring EXACT 1.0 / GROUP 0.9 / ADJACENT 0.5 / OTHER 0.1; TF-IDF sqrt scaling (short-text cosines compress into [0, ~0.3]); expertise-first default weights so a wrong-domain lab can't outrank the right expertise.

### Done — frontend scaffold (`frontend/`, React 18 + Vite 5)

`package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/api.js` (single fetch layer: `extractChallenge`, `matchChallenge`, `fetchReference`), `src/i18n.js` (full VI/EN dictionary incl. all engine explanation keys).

### ⚠️ PENDING BUG — fix first when resuming

`frontend/src/i18n.js` has **2 Vietnamese typos** that SearchReplace couldn't fix (Unicode NFC/NFD mismatch — matching fails on these strings; use full-file Write or an ASCII-anchored edit):

- Line ~36: `field_timeline_months: "Thứờii gian (tháng)"` → should be `"Thờii gian (tháng)"`
- Line ~120: `reject_timeline_ratio: "Thờiiu gian điển hình ..."` → should be `"Thờii gian điển hình ..."`

---

## 2. WHAT'S NEXT (immediate, in order)

1. **Fix the 2 i18n typos above.**
2. **Write remaining frontend files** (design decisions already made — don't re-design):
   - `src/styles.css` — single design system (CSS custom properties, light theme, professional/demo-grade).
   - `src/App.jsx` — 3-step state machine: `input` → `extracted` → `report`. State: `lang` (localStorage-persisted, default `vi`), `challenge`, `confirmed_fields`, `weights`, `report`, `reference`, `error`, `loading`. On mount: `fetchReference()`.
   - `src/components/ProvenanceBadge.jsx` — shared chip, one per Trust Layer class (colors: verified=green, cited=blue, user=gray, AI=amber, confirmed=teal).
   - `src/components/OnboardingForm.jsx` — textarea + 3 example chips (i18n keys `example1/2/3`) + submit → `extractChallenge` → show `mockNotice` when `mock: true`.
   - `src/components/ExtractedChallengeCard.jsx` — editable fields (domain select from `reference.domain_taxonomy`, TRL selects 1–9 via `trl_N` keys, timeline number, involvement select); per-field ProvenanceBadge (AI_INFERENCE → USER_CONFIRMED_DATA on edit); missing fields highlighted; confirm → `matchChallenge`.
   - `src/components/WeightSimulator.jsx` — 5 sliders (0–100), debounced ~250ms re-call of `/api/match`; shows normalized %.
   - `src/components/MatchExplanationCard.jsx` — ranked cards (score %, breakdown bars, strengths/risks/action via i18n keys + params, provenance badges), rejected list with reasons, report-level action banner, Trust Layer legend, `profiles_as_of` note.
3. `npm install` + `npm run build` in `frontend/` — must pass clean.
4. End-to-end: backend (already running: `uvicorn app.main:app --port 8000 --reload`) + `npm run dev` → walk the VI demo flow in a browser.
5. `.gitignore` (node_modules, **pycache**, .env, dist) + first git commit.

**How to run what's built:**

```powershell
cd backend;  pip install -r requirements.txt; uvicorn app.main:app --port 8000 --reload
cd backend;  python -m pytest tests/ -q     # 6/6 must stay green
cd frontend; npm install; npm run dev        # http://localhost:5173
```

Demo text (VI): _"Công ty chúng tôi muốn ứng dụng AI xử lý ngôn ngữ tiếng Việt để xây dựng chatbot chăm sóc khách hàng. Chúng tôi đã có mẫu thử prototype, cần nâng lên hệ thống thương mại trong 24 tháng, mong muốn hợp tác theo mô hình tiến sĩ công nghiệp."_

---

## 3. WORK TO DO LATER (roadmap, rubric-driven priority order)

Per rule §14 — USP → Architecture → Trust Layer → Google-native → Deployment → Impact → Demo → UI polish:

1. **Cloud Run deployment (+10, binary, mandatory)** — Dockerfiles for backend + frontend, 2 Cloud Run services, env vars/secrets, public URL. Currently 0/10.
2. **Real Gemini validation** — set `GEMINI_API_KEY`, test extraction + embeddings against live API; mock stays the fallback.
3. **Trust Layer UI polish** — provenance badges are designed; make them demo-visible (this is the Creativity signature: "Don't trust the AI. Verify the AI.").
4. **Firebase Auth + Firestore** — persistence + identity replacing `SAMPLE_PROFILES` static list (API layer only, never inside the engine).
5. **Impact evidence** — the single largest defensible claim (e.g. time-to-find-partner X→Y); currently no measured numbers. Mark unknowns "UNKNOWN — NEEDS VALIDATION".
6. **3-minute demo script** — PROBLEM → AI UNDERSTANDS → SYSTEM CALCULATES → COMPARISON → USER CHANGES PRIORITY → RANKING UPDATES LIVE → TRUST LAYER → DECISION.
7. **Early submission (+3)** — first 200 completed submissions.
8. **Round 1 audit rerun** — the master prompt's 18-phase audit against the now-real codebase; produce current + target scorecards and the TOP 10 WINNING PLAN.
9. **Product README for judges** (this file is a working-context doc, not that).

**Known limitations (document honestly):** in-memory rate limiting (per instance), 4-profile illustrative seed data, TF-IDF semantic fallback weaker than Gemini embeddings, no persistence/auth yet.

---

## 4. HANDOFF PROMPT — paste this to the next AI session

```text
You are resuming the Lab2Market build (AI Riser Vietnam 2026 hackathon, target Top 10).
Workspace: c:\Users\HONG DAO KIET\Lab2Market-

READ THESE FILES BEFORE WRITING ANY CODE:
1. README.md (workspace root) — full context: what's done, what's next, roadmap.
2. .qoder/rules/Lab2Market-Architecture.md — the governing architecture rules. They override your defaults.

NON-NEGOTIABLES:
- The One Contract: backend/app/services/matching_engine.py is 100% pure/deterministic/offline.
  The LLM only extracts/explains — never calculates, scores, ranks, or decides.
- Do NOT redesign the architecture. Do NOT recalibrate the engine — the default weights
  (0.35/0.25/0.15/0.15/0.10), domain scores (EXACT 1.0 / GROUP 0.9 / ADJACENT 0.5 / OTHER 0.1)
  and TF-IDF sqrt scaling are deliberate, test-verified decisions (README §1).
- Do NOT touch the backend except to keep tests green:
  cd backend; python -m pytest tests/ -q  → must stay 6/6 after every change.
- Never guess. If a requirement is unclear, stop and ask (rule §26).

CURRENT STATE:
Backend COMPLETE (6/6 pytest green, runs in mock mode with no API key).
Frontend scaffold done: package.json, vite.config.js, index.html, src/main.jsx, src/api.js, src/i18n.js.
Missing: src/styles.css, src/App.jsx, and 5 components under src/components/.

TASK ORDER:
1. Fix 2 Vietnamese typos in frontend/src/i18n.js:
   - line ~36: "Thứờii gian (tháng)" → "Thờii gian (tháng)"
   - line ~120: "Thờiiu gian điển hình" → "Thờii gian điển hình"
   IMPORTANT: SearchReplace FAILS on these strings (Unicode NFC/NFD mismatch).
   Read the file, then rewrite it via full-file Write instead.
2. Build the remaining frontend exactly per README §2 — component contracts are already
   specified there; do not re-design. Rules: ALL UI strings via t(lang, key, params) from
   i18n.js; never hardcode prose; never expose internal field names without labels;
   provenance badges visible per the Trust Layer.
3. cd frontend; npm install; npm run build → must pass clean.
4. End-to-end: backend at :8000 (uvicorn app.main:app --port 8000 --reload, mock mode,
   no API key needed), frontend at :5173 (npm run dev). Walk the VI demo flow using the
   demo text in README §2. Expected: NLP lab ranks #1 (~0.63), weight sliders reorder live.
5. Add .gitignore (node_modules, dist, __pycache__, .env). Do NOT git commit unless the user asks.

ENVIRONMENT: Windows, PowerShell (use ; as separator, never &&), Python 3.12, Node 25.
A backend server may already be running in a background terminal — check before starting a new one.

WHEN DONE, REPORT: npm build status, pytest status, demo-flow walkthrough result, any deviations.
```
