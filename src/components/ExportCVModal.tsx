import React, { useState, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  SlidersHorizontal,
  CheckCircle2,
  Loader2,
  FileDown,
  Building2,
  Award,
  Layers,
  Code,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserProfile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/analytics';

interface ExportCVModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export const ExportCVModal: React.FC<ExportCVModalProps> = ({
  profile,
  isOpen,
  onClose,
  darkMode = true
}) => {
  const { t } = useLanguage();
  const [showAvatar, setShowAvatar] = useState(true);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedTextCV, setCopiedTextCV] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [exportProgress, setExportProgress] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://buiviethoang.vn';

  // Convert image URL to Base64 to prevent any Canvas CORS / Tainted Canvas issues
  const getSafeImageBase64 = async (url: string): Promise<string> => {
    if (!url) return '';
    if (url.startsWith('data:')) return url;
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width || 180;
          canvas.height = img.naturalHeight || img.height || 240;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.95));
            return;
          }
        } catch {
          // Fallback
        }
        resolve(url);
      };
      img.onerror = () => resolve(url);
      img.src = url;
    });
  };

  // Data slices for the 2-page balanced distribution
  const experiences = profile.experiences || [];
  const expPage1 = experiences.slice(0, 3); // Top 3 major companies on Page 1
  const expPage2 = experiences.slice(3);    // Remaining companies on Page 2
  const projects = profile.projects || [];
  const featuredProjects = projects.slice(0, 2);

  // 1. Generate Standalone HTML Document for Printing / HTML Download
  const generateStandaloneHTML = () => {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV_${(profile.fullName || '').replace(/\s+/g, '_')}_KinhTeXayDung_2TrangA4</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #475569;
      color: #1e293b;
      line-height: 1.45;
      padding: 24px 10px;
      -webkit-font-smoothing: antialiased;
    }
    .page-wrapper {
      width: 794px;
      height: 1123px;
      min-height: 1123px;
      max-height: 1123px;
      margin: 0 auto 24px auto;
      background: #ffffff;
      padding: 28px 32px 24px 34px;
      box-shadow: 0 4px 25px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
    }
    /* Executive Header */
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #0f2942;
      padding-bottom: 12px;
      margin-bottom: 12px;
      gap: 16px;
    }
    .header-info {
      flex: 1;
    }
    .name-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f2942;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      line-height: 1.15;
      margin-bottom: 3px;
    }
    .job-title {
      font-size: 12.5px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 4px;
    }
    .headline-pill {
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      color: #0f2942;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 2px 8px;
      border-radius: 3px;
    }
    .avatar-img {
      width: 90px;
      height: 115px;
      object-fit: cover;
      border-radius: 4px;
      border: 1.5px solid #0f2942;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    /* 2-Column Grid */
    .two-col-grid {
      display: grid;
      grid-template-columns: 228px 1fr;
      gap: 18px;
      flex: 1;
    }
    .sidebar-col {
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      padding: 10px 11px;
      display: flex;
      flex-direction: column;
      gap: 11px;
    }
    .main-col {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    /* Section Titles */
    .sec-title-main {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f2942;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid #0f2942;
      padding-bottom: 2.5px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sec-title-side {
      font-size: 10.5px;
      font-weight: 800;
      color: #0f2942;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 5px;
    }
    /* Contact List */
    .contact-item {
      font-size: 9.8px;
      color: #334155;
      margin-bottom: 3.5px;
      line-height: 1.35;
      word-break: break-word;
    }
    .contact-label {
      font-weight: 700;
      color: #0f2942;
      display: block;
      font-size: 9.2px;
      text-transform: uppercase;
    }
    /* Skill List */
    .skill-badge {
      display: inline-block;
      font-size: 9.2px;
      font-weight: 600;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 1.5px 5px;
      border-radius: 3px;
      margin: 0 3px 3px 0;
    }
    /* Experience Item */
    .exp-item {
      margin-bottom: 8px;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }
    .exp-role {
      font-size: 11.2px;
      font-weight: 700;
      color: #0f2942;
    }
    .exp-time {
      font-size: 9.5px;
      font-weight: 600;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 1px 5px;
      border-radius: 3px;
      white-space: nowrap;
    }
    .exp-company {
      font-size: 10.5px;
      font-weight: 600;
      color: #2563eb;
      margin-bottom: 2px;
    }
    .exp-summary {
      font-size: 9.8px;
      color: #475569;
      margin-bottom: 2.5px;
      line-height: 1.38;
      text-align: justify;
    }
    .bullet-point {
      font-size: 9.8px;
      color: #334155;
      padding-left: 10px;
      position: relative;
      line-height: 1.38;
      margin-bottom: 1.5px;
      text-align: justify;
    }
    .bullet-point::before {
      content: "▪";
      position: absolute;
      left: 0;
      color: #1e3a8a;
      font-size: 8px;
      top: 0;
    }
    .achievement-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 3px;
      padding: 2.5px 6px;
      margin-top: 3px;
      font-size: 9.5px;
      color: #166534;
      line-height: 1.35;
    }
    /* Projects */
    .proj-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 5px 8px;
      margin-bottom: 5px;
    }
    .proj-title {
      font-size: 10.5px;
      font-weight: 700;
      color: #0f2942;
    }
    .proj-desc {
      font-size: 9.5px;
      color: #475569;
      line-height: 1.35;
      margin: 1.5px 0;
    }
    /* Mini Header for Page 2 */
    .page2-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f2942;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .page2-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f2942;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .page2-tag {
      font-size: 9px;
      font-weight: 700;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 1.5px 7px;
      border-radius: 3px;
    }
    /* Footer */
    .doc-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 8.8px;
      color: #64748b;
      margin-top: 6px;
    }
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .page-wrapper {
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
        page-break-after: always !important;
        break-after: page !important;
      }
      @page {
        size: A4 portrait;
        margin: 0;
      }
    }
  </style>
