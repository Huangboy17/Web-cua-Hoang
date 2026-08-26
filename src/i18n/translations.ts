import { Language } from './types';

export interface Translations {
  // Navigation
  nav: {
    bio: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
    exportCV: string;
    cms: string;
    admin: string;
    cloudSynced: string;
    connectingCloud: string;
    availableBadge: string;
  };

  // Hero Section
  hero: {
    statusOpen: string;
    statusBusy: string;
    greeting: string;
    titleSuffix: string;
    heroDesc: string;
    ctaProjects: string;
    ctaContact: string;
    ctaExportCV: string;
    copyEmail: string;
    copyPhone: string;
    copied: string;
    yearsExp: string;
    yearsExpSub: string;
    projectsDone: string;
    projectsDoneSub: string;
    costOptimized: string;
    costOptimizedSub: string;
    activeApps: string;
    activeAppsSub: string;
    domainTitle: string;
    domainSubtitle: string;
    specialtiesTitle: string;
  };

  // Projects Section
  projects: {
    badge: string;
    title: string;
    title1: string;
    title2: string;
    titleHighlight: string;
    subtitle: string;
    noticeText: string;
    noticeHighlight: string;
    qualityNote: string;
    manageBtn: string;
    allCategories: string;
    searchPlaceholder: string;
    viewLiveDemo: string;
    openLiveDirect: string;
    viewDetails: string;
    githubCode: string;
    viewGitHub: string;
    featuredBadge: string;
    featured: string;
    costImpactLabel: string;
    demoAccountLabel: string;
    demoAccount: string;
    viewPassword: string;
    filterCount: string;
    filterAll: string;
    noProjects: string;
    noProjectsSub: string;
    draftBadge: string;
    liveBadge: string;
    copyLink: string;
  };

  // Experience Section
  experience: {
    badge: string;
    title: string;
    title1: string;
    title2: string;
    titleHighlight: string;
    subtitle: string;
    tabWork: string;
    tabEducation: string;
    tabCertifications: string;
    tabCertificates: string;
    keyAchievements: string;
    mainResponsibilities: string;
    verifiedCert: string;
    showMore: string;
    showLess: string;
    issuer: string;
    issueDate: string;
    exportCV: string;
    draftBadge: string;
    tasksTitle: string;
    majorLabel: string;
    certTitle: string;
    issuerLabel: string;
    credentialIdLabel: string;
  };

  // Project Modal
  projectModal: {
    closeModal: string;
    liveAppBadge: string;
    yearLabel: string;
    openWebAppNow: string;
    demoAccountTitle: string;
    demoAccountNote: string;
    usernameLabel: string;
    passwordLabel: string;
    overviewTitle: string;
    roleTitle: string;
    roleDesc: string;
    featuresTitle: string;
    techStackTitle: string;
    copiedLink: string;
    copyLinkBtn: string;
    githubRepo: string;
    openWebAppDirect: string;
  };

  // Common UI & Floating Bars
  common: {
    adminActive: string;
    enterCMS: string;
    logout: string;
    readyToConnect: string;
    webApps: string;
    exportCV: string;
    emailCopied: string;
    emailLabel: string;
    contact: string;
    synced: string;
    syncing: string;
    switchToLight: string;
    switchToDark: string;
    languageLabel: string;
  };

  // Skills Section
  skills: {
    badge: string;
    title: string;
    title1: string;
    title2: string;
    titleHighlight: string;
    subtitle: string;
    kpiConstruction: string;
    kpiConstructionSub: string;
    kpiTech: string;
    kpiTechSub: string;
    kpiData: string;
    kpiDataSub: string;
    kpiAi: string;
    kpiAiSub: string;
    card1Title: string;
    card1Subtitle: string;
    card1Count: string;
    card2Title: string;
    card2Subtitle: string;
    card2Count: string;
    diffBadge: string;
    diffTitle: string;
    diffDesc: string;
    diffPillar1Title: string;
    diffPillar1Desc: string;
    diffPillar2Title: string;
    diffPillar2Desc: string;
    diffPillar3Title: string;
    diffPillar3Desc: string;
    diffPillar4Title: string;
    diffPillar4Desc: string;
    toolsTitle: string;
    toolsSubtitle: string;
    toolsCount: string;
  };

  // Contact Section
  contact: {
    badge: string;
    title: string;
    title1: string;
    title2: string;
    titleHighlight: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    formName: string;
    fieldName: string;
    fieldCompany: string;
    fieldEmail: string;
    fieldTopic: string;
    fieldMessage: string;
    placeholderMessage: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
    formSending: string;
    formSuccess: string;
    formError: string;
    sentSuccess: string;
    sentSuccessSub: string;
    sending: string;
    btnSubmit: string;
    emailOfficial: string;
    phoneZalo: string;
    workArea: string;
    callDirect: string;
    sendEmailNow: string;
    copy: string;
    copied: string;
    quickInfo: string;
    responseTime: string;
    scheduleCall: string;
  };

  // Export CV Modal
  exportCV: {
    title: string;
    badge: string;
    subtitle: string;
    tabA4PDF: string;
    tabText: string;
    tabSummary: string;
    tabHtml: string;
    downloadPDF: string;
    downloadHTML: string;
    downloadHtml: string;
    copyText: string;
    copiedText: string;
    copiedTextCV: string;
    copySummary: string;
    copiedSummary: string;
    exportingPDF: string;
    printA4: string;
    close: string;
    customization: string;
    avatarCheckbox: string;
    allProjectsCheckbox: string;
    allProjectsCheck: string;
  };

  // Footer
  footer: {
    tagline: string;
    quickLinks: string;
    copyright: string;
    backToTop: string;
    allRights: string;
    designedFor: string;
    recruiters: string;
  };
}

