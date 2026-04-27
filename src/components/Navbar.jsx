import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { socialLinks } from '../data/content';
import LanguageDropdown from './LanguageDropdown';
import {
    PORTFOLIO_READY_GAME_DEV,
    PORTFOLIO_READY_ARTIST_2D_3D,
    PORTFOLIO_READY_VIDEO_EDITOR
} from '../config';

const roleKeyMap = {
    'perfil-general': 'all',
    'programador-videojuegos': 'game_dev',
    'artista-2d-3d': 'artist_2d_3d',
    'editor-video': 'video_editor'
};

// Lista ordenada para el dropdown (un item por perfil, sin duplicados)
const navItems = [
    { path: 'perfil-general',          id: 'all' },
    { path: 'artista-2d-3d',              id: 'artist_2d_3d' },
    { path: 'programador-videojuegos', id: 'game_dev' },
    { path: 'editor-video',            id: 'video_editor' }
];

const PORTFOLIO_FLAGS = {
    game_dev:     PORTFOLIO_READY_GAME_DEV,
    artist_2d_3d: PORTFOLIO_READY_ARTIST_2D_3D,
    video_editor: PORTFOLIO_READY_VIDEO_EDITOR
};

const anyReady = Object.values(PORTFOLIO_FLAGS).some(Boolean);

const roleTitles = {
    all: { es: 'Perfil General', ca: 'Perfil General', en: 'General Profile', gl: 'Perfil General' },
    artist_2d_3d: { es: 'Artista 2D y 3D', ca: 'Artista 2D i 3D', en: '2D & 3D Artist', gl: 'Artista 2D e 3D' },
    game_dev: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' },
    video_editor: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' }
};

export default function Navbar() {
    const { language, t } = useTranslation();
    const { role, tab } = useParams();
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
        if (path === 'home') navigate(`/${language}`);
        else {
            // Tab por defecto según el perfil destino
            const destRoleId = roleKeyMap[path] || 'all';
            const destTab = destRoleId === 'all'
                ? (anyReady ? 'portfolio' : 'sobre-mi')
                : (PORTFOLIO_FLAGS[destRoleId] ? 'portfolio' : 'sobre-mi');
            navigate(`/${language}/${path}/${destTab}`);
        }
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
            <div className="container navbar-content" style={{ 
                width: '100%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                height: '100%'
            }}>
                <div className="nav-left" style={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>
                    <Link to={`/${language}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <div className="nav-name" style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-text)', letterSpacing: '-0.8px' }}>
                            <span className="full-name">Mario Villanueva Torres</span>
                            <span className="short-name" style={{ display: 'none' }}>Mario</span>
                        </div>
                    </Link>
                    <div className="nav-divider" style={{ width: '1px', height: '20px', backgroundColor: 'var(--color-border)', margin: '0 12px' }} />
                </div>

                <div ref={dropdownRef} className="nav-role-container" style={{ 
                    position: 'absolute', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    zIndex: 10
                }}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-sm transition-all role-dropdown-trigger nav-role-selector"
                        style={{
                            background: 'white',
                            border: '1.5px solid var(--color-border)',
                            borderRadius: '10px',
                            padding: '4px 16px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            color: 'var(--color-primary)',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                            height: '36px',
                            justifyContent: 'space-between'
                        }}
                    >
                        <span className="nav-active-label" style={{ 
                            whiteSpace: 'nowrap', 
                            flex: 1,
                            textAlign: 'center'
                        }}>{activeLabel}</span>
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
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'white',
                            borderRadius: '12px',
                            border: '1.5px solid var(--color-border)',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                            overflow: 'hidden',
                            padding: '4px 8px',
                            zIndex: 2000
                        }}>
                                <button
                                    onClick={() => handleSelect('home')}
                                    style={{
                                        width: '100%',
                                        padding: '8px 16px',
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

                                {navItems.map(({ path, id }) => (
                                        <button
                                            key={path}
                                            onClick={() => handleSelect(path)}
                                            style={{
                                                width: '100%',
                                                padding: '8px 16px',
                                                textAlign: 'left',
                                                fontSize: '0.8rem',
                                                fontWeight: activeRoleId === id ? 800 : 500,
                                                color: activeRoleId === id ? 'var(--color-primary)' : 'var(--color-text)',
                                                background: activeRoleId === id ? 'var(--color-secondary)' : 'transparent',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                marginBottom: '1px',
                                                whiteSpace: 'nowrap'
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
                                    ))}
                            </div>
                        )}
                    </div>

                <div className="flex items-center gap-sm sm:gap-md nav-right-section" style={{ flex: 1, justifyContent: 'flex-end', minWidth: 0 }}>
                    <div className="flex items-center gap-sm nav-socials">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link.name}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.2s',
                                    width: '24px',
                                    height: '24px'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img
                                    src={`/images/logos/${link.name.toLowerCase()}.png`}
                                    alt={link.name}
                                    style={{ 
                                        width: '18px', 
                                        height: '18px', 
                                        opacity: 0.7,
                                        objectFit: 'contain',
                                        display: 'block'
                                    }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </a>
                        ))}
                    </div>

                    <div className="nav-divider-right" style={{ width: '1px', height: '20px', backgroundColor: 'var(--color-border)' }} />

                    <LanguageDropdown showLabelMobile={false} align="right" />
                </div>

            </div>
        </nav>
    );
}
