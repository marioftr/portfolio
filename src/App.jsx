import { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceTimeline from './components/Timeline';
import ProjectsGallery from './components/ProjectsGallery';
import FeaturedProjects from './components/FeaturedProjects';
import ContactSection from './components/Contact';
import SkillsSection from './components/SkillsSection';
import PortfolioTab from './components/PortfolioTab';
import LanguagesAptitudes from './components/LanguagesAptitudes';
import ProjectModal from './components/ProjectModal';
import LandingPage from './components/LandingPage';
import { useTranslation } from './hooks/useTranslation';
import {
  PORTFOLIO_READY_GAME_DEV,
  PORTFOLIO_READY_ARTIST_2D_3D,
  PORTFOLIO_READY_VIDEO_EDITOR
} from './config';
import { profileImages } from './components/PortfolioTab';
import { experience, education, projects, languages, aptitudes, aboutMe, aboutByRole } from './data/content';
import { projectList } from './data/proyectos';

const roleKeyMap = {
  'perfil-general': 'all',
  'editor-video': 'video_editor',
  'programador-videojuegos': 'game_dev',
  'artista-2d-3d': 'artist_2d_3d'
};

// ─── Flags de portfolio por perfil ───────────────────────────────────────────
const PORTFOLIO_READY = {
  game_dev:     PORTFOLIO_READY_GAME_DEV,
  artist_2d_3d: PORTFOLIO_READY_ARTIST_2D_3D,
  video_editor: PORTFOLIO_READY_VIDEO_EDITOR
};

const validLangs = ['es', 'en', 'gl', 'ca'];

const SectionHeader = ({ title }) => (
  <div className="section-title animate-fade-in" style={{ marginTop: '3rem', marginBottom: 'var(--spacing-lg)' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textAlign: 'center' }}>{title}</h2>
    <div className="title-underline" style={{ margin: '0.5rem auto 0' }} />
  </div>
);

const roleTitlesMap = {
  all: { es: 'Perfil General', ca: 'Perfil General', en: 'General Profile', gl: 'Perfil General' },
  video_editor: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' },
  game_dev: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' },
  artist_2d_3d: { es: 'Artista 2D y 3D', ca: 'Artista 2D i 3D', en: '2D & 3D Artist', gl: 'Artista 2D e 3D' }
};

// ─── PortfolioOverview (perfil general → tab Portfolio) ──────────────────────
const PROFILE_ORDERED = [
  { id: 'game_dev',     slug: 'programador-videojuegos' },
  { id: 'artist_2d_3d', slug: 'artista-2d-3d' },
  { id: 'video_editor', slug: 'editor-video' }
];

const SECTION_TITLES_OV = {
  game_dev:     { es: 'Desarrollo de Videojuegos', en: 'Game Development',   ca: 'Desenvolupament de Videojocs', gl: 'Desenvolvemento de Videoxogos' },
  artist_2d_3d: { es: 'Arte 2D & 3D',              en: '2D & 3D Art',         ca: 'Art 2D i 3D',                  gl: 'Arte 2D e 3D' },
  video_editor: { es: 'Edición de Vídeo',           en: 'Video Editing',       ca: 'Edició de Vídeo',              gl: 'Edición de Vídeo' }
};

const PortfolioOverview = ({ onProjectSelect, onTabClick }) => {
  const { language } = useTranslation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [ovLightbox, setOvLightbox] = useState(null); // { profileId, slug, itemIndex }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const previewCount = isMobile ? 2 : 3;

  return (
    <>
      <style>{`
        @keyframes skel-shimmer {
          0%   { background-position: -800px 0; }
          100% { background-position:  800px 0; }
        }
        .skel-block {
          background: linear-gradient(90deg, #e2e2e2 25%, #ebebeb 50%, #e2e2e2 75%);
          background-size: 1600px 100%;
          animation: skel-shimmer 1.8s infinite linear;
          border-radius: 10px;
        }
      `}</style>
      <section className="animate-fade-in container" style={{ paddingBottom: '0' }}>
        <div className="section-title" style={{ marginTop: '3rem', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textAlign: 'center' }}>
            {language === 'en' ? 'Portfolio Highlights' : 'Portfolio'}
          </h2>
          <div className="title-underline" style={{ margin: '0.5rem auto 0' }} />
        </div>

        {PROFILE_ORDERED.map(({ id, slug }, sectionIndex) => {
          const isReady = PORTFOLIO_READY[id];
          const title = SECTION_TITLES_OV[id]?.[language] || SECTION_TITLES_OV[id]?.es;
          const items = profileImages[id] || [];
          const isExpanded = expanded[id] ?? false;
          const showItems = isExpanded ? items : items.slice(0, previewCount);
          const hiddenCount = items.length - previewCount;

          return (
            <div key={id} style={{ marginBottom: sectionIndex === PROFILE_ORDERED.length - 1 ? '0' : '2.5rem' }}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <h3 style={{
                  fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)',
                  borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem',
                  textTransform: 'uppercase', letterSpacing: '1px', margin: 0
                }}>{title}</h3>
                {isReady && (
                  <button
                    onClick={() => navigate(`/${language}/${slug}/portfolio`)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      textDecoration: 'underline', textUnderlineOffset: '3px',
                      padding: '0.25rem 0', fontFamily: 'inherit'
                    }}
                  >
                    {language === 'en' ? 'Switch profile' : language === 'ca' ? 'Canviar de perfil' : 'Cambiar de perfil'} →
                  </button>
                )}
              </div>

              {/* Content */}
              {!isReady ? (
                // WIP placeholder
                <div style={{ position: 'relative', overflow: 'hidden', height: '140px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${previewCount}, 1fr)`, gap: '0.65rem', opacity: 0.7, height: '100%' }}>
                    {Array.from({ length: previewCount }).map((_, i) => (
                      <div key={i} className="skel-block" style={{ borderRadius: 'var(--radius-md)', height: '100%' }} />
                    ))}
                  </div>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.9) 70%)'
                  }}>
                    <span style={{
                      background: 'white', border: '1.5px solid var(--color-border)', borderRadius: '20px',
                      padding: '0.4rem 1.2rem', fontWeight: 700, fontSize: '0.8rem',
                      color: 'var(--color-text-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                      🚧 {language === 'en' ? 'Work in progress' : language === 'ca' ? 'En construcció' : language === 'gl' ? 'En construción' : 'En construcción'}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Thumbnail grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${previewCount}, 1fr)`,
                    gap: 'var(--spacing-sm)'
                  }}>
                    {showItems.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setOvLightbox({ profileId: id, slug, itemIndex: idx })}
                        style={{
                          borderRadius: 'var(--radius-md)', overflow: 'hidden',
                          boxShadow: 'var(--shadow-sm)', aspectRatio: '16 / 9',
                          backgroundColor: '#f0f0f0', cursor: 'pointer',
                          position: 'relative', transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                      >
                        <img src={item.src} alt={item.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {item.type === 'video' && (
                          <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'var(--color-primary)', padding: '10px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                          }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '2px' }}>
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Expand / collapse */}
                  {hiddenCount > 0 && (
                    <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                      <button
                        onClick={() => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))}
                        style={{
                          background: 'none', border: '1.5px solid var(--color-border)',
                          borderRadius: '20px', padding: '0.4rem 1.2rem',
                          cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem',
                          color: 'var(--color-text-light)', fontFamily: 'inherit',
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          transition: 'border-color 0.2s, color 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-light)'; }}
                      >
                        {isExpanded
                          ? (language === 'en' ? 'Collapse ↑' : language === 'ca' ? 'Col·lapsar ↑' : 'Ver menos ↑')
                          : (language === 'en' ? `Show ${hiddenCount} more ↓` : language === 'ca' ? `Veure ${hiddenCount} més ↓` : `Ver ${hiddenCount} más ↓`)}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </section>

      {/* Lightbox del perfil general: reutiliza el lightbox completo de PortfolioTab */}
      {ovLightbox && (
        <div style={{ display: 'none' }}>
          <PortfolioTab
            roleId={ovLightbox.profileId}
            externalOpenIndex={ovLightbox.itemIndex}
            onExternalClose={() => setOvLightbox(null)}
            switchProfileSlug={ovLightbox.slug}
            switchProfileLabel={SECTION_TITLES_OV[ovLightbox.profileId]?.[language] || SECTION_TITLES_OV[ovLightbox.profileId]?.es}
            onProjectSelect={onProjectSelect}
            onTabClick={onTabClick}
          />
        </div>
      )}
    </>
  );
};

const PortfolioView = () => {
  const { role, tab } = useParams();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t, language } = useTranslation();

  const activeRoleId = roleKeyMap[role] || 'all';

  // Tab por defecto según el perfil y los flags
  const anyReady = Object.values(PORTFOLIO_READY).some(Boolean);
  const getDefaultTab = (roleId) => {
    if (roleId === 'all') return anyReady ? 'portfolio' : 'sobre-mi';
    return PORTFOLIO_READY[roleId] ? 'portfolio' : 'sobre-mi';
  };

  const [activeTab, setActiveTab] = useState(tab || getDefaultTab(activeRoleId));

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    } else if (!tab) {
      const defaultTab = getDefaultTab(activeRoleId);
      setActiveTab(defaultTab);
      navigate(`/${language}/${role}/${defaultTab}`, { replace: true });
    }
  }, [tab, role, language, navigate]);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tabId) => {
    if (activeTab === tabId) {
      scrollToTop();
    } else {
      setActiveTab(tabId);
      navigate(`/${language}/${role}/${tabId}`);
      // Scroll to top when changing tabs
      setTimeout(() => scrollToTop(), 0);
    }
  };

  useEffect(() => {
    // Scroll to top when role changes
    scrollToTop();
  }, [role]);

  const filteredExperience = useMemo(() => {
    if (activeRoleId === 'all') return experience;
    return experience.filter(item => item.roles.includes(activeRoleId) || item.roles.length === 0);
  }, [activeRoleId]);

  const filteredEducation = useMemo(() => {
    if (activeRoleId === 'all') return education;
    return education.filter(item => item.roles.includes(activeRoleId));
  }, [activeRoleId]);

  const filteredProjects = useMemo(() => {
    // Definimos el orden basado en el archivo proyectos.js
    const projectOrder = projectList.map(p => p.id);
    const visibilityMap = projectList.reduce((acc, p) => {
      acc[p.id] = p.visible;
      return acc;
    }, {});

    const baseProjects = projects.filter(project => {
      // Solo mostrar si está en el archivo proyectos.js Y está marcado como visible
      if (visibilityMap[project.id] === undefined || visibilityMap[project.id] === false) return false;
      
      if (activeRoleId === 'all') return true;
      return project.roles && (project.roles.includes(activeRoleId) || project.roles.includes('all'));
    }).map(project => {
      // Fusionar los datos de proyectos.js (tags, isWIP, etc.) con los de content.js
      const masterProject = projectList.find(p => p.id === project.id);
      return {
        ...project,
        ...masterProject, // Sobrescribimos con lo que haya en la lista maestra (tags, isWIP, etc.)
        // Las traducciones de title/summary/category se mantienen de content.js si masterProject no las tiene
        title: project.title, 
        summary: project.summary,
        category: project.category
      };
    });
    
    // Ordenar según el orden definido en projectList de proyectos.js
    return [...baseProjects].sort((a, b) => {
      const indexA = projectOrder.indexOf(a.id);
      const indexB = projectOrder.indexOf(b.id);
      
      // Si alguno no está en la lista (evitar errores), ponerlo al final
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });
  }, [activeRoleId]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: 'var(--spacing-xl)' }}>
        {/* Sticky Tabs */}
        <div style={{
          position: 'sticky',
          top: '60px', // Below Navbar
          zIndex: 90,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(5px)',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: 'var(--spacing-md)'
        }}>
          <div className="container" style={{ padding: '0 1rem' }}>
            <div className="flex justify-center">
              <div className="flex tabs-container" style={{ width: '100%', justifyContent: 'center' }}>
                {[
                  { id: 'portfolio', label: t('tab_portfolio') },
                  { id: 'sobre-mi', label: t('tab_info') },
                  { id: 'proyectos', label: t('nav_projects') },
                  { id: 'contacto', label: t('nav_contact') }
                ].map(tabItem => (
                  <button
                    key={tabItem.id}
                    onClick={() => handleTabClick(tabItem.id)}
                    style={{
                      padding: '1rem 0.5rem',
                      fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)',
                      fontWeight: 800,
                      color: activeTab === tabItem.id ? 'var(--color-primary)' : 'var(--color-text-light)',
                      borderBottom: `3px solid ${activeTab === tabItem.id ? 'var(--color-primary)' : 'transparent'}`,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      background: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderTop: 'none',
                      marginBottom: '-1px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      flex: isMobile ? '1' : 'none',
                      width: isMobile ? 'auto' : '150px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      opacity: (tabItem.id === 'portfolio' && activeRoleId !== 'all' && !PORTFOLIO_READY[activeRoleId] && activeTab !== 'portfolio') ? 0.45 : 1
                    }}
                  >
                    {tabItem.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {activeTab === 'portfolio' && (
            <div>
              {activeRoleId === 'all' ? (
                // Perfil general: overview con una fila por perfil
                <PortfolioOverview onProjectSelect={setSelectedProject} onTabClick={handleTabClick} />
              ) : PORTFOLIO_READY[activeRoleId] ? (
                // Perfil específico listo
                <PortfolioTab
                  roleId={activeRoleId}
                  onProjectSelect={setSelectedProject}
                  onTabClick={handleTabClick}
                />
              ) : (
                // Perfil específico aún en construcción
                <div className="animate-fade-in" style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 'clamp(360px, 70vh, 460px)' : 'clamp(440px, 55vh, 560px)' }}>

                  {/* Shimmer keyframes */}
                  <style>{`
                    @keyframes skel-shimmer {
                      0%   { background-position: -800px 0; }
                      100% { background-position:  800px 0; }
                    }
                    .skel-block {
                      background: linear-gradient(90deg, #e2e2e2 25%, #ebebeb 50%, #e2e2e2 75%);
                      background-size: 1600px 100%;
                      animation: skel-shimmer 1.8s infinite linear;
                      border-radius: 10px;
                    }
                  `}</style>

                  {/* Skeleton grid — fondo */}
                  <div style={{ opacity: 0.85, pointerEvents: 'none', userSelect: 'none', padding: '2rem 0 0' }}>
                    {isMobile ? (
                      <>
                        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem' }}>
                          {[100, 130].map((w, i) => (
                            <div key={i} className="skel-block" style={{ width: w, height: 30, borderRadius: 20 }} />
                          ))}
                        </div>
                        <div className="skel-block" style={{ width: 130, height: 16, marginBottom: '0.75rem', borderRadius: 6 }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '0.65rem' }}>
                          {[0,1,2,3].map(i => <div key={i} className="skel-block" style={{ aspectRatio: '4/3' }} />)}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                          {[110, 145, 120, 135, 115].map((w, i) => (
                            <div key={i} className="skel-block" style={{ width: w, height: 36, borderRadius: 20 }} />
                          ))}
                        </div>
                        <div className="skel-block" style={{ width: 170, height: 20, marginBottom: '1rem', borderRadius: 6 }} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '0.85rem' }}>
                          {[0,1,2].map(i => <div key={i} className="skel-block" style={{ aspectRatio: '16/9' }} />)}
                        </div>
                        <div className="skel-block" style={{ width: 200, height: 20, marginBottom: '1rem', borderRadius: 6, marginTop: '2rem' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', marginBottom: '0.85rem' }}>
                          {[0,1,2,3].map(i => <div key={i} className="skel-block" style={{ aspectRatio: '4/3' }} />)}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                          {[0,1,2].map(i => <div key={i} className="skel-block" style={{ aspectRatio: '16/9' }} />)}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mensaje superpuesto */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.55) 25%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,1) 75%)',
                    zIndex: 1, padding: '2rem', textAlign: 'center', gap: '1.5rem'
                  }}>
                    <div style={{
                      background: 'white', border: '1.5px solid var(--color-border, #e5e7eb)', borderRadius: '20px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                      padding: isMobile ? '1.25rem 1.25rem' : '2.5rem 3rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: isMobile ? '0.75rem' : '1.25rem',
                      maxWidth: isMobile ? '90vw' : '520px', width: '100%'
                    }}>
                      <svg width={isMobile ? 40 : 64} height={isMobile ? 40 : 64} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <path d="M8 21h8M12 17v4"/>
                        <path d="M8.5 10.5l2 2 4-4"/>
                      </svg>
                      <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.75rem', fontWeight: 900, margin: 0 }}>
                        {language === 'en' ? 'Portfolio — Coming Soon'
                          : language === 'ca' ? 'Portfolio — Pròximament'
                          : language === 'gl' ? 'Portfolio — Proximamente'
                          : 'Portfolio — Próximamente'}
                      </h2>
                      <p style={{ color: 'var(--color-text-light)', maxWidth: '400px', lineHeight: 1.6, margin: 0, fontSize: isMobile ? '0.85rem' : '1rem' }}>
                        {language === 'en'
                          ? 'The image reel is still being prepared. In the meantime, you can browse all projects in detail.'
                          : language === 'ca'
                          ? "El reel d'imatges encara s'està preparant. Mentrestant, pots consultar tots els projectes en detall."
                          : language === 'gl'
                          ? 'O reel de imaxes aínda está en preparación. Mentres tanto, podes consultar todos os proxectos en detalle.'
                          : 'El reel de imágenes todavía está en preparación. Mientras tanto, puedes consultar todos los proyectos en detalle.'}
                      </p>
                      <button
                        onClick={() => handleTabClick('proyectos')}
                        style={{
                          fontFamily: 'inherit', background: 'none', border: 'none',
                          color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 700,
                          padding: '0', display: 'inline-flex', alignItems: 'center', gap: '4px',
                          textDecoration: 'underline', textUnderlineOffset: '3px', transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        {language === 'en' ? 'View projects' : language === 'ca' ? 'Veure projectes' : language === 'gl' ? 'Ver proxectos' : 'Ver proyectos'} →
                      </button>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(var(--color-primary-rgb, 5,150,105), 0.08)',
                        border: '1px solid var(--color-primary)', color: 'var(--color-primary)',
                        borderRadius: '20px', padding: '0.4rem 1.2rem', fontSize: '0.85rem', fontWeight: 700
                      }}>
                        🚧 {language === 'en' ? 'Work in progress' : language === 'ca' ? 'En construcció' : language === 'gl' ? 'En construción' : 'En construcción'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sobre-mi' && (
            <div className="animate-fade-in">
              <Hero roleId={activeRoleId} />
              
              <section id="about">
                <SectionHeader title={language === 'es' ? 'Sobre mí' : language === 'ca' ? 'Sobre mi' : language === 'gl' ? 'Sobre min' : 'About me'} />
                <div 
                  className={`card ${isMobile ? 'about-card-expandable' : ''}`} 
                  style={{ 
                    padding: 'var(--spacing-lg)',
                    paddingBottom: '1.25rem',
                    cursor: isMobile ? 'pointer' : 'default',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                    position: 'relative'
                  }}
                  onClick={() => isMobile && setIsAboutExpanded(!isAboutExpanded)}
                >
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text)', textAlign: 'left', marginBottom: 0 }}>
                    {((aboutByRole[activeRoleId] && aboutByRole[activeRoleId][language]) ? aboutByRole[activeRoleId][language] : (aboutMe[language] || aboutMe.es)).split('\n\n')[0]}
                  </p>
                  
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateRows: (isAboutExpanded || !isMobile) ? '1fr' : '0fr',
                      opacity: (isAboutExpanded || !isMobile) ? 1 : 0,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ 
                        fontSize: '1.05rem', 
                        lineHeight: 1.8, 
                        color: 'var(--color-text)', 
                        whiteSpace: 'pre-line', 
                        textAlign: 'left', 
                        marginTop: '1.5rem',
                        marginBottom: 0
                      }}>
                        {((aboutByRole[activeRoleId] && aboutByRole[activeRoleId][language]) ? aboutByRole[activeRoleId][language] : (aboutMe[language] || aboutMe.es)).split('\n\n').slice(1).join('\n\n')}
                      </p>
                    </div>
                  </div>

                  {/* Location always visible below the content */}
                  <div style={{ 
                    marginTop: '1rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.95rem',
                    color: 'var(--color-text-light)',
                    width: '100%'
                  }}>
                    <span style={{ fontSize: '1rem' }}>📍</span>
                    <strong>
                      {language === 'es' ? 'Ubicación actual:' : 
                        language === 'ca' ? 'Ubicació actual:' : 
                        language === 'gl' ? 'Ubicación actual:' : 
                        'Current location:'}
                    </strong>
                    <span>Madrid</span>
                  </div>

                  {isMobile && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      marginTop: '1.25rem',
                      color: 'var(--color-primary)',
                      opacity: 0.6
                    }}>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{ 
                          transform: isAboutExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </section>

              <section id="featured-projects">
                <SectionHeader title={t('section_projects_title')} />
                <FeaturedProjects
                  projects={filteredProjects}
                  onProjectSelect={setSelectedProject}
                  onViewAll={() => handleTabClick('proyectos')}
                />
              </section>

              <section id="skills">
                <SectionHeader title={t('skills_title')} />
                <SkillsSection activeRole={activeRoleId} />
              </section>

              <section id="experience">
                <SectionHeader title={language === 'es' ? 'Trayectoria Profesional' : language === 'gl' ? 'Traxectoria Profesional' : 'Professional Path'} />
                <ExperienceTimeline
                  experience={filteredExperience}
                  education={filteredEducation}
                />
              </section>

              <section id="aptitudes">
                <SectionHeader title={language === 'es' ? 'Idiomas y Aptitudes' : language === 'gl' ? 'Idiomas e Aptitudes' : language === 'ca' ? 'Idiomes i Aptituds' : 'Languages & Aptitudes'} />
                <LanguagesAptitudes languages={languages} aptitudes={aptitudes} activeRole={activeRoleId} />
              </section>
            </div>
          )}

          {activeTab === 'proyectos' && (
            <div className="animate-fade-in">
              <section id="projects">
                <SectionHeader title={t('section_projects_title')} />
                <ProjectsGallery
                  projects={filteredProjects}
                  onProjectSelect={setSelectedProject}
                />
              </section>
            </div>
          )}

          {activeTab === 'contacto' && (
            <div className="animate-fade-in">
              <section id="contact">
                <SectionHeader title={t('section_contact_title')} />
                <ContactSection />
              </section>
            </div>
          )}
        </div>
      </main>

      <footer style={{ backgroundColor: 'white', borderTop: '1px solid var(--color-border)', padding: '2rem 0', marginTop: 'auto' }}>
        <div className="container flex flex-col items-center gap-xs">
          <button
            onClick={() => navigate('/')}
            className="hover:text-primary transition-colors"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontWeight: 900,
              fontSize: '1.25rem',
              letterSpacing: '1px',
              color: 'var(--color-text)'
            }}
          >
            Mario Villanueva Torres
          </button>
          <p style={{ opacity: 0.6, fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            {language === 'es' ? 'Portafolio Profesional' : 
             language === 'ca' ? 'Portafoli Professional' : 
             language === 'gl' ? 'Portafolio Profesional' : 
             'Professional Portfolio'}
          </p>
          <p style={{ opacity: 0.4, fontSize: '0.75rem', marginTop: '1rem', color: 'var(--color-text-light)' }}>&copy; 2026</p>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {!selectedProject && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center transition-all animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'white',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            zIndex: 900 // Lower than modal (2000)
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          aria-label="Back to Top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      {/* Debug panel removed */}

      {/* Modal is rendered here to avoid stacking context issues inside animated tabs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

const RoleRedirect = () => {
  const { role } = useParams();
  const { language } = useTranslation();
  // If role is a valid language, it will be handled by the lang routes.
  // This is for cases like /perfil-general
  return <Navigate to={`/${language}/${role}`} replace />;
};

const LanguageRouteWrapper = ({ component }) => {
  const { lang } = useParams();
  const { language } = useTranslation();
  
  if (!validLangs.includes(lang)) {
    // If it's not a valid lang, try to treat it as a role or just go to /es
    return <Navigate to={`/${language}/${lang}`} replace />;
  }
  
  return component;
};

function App() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/es" replace />} />
      
      {/* Routes with language */}
      <Route path="/:lang" element={<LanguageRouteWrapper component={<LandingPage />} />} />
      <Route path="/:lang/:role" element={<LanguageRouteWrapper component={<PortfolioView />} />} />
      <Route path="/:lang/:role/:tab" element={<LanguageRouteWrapper component={<PortfolioView />} />} />
      
      {/* Catch-all or missing lang (e.g., /perfil-general) */}
      <Route path="/:role" element={<RoleRedirect />} />
    </Routes>
  );
}

export default App;
