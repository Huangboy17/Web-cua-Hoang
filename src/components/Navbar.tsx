import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Layers, 
  Terminal, 
  Send, 
  Edit3, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Sparkles,
  Cloud,
  Check,
  ShieldCheck,
  Lock,
  FileText,
  Download
} from 'lucide-react';
import { User } from 'firebase/auth';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
  onOpenEditor: () => void;
  onOpenAdminAuth: () => void;
  onOpenExportCV?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isCloudSynced?: boolean;
  currentUser: User | null;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenEditor,
  onOpenAdminAuth,
  onOpenExportCV,
  darkMode,
  onToggleDarkMode,
  isCloudSynced = true,
  currentUser,
  isAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Giới Thiệu', href: '#bio', icon: Terminal },
    { label: 'Web Apps Nổi Bật', href: '#projects', icon: Layers, highlight: true },
    { label: 'Kinh Nghiệm', href: '#experience', icon: Briefcase },
    { label: 'Kỹ Năng', href: '#skills', icon: Sparkles },
    { label: 'Liên Hệ', href: '#contact', icon: Send },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? darkMode 
            ? 'bg-[#08090D]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3' 
            : 'bg-[#F8FAFC]/90 backdrop-blur-xl border-b border-[#E2E8F0] shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Logo */}
          <a 
            href="#bio" 
            className="flex items-center gap-3.5 group focus:outline-none"
            id="brand-logo-link"
          >
            <div className="relative">
              <img 
                src={profile.avatarUrl} 
                alt={profile.fullName}
                className="w-10 h-10 rounded-full object-cover border border-[#7C3AED]/60 shadow-md group-hover:scale-105 transition-transform" 
              />
              {profile.availableForHire && (
                <span 
                  title="Sẵn sàng nhận việc / Open for opportunities"
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#7C3AED] border-2 border-[#08090D] rounded-full animate-pulse"
                />
              )}
            </div>
            <div>
              <span className={`font-semibold text-lg tracking-tight block transition-colors ${
                darkMode ? 'text-[#F8FAFC] group-hover:text-[#A78BFA]' : 'text-[#0F172A] group-hover:text-[#2563EB]'
              }`}>
                {profile.fullName}
              </span>
              <span className={`text-[11px] uppercase tracking-[0.2em] font-medium block ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
              }`}>
                {profile.title}
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                  item.highlight
                    ? darkMode
                      ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40 hover:border-[#A78BFA]'
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 text-[#2563EB] border border-blue-200 hover:border-[#2563EB]'
                    : darkMode
                      ? 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7C3AED]"></span>
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cloud Sync Status Badge */}
            <div 
              title={isCloudSynced ? "Đã đồng bộ Google Cloud Firestore" : "Đang kết nối Google Cloud..."}
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono border transition-all ${
                isCloudSynced
                  ? darkMode 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : darkMode
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-amber-50 text-amber-600 border-amber-200'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>{isCloudSynced ? 'Cloud Synced' : 'Syncing...'}</span>
              {isCloudSynced && <Check className="w-3 h-3" />}
            </div>

            {/* Export CV Button */}
            {onOpenExportCV && (
              <button
                id="btn-navbar-export-cv"
                onClick={onOpenExportCV}
                title="Xem & Xuất hồ sơ CV hoàn chỉnh (PDF/Print) để báo cáo lãnh đạo"
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                  darkMode
                    ? 'bg-[#7C3AED]/15 hover:bg-[#7C3AED]/25 text-[#A78BFA] border-[#7C3AED]/40 hover:border-[#A78BFA]'
                    : 'bg-purple-50 hover:bg-purple-100 text-[#7C3AED] border-purple-200 shadow-sm'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Xuất CV</span>
              </button>
            )}

            {/* Customize / Edit Profile Button or Admin Auth */}
            {isAdmin ? (
              <button
                id="btn-open-editor"
                onClick={onOpenEditor}
                title="Chỉnh sửa thông tin hồ sơ & liên kết Web App (Quyền Quản Trị Viên)"
                className="p-2 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20 hover:scale-[1.02]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">Quản Trị Hồ Sơ</span>
              </button>
            ) : (
              <button
                id="btn-open-auth"
                onClick={onOpenAdminAuth}
                title="Đăng nhập quản trị (Dành riêng cho Bùi Việt Hoàng)"
                className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  darkMode 
                    ? 'bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] border border-white/10 hover:border-[#7C3AED]/40' 
                    : 'bg-white hover:bg-slate-100 text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] shadow-sm'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span className="hidden sm:inline">Quản Trị</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              id="btn-toggle-theme"
              onClick={onToggleDarkMode}
              title={darkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              className={`p-2 rounded-full border transition-all ${
                darkMode 
                  ? 'bg-white/5 border-white/10 text-[#A78BFA] hover:bg-white/10' 
                  : 'bg-white border-[#E2E8F0] text-[#2563EB] hover:bg-slate-100 shadow-sm'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border md:hidden border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pt-3 pb-6 border-b shadow-2xl backdrop-blur-2xl ${
          darkMode ? 'bg-[#08090D]/95 border-white/10 text-[#F8FAFC]' : 'bg-white/95 border-[#E2E8F0] text-[#0F172A]'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                  item.highlight
                    ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/30'
                    : darkMode ? 'hover:bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC]' : 'hover:bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <item.icon className="w-4 h-4 text-[#A78BFA]" />
                <span>{item.label}</span>
              </a>
            ))}

            {/* Mobile Xuất CV Action */}
            {onOpenExportCV && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExportCV();
                }}
                className="w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 text-[#A78BFA] hover:bg-purple-500/20 transition-all"
              >
                <FileText className="w-4 h-4 text-[#A78BFA]" />
                <span>Xuất Hồ Sơ CV (PDF / In Báo Cáo)</span>
              </button>
            )}

            <div className="pt-2 border-t border-white/10">
              {isAdmin ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEditor();
                  }}
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Mở Trình Quản Trị Hồ Sơ</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminAuth();
                  }}
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 bg-white/5 border border-white/10 text-[#94A3B8]"
                >
                  <Lock className="w-4 h-4 text-[#A78BFA]" />
                  <span>Đăng Nhập Quản Trị (Admin)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
