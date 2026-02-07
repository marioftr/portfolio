import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { socialLinks } from '../data/content';
import LanguageDropdown from './LanguageDropdown';

const roleKeyMap = {
    'perfil-general': 'all',
    'editor-video': 'video_editor',
    'programador-videojuegos': 'game_dev',
    'artista-3d': 'artist_2d_3d'
};

const roleTitles = {
    all: { es: 'Perfil Completo', ca: 'Perfil Complet', en: 'Full Profile', gl: 'Perfil Completo' },
    video_editor: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' },
    game_dev: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' },
    artist_2d_3d: { es: 'Artista 2D y 3D', ca: 'Artista 2D i 3D', en: '2D & 3D Artist', gl: 'Artista 2D e 3D' },
    design: { es: 'Diseño', ca: 'Disseny', en: 'Design', gl: 'Deseño' }
};

export default function Navbar() {
    const { language, t } = useTranslation();
    const { role } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const activeRoleId = roleKeyMap[role] || 'all';
    const activeLabel = roleTitles[activeRoleId][language] || roleTitles[activeRoleId].es;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (path) => {
        if (path === 'home') navigate('/');
        else navigate(`/${path}`);
        setIsOpen(false);
    };

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '0 var(--spacing-md)',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            transition: 'none'
        }}>
            <div className="container flex justify-between items-center" style={{ width: '100%' }}>
                <div className="flex items-center gap-md">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-text)', letterSpacing: '-0.8px' }}>
                            Mario Villanueva Torres
                        </div>
                    </Link>

                    <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--color-border)', margin: '0 4px' }} />

                    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-sm transition-all"
                            style={{
                                background: 'white',
                                border: '1.5px solid var(--color-border)',
                                borderRadius: '10px',
                                padding: '4px 12px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                color: 'var(--color-primary)',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                                minWidth: '160px',
                                height: '32px',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span style={{ whiteSpace: 'nowrap' }}>{activeLabel}</span>
                            <svg
                                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round"
                                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0 }}
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>

                        {isOpen && (
                            <div className="animate-fade-in" style={{
                                position: 'absolute',
                                top: 'calc(100% + 4px)',
                                left: 0,
                                minWidth: '220px',
                                background: 'white',
                                borderRadius: '12px',
                                border: '1.5px solid var(--color-border)',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                                overflow: 'hidden',
                                padding: '4px',
                                zIndex: 2000
                            }}>
                                <button
                                    onClick={() => handleSelect('home')}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        textAlign: 'left',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        color: 'var(--color-primary)',
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        marginBottom: '1px',
                                        textTransform: 'uppercase'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    {t('home')}
                                </button>

                                <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 8px' }} />

                                {Object.entries(roleKeyMap).map(([path, id]) => {
                                    return (
                                        <button
                                            key={path}
                                            onClick={() => handleSelect(path)}
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                textAlign: 'left',
                                                fontSize: '0.8rem',
                                                fontWeight: activeRoleId === id ? 800 : 500,
                                                color: activeRoleId === id ? 'var(--color-primary)' : 'var(--color-text)',
                                                background: activeRoleId === id ? 'var(--color-secondary)' : 'transparent',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                marginBottom: '1px'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (activeRoleId !== id) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (activeRoleId !== id) e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            {roleTitles[id][language] || roleTitles[id].es}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-md">
                    <div className="flex items-center gap-sm">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link.name}
                                style={{ display: 'flex', transition: 'transform 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img
                                    src={`/images/logos/${link.name.toLowerCase()}.png`}
                                    alt={link.name}
                                    style={{ width: '18px', height: '18px', opacity: 0.7 }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </a>
                        ))}
                    </div>

                    <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--color-border)' }} />

                    <LanguageDropdown />
                </div>
            </div>
        </nav>
    );
}
