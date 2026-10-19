import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DEMO_REEL_URL } from '../data/portfolioImages';
import Icon from './Icon';

const REEL_DURATION = '2:35';

const TEXT = {
  eyebrow: { es: 'Demo Reel', en: 'Demo Reel', ca: 'Demo Reel', gl: 'Demo Reel' },
  title: { es: 'El reel, antes que nada', en: 'The showreel, first', ca: 'El reel, abans de res', gl: 'O reel, antes que nada' },
  watch: { es: 'Ver reel completo', en: 'Watch the full reel', ca: 'Veure el reel complet', gl: 'Ver o reel completo' },
  close: { es: 'Cerrar', en: 'Close', ca: 'Tancar', gl: 'Pechar' },
};
const label = (dict, language) => dict[language] || dict.es;

function ReelModal({ language, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const src = DEMO_REEL_URL.includes('?') ? `${DEMO_REEL_URL}&autoplay=1&rel=0` : `${DEMO_REEL_URL}?autoplay=1&rel=0`;

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-10" onClick={onClose}>
      <button
        onClick={onClose}
        aria-label={label(TEXT.close, language)}
        className="absolute top-4 right-4 w-11 h-11 border border-white/30 text-white hover:border-white transition-colors flex items-center justify-center"
      >
        <Icon name="close" size={20} strokeWidth={2} />
      </button>
      <div className="w-full max-w-5xl aspect-video bg-black" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={src}
          title="Demo Reel 3D"
          className="w-full h-full border-0"
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>,
    document.body,
  );
}

// Cabecera del portfolio: título + cinta a todo lo ancho con un bucle mudo de
// extractos del reel. El reel completo (con sonido) solo se carga al pulsar.
export default function ReelBanner({ language }) {
  const videoRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [animated] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    return !reduced && !saveData;
  });

  // Solo se reproduce mientras está a la vista.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !animated) return undefined;
    // React no refleja `muted` como atributo; sin él, el navegador bloquea el autoplay.
    video.muted = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div className="mb-16">
      <p className="text-primary font-bold uppercase text-xs tracking-[0.15em] mb-2">{label(TEXT.eyebrow, language)}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-medium mb-6">{label(TEXT.title, language)}</h2>

      {/* A todo lo ancho de la zona de contenido, más allá de la columna de texto */}
      <div className="relative left-1/2 -translate-x-1/2 w-[100cqw]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full aspect-[2/1] overflow-hidden bg-black text-left"
          aria-label={`${label(TEXT.watch, language)} (${REEL_DURATION})`}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/media/reel-teaser.mp4"
            poster="/media/reel-poster.jpg"
            muted
            autoPlay={animated}
            loop
            playsInline
            preload={animated ? 'auto' : 'none'}
            aria-hidden="true"
            tabIndex={-1}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-5 bottom-5 sm:left-8 sm:bottom-7 inline-flex items-center gap-3 border-2 border-white bg-black/30 px-4 py-2.5 text-white text-sm font-bold group-hover:bg-white group-hover:text-black transition-colors">
            <Icon name="play" size={14} strokeWidth={2} className="fill-current" />
            {label(TEXT.watch, language)}
            <span className="font-medium opacity-80 tabular-nums">{REEL_DURATION}</span>
          </span>
        </button>
      </div>

      {open && <ReelModal language={language} onClose={() => setOpen(false)} />}
    </div>
  );
}
