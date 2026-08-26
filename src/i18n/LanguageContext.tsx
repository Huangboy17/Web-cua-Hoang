import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, LanguageOption } from './types';
import { translations, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'HOANG_PORTFOLIO_LANGUAGE_PREF';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (saved && (saved === 'vi' || saved === 'en' || saved === 'zh' || saved === 'ko')) {
        return saved;
      }
      // Auto-detect browser language if available
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('en')) return 'en';
      if (browserLang.startsWith('zh')) return 'zh';
      if (browserLang.startsWith('ko')) return 'ko';
    } catch (e) {
      console.warn('Could not read language from localStorage', e);
    }
    return 'vi'; // Default to Vietnamese
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch (e) {
      // ignore
    }
  }, [language]);

  const currentLanguageOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const t = translations[language] || translations.vi;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
