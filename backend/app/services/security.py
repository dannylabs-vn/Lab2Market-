"""API guards (rule §8): rate limiting, message sanitization, injection
detection. Guards ALWAYS run before any business logic.

Demo-grade: the sliding window lives in process memory — multi-instance
Cloud Run deployments need a shared store (documented limitation).
"""

import re
import time

RATE_LIMIT_MAX = 10  # requests per window per client
RATE_LIMIT_WINDOW_S = 30
MAX_TEXT_LEN = 4000  # chars — above this is abuse, not a challenge description

# Patterns that try to hijack the extraction prompt. Matched case-insensitively
# against the normalized message; a match blocks the request before any LLM call.
_INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior)\s+instructions",
    r"you\s+are\s+now\b",
    r"system\s+prompt",
    r"bỏ\s+qua\s+(các\s+)?hướng\s+dẫn",
    r"đóng\s+vai",
    r"quên\s+(hết\s+)?(các\s+)?lệnh",
]

_request_log: dict[str, list[float]] = {}


RATE_LIMIT_MATCH_MAX = 60  # deterministic match allows rapid slider adjustments


def check_rate_limit(
    client_key: str, endpoint: str = "extract", max_requests: int = RATE_LIMIT_MAX
) -> tuple[bool, int]:
    """Sliding-window per-client per-endpoint limit. Returns (limited, retry_after_s)."""
    now = time.monotonic()
    window_start = now - RATE_LIMIT_WINDOW_S
    log_key = f"{client_key}:{endpoint}"
    hits = [t for t in _request_log.get(log_key, []) if t > window_start]
    if len(hits) >= max_requests:
        retry_after = int(hits[0] - window_start) + 1
        _request_log[log_key] = hits
        return True, max(retry_after, 1)
    hits.append(now)
    _request_log[log_key] = hits
    return False, 0


def sanitize_message(text: str) -> str | None:
    """Normalize whitespace and cap length. None means 'nothing usable left'."""
    cleaned = re.sub(r"\s+", " ", text).strip()
    if not cleaned or len(cleaned) > MAX_TEXT_LEN:
        return None
    return cleaned


def detect_injection(text: str) -> bool:
    """True when the message carries a known prompt-injection pattern."""
    lowered = text.lower()
    return any(re.search(p, lowered) for p in _INJECTION_PATTERNS)
