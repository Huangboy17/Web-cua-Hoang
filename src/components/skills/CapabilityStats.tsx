import React from 'react';
import { Building2, Cpu, Table2, Sparkles } from 'lucide-react';
import { SkillCategory } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface CapabilityStatsProps {
  categories: SkillCategory[];
  darkMode: boolean;
}

export const CapabilityStats: React.FC<CapabilityStatsProps> = ({ categories, darkMode }) => {
  const { t } = useLanguage();
  const cat1 = categories?.[0];
  const cat2 = categories?.[1];

  const cat1Count = cat1?.skills?.length || 7;
  const cat2Count = cat2?.skills?.length || 5;

  // Find highest Data/Excel skill level
  const allSkills = (categories || []).flatMap((c) => c.skills || []);
  const excelSkill = allSkills.find((s) => 
    s.name.toLowerCase().includes('excel') || 
    s.name.toLowerCase().includes('query') || 
    s.name.toLowerCase().includes('data')
  );
  const excelLevel = excelSkill?.level || 95;

  // Find highest AI/Automation skill level
  const aiSkill = allSkills.find((s) => 
    s.name.toLowerCase().includes('ai') || 
    s.name.toLowerCase().includes('tự động') || 
    s.name.toLowerCase().includes('gemini') || 
    s.name.toLowerCase().includes('gpt')
  );
  const aiLevel = aiSkill?.level || 92;

  const kpis = [
    {
      id: 'kpi-construction',
      number: String(cat1Count).padStart(2, '0'),
      label: t.skills.kpiConstruction,
      sublabel: t.skills.kpiConstructionSub,
      icon: Building2,
      accent: 'from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20'
    },
    {
      id: 'kpi-tech',
      number: String(cat2Count).padStart(2, '0'),
      label: t.skills.kpiTech,
      sublabel: t.skills.kpiTechSub,
      icon: Cpu,
      accent: 'from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
    },
    {
      id: 'kpi-data',
      number: `${excelLevel}%`,
      label: t.skills.kpiData,
      sublabel: t.skills.kpiDataSub,
      icon: Table2,
      accent: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
    },
    {
      id: 'kpi-ai',
      number: `${aiLevel}%`,
      label: t.skills.kpiAi,
      sublabel: t.skills.kpiAiSub,
      icon: Sparkles,
      accent: 'from-violet-500/10 to-fuchsia-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-10">
      {kpis.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <div
            key={kpi.id}
            id={kpi.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 group ${
              darkMode
                ? 'bg-[#11131A] border-white/10 hover:border-[#7C3AED]/40 hover:shadow-lg hover:shadow-purple-950/20'
                : 'bg-white border-[#E2E8F0] hover:border-purple-300 hover:shadow-md shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
              }`}>
                {kpi.number}
              </span>
              <div className={`p-2 rounded-xl border bg-gradient-to-br ${kpi.accent}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className={`text-xs sm:text-sm font-bold leading-snug mb-0.5 ${
              darkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {kpi.label}
            </div>

            <div className={`text-[11px] font-medium leading-tight ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {kpi.sublabel}
            </div>
          </div>
        );
      })}
    </div>
  );
};
