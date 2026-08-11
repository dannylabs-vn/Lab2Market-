"""Gemini extraction with a MANDATORY deterministic mock fallback (rule §5).

Gemini's only job here: free text (VI/EN) -> structured field proposal.
With no GEMINI_API_KEY — or any failure — the mock extractor runs instead,
so the demo works end-to-end with zero external dependencies. The mock is
deterministic keyword/regex heuristics; its output flows through the same
sanitizer as real LLM output, because both are untrusted.
"""

import json
import os
import re

from app.models import Lang
from app.prompts.extraction_prompts import EXTRACTION_SYSTEM_PROMPT

GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
EXTRACTION_TEMPERATURE = 0.1  # extraction is parsing, not creative writing

# ---------------------------------------------------------------------------
# Mock extraction heuristics (deterministic — same text, same fields, always)
# ---------------------------------------------------------------------------

# Subdomain keywords are checked BEFORE group keywords: a specific signal
# ("thị giác máy") implies its group; a group signal ("AI") does not imply
# a subdomain. Short tokens are matched on word boundaries to avoid
# substring false positives ("ai" inside "lai").
_SUBDOMAIN_KEYWORDS: dict[str, list[str]] = {
    "computer_vision": ["thị giác", "computer vision", "hình ảnh", "nhận diện", "defect", "khuyết tật"],
    "natural_language_processing": ["ngôn ngữ", "nlp", "văn bản", "chatbot", "llm", "text mining"],
    "machine_learning": ["machine learning", "học máy", "deep learning", "học sâu", "dự đoán"],
    "data_science": ["dữ liệu", "data", "phân tích dữ liệu", "analytics"],
    "pharmaceuticals": ["thuốc", "dược", "drug", "vaccine", "dược phẩm"],
    "diagnostics": ["chẩn đoán", "diagnos", "xét nghiệm", "test nhanh"],
    "biotechnology": ["sinh học", "biotech", "enzyme", "lên men"],
    "medical_devices": ["thiết bị y tế", "medical device"],
    "robotics": ["robot", "cánh tay robot"],
    "automation": ["tự động", "automation", "dây chuyền", "nhà máy"],
    "materials": ["vật liệu", "material", "composite", "hợp kim"],
    "quality_control": ["kiểm soát chất lượng", "quality control", "kiểm tra chất lượng"],
}

_GROUP_KEYWORDS: dict[str, list[str]] = {
    "artificial_intelligence": ["ai", "trí tuệ nhân tạo", "artificial intelligence"],
    "biomedical": ["y tế", "biomedical", "medical", "sức khỏe", "bệnh"],
    "manufacturing": ["sản xuất", "chế tạo", "manufacturing", "công nghiệp"],
}

# Current-state TRL: companies describe both where they are and where they
# want to be ("mẫu thử... nâng lên thương mại"). The current state is the
# LEAST mature signal present — ambition keywords drive the target instead.
_TRL_SIGNALS: list[tuple[list[str], int]] = [
    (["thương mại", "commercialize", "vận hành thực tế", "production", "đang dùng"], 8),
    (["pilot", "thí điểm"], 6),
    (["prototype", "mẫu thử", "poc", "proof of concept", "phòng thí nghiệm", "lab"], 4),
    (["ý tưởng", "idea", "concept", "nghiên cứu"], 2),
]
_DEFAULT_TRL_CURRENT = 3  # mid-lab maturity when the text says nothing
_TRL_TARGET_COMMERCIAL = 8
_TRL_TARGET_STEP = 2

_INVOLVEMENT_KEYWORDS: list[tuple[list[str], str]] = [
    (["tiến sĩ", "phd", "nghiên sinh", "doctoral"], "industrial_phd"),
    (["tư vấn", "consult"], "consulting"),
    (["đồng hướng dẫn", "co-supervis"], "co_supervision"),
    (["hợp tác", "partnership", "collabor"], "research_partnership"),
]

_MONTH_PATTERN = re.compile(r"(\d+)\s*(tháng|months?)\b", re.IGNORECASE)
_YEAR_PATTERN = re.compile(r"(\d+)\s*(năm|years?)\b", re.IGNORECASE)


def _contains_any(text: str, keywords: list[str]) -> bool:
    return any(
        re.search(r"(?<!\w)" + re.escape(kw) + r"(?!\w)", text, re.IGNORECASE)
        for kw in keywords
    )


def _mock_extract(text: str) -> dict:
    """Keyword/regex heuristics. Fields stay absent when no signal exists —
    a missing field triggers the confirm/edit UI, which is the honest path."""
    lowered = text.lower()
    fields: dict = {}

    for subdomain, keywords in _SUBDOMAIN_KEYWORDS.items():
        if _contains_any(lowered, keywords):
            fields["domain"] = subdomain
            break
    if "domain" not in fields:
        for group, keywords in _GROUP_KEYWORDS.items():
            if _contains_any(lowered, keywords):
                fields["domain"] = group
                break

    matched_levels = [
        level
        for signals, level in _TRL_SIGNALS
        if _contains_any(lowered, signals)
    ]
    trl_current = min(matched_levels) if matched_levels else _DEFAULT_TRL_CURRENT
    fields["trl_current"] = trl_current
    commercial = _contains_any(lowered, ["thương mại", "commercialize", "ra thị trường"])
    trl_target = (
        _TRL_TARGET_COMMERCIAL
        if commercial
        else min(9, trl_current + _TRL_TARGET_STEP)
    )
    # The target must sit above the current level to form a valid challenge.
    fields["trl_target"] = max(trl_target, min(9, trl_current + 1))

    months = _MONTH_PATTERN.search(lowered)
    years = _YEAR_PATTERN.search(lowered)
    if months:
        fields["timeline_months"] = int(months.group(1))
    elif years:
        fields["timeline_months"] = int(years.group(1)) * 12

    for keywords, value in _INVOLVEMENT_KEYWORDS:
        if _contains_any(lowered, keywords):
            fields["involvement_preference"] = value
            break

    return fields


def _gemini_extract(text: str) -> dict:
    """Real Gemini call. Imported lazily so mock mode needs no SDK and no key.
    Any failure raises — the caller degrades to mock (rule §8 matrix)."""
    import google.generativeai as genai  # noqa: PLC0415 — lazy on purpose

    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel(
        GEMINI_MODEL,
        system_instruction=EXTRACTION_SYSTEM_PROMPT,
        generation_config={
            "temperature": EXTRACTION_TEMPERATURE,
            "response_mime_type": "application/json",
        },
    )
    response = model.generate_content(text)
    parsed = json.loads(response.text)
    if not isinstance(parsed, dict):
        raise ValueError("Gemini returned non-object JSON")
    return parsed


def extract_challenge_fields(text: str, lang: Lang) -> tuple[dict, bool]:
    """Return (raw_fields, mock). Output is UNTRUSTED — sanitize before use."""
    if os.environ.get("GEMINI_API_KEY"):
        try:
            return _gemini_extract(text), False
        except Exception:
            # Degradation matrix: extraction LLM fails -> mock extraction,
            # the user still confirms/edits every field before matching.
            pass
    return _mock_extract(text), True
