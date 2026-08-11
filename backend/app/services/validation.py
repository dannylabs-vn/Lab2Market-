"""Trust boundary 1+2: sanitize extraction, then validate (rule §6).

Sanitizer DROPS invalid fields instead of correcting them — a hallucinated
value must never overwrite something the user already stated or will
confirm. The valid-value whitelist derives from EXTRACTION_SCHEMA so the
sanitizer can never drift out of sync with the contract the model sees.
"""

from app.models import REQUIRED_MATCH_FIELDS, Challenge, InvolvementType
from app.prompts.extraction_prompts import EXTRACTION_SCHEMA
from app.sample_data import resolve_domain

TRL_MIN, TRL_MAX = 1, 9
TIMELINE_MIN_MONTHS, TIMELINE_MAX_MONTHS = 3, 120


def _clean_int(value: object, lo: int, hi: int) -> int | None:
    """Accept a clean int (or an unambiguous numeric string) within range."""
    if isinstance(value, bool):
        return None
    if isinstance(value, int):
        return value if lo <= value <= hi else None
    if isinstance(value, str) and value.strip().isdigit():
        parsed = int(value.strip())
        return parsed if lo <= parsed <= hi else None
    return None


def sanitize_extraction(raw: dict) -> dict:
    """Drop anything that is not a valid enum value or clean in-range number.

    Input is the raw dict from gemini_service (LLM or mock) — untrusted.
    Output contains only keys from EXTRACTION_SCHEMA with valid values.
    """
    clean: dict = {}
    if not isinstance(raw, dict):
        return clean

    domain = raw.get("domain")
    if isinstance(domain, str):
        group, subdomain = resolve_domain(domain.strip())
        # Keep the most specific valid key; group-only when that is all we got.
        if subdomain or group:
            clean["domain"] = subdomain or group

    for field in ("trl_current", "trl_target"):
        parsed = _clean_int(raw.get(field), TRL_MIN, TRL_MAX)
        if parsed is not None:
            clean[field] = parsed

    timeline = _clean_int(
        raw.get("timeline_months"), TIMELINE_MIN_MONTHS, TIMELINE_MAX_MONTHS
    )
    if timeline is not None:
        clean["timeline_months"] = timeline

    involvement = raw.get("involvement_preference")
    if isinstance(involvement, str):
        try:
            clean["involvement_preference"] = InvolvementType(involvement.strip())
        except ValueError:
            pass  # unknown enum value -> dropped, not repaired

    # Pair invariant: a target at/below the current level is a hallucination
    # pattern. Drop the TARGET (keep the stated current level) rather than
    # repair it — the user resolves the conflict in the confirm/edit UI.
    if (
        "trl_current" in clean
        and "trl_target" in clean
        and clean["trl_target"] <= clean["trl_current"]
    ):
        del clean["trl_target"]

    # Hard guarantee: only schema keys ever leave this function.
    return {k: v for k, v in clean.items() if k in EXTRACTION_SCHEMA}


def missing_required_fields(challenge: Challenge) -> list[str]:
    """Fields the engine still needs (drives the follow-up/edit UI)."""
    return [
        field
        for field in REQUIRED_MATCH_FIELDS
        if getattr(challenge, field) is None
    ]
