import React from 'react';
import { ArrowUp, Layers } from 'lucide-react';
import { UserProfile } from '../types';

interface FooterProps {
  profile: UserProfile;
  darkMode: boolean;
  onOpenEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, darkMode, onOpenEditor }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className={`border-t py-12 transition-colors ${
        darkMode ? 'bg-[#08090D] border-white/10 text-[#94A3B8]' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <img 
              src={profile.avatarUrl} 
              alt={profile.fullName} 
              className="w-10 h-10 rounded-full object-cover border border-[#7C3AED]/40"
            />
            <div>
              <p className={`font-bold text-base ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>
                {profile.fullName}
              </p>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#A78BFA] font-mono">
                {profile.title}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono">
            <a href="#bio" className={`transition-colors ${darkMode ? 'hover:text-[#A78BFA]' : 'hover:text-[#2563EB]'}`}>Giới Thiệu</a>
            <a href="#projects" className="text-[#A78BFA] font-semibold hover:underline flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#7C3AED]" /> Web Apps (Live Demo)
            </a>
            <a href="#experience" className={`transition-colors ${darkMode ? 'hover:text-[#A78BFA]' : 'hover:text-[#2563EB]'}`}>Kinh Nghiệm</a>
            <a href="#skills" className={`transition-colors ${darkMode ? 'hover:text-[#A78BFA]' : 'hover:text-[#2563EB]'}`}>Kỹ Năng</a>
            <a href="#contact" className={`transition-colors ${darkMode ? 'hover:text-[#A78BFA]' : 'hover:text-[#2563EB]'}`}>Liên Hệ</a>
            <button onClick={onOpenEditor} className="text-[#2563EB] hover:text-[#7C3AED] hover:underline font-semibold">
              ⚙️ Quản trị hồ sơ
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className={`px-4 py-2 rounded-full border flex items-center gap-2 text-xs uppercase tracking-wider font-mono transition-all ${
              darkMode ? 'bg-[#11131A] border-white/10 text-white/80 hover:text-white hover:border-[#7C3AED]' : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-slate-100 shadow-sm'
            }`}
            title="Lên đầu trang"
          >
            <span>Đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#7C3AED]" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8]/70 gap-3 font-mono">
          <p>© {new Date().getFullYear()} {profile.fullName}. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            Thiết kế tối ưu cho <strong className={darkMode ? 'text-[#A78BFA] font-sans' : 'text-[#2563EB] font-sans'}>Nhà Tuyển Dụng (Tech Recruiters)</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};
