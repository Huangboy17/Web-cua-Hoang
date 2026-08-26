import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface LanguageSelectorProps {
  darkMode: boolean;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ darkMode, compact = false }) => {
  const { language, setLanguage, languages, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} id="language-selector-root">
      {/* Trigger Button */}
      <button
        type="button"
        id="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Chọn ngôn ngữ / Select Language / 选择语言 / 언어 선택"
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
          isOpen
            ? darkMode
              ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#A78BFA] shadow-md shadow-purple-950/30'
              : 'bg-purple-50 border-purple-400 text-[#7C3AED] shadow-sm'
            : darkMode
              ? 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10 hover:border-white/20'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
        }`}
      >
        <span className="text-sm leading-none" role="img" aria-label={currentLanguageOption.label}>
          {currentLanguageOption.flag}
        </span>
        
        {!compact && (
          <span className="font-mono uppercase tracking-wider text-[11px] font-bold">
            {currentLanguageOption.code}
          </span>
        )}

        <ChevronDown 
          className={`w-3 h-3 transition-transform duration-200 opacity-60 ${
            isOpen ? 'rotate-180 opacity-100 text-[#7C3AED] dark:text-[#A78BFA]' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="language-dropdown-menu"
          role="menu"
          aria-orientation="vertical"
          className={`absolute right-0 mt-2 w-44 rounded-2xl border shadow-xl z-50 p-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
            darkMode
              ? 'bg-[#11131A]/95 border-white/10 text-[#F8FAFC] shadow-black/60'
              : 'bg-white/95 border-[#E2E8F0] text-[#0F172A] shadow-slate-300/40'
          }`}
        >
          <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/5 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#7C3AED]" />
            <span>Select Language</span>
          </div>

          <div className="space-y-0.5">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  role="menuitem"
                  id={`lang-opt-${lang.code}`}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? darkMode
                        ? 'bg-[#7C3AED]/20 text-[#A78BFA] font-bold'
                        : 'bg-purple-50 text-[#7C3AED] font-bold'
                      : darkMode
                        ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none" role="img" aria-label={lang.label}>
                      {lang.flag}
                    </span>
                    <div className="text-left">
                      <span className="block leading-tight">{lang.nativeLabel}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A78BFA]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
