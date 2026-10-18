import { Suspense, lazy, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../hooks/useTranslation';
import { MODEL_GROUPS } from '../data/models3d';
import Icon from './Icon';

// three.js se carga solo al abrir el primer modelo.
const ModelViewer = lazy(() => import('./ModelViewer'));

export const MODELS_SECTION_ID = 'modelos-3d';

const TEXT = {
  title: { es: 'Modelos 3D', en: '3D models', ca: 'Models 3D', gl: 'Modelos 3D' },
  intro: {
    es: 'Todos los assets del proyecto, listos para explorar. Pulsa uno para verlo en 3D, con su malla y sus texturas.',
    en: 'Every asset in the project, ready to explore. Select one to view it in 3D, with its mesh and textures.',
    ca: 'Tots els assets del projecte, a punt per explorar. Prem-ne un per veure\'l en 3D, amb la seva malla i les seves textures.',
    gl: 'Todos os assets do proxecto, listos para explorar. Preme un para velo en 3D, coa súa malla e as súas texturas.',
  },
  close: { es: 'Cerrar', en: 'Close', ca: 'Tancar', gl: 'Pechar' },
  prev: { es: 'Anterior', en: 'Previous', ca: 'Anterior', gl: 'Anterior' },
  next: { es: 'Siguiente', en: 'Next', ca: 'Següent', gl: 'Seguinte' },
};

const label = (dict, language) => dict[language] || dict.es;

function ModelLightbox({ models, index, onChange, onClose, language }) {
  const model = models[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && index > 0) onChange(index - 1);
      if (e.key === 'ArrowRight' && index < models.length - 1) onChange(index + 1);
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [index, models.length, onChange, onClose]);

  const navButton = 'w-11 h-11 border border-white/30 text-white hover:border-white transition-colors flex items-center justify-center disabled:opacity-30 disabled:hover:border-white/30';

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col px-4 sm:px-10 pt-4 pb-4 gap-3" onClick={onClose}>
      <div className="shrink-0 flex items-center justify-between gap-3" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="text-primary text-[0.7rem] font-black uppercase tracking-[2px]">{label(MODEL_GROUPS[model.group], language)}</p>
          <h3 className="text-white font-bold text-lg sm:text-2xl truncate">{label(model.name, language)}</h3>
        </div>
        <button onClick={onClose} aria-label={label(TEXT.close, language)} className={`${navButton} shrink-0`}>
          <Icon name="close" size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-stretch justify-center">
        <Suspense fallback={null}>
          <ModelViewer key={model.url} url={model.url} language={language} />
        </Suspense>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onChange(index - 1)} disabled={index === 0} aria-label={label(TEXT.prev, language)} className={navButton}>
          <Icon name="chevronLeft" size={20} strokeWidth={2.5} />
        </button>
        <span className="text-white/60 text-sm tabular-nums min-w-16 text-center">{index + 1} / {models.length}</span>
        <button onClick={() => onChange(index + 1)} disabled={index === models.length - 1} aria-label={label(TEXT.next, language)} className={navButton}>
          <Icon name="chevronRight" size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function Models3DSection({ models }) {
  const { language } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const groups = Object.keys(MODEL_GROUPS)
    .map((id) => ({ id, items: models.map((m, i) => ({ ...m, index: i })).filter((m) => m.group === id) }))
    .filter((g) => g.items.length > 0);

  return (
    <section id={MODELS_SECTION_ID} className="mt-14 pt-10 border-t border-border scroll-mt-24">
      <h2 className="font-display text-2xl sm:text-3xl font-medium mb-2">
        {label(TEXT.title, language)} <span className="text-ink-light text-lg font-normal">({models.length})</span>
      </h2>
      <p className="text-ink-light leading-relaxed max-w-xl mb-8">{label(TEXT.intro, language)}</p>

      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.id}>
            <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-3 pb-2 border-b border-border">
              {label(MODEL_GROUPS[group.id], language)}
            </p>
            <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-6">
              {group.items.map((m) => (
                <li key={m.file}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(m.index)}
                    className="group w-full flex items-center gap-3 py-2.5 text-left text-sm font-semibold text-ink hover:text-primary transition-colors border-b border-border/60"
                  >
                    <Icon name="box" size={15} strokeWidth={2} className="shrink-0 text-ink-light group-hover:text-primary transition-colors" />
                    <span className="flex-1 min-w-0 leading-snug">{label(m.name, language)}</span>
                    <Icon name="chevronRight" size={14} strokeWidth={2.5} className="shrink-0 text-ink-light group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <ModelLightbox models={models} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} language={language} />
      )}
    </section>
  );
}
