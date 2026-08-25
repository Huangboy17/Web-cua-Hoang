import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SkillRow } from './SkillRow';

interface SkillItem {
  name: string;
  level: number;
  icon?: string;
  experience?: string;
}

interface CapabilityCardProps {
  id?: string;
  number: string;
  title: string;
  subtitle: string;
  countLabel: string;
  skills: SkillItem[];
  icon: LucideIcon;
  darkMode: boolean;
  accentVariant?: 'purple' | 'blue' | 'emerald';
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
  id,
  number,
  title,
  subtitle,
  countLabel,
  skills,
  icon: IconComponent,
  darkMode,
  accentVariant = 'purple'
}) => {
  const getAccentTheme = () => {
    switch (accentVariant) {
      case 'blue':
        return {
          numColor: darkMode ? 'text-blue-400' : 'text-blue-600',
          iconBg: darkMode 
            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
            : 'bg-blue-50 border-blue-200 text-blue-600',
          badge: darkMode 
            ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
            : 'bg-blue-50 text-blue-700 border-blue-200',
          borderHover: darkMode ? 'hover:border-blue-500/40' : 'hover:border-blue-300'
        };
      case 'emerald':
        return {
          numColor: darkMode ? 'text-emerald-400' : 'text-emerald-600',
          iconBg: darkMode 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-600',
          badge: darkMode 
            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
            : 'bg-emerald-50 text-emerald-700 border-emerald-200',
          borderHover: darkMode ? 'hover:border-emerald-500/40' : 'hover:border-emerald-300'
        };
      case 'purple':
      default:
        return {
          numColor: darkMode ? 'text-purple-400' : 'text-purple-600',
          iconBg: darkMode 
            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
            : 'bg-purple-50 border-purple-200 text-purple-600',
          badge: darkMode 
            ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
            : 'bg-purple-50 text-purple-700 border-purple-200',
          borderHover: darkMode ? 'hover:border-purple-500/40' : 'hover:border-purple-300'
        };
    }
  };

  const theme = getAccentTheme();

  return (
    <div
      id={id}
      className={`rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-xl ${theme.borderHover} ${
        darkMode 
          ? 'bg-[#11131A] border-white/10 shadow-black/40' 
          : 'bg-white border-[#E2E8F0] shadow-sm'
      }`}
    >
      <div>
        {/* Card Header Top: Index Number + Icon Badge + Count Label */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className={`text-xl sm:text-2xl font-extrabold font-mono tracking-tight ${theme.numColor}`}>
              {number}
            </span>
            <div className={`p-2 rounded-xl border ${theme.iconBg}`}>
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border ${theme.badge}`}>
            {countLabel}
          </div>
        </div>

        {/* Card Titles */}
        <div className="mb-5">
          <h3 className={`text-base sm:text-lg font-bold tracking-tight uppercase leading-snug ${
            darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
          }`}>
            {title}
          </h3>
          <p className={`text-xs sm:text-sm font-normal mt-1 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {subtitle}
          </p>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-3 ${darkMode ? 'bg-white/10' : 'bg-slate-100'}`} />

        {/* Skills List */}
        <div className="space-y-1">
          {(skills || []).map((skill, idx) => (
            <SkillRow
              key={skill.name || idx}
              name={skill.name}
              level={skill.level}
              experience={skill.experience}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
