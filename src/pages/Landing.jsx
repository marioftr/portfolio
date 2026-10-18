import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ROLE_ORDER, ROLE_SLUGS, roleTitle, defaultTabFor } from '../lib/roles';
import { socialLinks } from '../data/content';
import LanguageDropdown from '../components/LanguageDropdown';
import ThemeToggle from '../components/ThemeToggle';
import ProfilePhoto from '../components/ProfilePhoto';
import Icon from '../components/Icon';
import Footer from '../components/Footer';

const BIO = {
  es: 'Perfil multidisciplinar centrado en diseño de videojuegos, modelado y animación 3D, y edición de vídeo.',
  ca: 'Perfil multidisciplinar centrat en disseny de videojocs, modelatge i animació 3D, i edició de vídeo.',
  gl: 'Perfil multidisciplinar centrado en deseño de videoxogos, modelado e animación 3D, e edición de vídeo.',
  en: 'A multidisciplinary profile focused on game design, 3D modeling and animation, and video editing.',
};

const TAGLINES = {
  all: {
    es: 'Todo el trabajo, sin filtrar por disciplina', en: 'Everything, across every discipline',
    ca: 'Tota la feina, sense filtrar per disciplina', gl: 'Todo o traballo, sen filtrar por disciplina',
  },
  artist_2d_3d: {
    es: 'Modelado, esculpido y texturizado para videojuegos', en: '3D modeling, sculpting and texturing for games',
    ca: 'Modelatge, escultura i texturització per a videojocs', gl: 'Modelado, escultura e texturizado para videoxogos',
  },
  game_dev: {
    es: 'Diseño de sistemas jugables y programación en Unity/Unreal', en: 'Gameplay systems design and Unity/Unreal programming',
    ca: 'Disseny de sistemes jugables i programació en Unity/Unreal', gl: 'Deseño de sistemas xogables e programación en Unity/Unreal',
  },
  video_editor: {
    es: 'Montaje, etalonaje y motion graphics', en: 'Editing, color grading and motion graphics',
    ca: 'Muntatge, etalonatge i motion graphics', gl: 'Montaxe, etalonaxe e motion graphics',
  },
};

const SELECT_LABEL = { es: 'Elige un perfil', en: 'Choose a profile', ca: 'Tria un perfil', gl: 'Escolle un perfil' };

export default function Landing() {
  const { language, t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-4 pt-14 sm:pt-20 pb-10 flex flex-col">
        {/* Masthead */}
        <div className="mb-14 sm:mb-20">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-5">
            {language === 'en' ? 'Professional Portfolio' : 'Portfolio Profesional'}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-12">
            <div className="min-w-0">
              <h1 className="font-display font-medium leading-[0.98] text-ink text-[clamp(2.6rem,8vw,5.5rem)]">
                Mario<br />Villanueva<br />Torres
              </h1>
              <p className="mt-6 text-ink-light text-base sm:text-lg max-w-md leading-relaxed">
                {BIO[language] || BIO.es}
              </p>
            </div>
            <ProfilePhoto src="/images/foto_perfil.jpg" size="xl" className="self-center sm:self-start" />
          </div>
        </div>

        {/* Role index */}
        <p className="text-ink-light text-xs font-bold uppercase tracking-[0.2em] mb-1">{SELECT_LABEL[language] || SELECT_LABEL.es}</p>
        <div className="border-t border-ink/80">
          {ROLE_ORDER.map((id, idx) => (
            <button
              key={id}
              onClick={() => navigate(`/${language}/${ROLE_SLUGS[id]}/${defaultTabFor(id)}`)}
              className="group w-full flex items-center gap-4 sm:gap-8 py-5 sm:py-7 border-b border-border text-left transition-colors hover:bg-surface"
            >
              <span className="font-display text-ink-light text-sm w-6 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
              <span className="flex-1 min-w-0">
                <span className="font-display text-2xl sm:text-4xl font-medium text-ink group-hover:text-primary transition-colors block">
                  {roleTitle(id, language)}
                </span>
                <span className="hidden sm:block text-ink-light text-sm mt-1">{TAGLINES[id]?.[language] || TAGLINES[id]?.es}</span>
              </span>
              <Icon name="chevronRight" size={22} strokeWidth={1.5} className="shrink-0 text-ink-light group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-t border-border">
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.name}
              className="text-ink-light hover:text-primary transition-colors"
            >
              <Icon name={link.icon === 'youtube' ? 'youtubeFilled' : link.icon} size={17} strokeWidth={2} />
            </a>
          ))}
          <a
            href={language === 'en' ? '/downloads/CV_Mario_Villanueva_en_jul26.pdf' : '/downloads/CV_Mario_Villanueva_es_jul26.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink border-b border-ink/40 hover:border-primary hover:text-primary transition-colors"
          >
            <Icon name="view" size={14} />
            {t('hero_download_cv')}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <LanguageDropdown align="right" />
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-4 pb-6">
        <Footer />
      </div>
    </div>
  );
}
