"""PURE deterministic matching pipeline — the Decision Engine (rule §1/§4).

Pipeline: hard constraints -> criterion scores -> weighted MCDA -> ranked
report with rule-based explanations. Methodology follows the source paper
("A Decision Support Platform for University–Industry PhD Collaboration");
Blueprint rule 12 applies: do not rewrite the scoring logic without a
clearly stated reason.

Purity contract: no LLM, no network, no filesystem, no env vars, no clock,
no RNG, no logging. Semantic similarity arrives as finished numbers —
this module never calls the embedding service. Same inputs, same outputs.

Note: resolve_domain/DOMAIN_TAXONOMY are static reference constants
(CITED SOURCE), not the profile registry — importing them is not I/O.
"""

from app.models import (
    Challenge,
    CriterionBreakdown,
    ExplanationItem,
    MatchWeights,
    RankedMatch,
    RejectedMatch,
    ResearchProfile,
)
from app.sample_data import resolve_domain
from app.services.explanation import build_match_explanation, build_report_action

# Hard-constraint and scoring constants — every number lives here, named.
MAX_TIMELINE_RATIO = 1.5  # lab may need at most 1.5x the available months
DOMAIN_SCORE_EXACT = 1.0  # challenge subdomain matches a profile subdomain
DOMAIN_SCORE_GROUP = 0.9  # challenge stated group-level only, profile in it
DOMAIN_SCORE_ADJACENT = 0.5  # same group, different subdomain: related field,
# but NOT the requested expertise — must not compete with an exact match
DOMAIN_SCORE_OTHER = 0.1  # different group — never zero: cross-domain happens
INVOLVEMENT_SCORE_OFFERED = 1.0  # preferred model is one the lab offers
INVOLVEMENT_SCORE_NEUTRAL = 0.5  # user stated no preference
INVOLVEMENT_SCORE_NOT_OFFERED = 0.3  # possible, but not the lab's standard model


def normalize_weights(weights: MatchWeights | None) -> MatchWeights:
    """Scale any non-negative weight vector to sum 1. An all-zero or absent
    vector falls back to the paper-default profile (documented, deterministic)."""
    w = weights or MatchWeights()
    values = {
        "semantic": w.semantic,
        "domain": w.domain,
        "trl": w.trl,
        "timeline": w.timeline,
        "involvement": w.involvement,
    }
    total = sum(values.values())
    if total <= 0:
        return MatchWeights()
    return MatchWeights(**{k: v / total for k, v in values.items()})


def check_hard_constraints(
    challenge: Challenge, profile: ResearchProfile
) -> RejectedMatch | None:
    """Pairing-level gates from the paper: TRL gap, then timeline ratio.
    Returns the rejection (with concrete reason) or None when eligible."""
    trl_current = challenge.trl_current or 0
    trl_target = challenge.trl_target or 0
    timeline = challenge.timeline_months or 1

    # TRL gap: the lab's coverage must overlap the advancement window
    # (current+1 .. target) — a lab that cannot reach beyond the current
    # state, or one whose work starts past the target, cannot bridge the gap.
    if profile.trl_max <= trl_current:
        return RejectedMatch(
            profile_id=profile.id,
            name=profile.name,
            institution=profile.institution,
            reason_key="reject_trl_below",
            reason_params={"lab_trl_max": profile.trl_max, "trl_current": trl_current},
        )
    if profile.trl_min >= trl_target:
        return RejectedMatch(
            profile_id=profile.id,
            name=profile.name,
            institution=profile.institution,
            reason_key="reject_trl_above",
            reason_params={"lab_trl_min": profile.trl_min, "trl_target": trl_target},
        )

    ratio = profile.typical_duration_months / timeline
    if ratio > MAX_TIMELINE_RATIO:
        return RejectedMatch(
            profile_id=profile.id,
            name=profile.name,
            institution=profile.institution,
            reason_key="reject_timeline_ratio",
            reason_params={
                "lab_months": profile.typical_duration_months,
                "months": timeline,
                "ratio": round(ratio, 2),
            },
        )
    return None


