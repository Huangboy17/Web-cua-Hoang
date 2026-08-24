import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from './types';
import { DEFAULT_PROFILE } from './data/defaultData';
import { Navbar } from './components/Navbar';
import { HeroBio } from './components/HeroBio';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminCMSDashboard } from './components/AdminCMSDashboard';
import { Footer } from './components/Footer';
import { 
  Layers, 
  Send, 
  Mail, 
  CheckCircle2, 
  Cloud, 
  Check, 
  ShieldCheck, 
  Sliders, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { 
  auth, 
  onAuthStateChanged, 
  isUserAdmin, 
  logoutAdmin, 
  saveProfileToCloud, 
  fetchProfileFromCloud, 
  subscribeToCloudProfile 
} from './firebase';

const STORAGE_KEY = 'HOANG_KTXD_PORTFOLIO_PROFILE_DATA_V2';
const THEME_KEY = 'HOANG_PORTFOLIO_THEME_DARK';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved profile data', e);
    }
    return DEFAULT_PROFILE;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Theme load error', e);
    }
    return true;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showQuickBar, setShowQuickBar] = useState(false);
  const [copiedQuickEmail, setCopiedQuickEmail] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      const adminStatus = isUserAdmin(user);
      setIsAdmin(adminStatus);

      // If user logs in as Admin and URL has #admin, open CMS
      if (adminStatus && (window.location.hash === '#admin' || window.location.pathname.includes('/admin'))) {
        setIsAdminCMSOpen(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to hash change
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname.includes('/admin')) {
        if (isAdmin) {
          setIsAdminCMSOpen(true);
        } else {
          setIsAdminAuthOpen(true);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAdmin]);

  // Initial cloud fetch & sync subscription
  useEffect(() => {
    let isMounted = true;

    async function initCloudData() {
      try {
        const cloudData = await fetchProfileFromCloud();
        if (cloudData && isMounted) {
          setProfile(cloudData);
          setIsCloudSynced(true);
        } else if (!cloudData && isMounted) {
          // If no doc in cloud yet, seed with default profile
          await saveProfileToCloud(profile);
          setIsCloudSynced(true);
        }
      } catch (err) {
        console.warn('Initial cloud sync notice:', err);
      }
    }

    initCloudData();

    // Subscribe to realtime cloud updates
    const unsubscribe = subscribeToCloudProfile((cloudProfile) => {
      if (cloudProfile && isMounted) {
        setProfile(cloudProfile);
        setIsCloudSynced(true);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to persist profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, JSON.stringify(darkMode));
    } catch (e) {
      console.error('Failed to persist theme', e);
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowQuickBar(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveProfile = async (updated: UserProfile) => {
    setProfile(updated);
    try {
      await saveProfileToCloud(updated);
      setIsCloudSynced(true);
    } catch (err) {
      console.error('Error saving to cloud:', err);
    }
  };

  const handleResetProfile = async () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    try {
      await saveProfileToCloud(DEFAULT_PROFILE);
      setIsCloudSynced(true);
    } catch (err) {
      console.error('Error resetting cloud profile:', err);
    }
  };

  const handleCopyQuickEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedQuickEmail(true);
    setTimeout(() => setCopiedQuickEmail(false), 2000);
  };

  // If Admin CMS is open and user is verified Admin, render the Full Admin CMS Dashboard
  if (isAdminCMSOpen && isAdmin) {
    return (
      <AdminCMSDashboard
        profile={profile}
        onSaveProfile={handleSaveProfile}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onCloseCMS={() => {
          setIsAdminCMSOpen(false);
          if (window.location.hash === '#admin') {
            window.location.hash = '';
          }
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      darkMode ? 'bg-[#08090D] text-[#F8FAFC] selection:bg-[#7C3AED] selection:text-white' : 'bg-[#F8FAFC] text-[#0F172A] selection:bg-[#2563EB]/20 selection:text-[#0F172A]'
    }`}>
      
      {/* Top Floating Admin Bar for Authenticated Admin */}
      {isAdmin && (
        <div className="bg-[#0E1118] text-white border-b border-purple-500/30 px-4 py-2 text-xs flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chế Độ Quản Trị Viên (Admin Active)</span>
            </span>
            <span className="text-[#94A3B8] font-mono hidden sm:inline">• {currentUser?.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminCMSOpen(true)}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white flex items-center gap-1.5 shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Vào Bảng Điều Khiển CMS</span>
            </button>

            <button
              onClick={async () => {
                await logoutAdmin();
              }}
              className="px-2.5 py-1 rounded-lg text-xs bg-white/10 hover:bg-rose-500/20 text-[#94A3B8] hover:text-rose-400 border border-white/10 transition-colors flex items-center gap-1"
              title="Đăng xuất quyền Admin"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        profile={profile}
        onOpenEditor={() => {
          if (isAdmin) {
            setIsAdminCMSOpen(true);
          } else {
            setIsAdminAuthOpen(true);
          }
        }}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        isCloudSynced={isCloudSynced}
        currentUser={currentUser}
        isAdmin={isAdmin}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero & Biography */}
        <HeroBio 
          profile={profile} 
          darkMode={darkMode} 
          onOpenEditor={() => {
            if (isAdmin) {
              setIsAdminCMSOpen(true);
            } else {
              setIsAdminAuthOpen(true);
            }
          }} 
        />

        {/* ⭐ Featured Web Apps Showcase (Primary Focus) */}
        <ProjectShowcase
          projects={profile.projects}
          darkMode={darkMode}
          onOpenEditor={() => {
            if (isAdmin) {
              setIsAdminCMSOpen(true);
            } else {
              setIsAdminAuthOpen(true);
            }
          }}
          isAdmin={isAdmin}
        />

        {/* Work Experience Timeline & Education */}
        <ExperienceSection
          experiences={profile.experiences}
          educations={profile.educations}
          certifications={profile.certifications}
          awards={profile.awards}
          darkMode={darkMode}
          isAdmin={isAdmin}
        />

        {/* Skills & Tech Matrix */}
        <SkillsSection
          categories={profile.skillCategories}
          darkMode={darkMode}
        />

        {/* Recruiter Direct Contact Section */}
        <ContactSection
          profile={profile}
          darkMode={darkMode}
        />
      </main>

      {/* Footer */}
      <Footer 
        profile={profile} 
        darkMode={darkMode} 
        onOpenEditor={() => {
          if (isAdmin) {
            setIsAdminCMSOpen(true);
          } else {
            setIsAdminAuthOpen(true);
          }
        }} 
      />

      {/* Admin Authentication Modal */}
      {isAdminAuthOpen && (
        <AdminAuthModal
          currentUser={currentUser}
          isAdmin={isAdmin}
          onClose={() => setIsAdminAuthOpen(false)}
          onOpenCMS={() => {
            setIsAdminAuthOpen(false);
            setIsAdminCMSOpen(true);
          }}
          darkMode={darkMode}
        />
      )}

      {/* Profile & Web App Editor Modal (Legacy Quick Editor fallback) */}
      {isEditorOpen && (
        <ProfileEditorModal
          profile={profile}
          onSave={handleSaveProfile}
          onReset={handleResetProfile}
          onClose={() => setIsEditorOpen(false)}
          darkMode={darkMode}
        />
      )}

      {/* Sticky Recruiter Floating Action Bar */}
      {showQuickBar && (
        <div 
          id="recruiter-floating-bar"
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-30 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-xl flex items-center gap-3 transition-all animate-in slide-in-from-bottom-5 duration-300 max-w-[95vw] sm:max-w-none ${
            darkMode 
              ? 'bg-[#11131A]/90 border-white/10 text-[#F8FAFC] shadow-black/90' 
              : 'bg-white/95 border-[#E2E8F0] text-[#0F172A] shadow-blue-500/10'
          }`}
        >
          <div className="hidden md:flex items-center gap-2 pr-3 border-r border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.15em] font-medium text-[#A78BFA]">Sẵn sàng kết nối</span>
          </div>

          <a
            href="#projects"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] text-white transition-all shadow-md shadow-purple-500/20"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Web Apps ({profile.projects.length})</span>
          </a>

          <button
            onClick={handleCopyQuickEmail}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              darkMode ? 'bg-white/5 hover:bg-white/10 text-white/90 border-white/10 hover:border-[#7C3AED]/40' : 'bg-slate-100 hover:bg-slate-200 text-[#0F172A] border-[#E2E8F0]'
            }`}
            title="Sao chép Email"
          >
            {copiedQuickEmail ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Đã chép Email!</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span className="hidden sm:inline">Email:</span>
                <span className="font-mono text-xs">{profile.email}</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              darkMode
                ? 'bg-white/5 hover:bg-white/10 text-[#F8FAFC] border-white/10 hover:border-[#2563EB]'
                : 'bg-white hover:bg-slate-50 text-[#2563EB] border-[#E2E8F0]'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden sm:inline">Liên Hệ</span>
          </a>
        </div>
      )}

    </div>
  );
}
