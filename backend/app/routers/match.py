"""POST /api/match — the deterministic matching endpoint. NO LLM on this
path: embeddings are best-effort with TF-IDF fallback, and every number in
the response comes from the pure matching engine (rule §1).

Guards -> validation (trust boundary 2) -> engine -> provenance -> report.
"""

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from app.messages import api_message
from app.models import ApiError, MatchReport, MatchRequest
from app.sample_data import PROFILES_AS_OF, SAMPLE_PROFILES
from app.services import embeddings, matching_engine, provenance, security, validation
from app.routers.extract import _client_key

router = APIRouter(prefix="/api", tags=["match"])


def _error(status: int, code: str, lang, missing: list[str] | None = None):
    payload = ApiError(
        code=code, message=api_message(code, lang), missing_fields=missing or []
    )
    return JSONResponse(status_code=status, content=payload.model_dump())


@router.post("/match", response_model=MatchReport)
def match_challenge(body: MatchRequest, request: Request):
    lang = body.challenge.lang

    # --- Guards ---
    limited, retry_after = security.check_rate_limit(
        _client_key(request), endpoint="match", max_requests=security.RATE_LIMIT_MATCH_MAX
    )
    if limited:
        return JSONResponse(
            status_code=429,
            headers={"Retry-After": str(retry_after)},
            content=ApiError(
                code="rate_limited", message=api_message("rate_limited", lang)
            ).model_dump(),
        )

    # --- Validation (trust boundary 2): required fields before the engine ---
    missing = validation.missing_required_fields(body.challenge)
    if missing:
        return _error(400, "missing_fields", lang, missing)
    if security.sanitize_message(body.challenge.raw_text) is None:
        return _error(400, "invalid_text", lang)

    # --- Semantic similarity (best-effort service) -> engine (pure) ---
    documents = {
        p.id: f"{p.abstract} {' '.join(p.keywords)}" for p in SAMPLE_PROFILES
    }
    semantic_scores = embeddings.semantic_similarities(
        body.challenge.raw_text, documents
    )
    ranked, rejected, report_action = matching_engine.run_matching(
        body.challenge, SAMPLE_PROFILES, body.weights, semantic_scores
    )

    return MatchReport(
        challenge=body.challenge,
        weights=matching_engine.normalize_weights(body.weights),
        ranked=ranked,
        rejected=rejected,
        provenance=provenance.report_provenance(body.challenge),
        profiles_as_of=PROFILES_AS_OF,
        report_action=report_action,
    )
