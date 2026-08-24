import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  Layers, 
  Search, 
  Sparkles, 
  Github, 
  KeyRound, 
  Info, 
  Copy, 
  Check, 
  Flame
} from 'lucide-react';
import { ProjectApp } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectShowcaseProps {
  projects: ProjectApp[];
  darkMode: boolean;
  onOpenEditor: () => void;
  isAdmin?: boolean;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  darkMode,
  onOpenEditor,
  isAdmin = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectApp | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'SaaS', 'E-commerce', 'AI & Tech', 'Fullstack', 'Tools'];

  const filteredProjects = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    return (projects || []).filter((proj) => {
      // If not admin, only show published projects
      if (!isAdmin && proj.published === false) return false;

      const matchCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      const titleMatch = (proj.title || '').toLowerCase().includes(q);
      const descMatch = (proj.description || '').toLowerCase().includes(q);
      const taglineMatch = (proj.tagline || '').toLowerCase().includes(q);
      const tagsMatch = Array.isArray(proj.tags) && proj.tags.some(t => (t || '').toLowerCase().includes(q));
      return titleMatch || descMatch || taglineMatch || tagsMatch;
    });
  }, [projects, selectedCategory, searchQuery, isAdmin]);

  const handleCopyUrl = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section 
      id="projects" 
      className={`py-20 md:py-28 relative border-t transition-colors ${
        darkMode 
          ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]' 
          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Recruiter Focus Badge */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 shadow-sm ${
            darkMode 
              ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40' 
              : 'bg-purple-50 text-[#7C3AED] border-purple-200'
          }`}>
            <Flame className="w-4 h-4 text-[#A78BFA]" />
            <span className="uppercase tracking-[0.2em]">Sản Phẩm Tiêu Biểu (Live Products)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Dự Án Web App <span className="text-gradient-tech">Thực Tế</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${
            darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
          }`}>
            Nhấn trực tiếp vào thẻ dự án hoặc nút 
            <span className={`inline-block mx-1.5 px-2.5 py-0.5 rounded-full font-mono text-xs border ${
              darkMode ? 'bg-[#7C3AED]/20 text-[#A78BFA] border-[#7C3AED]/40' : 'bg-blue-50 text-[#2563EB] border-blue-200'
            }`}>
              🚀 Mở Web App Trực Tiếp
            </span> 
            để trải nghiệm sản phẩm trực tiếp trên môi trường Live Production.
          </p>

          {/* Quick Notice Banner for Recruiters */}
          <div className={`w-full p-4 rounded-2xl border text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-left ${
            darkMode 
              ? 'bg-[#11131A] border-white/10 text-[#94A3B8]' 
              : 'bg-white border-[#E2E8F0] text-[#475569] shadow-sm'
          }`}>
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <span>
                <strong className={darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}>Kiểm tra UX & Mã Nguồn:</strong> Mỗi sản phẩm đều được tối ưu hiệu năng cao, responsive trên mọi thiết bị và có sẵn tài khoản mẫu (Demo Account).
              </span>
            </div>
            <button
              onClick={onOpenEditor}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all ${
                darkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-[#A78BFA] border-white/10 hover:border-[#7C3AED]/50' 
                  : 'bg-slate-100 hover:bg-slate-200 text-[#0F172A] border-[#E2E8F0] shadow-sm'
              }`}
            >
              + Quản Lý Danh Sách App
            </button>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-lg shadow-purple-500/20 scale-[1.02]'
                      : darkMode
                        ? 'bg-[#11131A] hover:bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC] border border-white/10'
                        : 'bg-white hover:bg-slate-100 text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
                  }`}
                >
                  {cat === 'All' ? 'Tất Cả Dự Án' : cat}
                </button>
              );
            })}
          </div>

          {/* Search by tech stack or keyword */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-projects-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo từ khóa (React, AI, SAP, ERP...)"
              className={`w-full pl-10 pr-4 py-2 rounded-full text-xs sm:text-sm border focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-[#11131A] border-white/10 text-[#F8FAFC] placeholder-[#94A3B8]/60 focus:border-[#7C3AED]' 
                  : 'bg-white border-[#E2E8F0] text-[#0F172A] placeholder-[#64748B]/60 focus:border-[#2563EB]'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className={`text-center py-16 px-4 rounded-3xl border ${
            darkMode ? 'bg-[#11131A] border-white/10 text-[#94A3B8]' : 'bg-white border-[#E2E8F0] text-[#64748B]'
          }`}>
            <Layers className="w-12 h-12 text-[#7C3AED]/40 mx-auto mb-3" />
            <p className="text-base font-medium">Không tìm thấy dự án phù hợp với từ khóa</p>
            <p className="text-xs text-[#94A3B8]/70 mt-1">Thử chọn danh mục khác hoặc xóa bộ lọc tìm kiếm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`group relative rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl ${
                  darkMode 
                    ? 'bg-[#11131A] border-white/10 hover:border-[#7C3AED]/50 hover:shadow-black/90' 
                    : 'bg-white border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-blue-500/10'
                }`}
              >
                {/* Simulated Browser Bar with Live Indicator */}
                <div className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-mono select-none ${
                  darkMode ? 'bg-[#08090D] border-white/10 text-[#94A3B8]' : 'bg-slate-50 border-[#E2E8F0] text-[#64748B]'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70 inline-block" />
                    <span className="ml-2 text-[11px] font-sans font-medium truncate max-w-[150px] sm:max-w-[200px]">
                      {project.title.split('-')[0]}
                    </span>
                  </div>

                  {/* Live Web App Badge & Copy Link */}
                  <div className="flex items-center gap-2">
                    {project.published === false && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Bản nháp
                      </span>
                    )}

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      darkMode ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40' : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                      Live App
                    </span>

                    <button
                      onClick={(e) => handleCopyUrl(e, project.liveUrl, project.id)}
                      title="Sao chép link Web App"
                      className={`p-1 rounded hover:bg-white/10 transition-colors ${
                        copiedId === project.id ? 'text-[#7C3AED]' : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {copiedId === project.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Project Image & Live Action Overlay */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-[#08090D]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-[#08090D]/80 backdrop-blur-md text-[#A78BFA] border border-white/10 shadow">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Nổi Bật
                      </span>
                    )}
                  </div>

                  {/* Big Clickable Overlay to Open App Directly */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-[2px] gap-3 p-4">
                    {/* Primary direct link button */}
                    <a
                      id={`btn-launch-live-${project.id}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-xl shadow-purple-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Mở Web App Ngay 🚀</span>
                    </a>

                    {/* Quick view button */}
                    <button
                      onClick={() => setActiveProject(project)}
                      className="px-4 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 transition-all"
                    >
                      <Info className="w-3.5 h-3.5 text-[#A78BFA]" />
                      <span>Chi Tiết</span>
                    </button>
                  </div>

                  {/* Tagline at bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs text-white/90 font-mono italic line-clamp-1 drop-shadow">
                      "{project.tagline}"
                    </p>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`text-xl font-bold tracking-tight group-hover:text-[#A78BFA] transition-colors leading-tight ${
                        darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
                      }`}>
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-[#94A3B8] shrink-0">
                        {project.completionYear}
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-normal ${
                      darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>
                      {project.description}
                    </p>

                    {/* Demo Account Indicator for NTD (if any) */}
                    {project.demoAccount && (
                      <div className={`p-2.5 rounded-xl border text-xs mb-4 flex items-center justify-between ${
                        darkMode 
                          ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]/90' 
                          : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                      }`}>
                        <div className="flex items-center gap-1.5 truncate">
                          <KeyRound className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                          <span className="truncate">
                            Demo: <strong className="text-[#A78BFA] font-mono">{project.demoAccount.username}</strong>
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveProject(project)}
                          className="text-[11px] uppercase tracking-wider font-semibold text-[#2563EB] hover:text-[#7C3AED] underline shrink-0 ml-2"
                        >
                          Xem Pass
                        </button>
                      </div>
                    )}

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono border ${
                            darkMode 
                              ? 'bg-[#08090D] border-white/10 text-[#94A3B8]' 
                              : 'bg-slate-100 border-[#E2E8F0] text-[#475569]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons at Bottom of Card */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    
                    {/* Primary Highlight Action: Click to Open App */}
                    <a
                      id={`card-launch-btn-${project.id}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Mở Web App Trực Tiếp</span>
                    </a>

                    {/* Detail Modal Button */}
                    <button
                      id={`btn-detail-${project.id}`}
                      onClick={() => setActiveProject(project)}
                      title="Xem chi tiết tính năng & tài khoản test"
                      className={`px-3.5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all ${
                        darkMode 
                          ? 'bg-white/5 hover:bg-white/10 text-[#F8FAFC] border-white/10 hover:border-[#7C3AED]' 
                          : 'bg-slate-100 hover:bg-slate-200 text-[#0F172A] border-[#E2E8F0]'
                      }`}
                    >
                      Chi Tiết
                    </button>

                    {/* GitHub repo if available */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-full border transition-all ${
                          darkMode 
                            ? 'bg-white/5 hover:bg-[#7C3AED]/20 text-[#94A3B8] border-white/10 hover:text-white hover:border-[#7C3AED]' 
                            : 'bg-slate-100 hover:bg-purple-50 text-[#64748B] hover:text-[#7C3AED] border-[#E2E8F0]'
                        }`}
                        title="Xem mã nguồn trên GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
        darkMode={darkMode}
      />
    </section>
  );
};
