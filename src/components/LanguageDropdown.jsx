import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Icon from './Icon';

const LANGUAGES = [
  { code: 'es', label: 'Castellano' },
  { code: 'en', label: 'English' },
  { code: 'gl', label: 'Galego' },
  { code: 'ca', label: 'Català' },
];

function Code({ code }) {
  return <span className="font-bold text-xs uppercase tracking-wider w-5">{code}</span>;
}

export default function LanguageDropdown({ align = 'center', className = '', buttonClassName = '', dropDown = false }) {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const alignClass = align === 'right' ? 'right-0' : align === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2';

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-2 h-9 px-3 border border-border text-primary font-bold text-xs uppercase tracking-wide cursor-pointer hover:border-primary/50 transition-colors ${buttonClassName}`}
      >
        <Code code={current.code} />
        <span className="hidden sm:inline">{language === 'en' ? 'Language' : 'Idioma'}</span>
        <Icon name="chevronDown" size={12} strokeWidth={3} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute ${dropDown ? 'top-[calc(100%+0.5rem)]' : 'bottom-[calc(100%+0.5rem)]'} ${alignClass} min-w-40 bg-card border border-border shadow-lg overflow-hidden flex flex-col z-50 animate-fade-in`}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 text-sm whitespace-nowrap text-left transition-colors ${
                language === lang.code ? 'bg-surface text-primary font-bold' : 'text-ink font-medium hover:bg-surface'
              }`}
            >
              <Code code={lang.code} />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
