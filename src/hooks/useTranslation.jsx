import { useState, createContext, useContext, useEffect } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';
import gl from '../locales/gl.json';
import ca from '../locales/ca.json';

const LanguageContext = createContext();

const translations = { es, en, gl, ca };

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

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
