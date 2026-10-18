import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { SLUG_TO_ROLE } from '../lib/roles';
import { getProject } from '../lib/projects';
import { allSkills } from '../data/content';
import Sidebar from '../components/Sidebar';
import RichText from '../components/ProjectRichText';
import Icon from '../components/Icon';
import { PLATFORM_NAMES, platformIcon } from '../lib/platforms';
import Footer from '../components/Footer';
import Models3DSection, { MODELS_SECTION_ID } from '../components/Models3DSection';
import { modelsByProject } from '../data/models3d';

const MODELS_LINK = { es: 'Modelos 3D', en: '3D models', ca: 'Models 3D', gl: 'Modelos 3D' };
const WIP_LABEL = { es: 'Trabajo en proceso', en: 'Work in Progress', ca: 'En procés', gl: 'En proceso' };

export default function ProjectDetailPage() {
  const { role, projectId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const lightboxRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const activeRoleId = SLUG_TO_ROLE[role] || 'all';
  const project = useMemo(() => getProject(projectId), [projectId]);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [projectId]);

  const galleryImages = useMemo(() => {
    const content = project?.longDescription?.es || '';
    const imgs = [];
    content.split(/\r?\n/).forEach((line) => {
      if (line.includes('custom-gallery')) {
        const re = /src="([^"]+)"/g;
        let m;
        while ((m = re.exec(line)) !== null) imgs.push(m[1]);
      }
    });
    return imgs;
  }, [project]);

  const openLightbox = useCallback((src) => {
    const idx = galleryImages.indexOf(src);
    if (idx !== -1) setSelectedIndex(idx);
  }, [galleryImages]);

  const prevImage = useCallback((e) => { e?.stopPropagation(); setSelectedIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length); }, [galleryImages.length]);
  const nextImage = useCallback((e) => { e?.stopPropagation(); setSelectedIndex((i) => (i + 1) % galleryImages.length); }, [galleryImages.length]);
  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (lightboxRef.current && selectedIndex !== null) {
      lightboxRef.current.scrollTo({ left: selectedIndex * lightboxRef.current.offsetWidth, behavior: 'instant' });
    }
  }, [selectedIndex]);

  const handleLightboxScroll = useCallback((e) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    if (idx !== selectedIndex) setSelectedIndex(idx);
  }, [selectedIndex]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedIndex]);

  if (!project) {
    return (
      <div className="min-h-dvh bg-bg">
        <Sidebar activeRoleId={activeRoleId} role={role} activeTab="portfolio" />
        <main className="lg:pl-68">
          <div className="max-w-4xl mx-auto px-5 sm:px-10 lg:px-16 pt-16 pb-24">
            <p className="text-ink-light">{language === 'en' ? 'Project not found.' : 'Proyecto no encontrado.'}</p>
            <button onClick={() => navigate(`/${language}/${role}/portfolio`)} className="mt-4 inline-flex items-center gap-1.5 text-primary font-semibold">
              <Icon name="chevronLeft" size={16} strokeWidth={2.5} /> {t('tab_portfolio')}
            </button>
          </div>
        </main>
      </div>
    );
  }

  const title = typeof project.title === 'string' ? project.title : (project.title[language] || project.title.es);
  const category = typeof project.category === 'string' ? project.category : (project.category[language] || project.category.es);
  const richContent = project.longDescription ? (project.longDescription[language] || project.longDescription.es) : null;
  const hasGalleryInContent = richContent && richContent.includes('custom-gallery');
  const description = project.description[language] || project.description.es;

  // Año/tipo y enlaces son información primordial: en móvil van justo debajo
  // del título, no al final del todo. Las etiquetas sí pueden ir al final.
  const renderMeta = () => (
    <div>
      <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-2">{t('year_label') || 'Año'}</p>
      <p className="font-display text-2xl">{project.year}</p>
      <p className="text-ink-light text-sm mt-1">
        {project.type === 'academic' ? t('project_academic') : t('project_professional')}
      </p>
      {project.isWIP && (
        <p className="mt-2 inline-block bg-ink text-bg font-bold text-xs uppercase px-2 py-1">
          {WIP_LABEL[language] || WIP_LABEL.es}
        </p>
      )}
    </div>
  );

  const renderTags = () => (
    <div>
      <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-2">{t('tags_label')}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tagId) => (
          <span key={tagId} className="tag text-xs">{allSkills[tagId]?.name || tagId}</span>
        ))}
      </div>
    </div>
  );

  const models = modelsByProject[project.id];
  const goToModels = () => document.getElementById(MODELS_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const renderLinks = () => (
    <div className="flex flex-col gap-2.5">
      {models && (
        <button type="button" onClick={goToModels} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary text-left">
          <Icon name="box" size={15} strokeWidth={2} />
          {MODELS_LINK[language] || MODELS_LINK.es} ({models.length})
          <Icon name="chevronDown" size={13} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}
      {project.memoryUrl && (
        <a href={project.memoryUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Icon name="view" size={15} />
          {t('download_memory')}
          <Icon name="chevronRight" size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      )}
      {project.externalLinks?.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-primary transition-colors"
        >
          <Icon name={platformIcon(link.platform)} size={15} />
          {(language === 'en' ? 'View on' : 'Ver en')} {PLATFORM_NAMES[link.platform] || link.platform}
          <Icon name="chevronRight" size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      ))}
    </div>
  );

  const hasLinks = models || project.memoryUrl || project.externalLinks?.length > 0;

  return (
    <div className="min-h-dvh bg-bg">
      <Sidebar activeRoleId={activeRoleId} role={role} activeTab="portfolio" />

      <main className="lg:pl-68">
        <div className="max-w-5xl mx-auto">
          <div className="px-5 sm:px-10 lg:px-16 pt-8">
            <button
              onClick={() => navigate(`/${language}/${role}/portfolio`)}
              className="flex items-center gap-1.5 text-sm font-semibold text-ink-light hover:text-primary transition-colors"
            >
              <Icon name="chevronLeft" size={16} strokeWidth={2.5} /> {t('tab_portfolio')}
            </button>
          </div>

          {(project.image || project.images?.[0]) && (
            <div className="mt-6 w-full aspect-[21/9] overflow-hidden bg-surface">
              <img
                src={project.image || project.images[0]}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
              />
            </div>
          )}

          <div className="px-5 sm:px-10 lg:px-16 pt-10 pb-24">
            <p className="text-primary font-bold uppercase text-xs tracking-[0.15em] mb-2">{category}</p>
            <h1 className="font-display text-3xl sm:text-5xl font-medium leading-tight mb-8">{title}</h1>

            {/* Móvil: año/tipo y enlaces son primordiales, van antes del cuerpo del artículo */}
            <div className="lg:hidden flex flex-col gap-6 mb-10 pb-8 border-b border-border">
              {renderMeta()}
              {hasLinks && renderLinks()}
            </div>

            <div className="grid lg:grid-cols-[1fr_240px] gap-10 lg:gap-16">
              <article className="min-w-0 max-w-2xl">
                <div className="text-[1.05rem] text-ink-light mb-4 leading-relaxed">
                  <RichText text={description} onImageClick={openLightbox} />
                </div>

                {richContent && (
                  <div className="border-t border-border pt-8 mt-4">
                    <RichText text={richContent} onImageClick={openLightbox} />
                  </div>
                )}

                {!hasGalleryInContent && project.images && project.images.length > 1 && (
                  <div className="border-t border-border mt-8 pt-8">
                    <h3 className="font-display text-2xl font-medium mb-5">
                      {language === 'gl' ? 'Galería de imaxes' : language === 'en' ? 'Image Gallery' : 'Galería de imágenes'}
                    </h3>
                    <div className="custom-gallery">
                      {project.images.map((img, idx) => (
                        <div key={idx} onClick={() => openLightbox(img)}>
                          <img src={img} alt={`${title} - ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {models && <Models3DSection models={models} />}

                {/* Móvil: las etiquetas sí pueden quedar al final, tras todo el contenido */}
                {project.tags && (
                  <div className="lg:hidden mt-8 pt-8 border-t border-border">
                    {renderTags()}
                  </div>
                )}
              </article>

              <aside className="hidden lg:flex flex-col gap-8 lg:border-l lg:border-border lg:pl-8 h-fit lg:sticky lg:top-24">
                {renderMeta()}
                {hasLinks && renderLinks()}
                {project.tags && renderTags()}
              </aside>
            </div>
          </div>
          <div className="px-5 sm:px-10 lg:px-16 pb-10">
            <Footer className="mt-12 pt-6 border-t border-border" />
          </div>
        </div>
      </main>

      {selectedIndex !== null && galleryImages[selectedIndex] && (
        <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center p-4 cursor-zoom-out" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
          <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-6 right-6 z-[2001] w-9 h-9 border border-white/30 text-white hover:border-white transition-colors flex items-center justify-center">
            <Icon name="close" size={18} strokeWidth={2.5} />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button onClick={prevImage} className="hidden sm:flex absolute left-6 w-11 h-11 border border-white/30 text-white hover:border-white transition-colors items-center justify-center z-[2001]">
                <Icon name="chevronLeft" size={20} strokeWidth={2.5} />
              </button>
              <button onClick={nextImage} className="hidden sm:flex absolute right-6 w-11 h-11 border border-white/30 text-white hover:border-white transition-colors items-center justify-center z-[2001]">
                <Icon name="chevronRight" size={20} strokeWidth={2.5} />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-3 py-1 z-[2001]">
            {selectedIndex + 1} / {galleryImages.length}
          </div>

          <div
            ref={lightboxRef}
            onScroll={handleLightboxScroll}
            className="flex w-full h-full overflow-x-auto overflow-y-hidden no-scrollbar"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {galleryImages.map((img, idx) => (
              <div key={idx} className="min-w-full h-full flex items-center justify-center px-4 sm:px-20" style={{ scrollSnapAlign: 'center' }}>
                <img src={img} alt={`Vista ${idx + 1}`} className="max-w-full max-h-[85vh] object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
