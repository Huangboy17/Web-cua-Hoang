import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Briefcase, 
  Globe, 
  MessageSquare, 
  Sparkles, 
  Settings, 
  LogOut, 
  Eye, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  Mail, 
  Building, 
  Calendar, 
  Search, 
  RefreshCw, 
  FileText, 
  Award, 
  GraduationCap, 
  Sliders, 
  Lock,
  Archive,
  Inbox,
  CheckCircle2
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  UserProfile, 
  ProjectApp, 
  WorkExperience, 
  SkillCategory, 
  ContactMessage,
  EducationItem,
  CertificationItem,
  AwardItem 
} from '../types';
import { 
  saveProfileToCloud, 
  logoutAdmin, 
  subscribeToContactMessages, 
  updateMessageStatus, 
  deleteMessageFromCloud,
  ADMIN_EMAILS 
} from '../firebase';
import { DEFAULT_PROFILE } from '../data/defaultData';
import { AvatarUploader } from './AvatarUploader';
import { ExportCVModal } from './ExportCVModal';

interface AdminCMSDashboardProps {
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  currentUser: User | null;
  isAdmin: boolean;
  onCloseCMS: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

type CMSTab = 'overview' | 'messages' | 'products' | 'experience' | 'general' | 'skills' | 'credentials' | 'settings';

export const AdminCMSDashboard: React.FC<AdminCMSDashboardProps> = ({
  profile,
  onSaveProfile,
  currentUser,
  isAdmin,
  onCloseCMS,
  darkMode,
  onToggleDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<CMSTab>('overview');
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [msgFilter, setMsgFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  
  // Product Edit State
  const [editingProduct, setEditingProduct] = useState<ProjectApp | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Experience Edit State
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);
  const [isNewExperience, setIsNewExperience] = useState(false);
  const [isExportCVOpen, setIsExportCVOpen] = useState(false);

  // Sync state when profile prop changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Subscribe to contact messages
  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = subscribeToContactMessages((msgs) => {
        setMessages(msgs);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const handleSaveToCloud = async (overrideData?: UserProfile) => {
    const dataToSave = overrideData || formData;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await saveProfileToCloud(dataToSave);
      onSaveProfile(dataToSave);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving to cloud:', err);
      alert('Có lỗi khi lưu lên Google Cloud Firestore. Vui lòng kiểm tra lại quyền Admin.');
    } finally {
      setIsSaving(false);
    }
  };

  // Messages operations
  const handleMarkMessage = async (msgId: string, status: 'unread' | 'read' | 'archived') => {
    try {
      await updateMessageStatus(msgId, status);
      if (activeMessage && activeMessage.id === msgId) {
        setActiveMessage({ ...activeMessage, status });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này khỏi Google Cloud?')) return;
    try {
      await deleteMessageFromCloud(msgId);
      if (activeMessage && activeMessage.id === msgId) {
        setActiveMessage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Product CRUD
  const handleSaveProductForm = (product: ProjectApp) => {
    let updatedProjects: ProjectApp[];
    if (isNewProduct) {
      updatedProjects = [product, ...(formData.projects || [])];
    } else {
      updatedProjects = (formData.projects || []).map((p) => p.id === product.id ? product : p);
    }
    const updatedProfile = {
      ...formData,
      projects: updatedProjects,
      completedProjectsCount: updatedProjects.length
    };
    setFormData(updatedProfile);
    setEditingProduct(null);
    handleSaveToCloud(updatedProfile);
  };

  const handleDeleteProduct = (prodId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    const updatedProjects = (formData.projects || []).filter(p => p.id !== prodId);
    const updatedProfile = {
      ...formData,
      projects: updatedProjects,
      completedProjectsCount: updatedProjects.length
    };
    setFormData(updatedProfile);
    handleSaveToCloud(updatedProfile);
  };

  const handleToggleProductPublish = (prodId: string) => {
    const updatedProjects = (formData.projects || []).map((p) => {
      if (p.id === prodId) {
        return { ...p, published: p.published === false ? true : false };
      }
      return p;
    });
    const updatedProfile = { ...formData, projects: updatedProjects };
    setFormData(updatedProfile);
    handleSaveToCloud(updatedProfile);
  };

  const handleToggleProductFeatured = (prodId: string) => {
    const updatedProjects = (formData.projects || []).map((p) => {
      if (p.id === prodId) {
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    const updatedProfile = { ...formData, projects: updatedProjects };
    setFormData(updatedProfile);
    handleSaveToCloud(updatedProfile);
  };

  const handleMoveProduct = (index: number, direction: 'up' | 'down') => {
    const projs = [...(formData.projects || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projs.length) return;
    const temp = projs[index];
    projs[index] = projs[targetIdx];
    projs[targetIdx] = temp;
    const updatedProfile = { ...formData, projects: projs };
    setFormData(updatedProfile);
    handleSaveToCloud(updatedProfile);
  };

  // Experience CRUD
  const handleSaveExperienceForm = (exp: WorkExperience) => {
    let updatedExp: WorkExperience[];
    if (isNewExperience) {
      updatedExp = [exp, ...(formData.experiences || [])];
    } else {
      updatedExp = (formData.experiences || []).map((e) => e.id === exp.id ? exp : e);
    }
    const updatedProfile = {
      ...formData,
      experiences: updatedExp,
    };
    setFormData(updatedProfile);
    setEditingExperience(null);
    handleSaveToCloud(updatedProfile);
  };

  const handleDeleteExperience = (expId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mục kinh nghiệm này?')) return;
    const updatedExp = (formData.experiences || []).filter(e => e.id !== expId);
    const updatedProfile = { ...formData, experiences: updatedExp };
    setFormData(updatedProfile);
    handleSaveToCloud(updatedProfile);
  };

  const handleMoveExperience = (index: number, direction: 'up' | 'down') => {
    const exps = [...(formData.experiences || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= exps.length) return;
    const temp = exps[index];
    exps[index] = exps[targetIdx];
    exps[targetIdx] = temp;
    const updatedProfile = { ...formData, experiences: exps };
    setFormData(updatedProfile);
    handleSaveToCloud(updatedProfile);
  };

  // Stats calculation
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;
  const totalProducts = formData.projects?.length || 0;
  const publishedProducts = formData.projects?.filter(p => p.published !== false).length || 0;
  const draftProducts = totalProducts - publishedProducts;
  const totalExperiences = formData.experiences?.length || 0;

  const filteredMessages = messages.filter((m) => {
    if (msgFilter === 'all') return true;
    return m.status === msgFilter;
  });

  return (
    <div className="min-h-screen bg-[#090B10] text-[#F8FAFC] flex flex-col font-sans">
      
      {/* Top Admin Header Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0E1118]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center shadow-md shadow-purple-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">Hoàng Brand Admin CMS</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Google Cloud Live
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] font-mono hidden sm:block">
              {currentUser?.email || ADMIN_EMAILS[0]}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          {saveSuccess && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>Đã lưu lên Cloud</span>
            </div>
          )}

          <button
            onClick={() => handleSaveToCloud()}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-md shadow-purple-500/20 transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
          </button>

          {/* Export CV button in CMS header */}
          <button
            onClick={() => setIsExportCVOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#A78BFA] hover:text-white border border-[#7C3AED]/40 transition-all"
            title="Xem trước & Xuất hồ sơ CV hoàn chỉnh (PDF) để gửi lãnh đạo"
          >
            <FileText className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span className="hidden sm:inline">Xuất CV (PDF)</span>
          </button>

          <button
            onClick={onCloseCMS}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#F8FAFC] border border-white/10 transition-all"
            title="Quay lại giao diện website dành cho khách xem"
          >
            <Eye className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span className="hidden md:inline">Xem Trang Web</span>
          </button>

          <button
            onClick={async () => {
              await logoutAdmin();
              onCloseCMS();
            }}
            className="p-2 rounded-xl text-xs bg-white/5 hover:bg-rose-500/20 text-[#94A3B8] hover:text-rose-400 border border-white/10 transition-all"
            title="Đăng xuất quyền Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#0B0D14] p-3 sm:p-4 shrink-0 overflow-y-auto">
          <p className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#A78BFA] px-3 mb-2">
            Quản Trị Thương Hiệu
          </p>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#7C3AED]" />
                <span>Tổng Quan & Số Liệu</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'messages'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#60A5FA]" />
                <span>Hộp Thư Liên Hệ</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#A78BFA]" />
                <span>Web Apps & Sản Phẩm</span>
              </div>
              <span className="text-[11px] font-mono text-[#94A3B8]">{totalProducts}</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-[#38BDF8]" />
                <span>Kinh Nghiệm & Dự Án</span>
              </div>
              <span className="text-[11px] font-mono text-[#94A3B8]">{totalExperiences}</span>
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'general'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#F43F5E]" />
                <span>Avatar, Hero & Bio</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'skills'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Kỹ Năng & Công Nghệ AI</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('credentials')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'credentials'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#10B981]" />
                <span>Bằng Cấp & Chứng Chỉ</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/40'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-[#94A3B8]" />
                <span>Cài Đặt & Sao Lưu</span>
              </div>
            </button>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#090B10]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-5xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                  <Sliders className="w-6 h-6 text-[#7C3AED]" />
                  <span>Bảng Điều Khiển Quản Trị Thương Hiệu</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  Quản lý nội dung, sản phẩm Web App thực tế và theo dõi tin nhắn liên hệ từ khách hàng / đối tác.
                </p>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#11131A] border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-mono text-[#94A3B8]">Tổng Web Apps</span>
                    <Layers className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">{totalProducts}</div>
                  <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1.5">
                    <span>{publishedProducts} công khai</span>
                    <span>•</span>
                    <span className="text-amber-400">{draftProducts} bản nháp</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#11131A] border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-mono text-[#94A3B8]">Hộp Thư Khách Hàng</span>
                    <MessageSquare className="w-5 h-5 text-[#60A5FA]" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">{messages.length}</div>
                  <div className="text-[11px] mt-2">
                    {unreadMessagesCount > 0 ? (
                      <span className="text-rose-400 font-semibold">{unreadMessagesCount} tin nhắn chưa đọc</span>
                    ) : (
                      <span className="text-[#94A3B8]">Tất cả tin nhắn đã xử lý</span>
                    )}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#11131A] border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-mono text-[#94A3B8]">Kinh Nghiệm & Dự Án</span>
                    <Briefcase className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">{totalExperiences}</div>
                  <div className="text-[11px] text-[#94A3B8] mt-2">
                    {formData.yearsOfExperience} năm kinh nghiệm thực chiến
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#11131A] border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-mono text-[#94A3B8]">Trạng Thái Cloud</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-1">Đồng Bộ Trực Tiếp</div>
                  <p className="text-[11px] text-[#94A3B8] mt-2">
                    Google Firestore DB
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-[#11131A] border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#7C3AED]" />
                    <span>Thao Tác Nhanh Sản Phẩm</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Thêm mới hoặc cập nhật link Web App thực tế để hiển thị trên trang chủ.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      onClick={() => {
                        setEditingProduct({
                          id: `proj-${Date.now()}`,
                          title: '',
                          tagline: '',
                          description: '',
                          liveUrl: 'https://',
                          category: 'SaaS',
                          tags: ['React', 'AI Integration'],
                          featured: false,
                          published: true,
                          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=1000&q=80',
                          role: 'Chủ trì phát triển',
                          keyFeatures: [''],
                          completionYear: '2026'
                        });
                        setIsNewProduct(true);
                        setActiveTab('products');
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm Web App Mới</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('products')}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    >
                      Xem Danh Sách ({totalProducts})
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#11131A] border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#60A5FA]" />
                    <span>Tin Nhắn Mới Nhất</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Hộp thư lưu trữ toàn bộ các lời nhắn, liên hệ hợp tác gửi từ trang web.
                  </p>
                  {messages.length > 0 ? (
                    <div className="space-y-2">
                      {messages.slice(0, 2).map((m) => (
                        <div 
                          key={m.id}
                          onClick={() => {
                            setActiveMessage(m);
                            setActiveTab('messages');
                          }}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#7C3AED]/40 cursor-pointer text-xs"
                        >
                          <div className="flex items-center justify-between font-semibold">
                            <span className="text-white">{m.name}</span>
                            <span className="text-[10px] text-[#94A3B8] font-mono">{new Date(m.createdAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <p className="text-[#94A3B8] truncate mt-0.5">{m.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#94A3B8]/60 italic">Chưa có tin nhắn nào trong hộp thư.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="max-w-5xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                    <MessageSquare className="w-6 h-6 text-[#60A5FA]" />
                    <span>Hộp Thư Liên Hệ & Khách Hàng ({messages.length})</span>
                  </h2>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Tin nhắn được lưu trực tiếp vào cơ sở dữ liệu Google Cloud Firestore.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2">
                  {(['all', 'unread', 'read', 'archived'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setMsgFilter(filter)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider capitalize transition-all ${
                        msgFilter === filter
                          ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white'
                          : 'bg-white/5 hover:bg-white/10 text-[#94A3B8] border border-white/10'
                      }`}
                    >
                      {filter === 'all' ? 'Tất cả' : filter === 'unread' ? `Chưa đọc (${unreadMessagesCount})` : filter === 'read' ? 'Đã đọc' : 'Lưu trữ'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Messages List (5 cols) */}
                <div className="lg:col-span-5 space-y-2">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center rounded-3xl bg-[#11131A] border border-white/10 text-[#94A3B8] text-xs">
                      <Inbox className="w-8 h-8 mx-auto mb-2 text-[#94A3B8]/50" />
                      <span>Không có tin nhắn nào trong danh mục này</span>
                    </div>
                  ) : (
                    filteredMessages.map((msg) => {
                      const isSelected = activeMessage?.id === msg.id;
                      const isUnread = msg.status === 'unread';
                      return (
                        <div
                          key={msg.id}
                          onClick={() => {
                            setActiveMessage(msg);
                            if (isUnread) {
                              handleMarkMessage(msg.id, 'read');
                            }
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#181B26] border-[#7C3AED] shadow-lg shadow-purple-500/10'
                              : isUnread
                                ? 'bg-[#111420] border-blue-500/40 hover:border-blue-400'
                                : 'bg-[#11131A] border-white/10 hover:border-white/20 text-[#94A3B8]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              {isUnread && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
                              <span className={`font-semibold text-xs sm:text-sm ${isUnread ? 'text-white' : 'text-[#E2E8F0]'}`}>
                                {msg.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#94A3B8]">
                              {new Date(msg.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>

                          {msg.company && (
                            <p className="text-[11px] text-[#A78BFA] font-medium truncate mb-1">
                              🏢 {msg.company} {msg.roleTitle ? `• ${msg.roleTitle}` : ''}
                            </p>
                          )}

                          <p className="text-xs text-[#94A3B8] line-clamp-2">{msg.message}</p>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Message Detail Viewer (7 cols) */}
                <div className="lg:col-span-7">
                  {activeMessage ? (
                    <div className="p-6 rounded-3xl bg-[#11131A] border border-white/10 space-y-5">
                      <div className="flex items-start justify-between border-b border-white/10 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{activeMessage.name}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8] mt-1">
                            <span className="text-[#60A5FA] font-mono">{activeMessage.email}</span>
                            {activeMessage.company && <span>• {activeMessage.company}</span>}
                            {activeMessage.roleTitle && <span>• {activeMessage.roleTitle}</span>}
                          </div>
                          <p className="text-[11px] font-mono text-[#64748B] mt-1">
                            Gửi lúc: {new Date(activeMessage.createdAt).toLocaleString('vi-VN')}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded-full font-bold border ${
                          activeMessage.status === 'unread'
                            ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                            : activeMessage.status === 'read'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : 'bg-white/5 text-[#94A3B8] border-white/10'
                        }`}>
                          {activeMessage.status}
                        </span>
                      </div>

                      {/* Message Content */}
                      <div>
                        <p className="text-xs uppercase font-mono tracking-wider text-[#A78BFA] mb-2 font-semibold">
                          Nội dung tin nhắn:
                        </p>
                        <div className="p-4 rounded-2xl bg-[#08090D] border border-white/10 text-xs sm:text-sm leading-relaxed text-[#F8FAFC] whitespace-pre-wrap">
                          {activeMessage.message}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${activeMessage.email}?subject=Phản hồi từ Bùi Việt Hoàng`}
                            className="px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] flex items-center gap-2"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Gửi Email Trả Lời</span>
                          </a>

                          <button
                            onClick={() => handleMarkMessage(
                              activeMessage.id, 
                              activeMessage.status === 'archived' ? 'read' : 'archived'
                            )}
                            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#94A3B8] border border-white/10 flex items-center gap-1.5"
                          >
                            <Archive className="w-3.5 h-3.5" />
                            <span>{activeMessage.status === 'archived' ? 'Bỏ lưu trữ' : 'Lưu trữ'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteMessage(activeMessage.id)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa Tin Nhắn</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-3xl bg-[#11131A] border border-white/10 text-[#94A3B8] text-xs">
                      <Mail className="w-8 h-8 mx-auto mb-2 text-[#94A3B8]/40" />
                      <span>Chọn một tin nhắn từ danh sách bên trái để xem nội dung chi tiết</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & WEB APPS CMS */}
          {activeTab === 'products' && (
            <div className="max-w-5xl space-y-6">
              
              {/* If editing a single product */}
              {editingProduct ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#11131A] border border-white/10 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-[#A78BFA]" />
                        <span>{isNewProduct ? 'Thêm Mới Web App' : `Chỉnh Sửa: ${editingProduct.title}`}</span>
                      </h3>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Điền đầy đủ thông tin để hiển thị thẻ sản phẩm chuyên nghiệp trên trang chủ.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-xs text-[#94A3B8] hover:text-white px-3 py-1.5 rounded-lg border border-white/10"
                    >
                      Hủy & Quay lại
                    </button>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveProductForm(editingProduct);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Tên Web App / Sản Phẩm *
                        </label>
                        <input
                          required
                          type="text"
                          value={editingProduct.title}
                          onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                          placeholder="Ví dụ: App Quản Lý Chi Phí Dự Án Tập Đoàn"
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Phân Loại (Category) *
                        </label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        >
                          <option value="SaaS">SaaS (Phần mềm dịch vụ)</option>
                          <option value="AI & Tech">AI & Tech (Trí tuệ nhân tạo)</option>
                          <option value="Tools">Tools (Công cụ chuyên môn)</option>
                          <option value="Fullstack">Fullstack (Ứng dụng toàn diện)</option>
                          <option value="E-commerce">E-commerce</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                        Khẩu Hiệu Ngắn (Tagline) *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingProduct.tagline}
                        onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                        placeholder="Ví dụ: Ứng dụng Web quản lý dòng tiền, kiểm soát định mức..."
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Đường Dẫn Trực Tiếp (Live URL) *
                        </label>
                        <input
                          required
                          type="url"
                          value={editingProduct.liveUrl}
                          onChange={(e) => setEditingProduct({ ...editingProduct, liveUrl: e.target.value })}
                          placeholder="https://your-app-domain.com"
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Đường Dẫn GitHub (Tùy chọn)
                        </label>
                        <input
                          type="url"
                          value={editingProduct.githubUrl || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, githubUrl: e.target.value })}
                          placeholder="https://github.com/your-username/repo"
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Ảnh Bìa / Mockup URL
                        </label>
                        <input
                          type="text"
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Năm Hoàn Thành & Vai Trò
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingProduct.completionYear}
                            onChange={(e) => setEditingProduct({ ...editingProduct, completionYear: e.target.value })}
                            placeholder="2026"
                            className="w-24 px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                          />
                          <input
                            type="text"
                            value={editingProduct.role}
                            onChange={(e) => setEditingProduct({ ...editingProduct, role: e.target.value })}
                            placeholder="Tác giả & Chủ trì phát triển"
                            className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                        Mô Tả Chi Tiết Sản Phẩm *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        placeholder="Mô tả bài toán, giải pháp và giá trị mang lại cho doanh nghiệp..."
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                        Tags Công Nghệ (Phân tách bằng dấu phẩy)
                      </label>
                      <input
                        type="text"
                        value={(editingProduct.tags || []).join(', ')}
                        onChange={(e) => setEditingProduct({ 
                          ...editingProduct, 
                          tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        })}
                        placeholder="React, AI Integration, Power BI, Excel, SAP Integration"
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    {/* Demo Account Config */}
                    <div className="p-4 rounded-2xl bg-[#08090D] border border-white/10 space-y-3">
                      <p className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider font-mono">
                        🔑 Tài Khoản Mẫu Trải Nghiệm Thử (Demo Account)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editingProduct.demoAccount?.username || ''}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct,
                            demoAccount: { ...(editingProduct.demoAccount || { username: '' }), username: e.target.value }
                          })}
                          placeholder="Tên đăng nhập / Email mẫu"
                          className="px-3 py-2 rounded-xl text-xs bg-[#11131A] border border-white/10 text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={editingProduct.demoAccount?.password || ''}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct,
                            demoAccount: { ...(editingProduct.demoAccount || { username: '' }), password: e.target.value }
                          })}
                          placeholder="Mật khẩu mẫu"
                          className="px-3 py-2 rounded-xl text-xs bg-[#11131A] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Publish & Featured Toggles */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={editingProduct.published !== false}
                          onChange={(e) => setEditingProduct({ ...editingProduct, published: e.target.checked })}
                          className="w-4 h-4 rounded text-[#7C3AED] focus:ring-0"
                        />
                        <span>Công khai hiển thị (Published)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={!!editingProduct.featured}
                          onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-[#7C3AED] focus:ring-0"
                        />
                        <span>Sản phẩm nổi bật (Featured)</span>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] shadow-md shadow-purple-500/20"
                      >
                        Lưu Sản Phẩm & Đồng Bộ Cloud
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Product List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Layers className="w-6 h-6 text-[#7C3AED]" />
                        <span>Danh Sách Web Apps & Sản Phẩm ({totalProducts})</span>
                      </h2>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Tất cả các thay đổi sẽ tự động đồng bộ lên Google Cloud Firestore.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingProduct({
                          id: `proj-${Date.now()}`,
                          title: '',
                          tagline: '',
                          description: '',
                          liveUrl: 'https://',
                          category: 'SaaS',
                          tags: ['React', 'AI Integration'],
                          featured: false,
                          published: true,
                          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=1000&q=80',
                          role: 'Tác giả & Chủ trì phát triển',
                          keyFeatures: [''],
                          completionYear: '2026'
                        });
                        setIsNewProduct(true);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white flex items-center gap-2 shadow-md shadow-purple-500/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm Web App Mới</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(formData.projects || []).map((project, index) => {
                      const isPublished = project.published !== false;
                      return (
                        <div
                          key={project.id}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isPublished
                              ? 'bg-[#11131A] border-white/10 hover:border-white/20'
                              : 'bg-[#141218] border-amber-500/30'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-16 h-12 object-cover rounded-xl border border-white/10 shrink-0 mt-0.5"
                            />
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-bold text-sm text-white">{project.title}</h4>
                                
                                {/* Status Badges */}
                                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                                  isPublished
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                }`}>
                                  {isPublished ? 'Công khai' : 'Bản nháp'}
                                </span>

                                {project.featured && (
                                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                                    Nổi bật
                                  </span>
                                )}

                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#94A3B8]">
                                  {project.category}
                                </span>
                              </div>

                              <p className="text-xs text-[#94A3B8] mt-1 line-clamp-1">{project.tagline}</p>
                              
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-[#60A5FA] font-mono hover:underline mt-1 inline-flex items-center gap-1"
                              >
                                <span>{project.liveUrl}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            {/* Reorder Up / Down */}
                            <button
                              onClick={() => handleMoveProduct(index, 'up')}
                              disabled={index === 0}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] disabled:opacity-30"
                              title="Di chuyển lên"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMoveProduct(index, 'down')}
                              disabled={index === (formData.projects?.length || 1) - 1}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] disabled:opacity-30"
                              title="Di chuyển xuống"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>

                            {/* Toggle Publish */}
                            <button
                              onClick={() => handleToggleProductPublish(project.id)}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold border ${
                                isPublished
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              }`}
                            >
                              {isPublished ? 'Ẩn nháp' : 'Công khai'}
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => {
                                setEditingProduct(project);
                                setIsNewProduct(false);
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"
                              title="Chỉnh sửa chi tiết"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteProduct(project.id)}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EXPERIENCE CMS */}
          {activeTab === 'experience' && (
            <div className="max-w-5xl space-y-6">
              {editingExperience ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#11131A] border border-white/10 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#38BDF8]" />
                        <span>{isNewExperience ? 'Thêm Mới Kinh Nghiệm' : `Chỉnh Sửa: ${editingExperience.company}`}</span>
                      </h3>
                    </div>
                    <button
                      onClick={() => setEditingExperience(null)}
                      className="text-xs text-[#94A3B8] hover:text-white px-3 py-1.5 rounded-lg border border-white/10"
                    >
                      Hủy & Quay lại
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveExperienceForm(editingExperience);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Tên Doanh Nghiệp / Chủ Đầu Tư *
                        </label>
                        <input
                          required
                          type="text"
                          value={editingExperience.company}
                          onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Chức Danh / Vị Trí *
                        </label>
                        <input
                          required
                          type="text"
                          value={editingExperience.role}
                          onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Thời Gian Công Tác (Period) *
                        </label>
                        <input
                          required
                          type="text"
                          value={editingExperience.period}
                          onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                          placeholder="08/2026 - Hiện tại"
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                          Địa Điểm Làm Việc & Hình Thức
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingExperience.location}
                            onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                            placeholder="Hà Nội, Việt Nam"
                            className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none"
                          />
                          <select
                            value={editingExperience.type}
                            onChange={(e) => setEditingExperience({ ...editingExperience, type: e.target.value as any })}
                            className="w-32 px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none"
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Remote">Remote</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                        Tóm Tắt Nhiệm Vụ Trọng Tâm *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={editingExperience.summary}
                        onChange={(e) => setEditingExperience({ ...editingExperience, summary: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                        Thành Tích & Kết Quả Đạt Được (Mỗi dòng một ý)
                      </label>
                      <textarea
                        rows={4}
                        value={(editingExperience.achievements || []).join('\n')}
                        onChange={(e) => setEditingExperience({
                          ...editingExperience,
                          achievements: e.target.value.split('\n').filter(Boolean)
                        })}
                        placeholder="Nhập từng thành tích trên 1 dòng..."
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingExperience(null)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"
                      >
                        Lưu Kinh Nghiệm
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-[#38BDF8]" />
                        <span>Kinh Nghiệm & Hành Trình Nghề Nghiệp ({totalExperiences})</span>
                      </h2>
                    </div>

                    <button
                      onClick={() => {
                        setEditingExperience({
                          id: `exp-${Date.now()}`,
                          company: '',
                          role: '',
                          period: '',
                          location: 'Hà Nội, Việt Nam',
                          type: 'Full-time',
                          summary: '',
                          achievements: [''],
                          technologies: ['Excel', 'AI & Tự Động Hóa']
                        });
                        setIsNewExperience(true);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm Kinh Nghiệm Mới</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(formData.experiences || []).map((exp, index) => (
                      <div
                        key={exp.id}
                        className="p-5 rounded-2xl bg-[#11131A] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white">{exp.company}</h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#A78BFA]">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-xs text-[#38BDF8] font-medium mt-0.5">{exp.role}</p>
                          <p className="text-xs text-[#94A3B8] mt-1 line-clamp-1">{exp.summary}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleMoveExperience(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] disabled:opacity-30"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveExperience(index, 'down')}
                            disabled={index === (formData.experiences?.length || 1) - 1}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] disabled:opacity-30"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingExperience(exp);
                              setIsNewExperience(false);
                            }}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GENERAL / HERO / BIO CMS */}
          {activeTab === 'general' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Globe className="w-6 h-6 text-[#F43F5E]" />
                  <span>Ảnh Đại Diện, Nội Dung Hero & Tiểu Sử</span>
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Tùy chỉnh ảnh đại diện Avatar, thông tin hiển thị trên phần đầu trang web và kênh liên hệ.
                </p>
              </div>

              {/* Avatar Import & Upload Component */}
              <AvatarUploader
                currentAvatarUrl={formData.avatarUrl}
                onAvatarChange={(newUrl) => setFormData({ ...formData, avatarUrl: newUrl })}
                darkMode={true}
                label="Ảnh Đại Diện (Avatar Profile)"
              />

              <div className="p-6 rounded-3xl bg-[#11131A] border border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                      Chức Danh Chuyên Môn *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                    Khẩu Hiệu / Headline Nổi Bật *
                  </label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                    Đoạn Giới Thiệu Chuyên Môn (Bio) *
                  </label>
                  <textarea
                    rows={6}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                      Email Liên Hệ
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                      Số Điện Thoại / Zalo
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1">
                      Địa Điểm
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#08090D] border border-white/10 text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <p className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider font-mono">
                    🌐 Liên Kết Mạng Xã Hội & Hồ Sơ Trực Tuyến
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={formData.socialLinks?.github || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, github: e.target.value }
                      })}
                      placeholder="GitHub URL"
                      className="px-4 py-2 rounded-xl text-xs bg-[#08090D] border border-white/10 text-white"
                    />
                    <input
                      type="text"
                      value={formData.socialLinks?.linkedin || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                      })}
                      placeholder="LinkedIn URL"
                      className="px-4 py-2 rounded-xl text-xs bg-[#08090D] border border-white/10 text-white"
                    />
                    <input
                      type="text"
                      value={formData.socialLinks?.telegram || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, telegram: e.target.value }
                      })}
                      placeholder="Telegram URL"
                      className="px-4 py-2 rounded-xl text-xs bg-[#08090D] border border-white/10 text-white"
                    />
                    <input
                      type="text"
                      value={formData.socialLinks?.website || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, website: e.target.value }
                      })}
                      placeholder="Website cá nhân"
                      className="px-4 py-2 rounded-xl text-xs bg-[#08090D] border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleSaveToCloud()}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"
                  >
                    {isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi Thông Tin'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SKILLS CMS */}
          {activeTab === 'skills' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#F59E0B]" />
                  <span>Kỹ Năng Chuyên Môn & Công Nghệ AI</span>
                </h2>
              </div>

              <div className="space-y-4">
                {(formData.skillCategories || []).map((cat, catIdx) => (
                  <div key={catIdx} className="p-6 rounded-3xl bg-[#11131A] border border-white/10 space-y-4">
                    <input
                      type="text"
                      value={cat.categoryName}
                      onChange={(e) => {
                        const newCats = [...formData.skillCategories];
                        newCats[catIdx].categoryName = e.target.value;
                        setFormData({ ...formData, skillCategories: newCats });
                      }}
                      className="text-base font-bold bg-transparent text-[#A78BFA] border-b border-white/10 pb-1 w-full focus:outline-none"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-[#08090D] border border-white/10 flex items-center justify-between gap-3">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const newCats = [...formData.skillCategories];
                              newCats[catIdx].skills[sIdx].name = e.target.value;
                              setFormData({ ...formData, skillCategories: newCats });
                            }}
                            className="text-xs bg-transparent text-white font-medium flex-1 focus:outline-none"
                          />
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={skill.level}
                              onChange={(e) => {
                                const newCats = [...formData.skillCategories];
                                newCats[catIdx].skills[sIdx].level = parseInt(e.target.value) || 0;
                                setFormData({ ...formData, skillCategories: newCats });
                              }}
                              className="w-12 px-1.5 py-0.5 rounded text-xs bg-[#11131A] border border-white/10 text-[#60A5FA] font-mono text-center"
                            />
                            <span className="text-[10px] text-[#94A3B8] font-mono">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSaveToCloud()}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"
                  >
                    {isSaving ? 'Đang lưu...' : 'Lưu Danh Mục Kỹ Năng'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CREDENTIALS CMS */}
          {activeTab === 'credentials' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-[#10B981]" />
                  <span>Học Vấn & Bằng Cấp</span>
                </h2>
              </div>

              <div className="p-6 rounded-3xl bg-[#11131A] border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-[#A78BFA] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Trường Đại Học & Bằng Cấp</span>
                </h3>
                {(formData.educations || []).map((edu, idx) => (
                  <div key={edu.id || idx} className="p-4 rounded-2xl bg-[#08090D] border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const newEdus = [...formData.educations];
                        newEdus[idx].school = e.target.value;
                        setFormData({ ...formData, educations: newEdus });
                      }}
                      className="w-full text-xs font-bold text-white bg-transparent border-b border-white/10 pb-1"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdus = [...formData.educations];
                        newEdus[idx].degree = e.target.value;
                        setFormData({ ...formData, educations: newEdus });
                      }}
                      className="w-full text-xs text-[#38BDF8] bg-transparent"
                    />
                    <textarea
                      rows={2}
                      value={edu.description || ''}
                      onChange={(e) => {
                        const newEdus = [...formData.educations];
                        newEdus[idx].description = e.target.value;
                        setFormData({ ...formData, educations: newEdus });
                      }}
                      className="w-full text-xs text-[#94A3B8] bg-transparent focus:outline-none"
                    />
                  </div>
                ))}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSaveToCloud()}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"
                  >
                    {isSaving ? 'Đang lưu...' : 'Lưu Dữ Liệu Bằng Cấp'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Settings className="w-6 h-6 text-[#94A3B8]" />
                  <span>Cài Đặt Hệ Thống & Sao Lưu Dữ Liệu</span>
                </h2>
              </div>

              <div className="p-6 rounded-3xl bg-[#11131A] border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white">Xuất & Nhập File JSON Dự Phòng</h3>
                <p className="text-xs text-[#94A3B8]">
                  Tải file backup JSON về máy tính cá nhân hoặc khôi phục dữ liệu từ file backup trước đó.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `hoang_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  >
                    📥 Tải File Backup JSON
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn đặt lại dữ liệu mẫu ban đầu? Thao tác này sẽ ghi đè lên Google Cloud Firestore.')) {
                        setFormData(DEFAULT_PROFILE);
                        handleSaveToCloud(DEFAULT_PROFILE);
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  >
                    ⚠️ Đặt Lại Dữ Liệu Mẫu
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Export / Print CV Modal */}
      <ExportCVModal
        profile={formData}
        isOpen={isExportCVOpen}
        onClose={() => setIsExportCVOpen(false)}
        darkMode={darkMode}
      />

    </div>
  );
};
