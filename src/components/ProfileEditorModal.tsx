import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Download, 
  Upload, 
  Layers, 
  User, 
  Briefcase, 
  Sparkles,
  ExternalLink,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { UserProfile, ProjectApp, WorkExperience } from '../types';
import { AvatarUploader } from './AvatarUploader';

interface ProfileEditorModalProps {
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
  onReset: () => void;
  onClose: () => void;
  darkMode: boolean;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  profile,
  onSave,
  onReset,
  onClose,
  darkMode
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience'>('projects');
  const [formData, setFormData] = useState<UserProfile>(JSON.parse(JSON.stringify(profile)));
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New project template
  const handleAddProject = () => {
    const newProj: ProjectApp = {
      id: `proj-${Date.now()}`,
      title: 'Ứng Dụng Mới Của Tôi',
      tagline: 'Mô tả ngắn gọn về giải pháp sản phẩm',
      description: 'Mô tả chi tiết các tính năng, công nghệ và giá trị mang lại cho người dùng.',
      liveUrl: 'https://',
      githubUrl: 'https://github.com/',
      category: 'AI & Tech',
      tags: ['React', 'TypeScript', 'TailwindCSS', 'AI API'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      role: 'Kỹ sư Trưởng / Fullstack Developer',
      keyFeatures: ['Tính năng 1: Giao diện trực quan', 'Tính năng 2: Xử lý dữ liệu thời gian thực'],
      demoAccount: {
        username: 'admin@demo.com',
        password: 'password123',
        note: 'Tài khoản trải nghiệm mẫu'
      },
      completionYear: '2025'
    };
    setFormData({
      ...formData,
      projects: [newProj, ...formData.projects]
    });
  };

  const handleUpdateProject = (index: number, updated: Partial<ProjectApp>) => {
    const updatedList = [...formData.projects];
    updatedList[index] = { ...updatedList[index], ...updated };
    setFormData({ ...formData, projects: updatedList });
  };

  const handleDeleteProject = (index: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này khỏi danh sách?')) {
      const updatedList = formData.projects.filter((_, i) => i !== index);
      setFormData({ ...formData, projects: updatedList });
    }
  };

