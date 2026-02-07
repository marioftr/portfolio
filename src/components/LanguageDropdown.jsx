import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import galiciaFlag from '../assets/optimized/galicia_flag.png?url';
import cataloniaFlag from '../assets/optimized/catalonia_flag.png?url';

export default function LanguageDropdown({ placement = 'bottom' }) {
    const { language, setLanguage } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'es', label: 'Castellano (ES)', flag: '🇪🇸' },
        { code: 'en', label: 'English (EN)', flag: '🇬🇧' },
        { code: 'gl', label: 'Galego (GL)', flag: galiciaFlag },
        { code: 'ca', label: 'Català (CA)', flag: cataloniaFlag }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const dropdownStyles = {
        position: 'relative',
        display: 'inline-block',
        zIndex: 1000,
        fontFamily: 'inherit'
    };

    const triggerStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        color: 'var(--color-primary)',
        fontWeight: 800,
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const menuStyles = {
        position: 'absolute',
        bottom: placement === 'bottom' ? 'auto' : 'calc(100% + 0.5rem)',
        top: placement === 'top' ? 'auto' : 'calc(100% + 0.5rem)',
        right: 0,
        backgroundColor: 'white',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        minWidth: '160px',
        maxHeight: isOpen ? '300px' : '0',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : (placement === 'bottom' ? 'translateY(-10px)' : 'translateY(10px)'),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isOpen ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column'
    };

    const itemStyles = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.8rem 1rem',
        width: '100%',
        textAlign: 'left',
        border: 'none',
        backgroundColor: isActive ? 'var(--color-secondary)' : 'transparent',
        color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
        fontWeight: isActive ? 800 : 500,
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap'
    });

    return (
        <div style={dropdownStyles} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={triggerStyles}
                className="dropdown-trigger"
            >
                <span style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center' }}>
                    {typeof currentLang.flag === 'string' && currentLang.flag.startsWith('data:') === false && currentLang.flag.length <= 2
                        ? currentLang.flag
                        : (typeof currentLang.flag === 'string' && currentLang.flag.startsWith('http') ? <img src={currentLang.flag} alt="flag" style={{ width: '20px', height: '14px', objectFit: 'cover' }} /> : currentLang.flag)}
                </span>
                <span>{language === 'es' ? 'Idioma' : language === 'ca' ? 'Idioma' : language === 'gl' ? 'Idioma' : 'Language'}</span>
                <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease'
                    }}
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            <div style={menuStyles}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => {
                            setLanguage(lang.code);
                            setIsOpen(false);
                        }}
                        style={itemStyles(language === lang.code)}
                        onMouseEnter={(e) => {
                            if (language !== lang.code) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                        }}
                        onMouseLeave={(e) => {
                            if (language !== lang.code) e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <span style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center' }}>
                            {typeof lang.flag === 'string' && lang.flag.length <= 2
                                ? lang.flag
                                : (typeof lang.flag === 'string' && lang.flag.startsWith('http') ? <img src={lang.flag} alt={lang.code} style={{ width: '20px', height: '14px', objectFit: 'cover' }} /> : lang.flag)}
                        </span>
                        <span>{lang.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
