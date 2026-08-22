"""FastAPI application entry: middleware, routers, error contract.

Business logic lives in services/; this file only wires the app together.
Run: uvicorn app.main:app --reload  (from the backend/ directory)
"""

import os

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.messages import api_message
from app.models import ApiError, Lang
from app.routers import extract, match, reference

app = FastAPI(title="Lab2Market API", version="0.1.0")

# CORS: the frontend origin is configuration, not a hardcoded literal.
_frontend_origins = os.environ.get("FRONTEND_ORIGINS", "http://localhost:5173,http://localhost:5174,http://localhost:5175")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _frontend_origins.split(",")],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(extract.router)
app.include_router(match.router)
app.include_router(reference.router)


def _lang_from_body(exc: RequestValidationError) -> Lang:
    """Best-effort language for a 400 payload error: /api/extract carries
    `lang` at the top level, /api/match under `challenge.lang`. A malformed
    body with no parseable lang defaults to VI — a wrong-language 400 is a
    minor UX wart, never a leak (rule §8)."""
    body = exc.body
    if isinstance(body, dict):
        for candidate in (body.get("lang"), (body.get("challenge") or {}).get("lang")):
            if isinstance(candidate, str) and candidate in {"vi", "en"}:
                return Lang(candidate)
    return Lang.VI


@app.exception_handler(RequestValidationError)
async def invalid_payload_handler(request: Request, exc: RequestValidationError):
    """Schema failures -> the consistent 400 contract. Internals never leak."""
    payload = ApiError(
        code="invalid_payload", message=api_message("invalid_payload", _lang_from_body(exc))
    )
    return JSONResponse(status_code=400, content=payload.model_dump())


@app.exception_handler(Exception)
async def internal_error_handler(request: Request, exc: Exception):
    """Last-resort guard: fail gracefully, never expose a stack trace.
    VI default is deliberate: a 500 carries no reliable client-language
    context, and this message must never itself raise."""
    payload = ApiError(
        code="internal_error", message=api_message("internal_error", Lang.VI)
    )
    return JSONResponse(status_code=500, content=payload.model_dump())


@app.get("/api/health")
def health():
    """Cloud Run health probe."""
    return {"status": "ok"}
