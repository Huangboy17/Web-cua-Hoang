import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import { WorkExperience, EducationItem, CertificationItem } from '../types';

interface ExperienceSectionProps {
  experiences: WorkExperience[];
  educations: EducationItem[];
  certifications?: CertificationItem[];
  darkMode: boolean;
  isAdmin?: boolean;
  onOpenExportCV?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  educations,
  certifications,
  darkMode,
  isAdmin = false,
  onOpenExportCV
}) => {
  const [activeTab, setActiveTab] = useState<'work' | 'education' | 'certifications'>('work');

  const visibleExperiences = experiences.filter(exp => isAdmin || exp.published !== false);

  return (
    <section 
      id="experience" 
      className={`py-20 md:py-28 relative border-t transition-colors ${
        darkMode ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 shadow-sm ${
            darkMode 
              ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40' 
              : 'bg-purple-50 text-[#7C3AED] border-purple-200'
          }`}>
            <Briefcase className="w-4 h-4 text-[#A78BFA]" />
            <span className="uppercase tracking-[0.2em]">Hành Trình Nghề Nghiệp</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Kinh Nghiệm & <span className="text-gradient-tech">Năng Lực Thực Chiến</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed font-normal ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            6 năm cống hiến tại các Chủ đầu tư & Tổng công ty lớn trong quản lý chi phí, ngân sách, TMĐT và tiên phong ứng dụng AI tự động hóa.
          </p>

          {/* Tab Switcher */}
          <div className={`flex flex-wrap justify-center items-center gap-2 mt-8 p-1.5 rounded-full border ${
            darkMode ? 'bg-[#11131A] border-white/10' : 'bg-slate-100 border-[#E2E8F0]'
          }`}>
            <button
              onClick={() => setActiveTab('work')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'work'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20'
                  : darkMode
                    ? 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Chủ Đầu Tư & Doanh Nghiệp ({experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20'
                  : darkMode
                    ? 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Học Vấn & Bằng Cấp</span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'certifications'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-500/20'
                  : darkMode
                    ? 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Chứng Chỉ Hành Nghề</span>
            </button>
          </div>

          {/* Quick CV Export Action for Recruiters */}
          {onOpenExportCV && (
            <div className="mt-4">
              <button
                onClick={onOpenExportCV}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  darkMode 
                    ? 'bg-white/5 hover:bg-white/10 text-[#A78BFA] hover:text-white border-white/10 hover:border-[#7C3AED]/50' 
                    : 'bg-white hover:bg-slate-100 text-[#7C3AED] border-slate-200 shadow-sm'
                }`}
                title="Xuất bản in / PDF toàn bộ kinh nghiệm và học vấn"
              >
                <FileText className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>Xuất Hồ Sơ CV Đầy Đủ (PDF)</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Work Experience Timeline */}
        {activeTab === 'work' && (
          <div className="relative max-w-4xl mx-auto">
            {/* Center Timeline Line for desktop */}
            <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#7C3AED] via-[#2563EB] to-transparent -translate-x-1/2 hidden sm:block" />

            <div className="space-y-10">
              {visibleExperiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={exp.id} 
                    className={`relative flex flex-col sm:flex-row items-center ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline Node Point */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white items-center justify-center border-4 border-[#08090D] shadow-md z-10 font-bold text-xs">
                      {idx + 1}
                    </div>

                    {/* Content Card */}
                    <div className={`w-full sm:w-[calc(50%-2rem)] ${
                      isEven ? 'sm:text-left' : 'sm:text-left'
                    }`}>
                      <div className={`p-6 sm:p-7 rounded-3xl border transition-all hover:shadow-2xl ${
                        darkMode 
                          ? 'bg-[#11131A] border-white/10 hover:border-[#7C3AED]/50 hover:shadow-black/90' 
                          : 'bg-white border-[#E2E8F0] hover:border-[#2563EB] shadow-sm'
                      }`}>
                        {/* Company & Role Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            {exp.published === false && (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 mr-2 mb-2">
                                Bản nháp
                              </span>
                            )}
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-2 ${
                              darkMode ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/30' : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                            }`}>
                              {exp.type}
                            </span>
                            <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2563EB] mt-0.5">
                              <Building2 className="w-3.5 h-3.5" />
                              <span>{exp.company}</span>
                            </div>
                          </div>

                          <div className={`text-xs px-3 py-1 rounded-full border font-mono ${
                            darkMode ? 'bg-[#08090D] border-white/10 text-[#94A3B8]' : 'bg-slate-100 border-[#E2E8F0] text-[#64748B]'
                          }`}>
                            <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#7C3AED]" />
                            {exp.period}
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-4 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{exp.location}</span>
                        </div>

                        {/* Summary */}
                        {exp.summary && (
                          <p className={`text-xs sm:text-sm leading-relaxed mb-4 font-normal ${
                            darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                          }`}>
                            {exp.summary}
                          </p>
                        )}

                        {/* Key Achievements / Trách nhiệm chính */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mb-4 space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA] font-mono">
                              Nhiệm vụ & Trọng trách chính:
                            </h4>
                            <ul className="space-y-1.5">
                              {exp.achievements.map((ach, aIdx) => (
                                <li key={aIdx} className={`text-xs flex items-start gap-2 font-normal leading-relaxed ${
                                  darkMode ? 'text-[#F8FAFC]/80' : 'text-[#334155]'
                                }`}>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech & Tool tags */}
                        <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                          {(exp.technologies || []).map((t) => (
                            <span 
                              key={t}
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                                darkMode ? 'bg-[#08090D] border-white/10 text-[#94A3B8]' : 'bg-slate-100 border-[#E2E8F0] text-[#475569]'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Education */}
        {activeTab === 'education' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {educations.map((edu) => (
              <div 
                key={edu.id}
                className={`p-6 sm:p-8 rounded-3xl border ${
                  darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-[#E2E8F0] shadow-sm'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>{edu.school}</h3>
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#2563EB]">{edu.degree}</p>
                    </div>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full border font-mono ${
                    darkMode ? 'bg-[#08090D] border-white/10 text-[#94A3B8]' : 'bg-slate-100 border-[#E2E8F0] text-[#64748B]'
                  }`}>
                    {edu.period}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#A78BFA] mb-1">
                    Chuyên ngành: {edu.major}
                  </p>
                  {edu.description && (
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Certifications */}
        {activeTab === 'certifications' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>Chứng Chỉ Hành Nghề Chuyên Môn</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(certifications || []).map((cert) => (
                  <div 
                    key={cert.id}
                    className={`p-6 rounded-3xl border transition-all hover:border-[#7C3AED]/50 ${
                      darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-[#E2E8F0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className={`font-semibold text-base ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>{cert.name}</h4>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono border shrink-0 ${
                        darkMode ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/30' : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                      }`}>
                        {cert.issueDate}
                      </span>
                    </div>
                    <p className={`text-xs mb-3 ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Đơn vị cấp: <strong className={darkMode ? 'text-white' : 'text-[#0F172A]'}>{cert.issuer}</strong></p>
                    {cert.credentialId && (
                      <p className="text-[11px] font-mono text-[#94A3B8]">Mã hiệu / ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
