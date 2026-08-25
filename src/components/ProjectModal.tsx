import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Copy, 
  CheckCircle2, 
  Layers, 
  KeyRound, 
  Sparkles, 
  Check, 
  Calendar, 
  UserCheck, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { ProjectApp } from '../types';

interface ProjectModalProps {
  project: ProjectApp | null;
  onClose: () => void;
  darkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  if (!project) return null;

  const handleCopy = (text: string, type: 'url' | 'user' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else if (type === 'user') {
      setCopiedUser(true);
      setTimeout(() => setCopiedUser(false), 2000);
    } else if (type === 'pass') {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <div 
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all ${
          darkMode 
            ? 'bg-[#11131A] border-white/10 text-[#F8FAFC]' 
            : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full border transition-all ${
            darkMode 
              ? 'bg-[#08090D]/80 hover:bg-white/10 text-white/80 border-white/10 hover:text-white' 
              : 'bg-white/80 hover:bg-slate-100 text-[#0F172A] border-[#E2E8F0] shadow-sm'
          }`}
          title="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Preview Image & Browser Bar */}
        <div className="relative">
          {/* Simulated Browser Bar */}
          <div className={`px-4 py-3 border-b flex items-center justify-between text-xs font-mono rounded-t-3xl ${
            darkMode ? 'bg-[#08090D] border-white/10 text-[#94A3B8]' : 'bg-slate-50 border-[#E2E8F0] text-[#64748B]'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
            </div>

            <div className={`px-4 py-1 rounded-full border flex items-center gap-2 max-w-md truncate ${
              darkMode ? 'bg-[#11131A] border-white/10 text-white/80' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
              <span className="truncate">{project.liveUrl}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                darkMode ? 'bg-[#7C3AED]/20 text-[#A78BFA] border-[#7C3AED]/40' : 'bg-purple-50 text-[#7C3AED] border-purple-200'
              }`}>
                Live App
              </span>
            </div>
          </div>

          {/* Banner Screenshot / Image */}
          <div className="relative h-60 sm:h-80 w-full overflow-hidden bg-[#08090D]">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-black/40 to-transparent" />
            
            {/* Action Bar Floating over Image */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#08090D]/80 backdrop-blur-md text-[#A78BFA] border border-white/10 shadow">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#08090D]/60 backdrop-blur-md text-white/80 border border-white/10">
                  Năm {project.completionYear}
                </span>
              </div>

              {/* Crucial CTA: Live Launch */}
              <a
                id="modal-btn-open-live"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-xl shadow-purple-500/25 transition-all hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Truy Cập Web App Ngay 🚀</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5">
              {project.title}
            </h2>
            <p className="text-sm font-mono text-[#A78BFA]">
              "{project.tagline}"
            </p>
          </div>

          {/* Recruiter Live Demo Account Box (If available) */}
          {project.demoAccount && (
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              darkMode 
                ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]' 
                : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-2 text-[#7C3AED]">
                <KeyRound className="w-4 h-4" />
                <span>Tài Khoản Mẫu Trải Nghiệm Thử:</span>
              </div>
              <p className={`text-xs mb-3 ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                {project.demoAccount.note || 'Sử dụng thông tin dưới đây để đăng nhập trực tiếp mà không cần đăng ký tài khoản mới:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Username / Email */}
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#94A3B8] block">Tài khoản / Email</span>
                    <span className="font-mono text-xs font-semibold text-[#A78BFA]">{project.demoAccount.username}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(project.demoAccount!.username, 'user')}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#94A3B8] hover:text-white"
                    title="Sao chép tài khoản"
                  >
                    {copiedUser ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password */}
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#94A3B8] block">Mật khẩu</span>
                    <span className="font-mono text-xs font-semibold text-[#2563EB]">{project.demoAccount.password}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(project.demoAccount!.password, 'pass')}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#94A3B8] hover:text-white"
                    title="Sao chép mật khẩu"
                  >
                    {copiedPass ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-[#A78BFA] font-bold mb-2">
              Tổng Quan & Vấn Đề Giải Quyết
            </h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
              {project.description}
            </p>
          </div>

          {/* Role & Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Role & Architecture */}
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
            }`}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#2563EB] mb-2">
                <UserCheck className="w-4 h-4" />
                <span>Vai Trò Trong Dự Án:</span>
              </div>
              <p className="font-semibold text-sm mb-2">{project.role}</p>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Trực tiếp thiết kế luồng người dùng (UX), kiến trúc cơ sở dữ liệu, tối ưu hóa các giải pháp kỹ thuật và triển khai trên môi trường Cloud / Serverless.
              </p>
            </div>

            {/* Key Features List */}
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
            }`}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#7C3AED] mb-2">
                <Zap className="w-4 h-4" />
                <span>Tính Năng Nổi Bật:</span>
              </div>
              <ul className="space-y-1.5">
                {(project.keyFeatures || []).map((feat, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                    <span className={darkMode ? 'text-[#F8FAFC]/90' : 'text-[#334155]'}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-[#A78BFA] font-bold mb-2">
              Công Nghệ & Thư Viện Sử Dụng
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                    darkMode 
                      ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]' 
                      : 'bg-slate-100 border-[#E2E8F0] text-[#0F172A]'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer of Modal */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {/* Copy Direct Link */}
              <button
                onClick={() => handleCopy(project.liveUrl, 'url')}
                className={`px-4 py-2 rounded-full text-xs font-mono border flex items-center gap-2 transition-all ${
                  darkMode ? 'bg-[#08090D] hover:bg-white/5 border-white/10 text-white/90' : 'bg-slate-100 hover:bg-slate-200 text-[#0F172A] border-[#E2E8F0]'
                }`}
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Đã chép link Web App!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Sao chép Link Web App</span>
                  </>
                )}
              </button>

              {/* GitHub Link */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-full text-xs font-mono border flex items-center gap-2 transition-all ${
                    darkMode ? 'bg-[#08090D] hover:bg-[#7C3AED]/20 border-white/10 text-white/90 hover:border-[#7C3AED]' : 'bg-slate-100 hover:bg-purple-50 text-[#0F172A] border-[#E2E8F0]'
                  }`}
                >
                  <Github className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            {/* Launch App Main Button */}
            <a
              id="modal-footer-launch-btn"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mở Web App Trực Tiếp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