</head>
<body>

  <!-- ==================== TRANG 1 / 2 ==================== -->
  <div class="page-wrapper">
    <div>
      <!-- Top Header -->
      <div class="header-top">
        <div class="header-info">
          <div class="name-title">${profile.fullName}</div>
          <div class="job-title">${profile.title}</div>
          <div class="headline-pill">
            6+ Năm Kinh Nghiệm &bull; Quản Trị Chi Phí & Ngân Sách Dự Án &bull; Tiên Phong Chuyển Đổi Số
          </div>
        </div>
        ${showAvatar ? `
          <div>
            <img src="${profile.avatarUrl}" alt="${profile.fullName}" class="avatar-img" />
          </div>
        ` : ''}
      </div>

      <!-- 2-Column Body -->
      <div class="two-col-grid">
        
        <!-- Cột Trái (Sidebar) -->
        <div class="sidebar-col">
          
          <!-- Thông tin liên hệ -->
          <div>
            <div class="sec-title-side">THÔNG TIN LIÊN HỆ</div>
            <div class="contact-item">
              <span class="contact-label">Điện thoại</span>
              ${profile.phone}
            </div>
            <div class="contact-item">
              <span class="contact-label">Email</span>
              ${profile.email}
            </div>
            <div class="contact-item">
              <span class="contact-label">Địa bàn làm việc</span>
              ${profile.location}
            </div>
            <div class="contact-item">
              <span class="contact-label">Hồ sơ trực tuyến</span>
              <span style="color: #1e3a8a; font-weight: 600;">${currentUrl.replace(/^https?:\/\//, '')}</span>
            </div>
          </div>

          <!-- Năng lực chuyên môn cốt lõi -->
          <div>
            <div class="sec-title-side">NĂNG LỰC CỐT LÕI</div>
            <div style="line-height: 1.5;">
              <span class="skill-badge">Quản lý Chi phí & Ngân sách</span>
              <span class="skill-badge">Lập TMĐT & Dòng tiền</span>
              <span class="skill-badge">Quản lý Hợp đồng & Pháp lý</span>
              <span class="skill-badge">Thanh Quyết toán A-B</span>
              <span class="skill-badge">Bóc tách khối lượng (QS)</span>
              <span class="skill-badge">Đấu thầu HSMT/HSDT</span>
              <span class="skill-badge">Kiểm soát rủi ro chi phí</span>
              <span class="skill-badge">Định giá xây dựng Hạng III</span>
            </div>
          </div>

          <!-- Học vấn -->
          <div>
            <div class="sec-title-side">TRÌNH ĐỘ HỌC VẤN</div>
            ${(profile.educations || []).map(edu => `
              <div style="font-size: 9.8px; margin-bottom: 4px;">
                <div style="font-weight: 700; color: #0f2942;">${edu.degree}</div>
                <div style="color: #2563eb; font-weight: 600;">${edu.institution || edu.school || ''}</div>
                <div style="color: #64748b; font-size: 9px;">Niên khóa: ${edu.period}</div>
                <div style="color: #475569; font-size: 9px; margin-top: 2px;">• Giải 3 NCKH SV cấp Trường. Tốt nghiệp loại Khá.</div>
              </div>
            `).join('')}
          </div>

        </div>

        <!-- Cột Phải (Main Content) -->
        <div class="main-col">
          
          <!-- I. Tóm tắt năng lực -->
          <div>
            <div class="sec-title-main">I. TÓM TẮT HỒ SƠ & NĂNG LỰC QUẢN TRỊ</div>
            <div style="font-size: 9.8px; color: #1e293b; line-height: 1.45; text-align: justify;">
              ${profile.bio}
            </div>
          </div>

          <!-- II. Kinh nghiệm làm việc chuyên sâu (Phần 1: 3 công ty lớn) -->
          <div>
            <div class="sec-title-main">II. KINH NGHIỆM LÀM VIỆC CHUYÊN SÂU</div>
            ${expPage1.map(exp => `
              <div class="exp-item">
                <div class="exp-header">
                  <span class="exp-role">${exp.role || ''}</span>
                  <span class="exp-time">${exp.period || ''}</span>
                </div>
                <div class="exp-company">${exp.company || ''} &bull; ${exp.location || ''}</div>
                <div class="exp-summary">${exp.summary || exp.description || ''}</div>
                ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                  ${(exp.responsibilities || []).map(r => `<div class="bullet-point">${r}</div>`).join('')}
                ` : ''}
                ${exp.achievements && exp.achievements.length > 0 ? `
                  <div class="achievement-box">
                    <strong>Thành tựu nổi bật:</strong> ${(exp.achievements || []).join('; ')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>

        </div>

      </div>
    </div>

    <!-- Footer Page 1 -->
    <div class="doc-footer">
      <span>Hồ sơ năng lực: ${profile.fullName} &bull; Chuyên môn: Kinh Tế Xây Dựng & Quản Trị Chi Phí</span>
      <span style="font-weight: 700; color: #0f2942;">Trang 1 / 2</span>
    </div>
  </div>

  <!-- ==================== TRANG 2 / 2 ==================== -->
  <div class="page-wrapper">
    <div>
      <!-- Mini Header -->
      <div class="page2-header">
        <span class="page2-title">Hồ Sơ Năng Lực: ${profile.fullName} &bull; Kỹ Sư Kinh Tế Xây Dựng</span>
        <span class="page2-tag">Trang 2 / 2 &bull; Quản Trị Dự Án & Kỹ Năng Chuyên Sâu</span>
      </div>

      <!-- 2-Column Body Page 2 -->
      <div class="two-col-grid">
        
        <!-- Cột Trái (Sidebar Page 2) -->
        <div class="sidebar-col">
          
          <!-- Chứng chỉ hành nghề & Pháp lý -->
          <div>
            <div class="sec-title-side">CHỨNG CHỈ HÀNH NGHỀ</div>
            ${(profile.certifications || []).map(cert => `
              <div style="font-size: 9.5px; margin-bottom: 5px;">
                <div style="font-weight: 700; color: #0f2942;">${cert.name}</div>
                <div style="color: #475569; font-size: 9px;">Cơ quan cấp: <strong>${cert.issuer}</strong></div>
                <div style="color: #1e3a8a; font-size: 8.8px; font-weight: 600;">Hiệu lực: ${cert.issueDate}</div>
              </div>
            `).join('')}
          </div>

          <!-- Kỹ năng phần mềm & Công nghệ -->
          <div>
            <div class="sec-title-side">CÔNG NGHỆ & PHẦN MỀM</div>
            <div style="font-size: 9.2px; line-height: 1.5;">
              <div style="font-weight: 700; color: #0f2942; margin-bottom: 2px;">Nghiệp vụ Xây dựng:</div>
              <span class="skill-badge">G8 / F1 / ETA (80%)</span>
              <span class="skill-badge">AutoCAD</span>
              <span class="skill-badge">SAP ERP</span>
              <span class="skill-badge">MS Project</span>
              <div style="font-weight: 700; color: #0f2942; margin: 4px 0 2px 0;">Phân tích & Tự động hóa:</div>
              <span class="skill-badge">Excel Nâng cao (95%)</span>
              <span class="skill-badge">Power Query & Power BI (90%)</span>
              <span class="skill-badge">Mô hình AI (GPT/Gemini)</span>
              <span class="skill-badge">Phát triển Web App Quản lý</span>
            </div>
          </div>

          <!-- Khen thưởng & Giải thưởng -->
          <div>
            <div class="sec-title-side">KHEN THƯỞNG & GHI NHẬN</div>
            ${(profile.awards || []).map(award => `
              <div style="font-size: 9.2px; margin-bottom: 4px;">
                <div style="font-weight: 700; color: #0f2942;">${award.title}</div>
                <div style="color: #64748b; font-size: 8.8px;">${award.awarder} (${award.date})</div>
              </div>
            `).join('')}
          </div>

          <!-- Lời cam đoan -->
          <div>
            <div class="sec-title-side">LỜI CAM ĐOAN</div>
            <div style="font-size: 9px; color: #334155; line-height: 1.35; text-align: justify;">
              Tôi xin cam đoan toàn bộ thông tin đào tạo, kinh nghiệm công tác và chứng chỉ nêu trên là hoàn toàn chính xác. Sẵn sàng cung cấp hồ sơ gốc đối chiếu khi có yêu cầu.
            </div>
            <div style="margin-top: 4px; font-size: 8.8px; font-weight: 700; color: #166534;">
              ✓ Sẵn sàng nhận việc
            </div>
          </div>

        </div>

        <!-- Cột Phải (Main Content Page 2) -->
        <div class="main-col">
          
          <!-- II. Kinh nghiệm làm việc chuyên sâu (Tiếp theo) -->
          ${expPage2.length > 0 ? `
            <div>
              <div class="sec-title-main">II. KINH NGHIỆM LÀM VIỆC CHUYÊN SÂU (TIẾP THEO)</div>
              ${expPage2.map(exp => `
                <div class="exp-item">
                  <div class="exp-header">
                    <span class="exp-role">${exp.role || ''}</span>
                    <span class="exp-time">${exp.period || ''}</span>
                  </div>
                  <div class="exp-company">${exp.company || ''} &bull; ${exp.location || ''}</div>
                  <div class="exp-summary">${exp.summary || exp.description || ''}</div>
                  ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                    ${(exp.responsibilities || []).slice(0, 3).map(r => `<div class="bullet-point">${r}</div>`).join('')}
                  ` : ''}
                  ${exp.achievements && exp.achievements.length > 0 ? `
                    <div class="achievement-box">
                      <strong>Thành tích:</strong> ${(exp.achievements || []).join('; ')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- III. Dự án tiêu biểu & Sản phẩm số hoá quản trị -->
          <div>
            <div class="sec-title-main">III. DỰ ÁN TIÊU BIỂU & SẢN PHẨM SỐ HÓA QUẢN TRỊ</div>
            ${featuredProjects.map(proj => `
              <div class="proj-item">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span class="proj-title">${proj.title}</span>
                  <span style="font-size: 9px; font-weight: 600; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px;">
                    ${proj.role || 'Chủ trì thiết kế & phát triển'}
                  </span>
                </div>
                <div class="proj-desc">${proj.description}</div>
                ${proj.metrics ? `
                  <div style="font-size: 9.2px; color: #166534; font-weight: 600; margin-top: 2px;">
                    🎯 <em>Hiệu quả:</em> ${proj.metrics}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>

          <!-- IV. Điểm mạnh quản trị & Năng lực nổi bật -->
          <div>
            <div class="sec-title-main">IV. THÀNH TỰU & THẾ MẠNH QUẢN TRỊ NỔI BẬT</div>
            <div class="bullet-point"><strong>Kiểm soát ngân sách đa dự án:</strong> Kinh nghiệm quản lý chi phí các đại dự án khu đô thị Vinhomes, công trình quốc phòng Tổng Cty 36 và dự án năng lượng tái tạo.</div>
            <div class="bullet-point"><strong>Chuẩn hóa & Tự động hóa:</strong> Tiên phong ứng dụng Power BI, Power Query và AI Assistant giúp rút ngắn 65% thời gian lập báo cáo và đối soát số liệu.</div>
            <div class="bullet-point"><strong>Pháp lý & Quyết toán vững vàng:</strong> Am hiểu sâu sắc quy định pháp luật xây dựng, định mức nhà nước và xử lý thanh quyết toán dứt điểm.</div>
          </div>

        </div>

      </div>
    </div>

    <!-- Footer Page 2 -->
    <div class="doc-footer">
      <span>Hồ sơ năng lực: ${profile.fullName} &bull; Chuyên môn: Kinh Tế Xây Dựng & Quản Trị Chi Phí</span>
      <span style="font-weight: 700; color: #0f2942;">Trang 2 / 2</span>
    </div>
  </div>

</body>
</html>`;
  };

  // 2. High-Precision Client-Side 2-Page PDF Export (Strict A4 Aspect Ratio 794x1123 -> 210x297mm)
  const handleExportPDF = async () => {
    if (isExportingPDF) return;

    const cleanName = (profile.fullName || 'Bui_Viet_Hoang')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_');

    try {
      setIsExportingPDF(true);
      setStatusMessage(null);
      setExportProgress('Đang chuẩn bị bố cục văn bản Executive A4 (2 cột)...');

      // Safe Avatar Base64 conversion
      let safeAvatarUrl = profile.avatarUrl;
      if (showAvatar && profile.avatarUrl) {
        try {
          safeAvatarUrl = await getSafeImageBase64(profile.avatarUrl);
        } catch {
          // Keep original
        }
      }

      // Initialize jsPDF A4 portrait
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfPageWidthMM = 210;
      const pdfPageHeightMM = 297;

      // ----------------------------------------------------
      // PAGE 1: EXACT 794px x 1123px (A4 Ratio = 1 : 1.41428)
      // ----------------------------------------------------
      setExportProgress('Đang kết xuất Trang 1/2 (Thông tin, Năng lực & Kinh nghiệm chính)...');

      const page1Container = document.createElement('div');
      page1Container.style.position = 'fixed';
      page1Container.style.left = '-9999px';
      page1Container.style.top = '0';
      page1Container.style.width = '794px';
      page1Container.style.height = '1123px';
      page1Container.style.minHeight = '1123px';
      page1Container.style.maxHeight = '1123px';
      page1Container.style.backgroundColor = '#ffffff';
      page1Container.style.color = '#1e293b';
      page1Container.style.fontFamily = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
      page1Container.style.padding = '28px 32px 24px 34px';
      page1Container.style.boxSizing = 'border-box';
      page1Container.style.display = 'flex';
      page1Container.style.flexDirection = 'column';
      page1Container.style.justifyContent = 'space-between';
      page1Container.style.overflow = 'hidden';
      page1Container.style.zIndex = '-9999';

      page1Container.innerHTML = `
        <div style="width: 100%; box-sizing: border-box;">
          <!-- Top Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0f2942; padding-bottom: 12px; margin-bottom: 12px; gap: 16px;">
            <div style="flex: 1;">
              <div style="font-size: 22px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.6px; line-height: 1.15; margin-bottom: 3px;">
                ${profile.fullName}
              </div>
              <div style="font-size: 12.5px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px;">
                ${profile.title}
              </div>
              <div style="display: inline-block; font-size: 10px; font-weight: 600; color: #0f2942; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 2px 8px; border-radius: 3px;">
                6+ Năm Kinh Nghiệm &bull; Quản Trị Chi Phí & Ngân Sách Dự Án &bull; Tiên Phong Chuyển Đổi Số
              </div>
            </div>
            ${showAvatar ? `
              <div>
                <img src="${safeAvatarUrl}" alt="${profile.fullName}" style="width: 90px; height: 115px; object-fit: cover; border-radius: 4px; border: 1.5px solid #0f2942; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />
              </div>
            ` : ''}
          </div>

          <!-- 2-Column Grid -->
          <div style="display: grid; grid-template-columns: 228px 1fr; gap: 18px;">
            
            <!-- Cột Trái (Sidebar) -->
            <div style="background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; padding: 10px 11px; display: flex; flex-direction: column; gap: 11px;">
              
              <!-- Liên hệ -->
              <div>
                <div style="font-size: 10.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 5px;">
                  THÔNG TIN LIÊN HỆ
                </div>
                <div style="font-size: 9.8px; color: #334155; margin-bottom: 3.5px; line-height: 1.35;">
                  <span style="font-weight: 700; color: #0f2942; display: block; font-size: 9.2px; text-transform: uppercase;">Điện thoại</span>
                  ${profile.phone}
                </div>
                <div style="font-size: 9.8px; color: #334155; margin-bottom: 3.5px; line-height: 1.35;">
                  <span style="font-weight: 700; color: #0f2942; display: block; font-size: 9.2px; text-transform: uppercase;">Email</span>
                  ${profile.email}
                </div>
                <div style="font-size: 9.8px; color: #334155; margin-bottom: 3.5px; line-height: 1.35;">
                  <span style="font-weight: 700; color: #0f2942; display: block; font-size: 9.2px; text-transform: uppercase;">Địa bàn</span>
                  ${profile.location}
                </div>
                <div style="font-size: 9.8px; color: #334155; margin-bottom: 3.5px; line-height: 1.35;">
                  <span style="font-weight: 700; color: #0f2942; display: block; font-size: 9.2px; text-transform: uppercase;">Hồ sơ trực tuyến</span>
                  <span style="color: #1e3a8a; font-weight: 600;">${currentUrl.replace(/^https?:\/\//, '')}</span>
                </div>
              </div>

              <!-- Năng lực cốt lõi -->
              <div>
                <div style="font-size: 10.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 5px;">
                  NĂNG LỰC CỐT LÕI
                </div>
                <div style="line-height: 1.5;">
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Quản lý Chi phí & Ngân sách</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Lập TMĐT & Dòng tiền</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Quản lý Hợp đồng & Pháp lý</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Thanh Quyết toán A-B</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Bóc tách khối lượng (QS)</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Đấu thầu HSMT/HSDT</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Kiểm soát rủi ro chi phí</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Định giá xây dựng Hạng III</span>
                </div>
              </div>

              <!-- Học vấn -->
              <div>
                <div style="font-size: 10.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 5px;">
                  TRÌNH ĐỘ HỌC VẤN
                </div>
                ${(profile.educations || []).map(edu => `
                  <div style="font-size: 9.8px; margin-bottom: 4px;">
                    <div style="font-weight: 700; color: #0f2942;">${edu.degree}</div>
                    <div style="color: #2563eb; font-weight: 600;">${edu.institution || edu.school || ''}</div>
                    <div style="color: #64748b; font-size: 9px;">Niên khóa: ${edu.period}</div>
                    <div style="color: #475569; font-size: 9px; margin-top: 2px;">• Giải 3 NCKH SV cấp Trường. Tốt nghiệp loại Khá.</div>
                  </div>
                `).join('')}
              </div>

            </div>

            <!-- Cột Phải (Main Content) -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              
              <!-- I. Tóm tắt năng lực -->
              <div>
                <div style="font-size: 11.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #0f2942; padding-bottom: 2.5px; margin-bottom: 6px;">
                  I. TÓM TẮT HỒ SƠ & NĂNG LỰC QUẢN TRỊ
                </div>
                <div style="font-size: 9.8px; color: #1e293b; line-height: 1.45; text-align: justify;">
                  ${profile.bio}
                </div>
              </div>

              <!-- II. Kinh nghiệm làm việc chuyên sâu -->
              <div>
                <div style="font-size: 11.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #0f2942; padding-bottom: 2.5px; margin-bottom: 6px;">
                  II. KINH NGHIỆM LÀM VIỆC CHUYÊN SÂU
                </div>
                ${expPage1.map(exp => `
                  <div style="margin-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
                      <span style="font-size: 11.2px; font-weight: 700; color: #0f2942;">${exp.role || ''}</span>
                      <span style="font-size: 9.5px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 3px; white-space: nowrap;">${exp.period || ''}</span>
                    </div>
                    <div style="font-size: 10.5px; font-weight: 600; color: #2563eb; margin-bottom: 2px;">${exp.company || ''} &bull; ${exp.location || ''}</div>
                    <div style="font-size: 9.8px; color: #475569; margin-bottom: 2.5px; line-height: 1.38; text-align: justify;">${exp.summary || exp.description || ''}</div>
                    ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                      ${(exp.responsibilities || []).map(r => `
                        <div style="font-size: 9.8px; color: #334155; padding-left: 10px; position: relative; line-height: 1.38; margin-bottom: 1.5px; text-align: justify;">
                          <span style="position: absolute; left: 0; color: #1e3a8a; font-size: 8px; top: 0;">▪</span>
                          ${r}
                        </div>
                      `).join('')}
                    ` : ''}
                    ${exp.achievements && exp.achievements.length > 0 ? `
                      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 2.5px 6px; margin-top: 3px; font-size: 9.5px; color: #166534; line-height: 1.35;">
                        <strong>Thành tựu nổi bật:</strong> ${(exp.achievements || []).join('; ')}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>

            </div>

          </div>
        </div>

        <!-- Footer Page 1 -->
        <div style="border-top: 1px solid #cbd5e1; padding-top: 5px; display: flex; justify-content: space-between; font-size: 8.8px; color: #64748b; margin-top: 6px;">
          <span>Hồ sơ năng lực: ${profile.fullName} &bull; Chuyên môn: Kinh Tế Xây Dựng & Quản Trị Chi Phí</span>
          <span style="font-weight: 700; color: #0f2942;">Trang 1 / 2</span>
        </div>
      `;

      document.body.appendChild(page1Container);
      if (document.fonts) await document.fonts.ready;

      const canvas1 = await html2canvas(page1Container, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 1024
      });

      if (document.body.contains(page1Container)) {
        document.body.removeChild(page1Container);
      }

      const imgData1 = canvas1.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData1, 'JPEG', 0, 0, pdfPageWidthMM, pdfPageHeightMM, undefined, 'FAST');

      // ----------------------------------------------------
      // PAGE 2: EXACT 794px x 1123px (A4 Ratio = 1 : 1.41428)
      // ----------------------------------------------------
      setExportProgress('Đang kết xuất Trang 2/2 (Chứng chỉ, Dự án & Kinh nghiệm tiếp theo)...');
      pdf.addPage('a4', 'portrait');

      const page2Container = document.createElement('div');
      page2Container.style.position = 'fixed';
      page2Container.style.left = '-9999px';
      page2Container.style.top = '0';
      page2Container.style.width = '794px';
      page2Container.style.height = '1123px';
      page2Container.style.minHeight = '1123px';
      page2Container.style.maxHeight = '1123px';
      page2Container.style.backgroundColor = '#ffffff';
      page2Container.style.color = '#1e293b';
      page2Container.style.fontFamily = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
      page2Container.style.padding = '28px 32px 24px 34px';
      page2Container.style.boxSizing = 'border-box';
      page2Container.style.display = 'flex';
      page2Container.style.flexDirection = 'column';
      page2Container.style.justifyContent = 'space-between';
      page2Container.style.overflow = 'hidden';
      page2Container.style.zIndex = '-9999';

      page2Container.innerHTML = `
        <div style="width: 100%; box-sizing: border-box;">
          <!-- Mini Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f2942; padding-bottom: 6px; margin-bottom: 10px;">
            <span style="font-size: 11.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px;">
              Hồ Sơ Năng Lực: ${profile.fullName} &bull; Kỹ Sư Kinh Tế Xây Dựng
            </span>
            <span style="font-size: 9px; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 7px; border-radius: 3px;">
              Trang 2 / 2 &bull; Quản Trị Dự Án & Kỹ Năng Chuyên Sâu
            </span>
          </div>

          <!-- 2-Column Grid -->
          <div style="display: grid; grid-template-columns: 228px 1fr; gap: 18px;">
            
            <!-- Cột Trái (Sidebar Page 2) -->
            <div style="background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; padding: 10px 11px; display: flex; flex-direction: column; gap: 11px;">
              
              <!-- Chứng chỉ hành nghề & Pháp lý -->
              <div>
                <div style="font-size: 10.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 5px;">
                  CHỨNG CHỈ HÀNH NGHỀ
                </div>
                ${(profile.certifications || []).map(cert => `
                  <div style="font-size: 9.5px; margin-bottom: 5px;">
                    <div style="font-weight: 700; color: #0f2942;">${cert.name}</div>
                    <div style="color: #475569; font-size: 9px;">Cơ quan cấp: <strong>${cert.issuer}</strong></div>
                    <div style="color: #1e3a8a; font-size: 8.8px; font-weight: 600;">Hiệu lực: ${cert.issueDate}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Kỹ năng phần mềm & Công nghệ -->
              <div>
                <div style="font-size: 10.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 5px;">
                  CÔNG NGHỆ & PHẦN MỀM
                </div>
                <div style="font-size: 9.2px; line-height: 1.5;">
                  <div style="font-weight: 700; color: #0f2942; margin-bottom: 2px;">Nghiệp vụ Xây dựng:</div>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">G8 / F1 / ETA (80%)</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">AutoCAD</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">SAP ERP</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">MS Project</span>
                  <div style="font-weight: 700; color: #0f2942; margin: 4px 0 2px 0;">Phân tích & Tự động hóa:</div>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Excel Nâng cao (95%)</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Power Query & Power BI (90%)</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Mô hình AI (GPT/Gemini)</span>
                  <span style="display: inline-block; font-size: 9.2px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5px 5px; border-radius: 3px; margin: 0 3px 3px 0;">Phát triển Web App Quản lý</span>
                </div>
              </div>

              <!-- Khen thưởng & Giải thưởng -->
              <div>
                <div style="font-size: 10.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 5px;">
                  KHEN THƯỞNG & GHI NHẬN
                </div>
                ${(profile.awards || []).map(award => `
                  <div style="font-size: 9.2px; margin-bottom: 4px;">
                    <div style="font-weight: 700; color: #0f2942;">${award.title}</div>
                    <div style="color: #64748b; font-size: 8.8px;">${award.awarder} (${award.date})</div>
                  </div>
                `).join('')}
              </div>

              <!-- Lời cam đoan -->
              <div>
                <div style="font-size: 10.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 5px;">
                  LỜI CAM ĐOAN
                </div>
                <div style="font-size: 9px; color: #334155; line-height: 1.35; text-align: justify;">
                  Tôi xin cam đoan toàn bộ thông tin đào tạo, kinh nghiệm công tác và chứng chỉ nêu trên là hoàn toàn chính xác. Sẵn sàng cung cấp hồ sơ gốc đối chiếu khi có yêu cầu.
                </div>
                <div style="margin-top: 4px; font-size: 8.8px; font-weight: 700; color: #166534;">
                  ✓ Sẵn sàng nhận việc
                </div>
              </div>

            </div>

            <!-- Cột Phải (Main Content Page 2) -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              
              <!-- II. Kinh nghiệm tiếp theo -->
              ${expPage2.length > 0 ? `
                <div>
                  <div style="font-size: 11.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #0f2942; padding-bottom: 2.5px; margin-bottom: 6px;">
                    II. KINH NGHIỆM LÀM VIỆC CHUYÊN SÂU (TIẾP THEO)
                  </div>
                  ${expPage2.map(exp => `
                    <div style="margin-bottom: 8px;">
                      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
                        <span style="font-size: 11.2px; font-weight: 700; color: #0f2942;">${exp.role || ''}</span>
                        <span style="font-size: 9.5px; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 3px; white-space: nowrap;">${exp.period || ''}</span>
                      </div>
                      <div style="font-size: 10.5px; font-weight: 600; color: #2563eb; margin-bottom: 2px;">${exp.company || ''} &bull; ${exp.location || ''}</div>
                      <div style="font-size: 9.8px; color: #475569; margin-bottom: 2.5px; line-height: 1.38; text-align: justify;">${exp.summary || exp.description || ''}</div>
                      ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                        ${(exp.responsibilities || []).slice(0, 3).map(r => `
                          <div style="font-size: 9.8px; color: #334155; padding-left: 10px; position: relative; line-height: 1.38; margin-bottom: 1.5px; text-align: justify;">
                            <span style="position: absolute; left: 0; color: #1e3a8a; font-size: 8px; top: 0;">▪</span>
                            ${r}
                          </div>
                        `).join('')}
                      ` : ''}
                      ${exp.achievements && exp.achievements.length > 0 ? `
                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 2.5px 6px; margin-top: 3px; font-size: 9.5px; color: #166534; line-height: 1.35;">
                          <strong>Thành tích:</strong> ${(exp.achievements || []).join('; ')}
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- III. Dự án tiêu biểu & Sản phẩm số hoá quản trị -->
              <div>
                <div style="font-size: 11.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #0f2942; padding-bottom: 2.5px; margin-bottom: 6px;">
                  III. DỰ ÁN TIÊU BIỂU & SẢN PHẨM SỐ HÓA QUẢN TRỊ
                </div>
                ${featuredProjects.map(proj => `
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                      <span style="font-size: 10.5px; font-weight: 700; color: #0f2942;">${proj.title}</span>
                      <span style="font-size: 9px; font-weight: 600; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px;">
                        ${proj.role || 'Chủ trì thiết kế & phát triển'}
                      </span>
                    </div>
                    <div style="font-size: 9.5px; color: #475569; line-height: 1.35; margin: 1.5px 0;">${proj.description}</div>
                    ${proj.metrics ? `
                      <div style="font-size: 9.2px; color: #166534; font-weight: 600; margin-top: 2px;">
                        🎯 <em>Hiệu quả:</em> ${proj.metrics}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>

              <!-- IV. Điểm mạnh quản trị -->
              <div>
                <div style="font-size: 11.5px; font-weight: 800; color: #0f2942; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #0f2942; padding-bottom: 2.5px; margin-bottom: 6px;">
                  IV. THÀNH TỰU & THẾ MẠNH QUẢN TRỊ NỔI BẬT
                </div>
                <div style="font-size: 9.8px; color: #334155; padding-left: 10px; position: relative; line-height: 1.38; margin-bottom: 2px;">
                  <span style="position: absolute; left: 0; color: #1e3a8a; font-size: 8px; top: 0;">▪</span>
                  <strong>Kiểm soát ngân sách đa dự án:</strong> Kinh nghiệm quản lý chi phí các đại dự án khu đô thị Vinhomes, công trình quốc phòng Tổng Cty 36 và dự án năng lượng tái tạo.
                </div>
                <div style="font-size: 9.8px; color: #334155; padding-left: 10px; position: relative; line-height: 1.38; margin-bottom: 2px;">
                  <span style="position: absolute; left: 0; color: #1e3a8a; font-size: 8px; top: 0;">▪</span>
                  <strong>Chuẩn hóa & Tự động hóa:</strong> Tiên phong ứng dụng Power BI, Power Query và AI Assistant giúp rút ngắn 65% thời gian lập báo cáo và đối soát số liệu.
                </div>
                <div style="font-size: 9.8px; color: #334155; padding-left: 10px; position: relative; line-height: 1.38; margin-bottom: 2px;">
                  <span style="position: absolute; left: 0; color: #1e3a8a; font-size: 8px; top: 0;">▪</span>
                  <strong>Pháp lý & Quyết toán vững vàng:</strong> Am hiểu sâu sắc quy định pháp luật xây dựng, định mức nhà nước và xử lý thanh quyết toán dứt điểm.
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- Footer Page 2 -->
        <div style="border-top: 1px solid #cbd5e1; padding-top: 5px; display: flex; justify-content: space-between; font-size: 8.8px; color: #64748b; margin-top: 6px;">
          <span>Hồ sơ năng lực: ${profile.fullName} &bull; Chuyên môn: Kinh Tế Xây Dựng & Quản Trị Chi Phí</span>
          <span style="font-weight: 700; color: #0f2942;">Trang 2 / 2</span>
        </div>
      `;

      document.body.appendChild(page2Container);
      if (document.fonts) await document.fonts.ready;

      const canvas2 = await html2canvas(page2Container, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 1024
      });

      if (document.body.contains(page2Container)) {
        document.body.removeChild(page2Container);
      }

      const imgData2 = canvas2.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData2, 'JPEG', 0, 0, pdfPageWidthMM, pdfPageHeightMM, undefined, 'FAST');

      // ----------------------------------------------------
      // Download PDF
      // ----------------------------------------------------
      setExportProgress('Đang đóng gói file PDF 2 trang chuẩn văn bản...');

      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `CV_${cleanName}_KinhTeXayDung_2TrangA4.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 15000);

      trackEvent('export_cv_pdf', `Xuất file CV PDF 2 Trang Chuẩn Văn Bản (${profile.fullName})`);
      setStatusMessage('Đã tải xuống file PDF 2 trang chuẩn văn bản thành công!');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      console.error('PDF Canvas Render Error:', err);
      setStatusMessage('Đang mở cửa sổ In / Lưu PDF...');
      handleSafePrint();
    } finally {
      setIsExportingPDF(false);
      setExportProgress('');
    }
  };

  // 3. Download Standalone HTML CV
  const handleDownloadHTML = () => {
    try {
      const htmlContent = generateStandaloneHTML();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      const cleanName = (profile.fullName || 'Bui_Viet_Hoang')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '_');

      link.href = url;
      link.download = `CV_${cleanName}_KinhTeXayDung_2Trang.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      trackEvent('export_cv_html', `Tải file CV HTML 2 Trang (${profile.fullName})`);
      setStatusMessage('Đã tải file CV HTML 2 trang đầy đủ!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  // 4. Safe Isolated Iframe Print
  const handleSafePrint = () => {
    trackEvent('print_cv', `Bấm In / Print CV 2 Trang (${profile.fullName})`);
    try {
      const htmlContent = generateStandaloneHTML();
      
      const printIframe = document.createElement('iframe');
      printIframe.style.position = 'fixed';
      printIframe.style.right = '0';
      printIframe.style.bottom = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.border = '0';
      
      document.body.appendChild(printIframe);

      const frameDoc = printIframe.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(htmlContent);
        frameDoc.close();

        setTimeout(() => {
          try {
            printIframe.contentWindow?.focus();
            printIframe.contentWindow?.print();
          } catch (printErr) {
            console.warn('Iframe print blocked:', printErr);
          } finally {
            setTimeout(() => {
              if (document.body.contains(printIframe)) {
                document.body.removeChild(printIframe);
              }
            }, 2000);
          }
        }, 500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Generate Executive Summary for Recruiter
  const generateRecruiterSummary = () => {
    return `KÍNH GỬI BAN LÃNH ĐẠO / PHÒNG NHÂN SỰ - BÁO CÁO HỒ SƠ ỨNG VIÊN

👤 ỨNG VIÊN: ${(profile.fullName || '').toUpperCase()}
🎯 VỊ TRÍ ỨNG TUYỂN: ${profile.title || ''}
⏳ KINH NGHIỆM: ${profile.yearsOfExperience || 6}+ Năm trong ngành Kinh tế Xây dựng & Quản lý Dự án / Chuyển đổi số

🌟 ĐIỂM NỔI BẬT ĐÁNH GIÁ:
• Chuyên môn vững vàng: Nắm vững nghiệp vụ Quản lý Chi phí, Dự toán tổng mức đầu tư, Đấu thầu HSMT/HSDT, Hợp đồng và Thanh quyết toán A-B.
• Đã trực tiếp tham gia quản lý chi phí cho các đại dự án quy mô lớn (Vinhomes Smart City, Vinhomes Ocean Park, công trình quốc phòng và hạ tầng kỹ thuật).
• Đầy đủ chứng chỉ hành nghề: Định giá xây dựng Hạng III, Quản lý dự án Hạng III do Sở Xây dựng cấp.
• Năng lực công nghệ: Thành thạo các phần mềm G8, F1, ETA, AutoCAD, Power BI và tự động hóa quy trình quản lý chi phí.

📞 THÔNG TIN LIÊN HỆ:
• Email: ${profile.email || ''}
• SĐT: ${profile.phone || ''}
• Địa điểm: ${profile.location || ''}
• Xem Portfolio & Nghiệp vụ trực tuyến: ${currentUrl}
`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateRecruiterSummary());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Generate plain-text CV
  const generatePlainTextCV = () => {
    return `CURRICULUM VITAE - ${(profile.fullName || '').toUpperCase()} (2 TRANG CHUẨN VĂN BẢN)
========================================================================
Vị trí: ${profile.title || ''}
Email: ${profile.email || ''} | Điện thoại: ${profile.phone || ''} | Địa chỉ: ${profile.location || ''}
Portfolio: ${currentUrl}

=== TRANG 1: TỔNG QUAN HỒ SƠ & KINH NGHIỆM LÀM VIỆC ===
I. TÓM TẮT NĂNG LỰC & MỤC TIÊU NGHỀ NGHIỆP
------------------------------------------
${profile.headline || ''}
${profile.bio || ''}

II. KINH NGHIỆM LÀM VIỆC CHUYÊN SÂU
------------------------------------
${(profile.experiences || []).map(exp => `
* ${(exp.role || '').toUpperCase()} tại ${exp.company || ''} (${exp.period || ''})
  - Địa điểm: ${exp.location || ''}
  - Mô tả: ${exp.description || exp.summary || ''}
  - Trách nhiệm: ${(exp.responsibilities || []).join('; ')}
  - Thành tựu: ${(exp.achievements || []).join('; ')}
`).join('\n')}

=== TRANG 2: BỘ KỸ NĂNG, HỌC VẤN & CHỨNG CHỈ HÀNH NGHỀ ===
III. BẢNG NĂNG LỰC & KỸ NĂNG CHUYÊN MÔN
----------------------------------------
${(profile.skillCategories || []).map(cat => `
* ${cat.categoryName}:
  ${(cat.skills || []).map(s => `- ${s.name} (${s.level}%)`).join('\n  ')}
`).join('\n')}

IV. TRÌNH ĐỘ HỌC VẤN
--------------------
${(profile.educations || []).map(edu => `* ${edu.degree} - ${edu.institution || edu.school || ''} (${edu.period})`).join('\n')}

V. CHỨNG CHỈ HÀNH NGHỀ & PHÁP LÝ
--------------------------------
${(profile.certifications || []).map(cert => `* ${cert.name} - Cấp bởi: ${cert.issuer} (${cert.issueDate})`).join('\n')}
`;
  };

  const handleCopyTextCV = () => {
    navigator.clipboard.writeText(generatePlainTextCV());
    setCopiedTextCV(true);
    setTimeout(() => setCopiedTextCV(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Container Dialog */}
      <div 
        className={`w-full max-w-5xl my-4 sm:my-8 rounded-3xl border shadow-2xl flex flex-col max-h-[92vh] overflow-hidden transition-all ${
          darkMode ? 'bg-[#0A0C10] border-white/10 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}
      >
        
        {/* Modal Top Control Header (Hidden in Print) */}
        <div className="no-print p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#11141D]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0F2942] flex items-center justify-center text-white shadow-lg shadow-blue-900/30 border border-blue-500/20">
              <FileText className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Xuất CV 2 Trang Chuẩn Văn Bản Kỹ Sư</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30 font-bold">
                  Bố Cục 2 Cột Executive
                </span>
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Bố cục 2 cột chuyên nghiệp cho Senior / Manager, khổ A4 chuẩn 210 × 297mm, phân bổ cân đối 2 trang
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Quick Summary for Recruiter / Boss */}
            <button
              onClick={handleCopySummary}
              title="Sao chép báo cáo tóm tắt ứng viên gửi lãnh đạo"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-blue-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Đã sao chép tóm tắt' : 'Tóm tắt gửi Sếp'}</span>
            </button>

            {/* Direct PDF Download Button (Primary) */}
            <button
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              id="btn-download-pdf-direct"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white flex items-center gap-2 shadow-lg shadow-blue-900/40 border border-blue-400/30 transition-transform cursor-pointer ${
                isExportingPDF ? 'opacity-80 cursor-wait' : 'hover:scale-[1.02]'
              }`}
              title="Tải File PDF 2 Trang chuẩn A4"
            >
              {isExportingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-200" />
                  <span>{exportProgress || 'Đang kết xuất PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Tải File PDF (2 Trang A4)</span>
                </>
              )}
            </button>

            {/* Safe Print / Save As PDF */}
            <button
              onClick={handleSafePrint}
              id="btn-print-cv-direct"
              title="In / Lưu dạng PDF vector từ trình duyệt"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In / Lưu PDF</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Ribbon */}
        <div className="no-print px-5 py-2.5 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between text-xs text-[#94A3B8] gap-3 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>Tùy chọn:</span>
            </span>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input 
                type="checkbox" 
                checked={showAvatar} 
                onChange={(e) => setShowAvatar(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Ảnh chân dung hồ sơ</span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleDownloadHTML}
              className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-medium transition-colors cursor-pointer"
              title="Download HTML file 2 trang"
            >
              <FileDown className="w-3 h-3" />
              <span>Tải file HTML (2 Trang)</span>
            </button>

            <button 
              onClick={handleCopyTextCV} 
              className="text-[11px] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedTextCV ? <Check className="w-3 h-3 text-emerald-400" /> : <FileText className="w-3 h-3 text-blue-400" />}
              <span>{copiedTextCV ? 'Đã sao chép text' : 'Sao chép dạng Text'}</span>
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="no-print bg-emerald-500/15 border-b border-emerald-500/30 px-5 py-2 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Scrollable Printable Document Area with Exact 2-Page Presentation */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#181A20] space-y-8">
          
          {/* ==================== TRANG 1 / 2 (PREVIEW) ==================== */}
          <div className="max-w-[794px] mx-auto">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Trang 1 / 2 — Tổng Quan Hồ Sơ & Kinh Nghiệm Trọng Điểm</span>
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                Khổ A4 (Trang 1/2)
              </span>
            </div>

            <div 
              ref={page1Ref}
              id="printable-cv-page-1"
              className="w-full bg-white text-[#1E293B] shadow-2xl rounded-sm p-[28px_32px_24px_34px] flex flex-col justify-between overflow-hidden"
              style={{
                width: '794px',
                height: '1123px',
                minHeight: '1123px',
                maxHeight: '1123px',
                boxSizing: 'border-box'
              }}
            >
              <div>
                {/* Header Top */}
                <div className="flex items-center justify-between border-b-2 border-[#0F2942] pb-3 mb-3 gap-4">
                  <div className="flex-1">
                    <h1 className="text-[22px] font-extrabold text-[#0F2942] uppercase tracking-[0.6px] leading-tight mb-1">
                      {profile.fullName}
                    </h1>
                    <p className="text-[12.5px] font-bold text-[#1E3A8A] uppercase tracking-[0.4px] mb-1">
                      {profile.title}
                    </p>
                    <div className="inline-block text-[10px] font-semibold text-[#0F2942] bg-[#F1F5F9] border border-[#CBD5E1] px-2 py-0.5 rounded">
                      6+ Năm Kinh Nghiệm &bull; Quản Trị Chi Phí & Ngân Sách Dự Án &bull; Tiên Phong Chuyển Đổi Số
                    </div>
                  </div>
                  {showAvatar && (
                    <div className="shrink-0">
                      <img 
                        src={profile.avatarUrl} 
                        alt={profile.fullName} 
                        className="w-[90px] h-[115px] object-cover rounded border-[1.5px] border-[#0F2942] shadow-sm"
                      />
                    </div>
                  )}
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-[228px_1fr] gap-[18px]">
                  
                  {/* Left Column (Sidebar) */}
                  <div className="bg-[#F8FAFC] rounded border border-[#E2E8F0] p-[10px_11px] flex flex-col gap-[11px]">
                    
                    {/* Contact Info */}
                    <div>
                      <div className="text-[10.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px] border-b border-[#CBD5E1] pb-0.5 mb-1.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#1E3A8A]" />
                        <span>THÔNG TIN LIÊN HỆ</span>
                      </div>
                      <div className="text-[9.8px] text-[#334155] mb-1 leading-snug">
                        <span className="font-bold text-[#0F2942] block text-[9.2px] uppercase">Điện thoại</span>
                        {profile.phone}
                      </div>
                      <div className="text-[9.8px] text-[#334155] mb-1 leading-snug">
                        <span className="font-bold text-[#0F2942] block text-[9.2px] uppercase">Email</span>
                        {profile.email}
                      </div>
                      <div className="text-[9.8px] text-[#334155] mb-1 leading-snug">
                        <span className="font-bold text-[#0F2942] block text-[9.2px] uppercase">Địa bàn</span>
                        {profile.location}
                      </div>
                      <div className="text-[9.8px] text-[#334155] mb-1 leading-snug">
                        <span className="font-bold text-[#0F2942] block text-[9.2px] uppercase">Hồ sơ trực tuyến</span>
                        <span className="text-[#1E3A8A] font-semibold">{currentUrl.replace(/^https?:\/\//, '')}</span>
                      </div>
                    </div>

                    {/* Core Skills */}
                    <div>
                      <div className="text-[10.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px] border-b border-[#CBD5E1] pb-0.5 mb-1.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#1E3A8A]" />
                        <span>NĂNG LỰC CỐT LÕI</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Quản lý Chi phí & Ngân sách</span>
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Lập TMĐT & Dòng tiền</span>
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Quản lý Hợp đồng & Pháp lý</span>
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Thanh Quyết toán A-B</span>
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Bóc tách khối lượng (QS)</span>
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Đấu thầu HSMT/HSDT</span>
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Kiểm soát rủi ro chi phí</span>
                        <span className="text-[9.2px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Định giá xây dựng Hạng III</span>
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <div className="text-[10.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px] border-b border-[#CBD5E1] pb-0.5 mb-1.5 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-[#1E3A8A]" />
                        <span>TRÌNH ĐỘ HỌC VẤN</span>
                      </div>
                      {(profile.educations || []).map(edu => (
                        <div key={edu.id} className="text-[9.8px] mb-1">
                          <div className="font-bold text-[#0F2942] leading-tight">{edu.degree}</div>
                          <div className="text-[#2563EB] font-semibold text-[9.2px]">{edu.institution || edu.school}</div>
                          <div className="text-[#64748B] text-[9px]">Niên khóa: {edu.period}</div>
                          <div className="text-[#475569] text-[9px] mt-0.5">• Giải 3 NCKH SV cấp Trường. Tốt nghiệp loại Khá.</div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Column (Main Content) */}
                  <div className="flex flex-col gap-2.5">
                    
                    {/* Summary */}
                    <div>
                      <div className="text-[11.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.5px] border-b-[1.5px] border-[#0F2942] pb-0.5 mb-1.5">
                        I. TÓM TẮT HỒ SƠ & NĂNG LỰC QUẢN TRỊ
                      </div>
                      <p className="text-[9.8px] text-[#1E293B] leading-relaxed text-justify">
                        {profile.bio}
                      </p>
                    </div>

                    {/* Experience Part 1 */}
                    <div>
                      <div className="text-[11.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.5px] border-b-[1.5px] border-[#0F2942] pb-0.5 mb-1.5">
                        II. KINH NGHIỆM LÀM VIỆC CHUYÊN SÂU
                      </div>
                      {expPage1.map(exp => (
                        <div key={exp.id} className="mb-2">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-[11.2px] font-bold text-[#0F2942]">{exp.role}</span>
                            <span className="text-[9.5px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded whitespace-nowrap">
                              {exp.period}
                            </span>
                          </div>
                          <div className="text-[10.5px] font-semibold text-[#2563EB] mb-0.5">
                            {exp.company} &bull; {exp.location}
                          </div>
                          <div className="text-[9.8px] text-[#475569] mb-1 leading-snug text-justify">
                            {exp.summary || exp.description}
                          </div>
                          {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <div className="space-y-0.5">
                              {exp.responsibilities.map((r, idx) => (
                                <div key={idx} className="text-[9.8px] text-[#334155] pl-2.5 relative leading-snug text-justify">
                                  <span className="absolute left-0 text-[#1E3A8A] text-[8px] top-0">▪</span>
                                  {r}
                                </div>
                              ))}
                            </div>
                          )}
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded p-1 mt-1 text-[9.5px] text-[#166534] leading-snug">
                              <strong>Thành tựu nổi bật:</strong> {exp.achievements.join('; ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </div>

              {/* Footer Page 1 */}
              <div className="border-t border-[#CBD5E1] pt-1.5 flex justify-between text-[8.8px] text-[#64748B] mt-1.5">
                <span>Hồ sơ năng lực: {profile.fullName} &bull; Chuyên môn: Kinh Tế Xây Dựng & Quản Trị Chi Phí</span>
                <span className="font-bold text-[#0F2942]">Trang 1 / 2</span>
              </div>
            </div>
          </div>

          {/* ==================== TRANG 2 / 2 (PREVIEW) ==================== */}
          <div className="max-w-[794px] mx-auto">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Trang 2 / 2 — Chứng Chỉ, Dự Án Tiêu Biểu & Kỹ Năng Số</span>
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                Khổ A4 (Trang 2/2)
              </span>
            </div>

            <div 
              ref={page2Ref}
              id="printable-cv-page-2"
              className="w-full bg-white text-[#1E293B] shadow-2xl rounded-sm p-[28px_32px_24px_34px] flex flex-col justify-between overflow-hidden"
              style={{
                width: '794px',
                height: '1123px',
                minHeight: '1123px',
                maxHeight: '1123px',
                boxSizing: 'border-box'
              }}
            >
              <div>
                {/* Mini Header Page 2 */}
                <div className="flex justify-between items-center border-b-2 border-[#0F2942] pb-1.5 mb-2.5">
                  <span className="text-[11.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px]">
                    Hồ Sơ Năng Lực: {profile.fullName} &bull; Kỹ Sư Kinh Tế Xây Dựng
                  </span>
                  <span className="text-[9px] font-bold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                    Trang 2 / 2 &bull; Quản Trị Dự Án & Kỹ Năng Chuyên Sâu
                  </span>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-[228px_1fr] gap-[18px]">
                  
                  {/* Left Column (Sidebar Page 2) */}
                  <div className="bg-[#F8FAFC] rounded border border-[#E2E8F0] p-[10px_11px] flex flex-col gap-[11px]">
                    
                    {/* Certifications */}
                    <div>
                      <div className="text-[10.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px] border-b border-[#CBD5E1] pb-0.5 mb-1.5 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#1E3A8A]" />
                        <span>CHỨNG CHỈ HÀNH NGHỀ</span>
                      </div>
                      {(profile.certifications || []).map(cert => (
                        <div key={cert.id} className="text-[9.5px] mb-1.5">
                          <div className="font-bold text-[#0F2942] leading-tight">{cert.name}</div>
                          <div className="text-[#475569] text-[9px]">Cơ quan cấp: <strong>{cert.issuer}</strong></div>
                          <div className="text-[#1E3A8A] text-[8.8px] font-semibold">Hiệu lực: {cert.issueDate}</div>
                        </div>
                      ))}
                    </div>

                    {/* Software & Tools */}
                    <div>
                      <div className="text-[10.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px] border-b border-[#CBD5E1] pb-0.5 mb-1.5 flex items-center gap-1">
                        <Code className="w-3 h-3 text-[#1E3A8A]" />
                        <span>CÔNG NGHỆ & PHẦN MỀM</span>
                      </div>
                      <div className="text-[9.2px] leading-relaxed">
                        <div className="font-bold text-[#0F2942] mb-0.5">Nghiệp vụ Xây dựng:</div>
                        <div className="flex flex-wrap gap-1 mb-1.5">
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">G8 / F1 / ETA (80%)</span>
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">AutoCAD</span>
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">SAP ERP</span>
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">MS Project</span>
                        </div>
                        <div className="font-bold text-[#0F2942] mb-0.5">Phân tích & Tự động hóa:</div>
                        <div className="flex flex-wrap gap-1">
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Excel Nâng cao (95%)</span>
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Power Query & BI (90%)</span>
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">AI (GPT / Gemini)</span>
                          <span className="font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded">Web App Quản lý</span>
                        </div>
                      </div>
                    </div>

                    {/* Awards */}
                    <div>
                      <div className="text-[10.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px] border-b border-[#CBD5E1] pb-0.5 mb-1.5 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-[#1E3A8A]" />
                        <span>KHEN THƯỞNG & GHI NHẬN</span>
                      </div>
                      {(profile.awards || []).map(award => (
                        <div key={award.id} className="text-[9.2px] mb-1">
                          <div className="font-bold text-[#0F2942] leading-tight">{award.title}</div>
                          <div className="text-[#64748B] text-[8.8px]">{award.awarder} ({award.date})</div>
                        </div>
                      ))}
                    </div>

                    {/* Declaration */}
                    <div>
                      <div className="text-[10.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.4px] border-b border-[#CBD5E1] pb-0.5 mb-1.5">
                        LỜI CAM ĐOAN
                      </div>
                      <p className="text-[9px] text-[#334155] leading-snug text-justify">
                        Tôi xin cam đoan toàn bộ thông tin đào tạo, kinh nghiệm công tác và chứng chỉ nêu trên là hoàn toàn chính xác. Sẵn sàng cung cấp hồ sơ gốc đối chiếu khi có yêu cầu.
                      </p>
                      <div className="mt-1 text-[8.8px] font-bold text-[#166534]">
                        ✓ Sẵn sàng nhận việc
                      </div>
                    </div>

                  </div>

                  {/* Right Column (Main Content Page 2) */}
                  <div className="flex flex-col gap-2.5">
                    
                    {/* Experience Part 2 */}
                    {expPage2.length > 0 && (
                      <div>
                        <div className="text-[11.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.5px] border-b-[1.5px] border-[#0F2942] pb-0.5 mb-1.5">
                          II. KINH NGHIỆM LÀM VIỆC CHUYÊN SÂU (TIẾP THEO)
                        </div>
                        {expPage2.map(exp => (
                          <div key={exp.id} className="mb-2">
                            <div className="flex justify-between items-baseline mb-0.5">
                              <span className="text-[11.2px] font-bold text-[#0F2942]">{exp.role}</span>
                              <span className="text-[9.5px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded whitespace-nowrap">
                                {exp.period}
                              </span>
                            </div>
                            <div className="text-[10.5px] font-semibold text-[#2563EB] mb-0.5">
                              {exp.company} &bull; {exp.location}
                            </div>
                            <div className="text-[9.8px] text-[#475569] mb-1 leading-snug text-justify">
                              {exp.summary || exp.description}
                            </div>
                            {exp.responsibilities && exp.responsibilities.length > 0 && (
                              <div className="space-y-0.5">
                                {exp.responsibilities.slice(0, 3).map((r, idx) => (
                                  <div key={idx} className="text-[9.8px] text-[#334155] pl-2.5 relative leading-snug text-justify">
                                    <span className="absolute left-0 text-[#1E3A8A] text-[8px] top-0">▪</span>
                                    {r}
                                  </div>
                                ))}
                              </div>
                            )}
                            {exp.achievements && exp.achievements.length > 0 && (
                              <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded p-1 mt-1 text-[9.5px] text-[#166534] leading-snug">
                                <strong>Thành tích:</strong> {exp.achievements.join('; ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Selected Projects */}
                    <div>
                      <div className="text-[11.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.5px] border-b-[1.5px] border-[#0F2942] pb-0.5 mb-1.5">
                        III. DỰ ÁN TIÊU BIỂU & SẢN PHẨM SỐ HÓA QUẢN TRỊ
                      </div>
                      {featuredProjects.map(proj => (
                        <div key={proj.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-1.5 mb-1.5">
                          <div className="flex justify-between items-baseline">
                            <span className="text-[10.5px] font-bold text-[#0F2942]">{proj.title}</span>
                            <span className="text-[9px] font-semibold text-[#1E3A8A] bg-[#EFF6FF] px-1.5 py-0.5 rounded">
                              {proj.role || 'Chủ trì thiết kế & phát triển'}
                            </span>
                          </div>
                          <div className="text-[9.5px] text-[#475569] leading-snug my-0.5">{proj.description}</div>
                          {proj.metrics && (
                            <div className="text-[9.2px] text-[#166534] font-semibold mt-0.5">
                              🎯 <em>Hiệu quả:</em> {proj.metrics}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Key Highlights */}
                    <div>
                      <div className="text-[11.5px] font-extrabold text-[#0F2942] uppercase tracking-[0.5px] border-b-[1.5px] border-[#0F2942] pb-0.5 mb-1.5">
                        IV. THÀNH TỰU & THẾ MẠNH QUẢN TRỊ NỔI BẬT
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[9.8px] text-[#334155] pl-2.5 relative leading-snug">
                          <span className="absolute left-0 text-[#1E3A8A] text-[8px] top-0">▪</span>
                          <strong>Kiểm soát ngân sách đa dự án:</strong> Kinh nghiệm quản lý chi phí các đại dự án khu đô thị Vinhomes, công trình quốc phòng Tổng Cty 36 và dự án năng lượng tái tạo.
                        </div>
                        <div className="text-[9.8px] text-[#334155] pl-2.5 relative leading-snug">
                          <span className="absolute left-0 text-[#1E3A8A] text-[8px] top-0">▪</span>
                          <strong>Chuẩn hóa & Tự động hóa:</strong> Tiên phong ứng dụng Power BI, Power Query và AI Assistant giúp rút ngắn 65% thời gian lập báo cáo và đối soát số liệu.
                        </div>
                        <div className="text-[9.8px] text-[#334155] pl-2.5 relative leading-snug">
                          <span className="absolute left-0 text-[#1E3A8A] text-[8px] top-0">▪</span>
                          <strong>Pháp lý & Quyết toán vững vàng:</strong> Am hiểu sâu sắc quy định pháp luật xây dựng, định mức nhà nước và xử lý thanh quyết toán dứt điểm.
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Footer Page 2 */}
              <div className="border-t border-[#CBD5E1] pt-1.5 flex justify-between text-[8.8px] text-[#64748B] mt-1.5">
                <span>Hồ sơ năng lực: {profile.fullName} &bull; Chuyên môn: Kinh Tế Xây Dựng & Quản Trị Chi Phí</span>
                <span className="font-bold text-[#0F2942]">Trang 2 / 2</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