export const translations: Record<Language, Translations> = {
  // VIETNAMESE (Tiếng Việt)
  vi: {
    nav: {
      bio: 'Giới Thiệu',
      projects: 'Web Apps Nổi Bật',
      experience: 'Kinh Nghiệm',
      skills: 'Kỹ Năng & Công Cụ',
      contact: 'Liên Hệ',
      exportCV: 'Xuất CV (PDF/In)',
      cms: 'Quản Trị CMS',
      admin: 'Admin',
      cloudSynced: 'Đã đồng bộ Google Cloud Firestore',
      connectingCloud: 'Đang kết nối Cloud...',
      availableBadge: 'Sẵn sàng nhận việc',
    },
    hero: {
      statusOpen: 'Sẵn sàng kết nối • Open to Connect',
      statusBusy: 'Đang thực hiện dự án • In Project',
      greeting: 'KỸ SƯ KINH TẾ XÂY DỰNG & WEB APP DEVELOPER',
      titleSuffix: 'Chuyên Gia Quản Lý Chi Phí & Tự Động Hóa Số',
      heroDesc: 'Hơn 6 năm kinh nghiệm thực chiến trong Quản lý Chi phí, Dự toán, Hợp đồng & Đấu thầu; tiên phong phát triển các Web Apps & giải pháp AI chuyên ngành tối ưu quy trình và ngân sách xây dựng.',
      ctaProjects: 'Khám Phá Web Apps',
      ctaContact: 'Liên Hệ Hợp Tác',
      ctaExportCV: 'Tải Hồ Sơ / Xuất CV',
      copyEmail: 'Sao chép Email',
      copyPhone: 'Sao chép SĐT',
      copied: 'Đã sao chép!',
      yearsExp: '6+ Năm',
      yearsExpSub: 'Kinh nghiệm KTXD & Hợp đồng',
      projectsDone: '5+ Apps',
      projectsDoneSub: 'Hệ thống Web App thực chiến',
      costOptimized: '30%+',
      costOptimizedSub: 'Tối ưu thời gian bóc tách & soát giá',
      activeApps: '100%',
      activeAppsSub: 'Dự án có Demo & UX hoàn chỉnh',
      domainTitle: 'LĨNH VỰC HOẠT ĐỘNG CHÍNH',
      domainSubtitle: 'Kết hợp Kỹ thuật Kinh tế & Công nghệ Số',
      specialtiesTitle: 'NĂNG LỰC CỐT LÕI',
    },
    projects: {
      badge: '✨ HỆ THỐNG SẢN PHẨM SỐ ĐÃ PHÁT TRIỂN',
      title: 'Hệ Thống Web Apps &',
      title1: 'Hệ Thống Web Apps',
      title2: 'Giải Pháp Số',
      titleHighlight: 'Giải Pháp Số',
      subtitle: 'Các ứng dụng thực tế giải quyết bài toán Quản lý Chi phí, Bóc tách Dự toán, Báo cáo Dòng tiền & Tự động hóa bằng AI.',
      noticeText: 'Mỗi sản phẩm đều được tối ưu hiệu năng cao, responsive trên mọi thiết bị và có sẵn tài khoản mẫu (Demo Account).',
      noticeHighlight: 'Kiểm tra UX & Mã Nguồn:',
      qualityNote: 'Mỗi sản phẩm đều được tối ưu hiệu năng cao, responsive trên mọi thiết bị và có sẵn tài khoản mẫu.',
      manageBtn: '+ Quản Lý Danh Sách App',
      allCategories: 'Tất Cả Dự Án',
      searchPlaceholder: 'Tìm kiếm theo tên app, công nghệ, bài toán chi phí...',
      viewLiveDemo: 'Trải Nghiệm Live Demo',
      openLiveDirect: 'Mở Trực Tiếp',
      viewDetails: 'Xem Chi Tiết Giải Pháp',
      githubCode: 'Mã Nguồn / Repository',
      viewGitHub: 'Xem GitHub',
      featuredBadge: 'Dự Án Tiêu Biểu',
      featured: 'Tiêu biểu',
      costImpactLabel: 'Hiệu quả mang lại:',
      demoAccountLabel: 'Tài khoản trải nghiệm:',
      demoAccount: 'Tài khoản mẫu:',
      viewPassword: 'Xem mật khẩu',
      filterCount: 'sản phẩm',
      filterAll: 'Tất Cả',
      noProjects: 'Không tìm thấy ứng dụng phù hợp',
      noProjectsSub: 'Vui lòng thử tìm kiếm bằng từ khóa khác hoặc chọn danh mục khác.',
      draftBadge: 'Bản Nháp (Ẩn)',
      liveBadge: 'Trực Tuyến (Active)',
      copyLink: 'Sao chép link',
    },
    experience: {
      badge: '💼 HÀNH TRÌNH CHUYÊN MÔN',
      title: 'Kinh Nghiệm &',
      title1: 'Kinh Nghiệm',
      title2: 'Thực Chiến',
      titleHighlight: 'Năng Lực Thực Chiến',
      subtitle: '6 năm cống hiến tại các Chủ đầu tư & Tổng công ty lớn trong quản lý chi phí, ngân sách, TMĐT và tiên phong ứng dụng AI tự động hóa.',
      tabWork: 'Chủ Đầu Tư & Doanh Nghiệp',
      tabEducation: 'Học Vấn & Bằng Cấp',
      tabCertifications: 'Chứng Chỉ Hành Nghề',
      tabCertificates: 'Chứng Chỉ Hành Nghề',
      keyAchievements: 'Thành Tựu Nổi Bật',
      mainResponsibilities: 'Trách Nhiệm & Nhiệm Vụ Chính',
      verifiedCert: 'Chứng chỉ hợp lệ Bộ Xây Dựng',
      showMore: 'Xem thêm kinh nghiệm',
      showLess: 'Thu gọn bớt',
      issuer: 'Cấp bởi',
      issueDate: 'Thời gian',
      exportCV: 'Xuất Hồ Sơ CV Đầy Đủ (PDF)',
      draftBadge: 'Bản nháp',
      tasksTitle: 'Nhiệm vụ & Trọng trách chính:',
      majorLabel: 'Chuyên ngành:',
      certTitle: 'Chứng Chỉ Hành Nghề Chuyên Môn',
      issuerLabel: 'Đơn vị cấp:',
      credentialIdLabel: 'Mã hiệu / ID:',
    },
    projectModal: {
      closeModal: 'Đóng cửa sổ',
      liveAppBadge: 'Live Web App',
      yearLabel: 'Năm',
      openWebAppNow: 'Trải Nghiệm Trực Tiếp Web App',
      demoAccountTitle: 'Tài Khoản Mẫu Trải Nghiệm Thử Nghiệm',
      demoAccountNote: 'Đăng nhập bằng thông tin trên để kiểm tra toàn bộ tính năng phân quyền.',
      usernameLabel: 'Tài khoản / Email:',
      passwordLabel: 'Mật khẩu:',
      overviewTitle: 'Tổng Quan Giải Pháp & Bài Toán Chi Phí',
      roleTitle: 'Vai trò & Trách nhiệm:',
      roleDesc: 'Tác giả & Nhà phát triển độc lập (Full-stack)',
      featuresTitle: 'Tính Năng & Năng Lực Nổi Bật',
      techStackTitle: 'Công Nghệ & Kiến Trúc Áp Dụng',
      copiedLink: 'Đã sao chép link app!',
      copyLinkBtn: 'Sao chép link',
      githubRepo: 'Xem Mã Nguồn GitHub',
      openWebAppDirect: 'Mở Trực Tiếp Trên Tab Mới',
    },
    common: {
      adminActive: 'Chế Độ Quản Trị Viên (Admin Active)',
      enterCMS: 'Vào Bảng Điều Khiển CMS',
      logout: 'Đăng xuất',
      readyToConnect: 'Sẵn sàng kết nối',
      webApps: 'Web Apps',
      exportCV: 'Xuất CV',
      emailCopied: 'Đã chép Email!',
      emailLabel: 'Email:',
      contact: 'Liên Hệ',
      synced: 'Đã đồng bộ',
      syncing: 'Đang kết nối Cloud...',
      switchToLight: 'Chuyển sang giao diện sáng',
      switchToDark: 'Chuyển sang giao diện tối',
      languageLabel: 'Chọn ngôn ngữ',
    },
    skills: {
      badge: '✨ NĂNG LỰC CHUYÊN MÔN & CÔNG NGHỆ',
      title: 'Kỹ Năng',
      title1: 'Kỹ Năng & ',
      title2: 'Công Cụ Làm Việc',
      titleHighlight: 'Công Cụ Làm Việc',
      subtitle: 'Kết hợp chuyên môn Kinh tế Xây dựng thực chiến với Quản lý Chi phí, Hợp đồng, Data và AI Automation.',
      kpiConstruction: 'Năng lực chuyên môn',
      kpiConstructionSub: 'KTXD, Chi phí & Hợp đồng',
      kpiTech: 'Năng lực công nghệ',
      kpiTechSub: 'AI & Digital Automation',
      kpiData: 'Data & Excel Nâng Cao',
      kpiDataSub: 'Power Query & Báo cáo số',
      kpiAi: 'AI & Automation',
      kpiAiSub: 'LLM, Gemini & Web Apps',
      card1Title: 'KINH TẾ XÂY DỰNG & QUẢN LÝ CHI PHÍ',
      card1Subtitle: 'Nền tảng chuyên môn cốt lõi',
      card1Count: '07 NĂNG LỰC CỐT LÕI',
      card2Title: 'AI & DIGITAL AUTOMATION',
      card2Subtitle: 'Công nghệ hỗ trợ tự động hóa công việc',
      card2Count: '05 NĂNG LỰC CÔNG NGHỆ',
      diffBadge: 'PROFESSIONAL DIFFERENTIATOR',
      diffTitle: 'Construction Economics × Data × AI Automation',
      diffDesc: 'Ứng dụng AI, Data và Web App để chuẩn hóa dữ liệu, tự động hóa quy trình và nâng cao hiệu quả quản lý Chi phí – Hợp đồng – Báo cáo dự án.',
      diffPillar1Title: 'Chuẩn Hóa Dữ Liệu & Định Mức',
      diffPillar1Desc: 'Số hóa cơ sở dữ liệu định mức nội bộ doanh nghiệp & liên kết dữ liệu G8/F1 phục vụ tra cứu tức thì.',
      diffPillar2Title: 'Tự Động Bóc Tách & Đối Soát',
      diffPillar2Desc: 'Ứng dụng LLM & OCR bóc tách bảng khối lượng, phát hiện sai lệch đơn giá dự toán trong vài giây.',
      diffPillar3Title: 'Quản Trị Chi Phí Real-time',
      diffPillar3Desc: 'Theo dõi dòng tiền, kiểm soát hạn mức giải ngân và phân tích độ nhạy đầu tư (NPV, IRR) trực quan.',
      diffPillar4Title: 'Web Apps Chuyên Nghiệp',
      diffPillar4Desc: 'Tự chủ phát triển các phần mềm nội bộ chuyên ngành tối ưu chi phí & nâng cao năng suất cho Chủ Đầu Tư.',
      toolsTitle: 'TOOLS & TECHNOLOGIES',
      toolsSubtitle: 'Hệ thống công cụ chuyên ngành, nền tảng số hóa và công nghệ lập trình thực tế',
      toolsCount: 'Công Cụ & Frameworks',
    },
    contact: {
      badge: '📫 KẾT NỐI & TRAO ĐỔI',
      title: 'Liên Hệ &',
      title1: 'Sẵn Sàng Hợp Tác',
      title2: 'Cùng Bạn',
      titleHighlight: 'Hợp Tác',
      subtitle: 'Tôi luôn sẵn sàng trao đổi về các cơ hội hợp tác, dự án Quản lý Chi phí - Hợp đồng hoặc phát triển ứng dụng Tự động hóa & AI.',
      formTitle: 'Gửi Lời Nhắn Trực Tiếp',
      formSubtitle: 'Lời nhắn của bạn sẽ được lưu trực tiếp vào hộp thư Google Cloud và gửi email thông báo tới Bùi Việt Hoàng.',
      formName: 'Họ và tên của bạn',
      fieldName: 'Họ và Tên / Người liên hệ',
      fieldCompany: 'Công Ty / Đơn Vị Công Tác',
      fieldEmail: 'Email Của Bạn',
      fieldTopic: 'Chủ Đề / Vị Trí Trao Đổi',
      fieldMessage: 'Nội dung trao đổi / Lời nhắn',
      placeholderMessage: 'Nhập nội dung bạn muốn trao đổi hoặc hợp tác...',
      formEmail: 'Địa chỉ Email',
      formPhone: 'Số điện thoại',
      formSubject: 'Chủ đề trao đổi',
      formMessage: 'Nội dung tin nhắn...',
      formSubmit: 'Gửi Tin Nhắn Ngay',
      formSending: 'Đang gửi...',
      formSuccess: 'Đã gửi thành công! Tôi sẽ phản hồi sớm nhất.',
      formError: 'Có lỗi xảy ra khi gửi. Vui lòng thử lại!',
      sentSuccess: 'Đã gửi tin nhắn thành công!',
      sentSuccessSub: 'Cảm ơn bạn đã để lại thông tin liên hệ. Tôi sẽ phản hồi lại bạn trong thời gian sớm nhất.',
      sending: 'Đang Gửi Lời Nhắn...',
      btnSubmit: 'Gửi Lời Nhắn Đến',
      emailOfficial: 'Email chính thức',
      phoneZalo: 'Điện thoại / Zalo',
      workArea: 'Khu vực làm việc',
      callDirect: 'Gọi Trực Tiếp',
      sendEmailNow: 'Gửi Email Ngay',
      copy: 'Sao chép',
      copied: 'Đã chép',
      quickInfo: 'Thông Tin Liên Hệ Nhanh',
      responseTime: 'Phản hồi trong vòng 2-4 giờ làm việc',
      scheduleCall: 'Đặt Lịch Trao Đổi Trực Tuyến',
    },
    exportCV: {
      title: 'Hồ Sơ CV Hoàn Chỉnh',
      badge: 'Chuẩn Báo Cáo Lãnh Đạo',
      subtitle: 'Tải trực tiếp file PDF, xuất file HTML độc lập hoặc in A4 chuẩn sắc nét.',
      tabA4PDF: 'Xuất PDF Chuẩn A4',
      tabText: 'Văn Bản Rút Gọn',
      tabSummary: 'Báo Cáo Tóm Tắt',
      tabHtml: 'File HTML Tự Chứa',
      downloadPDF: 'Tải File PDF (A4)',
      downloadHTML: 'Tải file HTML',
      downloadHtml: 'Tải Bản HTML (.html)',
      copyText: 'Chép Text/Markdown',
      copiedText: 'Đã sao chép vào bộ nhớ tạm!',
      copiedTextCV: 'Đã sao chép Text CV',
      copySummary: 'Chép Tóm Tắt Gửi Sếp',
      copiedSummary: 'Đã chép tóm tắt!',
      exportingPDF: 'Đang tạo PDF...',
      printA4: 'In A4',
      close: 'Đóng',
      customization: 'Tùy chỉnh',
      avatarCheckbox: 'Ảnh thẻ Avatar',
      allProjectsCheckbox: 'Tất cả Web Apps',
      allProjectsCheck: 'Bao gồm toàn bộ tất cả Web Apps trong CV',
    },
    footer: {
      tagline: 'Kỹ Sư Kinh Tế Xây Dựng • Quản Lý Chi Phí & Hợp Đồng • Web App Developer',
      quickLinks: 'Liên Kết Nhanh',
      copyright: 'Bảo lưu mọi quyền.',
      backToTop: 'Đầu trang',
      allRights: 'Tất cả quyền được bảo lưu.',
      designedFor: 'Thiết kế tối ưu cho',
      recruiters: 'Nhà Tuyển Dụng (Tech Recruiters)',
    }
  },

  // ENGLISH
  en: {
    nav: {
      bio: 'About Me',
      projects: 'Web Applications',
      experience: 'Experience',
      skills: 'Skills & Stack',
      contact: 'Contact',
      exportCV: 'Export CV (PDF)',
      cms: 'CMS Admin',
      admin: 'Admin',
      cloudSynced: 'Synced with Google Cloud Firestore',
      connectingCloud: 'Connecting Cloud...',
      availableBadge: 'Open to Work',
    },
    hero: {
      statusOpen: 'Open to Connect • Relocation / Remote',
      statusBusy: 'Currently Working on Projects',
      greeting: 'CONSTRUCTION ECONOMIST & FULL-STACK WEB DEVELOPER',
      titleSuffix: 'Cost Management & AI Digital Automation Specialist',
      heroDesc: '6+ years of specialized experience in Cost Management, Quantity Surveying, Contracts & Procurement. Pioneer in building custom Enterprise Web Apps & AI tools to automate workflows and optimize budgets.',
      ctaProjects: 'Explore Web Apps',
      ctaContact: 'Contact & Hire',
      ctaExportCV: 'Export CV / Profile',
      copyEmail: 'Copy Email',
      copyPhone: 'Copy Phone',
      copied: 'Copied!',
      yearsExp: '6+ Years',
      yearsExpSub: 'Cost & Contract Management',
      projectsDone: '5+ Apps',
      projectsDoneSub: 'Production Web Applications',
      costOptimized: '30%+',
      costOptimizedSub: 'QS & Estimation Time Saved',
      activeApps: '100%',
      activeAppsSub: 'Live Interactive Demos',
      domainTitle: 'CORE DOMAINS',
      domainSubtitle: 'Construction Economics × Software Engineering',
      specialtiesTitle: 'KEY STRENGTHS',
    },
    projects: {
      badge: '✨ DEVELOPED SOFTWARE PRODUCTS',
      title: 'Web Apps &',
      title1: 'Web Apps &',
      title2: 'Digital Solutions',
      titleHighlight: 'Digital Solutions',
      subtitle: 'Production web apps solving real-world challenges in Quantity Surveying, Budgeting, Cashflow & AI-assisted Automation.',
      noticeText: 'All products feature high performance, full responsiveness, and sample guest demo credentials.',
      noticeHighlight: 'Inspect UX & Source Code:',
      qualityNote: 'Each product is fully responsive with live guest credentials and demo data.',
      manageBtn: '+ Manage App Catalog',
      allCategories: 'All Projects',
      searchPlaceholder: 'Search by app name, technology, or cost domain...',
      viewLiveDemo: 'Experience Live Demo',
      openLiveDirect: 'Open Live Demo',
      viewDetails: 'View Solution Details',
      githubCode: 'Source Code / Repository',
      viewGitHub: 'View GitHub',
      featuredBadge: 'Featured App',
      featured: 'Featured',
      costImpactLabel: 'Business Value:',
      demoAccountLabel: 'Sample Credentials:',
      demoAccount: 'Demo Account:',
      viewPassword: 'Show password',
      filterCount: 'products',
      filterAll: 'All',
      noProjects: 'No matching applications found',
      noProjectsSub: 'Please try searching with different keywords or switch categories.',
      draftBadge: 'Draft (Hidden)',
      liveBadge: 'Live & Active',
      copyLink: 'Copy URL',
    },
    experience: {
      badge: '💼 CAREER TIMELINE',
      title: 'Work Experience &',
      title1: 'Work Experience',
      title2: 'Track Record',
      titleHighlight: 'Core Competencies',
      subtitle: '6 years of experience across Real Estate Developers and Main Contractors in cost control, budget planning, and AI automation.',
      tabWork: 'Enterprises & Developers',
      tabEducation: 'Education & Degrees',
      tabCertifications: 'Professional Certifications',
      tabCertificates: 'Certificates',
      keyAchievements: 'Key Achievements',
      mainResponsibilities: 'Core Responsibilities',
      verifiedCert: 'Officially Verified Credentials',
      showMore: 'Show More Details',
      showLess: 'Show Less',
      issuer: 'Issued by',
      issueDate: 'Issued Date',
      exportCV: 'Export Complete CV (PDF)',
      draftBadge: 'Draft',
      tasksTitle: 'Key Responsibilities & Deliverables:',
      majorLabel: 'Major:',
      certTitle: 'Professional Practice Certifications',
      issuerLabel: 'Issuer:',
      credentialIdLabel: 'Credential ID:',
    },
    projectModal: {
      closeModal: 'Close Modal',
      liveAppBadge: 'Live Web App',
      yearLabel: 'Year',
      openWebAppNow: 'Launch Live Web App',
      demoAccountTitle: 'Demo Test Account Credentials',
      demoAccountNote: 'Sign in with these credentials to explore all role-based permissions and workflows.',
      usernameLabel: 'Username / Email:',
      passwordLabel: 'Password:',
      overviewTitle: 'Solution Overview & Business Case',
      roleTitle: 'Role & Scope:',
      roleDesc: 'Creator & Independent Full-Stack Engineer',
      featuresTitle: 'Key Features & Core Capabilities',
      techStackTitle: 'Technology Stack & Architecture',
      copiedLink: 'App link copied to clipboard!',
      copyLinkBtn: 'Copy Link',
      githubRepo: 'View GitHub Repository',
      openWebAppDirect: 'Open Directly in New Tab',
    },
    common: {
      adminActive: 'Admin Mode Active',
      enterCMS: 'Open CMS Dashboard',
      logout: 'Log out',
      readyToConnect: 'Open to Connect',
      webApps: 'Web Apps',
      exportCV: 'Export CV',
      emailCopied: 'Email copied!',
      emailLabel: 'Email:',
      contact: 'Contact',
      synced: 'Cloud Synced',
      syncing: 'Connecting Cloud...',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      languageLabel: 'Select language',
    },
    skills: {
      badge: '✨ EXPERTISE & TECHNOLOGY STACK',
      title: 'Skills &',
      title1: 'Skills & ',
      title2: 'Working Tools',
      titleHighlight: 'Technology Stack',
      subtitle: 'Combining hands-on Construction Economics with Cost & Contract Management, Advanced Data Modeling, and AI Automation.',
      kpiConstruction: 'Domain Expertise',
      kpiConstructionSub: 'Cost, QS & Contracts',
      kpiTech: 'Tech Capabilities',
      kpiTechSub: 'AI & Full-stack Automation',
      kpiData: 'Advanced Data & BI',
      kpiDataSub: 'Power Query & Modeling',
      kpiAi: 'AI & Automation',
      kpiAiSub: 'LLMs, Gemini & Web Apps',
      card1Title: 'CONSTRUCTION ECONOMICS & COST MANAGEMENT',
      card1Subtitle: 'Core Domain Foundation',
      card1Count: '07 CORE COMPETENCIES',
      card2Title: 'AI & DIGITAL AUTOMATION',
      card2Subtitle: 'Modern Workflow Acceleration',
      card2Count: '05 TECH CAPABILITIES',
      diffBadge: 'PROFESSIONAL DIFFERENTIATOR',
      diffTitle: 'Construction Economics × Data × AI Automation',
      diffDesc: 'Leveraging AI, modern data stacks, and web engineering to standardize cost benchmarks, automate auditing, and accelerate decision-making.',
      diffPillar1Title: 'Data & Norms Standardization',
      diffPillar1Desc: 'Digitizing corporate cost norms and integrating with G8/F1 databases for instant lookup.',
      diffPillar2Title: 'Automated Takeoff & Audit',
      diffPillar2Desc: 'Applying LLMs and OCR to extract quantities and highlight unit price variances in seconds.',
      diffPillar3Title: 'Real-time Cost Control',
      diffPillar3Desc: 'Tracking cash flows, monitoring disbursement limits, and running NPV/IRR sensitivity models.',
      diffPillar4Title: 'Custom Enterprise Web Apps',
      diffPillar4Desc: 'Developing domain-specific internal software to streamline operations and boost productivity.',
      toolsTitle: 'TOOLS & TECHNOLOGIES',
      toolsSubtitle: 'Industry-standard engineering software, data platforms, and full-stack development tools',
      toolsCount: 'Tools & Frameworks',
    },
    contact: {
      badge: '📫 GET IN TOUCH',
      title: 'Direct Contact &',
      title1: 'Ready for New',
      title2: 'Opportunities',
      titleHighlight: 'Collaboration',
      subtitle: 'Always open to discussing full-time opportunities, consulting engagements in Cost/Contract Management, or building AI solutions.',
      formTitle: 'Send a Direct Message',
      formSubtitle: 'Your message is saved securely to Google Cloud and instantly alerts Bui Viet Hoang via email.',
      formName: 'Your Full Name',
      fieldName: 'Full Name / Recruiter',
      fieldCompany: 'Company / Organization',
      fieldEmail: 'Your Work Email',
      fieldTopic: 'Subject / Role Title',
      fieldMessage: 'Message & Collaboration Details',
      placeholderMessage: 'Type your message, project details, or inquiry...',
      formEmail: 'Work Email Address',
      formPhone: 'Phone / WhatsApp',
      formSubject: 'Topic / Role',
      formMessage: 'Your Message...',
      formSubmit: 'Send Message Now',
      formSending: 'Sending...',
      formSuccess: 'Message sent successfully! I will reply promptly.',
      formError: 'Failed to send message. Please try again!',
      sentSuccess: 'Message sent successfully!',
      sentSuccessSub: 'Thank you for reaching out. I will respond to your inquiry as soon as possible.',
      sending: 'Sending Message...',
      btnSubmit: 'Send Message to',
      emailOfficial: 'Official Email',
      phoneZalo: 'Phone / WhatsApp / Zalo',
      workArea: 'Location / Work Mode',
      callDirect: 'Call Directly',
      sendEmailNow: 'Send Email Now',
      copy: 'Copy',
      copied: 'Copied',
      quickInfo: 'Quick Contact Info',
      responseTime: 'Average response time: 2-4 hours',
      scheduleCall: 'Schedule a Video Call',
    },
    exportCV: {
      title: 'Complete Executive CV',
      badge: 'Leadership & Recruiter Ready',
      subtitle: 'Download high-resolution PDF, export standalone HTML, or print crisp A4 document.',
      tabA4PDF: 'A4 PDF Export',
      tabText: 'Plain Text CV',
      tabSummary: 'Executive Brief',
      tabHtml: 'Standalone HTML',
      downloadPDF: 'Download PDF (A4)',
      downloadHTML: 'Download HTML',
      downloadHtml: 'Download HTML (.html)',
      copyText: 'Copy Text/Markdown',
      copiedText: 'Copied to clipboard!',
      copiedTextCV: 'Copied Text CV',
      copySummary: 'Copy Recruiter Brief',
      copiedSummary: 'Brief copied!',
      exportingPDF: 'Generating PDF...',
      printA4: 'Print A4',
      close: 'Close',
      customization: 'Customize',
      avatarCheckbox: 'Show Avatar Photo',
      allProjectsCheckbox: 'Include All Web Apps',
      allProjectsCheck: 'Include all web applications in the exported CV',
    },
    footer: {
      tagline: 'Construction Economist • Cost & Contract Specialist • Web Developer',
      quickLinks: 'Quick Links',
      copyright: 'All rights reserved.',
      backToTop: 'Back to Top',
      allRights: 'All rights reserved.',
      designedFor: 'Tailored specifically for',
      recruiters: 'Tech Recruiters & Hiring Managers',
    }
  },

  // CHINESE (简体中文)
  zh: {
    nav: {
      bio: '个人简介',
      projects: '精选应用',
      experience: '工作经历',
      skills: '技能与工具',
      contact: '联系合作',
      exportCV: '导出简历 (PDF)',
      cms: '管理后台',
      admin: '管理员',
      cloudSynced: '已同步至谷歌云 Firestore',
      connectingCloud: '正在连接云端...',
      availableBadge: '可立即入职',
    },
    hero: {
      statusOpen: '欢迎交流 • 开放求职机会',
      statusBusy: '正在执行项目',
      greeting: '工程造价经济师 & 全栈 Web 开发者',
      titleSuffix: '成本管理与数字化自动化专家',
      heroDesc: '拥有6年以上建筑成本管理、工程算量、合同与招标实战经验；率先开发专用 Web 应用与 AI 自动化解决方案，优化工程预算与业务流程。',
      ctaProjects: '探索 Web 应用',
      ctaContact: '联系与合作',
      ctaExportCV: '导出简历 / 资料',
      copyEmail: '复制邮箱',
      copyPhone: '复制电话',
      copied: '已复制！',
      yearsExp: '6+ 年',
      yearsExpSub: '造价与合同管理经验',
      projectsDone: '5+ 款',
      projectsDoneSub: '实战上线 Web 应用',
      costOptimized: '30%+',
      costOptimizedSub: '节省算量与审价时间',
      activeApps: '100%',
      activeAppsSub: '全功能在线体验',
      domainTitle: '核心业务领域',
      domainSubtitle: '工程经济 × 现代软件工程',
      specialtiesTitle: '核心能力',
    },
    projects: {
      badge: '✨ 自研数字化系统产品',
      title: 'Web应用系统与',
      title1: 'Web应用系统',
      title2: '数字化方案',
      titleHighlight: '数字化方案',
      subtitle: '切实解决工程造价管理、算量复核、资金流报表与 AI 自动化的实战 Web 应用程序。',
      noticeText: '所有产品均经过高并发与响应式优化，内置访客演示账号可直接体验。',
      noticeHighlight: '体验 UX 与源代码：',
      qualityNote: '每款产品均经过精心优化，支持全设备响应式并提供演示账号。',
      manageBtn: '+ 管理应用目录',
      allCategories: '全部项目',
      searchPlaceholder: '搜索应用名称、技术栈或造价业务...',
      viewLiveDemo: '在线体验 Demo',
      openLiveDirect: '直接打开体验',
      viewDetails: '查看解决方案详情',
      githubCode: '源代码 / 仓库',
      viewGitHub: '查看 GitHub',
      featuredBadge: '精选推荐',
      featured: '精选',
      costImpactLabel: '核心价值：',
      demoAccountLabel: '体验账号：',
      demoAccount: '演示账号：',
      viewPassword: '查看密码',
      filterCount: '个产品',
      filterAll: '全部',
      noProjects: '未找到匹配的应用程序',
      noProjectsSub: '请尝试更换搜索关键词或切换分类。',
      draftBadge: '草稿（隐藏）',
      liveBadge: '正常运行（活跃）',
      copyLink: '复制链接',
    },
    experience: {
      badge: '💼 职业履历',
      title: '工作经历 &',
      title1: '工作经历',
      title2: '实战能力',
      titleHighlight: '实战能力',
      subtitle: '6年就职于大型开发商与总承包特级企业，专注成本管控、总投资预算及 AI 自动化赋能。',
      tabWork: '业主单位与知名企业',
      tabEducation: '教育背景与学位',
      tabCertifications: '执业与职业证书',
      tabCertificates: '资格证书',
      keyAchievements: '主要成果',
      mainResponsibilities: '核心职责',
      verifiedCert: '官方认证有效证书',
      showMore: '展开更多经历',
      showLess: '收起部分',
      issuer: '颁发机构',
      issueDate: '颁发日期',
      exportCV: '导出完整简历 (PDF)',
      draftBadge: '草稿',
      tasksTitle: '核心职责与关键成果：',
      majorLabel: '专业：',
      certTitle: '专业从业执业证书',
      issuerLabel: '发证机构：',
      credentialIdLabel: '证书编号 / ID：',
    },
    projectModal: {
      closeModal: '关闭窗口',
      liveAppBadge: '在线运行 Web 应用',
      yearLabel: '年份',
      openWebAppNow: '立即在线体验 Web 应用',
      demoAccountTitle: '演示体验账号',
      demoAccountNote: '使用以下账号登录即可完整体验所有权限与业务流程。',
      usernameLabel: '账号 / 邮箱：',
      passwordLabel: '密码：',
      overviewTitle: '解决方案与业务价值概述',
      roleTitle: '项目角色：',
      roleDesc: '独立创作者与全栈开发者 (Full-stack)',
      featuresTitle: '核心功能与特色亮点',
      techStackTitle: '技术栈与系统架构',
      copiedLink: '已复制应用链接！',
      copyLinkBtn: '复制链接',
      githubRepo: '查看 GitHub 源码',
      openWebAppDirect: '新标签页直接打开',
    },
    common: {
      adminActive: '管理员模式 (Admin Active)',
      enterCMS: '进入 CMS 控制台',
      logout: '退出登录',
      readyToConnect: '随时沟通',
      webApps: 'Web 应用',
      exportCV: '导出简历',
      emailCopied: '邮箱已复制！',
      emailLabel: '邮箱：',
      contact: '立即联系',
      synced: '云端已同步',
      syncing: '正在连接云端...',
      switchToLight: '切换至浅色模式',
      switchToDark: '切换至深色模式',
      languageLabel: '切换语言',
    },
    skills: {
      badge: '✨ 专业技能与技术栈',
      title: '专业技能 &',
      title1: '技能与',
      title2: '工作工具',
      titleHighlight: '技术工具栈',
      subtitle: '融合实战工程造价专业与成本/合同管理、现代数据建模及 AI 自动化开发能力。',
      kpiConstruction: '造价专业能力',
      kpiConstructionSub: '算量、成本与合同',
      kpiTech: '技术栈能力',
      kpiTechSub: 'AI 与全栈自动化',
      kpiData: '高级数据与 BI',
      kpiDataSub: 'Power Query 与报表',
      kpiAi: 'AI 与自动化',
      kpiAiSub: '大模型与 Web 应用',
      card1Title: '工程造价与成本管理',
      card1Subtitle: '核心专业根基',
      card1Count: '07 项核心专业能力',
      card2Title: 'AI 与数字化自动化',
      card2Subtitle: '技术赋能工作提效',
      card2Count: '05 项技术开发能力',
      diffBadge: 'PROFESSIONAL DIFFERENTIATOR',
      diffTitle: 'Construction Economics × Data × AI Automation',
      diffDesc: '运用 AI、现代数据平台与 Web 开发标准化造价定额，自动化算量复核，显著提高投资决策效率。',
      diffPillar1Title: '定额与数据标准化',
      diffPillar1Desc: '企业内部造价数据库数字化，快速联动 G8/F1 数据秒级检索。',
      diffPillar2Title: '自动算量与核价',
      diffPillar2Desc: '结合大模型与 OCR 自动解析工程量清单，瞬间排查单价偏差。',
      diffPillar3Title: '实时成本管控',
      diffPillar3Desc: '跟踪现金流走向，监控支付限额并进行 NPV/IRR 投资敏感性分析。',
      diffPillar4Title: '专业企业级 Web 应用',
      diffPillar4Desc: '自主开发工程垂直领域内部软件，为业主方降本增效。',
      toolsTitle: 'TOOLS & TECHNOLOGIES',
      toolsSubtitle: '行业专业造价软件、数字化数据平台与现代全栈开发工具',
      toolsCount: '工具与开发框架',
    },
    contact: {
      badge: '📫 联系与沟通',
      title: '直接沟通 &',
      title1: '随时准备',
      title2: '为您效劳',
      titleHighlight: '深度合作',
      subtitle: '随时欢迎交流全职工作机会、成本与合同管理顾问项目或定制数字化 Web 应用开发。',
      formTitle: '发送即时留言',
      formSubtitle: '您的留言将直接加密存入 Google Cloud 并即刻通过邮件提醒裴越黄 (Bui Viet Hoang)。',
      formName: '您的姓名',
      fieldName: '姓名 / 联系人',
      fieldCompany: '公司 / 机构名称',
      fieldEmail: '您的工作邮箱',
      fieldTopic: '沟通主题 / 意向岗位',
      fieldMessage: '沟通内容 / 留言详情',
      placeholderMessage: '请输入您想沟通的合作事宜或岗位需求...',
      formEmail: '电子邮箱',
      formPhone: '联系电话 / 微信',
      formSubject: '主题 / 职位',
      formMessage: '留言内容...',
      formSubmit: '立即发送留言',
      formSending: '正在发送...',
      formSuccess: '发送成功！我将尽快与您取得联系。',
      formError: '发送失败，请重试！',
      sentSuccess: '留言已成功发送！',
      sentSuccessSub: '感谢您留下联系方式，我将尽快回复您的来信。',
      sending: '正在发送留言...',
      btnSubmit: '发送留言给',
      emailOfficial: '官方联系邮箱',
      phoneZalo: '电话 / 微信 / Zalo',
      workArea: '工作地点与模式',
      callDirect: '直接拨打电话',
      sendEmailNow: '立即发送邮件',
      copy: '复制',
      copied: '已复制',
      quickInfo: '快速联系方式',
      responseTime: '平均回复时间：2-4 个工作小时',
      scheduleCall: '预约线上沟通',
    },
    exportCV: {
      title: '高管级完整简历',
      badge: '符合企业领导与招聘官审核标准',
      subtitle: '直接下载高清 PDF、导出独立离线 HTML 文件或打印标准 A4 纸质文件。',
      tabA4PDF: '导出标准 A4 PDF',
      tabText: '纯文本格式',
      tabSummary: '高管摘要',
      tabHtml: '单文件 HTML',
      downloadPDF: '下载 PDF 文件 (A4)',
      downloadHTML: '下载 HTML 文件',
      downloadHtml: '下载 HTML 网页 (.html)',
      copyText: '复制文本/Markdown',
      copiedText: '已复制到剪贴板！',
      copiedTextCV: '已复制简历文本',
      copySummary: '复制高管汇报摘要',
      copiedSummary: '摘要已复制！',
      exportingPDF: '正在生成 PDF...',
      printA4: '打印 A4',
      close: '关闭',
      customization: '个性化设置',
      avatarCheckbox: '包含证件照片',
      allProjectsCheckbox: '包含所有 Web 应用',
      allProjectsCheck: '在简历中完整展示所有开发的 Web 应用',
    },
    footer: {
      tagline: '工程造价经济师 • 成本与合同专家 • Web 开发者',
      quickLinks: '快捷导航',
      copyright: '保留所有权利。',
      backToTop: '返回顶部',
      allRights: '保留所有权利。',
      designedFor: '专为招聘官与企业打造',
      recruiters: '技术招聘官 (Tech Recruiters)',
    }
  },

  // KOREAN (한국어)
  ko: {
    nav: {
      bio: '소개',
      projects: '웹 애플리케이션',
      experience: '경력 사항',
      skills: '기술 및 도구',
      contact: '연락처',
      exportCV: '이력서 내보내기 (PDF)',
      cms: 'CMS 관리',
      admin: '관리자',
      cloudSynced: '구글 클라우드 Firestore 동기화 완료',
      connectingCloud: '클라우드 연결 중...',
      availableBadge: '채용 협의 가능',
    },
    hero: {
      statusOpen: '입사 및 협업 가능 • Open to Connect',
      statusBusy: '프로젝트 수행 중',
      greeting: '건설 경제 엔지니어 & 웹 앱 개발자',
      titleSuffix: '원가 관리 및 AI 디지털 자동화 전문가',
      heroDesc: '건설 원가 관리, 적산(QS), 계약 및 입찰 분야에서 6년 이상의 실무 경력을 보유하고 있으며, 전문 웹 앱과 AI 솔루션을 직접 개발하여 공사 예산과 프로세스를 혁신합니다.',
      ctaProjects: '웹 앱 둘러보기',
      ctaContact: '채용 및 협업 문의',
      ctaExportCV: '이력서 다운로드 / 출력',
      copyEmail: '이메일 복사',
      copyPhone: '전화번호 복사',
      copied: '복사 완료!',
      yearsExp: '6+ 년',
      yearsExpSub: '건설 원가 및 계약 경력',
      projectsDone: '5+ 개',
      projectsDoneSub: '실전 운영 웹 앱 시스템',
      costOptimized: '30%+',
      costOptimizedSub: '적산 및 견적 검토 시간 단축',
      activeApps: '100%',
      activeAppsSub: '실시간 데모 계정 제공',
      domainTitle: '주요 전문 분야',
      domainSubtitle: '건설 경제 기술 × 소프트웨어 엔지니어링',
      specialtiesTitle: '핵심 역량',
    },
    projects: {
      badge: '✨ 자체 개발 디지털 소프트웨어 제품군',
      title: '웹 앱 및',
      title1: '웹 앱 및',
      title2: '디지털 솔루션',
      titleHighlight: '디지털 솔루션',
      subtitle: '공사비 관리, 적산 내역 검토, 현금 흐름 분석 및 AI 자동화를 해결하는 실무 웹 애플리케이션.',
      noticeText: '모든 제품은 최적화된 반응형 UI와 게스트 체험용 데모 계정을 갖추고 있습니다.',
      noticeHighlight: 'UX 및 소스코드 확인:',
      qualityNote: '모든 웹 앱은 고성능 반응형 디자인과 즉시 테스트 가능한 데모 계정을 지원합니다.',
      manageBtn: '+ 앱 목록 관리',
      allCategories: '전체 프로젝트',
      searchPlaceholder: '앱 이름, 기술 스택, 원가 업무 검색...',
      viewLiveDemo: '라이브 데모 체험',
      openLiveDirect: '데모 바로 열기',
      viewDetails: '솔루션 상세 보기',
      githubCode: '소스 코드 / 깃허브',
      viewGitHub: 'GitHub 보기',
      featuredBadge: '대표 프로젝트',
      featured: '대표작',
      costImpactLabel: '기대 효과:',
      demoAccountLabel: '체험 계정:',
      demoAccount: '데모 계정:',
      viewPassword: '비밀번호 보기',
      filterCount: '개 제품',
      filterAll: '전체',
      noProjects: '일치하는 애플리케이션이 없습니다',
      noProjectsSub: '다른 검색어를 입력하거나 카테고리를 변경해 보세요.',
      draftBadge: '임시저장 (비공개)',
      liveBadge: '정상 운영 (활성)',
      copyLink: '링크 복사',
    },
    experience: {
      badge: '💼 경력 히스토리',
      title: '경력 사항 &',
      title1: '경력 사항',
      title2: '실무 역량',
      titleHighlight: '실무 역량',
      subtitle: '주요 시행사 및 종합건설사에서 6년간 원가 관리, 사업비 예산 수립, AI 자동화 시스템을 주도했습니다.',
      tabWork: '발주처 및 주요 기업',
      tabEducation: '학력 및 학위',
      tabCertifications: '전문 자격증',
      tabCertificates: '자격증',
      keyAchievements: '주요 성과',
      mainResponsibilities: '핵심 업무 및 역할',
      verifiedCert: '공식 검증 완료 자격증',
      showMore: '경력 상세 펼치기',
      showLess: '간략히 접기',
      issuer: '발급 기관',
      issueDate: '취득일',
      exportCV: '상세 이력서 내보내기 (PDF)',
      draftBadge: '임시저장',
      tasksTitle: '주요 업무 및 핵심 성과:',
      majorLabel: '전공:',
      certTitle: '전문 실무 및 국가기술자격증',
      issuerLabel: '발급 기관:',
      credentialIdLabel: '자격증 번호 / ID:',
    },
    projectModal: {
      closeModal: '모달 닫기',
      liveAppBadge: '라이브 웹 앱',
      yearLabel: '연도',
      openWebAppNow: '웹 앱 실시간 데모 실행',
      demoAccountTitle: '체험용 데모 계정',
      demoAccountNote: '아래 계정 정보로 로그인하여 모든 권한별 기능을 테스트해 보세요.',
      usernameLabel: '아이디 / 이메일:',
      passwordLabel: '비밀번호:',
      overviewTitle: '솔루션 개요 및 원가 절감 과제',
      roleTitle: '수행 역할:',
      roleDesc: '기획 및 독자 풀스택 개발자 (Full-stack)',
      featuresTitle: '주요 기능 및 핵심 역량',
      techStackTitle: '적용 기술 스택 및 아키텍처',
      copiedLink: '앱 링크가 복사되었습니다!',
      copyLinkBtn: '링크 복사',
      githubRepo: 'GitHub 소스코드 보기',
      openWebAppDirect: '새 탭에서 직접 열기',
    },
    common: {
      adminActive: '관리자 모드 활성 (Admin Active)',
      enterCMS: 'CMS 대시보드 열기',
      logout: '로그아웃',
      readyToConnect: '연락 가능',
      webApps: '웹 앱',
      exportCV: '이력서 내보내기',
      emailCopied: '이메일이 복사되었습니다!',
      emailLabel: '이메일:',
      contact: '문의하기',
      synced: '클라우드 동기화 완료',
      syncing: '클라우드 연결 중...',
      switchToLight: '라이트 모드로 전환',
      switchToDark: '다크 모드로 전환',
      languageLabel: '언어 선택',
    },
    skills: {
      badge: '✨ 전문 역량 및 기술 스택',
      title: '전문 기술 &',
      title1: '전문 기술 & ',
      title2: '업무 도구',
      titleHighlight: '업무 기술 도구',
      subtitle: '현장 실전 건설경제학과 원가/계약 관리, 고급 데이터 모델링 및 AI 자동화 개발 역량을 융합합니다.',
      kpiConstruction: '원가 전문 역량',
      kpiConstructionSub: '적산, 공사비 & 계약',
      kpiTech: 'IT 기술 역량',
      kpiTechSub: 'AI 및 풀스택 자동화',
      kpiData: '고급 데이터 & BI',
      kpiDataSub: 'Power Query & 시각화',
      kpiAi: 'AI & 자동화',
      kpiAiSub: 'LLM, Gemini & 웹 앱',
      card1Title: '건설 경제 및 원가 관리',
      card1Subtitle: '핵심 실무 역량 기반',
      card1Count: '07개 핵심 전문 역량',
      card2Title: 'AI 및 디지털 자동화',
      card2Subtitle: '업무 혁신 가속화 기술',
      card2Count: '05개 기술 개발 역량',
      diffBadge: 'PROFESSIONAL DIFFERENTIATOR',
      diffTitle: 'Construction Economics × Data × AI Automation',
      diffDesc: 'AI, 데이터 스택 및 웹 엔지니어링을 활용하여 공사비 단가를 표준화하고 검토를 자동화하여 의사결정을 가속합니다.',
      diffPillar1Title: '데이터 및 품셈 표준화',
      diffPillar1Desc: '사내 원가 DB 디지털화 및 G8/F1 연동을 통한 실시간 즉시 조회 지원.',
      diffPillar2Title: '자동 수량 산출 및 단가 대조',
      diffPillar2Desc: 'LLM과 OCR을 적용하여 수량 산출서를 파싱하고 단가 오차를 수초 내에 검출.',
      diffPillar3Title: '실시간 사업비 통제',
      diffPillar3Desc: '현금 흐름 추적, 기성 집행 한도 모니터링 및 NPV/IRR 투자 민감도 분석.',
      diffPillar4Title: '전문 엔터프라이즈 웹 앱',
      diffPillar4Desc: '발주처의 생산성을 극대화하는 건설 전문 사내 소프트웨어 독자 개발.',
      toolsTitle: 'TOOLS & TECHNOLOGIES',
      toolsSubtitle: '업계 표준 공사비 소프트웨어, 데이터 플랫폼 및 실전 개발 프레임워크',
      toolsCount: '도구 및 프레임워크',
    },
    contact: {
      badge: '📫 문의 및 협업',
      title: '직접 연락 &',
      title1: '새로운 기회를',
      title2: '기다립니다',
      titleHighlight: '협업 문의',
      subtitle: '정규직 채용, 원가 및 계약 관리 컨설팅 프로젝트, 또는 맞춤형 AI/웹 솔루션 개발 문의를 환영합니다.',
      formTitle: '직접 메시지 보내기',
      formSubtitle: '작성하신 메시지는 Google Cloud에 안전하게 저장되며 Bui Viet Hoang에게 이메일로 즉시 알림이 전송됩니다.',
      formName: '성함',
      fieldName: '성함 / 채용 담당자',
      fieldCompany: '회사명 / 소속 기관',
      fieldEmail: '이메일 주소',
      fieldTopic: '문의 주제 / 채용 직무',
      fieldMessage: '메시지 / 협업 제안 내용',
      placeholderMessage: '제안하시고자 하는 프로젝트나 협업 내용을 입력해 주세요...',
      formEmail: '업무용 이메일',
      formPhone: '전화번호 / 카카오톡',
      formSubject: '문의 주제',
      formMessage: '메시지 내용...',
      formSubmit: '메시지 전송하기',
      formSending: '전송 중...',
      formSuccess: '메시지가 전송되었습니다! 신속히 회신드리겠습니다.',
      formError: '전송에 실패했습니다. 다시 시도해 주세요!',
      sentSuccess: '메시지가 성공적으로 전송되었습니다!',
      sentSuccessSub: '연락처를 남겨주셔서 감사합니다. 빠른 시일 내에 회신해 드리겠습니다.',
      sending: '메시지 전송 중...',
      btnSubmit: '메시지 전송 대상:',
      emailOfficial: '공식 이메일',
      phoneZalo: '전화 / 카카오톡 / Zalo',
      workArea: '근무지 및 근무 형태',
      callDirect: '전화 바로 걸기',
      sendEmailNow: '이메일 바로 보내기',
      copy: '복사',
      copied: '완료',
      quickInfo: '빠른 연락처 정보',
      responseTime: '평균 응답 시간: 2~4시간 이내',
      scheduleCall: '화상 미팅 예약하기',
    },
    exportCV: {
      title: '경력자 전용 상세 이력서',
      badge: '임원 및 채용 담당자 보고용',
      subtitle: '고해상도 A4 PDF 파일 다운로드, 단독 실행 HTML 파일 저장 또는 즉시 A4 출력이 가능합니다.',
      tabA4PDF: 'A4 PDF 내보내기',
      tabText: '텍스트 이력서',
      tabSummary: '임원 보고용 요약',
      tabHtml: '단독 HTML 파일',
      downloadPDF: 'PDF 파일 다운로드 (A4)',
      downloadHTML: 'HTML 파일 다운로드',
      downloadHtml: 'HTML 파일 다운로드 (.html)',
      copyText: '텍스트/마크다운 복사',
      copiedText: '클립보드에 복사되었습니다!',
      copiedTextCV: '이력서 텍스트 복사됨',
      copySummary: '요약본 복사하기',
      copiedSummary: '요약본이 복사되었습니다!',
      exportingPDF: 'PDF 파일 생성 중...',
      printA4: 'A4 출력',
      close: '닫기',
      customization: '이력서 옵션',
      avatarCheckbox: '프로필 사진 포함',
      allProjectsCheckbox: '모든 웹 앱 포함',
      allProjectsCheck: '이력서에 모든 개발 웹 애플리케이션 포함',
    },
    footer: {
      tagline: '건설 경제 엔지니어 • 공사비 & 계약 전문가 • 웹 개발자',
      quickLinks: '바로가기',
      copyright: 'All rights reserved.',
      backToTop: '맨 위로 이동',
      allRights: '모든 권리 보유.',
      designedFor: '채용 담당자를 위한 최적화',
      recruiters: '테크 리크루터 및 채용 매니저',
    }
  }
};