def score_domain(challenge: Challenge, profile: ResearchProfile) -> float:
    """Exact subdomain > group-level challenge in-group > adjacent > other."""
    c_group, c_subdomain = resolve_domain(challenge.domain)
    if c_subdomain and c_subdomain in profile.subdomains:
        return DOMAIN_SCORE_EXACT
    if c_group and c_group == profile.domain_group:
        # The challenge named a specific subdomain this lab does not cover —
        # adjacent expertise, not the requested one.
        return DOMAIN_SCORE_GROUP if c_subdomain is None else DOMAIN_SCORE_ADJACENT
    return DOMAIN_SCORE_OTHER


def score_trl(challenge: Challenge, profile: ResearchProfile) -> float:
    """How much of the required TRL advancement window the lab's coverage
    spans. Post-hard-constraint the overlap is at least one level."""
    trl_current = challenge.trl_current or 0
    trl_target = challenge.trl_target or 0
    gap = trl_target - trl_current
    if gap <= 0:
        return 0.0
    overlap_lo = max(profile.trl_min, trl_current + 1)
    overlap_hi = min(profile.trl_max, trl_target)
    overlap = max(0, overlap_hi - overlap_lo + 1)
    return min(1.0, overlap / gap)


def score_timeline(challenge: Challenge, profile: ResearchProfile) -> float:
    """Full marks when the lab typically finishes within the available
    months; degrades linearly as its duration approaches the hard cap."""
    timeline = challenge.timeline_months or 1
    return min(1.0, timeline / profile.typical_duration_months)


def score_involvement(challenge: Challenge, profile: ResearchProfile) -> float:
    """Offered > unspecified preference > not the lab's standard model."""
    if challenge.involvement_preference is None:
        return INVOLVEMENT_SCORE_NEUTRAL
    if challenge.involvement_preference in profile.involvement_types:
        return INVOLVEMENT_SCORE_OFFERED
    return INVOLVEMENT_SCORE_NOT_OFFERED


def weighted_total(breakdown: CriterionBreakdown, weights: MatchWeights) -> float:
    """Weighted-sum MCDA over the five criteria. The single scoring formula —
    the weight simulator reuses this exact function via the same endpoint."""
    scores = breakdown.model_dump()
    w = weights.model_dump()
    return round(sum(scores[name] * w[name] for name in scores), 4)


def run_matching(
    challenge: Challenge,
    profiles: list[ResearchProfile],
    weights: MatchWeights | None,
    semantic_scores: dict[str, float],
) -> tuple[list[RankedMatch], list[RejectedMatch], ExplanationItem]:
    """Full deterministic pipeline. Raises ValueError if called with an
    unvalidated challenge — validation is the caller's contract (rule §3)."""
    if (
        challenge.domain is None
        or challenge.trl_current is None
        or challenge.trl_target is None
        or challenge.timeline_months is None
    ):
        raise ValueError("engine called with unvalidated challenge")

    normalized = normalize_weights(weights)
    ranked: list[RankedMatch] = []
    rejected: list[RejectedMatch] = []
    trl_gap = challenge.trl_target - challenge.trl_current

    for profile in profiles:
        rejection = check_hard_constraints(challenge, profile)
        if rejection is not None:
            rejected.append(rejection)
            continue

        breakdown = CriterionBreakdown(
            semantic=round(semantic_scores.get(profile.id, 0.0), 4),
            domain=score_domain(challenge, profile),
            trl=score_trl(challenge, profile),
            timeline=score_timeline(challenge, profile),
            involvement=score_involvement(challenge, profile),
        )
        timeline_ratio = profile.typical_duration_months / challenge.timeline_months
        ranked.append(
            RankedMatch(
                profile_id=profile.id,
                name=profile.name,
                institution=profile.institution,
                score=weighted_total(breakdown, normalized),
                breakdown=breakdown,
                explanation=build_match_explanation(
                    challenge, profile, breakdown, timeline_ratio, trl_gap
                ),
            )
        )

    # Stable, deterministic ordering: score desc, profile id as tiebreak.
    ranked.sort(key=lambda m: (-m.score, m.profile_id))
    report_action = build_report_action(len(ranked), rejected)
    return ranked, rejected, report_action
