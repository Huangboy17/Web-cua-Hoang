import React from 'react';
import { 
  Calculator, 
  TrendingUp, 
  FileCheck2, 
  Scale, 
  Database, 
  Table2, 
  CalendarRange, 
  Sparkles, 
  Code2, 
  BarChart3, 
  FileSpreadsheet, 
  Workflow, 
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface SkillRowProps {
  name: string;
  level: number;
  experience?: string;
  darkMode: boolean;
}

export const SkillRow: React.FC<SkillRowProps> = ({ name, level, experience, darkMode }) => {
  const getSkillIcon = (skillName: string) => {
    const s = skillName.toLowerCase();
    if (s.includes('g8') || s.includes('f1') || s.includes('dự toán') || s.includes('bóc tách')) return Calculator;
    if (s.includes('tổng mức') || s.includes('tmđt') || s.includes('dòng tiền') || s.includes('tài chính')) return TrendingUp;
    if (s.includes('hợp đồng') || s.includes('thanh quyết toán')) return FileCheck2;
    if (s.includes('định mức') || s.includes('đấu thầu')) return Scale;
    if (s.includes('sap') || s.includes('erp')) return Database;
    if (s.includes('excel') || s.includes('power query') || s.includes('office')) return Table2;
    if (s.includes('project') || s.includes('tiến độ') || s.includes('kế hoạch')) return CalendarRange;
    if (s.includes('ai') || s.includes('gpt') || s.includes('gemini') || s.includes('antigravity')) return Sparkles;
    if (s.includes('web app') || s.includes('react') || s.includes('frontend')) return Code2;
    if (s.includes('power bi') || s.includes('trực quan') || s.includes('chart')) return BarChart3;
    if (s.includes('trích xuất') || s.includes('hồ sơ') || s.includes('ocr')) return FileSpreadsheet;
    if (s.includes('chuẩn hóa') || s.includes('quy trình') || s.includes('số hóa')) return Workflow;
    return Cpu;
  };

  const IconComponent = getSkillIcon(name);

  // Level classification
  const getLevelTier = (score: number) => {
    if (score >= 90) return { label: 'EXPERT', dots: 4, colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20' };
    if (score >= 80) return { label: 'ADVANCED', dots: 3, colorClass: 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20' };
    if (score >= 60) return { label: 'INTERMEDIATE', dots: 2, colorClass: 'text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-400 dark:bg-sky-500/10 dark:border-sky-500/20' };
    return { label: 'PROFICIENT', dots: 1, colorClass: 'text-slate-700 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-white/5 dark:border-white/10' };
  };

  const tier = getLevelTier(level);

  return (
    <div 
      className={`group px-3 py-3 rounded-xl transition-all duration-150 border border-transparent flex items-center justify-between gap-3 ${
        darkMode 
          ? 'hover:bg-white/[0.04] hover:border-white/10' 
          : 'hover:bg-slate-50/90 hover:border-slate-200/80'
      }`}
    >
      {/* Left: Icon + Skill Name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
          darkMode 
            ? 'bg-white/5 border-white/10 text-slate-300 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30' 
            : 'bg-slate-100 border-slate-200/70 text-slate-700 group-hover:text-purple-600 group-hover:bg-purple-50 group-hover:border-purple-200'
        }`}>
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs sm:text-sm font-semibold tracking-tight truncate ${
              darkMode ? 'text-slate-100 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-900'
            }`}>
              {name}
            </span>
            {experience && (
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                darkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'
              }`}>
                {experience}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Level Tier Badge & Visual Dots */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Visual 4-Dot Micro Indicator */}
        <div className="hidden sm:flex items-center gap-1">
          {[1, 2, 3, 4].map((dotIndex) => (
            <span
              key={dotIndex}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                dotIndex <= tier.dots
                  ? darkMode
                    ? 'bg-purple-400'
                    : 'bg-purple-600'
                  : darkMode
                    ? 'bg-white/15'
                    : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Level Badge */}
        <div className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider border ${tier.colorClass}`}>
          {tier.label}
        </div>

        {/* Level Percentage Number */}
        <span className={`text-xs font-mono font-bold w-9 text-right ${
          darkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {level}%
        </span>
      </div>
    </div>
  );
};
