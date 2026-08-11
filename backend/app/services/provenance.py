"""Trust Layer provenance classification (rule §7).

Assigns exactly one provenance class to every element of the extraction
and the match report. Provenance is decided here — from explicit user
action recorded on the challenge — never by the engine or the LLM.
"""

from app.models import Challenge, ProvenanceClass

# Sections of the match report whose class is fixed by construction.
SECTION_PROVENANCE: dict[str, ProvenanceClass] = {
    "score_breakdown": ProvenanceClass.VERIFIED_CALCULATION,
    "trl_scale": ProvenanceClass.CITED_SOURCE,
    "domain_taxonomy": ProvenanceClass.CITED_SOURCE,
    "raw_text": ProvenanceClass.USER_PROVIDED_DATA,
}

# Fields the extraction step can propose (everything else is computed).
EXTRACTABLE_FIELDS = [
    "domain",
    "trl_current",
    "trl_target",
    "timeline_months",
    "involvement_preference",
]


def extraction_provenance(challenge: Challenge) -> dict[str, ProvenanceClass]:
    """Per-field classes for an extraction response: every proposed field is
    AI INFERENCE until the user confirms it; the raw text is the user's own."""
    classes: dict[str, ProvenanceClass] = {
        "raw_text": ProvenanceClass.USER_PROVIDED_DATA
    }
    for field in EXTRACTABLE_FIELDS:
        if getattr(challenge, field) is not None:
            classes[field] = ProvenanceClass.AI_INFERENCE
    return classes


def report_provenance(challenge: Challenge) -> dict[str, ProvenanceClass]:
    """Per-field + per-section classes for a match report.

    A field is USER-CONFIRMED DATA only if the client recorded an explicit
    confirmation action for it; otherwise an inferred value stays
    AI INFERENCE even inside the report — the Trust Layer never launders
    unconfirmed model output into "user data".
    """
    classes = extraction_provenance(challenge)
    for field in EXTRACTABLE_FIELDS:
        if getattr(challenge, field) is not None and field in set(
            challenge.confirmed_fields
        ):
            classes[field] = ProvenanceClass.USER_CONFIRMED_DATA
    return {**classes, **SECTION_PROVENANCE}
