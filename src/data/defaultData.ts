import { UserProfile } from '../types';

export const DEFAULT_PROFILE: UserProfile = {
  fullName: 'Bùi Việt Hoàng',
  title: 'Kỹ sư Kinh tế Xây dựng',
  headline: 'Chuyên gia Kinh tế Xây dựng & Tiên phong Ứng dụng AI / Tự động hóa trong Quản lý Dự án, Chi phí & Ngân sách Đầu tư',
  bio: 'Kỹ sư Kinh tế Xây dựng với 6 năm kinh nghiệm trong quản lý chi phí, đấu thầu, hợp đồng và tài chính dự án tại các chủ đầu tư và doanh nghiệp lớn như Vinhomes, Phú Điền, Tổng Công ty 36, Za Hưng và AMD. Có thế mạnh vượt trội về quản lý hợp đồng, thanh quyết toán, kiểm soát ngân sách, lập Tổng mức đầu tư (TMĐT) và phân tích hiệu quả dự án trong lĩnh vực bất động sản và năng lượng (thủy điện, điện gió).\nKết hợp nhuần nhuyễn nghiệp vụ kinh tế xây dựng chuyên sâu với công nghệ hiện đại: thành thạo Excel nâng cao, Power Query, Power BI, G8/F1, SAP ERP và các mô hình AI (GPT, Gemini, Antigravity). Có năng lực tự xây dựng ứng dụng (Web Apps) và tự động hóa quy trình nghiệp vụ nhằm chuẩn hóa dữ liệu, nâng cao hiệu suất và tối ưu hóa chi phí cho Chủ Đầu Tư.',
  avatarUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCARnA7EDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKbuo3UAOoqPefaneYvrQA6ikzRk+n60AJup1Mpfm9qAHUU1WDDING6gB1N3U6k20ALRTd1OoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopu6kL46kZ680APopiuWPTj1qpf6rFp1u9xOVigj5eSVhGqj1JbApJ3AtszDGAD60nm8dMe9ee+OfjF4M8L6FJeal4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Z/gBKk/Tmkr9RuxUttT028VvtEcFw4/juMBqsPoHha9iErWz20yn5ZoJSu32GKkaz0qdDvTYz9BsDVQ/4RWW0iHkn7TaN0eB84+oNUmmTLToW7K2S0je106eedD/BJJnP0zS3z2GsSpBqOlw3BjXYGWMI6j696zZdNnsvngupFk3YAuEKMn9DUN1f3ULgXULvIoyJImByPUf4Gmt0Josx6DP4VEt/4Zu7iaOI/vbeVQ5j/M/PS6Xr+jeK2f7Vttr0j70Pytu9s559jmq1nrsc7FoLlY5R0Qrtz9ar6hp9hqLH7VB9jnc5F5b8Z/3v/rYoE79DZv8AwtcWdq0m9GhYcSKd0c2eg/2G9jWVpTTWU0yAeb5Qw9lc9QPb/GlstQ1XSkaGTUYmhZNi7hmGf2Yfwt/tVrWtzb646o4FjqkXyrJ1dV9Dn7wNAJ3F0izL+dcaXuaEj95pzsdyH1Q1evNGiu4Fv7QC4Ea4LwfLPGe4kTowH0rDeW9tLt8o9tMhwPK+8PcV0ESJdPDfWl4lnqTLjzEbAn9MjsaFHsF11OTiaLzWSSAQwzcLNCcoD6H0qax1y60NzC4Z4Q3DDnaf9n2q4ZU1lLgLix1dC3mpswlxjrkf3vpismDU7uCUxLZreWmP31iTnd7o3Wi1w5ketaZ4pTxJb2tlrCFpJV32Gog7SzjohPY+/wCea5zXNDk1q4kUJ5GrwjlsYW7Xvj/aHpWMjWqLC1hctdaY2PNt5P8AWW5PdenT1rTt9bnniSBnDS2/Mcz/APLRe3Pr71zNWOpO+5Q0nUri0kFjcM8RIwM/db29j7V1ljcxJb7rljdIDtR1ODGfQ1zWr6VLrUbz2s6/asbvJYY8we3oazdF19orN7v5ZGt28i8tZAR5qe47H3rV6/CZp2+I9p+HPxN8Q/B/xbY+IfDWoMJAQrRr/q7le8Ug7E1+uHwR+Mej/G3wPYeJ9HkVRN+5u7MsDJazj70cg9R1z3Fficl6mnuXhcz6LdZALH5h7H/aHrXvv7LPx+u/2ffH9u8UZ1Hw3q4EeqW8T5cqOFmTnG5B14yRRTetmRVXNHmR+ve4bsdvWo3O9dp6VR0/U4NT0yK6tpBPbzRrPFIh4eNuQw/Cry7Xj3A81v1scZOqhRxS03dRuoAdRUW9/QUu8+1AD9w9aYJC3TFM2+5ojXyhgc/WgB26hif4WX8aXbSrCq9BQAu6nUm2loAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/Z',
  email: 'buiviethoangktxd@gmail.com',
  phone: '0822510178',
  location: 'Hà Nội, Việt Nam',
  dateOfBirth: '06/03/1997',
  availableForHire: true,
  yearsOfExperience: 6,
  completedProjectsCount: 12,
  socialLinks: {
    github: 'https://github.com/viethoangdev',
    linkedin: 'https://www.linkedin.com/in/viet-hoang-bui-249532212/',
    website: 'https://viethoang-portfolio.dev',
    telegram: 'https://t.me/hoangbv_ktxd',
  },
  cvDownloadUrl: '#',
  projects: [
    {
      id: 'proj-1',
      title: 'App Quản Lý Chi Phí & Ngân Sách Dự Án Tập Đoàn',
      tagline: 'Ứng dụng Web quản lý dòng tiền, kiểm soát định mức và giải ngân dự án Bất động sản, Năng lượng',
      description: 'Hệ thống phần mềm nội bộ số hóa toàn diện quy trình kiểm soát chi phí đầu tư, theo dõi kế hoạch ngân sách và phân tích dòng tiền dự án theo từng giai đoạn. Tự động hóa đối chiếu thanh quyết toán nhà thầu và cảnh báo vượt hạn mức dự toán.',
      liveUrl: 'https://example.com/demo/cost-management-app',
      githubUrl: 'https://github.com/viethoangdev/construction-cost-manager',
      category: 'SaaS',
      tags: ['AI Integration', 'React', 'Power BI', 'Excel & Power Query', 'SAP Integration', 'G8/F1 DB'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=1000&q=80',
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
        username: 'cld_manager@phudien.vn',
        password: 'PhuDien@Cost2026',
        note: 'Tài khoản Quản lý Chi phí & Ngân sách dự án đầy đủ dữ liệu mô phỏng'
      },
      completionYear: '2026'
    },
    {
      id: 'proj-2',
      title: 'CostBot AI - Trợ Lý Soát Xét Hợp Đồng & Dự Toán Xây Dựng',
      tagline: 'Ứng dụng AI (Gemini & GPT) tự động phân tích đơn giá, bóc tách khối lượng và đối chiếu định mức',
      description: 'Web App ứng dụng mô hình ngôn ngữ lớn (LLM) và OCR thông minh, cho phép tải lên hồ sơ dự toán, hợp đồng xây dựng dạng Excel, PDF để tự động kiểm tra sai lệch đơn giá, phát hiện điều khoản rủi ro và lập bảng so sánh.',
      liveUrl: 'https://example.com/demo/costbot-ai',
      githubUrl: 'https://github.com/viethoangdev/costbot-ai-assistant',
      category: 'AI & Tech',
      tags: ['Gemini API', 'Python / FastAPI', 'Vector Embeddings', 'OCR', 'React', 'TailwindCSS'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
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
        username: 'qs_engineer@demo.com',
        password: 'CostBot@AI2026',
        note: 'Có sẵn dữ liệu mẫu dự toán khu đô thị và hợp đồng EPC để thử nghiệm'
      },
      completionYear: '2025'
    },
    {
      id: 'proj-3',
      title: 'AutoQS - Nền Tảng Tự Động Hóa Bóc Tách Khối Lượng & Định Mức Nội Bộ',
      tagline: 'Hệ thống chuẩn hóa cơ sở dữ liệu định mức nội bộ doanh nghiệp và tra cứu dự toán nhanh',
      description: 'Phần mềm số hóa kho định mức nội bộ, liên kết dữ liệu định mức nhà nước (G8, F1) và hỗ trợ phòng QS/Đấu thầu lập giá dự thầu, kiểm soát hao phí vật tư và nhân công cho các công trình cao tầng, hạ tầng kỹ thuật.',
      liveUrl: 'https://example.com/demo/autoqs-system',
      githubUrl: 'https://github.com/viethoangdev/auto-qs-platform',
      category: 'Tools',
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'G8/F1 Database', 'TailwindCSS'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
      metrics: 'Chuẩn hóa hơn 2,500+ mã hiệu định mức nội bộ phục vụ hàng chục dự án quy mô lớn',
      role: 'Kỹ sư Kế hoạch & Trưởng nhóm phát triển phần mềm',
      keyFeatures: [
        'Thư viện mã hiệu định mức nội bộ doanh nghiệp được chuẩn hóa và tra cứu tức thì',
        'Tự động phân tích hao phí vật tư, chi phí trực tiếp và gián tiếp theo từng hạng mục',
        'Bóc tách khối lượng theo cấu kiện và xuất hồ sơ dự thầu tự động',
        'Lịch sử biến động giá vật liệu theo khu vực và cảnh báo tăng giá đột biến'
      ],
      challenges: [
        'Quy chuẩn hóa hàng nghìn công tác xây dựng đa dạng từ các dự án thực tế',
        'Đồng bộ dữ liệu thời gian thực giữa phòng Kỹ thuật, Ban Quản lý dự án và Kế toán'
      ],
      demoAccount: {
        username: 'bid_specialist@demo.com',
        password: 'AutoQS@Bid2026',
        note: 'Trải nghiệm tính năng tra cứu định mức và bóc tách dự toán'
      },
      completionYear: '2024'
    },
    {
      id: 'proj-4',
      title: 'Financial & Cashflow Dashboard - Phân Tích Hiệu Quả Đầu Tư Dự Án',
      tagline: 'Dashboard trực quan hóa mô hình tài chính (Financial Modeling), độ nhạy dòng tiền NPV & IRR',
      description: 'Bảng điều khiển quản trị tài chính dự án tích hợp Power BI và Web Dashboard, phục vụ Chủ đầu tư và Ban Lãnh đạo đánh giá tính khả thi tài chính của các dự án Bất động sản, Thủy điện và Điện gió.',
      liveUrl: 'https://example.com/demo/financial-cashflow-dashboard',
      githubUrl: 'https://github.com/viethoangdev/project-financial-dashboard',
      category: 'Fullstack',
      tags: ['Power BI', 'Financial Modeling', 'React', 'Recharts', 'Excel Power Query'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      metrics: 'Ứng dụng lập TMĐT và đánh giá hiệu quả đầu tư cho 5+ dự án BĐS & Năng lượng tái tạo',
      role: 'Chuyên viên Cao Cấp Đầu Tư & Data Analyst',
      keyFeatures: [
        'Mô phỏng động các kịch bản lãi suất, giá bán, thời gian thu hồi vốn (Payback Period)',
        'Phân tích độ nhạy của chỉ tiêu tài chính NPV, IRR theo các biến số chi phí đầu vào',
        'Biểu đồ kế hoạch dòng tiền thu - chi theo tháng/quý/năm',
        'Báo cáo phân tích cơ cấu nguồn vốn (vốn chủ sở hữu, vốn vay thương mại, trái phiếu)'
      ],
      completionYear: '2025'
    },
    {
      id: 'proj-5',
      title: 'SAP Cost Bridge - Công Cụ Đồng Bộ & Chuẩn Hóa Dữ Liệu Chi Phí SAP ERP',
      tagline: 'Tiện ích trích xuất, đối chiếu và chuẩn hóa dữ liệu ngân sách chi phí xây dựng vào hệ thống SAP',
      description: 'Công cụ phần mềm hỗ trợ kỹ sư kinh tế xây dựng trích xuất dữ liệu dự toán chi tiết, chuyển đổi định dạng tự động và đồng bộ vào các phân hệ quản lý chi phí đầu tư trên hệ thống SAP ERP tập đoàn.',
      liveUrl: 'https://example.com/demo/sap-cost-bridge',
      githubUrl: 'https://github.com/viethoangdev/sap-cost-bridge',
      category: 'Tools',
      tags: ['SAP ERP', 'Python', 'Excel Automation', 'VBA / Macros', 'SQL'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
      metrics: 'Rút ngắn 80% thời gian nhập liệu ngân sách SAP, kiểm soát 100% khớp nối mã dự toán',
      role: 'Chuyên viên Ngân sách & Tự động hóa',
      keyFeatures: [
        'Chuyển đổi bảng tính dự toán G8/F1 thành cấu trúc WBS chuẩn của SAP',
        'Kiểm tra tính hợp lệ của mã gói thầu, tài khoản chi phí trước khi import',
        'Cảnh báo sai lệch giữa số liệu phê duyệt nội bộ và số liệu ghi nhận trên hệ thống',
        'Xuất nhật ký kiểm soát dữ liệu (Audit Log) minh bạch'
      ],
      completionYear: '2026'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'Tập đoàn Phú Điền',
      role: 'Chuyên viên Kinh tế Xây dựng',
      period: '08/2026 - Hiện tại',
      location: 'Hà Nội, Việt Nam',
      type: 'Full-time',
      summary: 'Phụ trách công tác quản lý chi phí, lập Tổng mức đầu tư (TMĐT), theo dõi ngân sách và dòng tiền cho các dự án Bất động sản, Thủy điện và Điện gió; trực tiếp phát triển ứng dụng Web phục vụ quản lý chi phí dự án cho tập đoàn.',
      achievements: [
        'Theo dõi ngân sách, kiểm soát dòng tiền và cập nhật tình hình thực hiện chi phí của dự án theo từng giai đoạn',
        'Lập Tổng mức đầu tư (TMĐT), kế hoạch dòng tiền và phân tích hiệu quả đầu tư cho các dự án bất động sản, thủy điện và điện gió',
        'Tìm kiếm, đánh giá và lựa chọn nhà thầu thực hiện các gói thầu được giao',
        'Soạn thảo tài liệu, báo cáo chuyên môn phục vụ công tác quản lý dự án của Ban Lãnh đạo',
        'Xây dựng và phát triển App cho tập đoàn phục vụ công tác quản lý và kiểm soát chi phí dự án'
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
      type: 'Full-time',
      summary: 'Lập dự toán nội bộ, xây dựng ngân sách gói thầu và quản lý dữ liệu chi phí trên hệ thống SAP ERP cho các đại dự án khu đô thị, công viên, công trình cao tầng, trụ sở làm việc và hạ tầng kỹ thuật.',
      achievements: [
        'Lập dự toán nội bộ và xây dựng ngân sách gói thầu cho các dự án quy mô lớn: khu đô thị, công viên, công trình cao tầng, trụ sở làm việc và hạ tầng kỹ thuật',
        'Thẩm tra dự toán, tổng mức đầu tư các dự án ngân sách nhà nước do tư vấn lập',
        'Chủ trì triển khai một số dự án được phân công trong công tác quản lý chi phí và ngân sách đầu tư',
        'Thực hiện cập nhật, quản lý và đồng bộ dữ liệu chi phí – đầu tư trên hệ thống SAP theo quy trình chuẩn của tập đoàn'
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
      type: 'Full-time',
      summary: 'Theo dõi ngân sách, kiểm soát dòng tiền, lập Tổng mức đầu tư (TMĐT) và phân tích hiệu quả tài chính các dự án bất động sản, thủy điện và năng lượng tái tạo.',
      achievements: [
        'Theo dõi ngân sách, kiểm soát dòng tiền và cập nhật tình hình thực hiện chi phí của dự án theo từng giai đoạn',
        'Lập Tổng mức đầu tư (TMĐT), kế hoạch dòng tiền và phân tích hiệu quả đầu tư cho các dự án bất động sản, thủy điện và điện gió',
        'Soạn thảo tài liệu, báo cáo thẩm định đầu tư phục vụ công tác quản trị dự án'
      ],
      technologies: ['Excel', 'Word', 'G8', 'Google Sheets', 'Phân tích tài chính']
    },
    {
      id: 'exp-4',
      company: 'Công ty Cổ phần Za Hưng',
      role: 'Chuyên viên Kế hoạch Đầu tư',
      period: '10/2022 - 05/2024',
      location: 'Hà Nội',
      type: 'Full-time',
      summary: 'Chịu trách nhiệm lập TMĐT, phân tích hiệu quả đầu tư, kiểm soát dòng tiền và tổ chức lựa chọn nhà thầu các dự án bất động sản, thủy điện và năng lượng.',
      achievements: [
        'Lập Tổng mức đầu tư (TMĐT), kế hoạch dòng tiền và phân tích hiệu quả đầu tư cho các dự án bất động sản, thủy điện và điện gió',
        'Theo dõi ngân sách, kiểm soát dòng tiền và cập nhật tình hình thực hiện chi phí của dự án theo từng giai đoạn',
        'Tổ chức tìm kiếm, đánh giá và lựa chọn nhà thầu cho các gói thầu được giao'
      ],
      technologies: ['Excel', 'G8', 'Word', 'Google Sheets', 'Đấu thầu']
    },
    {
      id: 'exp-5',
      company: 'Công ty Cổ phần Kiến trúc và Kỹ thuật AMD',
      role: 'Phó Phòng QS và Đấu Thầu',
      period: '02/2020 - 09/2022',
      location: 'Hà Nội',
      type: 'Full-time',
      summary: 'Chủ trì lập dự toán, bóc tách khối lượng, quản lý hợp đồng, theo dõi thanh quyết toán và xây dựng hệ thống định mức nội bộ cho doanh nghiệp.',
      achievements: [
        'Chủ trì lập dự toán, bóc tách khối lượng và hoàn thiện hồ sơ dự thầu cho các dự án dân dụng quy mô lớn',
        'Chủ trì quản lý hợp đồng, theo dõi tiến độ thanh quyết toán và kiểm soát toàn diện chi phí trong suốt vòng đời dự án',
        'Xây dựng hệ thống định mức nội bộ chuẩn hóa cho doanh nghiệp',
        'Rà soát hồ sơ kỹ thuật và hợp đồng, tham gia đàm phán và trực tiếp soạn thảo các điều khoản hợp đồng'
      ],
      technologies: ['Excel', 'Word', 'Google Sheets', 'Power BI', 'G8/F1']
    }
  ],
  educations: [
    {
      id: 'edu-1',
      school: 'Trường Đại học Xây dựng',
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
      issuer: 'Hội Kinh tế Xây dựng Việt Nam (Hội KTXD VN)',
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
  awards: [],
  skillCategories: [
    {
      categoryName: 'Chuyên Môn Kinh Tế Xây Dựng & Dự Toán',
      skills: [
        { name: 'G8 / F1 (Dự toán xây dựng & Bóc tách)', level: 95, experience: '6 năm' },
        { name: 'Lập Tổng Mức Đầu Tư (TMĐT) & Dòng Tiền', level: 92, experience: '6 năm' },
        { name: 'Quản Lý Hợp Đồng & Thanh Quyết Toán', level: 95, experience: '6 năm' },
        { name: 'Định Mức Nội Bộ & Đấu Thầu Gói Thầu', level: 92, experience: '5 năm' },
        { name: 'Hệ Thống SAP ERP (Ngân Sách & Đầu Tư)', level: 85, experience: '2 năm' },
        { name: 'MS Office & Excel Nâng Cao (Power Query)', level: 98, experience: '6 năm' },
        { name: 'MS Project (Quản Lý Kế Hoạch & Tiến Độ)', level: 88, experience: '5 năm' }
      ]
    },
    {
      categoryName: 'Ứng Dụng AI & Tự Động Hóa Công Việc',
      skills: [
        { name: 'Mô Hình AI (GPT, Gemini, Antigravity)', level: 92, experience: '3 năm' },
        { name: 'Xây Dựng Web App Quản Lý Chi Phí', level: 90, experience: '3 năm' },
        { name: 'Power BI & Trực Quan Hóa Dữ Liệu Dự Án', level: 92, experience: '4 năm' },
        { name: 'Tự Động Hóa Trích Xuất Hồ Sơ & Hợp Đồng', level: 90, experience: '3 năm' },
        { name: 'Chuẩn Hóa Quy Trình & Số Hóa Dữ Liệu', level: 94, experience: '5 năm' }
      ]
    }
  ]
};
