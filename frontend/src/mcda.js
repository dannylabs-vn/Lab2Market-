/**
 * Client-side MCDA re-ranker — mirrors the backend matching_engine formula
 * exactly so slider changes re-order cards instantly without a backend call.
 *
 * Formula (identical to backend):
 *   score = Σ w_i * s_i   (weights are normalized to sum 1 before applying)
 *
 * Input:
 *   rankedFromBackend — the ranked array as returned by /api/match
 *   sliderValues      — { semantic, domain, trl, timeline, involvement } (0-100)
 *
 * Output:
 *   new ranked array sorted by descending composite score
 */

const CRITERIA = ["semantic", "domain", "trl", "timeline", "involvement"];
const DEFAULT_WEIGHTS = { semantic: 35, domain: 25, trl: 15, timeline: 15, involvement: 10 };

function normalizeWeights(raw) {
  const total = CRITERIA.reduce((sum, k) => sum + (raw[k] || 0), 0);
  if (total === 0) {
    // Fall back to paper-default normalized weights
    const defTotal = CRITERIA.reduce((sum, k) => sum + DEFAULT_WEIGHTS[k], 0);
    return Object.fromEntries(CRITERIA.map((k) => [k, DEFAULT_WEIGHTS[k] / defTotal]));
  }
  return Object.fromEntries(CRITERIA.map((k) => [(k), (raw[k] || 0) / total]));
}

/**
 * Re-applies new slider weights to the existing breakdown scores already
 * returned by the backend. Returns a new sorted array (does not mutate input).
 */
export function clientRerank(rankedFromBackend, sliderValues) {
  if (!rankedFromBackend || rankedFromBackend.length === 0) return [];

  const w = normalizeWeights(sliderValues);

  return [...rankedFromBackend]
    .map((match) => {
      const bd = match.breakdown || {};
      const newScore = CRITERIA.reduce((sum, k) => sum + w[k] * (bd[k] || 0), 0);
      return { ...match, score: newScore };
    })
    .sort((a, b) => b.score - a.score);
}
