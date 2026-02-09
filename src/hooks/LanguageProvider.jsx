import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LanguageContext, translations } from './languageContext';

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get language from path (e.g., /es/role -> es)
  const getLangFromPath = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const langCandidate = pathParts[0];
    return translations[langCandidate] ? langCandidate : null;
  };

  const [language, setLanguageState] = useState(() => {
    const fromPath = getLangFromPath();
    if (fromPath) return fromPath;
    
    const saved = localStorage.getItem('portfolio_lang');
    return saved && translations[saved] ? saved : 'es';
  });

  // Sync state when URL changes (e.g. user manually changes URL or presses back/forward)
  useEffect(() => {
    const fromPath = getLangFromPath();
    if (fromPath && fromPath !== language) {
      setLanguageState(fromPath);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLang) => {
    if (newLang === language) return;
    
    setLanguageState(newLang);
    
    // Update URL: replace current lang with new lang or prepend if missing
    const pathParts = location.pathname.split('/').filter(Boolean);
    const currentLangInPath = translations[pathParts[0]] ? pathParts[0] : null;
    
    if (currentLangInPath) {
      pathParts[0] = newLang;
    } else {
      pathParts.unshift(newLang);
    }
    
    navigate(`/${pathParts.join('/')}`, { replace: true });
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
