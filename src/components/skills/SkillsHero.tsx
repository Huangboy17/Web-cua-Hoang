import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface SkillsHeroProps {
  darkMode: boolean;
}

export const SkillsHero: React.FC<SkillsHeroProps> = ({ darkMode }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
      {/* Small Badge */}
      <div 
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 shadow-sm transition-all ${
          darkMode 
            ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40' 
            : 'bg-purple-50 text-[#7C3AED] border-purple-200'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
        <span className="uppercase tracking-[0.18em]">{t.skills.badge}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-tight mb-4">
        <span className={darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}>
          {t.skills.title} &{' '}
        </span>
        <span className="bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#2563EB] bg-clip-text text-transparent">
          {t.skills.titleHighlight}
        </span>
      </h2>

      {/* Subtitle */}
      <p className={`text-sm sm:text-base leading-relaxed font-normal max-w-2xl ${
        darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
      }`}>
        {t.skills.subtitle}
      </p>
    </div>
  );
};
