import React from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Cpu, 
  Sparkles, 
  CheckCircle2,
  Wrench,
  Layers
} from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
  darkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories, darkMode }) => {
  const getCategoryIcon = (name: string = '') => {
    const safeName = (name || '').toLowerCase();
    if (safeName.includes('kinh tế') || safeName.includes('dự toán') || safeName.includes('chi phí')) return Layers;
    if (safeName.includes('ai') || safeName.includes('tự động') || safeName.includes('công nghệ')) return Cpu;
    if (safeName.includes('frontend') || safeName.includes('web')) return Code2;
    if (safeName.includes('backend') || safeName.includes('server')) return Server;
    if (safeName.includes('database') || safeName.includes('cloud') || safeName.includes('dữ liệu')) return Database;
    return Wrench;
  };

  return (
    <section 
      id="skills" 
      className={`py-20 md:py-28 relative border-t transition-colors ${
        darkMode ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 shadow-sm ${
            darkMode 
              ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40' 
              : 'bg-purple-50 text-[#7C3AED] border-purple-200'
          }`}>
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span className="uppercase tracking-[0.2em]">Năng Lực Chuyên Môn & Công Nghệ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Kỹ Năng & <span className="text-gradient-tech">Công Cụ Làm Việc</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed font-normal ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Sự kết hợp giữa chuyên môn Kinh tế Xây dựng thực chiến (G8/F1, SAP, Quản lý Hợp đồng) và năng lực tự động hóa bằng AI (GPT, Gemini, Power BI, Web Apps).
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(categories || []).map((cat, catIdx) => {
            const catName = cat.categoryName || (cat as any).name || `Danh mục ${catIdx + 1}`;
            const Icon = getCategoryIcon(catName);
            return (
              <div
                key={catName + catIdx}
                className={`p-6 rounded-3xl border transition-all hover:shadow-xl ${
                  darkMode 
                    ? 'bg-[#11131A] border-white/10 hover:border-[#7C3AED]/40' 
                    : 'bg-white border-[#E2E8F0] hover:border-[#2563EB] shadow-sm'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] border border-[#7C3AED]/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-base ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>{catName}</h3>
                    <span className="text-[11px] font-mono text-[#94A3B8] block">
                      {cat.skills?.length || 0} Kỹ năng cốt lõi
                    </span>
                  </div>
                </div>

                {/* Skill List */}
                <div className="space-y-4">
                  {(cat.skills || []).map((skill, sIdx) => (
                    <div key={skill.name || sIdx}>
                      <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                        <span className={`font-semibold ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>{skill.name}</span>
                        <span className="text-[#A78BFA] font-bold">{skill.level}%</span>
                      </div>

                      {/* Progress Bar with Tech Purple-to-Blue Gradient */}
                      <div className={`h-2 w-full rounded-full overflow-hidden ${
                        darkMode ? 'bg-[#08090D]' : 'bg-slate-100'
                      }`}>
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
