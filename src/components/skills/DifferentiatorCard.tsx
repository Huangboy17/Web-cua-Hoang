import React from 'react';
import { Zap, Database, Cpu, Sparkles, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface DifferentiatorCardProps {
  darkMode: boolean;
}

export const DifferentiatorCard: React.FC<DifferentiatorCardProps> = ({ darkMode }) => {
  const { t } = useLanguage();

  const pillars = [
    {
      title: t.skills.diffPillar1Title,
      desc: t.skills.diffPillar1Desc,
      icon: Database
    },
    {
      title: t.skills.diffPillar2Title,
      desc: t.skills.diffPillar2Desc,
      icon: Cpu
    },
    {
      title: t.skills.diffPillar3Title,
      desc: t.skills.diffPillar3Desc,
      icon: FileSpreadsheet
    },
    {
      title: t.skills.diffPillar4Title,
      desc: t.skills.diffPillar4Desc,
      icon: Sparkles
    }
  ];

  return (
    <div
      id="professional-differentiator-box"
      className={`rounded-3xl border p-6 sm:p-8 mb-10 transition-all ${
        darkMode
          ? 'bg-gradient-to-br from-[#7C3AED]/10 via-[#11131A] to-[#2563EB]/10 border-[#7C3AED]/30 shadow-xl'
          : 'bg-gradient-to-br from-[#F5F3FF] via-[#F8FAFC] to-[#EFF6FF] border-[#E2E8F0] shadow-sm'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-purple-200/50 dark:border-white/10">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-purple-500/10 text-[#7C3AED] dark:text-[#A78BFA] border border-purple-400/20 mb-2.5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{t.skills.diffBadge}</span>
          </div>

          {/* Headline */}
          <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
            darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
          }`}>
            Construction Economics <span className="text-[#7C3AED] dark:text-[#A78BFA]">×</span> Data <span className="text-[#2563EB] dark:text-[#60A5FA]">×</span> AI Automation
          </h3>
        </div>

        {/* Description */}
        <p className={`text-xs sm:text-sm font-normal max-w-xl leading-relaxed ${
          darkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {t.skills.diffDesc}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        {pillars.map((pillar, idx) => {
          const IconComponent = pillar.icon;
          return (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border transition-all duration-150 ${
                darkMode
                  ? 'bg-white/[0.03] border-white/10 hover:border-purple-500/30'
                  : 'bg-white/90 border-slate-200/80 hover:border-purple-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${
                  darkMode ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-50 text-purple-600'
                }`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <h4 className={`text-xs font-bold ${
                  darkMode ? 'text-slate-100' : 'text-slate-800'
                }`}>
                  {pillar.title}
                </h4>
              </div>
              <p className={`text-[11px] leading-relaxed ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
