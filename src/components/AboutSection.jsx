import { useTranslation } from '../hooks/useTranslation';
import { aboutMe, aboutByRole, experience, education, languages, aptitudes } from '../data/content';
import { roleTagline } from '../lib/roles';
import SectionTitle from './SectionTitle';
import FeaturedProjects from './FeaturedProjects';
import SkillsGrid from './SkillsGrid';
import Timeline from './Timeline';
import LanguagesAptitudes from './LanguagesAptitudes';

const LOCATION_LABEL = { es: 'Ubicación actual', ca: 'Ubicació actual', gl: 'Ubicación actual', en: 'Current location' };
const ABOUT_EYEBROW = { es: 'Perfil', ca: 'Perfil', gl: 'Perfil', en: 'Profile' };
const EXPERIENCE_TITLE = { es: 'Trayectoria', gl: 'Traxectoria', ca: 'Trajectòria', en: 'Path' };
const EXPERIENCE_EYEBROW = { es: 'Experiencia y formación', gl: 'Experiencia e formación', ca: 'Experiència i formació', en: 'Experience & education' };
const APTITUDES_TITLE = { es: 'Idiomas y aptitudes', gl: 'Idiomas e aptitudes', ca: 'Idiomes i aptituds', en: 'Languages & aptitudes' };

function filterByRole(items, roleId) {
  if (roleId === 'all') return items;
  return items.filter((item) => item.roles.includes(roleId) || item.roles.length === 0);
}

export default function AboutSection({ roleId, projects, onProjectSelect, onViewAll }) {
  const { t, language } = useTranslation();

  const bio = (aboutByRole[roleId]?.[language]) || aboutMe[language] || aboutMe.es;
  const paragraphs = bio.split('\n\n');

  const filteredExperience = filterByRole(experience, roleId);
  const filteredEducation = roleId === 'all' ? education : education.filter((item) => item.roles.includes(roleId));

  return (
    <div>
      <section>
        <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">{ABOUT_EYEBROW[language] || ABOUT_EYEBROW.es}</p>
        <h1 className="font-display text-2xl sm:text-4xl leading-[1.05] font-medium mb-6">{roleTagline(roleId, language)}</h1>
        <div className="flex flex-col gap-4 max-w-xl text-ink-light text-base leading-relaxed">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <p className="mt-6 text-sm text-ink-light">
          <span className="font-semibold text-ink">{LOCATION_LABEL[language] || LOCATION_LABEL.es}</span> — Madrid
        </p>
      </section>

      <section className="mt-20 pt-16 border-t border-border">
        <SectionTitle eyebrow={t('nav_projects')} title={t('section_projects_title')} />
        <FeaturedProjects projects={projects} onProjectSelect={onProjectSelect} onViewAll={onViewAll} />
      </section>

      <section className="mt-20 pt-16 border-t border-border">
        <SectionTitle eyebrow={t('nav_skills')} title={t('skills_title')} />
        <SkillsGrid activeRole={roleId} />
      </section>

      <section className="mt-20 pt-16 border-t border-border">
        <SectionTitle eyebrow={EXPERIENCE_EYEBROW[language] || EXPERIENCE_EYEBROW.es} title={EXPERIENCE_TITLE[language] || EXPERIENCE_TITLE.es} />
        <Timeline experience={filteredExperience} education={filteredEducation} />
      </section>

      <section className="mt-20 pt-16 border-t border-border">
        <SectionTitle eyebrow={t('languages_title')} title={APTITUDES_TITLE[language] || APTITUDES_TITLE.es} />
        <LanguagesAptitudes languages={languages} aptitudes={aptitudes} activeRole={roleId} />
      </section>
    </div>
  );
}
