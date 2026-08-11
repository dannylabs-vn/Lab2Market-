"""Semantic similarity: Gemini embeddings with TF-IDF fallback (rule §3).

Best-effort everywhere: any embedding-service failure degrades to TF-IDF
cosine similarity — deterministic, offline, good enough for a 4-profile
seed corpus. This module is the ONLY place embeddings are fetched; the
engine receives finished similarity scores as plain numbers (rule §4).
"""

import math
import os
import re
from collections import Counter

GEMINI_EMBEDDING_MODEL = os.environ.get(
    "GEMINI_EMBEDDING_MODEL", "gemini-embedding-001"
)

_TOKEN_PATTERN = re.compile(r"\w+", re.UNICODE)
_MIN_TOKEN_LEN = 2  # drop one-char tokens — mostly Vietnamese stopword noise


def _tokenize(text: str) -> list[str]:
    return [t for t in _TOKEN_PATTERN.findall(text.lower()) if len(t) >= _MIN_TOKEN_LEN]


def _cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def _tfidf_similarities(query: str, documents: dict[str, str]) -> dict[str, float]:
    """Deterministic TF-IDF cosine over the query + document corpus."""
    ids = list(documents)
    corpus = [_tokenize(query)] + [_tokenize(documents[i]) for i in ids]
    n_docs = len(corpus)

    doc_freq: Counter[str] = Counter()
    for tokens in corpus:
        for token in set(tokens):
            doc_freq[token] += 1

    def vectorize(tokens: list[str]) -> dict[str, float]:
        counts = Counter(tokens)
        # Smoothed idf keeps every term finite, even unseen-in-corpus ones.
        return {
            term: count * (math.log((n_docs + 1) / (doc_freq[term] + 1)) + 1)
            for term, count in counts.items()
        }

    query_vec = vectorize(corpus[0])
    results: dict[str, float] = {}
    for profile_id, tokens in zip(ids, corpus[1:]):
        doc_vec = vectorize(tokens)
        shared = set(query_vec) & set(doc_vec)
        dot = sum(query_vec[t] * doc_vec[t] for t in shared)
        norm_q = math.sqrt(sum(v * v for v in query_vec.values()))
        norm_d = math.sqrt(sum(v * v for v in doc_vec.values()))
        cosine = dot / (norm_q * norm_d) if norm_q and norm_d else 0.0
        # TF-IDF cosines on short texts compress into [0, ~0.3], which would
        # mute the semantic criterion against structural ones. sqrt expands
        # the scale monotonically WITHOUT renormalizing per candidate set —
        # an absolute weak match stays visibly weak.
        results[profile_id] = round(math.sqrt(cosine), 4)
    return results


def _gemini_similarities(query: str, documents: dict[str, str]) -> dict[str, float]:
    """Gemini embedding path. Lazy import; raises on any failure so the
    caller can fall back to TF-IDF (degradation matrix, rule §8)."""
    import google.generativeai as genai  # noqa: PLC0415 — lazy on purpose

    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    ids = list(documents)
    texts = [query] + [documents[i] for i in ids]
    vectors = [
        genai.embed_content(model=GEMINI_EMBEDDING_MODEL, content=t)["embedding"]
        for t in texts
    ]
    return {
        profile_id: round(max(0.0, _cosine(vectors[0], vec)), 4)
        for profile_id, vec in zip(ids, vectors[1:])
    }


def semantic_similarities(query: str, documents: dict[str, str]) -> dict[str, float]:
    """Cosine similarity in [0, 1] per document id. Never raises: a broken
    embedding service must not break matching (rule §8)."""
    if os.environ.get("GEMINI_API_KEY"):
        try:
            return _gemini_similarities(query, documents)
        except Exception:
            pass  # TF-IDF fallback below — results stay authoritative
    return _tfidf_similarities(query, documents)
