import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { profileImages, SECTION_TITLES, GENERAL_PROFILE_ORDER, DEMO_REEL_URL } from '../data/portfolioImages';
import portfolioContent from '../data/portfolio_content.json';
import { buildFilteredProjects } from '../lib/projects';
import { allSkills } from '../data/content';
import Icon from './Icon';

const PLATFORM_NAMES = { artstation: 'ArtStation', github: 'GitHub', itch: 'itch.io', behance: 'Behance', vimeo: 'Vimeo', youtube: 'YouTube' };
const FULL_PROJECT_LABEL = { es: 'Proyecto completo', en: 'Full project', ca: 'Projecte complet', gl: 'Proxecto completo' };
const TYPE_LABELS = {
  all: { es: 'Todos', en: 'All', gl: 'Todos', ca: 'Tots' },
  academic: { es: 'Académico', en: 'Academic', gl: 'Académico', ca: 'Acadèmic' },
  professional: { es: 'Profesional', en: 'Professional', gl: 'Profesional', ca: 'Professional' },
  personal: { es: 'Personal', en: 'Personal', gl: 'Persoal', ca: 'Personal' },
};
const VIEW_MODE_LABELS = {
  large: { es: 'Grande', en: 'Large', ca: 'Gran', gl: 'Grande' },
  medium: { es: 'Mediano', en: 'Medium', ca: 'Mitjà', gl: 'Mediano' },
  list: { es: 'Lista', en: 'List', ca: 'Llista', gl: 'Lista' },
};
const SORT_LABELS = {
  desc: { es: 'Más reciente primero', en: 'Newest first', ca: 'Més recent primer', gl: 'Máis recente primeiro' },
  asc: { es: 'Más antiguo primero', en: 'Oldest first', ca: 'Més antic primer', gl: 'Máis antigo primeiro' },
};

function localized(field, language) {
  if (!field) return '';
  return typeof field === 'string' ? field : (field[language] || field.es);
}

// Título y descripción cortos de una pieza visual concreta (no del proyecto
// entero): vienen de portfolio_content.json vía title_key, o literales en la
// propia pieza (title/description) cuando no usa title_key.
function pieceInfo(item, language) {
  const content = item.title_key ? portfolioContent[item.title_key] : null;
  const title = content ? (content.title[language] || content.title.es) : item.title;
  const descSource = content?.description || item.description;
  const description = descSource ? (descSource[language] || descSource.es) : null;
  return { title, description };
}

// Toma `count` elementos de `arr` repartidos uniformemente de principio a
// fin (incluyendo siempre el primero y el último). Si `arr` ya cabe entera,
// la devuelve tal cual.
function evenSample(arr, count) {
  if (arr.length <= count) return arr;
  if (count <= 1) return [arr[0]];
  const picked = [];
  for (let i = 0; i < count; i++) {
    picked.push(arr[Math.round((i * (arr.length - 1)) / (count - 1))]);
  }
  return [...new Set(picked)];
}

function Thumbnail({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden bg-surface border border-border cursor-pointer aspect-video"
    >
      <img src={item.src} alt={item.title || ''} loading="lazy" decoding="async" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-[1.03] transition-[transform,filter] duration-500" />
      {item.type === 'video' && (
        <span className="absolute top-2 left-2 bg-ink text-bg font-extrabold px-2 py-0.5 flex items-center gap-1 text-[0.6rem]">
          <Icon name="play" size={8} className="fill-current" />
          VIDEO
        </span>
      )}
    </div>
  );
}

// Última celda de una fila de proceso truncada: un collage 2x2 de 4 fotos
// más, en pequeñito, para representar que hay más pasos sin desbordar la fila.
function ProcessCollageCell({ images, pieceIdx, onSelect }) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-video overflow-hidden border border-border bg-surface">
      {images.map(({ item, idx }, i) => (
        <div key={i} className="group relative overflow-hidden cursor-pointer" onClick={() => onSelect(pieceIdx, idx)}>
          <img src={item.src} alt="" loading="lazy" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 transition-[filter] duration-300" />
        </div>
      ))}
    </div>
  );
}

