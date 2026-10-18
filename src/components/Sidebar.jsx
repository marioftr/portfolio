import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { socialLinks } from '../data/content';
import { ROLE_ORDER, ROLE_SLUGS, ROLE_ICONS, TABS, roleTitle, defaultTabFor } from '../lib/roles';
import LanguageDropdown from './LanguageDropdown';
import ThemeToggle from './ThemeToggle';
import Icon from './Icon';

const TAB_LABEL_KEY = { portfolio: 'tab_portfolio', 'sobre-mi': 'tab_info', contacto: 'nav_contact' };

function RoleSwitcher({ activeRoleId, language, navigate, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const goToRole = (id) => {
    navigate(`/${language}/${ROLE_SLUGS[id]}/${defaultTabFor(id)}`);
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 border border-border text-left hover:border-primary/50 transition-colors"
      >
        <Icon name={ROLE_ICONS[activeRoleId]} size={15} strokeWidth={2} className="text-primary shrink-0" />
        <span className="flex-1 text-xs font-bold uppercase tracking-wide leading-tight">{roleTitle(activeRoleId, language)}</span>
        <Icon name="chevronDown" size={12} strokeWidth={2.5} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-card border border-border shadow-lg z-50 animate-fade-up">
          {ROLE_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => goToRole(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide border-b border-border last:border-b-0 transition-colors ${
                activeRoleId === id ? 'text-primary bg-primary-light' : 'text-ink hover:bg-surface'
              }`}
            >
              <Icon name={ROLE_ICONS[id]} size={14} strokeWidth={2} className="shrink-0" />
              <span className="flex-1 leading-tight">{roleTitle(id, language)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavContent({ activeRoleId, activeTab, visibleTabs, language, t, navigate, role, onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      <Link to={`/${language}`} onClick={onNavigate} className="block mb-4 lg:mb-8 max-lg:whitespace-nowrap">
        <span className="font-display text-2xl max-lg:text-xl font-medium leading-none block max-lg:inline">Mario</span>{' '}
        <span className="font-display text-2xl max-lg:text-xl font-medium leading-none block max-lg:inline">Villanueva Torres</span>
      </Link>

      <RoleSwitcher activeRoleId={activeRoleId} language={language} navigate={navigate} onNavigate={onNavigate} />

      <nav className="flex flex-col mt-4 lg:mt-8">
        {visibleTabs.map((tabId) => (
          <Link
            key={tabId}
            to={`/${language}/${role}/${tabId}`}
            onClick={onNavigate}
            className={`group flex items-center gap-3 max-lg:py-2 lg:py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tabId ? 'text-primary' : 'text-ink-light hover:text-ink'
            }`}
          >
            <span className={`h-px shrink-0 transition-all ${activeTab === tabId ? 'w-6 bg-primary' : 'w-4 bg-border group-hover:bg-ink-light'}`} />
            {t(TAB_LABEL_KEY[tabId])}
          </Link>
        ))}
      </nav>

      <div className="flex-1 min-h-2 lg:min-h-8" />

      <a
        href={language === 'en' ? '/downloads/CV_Mario_Villanueva_en_jul26.pdf' : '/downloads/CV_Mario_Villanueva_es_jul26.pdf'}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-primary transition-colors mb-2 lg:mb-5 w-fit max-lg:min-h-10"
      >
        <Icon name="view" size={15} />
        {t('hero_download_cv')}
      </a>

      <div className="flex items-center gap-1 lg:gap-3 mb-2 lg:mb-5 max-lg:-ml-2.5">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className="text-ink-light hover:text-primary transition-colors max-lg:w-11 max-lg:h-11 max-lg:flex max-lg:items-center max-lg:justify-center"
          >
            <Icon name={link.icon === 'youtube' ? 'youtubeFilled' : link.icon} size={16} strokeWidth={2} className="max-lg:w-6 max-lg:h-6" />
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <LanguageDropdown align="left" buttonClassName="max-lg:h-11" />
        <ThemeToggle className="max-lg:w-11 max-lg:h-11" />
      </div>
    </div>
  );
}

export default function Sidebar({ activeRoleId, role, activeTab }) {
  const { language, t } = useTranslation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleTabs = TABS;

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-68 border-r border-border bg-surface/50 px-7 py-9 overflow-y-auto">
        <NavContent
          activeRoleId={activeRoleId}
          activeTab={activeTab}
          visibleTabs={visibleTabs}
          language={language}
          t={t}
          navigate={navigate}
          role={role}
        />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center gap-1 pl-2 pr-4 h-14 bg-bg/90 backdrop-blur border-b border-border">
        <button onClick={() => setMobileOpen(true)} aria-label="Abrir menú" className="w-11 h-11 flex items-center justify-center text-ink shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <Link to={`/${language}`} className="font-display text-lg font-medium whitespace-nowrap">
          <span className="hidden min-[320px]:inline">Mario Villanueva Torres</span>
          <span className="min-[320px]:hidden">M. V. T.</span>
        </Link>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-60 ${mobileOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        <div className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-bg border-r border-border px-6 pt-3 pb-2 flex flex-col overflow-y-auto transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-end -mt-3 -mr-3 shrink-0">
            <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="w-11 h-11 flex items-center justify-center text-ink-light hover:text-ink">
              <Icon name="close" size={22} strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <NavContent
              activeRoleId={activeRoleId}
              activeTab={activeTab}
              visibleTabs={visibleTabs}
              language={language}
              t={t}
              navigate={navigate}
              role={role}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
