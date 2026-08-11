// Single API layer — components never call fetch directly (rule §2).
// Error contract: throws { code, message } — message already localized by
// the backend for domain errors; network failures map to err_network.

import { t } from "./i18n";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

async function post(path, body, lang) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw { code: "err_network", message: t(lang, "err_network") };
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw {
      code: data?.code || "unknownError",
      message: data?.message || t(lang, "unknownError"),
      missingFields: data?.missing_fields || [],
    };
  }
  return data;
}

async function get(path, lang) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`);
  } catch {
    throw { code: "err_network", message: t(lang, "err_network") };
  }
  if (!res.ok) {
    throw { code: "unknownError", message: t(lang, "unknownError") };
  }
  return res.json();
}

export function extractChallenge(text, lang) {
  return post("/api/extract", { text, lang }, lang);
}

export function matchChallenge(challenge, weights, lang) {
  return post("/api/match", { challenge, weights }, lang);
}

export function fetchReference(lang) {
  return get("/api/reference", lang);
}
