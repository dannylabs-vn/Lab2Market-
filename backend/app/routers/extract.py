"""POST /api/extract — guards -> extraction (Gemini/mock) -> sanitize ->
provenance. Never runs the engine; never returns prose to narrate.

Order is fixed (rule §3): rate limit, sanitize, injection guard, then and
only then the LLM path. LLM output crosses the sanitizer trust boundary
before it becomes a Challenge (rule §6).
"""

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from app.messages import api_message
from app.models import ApiError, Challenge, ExtractRequest, ExtractionResponse
from app.services import gemini_service, provenance, security, validation

router = APIRouter(prefix="/api", tags=["extract"])


def _client_key(request: Request) -> str:
    """Rate-limit key: real client IP when behind a proxy (Cloud Run sets
    x-forwarded-for), else the direct peer. Never a client-generated id."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _error(status: int, code: str, body: ExtractRequest, headers: dict | None = None):
    payload = ApiError(code=code, message=api_message(code, body.lang))
    return JSONResponse(
        status_code=status, content=payload.model_dump(), headers=headers
    )


@router.post("/extract", response_model=ExtractionResponse)
def extract_challenge(body: ExtractRequest, request: Request):
    # --- Guards (always before business logic) ---
    limited, retry_after = security.check_rate_limit(
        _client_key(request), endpoint="extract"
    )
    if limited:
        return _error(
            429, "rate_limited", body, headers={"Retry-After": str(retry_after)}
        )
    sanitized = security.sanitize_message(body.text)
    if sanitized is None:
        return _error(400, "invalid_text", body)
    if security.detect_injection(sanitized):
        return _error(400, "injection_blocked", body)

    # --- Extraction (untrusted) -> sanitize (trust boundary 1) ---
    raw_fields, mock = gemini_service.extract_challenge_fields(sanitized, body.lang)
    clean = validation.sanitize_extraction(raw_fields)
    challenge = Challenge(raw_text=sanitized, lang=body.lang, **clean)

    return ExtractionResponse(
        challenge=challenge,
        provenance=provenance.extraction_provenance(challenge),
        missing_fields=validation.missing_required_fields(challenge),
        mock=mock,
    )
