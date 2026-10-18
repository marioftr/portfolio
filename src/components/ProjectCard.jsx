import { useTranslation } from '../hooks/useTranslation';
import { allSkills } from '../data/content';
import Icon from './Icon';

const WIP_LABEL = { es: 'En proceso', en: 'In progress', ca: 'En procés', gl: 'En proceso' };

export default function ProjectCard({ project, onSelect, compact = false }) {
  const { language, t } = useTranslation();
  const title = project.title[language] || project.title.es || project.title;
  const category = project.category?.[language] || project.category?.es;
  const summary = project.summary?.[language] || project.summary?.es;
  const tags = compact ? (project.tags || []).slice(0, 2) : project.tags || [];

  return (
    <div
      onClick={() => onSelect(project)}
      className="group bg-card border border-border hover:border-ink/30 transition-colors cursor-pointer flex flex-col overflow-hidden h-full"
    >
      <div className={`relative bg-surface overflow-hidden ${compact ? 'aspect-[21/9]' : 'aspect-video'}`}>
        {project.image && (
          <img src={project.image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-[1.03] transition-[transform,filter] duration-500" />
        )}
        <span className="absolute top-2 right-2 bg-bg/90 text-ink text-xs font-bold px-2 py-0.5">
          {project.year}
        </span>
        {project.isWIP && (
          <span className="absolute top-2 left-2 bg-ink text-bg text-[0.65rem] font-bold uppercase px-2 py-0.5">
            {WIP_LABEL[language] || WIP_LABEL.es}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className={`font-display font-medium leading-snug mb-0.5 ${compact ? 'text-base' : 'text-xl'}`}>{title}</h3>
        <p className="text-primary font-bold uppercase text-[0.65rem] tracking-wide mb-2">{category}</p>

        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tagId) => (
            <span key={tagId} className="tag text-[0.65rem] py-0.5 px-1.5 uppercase font-bold">
              {allSkills[tagId]?.name || tagId}
            </span>
          ))}
          {compact && project.tags?.length > 2 && (
            <span className="text-[0.65rem] font-bold text-ink-light">+{project.tags.length - 2}</span>
          )}
        </div>

        <p className={`text-ink-light flex-1 ${compact ? 'text-xs line-clamp-3' : 'text-sm'}`}>{summary}</p>

        {!compact && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-primary font-bold text-sm group-hover:gap-2.5 transition-all">
            {t('more_info')}
            <Icon name="chevronRight" size={14} strokeWidth={2.5} />
          </span>
        )}
      </div>
    </div>
  );
}
