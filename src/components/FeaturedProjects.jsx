import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import ProjectCard from './ProjectCard';
import Icon from './Icon';

export default function FeaturedProjects({ projects, onProjectSelect, onViewAll }) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * scrollRef.current.clientWidth * 0.9, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            aria-label="Anterior"
            className="w-8 h-8 border border-border flex items-center justify-center text-ink-light hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Icon name="chevronLeft" size={15} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            aria-label="Siguiente"
            className="w-8 h-8 border border-border flex items-center justify-center text-ink-light hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Icon name="chevronRight" size={15} strokeWidth={2.5} />
          </button>
        </div>
        <button onClick={onViewAll} className="text-primary font-bold uppercase text-xs tracking-wide ml-auto">
          {t('view_all_projects')}
        </button>
      </div>

      <div ref={scrollRef} onScroll={checkScroll} className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {projects.slice(0, 6).map((project) => (
          <div key={project.id} className="snap-start shrink-0 w-[min(340px,80vw)]">
            <ProjectCard project={project} onSelect={onProjectSelect} compact />
          </div>
        ))}
      </div>
    </div>
  );
}
