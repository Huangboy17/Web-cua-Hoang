import { UserProfile } from '../types';
import { Language } from '../i18n/types';

// Shared avatar image
const AVATAR_URL = "data:image/jpeg;base64,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";

// ==========================================
// 1. VIETNAMESE PROFILE (VI)
// ==========================================
export const PROFILE_VI: UserProfile = {
  fullName: 'Bùi Việt Hoàng',
  title: 'Kỹ sư Kinh tế Xây dựng',
  headline: 'Chuyên gia Kinh tế Xây dựng & Tiên phong Ứng dụng AI / Tự động hóa trong Quản lý Dự án, Chi phí & Ngân sách Đầu tư',
  bio: 'Kỹ sư Kinh tế Xây dựng với 6 năm kinh nghiệm trong quản lý chi phí, đấu thầu, hợp đồng và tài chính dự án tại các chủ đầu tư và doanh nghiệp lớn như Vinhomes, Phú Điền, Tổng Công ty 36, Za Hưng và AMD. Có thế mạnh vượt trội về quản lý hợp đồng, thanh quyết toán, kiểm soát ngân sách, lập Tổng mức đầu tư (TMĐT) và phân tích hiệu quả dự án trong lĩnh vực bất động sản và năng lượng (thủy điện, điện gió).\nKết hợp nhuần nhuyễn nghiệp vụ kinh tế xây dựng chuyên sâu với công nghệ hiện đại: thành thạo Excel nâng cao, Power Query, Power BI, G8/F1, SAP ERP và các mô hình AI (GPT, Gemini, Antigravity). Có năng lực tự xây dựng ứng dụng (Web Apps) và tự động hóa quy trình nghiệp vụ nhằm chuẩn hóa dữ liệu, nâng cao hiệu suất và tối ưu hóa chi phí cho Chủ Đầu Tư.',
  avatarUrl: AVATAR_URL,
  email: 'buiviethoangktxd@gmail.com',
  phone: '0822510178',
  location: 'Hà Nội, Việt Nam',
  dateOfBirth: '06/03/1997',
  availableForHire: true,
  yearsOfExperience: 6,
  completedProjectsCount: 3,
  socialLinks: {
    github: 'https://github.com/Huangboy17',
    linkedin: 'https://www.linkedin.com/in/viet-hoang-bui-249532212/',
    website: 'https://viethoang-portfolio.dev',
    telegram: 'https://t.me/hoangbv_ktxd',
  },
  cvDownloadUrl: '#',
  projects: [
    {
      id: 'proj-1',
      title: 'App Quản Lý Chi Phí & Ngân Sách Dự Án',
      tagline: 'Tài khoản demo: Toghetcrush@gmail.com | Mật khẩu: 12345678',
      description: 'Hệ thống phần mềm nội bộ số hóa toàn diện quy trình kiểm soát chi phí đầu tư, theo dõi kế hoạch ngân sách và phân tích dòng tiền dự án theo từng giai đoạn. Tự động hóa đối chiếu thanh quyết toán nhà thầu và cảnh báo vượt hạn mức dự toán.',
      liveUrl: 'https://quan-ly-cp-da.vercel.app/',
      githubUrl: 'https://github.com/viethoangdev/construction-cost-manager',
      category: 'SaaS',
      tags: ['AI Integration', 'React', 'Power BI', 'Excel & Power Query', 'SAP Integration', 'G8/F1 DB'],
      featured: true,
      image: 'https://lh3.googleusercontent.com/d/1dOeGm3HYWkUHaRxL30VUobzM1bWVq9c3',
      metrics: 'Tiết kiệm 65% thời gian tổng hợp báo cáo chi phí tuần/tháng, giảm 95% sai sót đối soát số liệu thủ công',
      role: 'Tác giả & Chủ trì phát triển (Kỹ sư Kinh tế Xây dựng & Full-Stack Automation)',
      keyFeatures: [
        'Theo dõi ngân sách, kiểm soát dòng tiền và cập nhật tình hình thực hiện chi phí theo từng giai đoạn',
        'Lập Tổng mức đầu tư (TMĐT), kế hoạch dòng tiền và phân tích hiệu quả đầu tư (NPV, IRR)',
        'Quản lý hồ sơ nhà thầu, theo dõi tiến độ thanh quyết toán và đối soát đơn giá hợp đồng',
        'Tích hợp Dashboard báo cáo quản trị trực quan hóa cơ cấu chi phí theo thời gian thực'
      ],
      challenges: [
        'Xử lý và đồng bộ khối lượng dữ liệu dự toán khổng lồ từ nhiều phân hệ và định mức nhà nước khác nhau',
        'Thiết kế giao diện thân thiện với nghiệp vụ KTXD và chuẩn hóa quy trình phân quyền quản lý dự án'
      ],
      demoAccount: {
        username: 'toghetcrush@gmail.com',
        password: '12345678',
        note: 'Tài khoản Quản lý Chi phí & Ngân sách dự án đầy đủ dữ liệu mô phỏng'
      },
      completionYear: '2026'
    },
    {
      id: 'proj-2',
      title: 'App Quản Lý Nghiệm Thu, Thanh Toán & Quyết Toán',
      tagline: 'Tài khoản demo: taikhoanhoangso2@gmail.com | Mật khẩu: 123456',
      description: 'Web App quản lý toàn diện quy trình nghiệm thu công việc hiện trường, duyệt hồ sơ thanh toán giai đoạn và quyết toán công trình, tối ưu hóa cho nhà thầu chính và phụ.',
      liveUrl: 'https://qcqs-me-ck-acceptance-payment-track.vercel.app/',
      githubUrl: 'https://github.com/viethoangdev/costbot-ai-assistant',
      category: 'AI & Tech',
      tags: ['Gemini API', 'Python / FastAPI', 'Vector Embeddings', 'OCR', 'React', 'TailwindCSS'],
      featured: true,
      image: 'https://lh3.googleusercontent.com/d/1y-tPjVx_LCnVzKC7aSij89b5hImqubZI',
      metrics: 'Xử lý file hồ sơ dự toán 500+ đầu việc trong 8 giây, độ chính xác đối soát định mức đạt 98%',
      role: 'Chủ trì thiết kế nghiệp vụ KTXD & Phát triển AI Engine',
      keyFeatures: [
        'Tự động bóc tách và trích xuất bảng khối lượng từ file Scan PDF, bản vẽ & bảng tính Excel',
        'Soát xét đơn giá ca máy, vật liệu, nhân công và đối chiếu với hệ thống định mức G8/F1',
        'Phát hiện các điều khoản hợp đồng bất lợi hoặc rủi ro pháp lý trong thanh quyết toán',
        'Tạo báo cáo tóm tắt rủi ro và kiến nghị đàm phán hợp đồng chỉ với 1 click'
      ],
      challenges: [
        'Xử lý cấu trúc bảng biểu phức tạp trong hồ sơ dự toán xây dựng không đồng nhất',
        'Tối ưu prompt engineering để AI nắm vững quy chuẩn định mức xây dựng Việt Nam'
      ],
      demoAccount: {
        username: 'taikhoanhoangso2@gmail.com',
        password: '123456',
        note: 'Có sẵn dữ liệu mẫu dự toán khu đô thị và hợp đồng EPC để thử nghiệm'
      },
      completionYear: '2025'
    },
    {
      id: 'proj-1787676289453',
      title: 'Nền Tảng Tạo & Quản Lý CV Thông Minh',
      tagline: 'Tự do tùy biến hồ sơ năng lực chuyên nghiệp theo phong cách của bạn',
      description: 'Cho phép người dùng tùy biến và xuất hồ sơ CV linh hoạt, chủ động lựa chọn hoặc ẩn các phần hiển thị theo nhu cầu ứng tuyển.',
      liveUrl: 'https://cv-management-xi.vercel.app/',
      category: 'SaaS',
      role: 'Tác giả & Lập trình viên chính',
      featured: false,
      published: true,
      completionYear: '2026',
      image: 'https://drive.google.com/thumbnail?id=1bvkf4FzkK-RlhZaPkpSrOcegeuYCDk4q&sz=w1600',
      keyFeatures: [],
      tags: ['React', 'AI Integration']
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'Tập đoàn Phú Điền',
      role: 'Chuyên viên Kinh tế Xây dựng',
      period: '07/2026 - Hiện tại',
      location: 'Hà Nội, Việt Nam',
      type: 'Toàn thời gian',
      summary: 'Phụ trách công tác quản lý chi phí, theo dõi ngân sách và dòng tiền cho các dự án Hạ tầng kỹ thuật; trực tiếp phát triển ứng dụng Web phục vụ quản lý chi phí dự án cho tập đoàn.',
      achievements: [
        'Theo dõi ngân sách, kiểm soát dòng tiền và cập nhật tình hình thực hiện chi phí của dự án theo từng giai đoạn.',
        'Tìm kiếm, đánh giá và lựa chọn nhà thầu thực hiện các gói thầu được giao.',
        'Lập dự toán gói thầu, theo dõi hợp đồng và thanh quyết toán các hợp đồng được giao.'
      ],
      technologies: ['AI & Tự Động Hóa', 'Excel nâng cao', 'G8 / F1', 'Word', 'Power BI'],
      companyUrl: 'https://example.com'
    },
    {
      id: 'exp-2',
      company: 'Công ty CP Vinhomes (Tập đoàn Vingroup)',
      role: 'Chuyên viên Ngân sách và Dự toán',
      period: '04/2026 - 06/2026',
      location: 'TP. Hà Nội',
      type: 'Toàn thời gian',
      summary: 'Lập dự toán nội bộ, xây dựng ngân sách gói thầu và quản lý dữ liệu chi phí trên hệ thống SAP cho các đại dự án khu đô thị, công viên, công trình cao tầng, trụ sở làm việc và hạ tầng kỹ thuật.',
      achievements: [
        'Lập dự toán nội bộ và xây dựng ngân sách gói thầu cho các dự án quy mô lớn: khu đô thị, công trình cao tầng, hạ tầng kỹ thuật.',
        'Thẩm tra dự toán, tổng mức đầu tư các dự án ngân sách nhà nước do tư vấn lập.',
        'Chủ trì triển khai công tác quản lý chi phí và ngân sách đầu tư các dự án được phân công.',
        'Thực hiện cập nhật, quản lý và đồng bộ dữ liệu chi phí – đầu tư trên hệ thống SAP theo quy trình chuẩn của tập đoàn.'
      ],
      technologies: ['SAP ERP', 'Excel (Power Query)', 'Outlook', 'Dự toán KTXD'],
      companyUrl: 'https://vinhomes.vn'
    },
    {
      id: 'exp-3',
      company: 'Tổng Công ty 36 (Bộ Quốc Phòng)',
      role: 'Chuyên viên Cao Cấp Đầu Tư',
      period: '06/2024 - 03/2026',
      location: 'Hà Nội',
      type: 'Toàn thời gian',
      summary: 'Theo dõi ngân sách, kiểm soát dòng tiền, lập Tổng mức đầu tư (TMĐT) và phân tích hiệu quả tài chính các dự án bất động sản, thủy điện và năng lượng tái tạo.',
      achievements: [
        'Theo dõi ngân sách, kiểm soát dòng tiền và cập nhật tình hình thực hiện chi phí của dự án theo từng giai đoạn.',
        'Lập Tổng mức đầu tư (TMĐT), kế hoạch dòng tiền và phân tích hiệu quả đầu tư cho các dự án bất động sản, thủy điện và điện gió.',
        'Soạn thảo tài liệu, báo cáo thẩm định đầu tư phục vụ công tác quản trị dự án.',
        'Tổng hợp báo cáo sản lượng, doanh thu và chi phí định kỳ.'
      ],
      technologies: ['Excel', 'Word', 'G8', 'Google Sheets', 'Phân tích tài chính']
    },
    {
      id: 'exp-4',
      company: 'Công ty Cổ phần Za Hưng',
      role: 'Chuyên viên Kế hoạch Đầu tư',
      period: '10/2022 - 05/2024',
      location: 'Hà Nội',
      type: 'Toàn thời gian',
      summary: 'Chịu trách nhiệm lập TMĐT, phân tích hiệu quả đầu tư, kiểm soát dòng tiền và tổ chức lựa chọn nhà thầu các dự án bất động sản, thủy điện và năng lượng.',
      achievements: [
        'Lập Tổng mức đầu tư (TMĐT), kế hoạch dòng tiền và phân tích hiệu quả đầu tư cho các dự án bất động sản, thủy điện và điện gió.',
        'Theo dõi ngân sách, kiểm soát dòng tiền và cập nhật tình hình thực hiện chi phí của dự án theo từng giai đoạn.',
        'Tổ chức tìm kiếm, đánh giá và lựa chọn nhà thầu cho các gói thầu được giao.',
        'Tổng hợp báo cáo tiến độ và kết quả thực hiện dự án định kỳ.'
      ],
      technologies: ['Excel', 'G8', 'Word', 'Google Sheets', 'Đấu thầu']
    },
    {
      id: 'exp-5',
      company: 'Công ty Cổ phần Kiến trúc và Kỹ thuật AMD',
      role: 'Phó Phòng QS và Đấu Thầu',
      period: '02/2020 - 09/2022',
      location: 'Hà Nội',
      type: 'Toàn thời gian',
      summary: 'Chủ trì lập dự toán, bóc tách khối lượng, quản lý hợp đồng, theo dõi thanh quyết toán và xây dựng hệ thống định mức nội bộ cho doanh nghiệp.',
      achievements: [
        'Chủ trì lập dự toán, bóc tách khối lượng và hoàn thiện hồ sơ dự thầu cho các dự án dân dụng quy mô lớn.',
        'Chủ trì quản lý hợp đồng, theo dõi tiến độ thanh quyết toán và kiểm soát toàn diện chi phí trong suốt vòng đời dự án.',
        'Xây dựng hệ thống định mức nội bộ chuẩn hóa cho doanh nghiệp.',
        'Rà soát hồ sơ kỹ thuật và hợp đồng, tham gia đàm phán và trực tiếp soạn thảo các điều khoản hợp đồng.'
      ],
      technologies: ['Excel', 'Word', 'Google Sheets', 'Power BI', 'G8/F1']
    }
  ],
  educations: [
    {
      id: 'edu-1',
      school: 'Trường Đại học Xây dựng Hà Nội (HUCE)',
      degree: 'Kỹ sư Kinh tế và Quản lý Xây dựng',
      period: '2015 - 2019',
      major: 'Kinh tế và Quản lý Xây dựng',
      description: 'Tốt nghiệp loại Khá (GPA: 2.8/4.0). Đạt Giải 3 Nghiên cứu Khoa học sinh viên cấp Trường. Nghiên cứu sâu về phân tích hiệu quả tài chính dự án, định mức đơn giá và số hóa quy trình quản lý chi phí đầu tư.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Chứng chỉ Định giá hạng III',
      issuer: 'Hội Kinh tế Xây dựng Việt Nam (VACE)',
      issueDate: '2025/2035',
      expiryDate: '2026',
      credentialId: 'AWS-SAA-839210',
      credentialUrl: '#'
    },
    {
      id: 'cert-2',
      name: 'Chứng chỉ Quản lý Dự án (QLDA) hạng III',
      issuer: 'Bộ Xây dựng / Hội đồng Đánh giá Năng lực',
      issueDate: '2025/2035',
      credentialId: 'PSM-782194',
      credentialUrl: '#'
    }
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Nhân viên Xuất sắc của Năm (Employee of the Year)',
      awarder: 'Ban Điều Hành Tập Đoàn',
      date: '2024',
      description: 'Ghi nhận đóng góp xuất sắc trong tối ưu hóa chi phí, cải tiến quy trình quản lý ngân sách và bàn giao các ứng dụng số đúng tiến độ.'
    },
    {
      id: 'award-2',
      title: 'Giải Nhất Hackathon Đổi Mới Sáng Tạo',
      awarder: 'Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA)',
      date: '2021',
      description: 'Dự án "AI Document Assistant" - Tự động trích xuất thông minh dữ liệu hóa đơn, dự toán và hồ sơ hợp đồng.'
    }
  ],
  skillCategories: [
    {
      categoryName: 'Chuyên Môn Kinh Tế Xây Dựng & Dự Toán (QS)',
      skills: [
        { name: 'G8 / F1 (Dự toán xây dựng & Bóc tách)', level: 80, experience: '6 năm' },
        { name: 'Lập Tổng Mức Đầu Tư (TMĐT) & Dòng Tiền', level: 95, experience: '6 năm' },
        { name: 'Quản Lý Hợp Đồng & Thanh Quyết Toán', level: 90, experience: '6 năm' },
        { name: 'Luật Xây Dựng & Quy Chuẩn Pháp Lý', level: 85, experience: '5 năm' },
        { name: 'Hệ Thống SAP ERP', level: 60, experience: '2 năm' },
        { name: 'MS Office & Excel Nâng Cao (Power Query)', level: 95, experience: '6 năm' },
        { name: 'MS Project (Quản Lý Kế Hoạch & Tiến Độ)', level: 88, experience: '5 năm' }
      ]
    },
    {
      categoryName: 'Ứng Dụng AI & Tự Động Hóa Công Việc',
      skills: [
        { name: 'Mô Hình AI (GPT, Gemini, Antigravity)', level: 90, experience: '3 năm' },
        { name: 'Xây Dựng Web App Quản Lý Chi Phí', level: 90, experience: '3 năm' },
        { name: 'Power BI & Trực Quan Hóa Dữ Liệu Dự Án', level: 90, experience: '4 năm' },
        { name: 'Tự Động Hóa Trích Xuất Hồ Sơ & Hợp Đồng', level: 90, experience: '3 năm' },
        { name: 'Chuẩn Hóa Quy Trình & Số Hóa Dữ Liệu', level: 90, experience: '5 năm' }
      ]
    }
  ]
};

