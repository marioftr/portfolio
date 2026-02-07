import { useState, useEffect } from 'react';
import { LanguageContext, translations } from './languageContext';

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage or default to 'es'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return saved && translations[saved] ? saved : 'es';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