// Fila de vista previa del proceso: como mucho una fila (los `slots` que
// quepan), muestreada de principio a fin; si sobran pasos, la última celda
// es un collage 2x2 que anticipa que hay más. `entries` son pares
// {item, idx} donde `idx` es la posición ORIGINAL dentro de piece.process
// (necesaria para que el lightbox abra la foto correcta, aunque aquí se
// haya filtrado o muestreado el listado).
function ProcessPreview({ entries, pieceIdx, onSelect, slots }) {
  if (!entries.length || slots <= 0) return null;
  const positions = entries.map((_, i) => i);
  const gridStyle = { gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))` };

  if (entries.length <= slots) {
    return (
      <div className="grid gap-2 mt-2" style={gridStyle}>
        {entries.map(({ item, idx }, i) => (
          <Thumbnail key={i} item={item} onClick={() => onSelect(pieceIdx, idx)} />
        ))}
      </div>
    );
  }

  const mainCount = Math.max(1, slots - 1);
  const mainPos = evenSample(positions, mainCount);
  const mainSet = new Set(mainPos);
  const remainingPos = positions.filter((p) => !mainSet.has(p));
  const collagePos = evenSample(remainingPos, 4);

  return (
    <div className="grid gap-2 mt-2" style={gridStyle}>
      {mainPos.map((pos) => (
        <Thumbnail key={pos} item={entries[pos].item} onClick={() => onSelect(pieceIdx, entries[pos].idx)} />
      ))}
      <ProcessCollageCell images={collagePos.map((pos) => entries[pos])} pieceIdx={pieceIdx} onSelect={onSelect} />
    </div>
  );
}

function PieceCaption({ info, size, showDescription = true }) {
  return (
    <div className="mb-2">
      <p className={`font-display font-medium ${size === 'lg' ? 'text-lg' : 'text-sm sm:text-base'}`}>{info.title}</p>
      {showDescription && info.description && <p className="text-ink-light text-sm mt-0.5 line-clamp-2">{info.description}</p>}
    </div>
  );
}

function PieceListRow({ piece, pieceIdx, onSelect, language }) {
  const info = pieceInfo(piece, language);
  return (
    <div onClick={() => onSelect(pieceIdx)} className="group flex items-center gap-4 py-3 border-b border-border cursor-pointer">
      <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 overflow-hidden bg-surface border border-border">
        <img src={piece.src} alt="" loading="lazy" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 transition-[filter] duration-300" />
        {piece.type === 'video' && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Icon name="play" size={14} className="text-white fill-current" />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-base sm:text-lg font-medium truncate group-hover:text-primary transition-colors">{info.title}</p>
        {info.description && <p className="text-ink-light text-sm mt-0.5 truncate">{info.description}</p>}
      </div>
      <Icon name="chevronRight" size={16} strokeWidth={2.5} className="shrink-0 text-ink-light group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </div>
  );
}

function ViewFullLink({ onClick, language }) {
  return (
    <button onClick={onClick} className="group inline-flex items-center gap-1 text-sm font-semibold text-primary shrink-0 whitespace-nowrap">
      {FULL_PROJECT_LABEL[language] || FULL_PROJECT_LABEL.es}
      <Icon name="chevronRight" size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}

const VIEW_MODE_ICONS = { large: 'viewLarge', medium: 'viewMedium', list: 'viewList' };

function ViewModeSwitch({ viewMode, setViewMode, language }) {
  return (
    <div className="flex border border-border shrink-0">
      {['large', 'medium', 'list'].map((mode) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          title={VIEW_MODE_LABELS[mode][language] || VIEW_MODE_LABELS[mode].es}
          aria-label={VIEW_MODE_LABELS[mode][language] || VIEW_MODE_LABELS[mode].es}
          className={`w-9 h-9 flex items-center justify-center transition-colors border-r border-border last:border-r-0 ${viewMode === mode ? 'bg-ink text-bg' : 'text-ink-light hover:text-ink'}`}
        >
          <Icon name={VIEW_MODE_ICONS[mode]} size={16} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}

function SortToggle({ sortDesc, setSortDesc, language }) {
  const label = sortDesc ? (SORT_LABELS.desc[language] || SORT_LABELS.desc.es) : (SORT_LABELS.asc[language] || SORT_LABELS.asc.es);
  return (
    <button
      onClick={() => setSortDesc((v) => !v)}
      title={label}
      className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-ink hover:text-primary transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="4" y1="6" x2="14" y2="6" />
        <line x1="4" y1="12" x2="11" y2="12" />
        <line x1="4" y1="18" x2="8" y2="18" />
      </svg>
      <Icon name="chevronDown" size={12} strokeWidth={2.5} className={`transition-transform ${sortDesc ? '' : 'rotate-180'}`} />
    </button>
  );
}

// Agrupa las miniaturas por proyecto real (mismo projectId).
function groupByProject(items) {
  const order = [];
  const map = {};
  items.forEach((item) => {
    const pid = item.projectId || '_none';
    if (!map[pid]) { map[pid] = []; order.push(pid); }
    map[pid].push(item);
  });
  const result = {};
  order.forEach((pid) => { result[pid] = map[pid]; });
  return result;
}

// Combina la lista real de proyectos visibles de una disciplina con sus
// activos visuales curados (si los tiene). Si un proyecto no tiene assets
// de portfolio propios, se muestra igualmente con su imagen y resumen.
function buildSections(discipline, filters, sortDesc) {
  const allProjects = buildFilteredProjects(discipline);
  const visualMap = groupByProject(profileImages[discipline] || []);

  const filtered = filters
    ? allProjects.filter((p) => {
        if (filters.type !== 'all' && p.type !== filters.type) return false;
        if (filters.years.length && !filters.years.includes(p.year)) return false;
        if (filters.tags.length && !filters.tags.every((tag) => p.tags?.includes(tag))) return false;
        return true;
      })
    : allProjects;

  const sorted = [...filtered].sort((a, b) => {
    const ya = parseInt(a.year, 10) || 0;
    const yb = parseInt(b.year, 10) || 0;
    return sortDesc ? yb - ya : ya - yb;
  });

  return sorted.map((project) => ({ project, visualItems: visualMap[project.id] || null }));
}

function ProjectSection({ section, startIdx, language, onSelect, onViewFull, viewMode, isMobile }) {
  const { project, visualItems } = section;
  const category = localized(project.category, language);
  const title = localized(project.title, language);

  const header = (
    <div className="flex items-end justify-between gap-4 mb-3 flex-wrap">
      <div>
        <p className="text-primary font-bold uppercase text-xs tracking-[0.15em] mb-1">{category}</p>
        <h3 className="font-display text-2xl sm:text-3xl font-medium">{title}</h3>
      </div>
      <ViewFullLink onClick={() => onViewFull(project.id)} language={language} />
    </div>
  );

  if (!visualItems) {
    // Sin assets curados todavía: portada + resumen, y si el proyecto tiene
    // fotos sueltas (project.images) distintas de la portada, se muestran
    // pequeñas debajo; si no tiene ninguna, no se pone nada debajo. Se
    // adapta igual que el resto de proyectos a los tres modos de vista.
    const extraPhotos = (project.images || []).filter((img) => img !== project.image).slice(0, 5);

    if (viewMode === 'list') {
      return (
        <section className="mb-10">
          {header}
          <div className="flex flex-col">
            <div onClick={() => onViewFull(project.id)} className="group flex items-center gap-4 py-3 border-b border-border cursor-pointer">
              <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 overflow-hidden bg-surface border border-border">
                {project.image && <img src={project.image} alt="" loading="lazy" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 transition-[filter] duration-300" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base sm:text-lg font-medium truncate group-hover:text-primary transition-colors">{title}</p>
                {project.summary && <p className="text-ink-light text-sm mt-0.5 truncate">{localized(project.summary, language)}</p>}
              </div>
              <Icon name="chevronRight" size={16} strokeWidth={2.5} className="shrink-0 text-ink-light group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </section>
      );
    }

    const isLarge = viewMode === 'large';
    const cover = (
      <div>
        {project.image && <Thumbnail item={{ src: project.image }} onClick={() => onViewFull(project.id)} />}
        {extraPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {extraPhotos.map((img, i) => (
              <Thumbnail key={i} item={{ src: img }} onClick={() => onViewFull(project.id)} />
            ))}
          </div>
        )}
        {project.summary && (!isLarge && isMobile ? null : (
          <p className={`text-ink-light text-sm leading-relaxed mt-3 ${isLarge ? 'max-w-2xl' : 'line-clamp-2'}`}>{localized(project.summary, language)}</p>
        ))}
      </div>
    );

    return (
      <section className="mb-14">
        {header}
        {isLarge ? cover : <div className="grid grid-cols-2 gap-4 sm:gap-6">{cover}</div>}
      </section>
    );
  }

  if (viewMode === 'list') {
    return (
      <section className="mb-10">
        {header}
        <div className="flex flex-col">
          {visualItems.map((piece, i) => (
            <PieceListRow key={i} piece={piece} pieceIdx={startIdx + i} onSelect={onSelect} language={language} />
          ))}
        </div>
      </section>
    );
  }

  // Grande: una pieza por fila, a tamaño completo. Mediano: dos columnas,
  // todo más pequeño, y sin fila de proceso ni descripción en móvil (se
  // cortarían/quedarían minúsculas). El nombre y la descripción van encima
  // de la portada, nunca entre la portada y las fotos de proceso.
  const isLarge = viewMode === 'large';
  const previewSlots = isLarge ? (isMobile ? 3 : 5) : (isMobile ? 0 : 3);
  const showDescription = !(viewMode === 'medium' && isMobile);

  return (
    <section className="mb-14">
      {header}
      <div className={isLarge ? 'flex flex-col gap-8' : 'grid grid-cols-2 gap-4 sm:gap-6'}>
        {visualItems.map((piece, i) => {
          const pieceIdx = startIdx + i;
          const info = pieceInfo(piece, language);
          // La última foto del proceso suele repetir la propia portada (el
          // "cierre" de la secuencia): se excluye de la vista previa para no
          // mostrar la misma imagen dos veces (conservando el índice
          // original de cada foto para que el lightbox abra la correcta).
          const filmstripEntries = (piece.process || [])
            .map((item, idx) => ({ item, idx }))
            .filter(({ item }) => item.src !== piece.src);
          return (
            <div key={i}>
              <PieceCaption info={info} size={isLarge ? 'lg' : 'sm'} showDescription={showDescription} />
              <Thumbnail item={piece} onClick={() => onSelect(pieceIdx)} />
              {previewSlots > 0 && <ProcessPreview entries={filmstripEntries} pieceIdx={pieceIdx} onSelect={onSelect} slots={previewSlots} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DemoReel({ language }) {
  return (
    <div className="mb-16">
      <p className="text-primary font-bold uppercase text-xs tracking-[0.15em] mb-2">Demo Reel</p>
      <h2 className="font-display text-3xl sm:text-4xl font-medium mb-4">
        {language === 'en' ? 'The showreel, first' : 'El reel, antes que nada'}
      </h2>
      <div className="aspect-video overflow-hidden border-2 border-ink bg-black">
        <iframe
          src={DEMO_REEL_URL}
          title="Demo Reel 3D"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function FilterBar({ projects, filterType, setFilterType, selectedYears, toggleYear, selectedTags, toggleTag, showFilters, setShowFilters, onClear, hasActive, t, language, sortDesc, setSortDesc, viewMode, setViewMode }) {
  const availableTypes = useMemo(
    () => ['all', 'academic', 'professional', 'personal'].filter((type) => type === 'all' || projects.some((p) => p.type === type)),
    [projects]
  );
  const availableYears = useMemo(() => {
    const years = new Set(projects.map((p) => p.year).filter(Boolean));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [projects]);
  const availableTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => (p.tags || []).forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [projects]);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between pb-4 border-b border-border gap-3 flex-wrap">
        <div className="flex items-center gap-5 flex-wrap">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors ${showFilters ? 'text-primary' : 'text-ink hover:text-primary'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            {t('filter_button')}
            {hasActive && <span className="w-1.5 h-1.5 bg-primary" />}
          </button>
          <SortToggle sortDesc={sortDesc} setSortDesc={setSortDesc} language={language} />
        </div>
        <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} language={language} />
      </div>

      {showFilters && (
        <div className="pt-4 flex flex-col gap-4 animate-fade-in">
          <div className="flex flex-wrap gap-2">
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-sm font-bold border transition-colors ${filterType === type ? 'bg-ink text-bg border-ink' : 'border-border text-ink hover:border-ink'}`}
              >
                {TYPE_LABELS[type][language] || TYPE_LABELS[type].es}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => toggleYear(year)}
                className={`text-xs font-bold px-2.5 py-1 border transition-colors ${selectedYears.includes(year) ? 'bg-ink text-bg border-ink' : 'border-border text-ink-light hover:border-ink'}`}
              >
                {year}
              </button>
            ))}
            {availableTags.map((tagId) => (
              <button
                key={tagId}
                onClick={() => toggleTag(tagId)}
                className={`text-xs font-bold uppercase px-2.5 py-1 border transition-colors ${selectedTags.includes(tagId) ? 'bg-primary text-white border-primary' : 'border-primary/40 text-primary hover:border-primary'}`}
              >
                {allSkills[tagId]?.name || tagId}
              </button>
            ))}
            {hasActive && (
              <button onClick={onClear} className="text-xs font-extrabold uppercase px-2.5 py-1 border border-red-400/60 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">
                {t('clear_filters')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioGallery({ roleId, onProjectSelect }) {
  const { t, language } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [videoPlayingIdx, setVideoPlayingIdx] = useState(null);
  const [activeProcessIndex, setActiveProcessIndex] = useState(null);
  const [pendingProcessIndex, setPendingProcessIndex] = useState(null);
  const containerRef = useRef(null);
  const isProgrammatic = useRef(false);
  const scrollTimer = useRef(null);

  const [filterType, setFilterType] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortDesc, setSortDesc] = useState(true);
  const [viewMode, setViewModeState] = useState(() => {
    try { return sessionStorage.getItem('portfolioViewMode') || 'medium'; } catch { return 'medium'; }
  });
  const setViewMode = (mode) => {
    setViewModeState(mode);
    try { sessionStorage.setItem('portfolioViewMode', mode); } catch { /* almacenamiento no disponible */ }
  };

  const isGeneral = roleId === 'all';
  const toggle = (setFn) => (value) => setFn((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  const toggleTag = toggle(setSelectedTags);
  const toggleYear = toggle(setSelectedYears);
  const hasActiveFilters = filterType !== 'all' || selectedTags.length > 0 || selectedYears.length > 0;
  const clearFilters = () => { setFilterType('all'); setSelectedTags([]); setSelectedYears([]); };

  const allUnfilteredProjects = useMemo(() => buildFilteredProjects(roleId === 'all' ? 'all' : roleId), [roleId]);

  const disciplineSections = useMemo(() => {
    const filters = { type: filterType, years: selectedYears, tags: selectedTags };
    const disciplines = isGeneral ? GENERAL_PROFILE_ORDER : [roleId];
    return disciplines.map((discipline) => ({
      discipline,
      sections: buildSections(discipline, filters, sortDesc),
    }));
  }, [isGeneral, roleId, filterType, selectedTags, selectedYears, sortDesc]);

  // Índice plano de todos los items con assets visuales (para el lightbox),
  // en el mismo orden en que se van a pintar en pantalla.
  const flatItems = useMemo(() => {
    const items = [];
    disciplineSections.forEach(({ discipline, sections }) => {
      sections.forEach(({ visualItems }) => {
        (visualItems || []).forEach((item) => items.push({ ...item, categoryLabel: discipline }));
      });
    });
    return items;
  }, [disciplineSections]);

  useEffect(() => {
    if (selectedIndex === null) { document.body.style.overflow = 'auto'; return; }
    document.body.style.overflow = 'hidden';
    setActiveProcessIndex(pendingProcessIndex);
    setPendingProcessIndex(null);
    setVideoPlayingIdx(null);
    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (!el || !el.offsetWidth) return;
      isProgrammatic.current = true;
      el.scrollTo({ left: selectedIndex * el.offsetWidth, behavior: 'auto' });
      setTimeout(() => { isProgrammatic.current = false; }, 100);
    }, 30);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const goTo = (idx) => {
    const el = containerRef.current;
    if (!el || idx < 0 || idx >= flatItems.length) return;
    isProgrammatic.current = true;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' });
    setSelectedIndex(idx);
    setActiveProcessIndex(null);
    setVideoPlayingIdx(null);
  };

  // Mueve la foto de proceso activa de la pieza actual (no cambia de pieza).
  const stepProcess = (delta) => {
    const currentItem = flatItems[selectedIndex];
    const processLen = currentItem?.process?.length || 0;
    if (!processLen) return;
    const cur = activeProcessIndex !== null ? activeProcessIndex : processLen - 1;
    const next = Math.max(0, Math.min(processLen - 1, cur + delta));
    setActiveProcessIndex(next);
    setVideoPlayingIdx(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      // Arriba/abajo cambia de elemento del portfolio; izquierda/derecha
      // recorre las fotos de proceso del elemento actual.
      if (e.key === 'ArrowDown') { e.preventDefault(); goTo(selectedIndex + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goTo(selectedIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); stepProcess(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepProcess(-1); }
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, flatItems, activeProcessIndex]);

  const handleScroll = () => {
    if (isProgrammatic.current) return;
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el?.offsetWidth) return;
      const idx = Math.round(el.scrollLeft / el.offsetWidth);
      if (idx !== selectedIndex && idx >= 0 && idx < flatItems.length) {
        setSelectedIndex(idx);
        setActiveProcessIndex(null);
        setVideoPlayingIdx(null);
      }
    }, 120);
  };

  const handleSelect = (idx, processIdx = null) => {
    setPendingProcessIndex(processIdx);
    setSelectedIndex(idx);
  };

  const handleViewFullProject = (projectId) => {
    setSelectedIndex(null);
    onProjectSelect({ id: projectId });
  };

  let cursor = 0;

  return (
    <>
      <div>
        {(roleId === 'artist_2d_3d' || isGeneral) && <DemoReel language={language} />}

        <FilterBar
          projects={allUnfilteredProjects}
          filterType={filterType}
          setFilterType={setFilterType}
          selectedYears={selectedYears}
          toggleYear={toggleYear}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onClear={clearFilters}
          hasActive={hasActiveFilters}
          t={t}
          language={language}
          sortDesc={sortDesc}
          setSortDesc={setSortDesc}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {disciplineSections.map(({ discipline, sections }) => (
          <div key={discipline}>
            {isGeneral && (
              <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-6 pb-2 border-b border-border">
                {SECTION_TITLES[discipline]?.[language] || SECTION_TITLES[discipline]?.es}
              </p>
            )}
            {sections.length === 0 && (
              <p className="text-ink-light text-sm opacity-60 mb-10">
                {language === 'en' ? 'No projects yet for this discipline.' : 'Todavía no hay proyectos en esta disciplina.'}
              </p>
            )}
            {sections.map((section) => {
              const startIdx = cursor;
              if (section.visualItems) cursor += section.visualItems.length;
              return (
                <ProjectSection
                  key={section.project.id}
                  section={section}
                  startIdx={startIdx}
                  language={language}
                  onSelect={handleSelect}
                  onViewFull={handleViewFullProject}
                  viewMode={viewMode}
                  isMobile={isMobile}
                />
              );
            })}
          </div>
        ))}
      </div>

      {selectedIndex !== null && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center" onClick={() => setSelectedIndex(null)}>
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[100001] w-9 h-9 border border-white/30 text-white hover:border-white transition-colors flex items-center justify-center"
          >
            <Icon name="close" size={18} strokeWidth={2.5} />
          </button>

          {!isMobile && flatItems.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); goTo(selectedIndex - 1); }} className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-[100000] w-11 h-11 border border-white/30 text-white hover:border-white transition-colors flex items-center justify-center">
                <Icon name="chevronLeft" size={20} strokeWidth={2.5} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); goTo(selectedIndex + 1); }} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[100000] w-11 h-11 border border-white/30 text-white hover:border-white transition-colors flex items-center justify-center">
                <Icon name="chevronRight" size={20} strokeWidth={2.5} />
              </button>
            </>
          )}

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full h-full flex overflow-x-scroll overflow-y-hidden no-scrollbar"
          >
            {flatItems.map((item, idx) => (
              <LightboxSlide
                key={idx}
                item={item}
                idx={idx}
                isActive={selectedIndex === idx}
                isMobile={isMobile}
                activeProcessIndex={activeProcessIndex}
                setActiveProcessIndex={setActiveProcessIndex}
                videoPlayingIdx={videoPlayingIdx}
                setVideoPlayingIdx={setVideoPlayingIdx}
                language={language}
                onViewFullProject={handleViewFullProject}
              />
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function LightboxSlide({ item, idx, isActive, isMobile, activeProcessIndex, setActiveProcessIndex, videoPlayingIdx, setVideoPlayingIdx, language, onViewFullProject }) {
  const processImages = (item.process || []).map((pImg) => {
    if (pImg.label_index !== undefined && item.title_key && portfolioContent[item.title_key]) {
      const loc = portfolioContent[item.title_key].process_labels[pImg.label_index];
      return { ...pImg, label: loc ? (loc[language] || loc.es) : pImg.label };
    }
    return pImg;
  });
  const hasProcess = processImages.length > 0;
  const effectiveIdx = isActive && activeProcessIndex !== null ? activeProcessIndex : (hasProcess ? processImages.length - 1 : -1);
  const current = hasProcess ? (processImages[effectiveIdx] || processImages[processImages.length - 1]) : item;
  const isVideo = current.type === 'video' || !!current.videoUrl;
  const displayTitle = item.title_key && portfolioContent[item.title_key]
    ? (portfolioContent[item.title_key].title[language] || portfolioContent[item.title_key].title.es)
    : item.title;
  const isPlaying = videoPlayingIdx === idx;
  const filmstripRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    // Se desplaza solo el filmstrip: scrollIntoView arrastraría también al
    // contenedor horizontal de diapositivas y la página.
    const strip = filmstripRef.current;
    const el = strip?.querySelector(`[data-process-idx="${effectiveIdx}"]`);
    if (!strip || !el) return;
    strip.scrollTo({ left: el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
  }, [isActive, effectiveIdx]);

  // La rueda del ratón desplaza el filmstrip en horizontal (React registra
  // onWheel como pasivo, por eso se añade el listener a mano).
  useEffect(() => {
    const el = filmstripRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (el.scrollWidth <= el.clientWidth) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      e.preventDefault();
      el.scrollLeft += delta;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [hasProcess]);

  return (
    <div className={`min-w-full w-full h-full flex flex-col overflow-hidden box-border gap-3 ${isMobile ? 'px-4 pt-14 pb-4' : 'px-10 sm:px-20 pt-16 pb-6'}`}>
      <div className="text-center shrink-0">
        <div className="text-primary text-[0.7rem] font-black uppercase tracking-[2px]">
          {SECTION_TITLES[item.categoryLabel]?.[language] || SECTION_TITLES[item.categoryLabel]?.es}
        </div>
        <h3 className="text-white font-bold text-lg sm:text-2xl mt-0.5 truncate">{displayTitle}</h3>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        {isVideo ? (
          <div className="w-full max-w-[min(100%,calc(100vh*16/9*0.55))] aspect-video overflow-hidden relative bg-black" onClick={(e) => e.stopPropagation()}>
            {!isPlaying ? (
              <div className="group w-full h-full cursor-pointer relative" onClick={() => setVideoPlayingIdx(idx)}>
                <img src={current.src} className="w-full h-full object-cover opacity-60" alt="Preview" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white bg-black/30 flex items-center justify-center group-hover:bg-white/15 transition-colors duration-300">
                  <Icon name="play" size={22} strokeWidth={2} className="text-white fill-current ml-0.5" />
                </div>
              </div>
            ) : (
              <iframe
                width="100%" height="100%"
                src={current.videoUrl.includes('?') ? `${current.videoUrl}&autoplay=1` : `${current.videoUrl}?autoplay=1`}
                frameBorder="0" allowFullScreen allow="autoplay; fullscreen"
              />
            )}
          </div>
        ) : (
          <img src={current.src} alt={displayTitle} loading="lazy" decoding="async" className="max-w-full max-h-full w-auto h-auto object-contain" onClick={(e) => e.stopPropagation()} />
        )}
      </div>

      {hasProcess && (
        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
          {processImages[effectiveIdx]?.label && (
            <p className="text-center text-white/85 text-xs sm:text-sm font-medium mb-2 px-4 truncate">{processImages[effectiveIdx].label}</p>
          )}
          <div ref={filmstripRef} className="relative flex gap-2 overflow-x-auto no-scrollbar justify-center-safe px-4 sm:px-6">
            {processImages.map((pImg, pIdx) => {
              const active = isActive ? pIdx === effectiveIdx : pIdx === processImages.length - 1;
              return (
                <div
                  key={pIdx}
                  data-process-idx={pIdx}
                  onClick={() => { setActiveProcessIndex(pIdx); setVideoPlayingIdx(null); }}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden cursor-pointer border transition-opacity ${active ? 'border-primary opacity-100' : 'border-white/15 opacity-45'}`}
                >
                  <img src={pImg.src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  {(pImg.type === 'video' || pImg.videoUrl) && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <Icon name="play" size={12} className="text-white fill-current" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="shrink-0 flex items-center justify-center gap-4 flex-wrap" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onViewFullProject(item.projectId)}
          className="group inline-flex items-center gap-1.5 text-sm font-bold bg-white text-black px-4 py-2 hover:bg-primary hover:text-white transition-colors"
        >
          {language === 'en' ? 'View Full Project' : 'Ver proyecto completo'}
          <Icon name="chevronRight" size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
        {item.externalLinks?.map((link, li) => (
          <a
            key={li}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            {(link.platform === 'artstation' || link.platform === 'github') && <Icon name={link.platform === 'artstation' ? 'artstation' : 'githubFilled'} size={15} />}
            {(language === 'en' ? 'View on' : 'Ver en')} {PLATFORM_NAMES[link.platform] || link.platform}
            <Icon name="chevronRight" size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
}
