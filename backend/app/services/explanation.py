"""Rule-based explanation builder (rule §3/§4). NO LLM.

Turns the engine's numbers into structured explanation entries. Entries
are i18n KEYS + params — the frontend owns all rendered prose, so this
module stays language-neutral and every sentence is traceable to a rule.

Thresholds live here (not in the engine): they classify numbers for
presentation, which is this module's single responsibility.
"""

from app.models import (
    Challenge,
    CriterionBreakdown,
    ExplanationItem,
    MatchExplanation,
    RejectedMatch,
    ResearchProfile,
)

STRENGTH_THRESHOLD = 0.70  # criterion score at/above this is a strength
RISK_THRESHOLD = 0.45  # criterion score below this is a risk
TRL_GAP_PHASED_PLAN = 3  # gap at/above this needs a phased TRL ladder

_CRITERIA = ["semantic", "domain", "trl", "timeline", "involvement"]


def _percent(score: float) -> int:
    return int(round(score * 100))


def build_match_explanation(
    challenge: Challenge,
    profile: ResearchProfile,
    breakdown: CriterionBreakdown,
    timeline_ratio: float,
    trl_gap: int,
) -> MatchExplanation:
    """Strengths / risks / recommended action for one ranked match."""
    scores = breakdown.model_dump()
    strengths = [
        ExplanationItem(key=f"strength_{name}", params={"percent": _percent(scores[name])})
        for name in _CRITERIA
        if scores[name] >= STRENGTH_THRESHOLD
    ]
    risks = [
        ExplanationItem(key=f"risk_{name}", params={"percent": _percent(scores[name])})
        for name in _CRITERIA
        if scores[name] < RISK_THRESHOLD
    ]

    # Structural risks a single criterion score cannot express.
    if timeline_ratio > 1.0:
        risks.append(
            ExplanationItem(
                key="risk_timeline_tight",
                params={
                    "lab_months": profile.typical_duration_months,
                    "months": challenge.timeline_months or 0,
                },
            )
        )
    if trl_gap >= TRL_GAP_PHASED_PLAN:
        risks.append(ExplanationItem(key="risk_trl_wide", params={"gap": trl_gap}))

    # Recommended action: first matching rule wins — the most consequential
    # adjustment is always the one surfaced to the user.
    if timeline_ratio > 1.0:
        action = ExplanationItem(
            key="action_phase_timeline",
            params={"lab_months": profile.typical_duration_months},
        )
    elif trl_gap >= TRL_GAP_PHASED_PLAN:
        action = ExplanationItem(
            key="action_trl_ladder",
            params={
                "current": challenge.trl_current or 0,
                "target": challenge.trl_target or 0,
            },
        )
    elif breakdown.involvement < 0.5:
        action = ExplanationItem(
            key="action_involvement_alt",
            params={"offered": ", ".join(t.value for t in profile.involvement_types)},
        )
    else:
        action = ExplanationItem(key="action_proceed")

    return MatchExplanation(
        strengths=strengths, risks=risks, recommended_action=action
    )


def build_report_action(
    ranked_count: int, rejected: list[RejectedMatch]
) -> ExplanationItem:
    """Report-level next step. An empty ranking still answers: the most
    common rejection reason names the constraint worth relaxing first."""
    if ranked_count > 0:
        return ExplanationItem(key="action_review_top", params={"count": ranked_count})
    reason_counts: dict[str, int] = {}
    for item in rejected:
        reason_counts[item.reason_key] = reason_counts.get(item.reason_key, 0) + 1
    top_reason = max(reason_counts, key=reason_counts.get) if reason_counts else ""
    return ExplanationItem(
        key="action_adjust_constraints", params={"reason": top_reason}
    )
