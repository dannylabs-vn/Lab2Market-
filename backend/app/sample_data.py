"""Seed registry: PhD research partner profiles + domain taxonomy.

ILLUSTRATIVE DATA for demonstration — institutions and people are
representative, not verified real-world records. As-of dated below.
Firestore replaces this list later as a data provider at the API layer
(rule §10); the engine never reads this module directly.
"""

from app.models import InvolvementType, ResearchProfile

PROFILES_AS_OF = "2026-08"

# Domain taxonomy — CITED SOURCE class (curated reference data).
# group key -> subdomain keys. Used by the engine's domain criterion.
DOMAIN_TAXONOMY: dict[str, list[str]] = {
    "artificial_intelligence": [
        "machine_learning",
        "natural_language_processing",
        "computer_vision",
        "data_science",
    ],
    "biomedical": [
        "biotechnology",
        "pharmaceuticals",
        "medical_devices",
        "diagnostics",
    ],
    "manufacturing": [
        "robotics",
        "automation",
        "materials",
        "quality_control",
    ],
}


def resolve_domain(domain_key: str | None) -> tuple[str | None, str | None]:
    """Map a domain key to (group, subdomain). Accepts either level.

    Returns (None, None) for unknown keys — callers treat that as the
    weakest domain signal rather than an error (extraction is untrusted
    until confirmed, but the engine stays total over its inputs).
    """
    if not domain_key:
        return None, None
    if domain_key in DOMAIN_TAXONOMY:
        return domain_key, None
    for group, subs in DOMAIN_TAXONOMY.items():
        if domain_key in subs:
            return group, domain_key
    return None, None


SAMPLE_PROFILES: list[ResearchProfile] = [
    ResearchProfile(
        id="phd-ai-nlp-01",
        name="Dr. Nguyễn Minh Anh",
        institution="Trường Đại học Bách Khoa — ĐHQG TP.HCM",
        department="Khoa Khoa học và Kỹ thuật Máy tính",
        domain_group="artificial_intelligence",
        subdomains=["machine_learning", "natural_language_processing"],
        trl_min=2,
        trl_max=5,
        typical_duration_months=36,
        involvement_types=[
            InvolvementType.INDUSTRIAL_PHD,
            InvolvementType.RESEARCH_PARTNERSHIP,
        ],
        abstract=(
            "Nghiên cứu mô hình ngôn ngữ lớn cho tiếng Việt: xử lý ngôn ngữ "
            "tự nhiên, trích xuất thông tin, phân loại văn bản, chatbot doanh "
            "nghiệp. Large language models, NLP, text mining, machine learning "
            "for low-resource languages."
        ),
        keywords=["nlp", "llm", "tiếng việt", "text mining", "machine learning"],
    ),
    ResearchProfile(
        id="phd-ai-cv-02",
        name="Dr. Trần Quốc Bảo",
        institution="Đại học Bách Khoa Hà Nội",
        department="Viện Trí tuệ nhân tạo",
        domain_group="artificial_intelligence",
        subdomains=["computer_vision", "machine_learning"],
        trl_min=4,
        trl_max=7,
        typical_duration_months=24,
        involvement_types=[
            InvolvementType.INDUSTRIAL_PHD,
            InvolvementType.CONSULTING,
        ],
        abstract=(
            "Thị giác máy tính ứng dụng cho kiểm tra chất lượng công nghiệp: "
            "phát hiện lỗi sản phẩm, nhận diện hình ảnh, deep learning trên "
            "dây chuyền sản xuất. Applied computer vision, defect detection, "
            "image recognition, industrial AI pilot deployment."
        ),
        keywords=["computer vision", "thị giác máy", "defect detection", "deep learning"],
    ),
    ResearchProfile(
        id="phd-bio-03",
        name="Dr. Lê Thị Cẩm",
        institution="Trường Đại học Y Hà Nội",
        department="Khoa Dược",
        domain_group="biomedical",
        subdomains=["pharmaceuticals", "diagnostics"],
        trl_min=3,
        trl_max=6,
        typical_duration_months=36,
        involvement_types=[
            InvolvementType.CO_SUPERVISION,
            InvolvementType.RESEARCH_PARTNERSHIP,
        ],
        abstract=(
            "Hệ thống vận chuyển thuốc nano và chẩn đoán nhanh: nano drug "
            "delivery, sinh học phân tử, phát triển dược phẩm, thử nghiệm in "
            "vitro. Biomedical research, pharmaceuticals, rapid diagnostics."
        ),
        keywords=["drug delivery", "dược phẩm", "nano", "diagnostics", "chẩn đoán"],
    ),
    ResearchProfile(
        id="phd-mfg-04",
        name="Dr. Phạm Đức Duy",
        institution="Trường Đại học Sư phạm Kỹ thuật TP.HCM",
        department="Khoa Cơ khí Chế tạo máy",
        domain_group="manufacturing",
        subdomains=["robotics", "automation"],
        trl_min=5,
        trl_max=8,
        typical_duration_months=18,
        involvement_types=[
            InvolvementType.CONSULTING,
            InvolvementType.RESEARCH_PARTNERSHIP,
        ],
        abstract=(
            "Robot công nghiệp và tự động hóa dây chuyền sản xuất: robotics, "
            "automation, tối ưu quy trình nhà máy, hệ thống điều khiển, đã "
            "triển khai pilot tại doanh nghiệp. Smart factory, production line."
        ),
        keywords=["robotics", "automation", "tự động hóa", "smart factory", "sản xuất"],
    ),
]
