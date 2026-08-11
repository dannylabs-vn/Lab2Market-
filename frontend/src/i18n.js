// Single i18n dictionary — ALL user-visible strings live here (rule §9),
// including the localized text for every explanation key the engine emits.
// Backend ships keys + params; this file owns the prose. VI is default.

export const DICT = {
  vi: {
    appTitle: "Lab2Market",
    tagline:
      "Từ bài toán doanh nghiệp đến đúng đối tác nghiên cứu — có giải thích, có kiểm chứng.",
    trustSlogan: "Đừng tin AI. Hãy kiểm chứng AI.",
    langToggle: "EN",

    step1Title: "Mô tả thử thách R&D của bạn",
    step1Hint:
      "Viết bằng ngôn ngữ tự nhiên (tiếng Việt hoặc English). AI chỉ trích xuất thông tin — mọi con số do engine xác định tính toán.",
    inputPlaceholder:
      "Ví dụ: Công ty chúng tôi muốn ứng dụng AI xử lý ngôn ngữ tiếng Việt để xây dựng chatbot chăm sóc khách hàng…",
    submitText: "Phân tích thử thách",
    analyzing: "Đang phân tích…",
    exampleLabel: "Thử một ví dụ:",
    example1:
      "Công ty chúng tôi muốn ứng dụng AI xử lý ngôn ngữ tiếng Việt để xây dựng chatbot chăm sóc khách hàng. Chúng tôi đã có mẫu thử prototype, cần nâng lên hệ thống thương mại trong 24 tháng, mong muốn hợp tác theo mô hình tiến sĩ công nghiệp.",
    example2:
      "Nhà máy của chúng tôi muốn tự động hóa khâu kiểm tra chất lượng bằng robot. Hiện đang chạy thí điểm pilot, cần hoàn thiện trong 12 tháng, ưu tiên hợp tác tư vấn.",
    example3:
      "We are developing a rapid diagnostics test for infectious disease. We have lab proof of concept and need clinical-grade validation within 18 months, looking for a research partnership.",
    mockNotice:
      "Chế độ demo: trích xuất giả lập (không cần API key) — mọi trường vẫn chờ bạn xác nhận.",
    errorTitle: "Có lỗi xảy ra",
    retry: "Thử lại",
    startOver: "Bắt đầu lại",

    step2Title: "Kiểm tra và xác nhận thông tin",
    step2Hint:
      "AI chỉ đề xuất. Hãy sửa bất kỳ trường nào — trường bạn chạm vào sẽ chuyển sang “Bạn đã xác nhận”.",
    missingHint:
      "Còn thiếu trường bắt buộc — vui lòng bổ sung trước khi ghép đôi.",
    confirmButton: "Xác nhận & tìm đối tác",
    matching: "Đang ghép đôi…",
    backToEdit: "Chỉnh sửa thông tin",

    field_domain: "Lĩnh vực",
    field_trl_current: "TRL hiện tại",
    field_trl_target: "TRL mục tiêu",
    field_timeline_months: "Thứời gian (tháng)",
    field_involvement_preference: "Mô hình hợp tác",
    field_raw_text: "Mô tả gốc của bạn",
    selectPlaceholder: "— Chọn —",

    prov_VERIFIED_CALCULATION: "Tính toán kiểm chứng",
    prov_CITED_SOURCE: "Nguồn trích dẫn",
    prov_USER_PROVIDED_DATA: "Dữ liệu bạn nhập",
    prov_AI_INFERENCE: "AI suy luận",
    prov_USER_CONFIRMED_DATA: "Bạn đã xác nhận",
    provLegendTitle: "Lớp tin cậy — mỗi thông tin đều ghi rõ nguồn gốc",

    step3Title: "Đối tác nghiên cứu được đề xuất",
    scoreLabel: "Điểm tổng",
    breakdownTitle: "Chi tiết điểm theo tiêu chí",
    strengthsTitle: "Điểm mạnh",
    risksTitle: "Rủi ro",
    actionTitle: "Hành động đề xuất",
    rejectedTitle: "Hồ sơ bị loại (kèm lý do)",
    noMatches: "Chưa có đối tác vượt qua ràng buộc cứng.",
    profilesAsOf: "Dữ liệu hồ sơ minh họa, cập nhật",

    weightsTitle: "Mô phỏng trọng số",
    weightsHint:
      "Kéo thanh trượt — xếp hạng cập nhật tức thì bằng chính công thức MCDA của engine.",
    criterion_semantic: "Ngữ nghĩa",
    criterion_domain: "Lĩnh vực",
    criterion_trl: "TRL",
    criterion_timeline: "Tiến độ",
    criterion_involvement: "Hợp tác",

    domain_artificial_intelligence: "Trí tuệ nhân tạo",
    domain_machine_learning: "Học máy",
    domain_natural_language_processing: "Xử lý ngôn ngữ tự nhiên",
    domain_computer_vision: "Thị giác máy tính",
    domain_data_science: "Khoa học dữ liệu",
    domain_biomedical: "Y sinh",
    domain_biotechnology: "Công nghệ sinh học",
    domain_pharmaceuticals: "Dược phẩm",
    domain_medical_devices: "Thiết bị y tế",
    domain_diagnostics: "Chẩn đoán",
    domain_manufacturing: "Sản xuất / Chế tạo",
    domain_robotics: "Robot công nghiệp",
    domain_automation: "Tự động hóa",
    domain_materials: "Vật liệu",
    domain_quality_control: "Kiểm soát chất lượng",

    inv_industrial_phd: "Tiến sĩ công nghiệp",
    inv_co_supervision: "Đồng hướng dẫn",
    inv_consulting: "Tư vấn",
    inv_research_partnership: "Hợp tác nghiên cứu",
    inv_none: "Không ưu tiên",

    trl_1: "1 — Nguyên lý cơ bản được quan sát",
    trl_2: "2 — Hình thành khái niệm công nghệ",
    trl_3: "3 — Chứng minh khái niệm thực nghiệm",
    trl_4: "4 — Kiểm chứng trong phòng thí nghiệm",
    trl_5: "5 — Kiểm chứng trong môi trường liên quan",
    trl_6: "6 — Trình diễn trong môi trường liên quan",
    trl_7: "7 — Trình diễn nguyên mẫu trong môi trường vận hành",
    trl_8: "8 — Hệ thống hoàn chỉnh và đạt chuẩn",
    trl_9: "9 — Hệ thống đã chứng minh vận hành thực tế",

    strength_semantic: "Nội dung nghiên cứu khớp {percent}% với thử thách",
    strength_domain: "Đúng chuyên môn lĩnh vực ({percent}%)",
    strength_trl: "Phủ tốt khoảng TRL cần thiết ({percent}%)",
    strength_timeline: "Tiến độ phù hợp ({percent}%)",
    strength_involvement: "Mô hình hợp tác đúng mong muốn ({percent}%)",
    risk_semantic: "Nội dung nghiên cứu chỉ khớp {percent}%",
    risk_domain: "Lệch chuyên môn ({percent}%)",
    risk_trl: "Phủ sóng TRL còn hạn chế ({percent}%)",
    risk_timeline: "Tiến độ không lý tưởng ({percent}%)",
    risk_involvement: "Mô hình hợp tác chưa khớp ({percent}%)",
    risk_timeline_tight:
      "Phòng nghiên cứu thường cần {lab_months} tháng — bạn có {months} tháng",
    risk_trl_wide: "Khoảng cách {gap} cấp TRL — cần lộ trình theo giai đoạn",

    action_phase_timeline:
      "Đề xuất: chia mốc theo giai đoạn hoặc kéo dài tối thiểu {lab_months} tháng",
    action_trl_ladder:
      "Đề xuất: lộ trình TRL từng bậc {current} → {target}, đánh giá qua từng cấp",
    action_involvement_alt:
      "Đề xuất: cân nhắc mô hình phòng nghiên cứu sẵn có: {offered}",
    action_proceed:
      "Đề xuất: tiến tới thư ý định hướng (LOI) và yêu cầu hồ sơ hợp tác trước đây",
    action_review_top: "{count} đối tác phù hợp — xem xét từ trên xuống",
    action_adjust_constraints:
      "Chưa có đối tác phù hợp — hãy nới ràng buộc chính: {reason}",

    reject_trl_below:
      "Phòng nghiên cứu dừng ở TRL {lab_trl_max}, chưa vượt mức hiện tại ({trl_current})",
    reject_trl_above:
      "Nghiên cứu bắt đầu từ TRL {lab_trl_min}, vượt xa mục tiêu ({trl_target})",
    reject_timeline_ratio:
      "Thờiu gian điển hình {lab_months} tháng vượt {ratio}× tiến độ {months} tháng của bạn",

    err_network: "Không kết nối được máy chủ. Kiểm tra backend đang chạy.",
    unknownError: "Đã xảy ra lỗi không xác định.",
  },

  en: {
    appTitle: "Lab2Market",
    tagline:
      "From a business problem to the right PhD research partner — explainable and verifiable.",
    trustSlogan: "Don't trust the AI. Verify the AI.",
    langToggle: "VI",

    step1Title: "Describe your R&D challenge",
    step1Hint:
      "Write in natural language (Vietnamese or English). The AI only extracts information — every number is computed by the deterministic engine.",
    inputPlaceholder:
      "E.g. Our company wants to apply Vietnamese NLP to build a customer-care chatbot…",
    submitText: "Analyze challenge",
    analyzing: "Analyzing…",
    exampleLabel: "Try an example:",
    example1:
      "Công ty chúng tôi muốn ứng dụng AI xử lý ngôn ngữ tiếng Việt để xây dựng chatbot chăm sóc khách hàng. Chúng tôi đã có mẫu thử prototype, cần nâng lên hệ thống thương mại trong 24 tháng, mong muốn hợp tác theo mô hình tiến sĩ công nghiệp.",
    example2:
      "Nhà máy của chúng tôi muốn tự động hóa khâu kiểm tra chất lượng bằng robot. Hiện đang chạy thí điểm pilot, cần hoàn thiện trong 12 tháng, ưu tiên hợp tác tư vấn.",
    example3:
      "We are developing a rapid diagnostics test for infectious disease. We have lab proof of concept and need clinical-grade validation within 18 months, looking for a research partnership.",
    mockNotice:
      "Demo mode: mock extraction (no API key needed) — every field still awaits your confirmation.",
    errorTitle: "Something went wrong",
    retry: "Retry",
    startOver: "Start over",

    step2Title: "Review and confirm the details",
    step2Hint:
      "The AI only proposes. Edit any field — a field you touch switches to “You confirmed”.",
    missingHint:
      "Required fields are still missing — please complete them before matching.",
    confirmButton: "Confirm & find partners",
    matching: "Matching…",
    backToEdit: "Edit details",

    field_domain: "Domain",
    field_trl_current: "Current TRL",
    field_trl_target: "Target TRL",
    field_timeline_months: "Timeline (months)",
    field_involvement_preference: "Collaboration model",
    field_raw_text: "Your original description",
    selectPlaceholder: "— Select —",

    prov_VERIFIED_CALCULATION: "Verified calculation",
    prov_CITED_SOURCE: "Cited source",
    prov_USER_PROVIDED_DATA: "You provided",
    prov_AI_INFERENCE: "AI inference",
    prov_USER_CONFIRMED_DATA: "You confirmed",
    provLegendTitle: "Trust layer — every element declares its origin",

    step3Title: "Recommended research partners",
    scoreLabel: "Overall score",
    breakdownTitle: "Score breakdown by criterion",
    strengthsTitle: "Strengths",
    risksTitle: "Risks",
    actionTitle: "Recommended action",
    rejectedTitle: "Filtered out (with reasons)",
    noMatches: "No partner passed the hard constraints.",
    profilesAsOf: "Illustrative profile data, as of",

    weightsTitle: "Weight simulator",
    weightsHint:
      "Drag a slider — the ranking updates instantly using the engine's exact MCDA formula.",
    criterion_semantic: "Semantic",
    criterion_domain: "Domain",
    criterion_trl: "TRL",
    criterion_timeline: "Timeline",
    criterion_involvement: "Involvement",

    domain_artificial_intelligence: "Artificial Intelligence",
    domain_machine_learning: "Machine Learning",
    domain_natural_language_processing: "Natural Language Processing",
    domain_computer_vision: "Computer Vision",
    domain_data_science: "Data Science",
    domain_biomedical: "Biomedical",
    domain_biotechnology: "Biotechnology",
    domain_pharmaceuticals: "Pharmaceuticals",
    domain_medical_devices: "Medical Devices",
    domain_diagnostics: "Diagnostics",
    domain_manufacturing: "Manufacturing",
    domain_robotics: "Robotics",
    domain_automation: "Automation",
    domain_materials: "Materials",
    domain_quality_control: "Quality Control",

    inv_industrial_phd: "Industrial PhD",
    inv_co_supervision: "Co-supervision",
    inv_consulting: "Consulting",
    inv_research_partnership: "Research partnership",
    inv_none: "No preference",

    trl_1: "1 — Basic principles observed",
    trl_2: "2 — Technology concept formulated",
    trl_3: "3 — Experimental proof of concept",
    trl_4: "4 — Technology validated in lab",
    trl_5: "5 — Technology validated in relevant environment",
    trl_6: "6 — Technology demonstrated in relevant environment",
    trl_7: "7 — Prototype demonstration in operational environment",
    trl_8: "8 — System complete and qualified",
    trl_9: "9 — Actual system proven in operational environment",

    strength_semantic: "Research content matches {percent}% of the challenge",
    strength_domain: "Exact domain expertise ({percent}%)",
    strength_trl: "Strong coverage of the required TRL span ({percent}%)",
    strength_timeline: "Timeline fits well ({percent}%)",
    strength_involvement: "Preferred collaboration model offered ({percent}%)",
    risk_semantic: "Research content matches only {percent}%",
    risk_domain: "Outside the core expertise ({percent}%)",
    risk_trl: "Limited TRL coverage ({percent}%)",
    risk_timeline: "Timeline is not ideal ({percent}%)",
    risk_involvement: "Collaboration model mismatch ({percent}%)",
    risk_timeline_tight:
      "Lab typically needs {lab_months} months — you have {months}",
    risk_trl_wide: "{gap}-level TRL gap — a phased roadmap is required",

    action_phase_timeline:
      "Propose: phased milestones, or extend to at least {lab_months} months",
    action_trl_ladder:
      "Propose: a TRL ladder {current} → {target} with gate reviews per level",
    action_involvement_alt:
      "Propose: consider the lab's available models: {offered}",
    action_proceed:
      "Propose: move to a letter of intent (LOI) and request prior collaboration references",
    action_review_top: "{count} suitable partners — review from the top down",
    action_adjust_constraints:
      "No suitable partner yet — relax the main constraint: {reason}",

    reject_trl_below:
      "Lab coverage stops at TRL {lab_trl_max}, not beyond your current level ({trl_current})",
    reject_trl_above:
      "Research starts at TRL {lab_trl_min}, far past your target ({trl_target})",
    reject_timeline_ratio:
      "Typical duration {lab_months} months is {ratio}× your {months}-month timeline",

    err_network: "Cannot reach the server. Check that the backend is running.",
    unknownError: "An unknown error occurred.",
  },
};

/**
 * Look up a key in the active language, falling back to VI, then to the key
 * itself (a missing key must never render blank). Interpolates {params}.
 */
export function t(lang, key, params = {}) {
  const table = DICT[lang] || DICT.vi;
  let text = table[key] ?? DICT.vi[key] ?? key;
  for (const [name, value] of Object.entries(params)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}
