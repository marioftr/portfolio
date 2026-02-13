import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import LanguageDropdown from './LanguageDropdown';
import { socialLinks } from '../data/content';


export default function LandingPage() {
    const { language, t } = useTranslation();
    const navigate = useNavigate();
    const rolesRef = useRef(null);
    const profileRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);
    const [isSmallHeight, setIsSmallHeight] = useState(false);
    const [currentSection, setCurrentSection] = useState('profile');
    const lastScrollTime = useRef(0);

    useEffect(() => {
        const checkLayout = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const pixelRatio = window.devicePixelRatio || 1;
            
            // High-res tablet detection
            const isHighResTablet = (width >= 1024 && width <= 1700 && pixelRatio > 1.5);
            
            // Real phone check
            const phone = width <= 750;
            setIsMobile(phone);
            
            // Portrait orientation
            const portrait = height > width;
            setIsPortrait(portrait);
            
            // Tablet detection
            const isTab = (width > 750 && width <= 1240) || (isHighResTablet && width > 750) || (portrait && width > 750);
            setIsTablet(isTab);

            // Small height detection
            setIsSmallHeight(height < 750);
        };
        
        checkLayout();
        window.addEventListener('resize', checkLayout);
        return () => window.removeEventListener('resize', checkLayout);
    }, []);

    const scrollToRoles = () => {
        rolesRef.current?.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection('roles');
    };

    const scrollToProfile = () => {
        profileRef.current?.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection('profile');
    };

    useEffect(() => {
        if (!isMobile) return;

        let touchStartY = 0;

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            const now = Date.now();

            // Prevent multiple triggers during animation (100ms cooldown)
            if (now - lastScrollTime.current < 100) return;

            if (Math.abs(deltaY) > 40) { // Threshold for swipe
                if (deltaY > 0 && currentSection === 'profile') {
                    scrollToRoles();
                    lastScrollTime.current = now;
                } else if (deltaY < 0 && currentSection === 'roles') {
                    scrollToProfile();
                    lastScrollTime.current = now;
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobile, currentSection]);

    const useVerticalStack = isMobile || isPortrait;

    const roleMapping = {
        all: { path: 'perfil-general', icon: 'star', label: { es: 'Perfil Completo', ca: 'Perfil Complet', en: 'Full Profile', gl: 'Perfil Completo' } },
        game_dev: { path: 'programador-videojuegos', icon: 'code', label: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' } },
        artist_2d_3d: { path: 'artista-3d', icon: 'box', label: { es: 'Artista 2D y 3D', ca: 'Artista 2D i 3D', en: '2D & 3D Artist', gl: 'Artista 2D e 3D' } },
        video_editor: { path: 'editor-video', icon: 'layout', label: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' } },
    };

    const getIcon = (name) => {
        switch (name) {
            case 'star': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
            case 'layout': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
            case 'code': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
            case 'play-circle': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>;
            case 'box': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
            case 'link': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
            case 'linkedin': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
            case 'github': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
            case 'instagram': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
            case 'view': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
            default: return null;
        }
    };

    return (
        <div className={`flex ${useVerticalStack ? 'flex-col' : 'md:flex-row'} min-h-screen bg-white relative`} style={{ 
            height: '100dvh',
            minHeight: '100dvh',
            overflowY: 'hidden',
            overflowX: 'hidden'
        }}>
            {/* Left Side: Profile & Bio */}
            <div 
                ref={profileRef}
                className={`flex-1 flex flex-col items-center justify-center p-md sm:p-lg md:p-xl text-center ${useVerticalStack ? '' : 'md:items-start md:text-left'} bg-gray-50 landing-left`} 
                style={{ 
                    borderRight: useVerticalStack ? 'none' : '1px solid var(--color-border)', 
                    borderBottom: useVerticalStack ? '1px solid var(--color-border)' : 'none',
                    height: isMobile ? '100dvh' : (isPortrait ? '50dvh' : '100dvh'),
                    minHeight: isMobile ? '100dvh' : 'auto',
                    position: 'relative', 
                    paddingLeft: isMobile ? '3rem' : (isTablet ? '8%' : '12%'), 
                    paddingRight: isMobile ? '3rem' : (isTablet ? '6%' : '10%'),
                    paddingTop: isMobile ? '1rem' : (useVerticalStack ? '1rem' : 'inherit'),
                    paddingBottom: isMobile ? '1rem' : (useVerticalStack ? '1rem' : 'inherit'),
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }}
            >
                <div className="animate-fade-in flex flex-col items-center md:items-start" style={{ 
                    maxWidth: isMobile ? '450px' : '900px', 
                    width: '100%', 
                    justifyContent: 'center',
                    gap: isMobile ? '0.8rem' : (isTablet ? '1rem' : 'var(--spacing-md)')
                }}>
                    <div style={{
                        width: isMobile ? '120px' : (isPortrait ? '150px' : (isTablet ? '130px' : 'clamp(140px, 20vw, 180px)')), 
                        height: isMobile ? '120px' : (isPortrait ? '150px' : (isTablet ? '130px' : 'clamp(140px, 20vw, 180px)')), 
                        borderRadius: '50%',
                        overflow: 'hidden', border: '6px solid var(--color-primary)',
                        boxShadow: '0 15px 45px rgba(16, 185, 129, 0.3)', 
                        marginBottom: isMobile ? '0.5rem' : (isTablet ? '0.5rem' : '1rem'),
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease'
                    }}>
                        <img src="/images/foto_perfil.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ width: '100%', textAlign: useVerticalStack ? 'center' : 'inherit' }}>
                        <div style={{ width: '100%' }}>
                            <h1 className="responsive-title" style={{ 
                                fontSize: isMobile ? '1.7rem' : (isPortrait ? '2.1rem' : ((isTablet && isSmallHeight) ? '1.8rem' : (isTablet ? '1.8rem' : 'clamp(2rem, 3.5vw, 2.8rem)'))), 
                                fontWeight: 900, 
                                marginBottom: isMobile ? '0rem' : (isTablet ? '0.2rem' : '0.4rem'), 
                                letterSpacing: '-2px', 
                                color: 'var(--color-text)', 
                                lineHeight: 1.1, 
                                whiteSpace: (isTablet && !useVerticalStack) ? 'nowrap' : 'normal',
                                transition: 'font-size 0.3s ease'
                            }}>
                                Mario Villanueva Torres
                            </h1>
                            <p className="text-accent responsive-subtitle" style={{ 
                                fontSize: isMobile ? '0.7rem' : (isPortrait ? '0.8rem' : '0.7rem'), 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                letterSpacing: '4px', 
                                marginBottom: isMobile ? '0.4rem' : '0.6rem',
                                transition: 'font-size 0.3s ease'
                            }}>
                                {language === 'es' ? 'PORTFOLIO PROFESIONAL' : language === 'ca' ? 'PORTFOLIO PROFESSIONAL' : language === 'gl' ? 'PORTFOLIO PROFESIONAL' : 'PROFESSIONAL PORTFOLIO'}
                            </p>
                        </div>

                        <div 
                            className="responsive-bio-container" 
                            style={{ 
                                width: '100%',
                                padding: isMobile ? '0 0.5rem' : 0,
                                marginTop: isMobile ? '1.5rem' : (isPortrait ? '1.2rem' : (isTablet ? '0.5rem' : '1rem'))
                            }}
                        >
                            <p className="responsive-bio" style={{ 
                                color: 'var(--color-text-light)', 
                                lineHeight: isMobile ? 1.6 : (isPortrait ? 1.4 : (isTablet ? 1.5 : 1.6)), 
                                fontWeight: 500, 
                                textAlign: useVerticalStack ? 'center' : 'left', 
                                width: '100%', 
                                maxWidth: '100%',
                                marginBottom: isMobile ? '1.2rem' : '1rem',
                                fontSize: isMobile ? '1.1rem' : (isPortrait ? '1.15rem' : (isTablet ? '1.05rem' : 'clamp(1rem, 1.3vw, 1.15rem)')),
                                transition: 'all 0.3s ease'
                            }}>
                                {language === 'es'
                                    ? 'Perfil multidisciplinar. Estoy continuamente desarrollando mis habilidades en temas relacionados con la programación, el diseño, la edición de vídeo y el modelado 3D. Selecciona una especialidad para ver mi trayectoria y proyectos en detalle.'
                                    : language === 'ca'
                                        ? 'Perfil multidisciplinari. Estic contínuament desenvolupant les meves habilitats en temes relacionats amb la programació, el disseny, l\'edició de vídeo i el modelatge 3D. Selecciona una especialitat per veure la meva trajectòria i projectes en detall.'
                                        : language === 'gl'
                                            ? 'Perfil multidisciplinar. Estou continuamente desenvolvendo as miñas habilidades en temas relacionados coa programación, o deseño, a edición de vídeo e o modelado 3D. Selecciona unha especialidade para ver a miña traxectoria e proxectos en detalle.'
                                            : 'Multidisciplinary profile. I am continuously developing my skills in topics related to programming, design, video editing, and 3D modeling. Select a specialty to see my career path and projects in detail.'}
                            </p>
                        </div>
                    </div>

                    {/* Social Links & CV */}
                    <div className="social-links-container" style={{ 
                        display: 'flex', 
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '1rem' : '0.75rem', 
                        marginTop: isMobile ? '0.8rem' : ((isTablet && isSmallHeight) ? '0.2rem' : (isTablet ? '0.5rem' : '1rem')), 
                        marginBottom: (isTablet && isSmallHeight) ? '0rem' : '1rem',
                        justifyContent: useVerticalStack ? 'center' : 'flex-start',
                        alignItems: isMobile ? 'center' : 'stretch',
                        width: '100%' 
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            gap: '0.75rem',
                            justifyContent: useVerticalStack ? 'center' : 'flex-start'
                        }}>
                            {socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center social-icon-landing"
                                    style={{
                                        width: isMobile ? '48px' : (isPortrait ? '48px' : (isTablet ? '38px' : '42px')),
                                        height: isMobile ? '48px' : (isPortrait ? '48px' : (isTablet ? '38px' : '42px')),
                                        borderRadius: '12px',
                                        backgroundColor: 'white',
                                        color: 'var(--color-primary)',
                                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                        border: '1px solid var(--color-border)',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(16, 185, 129, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = 'var(--color-primary)';
                                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
                                    }}
                                >
                                    <div style={{ 
                                        transform: (isTablet && !isPortrait) ? 'scale(0.85)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}>
                                        {getIcon(link.icon)}
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* View CV Button */}
                        <a
                            href={language === 'en' ? '/downloads/CV_Mario_Villanueva_en.pdf' : '/downloads/CV_Mario_Villanueva_es.pdf'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center social-icon-landing cv-view-landing"
                            style={{
                                height: isMobile ? '48px' : (isPortrait ? '48px' : (isTablet ? '38px' : '42px')),
                                borderRadius: '12px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: '1px solid var(--color-primary)',
                                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)',
                                marginLeft: isMobile ? '0' : '0.75rem',
                                padding: '0 1.25rem',
                                textDecoration: 'none',
                                gap: '0.5rem',
                                width: isMobile ? 'fit-content' : 'auto'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.color = 'var(--color-primary)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.boxShadow = '0 4px 10px rgba(16, 185, 129, 0.2)';
                            }}
                        >
                            <div style={{ 
                                transform: (isTablet && !isPortrait) ? 'scale(0.85)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {getIcon('view')}
                            </div>
                            <span style={{ 
                                fontWeight: 800, 
                                fontSize: isMobile ? '0.9rem' : (isTablet ? '0.75rem' : '0.85rem'),
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                whiteSpace: 'nowrap'
                            }}>
                                {t('hero_download_cv')}
                            </span>
                        </a>
                    </div>
                </div>

                {/* Scroll Arrows - Positioned at bottom on mobile */}
                {isMobile && (
                    <div 
                        className="animate-bounce"
                        onClick={scrollToRoles}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: 'var(--color-primary)',
                            opacity: 0.9,
                            transition: 'all 0.3s ease',
                            position: 'absolute',
                            bottom: '50px',
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            width: 'fit-content',
                            zIndex: 10
                        }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '-14px' }}>
                            <polyline points="7 13 12 18 17 13"></polyline>
                        </svg>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="7 13 12 18 17 13"></polyline>
                        </svg>
                    </div>
                )}
            </div>

            {/* Right Side: Role Selection */}
            <div 
                className="flex-1 flex flex-col items-center landing-right" 
                ref={rolesRef}
                style={{ 
                    backgroundColor: 'var(--color-secondary)', 
                    height: isMobile ? '100dvh' : (isPortrait ? '50dvh' : '100dvh'),
                    minHeight: isMobile ? '100dvh' : 'auto',
                    width: '100%',
                    position: 'relative', 
                    paddingTop: isMobile ? '4rem' : (isPortrait ? '1.5rem' : 'var(--spacing-xl)'),
                    paddingBottom: isMobile ? '5rem' : (isPortrait ? '2.5rem' : 'var(--spacing-xl)'),
                    justifyContent: 'center',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    transition: 'all 0.3s ease',
                    overflowX: 'hidden'
                }}
            >
                {/* Scroll Up Arrows - Positioned at top on mobile */}
                {isMobile && (
                    <div 
                        className="animate-bounce"
                        onClick={scrollToProfile}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: 'var(--color-primary)',
                            opacity: 0.9,
                            transition: 'all 0.3s ease',
                            position: 'absolute',
                            top: '25px',
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            width: 'fit-content',
                            zIndex: 10
                        }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '-14px' }}>
                            <polyline points="17 11 12 6 7 11"></polyline>
                        </svg>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="17 11 12 6 7 11"></polyline>
                        </svg>
                    </div>
                )}

                <div className="flex flex-col animate-fade-in" style={{ 
                    animationDelay: '0.1s', 
                    width: isMobile ? '100%' : (isPortrait ? '500px' : (isTablet ? '420px' : '400px')), 
                    maxWidth: isMobile ? '450px' : '100%', 
                    zIndex: 2,
                    gap: isMobile ? '0.75rem' : (isPortrait ? '0.8rem' : (isTablet ? '1rem' : 'var(--spacing-md)')),
                    transition: 'width 0.3s ease'
                }}>
                    <p className="select-specialty-text" style={{ 
                        fontSize: isMobile ? '0.65rem' : (isPortrait ? '0.75rem' : (isTablet ? '0.75rem' : '0.8rem')), 
                        fontWeight: 900, 
                        textTransform: 'uppercase', 
                        letterSpacing: '3px', 
                        color: 'var(--color-text-light)', 
                        marginBottom: isMobile ? '0.5rem' : (isPortrait ? '0.5rem' : '1.25rem'), 
                        textAlign: 'center', 
                        opacity: 0.5 
                    }}>
                        {t('select_specialty')}
                    </p>
                    {Object.entries(roleMapping).map(([id, data]) => (
                        <button
                            key={id}
                            onClick={() => navigate(`/${language}/${data.path}`)}
                            className="flex items-center justify-between transition-all btn-thick-border role-button"
                            style={{
                                cursor: 'pointer',
                                padding: isMobile ? '1rem 1.5rem' : (isPortrait ? '1.25rem 2rem' : (isTablet ? '1rem 1.75rem' : '1.25rem 1.75rem')),
                                background: id === 'all' ? 'var(--color-primary)' : 'white',
                                color: id === 'all' ? 'white' : 'var(--color-primary)',
                                border: `4px solid var(--color-primary)`,
                                boxShadow: '0 8px 10px rgba(0,0,0,0.03)',
                                borderRadius: '20px',
                                textAlign: 'left',
                                width: '100%',
                                minHeight: isMobile ? '55px' : (isPortrait ? '65px' : (isTablet ? '50px' : 'clamp(60px, 10vh, 80px)')),
                                transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.05)';
                            }}
                        >
                            <span className="role-button-text" style={{ 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px', 
                                lineHeight: 1.2,
                                fontSize: isPortrait ? '1rem' : (isMobile ? '0.9rem' : ((isTablet && isSmallHeight) ? '0.7rem' : (isTablet ? '0.8rem' : 'inherit')))
                            }}>
                                {data.label[language] || data.label.es}
                            </span>
                            <div className="role-button-icon" style={{ 
                                opacity: 0.9, 
                                marginLeft: '1rem', 
                                flexShrink: 0, 
                                color: id === 'all' ? 'white' : 'var(--color-primary)', 
                                display: 'flex', 
                                alignItems: 'center',
                                transform: isPortrait ? 'scale(1)' : (isMobile ? 'scale(0.9)' : ((isTablet && isSmallHeight) ? 'scale(0.75)' : (isTablet ? 'scale(0.85)' : 'none')))
                            }}>
                                {getIcon(data.icon)}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Language Selector Bottom Centered */}
                <div style={{ 
                    position: 'absolute',
                    bottom: isMobile ? '3rem' : (isPortrait ? '1.25rem' : (isTablet ? '3.5rem' : '2.5rem')),
                    left: 0,
                    right: 0,
                    margin: '0 auto',
                    width: 'fit-content',
                    display: 'flex', 
                    justifyContent: 'center',
                    zIndex: 10
                }}>
                    <LanguageDropdown placement="top" />
                </div>
            </div>
        </div>
    );

}
