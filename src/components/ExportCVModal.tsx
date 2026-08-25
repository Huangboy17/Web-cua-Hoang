import React, { useState, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Loader2,
  FileDown,
  AlertCircle
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserProfile } from '../types';

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
  const [showAvatar, setShowAvatar] = useState(true);
  const [includeAllProjects, setIncludeAllProjects] = useState(true);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedTextCV, setCopiedTextCV] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [exportProgress, setExportProgress] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const cvPrintRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://portfolio.web.app';

  // 1. Generate Raw Standalone HTML Document
  const generateStandaloneHTML = () => {
    const displayedProjects = includeAllProjects 
      ? (profile.projects || []) 
      : (profile.projects || []).filter(p => p.featured);

    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV - ${profile.fullName} - ${profile.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.5;
      padding: 20px;
    }
    .cv-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      padding-bottom: 24px;
      border-bottom: 2px solid #e2e8f0;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: #ede9fe;
      color: #6d28d9;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .subtitle {
      font-size: 16px;
      font-weight: 700;
      color: #6d28d9;
      margin-bottom: 12px;
    }
    .headline {
      font-size: 13px;
      color: #475569;
      line-height: 1.6;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 16px;
      object-fit: cover;
      border: 2px solid #6d28d9;
      flex-shrink: 0;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      background: #f8fafc;
      border-radius: 12px;
      padding: 12px 16px;
      margin: 20px 0;
      font-size: 12px;
      font-weight: 500;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6d28d9;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin: 24px 0 14px 0;
    }
    .bio-text {
      font-size: 13px;
      color: #334155;
      line-height: 1.65;
      text-align: justify;
      white-space: pre-line;
    }
    .exp-item {
      border-left: 2px solid #c4b5fd;
      padding-left: 14px;
      margin-bottom: 18px;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .exp-role {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
    }
    .exp-period {
      font-size: 11px;
      font-weight: 700;
      color: #6d28d9;
      background: #ede9fe;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .exp-company {
      font-size: 12px;
      font-weight: 600;
      color: #1d4ed8;
      margin-bottom: 6px;
    }
    .exp-desc {
      font-size: 12px;
      color: #475569;
      margin-bottom: 8px;
    }
    .list-item {
      font-size: 12px;
      color: #475569;
      margin-bottom: 4px;
      padding-left: 14px;
      position: relative;
    }
    .list-item::before {
      content: "•";
      position: absolute;
      left: 2px;
      color: #6d28d9;
    }
    .achievement-box {
      background: #f5f3ff;
      border: 1px solid #ddd6fe;
      border-radius: 8px;
      padding: 8px 12px;
      margin-top: 6px;
      font-size: 11px;
      color: #4c1d95;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .project-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-col;
      justify-content: space-between;
    }
    .proj-title {
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .proj-badge {
      font-size: 9px;
      font-weight: 700;
      background: #dbeafe;
      color: #1e40af;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .proj-desc {
      font-size: 11px;
      color: #475569;
      margin-bottom: 8px;
    }
    .tech-pill {
      display: inline-block;
      font-size: 9px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 2px 6px;
      border-radius: 4px;
      color: #334155;
      margin-right: 4px;
      margin-bottom: 4px;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .skill-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px;
    }
    .skill-pill {
      display: inline-block;
      font-size: 11px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 3px 8px;
      border-radius: 6px;
      color: #334155;
      margin-right: 6px;
      margin-bottom: 6px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 14px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #64748b;
    }
    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .cv-container {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      @page {
        size: A4;
        margin: 12mm 15mm;
      }
    }
  </style>
</head>
<body>
  <div class="cv-container">
    <div class="header">
      <div>
        <div class="badge">Curriculum Vitae • Executive Profile</div>
        <h1>${profile.fullName}</h1>
        <div class="subtitle">${profile.title}</div>
        <p class="headline">${profile.headline}</p>
      </div>
      ${showAvatar ? `<img src="${profile.avatarUrl}" alt="${profile.fullName}" class="avatar" />` : ''}
    </div>

    <div class="contact-grid">
      <div>📧 <strong>Email:</strong> ${profile.email}</div>
      <div>📞 <strong>SĐT:</strong> ${profile.phone}</div>
      <div>📍 <strong>Địa điểm:</strong> ${profile.location}</div>
      <div>🌐 <strong>Portfolio:</strong> ${currentUrl.replace(/^https?:\/\//, '')}</div>
    </div>

    <div class="section-title">✨ Tóm Tắt Năng Lực & Giá Trị Đóng Góp</div>
    <div class="bio-text">${profile.bio}</div>

    <div class="section-title">💼 Kinh Nghiệm Làm Việc Chuyên Sâu</div>
    ${(profile.experiences || []).map(exp => `
      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-role">${exp.role || ''}</span>
          <span class="exp-period">${exp.period || ''}</span>
        </div>
        <div class="exp-company">${exp.company || ''} • ${exp.location || ''}</div>
        <div class="exp-desc">${exp.description || exp.summary || ''}</div>
        ${exp.responsibilities && exp.responsibilities.length > 0 ? `
          <div style="font-weight: 700; font-size: 11px; margin-bottom: 4px; color: #334155;">Trách nhiệm chính:</div>
          ${(exp.responsibilities || []).map(r => `<div class="list-item">${r}</div>`).join('')}
        ` : ''}
        ${exp.achievements && exp.achievements.length > 0 ? `
          <div class="achievement-box">
            <strong>Thành tựu nổi bật:</strong>
            ${(exp.achievements || []).map(a => `<div style="margin-top: 2px;">• ${a}</div>`).join('')}
          </div>
        ` : ''}
      </div>
    `).join('')}

    <div class="section-title">💻 Hệ Thống Web Apps & Giải Pháp Số Đã Triển Khai</div>
    <div class="projects-grid">
      ${(displayedProjects || []).map(proj => `
        <div class="project-card">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span class="proj-title">${proj.title}</span>
              <span class="proj-badge">${proj.category}</span>
            </div>
            <div class="proj-desc">${proj.description}</div>
          </div>
          <div>
            <div>
              ${(proj.tags || []).slice(0, 4).map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
            ${proj.liveUrl ? `<div style="font-size: 9px; color: #6d28d9; margin-top: 4px;">Demo: ${proj.liveUrl}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section-title">🎯 Kỹ Năng & Năng Lực Cốt Lõi</div>
    <div class="skills-grid">
      ${(profile.skillCategories || []).map(cat => `
        <div class="skill-card">
          <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px; color: #1e293b;">${cat.categoryName}</div>
          <div>
            ${(cat.skills || []).map(s => `<span class="skill-pill">${s.name} (${s.level}%)</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 14px;">
      <div>
        <div class="section-title" style="margin-top: 10px;">🎓 Học Vấn</div>
        ${(profile.educations || []).map(edu => `
          <div style="margin-bottom: 8px; font-size: 12px;">
            <strong>${edu.degree}</strong>
            <div style="color: #64748b; font-size: 11px;">${edu.institution || edu.school || ''} (${edu.period})</div>
          </div>
        `).join('')}
      </div>
      <div>
        <div class="section-title" style="margin-top: 10px;">🛡️ Chứng Chỉ Hành Nghề</div>
        ${(profile.certifications || []).map(cert => `
          <div style="margin-bottom: 8px; font-size: 12px;">
            <strong>${cert.name}</strong>
            <div style="color: #64748b; font-size: 11px;">${cert.issuer} • ${cert.issueDate}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="footer">
      <span>Hồ sơ ứng viên: ${profile.fullName}</span>
      <span>Website Portfolio: ${currentUrl}</span>
    </div>
  </div>
</body>
</html>`;
  };

  // 2. High Quality Client-Side PDF Export (Non-blocking, using html2canvas & jsPDF)
  const handleExportPDF = async () => {
    if (!cvPrintRef.current || isExportingPDF) return;

    try {
      setIsExportingPDF(true);
      setExportProgress('Đang chuẩn bị trang A4...');
      setStatusMessage(null);

      // Create a clone of the CV to render at exact high-DPI A4 proportions
      const element = cvPrintRef.current;
      setExportProgress('Đang xử lý hình ảnh & bố cục văn bản...');

      const canvas = await html2canvas(element, {
        scale: 2, // High resolution (2x DPI for crisp text and avatar)
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      setExportProgress('Đang tạo file PDF chuẩn in ấn...');

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First Page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Handle multi-page if content overflows A4
      while (heightLeft > 5) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      // Safe filename
      const cleanName = (profile.fullName || 'Bui_Viet_Hoang')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '_');
      
      pdf.save(`CV_${cleanName}_KinhTeXayDung.pdf`);

      setStatusMessage('Đã tải xuống file PDF thành công!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      console.error('PDF Generation Error:', err);
      setStatusMessage('Tự động chuyển sang chế độ Tải File HTML / In an toàn.');
      // Fallback: download standalone HTML
      handleDownloadHTML();
    } finally {
      setIsExportingPDF(false);
      setExportProgress('');
    }
  };

  // 3. Download Standalone HTML CV (100% Reliable across any device, zero lag)
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
      link.download = `CV_${cleanName}_KinhTeXayDung.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatusMessage('Đã tải file CV HTML đầy đủ (Mở và in bất kỳ lúc nào)!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  // 4. Safe Isolated Iframe Print (Prevents main window from freezing)
  const handleSafePrint = () => {
    try {
      const htmlContent = generateStandaloneHTML();
      
      // Create hidden detached iframe
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
            console.warn('Iframe print blocked, falling back to PDF download:', printErr);
            handleExportPDF();
          } finally {
            setTimeout(() => {
              if (document.body.contains(printIframe)) {
                document.body.removeChild(printIframe);
              }
            }, 2000);
          }
        }, 500);
      } else {
        handleExportPDF();
      }
    } catch (err) {
      console.error(err);
      handleExportPDF();
    }
  };

  // Generate Executive Summary for Recruiter to copy-paste into Email / Slack to boss
  const generateRecruiterSummary = () => {
    const projectsList = profile.projects || [];
    return `KÍNH GỬI BAN LÃNH ĐẠO / PHÒNG NHÂN SỰ - BÁO CÁO HỒ SƠ ỨNG VIÊN

👤 ỨNG VIÊN: ${(profile.fullName || '').toUpperCase()}
🎯 VỊ TRÍ ỨNG TUYỂN: ${profile.title || ''}
⏳ KINH NGHIỆM: ${profile.yearsOfExperience || 6}+ Năm trong ngành Kinh tế Xây dựng & Phát triển Web Apps / Chuyển đổi số

🌟 ĐIỂM NỔI BẬT ĐÁNH GIÁ:
• Chuyên môn kép: Vừa nắm vững nghiệp vụ Quản lý Chi phí, Dự toán, Đấu thầu, vừa có năng lực xây dựng & triển khai trực tiếp các ứng dụng Web/AI phục vụ số hóa doanh nghiệp.
• Đã độc lập và dẫn dắt phát triển ${projectsList.length}+ hệ thống Web App chuyên ngành (Dự toán chi phí, Bóc tách khối lượng tự động, Quản trị ngân sách dự án).
• Đầy đủ chứng chỉ hành nghề: Định giá xây dựng Hạng III, Quản lý dự án Hạng III.

💼 CÁC ỨNG DỤNG TIÊU BIỂU:
${projectsList.slice(0, 3).map((p, idx) => `${idx + 1}. ${p.title} (${p.category}) - ${(p.description || '').slice(0, 100)}...`).join('\n')}

📞 THÔNG TIN LIÊN HỆ:
• Email: ${profile.email || ''}
• SĐT: ${profile.phone || ''}
• Địa điểm: ${profile.location || ''}
• Xem Portfolio & Demo trực tuyến: ${currentUrl}
`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateRecruiterSummary());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Generate plain-text CV
  const generatePlainTextCV = () => {
    return `CURRICULUM VITAE - ${(profile.fullName || '').toUpperCase()}
=====================================================
${profile.title || ''}
Email: ${profile.email || ''} | Phone: ${profile.phone || ''} | Location: ${profile.location || ''}
Portfolio: ${currentUrl}

1. TÓM TẮT NĂNG LỰC
-------------------
${profile.headline || ''}
${profile.bio || ''}

2. KINH NGHIỆM LÀM VIỆC
-----------------------
${(profile.experiences || []).map(exp => `
* ${(exp.role || '').toUpperCase()} tại ${exp.company || ''} (${exp.period || ''})
  - Địa điểm: ${exp.location || ''}
  - Mô tả: ${exp.description || exp.summary || ''}
  - Trọng tâm: ${(exp.responsibilities || []).join('; ')}
  - Thành tựu: ${(exp.achievements || []).join('; ')}
`).join('\n')}

3. DỰ ÁN WEB APPS & SẢN PHẨM CHUYỂN ĐỔI SỐ
------------------------------------------
${(profile.projects || []).map(proj => `
* ${proj.title} [${proj.category}]
  - Tóm tắt: ${proj.description || ''}
  - Công nghệ: ${(proj.tags || []).join(', ')}
  - Điểm nổi bật: ${(proj.keyFeatures || []).join('; ')}
`).join('\n')}

4. KỸ NĂNG CHUYÊN MÔN
---------------------
${(profile.skillCategories || []).map(cat => `
* ${cat.categoryName}:
  ${(cat.skills || []).map(s => `- ${s.name} (${s.level}%)`).join('\n  ')}
`).join('\n')}

5. HỌC VẤN & BẰNG CẤP
---------------------
${(profile.educations || []).map(edu => `* ${edu.degree} - ${edu.institution || edu.school || ''} (${edu.period})`).join('\n')}

6. CHỨNG CHỈ HÀNH NGHỀ
----------------------
${(profile.certifications || []).map(cert => `* ${cert.name} - Cấp bởi: ${cert.issuer} (${cert.issueDate})`).join('\n')}
`;
  };

  const handleCopyTextCV = () => {
    navigator.clipboard.writeText(generatePlainTextCV());
    setCopiedTextCV(true);
    setTimeout(() => setCopiedTextCV(false), 2500);
  };

  const displayedProjects = includeAllProjects 
    ? (profile.projects || []) 
    : (profile.projects || []).filter(p => p.featured);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Container Dialog */}
      <div 
        className={`w-full max-w-5xl my-4 sm:my-8 rounded-3xl border shadow-2xl flex flex-col max-h-[92vh] overflow-hidden transition-all ${
          darkMode ? 'bg-[#0A0C10] border-white/10 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}
      >
        
        {/* Modal Top Control Header (Hidden in Print) */}
        <div className="no-print p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#11141D]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Hồ Sơ CV Hoàn Chỉnh</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                  Chuẩn Báo Cáo Lãnh Đạo
                </span>
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Tải trực tiếp file PDF, xuất file HTML độc lập hoặc in A4 chuẩn sắc nét.
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Quick Summary for Boss */}
            <button
              onClick={handleCopySummary}
              title="Sao chép nhanh tóm tắt hồ sơ kèm nhận xét & điểm mạnh để dán vào Email/Slack gửi Sếp"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-[#A78BFA] hover:text-white flex items-center gap-1.5 transition-all"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Đã chép tóm tắt!' : 'Chép Tóm Tắt Gửi Sếp'}</span>
            </button>

            {/* Direct PDF Download Button (Primary) */}
            <button
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              id="btn-download-pdf-direct"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] text-white flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-transform ${
                isExportingPDF ? 'opacity-80 cursor-wait' : 'hover:scale-[1.02]'
              }`}
              title="Tạo và tải ngay file PDF chuẩn A4 chất lượng cao"
            >
              {isExportingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{exportProgress || 'Đang tạo PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Tải File PDF (A4)</span>
                </>
              )}
            </button>

            {/* Safe Print */}
            <button
              onClick={handleSafePrint}
              id="btn-print-cv-direct"
              title="Mở hộp thoại in ấn / Lưu PDF từ trình duyệt"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors border border-white/10"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In A4</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization & Status Ribbon (Hidden in Print) */}
        <div className="no-print px-5 py-2.5 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between text-xs text-[#94A3B8] gap-3 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Tùy chỉnh:</span>
            </span>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input 
                type="checkbox" 
                checked={showAvatar} 
                onChange={(e) => setShowAvatar(e.target.checked)}
                className="rounded accent-[#7C3AED]"
              />
              <span>Ảnh thẻ Avatar</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input 
                type="checkbox" 
                checked={includeAllProjects} 
                onChange={(e) => setIncludeAllProjects(e.target.checked)}
                className="rounded accent-[#7C3AED]"
              />
              <span>Tất cả Web Apps ({profile.projects.length})</span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Standalone HTML download fallback */}
            <button 
              onClick={handleDownloadHTML}
              className="text-[11px] text-[#38BDF8] hover:underline flex items-center gap-1 font-medium transition-colors"
              title="Tải tệp HTML offline hoàn chỉnh"
            >
              <FileDown className="w-3 h-3" />
              <span>Tải file HTML</span>
            </button>

            <button 
              onClick={handleCopyTextCV} 
              className="text-[11px] hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedTextCV ? <Check className="w-3 h-3 text-emerald-400" /> : <FileText className="w-3 h-3 text-[#A78BFA]" />}
              <span>{copiedTextCV ? 'Đã sao chép Text CV' : 'Chép Text/Markdown'}</span>
            </button>
          </div>
        </div>

        {/* Status Notification if any */}
        {statusMessage && (
          <div className="no-print bg-emerald-500/15 border-b border-emerald-500/30 px-5 py-2 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Scrollable Printable Document Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0D0F16]">
          
          {/* Paper Canvas (A4 Styled Document) */}
          <div 
            ref={cvPrintRef}
            id="printable-cv-document"
            className="cv-paper max-w-4xl mx-auto bg-white text-[#0F172A] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 border border-slate-200 transition-all font-sans"
          >
            
            {/* 1. Header Section */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b-2 border-slate-200">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-purple-100 text-[#6D28D9] mb-2">
                  Curriculum Vitae • Executive Profile
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mb-1.5 uppercase">
                  {profile.fullName}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#6D28D9] mb-3">
                  {profile.title}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  {profile.headline}
                </p>
              </div>

              {/* Avatar Photo */}
              {showAvatar && (
                <div className="shrink-0 flex flex-col items-center">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.fullName} 
                    crossOrigin="anonymous"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-purple-600 shadow-md"
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-1 font-semibold">6+ Năm KN</span>
                </div>
              )}
            </div>

            {/* 2. Contact Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-200 text-xs bg-slate-50 px-4 rounded-xl my-4">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#6D28D9] shrink-0" />
                <span className="truncate font-medium">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <span className="truncate font-medium">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span className="truncate font-medium">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate font-medium">{currentUrl.replace(/^https?:\/\//, '')}</span>
              </div>
            </div>

            {/* 3. Executive Bio Summary */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-2 flex items-center gap-1.5 border-b pb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tóm Tắt Năng Lực & Giá Trị Đóng Góp</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line text-justify">
                {profile.bio}
              </p>
            </div>

            {/* 4. Work Experience */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-3 flex items-center gap-1.5 border-b pb-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Kinh Nghiệm Làm Việc Chuyên Sâu</span>
              </h3>

              <div className="space-y-4">
                {(profile.experiences || []).map((exp) => (
                  <div key={exp.id} className="border-l-2 border-purple-300 pl-3.5 py-0.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-[11px] font-mono font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1.5">
                      <span>{exp.company}</span>
                      <span>•</span>
                      <span className="text-slate-500 font-normal">{exp.location}</span>
                    </div>
                    {exp.summary && (
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">{exp.summary}</p>
                    )}
                    
                    {/* Responsibilities */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="space-y-1 mb-2">
                        <p className="text-[11px] font-bold text-slate-700">Trách nhiệm & Nhiệm vụ chính:</p>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5 pl-1">
                          {(exp.responsibilities || []).map((resp, i) => (
                            <li key={i} className="leading-snug">{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="bg-purple-50/70 p-2 rounded-lg text-xs border border-purple-100">
                        <span className="font-bold text-purple-900 block mb-0.5 text-[11px]">Thành tựu nổi bật:</span>
                        <ul className="list-disc list-inside text-slate-700 space-y-0.5 pl-1">
                          {(exp.achievements || []).map((ach, i) => (
                            <li key={i}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Web Applications & Digital Transformation Products */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-3 flex items-center gap-1.5 border-b pb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Hệ Thống Ứng Dụng Web Apps & Sản Phẩm Số Đã Triển Khai</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(displayedProjects || []).map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mb-2 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {(proj.tags || []).slice(0, 4).map((tech, i) => (
                          <span key={i} className="text-[9px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {proj.liveUrl && (
                        <p className="text-[10px] text-purple-700 font-mono truncate">
                          🔗 Demo: {proj.liveUrl}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Skills Matrix */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-3 flex items-center gap-1.5 border-b pb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bộ Kỹ Năng & Năng Lực Cốt Lõi</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {(profile.skillCategories || []).map((cat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <h5 className="font-bold text-slate-800 text-xs mb-2">{cat.categoryName}</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {(cat.skills || []).map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-white text-slate-700 font-medium text-[11px] border border-slate-200"
                        >
                          {skill.name} ({skill.level}%)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 text-xs">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Học Vấn & Bằng Cấp</span>
                </h3>
                {(profile.educations || []).map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600 text-[11px]">{edu.institution || edu.school || ''} ({edu.period})</p>
                    {edu.description && <p className="text-[10px] text-slate-500 italic">{edu.description}</p>}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Chứng Chỉ Hành Nghề</span>
                </h3>
                {(profile.certifications || []).map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="font-bold text-slate-900">{cert.name}</p>
                    <p className="text-slate-600 text-[11px]">Cơ quan cấp: {cert.issuer} • Năm {cert.issueDate}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Hồ sơ ứng viên: {profile.fullName}</span>
              <span>Truy cập Portfolio trực tuyến: {currentUrl}</span>
            </div>

          </div>

        </div>

        {/* Modal Bottom Footer (Hidden in Print) */}
        <div className="no-print p-4 bg-[#11141D] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tự động xuất tệp chuẩn A4 sắc nét & ATS, không làm đóng băng hay đơ trình duyệt.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2 shadow-md transition-all disabled:opacity-75"
            >
              {isExportingPDF ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isExportingPDF ? 'Đang xuất PDF...' : 'Tải File PDF Ngay'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

