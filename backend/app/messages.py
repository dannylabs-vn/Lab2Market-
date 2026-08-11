"""Server-side localized API messages (VI default, EN).

Only ERROR text lives here — domain text for explanations ships as i18n
keys and is owned by the frontend (rule §9). One catalog, one helper:
no router assembles message strings itself.
"""

from app.models import Lang

_ERROR_MESSAGES: dict[str, dict[Lang, str]] = {
    "rate_limited": {
        Lang.VI: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.",
        Lang.EN: "Too many requests. Please try again shortly.",
    },
    "invalid_text": {
        Lang.VI: "Nội dung mô tả thử thách trống hoặc quá dài.",
        Lang.EN: "The challenge description is empty or too long.",
    },
    "injection_blocked": {
        Lang.VI: "Yêu cầu bị chặn vì chứa nội dung không hợp lệ.",
        Lang.EN: "Request blocked: unsupported content detected.",
    },
    "missing_fields": {
        Lang.VI: "Còn thiếu thông tin bắt buộc trước khi ghép đôi.",
        Lang.EN: "Required information is still missing before matching.",
    },
    "invalid_payload": {
        Lang.VI: "Dữ liệu gửi lên không hợp lệ.",
        Lang.EN: "The submitted payload is invalid.",
    },
    "internal_error": {
        Lang.VI: "Hệ thống gặp sự cố. Vui lòng thử lại.",
        Lang.EN: "Something went wrong. Please try again.",
    },
}


def api_message(code: str, lang: Lang) -> str:
    """Localized message for an error code; unknown codes degrade to a
    generic internal error — a missing key must never crash a response."""
    entry = _ERROR_MESSAGES.get(code) or _ERROR_MESSAGES["internal_error"]
    return entry.get(lang, entry[Lang.VI])
