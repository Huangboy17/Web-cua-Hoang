import React, { useState } from 'react';
import { 
  Terminal, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Cpu, 
  Globe, 
  Layers,
  Building2,
  Code2
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeroBioProps {
  profile: UserProfile;
  darkMode: boolean;
  onOpenEditor: () => void;
}

export const HeroBio: React.FC<HeroBioProps> = ({ profile, darkMode, onOpenEditor }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section 
      id="bio"
      className={`relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden transition-colors ${
        darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
      }`}
    >
      {/* Background Tech Gradient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#7C3AED]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-[#2563EB]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bio & Highlights (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              {profile.availableForHire ? (
                <div 
                  id="status-available-badge"
                  className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs uppercase tracking-[0.15em] font-semibold border ${
                    darkMode 
                      ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40' 
                      : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                  <span>Sẵn sàng kết nối • Open to Connect</span>
                </div>
              ) : (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                  darkMode ? 'bg-white/5 text-[#94A3B8] border-white/10' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  <span>Đang thực hiện dự án</span>
                </div>
              )}

              <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider font-mono border ${
                darkMode ? 'bg-[#11131A] text-[#94A3B8] border-white/10' : 'bg-slate-100 text-[#64748B] border-[#E2E8F0]'
              }`}>
                📍 {(profile.location || 'Hà Nội, Việt Nam').split('(')[0]}
              </span>
            </div>

            {/* Name & Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-3">
              <span className={darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}>
                {profile.fullName}
              </span>
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#A78BFA] font-bold">
                {profile.title}
              </span>
              <span className="text-[#94A3B8]">•</span>
              <span className={`text-xs uppercase tracking-wider font-mono ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
              }`}>
                6 Năm Kinh Nghiệm
              </span>
            </div>

            {/* Headline / Summary */}
            <p className={`text-base sm:text-lg leading-relaxed mb-6 max-w-2xl font-normal ${
              darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
            }`}>
              {profile.headline}
            </p>

            {/* Detailed Bio Description */}
            <div className={`p-5 sm:p-6 rounded-2xl border mb-8 max-w-2xl text-sm sm:text-base leading-relaxed ${
              darkMode 
                ? 'bg-[#11131A] border-white/10 text-[#F8FAFC]/80 shadow-lg' 
                : 'bg-white border-[#E2E8F0] text-[#334155] shadow-sm'
            }`}>
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] shrink-0 mt-0.5">
                  <Terminal className="w-4 h-4" />
                </div>
                <p className="font-normal leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                  {profile.bio}
                </p>
              </div>
            </div>

            {/* Crucial CTA for Recruiters */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full mb-8">
              {/* Main emphasize button: Jump to Web Apps Showcase */}
              <a
                id="hero-cta-apps"
                href="#projects"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-lg shadow-purple-500/25 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-[0.15em]"
              >
                <Layers className="w-4 h-4" />
                <span>Xem Các Web App Đã Làm</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary CTA: Contact */}
              <a
                id="hero-cta-hire"
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-[0.15em] transition-all border ${
                  darkMode 
                    ? 'bg-[#11131A] hover:bg-white/5 text-[#F8FAFC] border-white/10 hover:border-[#2563EB]' 
                    : 'bg-white hover:bg-slate-50 text-[#2563EB] border-[#E2E8F0] shadow-sm'
                }`}
              >
                <Send className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Liên Hệ</span>
              </a>
            </div>

            {/* Quick Contact & Social Chips */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Email chip with copy */}
              <button
                onClick={handleCopyEmail}
                id="hero-copy-email-btn"
                className={`px-3.5 py-2 rounded-full text-xs font-mono border flex items-center gap-2 transition-all ${
                  darkMode 
                    ? 'bg-[#11131A] hover:bg-white/5 text-[#F8FAFC] border-white/10 hover:border-[#7C3AED]/50' 
                    : 'bg-white hover:bg-slate-100 text-[#0F172A] border-[#E2E8F0] shadow-sm'
                }`}
                title="Sao chép địa chỉ Email"
              >
                <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>{profile.email}</span>
                {copiedEmail ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-[#94A3B8] ml-1" />
                )}
              </button>

              {/* Phone chip with copy */}
              <button
                onClick={handleCopyPhone}
                id="hero-copy-phone-btn"
                className={`px-3.5 py-2 rounded-full text-xs font-mono border flex items-center gap-2 transition-all ${
                  darkMode 
                    ? 'bg-[#11131A] hover:bg-white/5 text-[#F8FAFC] border-white/10 hover:border-[#2563EB]/50' 
                    : 'bg-white hover:bg-slate-100 text-[#0F172A] border-[#E2E8F0] shadow-sm'
                }`}
                title="Sao chép số điện thoại"
              >
                <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{profile.phone}</span>
                {copiedPhone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-[#94A3B8] ml-1" />
                )}
              </button>

              {/* Social links */}
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2 rounded-full border transition-all ${
                    darkMode 
                      ? 'bg-[#11131A] hover:bg-[#2563EB]/20 text-[#94A3B8] hover:text-white border-white/10 hover:border-[#2563EB]' 
                      : 'bg-white hover:bg-blue-50 text-[#64748B] hover:text-[#2563EB] border-[#E2E8F0]'
                  }`}
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2 rounded-full border transition-all ${
                    darkMode 
                      ? 'bg-[#11131A] hover:bg-[#7C3AED]/20 text-[#94A3B8] hover:text-white border-white/10 hover:border-[#7C3AED]' 
                      : 'bg-white hover:bg-purple-50 text-[#64748B] hover:text-[#7C3AED] border-[#E2E8F0]'
                  }`}
                  title="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Key Metrics Bento & Profile Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Main Profile Identity Card */}
            <div className={`p-6 sm:p-7 rounded-3xl border transition-all relative overflow-hidden ${
              darkMode 
                ? 'bg-[#11131A] border-white/10 text-[#F8FAFC] shadow-2xl' 
                : 'bg-white border-[#E2E8F0] text-[#0F172A] shadow-md'
            }`}>
              
              {/* Subtle top edge gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#2563EB]" />

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.fullName} 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#7C3AED]/40 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#7C3AED] text-white">
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{profile.fullName}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-mono font-semibold mt-0.5">{profile.title}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* 4 Core Value Metric Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                
                <div className={`p-4 rounded-2xl border transition-all ${
                  darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
                }`}>
                  <div className="flex items-center gap-1.5 text-[#7C3AED] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Kinh nghiệm</span>
                  </div>
                  <div className="text-2xl font-bold text-gradient-tech">{profile.yearsOfExperience}+ Năm</div>
                  <p className="text-[11px] text-[#94A3B8]">Kinh tế Xây dựng & AI</p>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${
                  darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
                }`}>
                  <div className="flex items-center gap-1.5 text-[#2563EB] mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Chủ Đầu Tư</span>
                  </div>
                  <div className="text-2xl font-bold text-gradient-tech">5+ Doanh nghiệp</div>
                  <p className="text-[11px] text-[#94A3B8]">Vinhomes, Phú Điền, 36</p>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${
                  darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
                }`}>
                  <div className="flex items-center gap-1.5 text-[#7C3AED] mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Ứng dụng Web</span>
                  </div>
                  <div className="text-2xl font-bold text-gradient-tech">{profile.projects.length}+ Web Apps</div>
                  <p className="text-[11px] text-[#94A3B8]">Quản lý Chi phí & AI</p>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${
                  darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
                }`}>
                  <div className="flex items-center gap-1.5 text-[#2563EB] mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Công nghệ</span>
                  </div>
                  <div className="text-2xl font-bold text-gradient-tech">10+ Công cụ</div>
                  <p className="text-[11px] text-[#94A3B8]">G8/F1, SAP, Power BI, AI</p>
                </div>
              </div>

              {/* Verified Skills Summary */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="uppercase tracking-[0.15em] font-mono text-[#A78BFA] font-semibold">
                    Thế mạnh cốt lõi
                  </span>
                  <span className="font-mono text-emerald-400 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Đã kiểm chứng
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {['Quản Lý Chi Phí & TMĐT', 'Đấu Thầu & Hợp Đồng', 'SAP ERP', 'G8 / F1', 'AI & Web Automation', 'Power BI'].map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-xs font-mono border ${
                        darkMode 
                          ? 'bg-[#08090D] text-[#F8FAFC]/90 border-white/10 hover:border-[#7C3AED]/40' 
                          : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
