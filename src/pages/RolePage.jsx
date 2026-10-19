import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { SLUG_TO_ROLE, TABS, defaultTabFor } from '../lib/roles';
import { buildFilteredProjects } from '../lib/projects';
import Sidebar from '../components/Sidebar';
import AboutSection from '../components/AboutSection';
import PortfolioGallery from '../components/PortfolioGallery';
import ContactSection from '../components/ContactSection';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';

export default function RolePage() {
  const { role, tab } = useParams();
  const navigate = useNavigate();
  const { language } = useTranslation();

  const activeRoleId = SLUG_TO_ROLE[role] || 'all';

  useEffect(() => {
    if (!tab) {
      navigate(`/${language}/${role}/${defaultTabFor()}`, { replace: true });
    }
  }, [tab, role, language, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [role, tab]);

  const activeTab = TABS.includes(tab) ? tab : defaultTabFor();
  const filteredProjects = buildFilteredProjects(activeRoleId);

  const handleTabClick = (tabId) => navigate(`/${language}/${role}/${tabId}`);
  const goToProject = (project) => navigate(`/${language}/${role}/proyectos/${project.id}`);

  return (
    <div className="min-h-dvh bg-bg">
      <Sidebar activeRoleId={activeRoleId} role={role} activeTab={activeTab} />

      <main className="lg:pl-68 overflow-x-clip [container-type:inline-size]">
        <div className="max-w-4xl mx-auto px-5 sm:px-10 lg:px-16 pt-10 lg:pt-16 pb-24">
          {activeTab === 'portfolio' && (
            <PortfolioGallery roleId={activeRoleId} onProjectSelect={goToProject} />
          )}

          {activeTab === 'sobre-mi' && (
            <AboutSection roleId={activeRoleId} projects={filteredProjects} onProjectSelect={goToProject} onViewAll={() => handleTabClick('portfolio')} />
          )}

          {activeTab === 'contacto' && (
            <section>
              <ContactSection />
            </section>
          )}

          <Footer className="mt-24 pt-6 border-t border-border" />
        </div>
      </main>

      <BackToTop />
    </div>
  );
}
