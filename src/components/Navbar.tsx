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
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

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
  const { t } = useLanguage();
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
    { label: t.nav.bio, href: '#bio', icon: Terminal },
    { label: t.nav.projects, href: '#projects', icon: Layers, highlight: true },
    { label: t.nav.experience, href: '#experience', icon: Briefcase },
    { label: t.nav.skills, href: '#skills', icon: Sparkles },
    { label: t.nav.contact, href: '#contact', icon: Send },
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
                  title={t.nav.availableBadge}
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
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Selector */}
            <LanguageSelector darkMode={darkMode} />

            {/* Cloud Sync Status Badge */}
            <div 
              title={isCloudSynced ? t.nav.cloudSynced : t.nav.connectingCloud}
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
              <span>{isCloudSynced ? t.common.synced : t.common.syncing}</span>
              {isCloudSynced && <Check className="w-3 h-3" />}
            </div>

            {/* Export CV Button */}
            {onOpenExportCV && (
              <button
                id="btn-navbar-export-cv"
                onClick={onOpenExportCV}
                title={t.nav.exportCV}
                className={`hidden sm:flex px-3.5 py-1.5 rounded-full text-xs font-bold items-center gap-1.5 transition-all shadow-sm transform hover:scale-105 active:scale-95 ${
                  darkMode
                    ? 'bg-gradient-to-r from-[#9333EA]/30 to-[#EC4899]/30 hover:from-[#9333EA]/50 hover:to-[#EC4899]/50 text-white border border-[#9333EA]/50 shadow-purple-500/20'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-purple-500/25'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.nav.exportCV}</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-white/20 uppercase tracking-wider">PDF</span>
              </button>
            )}

            {/* Customize / Edit Profile Button or Admin Auth */}
            {isAdmin ? (
              <button
                id="btn-open-editor"
                onClick={onOpenEditor}
                title={t.nav.cms}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20 hover:scale-[1.02]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">{t.nav.cms}</span>
              </button>
            ) : (
              <button
                id="btn-open-auth"
                onClick={onOpenAdminAuth}
                title={t.nav.admin}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  darkMode 
                    ? 'bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] border border-white/10 hover:border-[#7C3AED]/40' 
                    : 'bg-white hover:bg-slate-100 text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] shadow-sm'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span className="hidden sm:inline">{t.nav.admin}</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              id="btn-toggle-theme"
              onClick={onToggleDarkMode}
              title={darkMode ? t.common.switchToLight : t.common.switchToDark}
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
              className={`p-2 rounded-lg border md:hidden transition-colors ${
                darkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
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
            {/* Mobile Language Bar */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.common.languageLabel}</span>
              <LanguageSelector darkMode={darkMode} />
            </div>

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
                <span>{t.nav.exportCV}</span>
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
                  <span>{t.nav.cms}</span>
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
                  <span>{t.nav.admin}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
