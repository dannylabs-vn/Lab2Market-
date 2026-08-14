// Single i18n dictionary — ALL user-visible strings live here (rule §9),
// including localized text for every explanation key the engine emits.
// VI is default.

export const DICT = {
  vi: {
    appTitle: "Lab2Market",
    tagline: "Từ bài toán R&D doanh nghiệp đến đúng đối tác nghiên cứu Tiến sĩ — có giải thích, có kiểm chứng.",
    trustSlogan: "Đừng tin AI. Hãy kiểm chứng AI.",
    langToggle: "EN",

    // Navigation
    navHome: "Trang chủ",
    navMatch: "Ghép đôi AI",
    navDirectory: "Danh bạ Lab",
    navAnalysis: "Ma trận TRL",
    navChecklist: "Hồ sơ LOI",
    navCompare: "So sánh",
    startMatching: "Ghép đôi ngay",

    // Hero
    hero_t1: "Ghép đôi bài toán R&D với",
    hero_t2: "Đúng Lab nghiên cứu Tiến sĩ",
    hero_tw: [
      "Đúng Lab nghiên cứu Tiến sĩ",
      "Tiến sĩ công nghiệp (Industrial PhD)",
      "Giải pháp R&D kiểm chứng TRL",
      "Hợp tác chuyên gia đại học",
    ],
    hero_sub: "Hệ thống hỗ trợ ra quyết định (DSS) với công thức MCDA thuần túy xác định, mô phỏng trọng số trực tiếp và Lớp Tin cậy 5 cấp độ.",
    inputPlaceholder: "Mô tả bài toán R&D của doanh nghiệp (ví dụ: Cần ứng dụng AI xử lý ngôn ngữ tiếng Việt để làm chatbot chăm sóc khách hàng trong 24 tháng, đã có prototype...)",
    ph_tw: [
      "Công ty chúng tôi cần tối ưu quy trình sản xuất bằng AI Vision...",
      "Doanh nghiệp muốn phát triển kit xét nghiệm y sinh trong 18 tháng...",
      "Chúng tôi cần tiến sĩ hướng dẫn đề tài vật liệu nano thương mại hóa...",
    ],
    submitText: "Phân tích thử thách",
    analyzing: "Đang phân tích bài toán…",
    exampleLabel: "Thử ví dụ thực tế:",
    example1: "Công ty chúng tôi muốn ứng dụng AI xử lý ngôn ngữ tiếng Việt để xây dựng chatbot chăm sóc khách hàng. Chúng tôi đã có mẫu thử prototype, cần nâng lên hệ thống thương mại trong 24 tháng, mong muốn hợp tác theo mô hình tiến sĩ công nghiệp.",
    example2: "Nhà máy của chúng tôi muốn tự động hóa khâu kiểm tra chất lượng bằng robot. Hiện đang chạy thí điểm pilot, cần hoàn thiện trong 12 tháng, ưu tiên hợp tác tư vấn.",
    example3: "We are developing a rapid diagnostics test for infectious disease. We have lab proof of concept and need clinical-grade validation within 18 months, looking for a research partnership.",
    mockNotice: "Chế độ demo: trích xuất giả lập (không cần API key) — mọi trường vẫn chờ bạn xác nhận.",
    errorTitle: "Có lỗi xảy ra",
    retry: "Thử lại",
    startOver: "Bắt đầu lại",
    policyBadge: "Nghị quyết 57-NQ/TW & 71/NQ-CP",
    socialProof: "Phục vụ đề án 1.000 Tiến sĩ đổi mới sáng tạo & liên kết Ba Nhà",

    // Trust Marquee
    trust: "Đồng hành cùng các viện nghiên cứu & trường đại học trọng điểm",

    // Domain Picker
    domainsTitle: "Lĩnh vực đổi mới trọng tâm",
    domainsSub: "Kết nối bài toán công nghiệp theo các nhóm công nghệ chiến lược quốc gia",
    viewDomainLabs: "Xem các lab",

    // Directory
    dirTitle: "Danh bạ Viện - Trường & Phòng thí nghiệm",
    dirSub: "Khám phá các phòng thí nghiệm, giảng viên hướng dẫn và năng lực TRL sẵn sàng hợp tác",
    allDomains: "Tất cả lĩnh vực",
    searchPlaceholder: "Tìm theo tên lab, viện trường, từ khóa chuyên môn...",
    colLab: "Phòng nghiên cứu / Chuyên gia",
    colDomain: "Lĩnh vực",
    colTRL: "Khoảng TRL",
    colOutputs: "Công bố / Bằng sáng chế",
    colTrend: "Chỉ số phù hợp",
    colAction: "Thao tác",
    actionMatch: "Ghép đôi",
    actionCompare: "So sánh",
    inCompare: "Đã chọn",

    // Why Bento
    whyTag: "Tại sao chọn Lab2Market",
    whyTitle: "Kiến trúc minh bạch tuyệt đối cho hợp tác Viện - Doanh nghiệp",
    whySub: "Không dùng AI để quyết định thay con người. AI trích xuất thông tin, engine thuần túy sở hữu mọi con số.",
    bento1Badge: "Engine độc lập",
    bento1Title: "100% Thuần túy & Xác định",
    bento1Desc: "Công thức MCDA chuẩn hóa, không phụ thuộc LLM. Cùng một bài toán và trọng số luôn cho ra kết quả xếp hạng giống hệt nhau.",
    bento2Badge: "Lớp tin cậy",
    bento2Title: "Hệ thống Provenance 5 lớp",
    bento2Desc: "Mỗi điểm số, nguồn dữ liệu và suy luận đều được gắn nhãn nguồn gốc rõ ràng (Tính toán kiểm chứng, Nguồn trích dẫn, Dữ liệu người dùng, AI suy luận, Bạn xác nhận).",
    bento3Badge: "Mô phỏng tức thì",
    bento3Title: "Bộ mô phỏng trọng số What-If",
    bento3Desc: "Thay đổi mức độ ưu tiên theo tiến độ, ngân sách hoặc chuyên môn để quan sát bảng xếp hạng cập nhật thời gian thực.",
    bento4Badge: "Thể chế & Pháp lý",
    bento4Title: "Chuẩn hóa theo Nghị quyết 57-NQ/TW",
    bento4Desc: "Hỗ trợ mô hình Tiến sĩ công nghiệp, giải quyết bài toán đặt hàng từ doanh nghiệp và bảo vệ quyền sở hữu trí tuệ (IP).",

    // How It Works
    howTag: "Quy trình 4 bước",
    howTitle: "Từ bài toán thực tế đến hợp tác nghiên cứu",
    how1Title: "1. Mô tả ngôn ngữ tự nhiên",
    how1Desc: "Nhập bài toán R&D của doanh nghiệp bằng tiếng Việt hoặc tiếng Anh không cần cấu trúc phức tạp.",
    how2Title: "2. Kiểm tra suy luận AI",
    how2Desc: "AI đề xuất lĩnh vực, mức TRL và thời gian. Bạn có toàn quyền chỉnh sửa và xác nhận dữ liệu.",
    how3Title: "3. Lọc ràng buộc & Tính điểm",
    how3Desc: "Engine lọc ràng buộc cứng TRL/thời gian và tính toán độ tương đồng ngữ nghĩa bằng ma trận MCDA.",
    how4Title: "4. Điều chỉnh & Ký kết LOI",
    how4Desc: "Kéo thanh trượt trọng số để chọn lab tối ưu nhất và xuất biên bản ghi nhớ hợp tác (LOI).",

    // Manifesto
    manifestoTitle: "Tuyên ngôn: Đừng tin AI. Hãy kiểm chứng AI.",
    manifestoText: "Trong các quyết định đầu tư R&D trị giá hàng tỷ đồng, doanh nghiệp không thể đặt niềm tin vào chiếc hộp đen AI. Lab2Market xây dựng ranh giới thép: Trí tuệ nhân tạo chỉ đóng vai trò trợ lý trích xuất văn bản, trong khi toàn bộ việc lọc, chấm điểm và xếp hạng hoàn toàn thuộc về Engine thuật toán minh bạch.",

    // Value Band
    val1Num: "100%",
    val1Lab: "Thuần túy & Tái lập",
    val2Num: "5 Lớp",
    val2Lab: "Nhãn nguồn gốc Provenance",
    val3Num: "1–9",
    val3Lab: "Chuẩn hóa thang đo TRL",
    val4Num: "Top 4",
    val4Lab: "Lĩnh vực công nghệ mũi nhọn",

    // Step 2: Extracted Card
    step2Title: "Kiểm tra và xác nhận thông tin bài toán",
    step2Hint: "AI chỉ đề xuất. Hãy sửa bất kỳ trường nào — trường bạn chạm vào sẽ chuyển sang trạng thái “Bạn đã xác nhận”.",
    missingHint: "Còn thiếu trường bắt buộc — vui lòng bổ sung trước khi ghép đôi.",
    confirmButton: "Xác nhận & Tìm đối tác",
    matching: "Đang tính toán ghép đôi…",
    backToEdit: "Chỉnh sửa thông tin",
    field_domain: "Lĩnh vực công nghệ",
    field_trl_current: "TRL hiện tại của doanh nghiệp",
    field_trl_target: "TRL mục tiêu cần đạt",
    field_timeline_months: "Thời gian dự kiến (tháng)",
    field_involvement_preference: "Mô hình hợp tác mong muốn",
    field_raw_text: "Mô tả bài toán gốc của bạn",
    selectPlaceholder: "— Chọn —",

    // Step 3: Match Report
    step3Title: "Đối tác nghiên cứu Tiến sĩ được đề xuất",
    scoreLabel: "Điểm tổng hợp MCDA",
    breakdownTitle: "Chi tiết điểm theo tiêu chí",
    strengthsTitle: "Điểm mạnh phù hợp",
    risksTitle: "Rủi ro cần lưu ý",
    actionTitle: "Hành động đề xuất",
    rejectedTitle: "Hồ sơ không vượt qua ràng buộc cứng",
    noMatches: "Chưa có đối tác vượt qua ràng buộc cứng TRL hoặc tiến độ.",
    profilesAsOf: "Dữ liệu hồ sơ nghiên cứu cập nhật tháng",
    generateLOI: "Tạo dự thảo LOI hợp tác",

    // Weights Simulator
    weightsTitle: "Bộ mô phỏng trọng số What-If",
    weightsHint: "Kéo thanh trượt — bảng xếp hạng đối tác sẽ tính toán và sắp xếp lại tức thì.",
    criterion_semantic: "Nội dung nghiên cứu",
    criterion_domain: "Đúng chuyên ngành",
    criterion_trl: "Độ phủ TRL",
    criterion_timeline: "Tiến độ khả thi",
    criterion_involvement: "Mô hình hợp tác",
    weightsZeroHint: "Tất cả trọng số đang ở mức 0 — hệ thống đang dùng bộ trọng số mặc định chuẩn hóa (35/25/15/15/10).",

    // TRL Analysis View
    analysisTitle: "Ma trận khả thi TRL & Tiến độ",
    analysisSub: "Đánh giá mức độ rủi ro khi nâng cấp công nghệ từ phòng thí nghiệm ra thị trường",
    trlGapLabel: "Khoảng cách cấp độ TRL",
    timelineRatioLabel: "Tỷ lệ thời gian Lab / Doanh nghiệp",
    tierRobust: "KHẢ THI CAO (ROBUST)",
    tierViable: "KHẢ THI CÓ ĐIỀU KIỆN (VIABLE)",
    tierTight: "RỦI RO TIẾN ĐỘ (TIGHT)",
    tierInfeasible: "KHÔNG KHẢ THI (INFEASIBLE)",
    analysisAdvice: "Khuyến nghị lộ trình:",

    // Checklist View
    checklistTitle: "Bộ hồ sơ & Thủ tục hợp tác Viện - Doanh nghiệp",
    checklistSub: "Danh mục tài liệu chuẩn hóa theo quy định đào tạo Tiến sĩ công nghiệp",
    checkDoc1: "Thư bày tỏ ý định hợp tác (Letter of Intent - LOI)",
    checkDoc2: "Thỏa thuận bảo mật thông tin (NDA)",
    checkDoc3: "Thỏa thuận phân chia quyền sở hữu trí tuệ (IP Agreement)",
    checkDoc4: "Đề cương nghiên cứu giải quyết bài toán doanh nghiệp",
    checkDoc5: "Hợp đồng đồng hướng dẫn nghiên cứu sinh (Co-supervision Contract)",

    // Compare
    compareTitle: "So sánh đối tác nghiên cứu",
    compareSub: "Đối chiếu năng lực TRL, công bố và điểm số MCDA giữa các lab",
    compareBarSelected: "đối tác đã chọn để so sánh",
    btnViewCompare: "Mở bảng so sánh",
    btnClearCompare: "Xóa tất cả",
    closeModal: "Đóng",

    // Provenance Classes
    prov_VERIFIED_CALCULATION: "Tính toán kiểm chứng",
    prov_CITED_SOURCE: "Nguồn trích dẫn",
    prov_USER_PROVIDED_DATA: "Dữ liệu bạn nhập",
    prov_AI_INFERENCE: "AI suy luận",
    prov_USER_CONFIRMED_DATA: "Bạn đã xác nhận",
    provLegendTitle: "Lớp tin cậy (Trust Layer) — Mọi con số đều minh bạch nguồn gốc",

    // Domains
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
    domain_materials: "Vật liệu tiên tiến",
    domain_quality_control: "Kiểm soát chất lượng",

    // Involvement
    inv_industrial_phd: "Tiến sĩ công nghiệp",
    inv_co_supervision: "Đồng hướng dẫn",
    inv_consulting: "Tư vấn kỹ thuật",
    inv_research_partnership: "Hợp tác nghiên cứu R&D",
    inv_none: "Không ưu tiên",

    // TRL Levels
    trl_1: "TRL 1 — Nguyên lý cơ bản được quan sát",
    trl_2: "TRL 2 — Khái niệm công nghệ được hình thành",
    trl_3: "TRL 3 — Chứng minh khái niệm thực nghiệm",
    trl_4: "TRL 4 — Kiểm chứng trong phòng thí nghiệm",
    trl_5: "TRL 5 — Kiểm chứng trong môi trường liên quan",
    trl_6: "TRL 6 — Trình diễn mẫu trong môi trường liên quan",
    trl_7: "TRL 7 — Trình diễn nguyên mẫu trong môi trường vận hành",
    trl_8: "TRL 8 — Hệ thống hoàn chỉnh và đạt chuẩn",
    trl_9: "TRL 9 — Hệ thống đã chứng minh vận hành thực tế",

    // Strengths & Risks (Engine keys)
    strength_semantic: "Nội dung nghiên cứu khớp {percent}% với bài toán",
    strength_domain: "Đúng chuyên môn mũi nhọn ({percent}%)",
    strength_trl: "Phủ tốt khoảng TRL yêu cầu ({percent}%)",
    strength_timeline: "Tiến độ phù hợp kỳ vọng ({percent}%)",
    strength_involvement: "Mô hình hợp tác đúng mong muốn ({percent}%)",
    risk_semantic: "Nội dung nghiên cứu chỉ khớp {percent}%",
    risk_domain: "Lệch chuyên môn trọng tâm ({percent}%)",
    risk_trl: "Phủ sóng TRL còn hạn chế ({percent}%)",
    risk_timeline: "Tiến độ thực hiện chưa lý tưởng ({percent}%)",
    risk_involvement: "Mô hình hợp tác chưa tối ưu ({percent}%)",
    risk_timeline_tight: "Lab cần tối thiểu {lab_months} tháng — doanh nghiệp có {months} tháng",
    risk_trl_wide: "Khoảng cách {gap} cấp TRL — cần lộ trình chia bậc",

    // Actions (Engine keys)
    action_phase_timeline: "Khuyến nghị: Chia mốc theo giai đoạn hoặc kéo dài tối thiểu {lab_months} tháng",
    action_trl_ladder: "Khuyến nghị: Lộ trình TRL từng bậc {current} → {target}, đánh giá qua từng cổng kiểm soát",
    action_involvement_alt: "Khuyến nghị: Cân nhắc mô hình khả dụng của lab: {offered}",
    action_proceed: "Khuyến nghị: Tiến hành ký Thư ý định (LOI) và đối chiếu kết quả nghiên cứu trước đây",
    action_review_top: "Có {count} đối tác phù hợp — xem xét chi tiết theo thứ tự điểm số",
    action_adjust_constraints: "Chưa có đối tác phù hợp — hãy nới lỏng ràng buộc: {reason}",

    // Rejections (Engine keys)
    reject_trl_below: "Lab dừng ở TRL {lab_trl_max}, chưa vượt mức hiện tại của bạn ({trl_current})",
    reject_trl_above: "Lab bắt đầu từ TRL {lab_trl_min}, vượt quá mục tiêu của bạn ({trl_target})",
    reject_timeline_ratio: "Thời gian điển hình {lab_months} tháng vượt {ratio}× kỳ vọng {months} tháng của bạn",

    // Errors
    err_network: "Không thể kết nối máy chủ. Vui lòng kiểm tra backend FastAPI.",
    unknownError: "Đã xảy ra lỗi không xác định.",

    // Testimonials
    testiTag: "Đánh giá từ cộng đồng",
    testiTitle: "Được tin cậy bởi các nhà khoa học và doanh nghiệp",
    testi1Text: "Lab2Market giúp doanh nghiệp chúng tôi tìm được đúng chuyên gia xử lý ngôn ngữ tiếng Việt tại ĐHQG chỉ trong vài phút, với sự minh bạch tuyệt đối về thang đo TRL.",
    testi1Author: "TS. Nguyễn Hoàng Nam",
    testi1Role: "Giám đốc R&D, Tập đoàn Công nghệ",
    testi2Text: "Mô hình Tiến sĩ công nghiệp cần sự rõ ràng về quyền tác giả và mốc tiến độ. Lớp Tin cậy của Lab2Market giải quyết hoàn toàn sự nghi ngại giữa Viện và Trường.",
    testi2Author: "PGS.TS. Trần Thị Minh",
    testi2Role: "Trưởng phòng Thí nghiệm Trí tuệ Nhân tạo",

    // FAQ
    faqTag: "Hỏi đáp thường gặp",
    faqTitle: "Giải đáp thắc mắc về nền tảng",
    faq1Q: "Lab2Market khác gì so với các sàn giao dịch công nghệ truyền thống?",
    faq1A: "Các sàn truyền thống chỉ là danh bạ tĩnh. Lab2Market là hệ thống hỗ trợ ra quyết định (DSS) sử dụng thuật toán MCDA xác định, cho phép doanh nghiệp điều chỉnh trọng số và kiểm chứng nguồn gốc từng dữ liệu theo 5 cấp độ tin cậy.",
    faq2Q: "Tại sao Lab2Market khẳng định AI không bao giờ chấm điểm hay quyết định?",
    faq2A: "Để tránh rủi ro ảo giác (hallucination) trong các quyết định kinh doanh quan trọng, LLM chỉ làm nhiệm vụ trích xuất ngôn ngữ tự nhiên. Toàn bộ phép tính, điểm số và thứ hạng do Engine toán học độc lập tính toán 100%.",
    faq3Q: "Nền tảng này hỗ trợ Nghị quyết 57-NQ/TW như thế nào?",
    faq3A: "Nghị quyết 57-NQ/TW nhấn mạnh phát triển thị trường công nghệ và liên kết Nhà nước - Nhà trường - Doanh nghiệp. Lab2Market cung cấp hạ tầng số minh bạch để hiện thực hóa việc đặt hàng đào tạo Tiến sĩ gắn với bài toán doanh nghiệp.",

    // Footer
    footerDesc: "Nền tảng hỗ trợ ra quyết định ghép đôi bài toán R&D doanh nghiệp với đối tác nghiên cứu Tiến sĩ công nghiệp tại Việt Nam.",
    footerCol1: "Nền tảng",
    footerCol2: "Công nghệ",
    footerCol3: "Thể chế & Chính sách",
    footerCopy: "© 2026 Lab2Market. Xây dựng cho AI Riser Vietnam 2026. Tuân thủ Nghị quyết 57-NQ/TW & 71/NQ-CP.",
  },

  en: {
    appTitle: "Lab2Market",
    tagline: "From business R&D challenges to the right PhD research partners — explainable and verifiable.",
    trustSlogan: "Don't trust the AI. Verify the AI.",
    langToggle: "VI",

    // Navigation
    navHome: "Home",
    navMatch: "AI Matcher",
    navDirectory: "Lab Directory",
    navAnalysis: "TRL Matrix",
    navChecklist: "LOI Checklist",
    navCompare: "Compare",
    startMatching: "Start Matching",

    // Hero
    hero_t1: "Match business R&D challenges with",
    hero_t2: "The Right PhD Research Labs",
    hero_tw: [
      "The Right PhD Research Labs",
      "Industrial PhD Programs",
      "TRL-Validated R&D Solutions",
      "University Faculty Experts",
    ],
    hero_sub: "A Decision Support System (DSS) with a pure deterministic MCDA engine, real-time What-If weight simulation, and a 5-tier Trust Layer.",
    inputPlaceholder: "Describe your company's R&D challenge (e.g. We want to apply Vietnamese NLP to build a customer care chatbot in 24 months, already have prototype...)",
    ph_tw: [
      "Our factory needs automated quality inspection with computer vision...",
      "Developing a rapid biomedical diagnostics test in 18 months...",
      "Seeking a faculty advisor for commercial nano-materials research...",
    ],
    submitText: "Analyze Challenge",
    analyzing: "Analyzing challenge…",
    exampleLabel: "Try real-world examples:",
    example1: "Our company wants to apply Vietnamese NLP to build a customer-care chatbot. We already have a prototype and need to scale to a commercial system within 24 months, seeking an Industrial PhD collaboration.",
    example2: "Our factory wants to automate quality inspection with robotics. Currently running a pilot, needing completion in 12 months, preferring consulting collaboration.",
    example3: "We are developing a rapid diagnostics test for infectious disease. We have lab proof of concept and need clinical-grade validation within 18 months, looking for a research partnership.",
    mockNotice: "Demo mode: mock extraction (no API key required) — all fields await your confirmation.",
    errorTitle: "Something went wrong",
    retry: "Retry",
    startOver: "Start over",
    policyBadge: "Resolution 57-NQ/TW & 71/NQ-CP",
    socialProof: "Powering the 1,000 Innovation PhDs Scheme & Triple-Helix Linkage",

    // Trust Marquee
    trust: "Partnering with Vietnam's Leading Universities & Research Institutes",

    // Domain Picker
    domainsTitle: "Focus Innovation Domains",
    domainsSub: "Connecting industrial needs across national strategic technology sectors",
    viewDomainLabs: "View research labs",

    // Directory
    dirTitle: "University Labs & Faculty Directory",
    dirSub: "Explore research laboratories, principal investigators, and TRL capabilities ready for partnership",
    allDomains: "All Domains",
    searchPlaceholder: "Search by lab name, university, expertise keywords...",
    colLab: "Research Lab / Lead Scientist",
    colDomain: "Domain",
    colTRL: "TRL Span",
    colOutputs: "Papers / Patents",
    colTrend: "Match Fit",
    colAction: "Action",
    actionMatch: "Match",
    actionCompare: "Compare",
    inCompare: "Selected",

    // Why Bento
    whyTag: "Why Lab2Market",
    whyTitle: "Uncompromising Transparency for University–Industry R&D",
    whySub: "We never let AI make decisions for humans. AI extracts inputs; a pure deterministic engine owns every calculation.",
    bento1Badge: "Independent Engine",
    bento1Title: "100% Pure & Deterministic",
    bento1Desc: "Standardized MCDA formulas with zero LLM calculation. Identical inputs and weights always produce identical rankings.",
    bento2Badge: "Trust Layer",
    bento2Title: "5-Tier Provenance Taxonomy",
    bento2Desc: "Every score, data point, and inference carries an explicit provenance tag (Verified Calculation, Cited Source, User Input, AI Inference, User Confirmed).",
    bento3Badge: "Instant Simulation",
    bento3Title: "What-If Weight Simulator",
    bento3Desc: "Adjust priority sliders for timeline, budget, or expertise and watch the partner ranking reorder live in real time.",
    bento4Badge: "Policy Grounding",
    bento4Title: "Aligned with Resolution 57-NQ/TW",
    bento4Desc: "Structured for Industrial PhD training, enterprise-commissioned research, and clear Intellectual Property (IP) sharing.",

    // How It Works
    howTag: "4-Step Workflow",
    howTitle: "From Industrial Problem to Research Partnership",
    how1Title: "1. Natural Language Input",
    how1Desc: "Describe your R&D challenge in plain Vietnamese or English without needing complex forms.",
    how2Title: "2. Verify AI Inferences",
    how2Desc: "AI extracts domain, TRL span, and timeline. You have full control to edit and confirm every field.",
    how3Title: "3. Filter Constraints & Score",
    how3Desc: "The deterministic engine applies hard TRL/timeline windows and computes multi-criteria MCDA scores.",
    how4Title: "4. Simulate & Draft LOI",
    how4Desc: "Adjust weight sliders to find your optimal partner and generate a formal Letter of Intent (LOI).",

    // Manifesto
    manifestoTitle: "Manifesto: Don't Trust the AI. Verify the AI.",
    manifestoText: "In multi-million dollar R&D investments, enterprises cannot rely on a black-box AI. Lab2Market establishes a strict boundary: the LLM only assists with text parsing, while all filtering, scoring, and ranking are executed by a pure mathematical engine.",

    // Value Band
    val1Num: "100%",
    val1Lab: "Pure & Reproducible",
    val2Num: "5 Tiers",
    val2Lab: "Provenance Trust Layer",
    val3Num: "1–9",
    val3Lab: "Standardized TRL Span",
    val4Num: "Top 4",
    val4Lab: "Strategic Tech Domains",

    // Step 2: Extracted Card
    step2Title: "Review and Confirm Challenge Parameters",
    step2Hint: "The AI only suggests. Edit any field — fields you touch immediately switch to “You Confirmed”.",
    missingHint: "Required fields are missing — please complete them before matching.",
    confirmButton: "Confirm & Find Partners",
    matching: "Computing optimal matches…",
    backToEdit: "Edit details",
    field_domain: "Technology Domain",
    field_trl_current: "Current Company TRL",
    field_trl_target: "Target TRL",
    field_timeline_months: "Timeline (months)",
    field_involvement_preference: "Preferred Collaboration Model",
    field_raw_text: "Your Original Description",
    selectPlaceholder: "— Select —",

    // Step 3: Match Report
    step3Title: "Recommended PhD Research Partners",
    scoreLabel: "Overall MCDA Score",
    breakdownTitle: "Score Breakdown by Criterion",
    strengthsTitle: "Identified Strengths",
    risksTitle: "Potential Risks",
    actionTitle: "Recommended Action",
    rejectedTitle: "Excluded Profiles (Hard Constraint Failures)",
    noMatches: "No partner passed the hard TRL or timeline constraints.",
    profilesAsOf: "Illustrative profile registry data as of",
    generateLOI: "Draft Partnership LOI",

    // Weights Simulator
    weightsTitle: "What-If Weight Simulator",
    weightsHint: "Drag sliders to re-calculate and re-order the partner ranking in real time.",
    criterion_semantic: "Semantic Content",
    criterion_domain: "Domain Alignment",
    criterion_trl: "TRL Coverage",
    criterion_timeline: "Timeline Fit",
    criterion_involvement: "Collaboration Model",
    weightsZeroHint: "All weights are at 0 — engine fell back to paper-default normalized weights (35/25/15/15/10).",

    // TRL Analysis View
    analysisTitle: "TRL & Timeline Feasibility Matrix",
    analysisSub: "Evaluate technology readiness transition risks from laboratory validation to market commercialization",
    trlGapLabel: "TRL Level Gap",
    timelineRatioLabel: "Lab / Enterprise Timeline Ratio",
    tierRobust: "HIGHLY FEASIBLE (ROBUST)",
    tierViable: "CONDITIONALLY VIABLE",
    tierTight: "TIMELINE RISK (TIGHT)",
    tierInfeasible: "INFEASIBLE",
    analysisAdvice: "Roadmap Recommendation:",

    // Checklist View
    checklistTitle: "University–Industry Partnership Checklist",
    checklistSub: "Standardized document requirements for Industrial PhD and corporate R&D agreements",
    checkDoc1: "Letter of Intent (LOI)",
    checkDoc2: "Non-Disclosure Agreement (NDA)",
    checkDoc3: "Intellectual Property Sharing Agreement (IP Agreement)",
    checkDoc4: "R&D Project Proposal & Milestones",
    checkDoc5: "PhD Co-supervision Contract",

    // Compare
    compareTitle: "Compare Research Partners",
    compareSub: "Side-by-side analysis of TRL spans, publications, and MCDA criterion scores",
    compareBarSelected: "partners selected for comparison",
    btnViewCompare: "Open Comparison",
    btnClearCompare: "Clear All",
    closeModal: "Close",

    // Provenance Classes
    prov_VERIFIED_CALCULATION: "Verified Calculation",
    prov_CITED_SOURCE: "Cited Source",
    prov_USER_PROVIDED_DATA: "You Provided",
    prov_AI_INFERENCE: "AI Inference",
    prov_USER_CONFIRMED_DATA: "You Confirmed",
    provLegendTitle: "Trust Layer — Every number declares its exact origin",

    // Domains
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
    domain_materials: "Advanced Materials",
    domain_quality_control: "Quality Control",

    // Involvement
    inv_industrial_phd: "Industrial PhD",
    inv_co_supervision: "Co-supervision",
    inv_consulting: "Technical Consulting",
    inv_research_partnership: "R&D Partnership",
    inv_none: "No preference",

    // TRL Levels
    trl_1: "TRL 1 — Basic principles observed",
    trl_2: "TRL 2 — Technology concept formulated",
    trl_3: "TRL 3 — Experimental proof of concept",
    trl_4: "TRL 4 — Technology validated in lab",
    trl_5: "TRL 5 — Technology validated in relevant environment",
    trl_6: "TRL 6 — Technology demonstrated in relevant environment",
    trl_7: "TRL 7 — Prototype demonstration in operational environment",
    trl_8: "TRL 8 — System complete and qualified",
    trl_9: "TRL 9 — Actual system proven in operational environment",

    // Strengths & Risks (Engine keys)
    strength_semantic: "Research content matches {percent}% of the challenge",
    strength_domain: "Core domain expertise match ({percent}%)",
    strength_trl: "Strong coverage of required TRL span ({percent}%)",
    strength_timeline: "Timeline meets expectations ({percent}%)",
    strength_involvement: "Preferred collaboration model available ({percent}%)",
    risk_semantic: "Research content matches only {percent}%",
    risk_domain: "Outside core research domain ({percent}%)",
    risk_trl: "Limited TRL coverage ({percent}%)",
    risk_timeline: "Timeline is not ideal ({percent}%)",
    risk_involvement: "Collaboration model mismatch ({percent}%)",
    risk_timeline_tight: "Lab typically needs {lab_months} months — enterprise has {months} months",
    risk_trl_wide: "{gap}-level TRL gap — phased milestones required",

    // Actions (Engine keys)
    action_phase_timeline: "Propose: Phased milestones or extend timeline to at least {lab_months} months",
    action_trl_ladder: "Propose: Phased TRL ladder {current} → {target} with stage-gate reviews",
    action_involvement_alt: "Propose: Consider available lab models: {offered}",
    action_proceed: "Propose: Proceed to Letter of Intent (LOI) and review prior collaboration references",
    action_review_top: "{count} suitable partners found — review by ranked score order",
    action_adjust_constraints: "No suitable partner yet — consider relaxing main constraint: {reason}",

    // Rejections (Engine keys)
    reject_trl_below: "Lab coverage stops at TRL {lab_trl_max}, below your current level ({trl_current})",
    reject_trl_above: "Lab research begins at TRL {lab_trl_min}, past your target ({trl_target})",
    reject_timeline_ratio: "Typical duration {lab_months} months exceeds {ratio}× your {months}-month timeline",

    // Errors
    err_network: "Cannot reach server. Please ensure the backend is running.",
    unknownError: "An unknown error occurred.",

    // Testimonials
    testiTag: "Community Endorsements",
    testiTitle: "Trusted by Leading Scientists & Enterprise R&D Directors",
    testi1Text: "Lab2Market allowed us to find the exact Vietnamese NLP researchers at VNU in minutes, with complete transparency on their TRL capabilities.",
    testi1Author: "Dr. Hoang Nam Nguyen",
    testi1Role: "R&D Director, Tech Enterprise",
    testi2Text: "Industrial PhD collaborations require clear IP terms and realistic timelines. Lab2Market's Trust Layer removes ambiguity between universities and industry.",
    testi2Author: "Assoc. Prof. Minh Tran",
    testi2Role: "Head of AI Laboratory",

    // FAQ
    faqTag: "Câu Hỏi Thường Gặp",
    faqTitle: "Mọi Điều Bạn Cần Biết",
    faq1Q: "Lab2Market khác gì so với cổng thông tin chuyển giao công nghệ truyền thống?",
    faq1A: "Các cổng truyền thống chỉ là danh bạ tĩnh. Lab2Market là Hệ thống Hỗ trợ Ra quyết định (DSS) sử dụng MCDA xác định hoàn toàn, cho phép điều chỉnh trọng số trực tiếp và gắn nhãn xuất xứ 5 tầng minh bạch.",
    faq2Q: "Tại sao Lab2Market đảm bảo AI không bao giờ tính toán hay chấm điểm?",
    faq2A: "Để ngăn chặn ảo giác (hallucination) trong các quyết định R&D có rủi ro cao, LLM bị giới hạn chỉ trích xuất văn bản. Mọi lọc, chấm điểm và xếp hạng được tính 100% bởi một động cơ toán học độc lập.",
    faq3Q: "Hệ thống này liên kết thế nào với Nghị quyết 57-NQ/TW của Việt Nam?",
    faq3A: "Nghị quyết 57 yêu cầu đổi mới sáng tạo do doanh nghiệp dẫn dắt và liên kết Ba Nhà. Lab2Market cung cấp hạ tầng ghép đôi kỹ thuật số minh bạch để thực hiện đào tạo tiến sĩ công nghiệp do doanh nghiệp đặt hàng.",
    faq4Q: "Dữ liệu hồ sơ Lab từ đâu và độ tin cậy như thế nào?",
    faq4A: "Hồ sơ Lab được tổng hợp từ website trường đại học, cơ sở dữ liệu Scopus/WoS, và báo cáo nghiên cứu công khai. Mỗi trường được gắn thẻ xuất xứ (Verified/Cited/User/AI/Confirmed) để người dùng kiểm chứng độc lập.",

    // Footer
    footerDesc: "Decision Support System for matching corporate R&D challenges with doctoral research partners in Vietnam.",
    footerCol1: "Platform",
    footerCol2: "Technology",
    footerCol3: "Policy & Framework",
    footerCopy: "© 2026 Lab2Market. Built for AI Riser Vietnam 2026. Aligned with Resolution 57-NQ/TW & 71/NQ-CP.",
  },
};

/**
 * Look up a key in the active language, falling back to VI, then to key itself.
 */
export function t(lang, key, params = {}) {
  const table = DICT[lang] || DICT.vi;
  let text = table[key] ?? DICT.vi[key] ?? key;
  if (typeof text !== "string") return text;
  for (const [name, value] of Object.entries(params)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}
