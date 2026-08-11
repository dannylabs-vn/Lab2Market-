"""Shared type contract for Lab2Market (Pydantic v2).

Every payload crossing a trust boundary — LLM extraction, client-confirmed
challenge, weight simulation, match report — is typed here exactly once.
No module redefines these shapes (rule: NO DUPLICATION / TYPES FIRST).
"""

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, model_validator


class Lang(str, Enum):
    VI = "vi"
    EN = "en"


class ProvenanceClass(str, Enum):
    """Trust Layer classification (rule §7) — exactly one class per element."""

    VERIFIED_CALCULATION = "VERIFIED_CALCULATION"
    CITED_SOURCE = "CITED_SOURCE"
    USER_PROVIDED_DATA = "USER_PROVIDED_DATA"
    AI_INFERENCE = "AI_INFERENCE"
    USER_CONFIRMED_DATA = "USER_CONFIRMED_DATA"


class InvolvementType(str, Enum):
    INDUSTRIAL_PHD = "industrial_phd"
    CO_SUPERVISION = "co_supervision"
    CONSULTING = "consulting"
    RESEARCH_PARTNERSHIP = "research_partnership"


# Challenge fields the matching engine requires before it may run.
REQUIRED_MATCH_FIELDS = ["domain", "trl_current", "trl_target", "timeline_months"]


class ExtractRequest(BaseModel):
    """POST /api/extract body. Text length cap lives in the security layer."""

    text: str = Field(min_length=1)
    lang: Lang = Lang.VI


class Challenge(BaseModel):
    """A business R&D challenge. Fields stay None until extraction or the
    user supplies them; `confirmed_fields` records explicit user confirmation
    and drives the AI INFERENCE → USER-CONFIRMED DATA transition (rule §7)."""

    raw_text: str = Field(min_length=1)
    lang: Lang = Lang.VI
    domain: Optional[str] = None
    trl_current: Optional[int] = Field(default=None, ge=1, le=9)
    trl_target: Optional[int] = Field(default=None, ge=1, le=9)
    timeline_months: Optional[int] = Field(default=None, ge=3, le=120)
    involvement_preference: Optional[InvolvementType] = None
    confirmed_fields: list[str] = Field(default_factory=list)

    @model_validator(mode="after")
    def target_must_advance_beyond_current(self) -> "Challenge":
        if (
            self.trl_current is not None
            and self.trl_target is not None
            and self.trl_target <= self.trl_current
        ):
            raise ValueError("trl_target must be greater than trl_current")
        return self


class ExtractionResponse(BaseModel):
    challenge: Challenge
    provenance: dict[str, ProvenanceClass]
    missing_fields: list[str]
    mock: bool


class MatchWeights(BaseModel):
    """MCDA weights. Non-negative; the engine normalizes to sum 1.

    Defaults put expertise first (semantic + domain = 0.60): the platform's
    purpose is finding the RIGHT research partner — structural fit (trl,
    timeline, involvement) refines an expert shortlist, it must not let a
    wrong-domain lab outrank the right expertise.
    """

    semantic: float = Field(default=0.35, ge=0, le=1)
    domain: float = Field(default=0.25, ge=0, le=1)
    trl: float = Field(default=0.15, ge=0, le=1)
    timeline: float = Field(default=0.15, ge=0, le=1)
    involvement: float = Field(default=0.10, ge=0, le=1)


class MatchRequest(BaseModel):
    challenge: Challenge
    weights: Optional[MatchWeights] = None


class CriterionBreakdown(BaseModel):
    """Per-criterion scores in [0, 1] — always VERIFIED CALCULATION."""

    semantic: float
    domain: float
    trl: float
    timeline: float
    involvement: float


class ExplanationItem(BaseModel):
    """A rule-based explanation entry. `key` is an i18n key — the frontend
    owns all rendered text; the engine ships keys + params, never prose."""

    key: str
    params: dict[str, str | int | float] = Field(default_factory=dict)


class MatchExplanation(BaseModel):
    strengths: list[ExplanationItem]
    risks: list[ExplanationItem]
    recommended_action: ExplanationItem


class RankedMatch(BaseModel):
    profile_id: str
    name: str
    institution: str
    score: float
    breakdown: CriterionBreakdown
    explanation: MatchExplanation


class RejectedMatch(BaseModel):
    profile_id: str
    name: str
    institution: str
    reason_key: str
    reason_params: dict[str, str | int | float] = Field(default_factory=dict)


class MatchReport(BaseModel):
    """The authoritative engine output — numbers only, no LLM involvement."""

    challenge: Challenge
    weights: MatchWeights
    ranked: list[RankedMatch]
    rejected: list[RejectedMatch]
    provenance: dict[str, ProvenanceClass]
    profiles_as_of: str
    report_action: ExplanationItem


class ResearchProfile(BaseModel):
    """A PhD research partner profile (seed registry record)."""

    id: str
    name: str
    institution: str
    department: str
    domain_group: str
    subdomains: list[str]
    trl_min: int = Field(ge=1, le=9)
    trl_max: int = Field(ge=1, le=9)
    typical_duration_months: int = Field(ge=3, le=120)
    involvement_types: list[InvolvementType]
    abstract: str
    keywords: list[str]


class ApiError(BaseModel):
    """Consistent error shape for every endpoint (rule §8)."""

    error: bool = True
    code: str
    message: str
    missing_fields: list[str] = Field(default_factory=list)
