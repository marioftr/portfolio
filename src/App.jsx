import { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceTimeline from './components/Timeline';
import ProjectsGallery from './components/ProjectsGallery';
import FeaturedProjects from './components/FeaturedProjects';
import ContactSection from './components/Contact';
import SkillsSection from './components/SkillsSection';
import LanguagesAptitudes from './components/LanguagesAptitudes';
import ProjectModal from './components/ProjectModal';
import LandingPage from './components/LandingPage';
import { useTranslation } from './hooks/useTranslation';
import { experience, education, projects, languages, aptitudes, aboutMe, aboutByRole } from './data/content';

const roleKeyMap = {
  'perfil-general': 'all',
  'editor-video': 'video_editor',
  'programador-videojuegos': 'game_dev',
  'animador': 'artist_2d_3d',
  'artista-3d': 'artist_2d_3d'
};

const SectionHeader = ({ title }) => (
  <div className="section-title animate-fade-in" style={{ marginTop: '3rem', marginBottom: 'var(--spacing-lg)' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textAlign: 'center' }}>{title}</h2>
    <div className="title-underline" style={{ margin: '0.5rem auto 0' }} />
  </div>
);

const PortfolioView = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t, language } = useTranslation();

  const activeRoleId = roleKeyMap[role] || 'all';

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
    if (activeRoleId === 'all') return projects;
    return projects.filter(project => project.roles && (project.roles.includes(activeRoleId) || project.roles.includes('all')));
  }, [activeRoleId]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: 'var(--spacing-xl)' }}>
        <Hero roleId={activeRoleId} />

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
              <div className="flex tabs-container" style={{ gap: '1rem', width: '100%', justifyContent: 'center' }}>
                {[
                  { id: 'info', label: { es: 'Información', ca: 'Informació', gl: 'Información', en: 'Information' } },
                  { id: 'projects', label: { es: 'Proyectos', ca: 'Projectes', gl: 'Proxectos', en: 'Projects' } },
                  { id: 'contact', label: { es: 'Contacto', ca: 'Contacte', gl: 'Contacto', en: 'Contact' } }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    style={{
                      padding: '1rem 0.25rem',
                      fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)',
                      fontWeight: 800,
                      color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-light)',
                      borderBottom: `3px solid ${activeTab === tab.id ? 'var(--color-primary)' : 'transparent'}`,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      background: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderTop: 'none',
                      marginBottom: '-1px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      flex: '1',
                      maxWidth: '120px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label[language] || tab.label.es}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {activeTab === 'info' && (
            <div className="animate-fade-in">
              <section id="about">
                <SectionHeader title={language === 'es' ? 'Sobre mí' : language === 'ca' ? 'Sobre mi' : language === 'gl' ? 'Sobre min' : 'About me'} />
                <div 
                  className={`card ${isMobile ? 'about-card-expandable' : ''}`} 
                  style={{ 
                    padding: 'var(--spacing-lg)',
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
                    marginTop: '1.5rem', 
                    paddingTop: '1.5rem', 
                    borderTop: '1px solid var(--color-border)',
                    fontSize: '0.95rem',
                    color: 'var(--color-text-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <strong>
                      {language === 'es' ? '📍 Ubicación actual:' : 
                        language === 'ca' ? '📍 Ubicació actual:' : 
                        language === 'gl' ? '📍 Ubicación actual:' : 
                        '📍 Current location:'}
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
                  onViewAll={() => handleTabClick('projects')}
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
                <SectionHeader title={language === 'es' ? 'Idiomas y Aptitudes' : language === 'gl' ? 'Idiomas e Aptitudes' : 'Languages & Aptitudes'} />
                <LanguagesAptitudes languages={languages} aptitudes={aptitudes} activeRole={activeRoleId} />
              </section>
            </div>
          )}

          {activeTab === 'projects' && (
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

          {activeTab === 'contact' && (
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
            {language === 'es' ? 'Portafolio Profesional' : 'Professional Portfolio'}
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:role" element={<PortfolioView />} />
    </Routes>
  );
}

export default App;
