---
description: "Lab2Market UI/UX design tokens, visual constraints, interactive weight sliders, and Trust Layer badge styling."
globs: ["frontend/src/styles.css", "frontend/src/**/*.jsx", "frontend/src/**/*.js"]
alwaysApply: true
---

# LAB2MARKET — UI & DESIGN RULES

This document defines the visual constraints, layout standards, and interaction guidelines for the Lab2Market frontend, matching the design doctrine of the alibaba-vaya architecture.

---

## 1. DESIGN SYSTEM & COLOR TOKENS

All colors must be sourced from the CSS variables defined in [`frontend/src/styles.css`](file:///c:/Users/HONG%20DAO%20KIET/Lab2Market--1/frontend/src/styles.css). Never hardcode raw hex values in components.

### Core Color Tokens
*   **Background (`--bg`):** `#ffffff` (Pure white background)
*   **Ink / Text (`--ink`):** `#013d3b` (Deep Teal ink for body text)
*   **Brand Accent (`--green`):** `#00c776` (Accents, chart strokes, and highlights)
*   **CTA Buttons (`--green-cta`):** `#017a46` (Deep green button background. This ensures a color contrast ratio exceeding 4.5:1 against white text, satisfying WCAG AA compliance where `#00c776` fails at 2.23:1).
*   **Surfaces:** `--surface` (`#f4f7f9`) and `--surface2` (`#ecf0f3`) for panel/card headers and layout dividers.

---

## 2. HARD VISUAL CONSTRAINTS (Checkable)

Every component must satisfy the following strict style rules:

*   **Square Corners (NO border-radius):** All primary elements — including buttons (`.btn`), tags (`.chip`), textareas (`.launcher`), input panels, modal structures, and cards (`.card`) — MUST carry `border-radius: 0;`.
*   **Circular Border Exception:** Round borders are permitted ONLY for circular user profile avatars or tiny status dots (`border-radius: 50%` or `999px`).
*   **Typography Hierarchy:**
    *   Display/Headings: `Sora` with fallbacks.
    *   Body Text: `Plus Jakarta Sans`.
    *   Vietnamese Diacritics: In Vietnamese mode (`html[lang="vi"]`), use `Be Vietnam Pro` as the display face to prevent glyph borrowing and weight mismatch on letters like `ả, ấ, ộ`.

---

## 3. COMPONENT & INTERACTION BEHAVIOR

### Weight Simulator Reactivity
*   The 5 sliders (Semantic, Domain, TRL, Timeline, Involvement) represent values from `0` to `100`.
*   Moving any slider MUST trigger an instant client-side MCDA calculation and re-order the ranked cards without page refresh. The re-ordering transition must be smooth and debounced (default 250ms).

### Provenance Badges (Trust Layer)
Each value in the matching matrix must render with its corresponding `ProvenanceBadge` chip matching these color themes:
1.  `VERIFIED_CALCULATION` (Green): Deterministic calculation logic.
2.  `CITED_SOURCE` (Blue): Backed by static TRL or domain taxonomies.
3.  `USER_PROVIDED_DATA` (Gray): Raw input entered by the user.
4.  `AI_INFERENCE` (Amber): Projections extracted by the LLM.
5.  `USER_CONFIRMED_DATA` (Teal): Field modified or confirmed by the user.

*Constraint: Editing any AI-inferred field in `ExtractedChallengeCard` must immediately switch its badge status to `USER_CONFIRMED_DATA`.*

---

## 4. VERIFICATION PROCEDURES

To verify visual compliance:
1.  Build the project using `npm run build` from the `frontend/` directory to ensure no CSS compile errors.
2.  Open the dev server at `http://localhost:5173/` and verify that all cards and inputs have sharp 90-degree corners.
