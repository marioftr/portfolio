import { useTranslation } from '../hooks/useTranslation';
const profilePhoto = '/images/foto_orla.jpg';


export default function Hero({ roleId }) {
    const { language, t } = useTranslation();

    const roleTitles = {
        all: { es: 'Perfil General', ca: 'Perfil General', en: 'General Profile', gl: 'Perfil General' },
        game_dev: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' },
        artist_2d_3d: { es: 'Artista 2D y 3D', ca: 'Artista 2D i 3D', en: '2D & 3D Artist', gl: 'Artista 2D e 3D' },
        video_editor: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' },
        design: { es: 'Diseño', ca: 'Disseny', en: 'Design', gl: 'Deseño' }
    };

    const indexItems = [
        { id: 'about', label: t('tab_info') },
        { id: 'featured-projects', label: t('section_projects_title') },
        { id: 'skills', label: t('skills_title') },
        { id: 'experience', label: language === 'es' ? 'Trayectoria Profesional' : language === 'ca' ? 'Trajectòria Professional' : language === 'gl' ? 'Traxectoria Profesional' : 'Professional Path' },
        { id: 'aptitudes', label: language === 'es' ? 'Idiomas y Aptitudes' : language === 'ca' ? 'Idiomes i Aptituds' : language === 'gl' ? 'Idiomas e Aptitudes' : 'Languages & Aptitudes' }
    ];

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 120; // Approx sticky Navbar (60) + Sticky Tabs (60)
            const offsetPosition = element.offsetTop - navbarHeight;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="section animate-fade-in" style={{ padding: '0.75rem 0' }}>
            <div className="container hero-container flex flex-row mobile-column items-center justify-start gap-sm md:gap-md" style={{ 
                textAlign: 'left', 
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                <div style={{
                    width: 'clamp(120px, 20vw, 150px)', 
                    height: 'clamp(120px, 20vw, 150px)', 
                    borderRadius: '24px',
                    overflow: 'hidden', 
                    border: '4px solid var(--color-primary)',
                    boxShadow: 'var(--shadow-lg)', 
                    flexShrink: 0
                }}>
                    <img src={profilePhoto} alt="Mario Villanueva Torres" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div className="flex flex-col items-center md:items-start mobile-center" style={{ flex: 1, gap: '0.5rem' }}>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 style={{ 
                            marginBottom: '0.05rem', 
                            fontSize: 'clamp(1.3rem, 4.5vw, 2.1rem)',
                            fontWeight: 900,
                            color: 'var(--color-text)',
                            lineHeight: 1.1,
                            whiteSpace: 'nowrap'
                        }}>
                            Mario Villanueva Torres
                        </h1>

                        <p className="text-accent" style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                            {roleTitles[roleId]?.[language] || roleTitles[roleId]?.es || roleTitles.all.es}
                        </p>
                    </div>

                    <div className="justify-center md:justify-start" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}>
                        <a 
                            href={language === 'en' ? '/downloads/CV_Mario_Villanueva_en_may26.pdf' : '/downloads/CV_Mario_Villanueva_es_may26.pdf'} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary flex items-center gap-xs"
                            style={{ 
                                padding: '0.4rem 0.8rem', 
                                fontSize: '0.75rem',
                                borderRadius: '8px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            {t('hero_download_cv')}
                        </a>
                    </div>
                </div>

                {/* Index Column */}
                <div className="desktop-only" style={{ 
                    flexShrink: 0,
                    borderLeft: '2px solid var(--color-border)',
                    paddingLeft: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    alignItems: 'flex-start'
                }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        {language === 'en' ? 'Quick Access' : language === 'ca' ? 'Accés ràpid' : language === 'gl' ? 'Acceso rápido' : 'Acceso rápido'}
                    </span>
                    {indexItems.map(item => (
                        <a 
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-primary)',
                                textDecoration: 'none',
                                fontWeight: 800,
                                transition: 'all 0.2s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '2px 0',
                                width: 'fit-content'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px)';
                                e.currentTarget.style.color = 'var(--color-primary-dark)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.color = 'var(--color-primary)';
                            }}
                        >
                            <span style={{ fontSize: '1rem', lineHeight: 1 }}>•</span>
                            <span style={{ borderBottom: '1px solid transparent' }}>{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
