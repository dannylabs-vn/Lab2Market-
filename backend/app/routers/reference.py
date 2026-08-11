"""GET /api/reference — the taxonomy/scale keys the frontend needs to
render selects. KEYS ONLY: every human-readable label is frontend i18n
(rule §9), so this endpoint stays language-neutral and the backend remains
the single source of truth for valid values.
"""

from fastapi import APIRouter

from app.models import InvolvementType
from app.prompts.extraction_prompts import TRL_GUIDE
from app.sample_data import DOMAIN_TAXONOMY, PROFILES_AS_OF

router = APIRouter(prefix="/api", tags=["reference"])


@router.get("/reference")
def get_reference():
    return {
        "domain_taxonomy": DOMAIN_TAXONOMY,
        "trl_levels": sorted(TRL_GUIDE.keys()),
        "involvement_types": [t.value for t in InvolvementType],
        "profiles_as_of": PROFILES_AS_OF,
    }