  const handleSave = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio-data-${formData.fullName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.fullName && parsed.projects) {
          setFormData(parsed);
          alert('Đã nạp dữ liệu hồ sơ thành công!');
        } else {
          alert('Định dạng file JSON không hợp lệ.');
        }
      } catch (err) {
        alert('Lỗi đọc file JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      id="profile-editor-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          darkMode ? 'bg-[#11131A] border-white/10 text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className={`p-4 sm:p-6 border-b flex flex-wrap items-center justify-between gap-3 ${
          darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
        }`}>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#A78BFA]" />
              <span>Quản Trị Dữ Liệu Hồ Sơ & Dự Án Web App</span>
            </h2>
            <p className={`text-xs font-normal mt-0.5 ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Tùy chỉnh thông tin cá nhân và cập nhật link Web App. Dữ liệu được đồng bộ và lưu trữ tự động trên Google Cloud Firestore.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              title="Xuất file JSON sao lưu"
              className={`p-2 px-3 rounded-full text-xs font-mono border flex items-center gap-1.5 ${
                darkMode ? 'bg-white/5 border-white/10 text-[#94A3B8] hover:text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span className="hidden sm:inline">Xuất JSON</span>
            </button>

            <label
              title="Nạp file JSON đã lưu"
              className={`p-2 px-3 rounded-full text-xs font-mono border flex items-center gap-1.5 cursor-pointer ${
                darkMode ? 'bg-white/5 border-white/10 text-[#94A3B8] hover:text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span className="hidden sm:inline">Nhập JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>

            <button
              onClick={onClose}
              className={`p-2 rounded-full border ${
                darkMode ? 'bg-white/5 text-[#94A3B8] hover:text-white border-white/10' : 'bg-slate-200 text-slate-700 hover:text-slate-900 border-[#E2E8F0]'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className={`px-6 py-2.5 border-b flex gap-2 ${
          darkMode ? 'bg-[#08090D] border-white/10' : 'bg-white border-[#E2E8F0]'
        }`}>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20'
                : darkMode ? 'text-[#94A3B8] hover:text-white' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Quản Lý Web Apps ({formData.projects.length}) ⭐</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20'
                : darkMode ? 'text-[#94A3B8] hover:text-white' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Thông Tin Cá Nhân & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20'
                : darkMode ? 'text-[#94A3B8] hover:text-white' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Kinh Nghiệm Làm Việc</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: PROJECTS & WEB APPS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#A78BFA]">Danh Sách Các Web App Đã Làm</h3>
                  <p className={`text-xs ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Điền chính xác đường dẫn (Live URL) để khi người xem bấm vào sẽ mở trực tiếp web app của bạn.
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-purple-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Thêm Web App Mới</span>
                </button>
              </div>

              <div className="space-y-6">
                {(formData.projects || []).map((proj, idx) => (
                  <div 
                    key={proj.id}
                    className={`p-5 rounded-3xl border ${
                      darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2 font-bold text-sm text-[#A78BFA]">
                        <span className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <span>{proj.title || 'Dự án chưa đặt tên'}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(idx)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Xóa</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Tên Web App *</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProject(idx, { title: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border ${
                            darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#7C3AED]">
                          🚀 Link Web App Trực Tiếp (Live URL) *
                        </label>
                        <input
                          type="url"
                          value={proj.liveUrl}
                          onChange={(e) => handleUpdateProject(idx, { liveUrl: e.target.value })}
                          placeholder="https://my-app.vercel.app"
                          className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-[#7C3AED]/50 ${
                            darkMode ? 'bg-[#11131A] text-[#A78BFA]' : 'bg-white text-[#2563EB]'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Khẩu hiệu ngắn (Tagline)</label>
                        <input
                          type="text"
                          value={proj.tagline}
                          onChange={(e) => handleUpdateProject(idx, { tagline: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border ${
                            darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Danh mục</label>
                        <select
                          value={proj.category}
                          onChange={(e) => handleUpdateProject(idx, { category: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border ${
                            darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                          }`}
                        >
                          <option value="SaaS">SaaS</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="AI & Tech">AI & Tech</option>
                          <option value="Fullstack">Fullstack</option>
                          <option value="Tools">Tools</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Mô tả chi tiết</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(idx, { description: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border ${
                          darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                        }`}
                      />
                    </div>

                    {/* Recruiter Test Account Config */}
                    <div className="mt-4 p-3 rounded-2xl border border-white/10 bg-white/[0.02]">
                      <span className="text-xs font-bold text-[#7C3AED] block mb-2">
                        Tài Khoản Mẫu Cho Nhà Tuyển Dụng Thử Nghiệm:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase font-mono text-[#94A3B8] mb-0.5">Tài khoản / Email test</label>
                          <input
                            type="text"
                            value={proj.demoAccount?.username || ''}
                            onChange={(e) => handleUpdateProject(idx, {
                              demoAccount: {
                                username: e.target.value,
                                password: proj.demoAccount?.password || '',
                                note: proj.demoAccount?.note || ''
                              }
                            })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs border ${
                              darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-mono text-[#94A3B8] mb-0.5">Mật khẩu test</label>
                          <input
                            type="text"
                            value={proj.demoAccount?.password || ''}
                            onChange={(e) => handleUpdateProject(idx, {
                              demoAccount: {
                                username: proj.demoAccount?.username || '',
                                password: e.target.value,
                                note: proj.demoAccount?.note || ''
                              }
                            })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs border ${
                              darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE INFO */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#A78BFA]">Thông Tin Cá Nhân & Liên Hệ</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Họ và Tên</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      darkMode ? 'bg-[#08090D] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Chức Danh / Vị Trí</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      darkMode ? 'bg-[#08090D] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Giới Thiệu Ngắn (Bio)</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border ${
                    darkMode ? 'bg-[#08090D] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      darkMode ? 'bg-[#08090D] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Số Điện Thoại</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      darkMode ? 'bg-[#08090D] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Địa Điểm / Thành Phố</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      darkMode ? 'bg-[#08090D] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                    }`}
                  />
                </div>
              </div>

              {/* Avatar Uploader */}
              <AvatarUploader
                currentAvatarUrl={formData.avatarUrl}
                onAvatarChange={(newUrl) => setFormData({ ...formData, avatarUrl: newUrl })}
                darkMode={darkMode}
                label="Ảnh Đại Diện (Import / Upload)"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Số năm kinh nghiệm</label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      darkMode ? 'bg-[#08090D] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORK EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#A78BFA]">Kinh Nghiệm Làm Việc</h3>
              {(formData.experiences || []).map((exp, idx) => (
                <div 
                  key={exp.id}
                  className={`p-4 rounded-2xl border space-y-3 ${
                    darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Công ty / Chủ đầu tư</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...formData.experiences];
                          updated[idx].company = e.target.value;
                          setFormData({ ...formData, experiences: updated });
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-xs border ${
                          darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Vị trí / Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...formData.experiences];
                          updated[idx].role = e.target.value;
                          setFormData({ ...formData, experiences: updated });
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-xs border ${
                          darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Thời gian làm việc</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[idx].period = e.target.value;
                        setFormData({ ...formData, experiences: updated });
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs border ${
                        darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#94A3B8]">Tóm tắt công việc</label>
                    <textarea
                      rows={2}
                      value={exp.summary}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[idx].summary = e.target.value;
                        setFormData({ ...formData, experiences: updated });
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs border ${
                        darkMode ? 'bg-[#11131A] border-white/10 text-white' : 'bg-white border-[#E2E8F0]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Buttons */}
        <div className={`p-4 sm:p-6 border-t flex flex-wrap items-center justify-between gap-3 ${
          darkMode ? 'bg-[#08090D] border-white/10' : 'bg-slate-50 border-[#E2E8F0]'
        }`}>
          <button
            onClick={() => {
              if (window.confirm('Khôi phục lại dữ liệu mẫu ban đầu?')) {
                onReset();
                onClose();
              }
            }}
            className="px-4 py-2 rounded-full text-xs font-mono text-rose-400 hover:bg-rose-500/10 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi Phục Dữ Liệu Gốc</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold border ${
                darkMode ? 'bg-white/5 hover:bg-white/10 text-[#94A3B8] border-white/10 hover:text-white' : 'bg-white hover:bg-slate-100 text-[#0F172A] border-[#E2E8F0]'
              }`}
            >
              Hủy
            </button>

            <button
              id="btn-save-profile-editor"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-lg shadow-purple-500/25 flex items-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Đã Lưu Xong!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu Thay Đổi Ngay</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