// ==========================================
// 2. CHINESE PROFILE (ZH / CHINA)
// ==========================================
export const PROFILE_ZH: UserProfile = {
  fullName: "裴越黄 (Bui Viet Hoang)",
  title: "工程经济与造价工程师",
  headline: "工程造价与经济专家 | AI及自动化在项目管理、成本与投资预算中的应用先锋",
  bio: "拥有6年工程造价、招投标、合同管理及项目财务管控经验的工程经济工程师，曾服务于Vinhomes、第36总公司、河都集团等大型业主及企业。在合同管理、工程结算与决算、预算控制、总投资估算（TMĐT）以及房地产与能源（水电、风电）项目投资效益分析方面具有突出优势。\n将深厚的工程经济专业能力与现代技术紧密结合：精通高级Excel、Power Query、Power BI、G8/F1造价软件、SAP ERP以及主流AI大模型（GPT、Gemini、Antigravity）。具备自主开发Web应用（Web Apps）及业务流程自动化能力，致力于为业主实现数据标准化、提升工作效率并深度优化投资成本。",
  dateOfBirth: "06/03/1997",
  yearsOfExperience: 6,
  location: "越南 河内",
  phone: "0822510178",
  email: "buiviethoangktxd@gmail.com",
  cvDownloadUrl: "#",
  completedProjectsCount: 3,
  availableForHire: true,
  avatarUrl: AVATAR_URL,
  socialLinks: {
    website: "https://viethoang-portfolio.dev",
    github: "https://github.com/Huangboy17",
    linkedin: "https://www.linkedin.com/in/viet-hoang-bui-249532212/",
    telegram: "https://t.me/hoangbv_ktxd"
  },
  experiences: [
    {
      id: "exp-1",
      company: "富田集团 (Phu Dien Group)",
      companyUrl: "https://example.com",
      location: "越南 河内",
      role: "工程造价与经济专员",
      type: "全职",
      period: "07/2026 - 至今",
      summary: "负责市政基础设施项目的成本管理、预算监控及现金流追踪；主导研发并交付集团内部项目成本管理Web应用系统。",
      achievements: [
        "监控项目预算，把控现金流，分阶段动态跟踪并更新项目成本执行情况。",
        "负责分配标段的承包商寻源、资信评估及招标选定工作。",
        "编制标段预算造价，主导合同履约跟踪以及各分配合同的工程结算与决算。"
      ],
      technologies: [
        "AI与自动化",
        "高级Excel",
        "G8 / F1造价软件",
        "Word",
        "Power BI"
      ]
    },
    {
      id: "exp-2",
      company: "Vinhomes股份公司 (Vingroup集团)",
      companyUrl: "https://vinhomes.vn",
      location: "越南 河内市",
      role: "预算与造价专员",
      type: "全职",
      period: "04/2026 - 06/2026",
      summary: "负责大型城市综合体、主题公园、高层建筑、办公总部及配套基础设施项目的内部造价编制、分包工程预算制定，并在SAP系统上全流程管理造价数据。",
      achievements: [
        "编制大型开发项目（城市综合体、高层建筑、基础设施）的内部预算与发包标底。",
        "审查咨询单位编制的国家预算投资项目工程造价及总投资估算（TMĐT）。",
        "统筹主导所分配工程项目的投资预算编制与成本控制工作。",
        "严格遵循集团标准规范，在SAP ERP系统中执行成本与投资数据的维护、同步与归档。"
      ],
      technologies: [
        "SAP ERP",
        "Excel (Power Query)",
        "Outlook",
        "工程造价"
      ]
    },
    {
      id: "exp-3",
      company: "第36总公司 (越南国防部)",
      location: "越南 河内",
      role: "高级投资专员",
      type: "全职",
      period: "06/2024 - 03/2026",
      summary: "负责房地产、水电及可再生能源（风电）项目的预算监控、现金流管理、总投资估算（TMĐT）编制及项目财务可行性分析。",
      achievements: [
        "监控预算执行，把控现金流，定期更新各工程阶段的成本与资金计划偏差。",
        "编制房地产、水电、风电项目的总投资估算、资金筹措计划并进行财务效益评价（NPV、IRR）。",
        "撰写投资可行性研究与评估报告，为高层经营决策提供依据。",
        "定期汇总编制产值、营收及投资成本分析报告。"
      ],
      technologies: [
        "Excel",
        "Word",
        "G8造价软件",
        "Google Sheets",
        "财务分析"
      ]
    },
    {
      id: "exp-4",
      company: "Za Hung股份公司",
      location: "越南 河内",
      role: "投资计划专员",
      type: "全职",
      period: "10/2022 - 05/2024",
      summary: "主管房地产、水电及新能源项目的总投资编制、投资效益测算、现金流监控及招投标采购工作。",
      achievements: [
        "编制房地产、水电及风电项目的投资估算、资金计划与经济评价分析。",
        "跟踪管控工程建设预算与资金支付节点，定期更新项目成本投入。",
        "组织开展分配工程标段的供应商与承包商寻源、商务评标及定标工作。",
        "定期汇总编制项目经营与投资进展报表。"
      ],
      technologies: [
        "Excel",
        "G8造价软件",
        "Word",
        "Google Sheets",
        "招投标管理"
      ]
    },
    {
      id: "exp-5",
      company: "AMD建筑工程技术股份公司",
      location: "越南 河内",
      role: "QS与招投标部副经理",
      type: "全职",
      period: "02/2020 - 09/2022",
      summary: "主持民用建筑工程的算量套价、投标报价、合同全生命周期管理、工程款结算与决算，并搭建企业内部企业定额体系。",
      achievements: [
        "主持民建工程的工程量清单（BOQ）算量、造价编制及完整投标文件编制。",
        "主持合同商务管理、工程进度款审核、竣工决算及全生命周期成本控制。",
        "主导建立并标准化企业内部施工与工料消耗定额数据库。",
        "审查技术图纸与商务条款，直接参与合同商务谈判并起草关键条款。"
      ],
      technologies: [
        "Excel",
        "Word",
        "Google Sheets",
        "Power BI",
        "G8/F1造价软件"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "工程项目成本与预算智能管理系统",
      tagline: "演示账号: Toghetcrush@gmail.com | 密码: 12345678",
      category: "SaaS",
      role: "产品创始人 & 主导开发者",
      featured: true,
      completionYear: "2026",
      liveUrl: "https://quan-ly-cp-da.vercel.app/",
      githubUrl: "https://github.com/viethoangdev/construction-cost-manager",
      image: "https://lh3.googleusercontent.com/d/1dOeGm3HYWkUHaRxL30VUobzM1bWVq9c3",
      description: "专为企业数字化转型打造的工程造价与成本控制系统，全面实现投资估算监控、动态预算调度与阶段现金流预测，支持分包结算智能比对与超概预警。",
      metrics: "周/月度成本报表汇总耗时缩减65%，人工数据复核误差降低95%",
      challenges: [
        "处理并同步来自多个国家定额体系与专业分项的海量工程造价数据",
        "基于工程经济专业逻辑设计高易用性UI，并规范多层级权限管理体系"
      ],
      keyFeatures: [
        "多阶段动态追踪预算执行、现金流流向与实际发生成本",
        "智能测算项目总投资（TMĐT）、现金流模型及财务可行性指标（NPV、IRR）",
        "分包档案全生命周期管理、工程款结算进度追踪与合同单价自动对账",
        "集成管理驾驶舱（Dashboard），实时可视化多维度成本构成"
      ],
      tags: [
        "AI Integration",
        "React",
        "Power BI",
        "Excel & Power Query",
        "SAP Integration",
        "G8/F1 DB"
      ],
      demoAccount: {
        note: "内置完整模拟数据的工程成本与预算管理演示账号",
        username: "toghetcrush@gmail.com",
        password: "12345678"
      }
    },
    {
      id: "proj-2",
      title: "工程验收与结算决算协同管理系统",
      tagline: "演示账号: taikhoanhoangso2@gmail.com | 密码: 123456",
      category: "AI & Tech",
      role: "产品创始人 & 主导开发者",
      featured: true,
      completionYear: "2025",
      liveUrl: "https://qcqs-me-ck-acceptance-payment-track.vercel.app/",
      githubUrl: "https://github.com/viethoangdev/costbot-ai-assistant",
      image: "https://lh3.googleusercontent.com/d/1y-tPjVx_LCnVzKC7aSij89b5hImqubZI",
      description: "面向总包及专业分包业务场景打造的现场验收、进度款审核与工程竣工决算全流程管理Web应用。",
      metrics: "8秒内解析超500个工程清单细目，定额智能对账匹配准确率达98%",
      challenges: [
        "解析非标准化、表格版式复杂的工程造价图纸与PDF扫描件",
        "深度调优Prompt工程，使AI大模型精准适配越南现行建筑工程定额与法规"
      ],
      keyFeatures: [
        "利用AI与OCR技术自动从扫描版PDF、图纸及Excel中提取工程量清单（BOQ）",
        "智能校核机械台班、材料与人工综合单价，自动匹配G8/F1定额库",
        "自动扫描并识别结算合同中隐含的法律风险与不利商务条款",
        "一键生成风险评估分析报告并输出合同谈判建议"
      ],
      tags: [
        "Gemini API",
        "Python / FastAPI",
        "Vector Embeddings",
        "OCR",
        "React",
        "TailwindCSS"
      ],
      demoAccount: {
        note: "内置大型城市综合体造价清单及EPC总承包合同范本供测试体验",
        username: "taikhoanhoangso2@gmail.com",
        password: "123456"
      }
    },
    {
      id: "proj-1787676289453",
      title: "智能简历生成与管理平台",
      tagline: "随心定制专属你的专业简历",
      category: "SaaS",
      role: "产品作者 & 主导研发",
      featured: false,
      published: true,
      completionYear: "2026",
      liveUrl: "https://cv-management-xi.vercel.app/",
      image: "https://drive.google.com/thumbnail?id=1bvkf4FzkK-RlhZaPkpSrOcegeuYCDk4q&sz=w1600",
      description: "支持用户高度自由地定制和导出个性化简历，可自由勾选、过滤展示板块并实时排版输出。",
      keyFeatures: [],
      tags: [
        "React",
        "AI Integration"
      ]
    }
  ],
  skillCategories: [
    {
      categoryName: "工程经济与工程造价（QS）专业技能",
      skills: [
        {
          name: "G8 / F1 (工程造价与算量清单)",
          experience: "6年",
          level: 80
        },
        {
          name: "总投资估算（TMĐT）与现金流测算",
          experience: "6年",
          level: 95
        },
        {
          name: "合同管理与工程结算决算",
          experience: "6年",
          level: 90
        },
        {
          name: "建筑法律法规与行业规范",
          experience: "5年",
          level: 85
        },
        {
          name: "SAP ERP系统",
          experience: "2年",
          level: 60
        },
        {
          name: "MS Office与高级Excel (Power Query)",
          experience: "6年",
          level: 95
        },
        {
          name: "MS Project (工程进度与计划管控)",
          experience: "5年",
          level: 88
        }
      ]
    },
    {
      categoryName: "AI赋能与工作流自动化应用",
      skills: [
        {
          name: "AI大模型应用 (GPT, Gemini, Antigravity)",
          experience: "3年",
          level: 90
        },
        {
          name: "工程成本管理Web应用开发",
          experience: "3年",
          level: 90
        },
        {
          name: "Power BI与项目数据可视化",
          experience: "4年",
          level: 90
        },
        {
          name: "合同文本与工程档案自动提取",
          experience: "3年",
          level: 90
        },
        {
          name: "业务流程标准化与数据数字化",
          experience: "5年",
          level: 90
        }
      ]
    }
  ],
  educations: [
    {
      id: "edu-1",
      school: "河内建筑大学 (Hanoi University of Civil Engineering)",
      degree: "工程经济与管理学士",
      major: "建筑经济与管理",
      period: "2015 - 2019",
      description: "以良好成绩毕业（GPA: 2.8/4.0）。荣获校级大学生科学研究三等奖。\n深入研究项目投资财务可行性评价、工料单价定额体系以及项目投资成本管理的数字化。"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "三级工程造价与估价执业证书",
      issuer: "越南工程经济协会 (VACE)",
      credentialId: "AWS-SAA-839210",
      issueDate: "2025/2035",
      expiryDate: "2026",
      credentialUrl: "#"
    },
    {
      id: "cert-2",
      name: "三级工程项目管理执业证书",
      issuer: "越南建设部 / 职业能力评审委员会",
      credentialId: "PSM-782194",
      issueDate: "2025/2035",
      credentialUrl: "#"
    }
  ],
  awards: [
    {
      id: "award-1",
      title: "年度最佳员工 (Employee of the Year)",
      awarder: "NextWave Corp / 集团执行董事会",
      date: "2024",
      description: "表彰在成本优化、预算管理流程革新以及主导数字化系统按期交付方面的卓越贡献。"
    },
    {
      id: "award-2",
      title: "科技创新黑客松 (Hackathon) 一等奖",
      awarder: "越南软件与IT服务协会 (VINASA)",
      date: "2021",
      description: "“AI Document Assistant”项目 - 实现发票、工程造价文件及商务合同的数据智能自动化提取。"
    }
  ]
};

// ==========================================
// 3. ENGLISH PROFILE (EN / ENG)
// ==========================================
export const PROFILE_EN: UserProfile = {
  fullName: "Bui Viet Hoang",
  title: "Construction Economics Engineer",
  headline: "Construction Economics Specialist & Pioneer in AI / Automation for Project Management, Cost & Investment Budgeting",
  bio: "Construction Economics Engineer with 6+ years of experience in cost management, bidding, contract administration, and project finance across leading developers and enterprises such as Vinhomes, 36 Corporation, Ha Do Group, etc. Proven expertise in contract administration, settlement & final accounts, budget control, Total Investment Cost estimation (TIC/TMDT), and investment feasibility analysis in real estate and energy (hydropower, wind power).\nSeamlessly bridging deep construction economics expertise with modern technology: proficient in Advanced Excel, Power Query, Power BI, G8/F1 estimation software, SAP ERP, and Generative AI models (GPT, Gemini, Antigravity). Highly capable of building custom Web Apps and automating workflows to standardize project data, enhance team productivity, and optimize costs for Employers & Developers.",
  dateOfBirth: "06/03/1997",
  yearsOfExperience: 6,
  location: "Hanoi, Vietnam",
  phone: "0822510178",
  email: "buiviethoangktxd@gmail.com",
  cvDownloadUrl: "#",
  completedProjectsCount: 3,
  availableForHire: true,
  avatarUrl: AVATAR_URL,
  socialLinks: {
    website: "https://viethoang-portfolio.dev",
    github: "https://github.com/Huangboy17",
    linkedin: "https://www.linkedin.com/in/viet-hoang-bui-249532212/",
    telegram: "https://t.me/hoangbv_ktxd"
  },
  experiences: [
    {
      id: "exp-1",
      company: "Phu Dien Group",
      companyUrl: "https://example.com",
      location: "Hanoi, Vietnam",
      role: "Construction Economics Specialist",
      type: "Full-time",
      period: "07/2026 - Present",
      summary: "In charge of cost management, budget monitoring, and cash flow tracking for Technical Infrastructure projects; directly developed in-house Web Applications for corporate project cost management.",
      achievements: [
        "Monitored project budgets, controlled cash flows, and periodically updated cost performance across project phases.",
        "Sourced, evaluated, and selected subcontractors and suppliers for assigned bidding packages.",
        "Prepared tender cost estimates, administered contracts, and finalized settlements & accounts for assigned packages."
      ],
      technologies: [
        "AI & Automation",
        "Advanced Excel",
        "G8 / F1",
        "Word",
        "Power BI"
      ]
    },
    {
      id: "exp-2",
      company: "Vinhomes JSC (Vingroup)",
      companyUrl: "https://vinhomes.vn",
      location: "Hanoi",
      role: "Budget & Cost Estimation Specialist",
      type: "Full-time",
      period: "04/2026 - 06/2026",
      summary: "Prepared internal cost estimates, established tender package budgets, and managed cost data on SAP ERP for mega urban developments, theme parks, high-rise buildings, headquarters, and technical infrastructure.",
      achievements: [
        "Formulated internal estimates and package budgets for mega-scale urban areas, commercial towers, and infrastructure works.",
        "Appraised cost estimates and Total Investment Costs for state-funded and consultant-prepared submissions.",
        "Led assigned project scopes in investment budget administration and cost control.",
        "Updated, synchronized, and maintained cost and investment data on SAP ERP adhering to standardized corporate workflows."
      ],
      technologies: [
        "SAP ERP",
        "Excel (Power Query)",
        "Outlook",
        "Construction Estimation"
      ]
    },
    {
      id: "exp-3",
      company: "36 Corporation (Ministry of National Defence)",
      location: "Hanoi",
      role: "Senior Investment Specialist",
      type: "Full-time",
      period: "06/2024 - 03/2026",
      summary: "Tracked budgets, controlled cash flow, formulated Total Investment Costs (TIC), and performed financial feasibility modeling for real estate, hydropower, and renewable energy projects.",
      achievements: [
        "Tracked budgets, controlled cash flow, and updated actual expenditure against budget plans for each phase.",
        "Calculated Total Investment Costs (TMDT), projected cash flows, and conducted financial return analysis (NPV, IRR) for real estate, hydropower, and wind power projects.",
        "Drafted investment appraisal dossiers and reports to assist executive decision-making.",
        "Aggregated periodic production output, cost tracking, and revenue reports."
      ],
      technologies: [
        "Excel",
        "Word",
        "G8",
        "Google Sheets",
        "Financial Modeling"
      ]
    },
    {
      id: "exp-4",
      company: "Za Hung Joint Stock Company",
      location: "Hanoi",
      role: "Investment & Planning Specialist",
      type: "Full-time",
      period: "10/2022 - 05/2024",
      summary: "Responsible for Total Investment Cost planning, financial evaluation, cash flow governance, and procurement for real estate, hydro, and renewable energy assets.",
      achievements: [
        "Formulated Total Investment Costs, cash flow schedules, and economic feasibility evaluations for real estate, hydro, and wind power projects.",
        "Monitored project budgets, controlled disbursement schedules, and reported milestone-based expenditure.",
        "Executed contractor sourcing, qualification screening, and commercial bidding evaluation.",
        "Synthesized monthly and quarterly management progress reports."
      ],
      technologies: [
        "Excel",
        "G8",
        "Word",
        "Google Sheets",
        "Tendering & Procurement"
      ]
    },
    {
      id: "exp-5",
      company: "AMD Architecture & Engineering JSC",
      location: "Hanoi",
      role: "Deputy Head of QS & Tendering",
      type: "Full-time",
      period: "02/2020 - 09/2022",
      summary: "Led bill of quantities (BOQ) takeoff, cost estimation, contract administration, payment settlements, and built the internal cost norm database.",
      achievements: [
        "Supervised BOQ quantity takeoffs, cost estimation, and complete bid dossier preparation for building projects.",
        "Managed contract execution, payment/settlement milestone tracking, and full lifecycle cost control.",
        "Standardized and built the company's internal unit rate and productivity norm database.",
        "Reviewed technical drawings, commercial terms, and negotiated contract conditions."
      ],
      technologies: [
        "Excel",
        "Word",
        "Google Sheets",
        "Power BI",
        "G8/F1"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Project Cost & Budget Management App",
      tagline: "Demo: Toghetcrush@gmail.com | Pass: 12345678",
      category: "SaaS",
      role: "App Creator & Lead Developer",
      featured: true,
      completionYear: "2026",
      liveUrl: "https://quan-ly-cp-da.vercel.app/",
      githubUrl: "https://github.com/viethoangdev/construction-cost-manager",
      image: "https://lh3.googleusercontent.com/d/1dOeGm3HYWkUHaRxL30VUobzM1bWVq9c3",
      description: "An enterprise web solution digitalizing investment cost control, budget scheduling, and cash flow forecasting across project milestones. Automates contractor billing reconciliation and budget overrun alerts.",
      metrics: "Saves 65% of weekly/monthly cost reporting time; reduces 95% of manual calculation discrepancies",
      challenges: [
        "Processing and unifying massive estimation datasets across diverse government norms and technical trades",
        "Designing an intuitive UI tailored for construction economics workflows and multi-level role-based permissions"
      ],
      keyFeatures: [
        "Real-time budget monitoring, cash flow tracking, and milestone expenditure auditing",
        "Total Investment Cost (TIC) computation, cash flow projection, and financial metrics (NPV, IRR)",
        "Subcontractor dossier management, payment milestone tracking, and contract unit price reconciliation",
        "Executive dashboard visualizing dynamic cost breakdown structures in real time"
      ],
      tags: [
        "AI Integration",
        "React",
        "Power BI",
        "Excel & Power Query",
        "SAP Integration",
        "G8/F1 DB"
      ],
      demoAccount: {
        note: "Fully simulated Project Cost & Budget Management test account",
        username: "toghetcrush@gmail.com",
        password: "12345678"
      }
    },
    {
      id: "proj-2",
      title: "Acceptance, Payment & Settlement Manager",
      tagline: "Demo: taikhoanhoangso2@gmail.com | Pass: 123456",
      category: "AI & Tech",
      role: "App Creator & Lead Developer",
      featured: true,
      completionYear: "2025",
      liveUrl: "https://qcqs-me-ck-acceptance-payment-track.vercel.app/",
      githubUrl: "https://github.com/viethoangdev/costbot-ai-assistant",
      image: "https://lh3.googleusercontent.com/d/1y-tPjVx_LCnVzKC7aSij89b5hImqubZI",
      description: "Web App for site acceptance, progressive billing, and final account settlement, customized for General Contractor and Subcontractor workflows.",
      metrics: "Parses 500+ estimation line items in 8 seconds with a 98% norm verification accuracy",
      challenges: [
        "Parsing unstructured, non-standardized tabular formats in construction estimation PDFs and spreadsheets",
        "Prompt engineering to align AI outputs with Vietnamese construction norms and regulations"
      ],
      keyFeatures: [
        "Automated quantity extraction and BOQ takeoff from Scanned PDFs, drawings, and Excel sheets",
        "Unit price auditing for equipment, materials, and labor against standard G8/F1 norm databases",
        "Automatic detection of high-risk clauses or unfavorable legal terms in draft contracts",
        "1-click generation of risk mitigation summaries and contract negotiation points"
      ],
      tags: [
        "Gemini API",
        "Python / FastAPI",
        "Vector Embeddings",
        "OCR",
        "React",
        "TailwindCSS"
      ],
      demoAccount: {
        note: "Preloaded with sample EPC contracts and urban development BOQ data",
        username: "taikhoanhoangso2@gmail.com",
        password: "123456"
      }
    },
    {
      id: "proj-1787676289453",
      title: "Automated CV & Resume Builder",
      tagline: "Build your professional resume your way",
      category: "SaaS",
      role: "Author & Lead Developer",
      featured: false,
      published: true,
      completionYear: "2026",
      liveUrl: "https://cv-management-xi.vercel.app/",
      image: "https://drive.google.com/thumbnail?id=1bvkf4FzkK-RlhZaPkpSrOcegeuYCDk4q&sz=w1600",
      description: "Enables users to customize and export resumes dynamically, allowing selective inclusion or exclusion of profile sections, metrics, and styling.",
      keyFeatures: [],
      tags: [
        "React",
        "AI Integration"
      ]
    }
  ],
  skillCategories: [
    {
      categoryName: "Construction Economics & Quantity Surveying (QS)",
      skills: [
        {
          name: "G8 / F1 (Cost Estimation & BOQ Takeoff)",
          experience: "6 years",
          level: 80
        },
        {
          name: "Total Investment Cost (TIC) & Cash Flow Modeling",
          experience: "6 years",
          level: 95
        },
        {
          name: "Contract Administration & Final Settlements",
          experience: "6 years",
          level: 90
        },
        {
          name: "Construction Law & Regulations",
          experience: "5 years",
          level: 85
        },
        {
          name: "SAP ERP System",
          experience: "2 years",
          level: 60
        },
        {
          name: "MS Office & Advanced Excel (Power Query)",
          experience: "6 years",
          level: 95
        },
        {
          name: "MS Project (Scheduling & Progress Control)",
          experience: "5 years",
          level: 88
        }
      ]
    },
    {
      categoryName: "AI Application & Workflow Automation",
      skills: [
        {
          name: "AI Models (GPT, Gemini, Antigravity)",
          experience: "3 years",
          level: 90
        },
        {
          name: "Cost Management Web App Development",
          experience: "3 years",
          level: 90
        },
        {
          name: "Power BI & Project Data Visualization",
          experience: "4 years",
          level: 90
        },
        {
          name: "Automated Contract & BOQ Extraction",
          experience: "3 years",
          level: 90
        },
        {
          name: "Workflow Standardization & Digitalization",
          experience: "5 years",
          level: 90
        }
      ]
    }
  ],
  educations: [
    {
      id: "edu-1",
      school: "Hanoi University of Civil Engineering (HUCE)",
      degree: "Bachelor of Engineering in Construction Economics & Management",
      major: "Construction Economics & Management",
      period: "2015 - 2019",
      description: "Graduated with Credit (GPA: 2.8/4.0). Awarded 3rd Prize in University Student Scientific Research.\nSpecialized research in financial feasibility analysis, cost unit pricing norms, and digitalization of project investment cost management."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Class III Construction Valuation Practicing Certificate",
      issuer: "Vietnam Association of Construction Economics (VACE)",
      credentialId: "AWS-SAA-839210",
      issueDate: "2025/2035",
      expiryDate: "2026",
      credentialUrl: "#"
    },
    {
      id: "cert-2",
      name: "Class III Project Management Practicing Certificate",
      issuer: "Ministry of Construction / Capacity Assessment Council",
      credentialId: "PSM-782194",
      issueDate: "2025/2035",
      credentialUrl: "#"
    }
  ],
  awards: [
    {
      id: "award-1",
      title: "Employee of the Year",
      awarder: "NextWave Corp / Group Executive Board",
      date: "2024",
      description: "Recognized for outstanding contributions in cost optimization, budget management workflow enhancements, and leading on-time digital application deliveries."
    },
    {
      id: "award-2",
      title: "First Prize - Tech Innovation Hackathon",
      awarder: "Vietnam Software and IT Services Association (VINASA)",
      date: "2021",
      description: "\"AI Document Assistant\" project - Automated extraction of invoices, BOQ estimates, and commercial contract dossiers."
    }
  ]
};

// ==========================================
// 4. KOREAN PROFILE (KO / KOREA)
// ==========================================
export const PROFILE_KO: UserProfile = {
  fullName: "부이 비엣 황 (Bui Viet Hoang)",
  title: "건설경제 및 적산·공사비 관리 엔지니어",
  headline: "건설경제 전문가 | 프로젝트 관리, 공사비 및 투자 예산 분야 AI·자동화 도입 선구자",
  bio: "Vinhomes, 제36총공사, Ha Do 그룹 등 주요 발주처 및 대기업에서 6년간 공사비 관리, 입찰, 계약 관리, 프로젝트 파이낸싱을 담당해 온 건설경제 엔지니어입니다. 계약 관리, 기성 및 준공정산, 예산 통제, 총사업비(TMĐT) 산정, 부동산 및 에너지(수력, 풍력) 프로젝트의 투자 타당성 분석에 탁월한 전문성을 보유하고 있습니다.\n심도 있는 건설경제 실무 역량과 첨단 기술을 결합하여, 고급 Excel, Power Query, Power BI, G8/F1 적산 프로그램, SAP ERP 및 생성형 AI 모델(GPT, Gemini, Antigravity)을 능숙하게 다룹니다. 자체 웹 애플리케이션(Web Apps) 개발 및 업무 자동화 능력을 바탕으로 발주처의 데이터 표준화, 업무 생산성 증대 및 투자비 최적화를 실현합니다.",
  dateOfBirth: "06/03/1997",
  yearsOfExperience: 6,
  location: "베트남 하노이",
  phone: "0822510178",
  email: "buiviethoangktxd@gmail.com",
  cvDownloadUrl: "#",
  completedProjectsCount: 3,
  availableForHire: true,
  avatarUrl: AVATAR_URL,
  socialLinks: {
    website: "https://viethoang-portfolio.dev",
    github: "https://github.com/Huangboy17",
    linkedin: "https://www.linkedin.com/in/viet-hoang-bui-249532212/",
    telegram: "https://t.me/hoangbv_ktxd"
  },
  experiences: [
    {
      id: "exp-1",
      company: "푸디엔 그룹 (Phu Dien Group)",
      companyUrl: "https://example.com",
      location: "베트남 하노이",
      role: "건설경제 및 적산 담당관",
      type: "정규직",
      period: "07/2026 - 현재",
      summary: "도시 인프라 프로젝트의 사업비 관리, 예산 모니터링 및 현금 흐름 추적을 총괄하며, 그룹 사내 프로젝트 사업비 관리 전용 웹 애플리케이션을 직접 개발 및 구축하였습니다.",
      achievements: [
        "프로젝트 예산을 모니터링하고 현금 흐름을 통제하며, 단계별 사업비 집행 현황을 정기적으로 업데이트.",
        "담당 패키지 공사의 하도급 업체 소싱, 적격성 심사 및 협력업체 선정 주도.",
        "공사 패키지 내역서 및 실행예산 작성, 계약 이행 관리, 담당 공사 계약의 기성 및 준공정산 총괄."
      ],
      technologies: [
        "AI 및 자동화",
        "고급 Excel",
        "G8 / F1 적산 프로그램",
        "Word",
        "Power BI"
      ]
    },
    {
      id: "exp-2",
      company: "Vinhomes 주식회사 (Vingroup)",
      companyUrl: "https://vinhomes.vn",
      location: "베트남 하노이시",
      role: "예산 및 적산(공사비) 담당관",
      type: "정규직",
      period: "04/2026 - 06/2026",
      summary: "대규모 신도시 복합개발, 테마파크, 초고층 빌딩, 사옥 및 기반시설 프로젝트의 사내 실행예산 산정, 발주 패키지 예산 수립 및 SAP ERP 시스템 기반 공사비 데이터 총괄 관리.",
      achievements: [
        "대형 개발 프로젝트(신도시, 고층 빌딩, 기반시설 등)의 내부 실행예산 및 발주 예산 수립.",
        "설계용역사에서 작성한 국고 예산 프로젝트의 공사비 내역서 및 총사업비(TMĐT) 검토 및 감액 심사.",
        "배정된 주요 프로젝트의 투자 예산 편성 및 공사비 관리 업무 주도.",
        "그룹 표준 프로세스에 따라 SAP ERP 시스템 내 공사비 및 투자 데이터의 실시간 입력, 동기화 및 유지관리."
      ],
      technologies: [
        "SAP ERP",
        "Excel (Power Query)",
        "Outlook",
        "건설 공사비 적산"
      ]
    },
    {
      id: "exp-3",
      company: "제36총공사 (베트남 국방부)",
      location: "베트남 하노이",
      role: "시니어 투자 관리 담당관",
      type: "정규직",
      period: "06/2024 - 03/2026",
      summary: "부동산, 수력발전 및 신재생에너지(풍력) 프로젝트의 예산 집행 모니터링, 현금 흐름 통제, 총사업비(TMĐT) 산정 및 재무적 타당성 분석 총괄.",
      achievements: [
        "사업 예산 및 현금 흐름을 통제하고, 단계별 실제 사업비 집행 현황을 모니터링하여 보고.",
        "부동산, 수력발전, 풍력발전 프로젝트의 총사업비 산정, 자금 계획 수립 및 재무성 분석(NPV, IRR 산출).",
        "의사결정권자를 위한 투자 심사 보고서 및 타당성 분석서 작성 지원.",
        "정기 기성 실적, 매출액 및 투자비 정기 보고서 집계 및 분석."
      ],
      technologies: [
        "Excel",
        "Word",
        "G8 적산 프로그램",
        "Google Sheets",
        "재무 타당성 분석"
      ]
    },
    {
      id: "exp-4",
      company: "Za Hung 주식회사",
      location: "베트남 하노이",
      role: "투자 기획 담당관",
      type: "정규직",
      period: "10/2022 - 05/2024",
      summary: "부동산, 수력 및 재생에너지 프로젝트의 총사업비 산정, 투자 경제성 분석, 자금 집행 통제 및 시공사 입찰·선정 주관.",
      achievements: [
        "부동산, 수력발전 및 풍력 프로젝트의 총사업비 산정, 현금 흐름 스케줄 및 투자 타당성 분석 수립.",
        "프로젝트별 예산 집행 관리, 자금 지출 일정 모니터링 및 실시간 비용 투입 현황 업데이트.",
        "담당 공구별 협력업체 발굴, 입찰 서류 심사 및 시공업체 선정 절차 주관.",
        "사업 진행 실적 및 경영 보고서 정기 집계."
      ],
      technologies: [
        "Excel",
        "G8 적산 프로그램",
        "Word",
        "Google Sheets",
        "입찰 및 조달 관리"
      ]
    },
    {
      id: "exp-5",
      company: "AMD 건축엔지니어링 주식회사",
      location: "베트남 하노이",
      role: "QS(적산) 및 입찰계약부 부서장(차장)",
      type: "정규직",
      period: "02/2020 - 09/2022",
      summary: "건축 공사의 물량산출(BOQ), 견적·내역서 작성, 입찰 계약 관리, 기성 및 준공정산 총괄, 사내 표준 품셈 및 단가 데이터베이스 구축.",
      achievements: [
        "건축 프로젝트 물량 산출, 내역서 작성 및 완성도 높은 입찰 제안서 작성 총괄.",
        "계약 이행 관리, 기성고 청구 및 준공정산, 프로젝트 전 생애주기 공사비 통제 주도.",
        "기업 맞춤형 사내 표준 품셈 및 단위 단가 데이터베이스 구축 및 표준화.",
        "도면 및 계약 기술조건 검토, 계약 협상 주도 및 주요 상업 계약 조항 작성."
      ],
      technologies: [
        "Excel",
        "Word",
        "Google Sheets",
        "Power BI",
        "G8/F1 적산 프로그램"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "프로젝트 공사비 및 예산 통합 관리 앱",
      tagline: "체험 계정: Toghetcrush@gmail.com | 비밀번호: 12345678",
      category: "SaaS",
      role: "제품 창립자 및 리드 개발자",
      featured: true,
      completionYear: "2026",
      liveUrl: "https://quan-ly-cp-da.vercel.app/",
      githubUrl: "https://github.com/viethoangdev/construction-cost-manager",
      image: "https://lh3.googleusercontent.com/d/1dOeGm3HYWkUHaRxL30VUobzM1bWVq9c3",
      description: "프로젝트 단계별 투자비 통제, 예산 편성 및 현금 흐름 예측 프로세스를 전면 디지털화한 사내 엔터프라이즈 시스템. 하도급 정산 자동 대사 및 예산 초과 방지 경보 기능을 제공합니다.",
      metrics: "주간/월간 공사비 보고서 취합 시간 65% 단축, 수기 검증 오류 95% 감소",
      challenges: [
        "다양한 공종과 국가 표준 품셈 기준의 방대한 적산 데이터 통합 및 실시간 동기화",
        "건설경제 실무자에 최적화된 UI/UX 설계 및 다단계 프로젝트 권한 관리 체계 구축"
      ],
      keyFeatures: [
        "단계별 실시간 예산 집행 현황, 현금 흐름 통제 및 비용 집행 추적",
        "총사업비(TMĐT) 산정, 자금 수지 계획 및 투자 타당성 지표(NPV, IRR) 자동 분석",
        "하도급 계약 내역 관리, 기성 청구 진척도 추적 및 계약 단가 자동 정합성 검증",
        "실시간 비용 구조를 다차원으로 시각화하는 임원진 경영 대시보드 탑재"
      ],
      tags: [
        "AI Integration",
        "React",
        "Power BI",
        "Excel & Power Query",
        "SAP Integration",
        "G8/F1 DB"
      ],
      demoAccount: {
        note: "시뮬레이션 데이터가 포함된 공사비 및 예산 관리 체험용 계정",
        username: "toghetcrush@gmail.com",
        password: "12345678"
      }
    },
    {
      id: "proj-2",
      title: "검측·기성 청구 및 준공정산 관리 시스템",
      tagline: "체험 계정: taikhoanhoangso2@gmail.com | 비밀번호: 123456",
      category: "AI & Tech",
      role: "제품 창립자 및 리드 개발자",
      featured: true,
      completionYear: "2025",
      liveUrl: "https://qcqs-me-ck-acceptance-payment-track.vercel.app/",
      githubUrl: "https://github.com/viethoangdev/costbot-ai-assistant",
      image: "https://lh3.googleusercontent.com/d/1y-tPjVx_LCnVzKC7aSij89b5hImqubZI",
      description: "원도급사 및 전문 하도급사의 현장 시공 검측, 기성 청구 승인, 최종 준공정산 업무에 최적화된 공사비 통합 관리 웹 애플리케이션.",
      metrics: "500개 이상의 내역 항목을 8초 내 파싱 완료, 표준 품셈 대사 정확도 98% 달성",
      challenges: [
        "비표준화된 적산 내역서(PDF 스캔본, 도면, 엑셀 시트)의 복잡한 표 구조 자동 파싱",
        "베트남 현행 건설 기준 품셈 및 법령에 부합하도록 AI 프롬프트 엔지니어링 최적화"
      ],
      keyFeatures: [
        "스캔된 PDF, 도면, 엑셀 파일로부터 물량내역서(BOQ) 및 수량 자동 추출",
        "장비 사용료, 자재비, 노무비 일위대가 검증 및 G8/F1 표준 품셈 데이터베이스 자동 대사",
        "계약서 내 잠재적 법적 리스크 및 불리한 상업적 독소 조항 자동 감지",
        "원클릭 리스크 요약 보고서 생성 및 계약 협상 가이드라인 도출"
      ],
      tags: [
        "Gemini API",
        "Python / FastAPI",
        "Vector Embeddings",
        "OCR",
        "React",
        "TailwindCSS"
      ],
      demoAccount: {
        note: "신도시 개발 적산 데이터 및 EPC 계약서 샘플이 탑재된 테스트 계정",
        username: "taikhoanhoangso2@gmail.com",
        password: "123456"
      }
    },
    {
      id: "proj-1787676289453",
      title: "맞춤형 스마트 이력서(CV) 자동 생성기",
      tagline: "나만의 맞춤형 커리어 포트폴리오를 만들어보세요",
      category: "SaaS",
      role: "프로젝트 기획 및 리드 개발자",
      featured: false,
      published: true,
      completionYear: "2026",
      liveUrl: "https://cv-management-xi.vercel.app/",
      image: "https://drive.google.com/thumbnail?id=1bvkf4FzkK-RlhZaPkpSrOcegeuYCDk4q&sz=w1600",
      description: "사용자가 원하는 경력 항목, 성과 지표, 보유 기술을 자유롭게 선택하고 편집하여 최적의 이력서 형식으로 추출할 수 있는 플랫폼.",
      keyFeatures: [],
      tags: [
        "React",
        "AI Integration"
      ]
    }
  ],
  skillCategories: [
    {
      categoryName: "건설경제 및 적산·공사비 관리(QS) 전문 역량",
      skills: [
        {
          name: "G8 / F1 (건설 적산 및 수량산출)",
          experience: "6년",
          level: 80
        },
        {
          name: "총사업비(TMĐT) 산정 및 현금 흐름 모델링",
          experience: "6년",
          level: 95
        },
        {
          name: "계약 관리 및 기성·준공정산",
          experience: "6년",
          level: 90
        },
        {
          name: "건설 관련 법률 및 국가 규정 이해",
          experience: "5년",
          level: 85
        },
        {
          name: "SAP ERP 시스템",
          experience: "2년",
          level: 60
        },
        {
          name: "MS Office 및 고급 Excel (Power Query)",
          experience: "6년",
          level: 95
        },
        {
          name: "MS Project (공정 계획 및 일정 관리)",
          experience: "5년",
          level: 88
        }
      ]
    },
    {
      categoryName: "AI 응용 및 업무 프로세스 자동화",
      skills: [
        {
          name: "생성형 AI 모델 활용 (GPT, Gemini, Antigravity)",
          experience: "3년",
          level: 90
        },
        {
          name: "공사비 관리 전용 웹 애플리케이션 개발",
          experience: "3년",
          level: 90
        },
        {
          name: "Power BI 및 프로젝트 데이터 시각화",
          experience: "4년",
          level: 90
        },
        {
          name: "계약서 및 적산 내역서 데이터 자동 추출",
          experience: "3년",
          level: 90
        },
        {
          name: "업무 프로세스 표준화 및 데이터 디지털화",
          experience: "5년",
          level: 90
        }
      ]
    }
  ],
  educations: [
    {
      id: "edu-1",
      school: "하노이 국립건설대학교 (Hanoi University of Civil Engineering)",
      degree: "건설경제 및 관리 공학사",
      major: "건설경제 및 관리",
      period: "2015 - 2019",
      description: "우수 등급 졸업 (GPA: 2.8/4.0). 교내 대학생 과학연구경진대회 3등상 수상.\n프로젝트 투자 타당성 재무 분석, 표준 일위대가 품셈 및 투자 사업비 관리의 디지털화 심층 연구."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "3급 건설원가산정(평가)사 자격증",
      issuer: "베트남 건설경제협회 (VACE)",
      credentialId: "AWS-SAA-839210",
      issueDate: "2025/2035",
      expiryDate: "2026",
      credentialUrl: "#"
    },
    {
      id: "cert-2",
      name: "3급 프로젝트관리(PM)사 자격증",
      issuer: "베트남 건설부 / 직무능력평가위원회",
      credentialId: "PSM-782194",
      issueDate: "2025/2035",
      credentialUrl: "#"
    }
  ],
  awards: [
    {
      id: "award-1",
      title: "올해의 우수 직원상 (Employee of the Year)",
      awarder: "NextWave Corp / 그룹 이사회",
      date: "2024",
      description: "공사비 절감, 예산 관리 프로세스 혁신 및 프로젝트 관리용 디지털 솔루션 적기 납품에 대한 탁월한 공로를 인정받아 수상."
    },
    {
      id: "award-2",
      title: "기술혁신 해커톤 (Hackathon) 1등상",
      awarder: "베트남 소프트웨어·IT서비스협회 (VINASA)",
      date: "2021",
      description: "\"AI Document Assistant\" 프로젝트 - 세금계산서, 공사비 적산서 및 상업 계약서 데이터 자동 추출 솔루션."
    }
  ]
};

// Map of all localized profiles
export const LOCALIZED_PROFILES: Record<Language, UserProfile> = {
  vi: PROFILE_VI,
  en: PROFILE_EN,
  zh: PROFILE_ZH,
  ko: PROFILE_KO
};
