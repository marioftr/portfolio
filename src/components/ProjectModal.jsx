import { useEffect, useRef, useState, memo, useMemo, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { allSkills } from '../data/content';

// Sub-component to manage its own scroll state and avoid full modal re-renders
const VideoCarousel = memo(({ html, language }) => {
    const scrollContainerRef = useRef(null);
    const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: true });

    const checkScroll = () => {
        const carousel = scrollContainerRef.current;
        if (!carousel) return;

        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        setScrollState({
            canScrollLeft: scrollLeft > 10,
            canScrollRight: scrollLeft + clientWidth < scrollWidth - 10
        });
    };

    // Extract the inner HTML content of the custom-video-carousel div
    const innerHTML = useMemo(() => {
        const match = html.match(/<div class="custom-video-carousel">([\s\S]*)<\/div>/i);
        return match ? match[1] : html;
    }, [html]);

    useEffect(() => {
        const timer = setTimeout(checkScroll, 300);
        return () => clearTimeout(timer);
    }, []);

    const scroll = (direction) => {
        const carousel = scrollContainerRef.current;
        if (!carousel) return;
        
        // Use clientWidth for the scroll amount
        const scrollAmount = carousel.clientWidth;
        carousel.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
        
        // We don't need to manually checkScroll here because the onScroll event will handle it
    };

    return (
        <div className="carousel-wrapper" style={{ margin: '2rem 0' }}>
            <div 
                ref={scrollContainerRef}
                className="custom-video-carousel" 
                onScroll={checkScroll}
                dangerouslySetInnerHTML={{ __html: innerHTML }} 
            />
            <div className="carousel-nav">
                <button
                    type="button"
                    className={`carousel-btn ${!scrollState.canScrollLeft ? 'hidden' : ''}`}
                    onClick={() => scroll('left')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span>{language === 'gl' ? 'Anterior' : (language === 'en' ? 'Previous' : 'Anterior')}</span>
                </button>
                <button
                    type="button"
                    className={`carousel-btn ${!scrollState.canScrollRight ? 'hidden' : ''}`}
                    onClick={() => scroll('right')}
                >
                    <span>{language === 'gl' ? 'Seguinte' : (language === 'en' ? 'Next' : 'Siguiente')}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        </div>
    );
});

export default function ProjectModal({ project, onClose }) {
    const { language, t } = useTranslation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const modalRef = useRef(null);
    const lightboxContainerRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Extract images from custom-gallery blocks in the ES longDescription (source of truth)
    const galleryImages = useMemo(() => {
        const content = project?.longDescription?.es || '';
        if (!content) return [];
        const imgs = [];
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
            if (line.includes('custom-gallery')) {
                const srcRegex = /src="([^"]+)"/g;
                let m;
                while ((m = srcRegex.exec(line)) !== null) imgs.push(m[1]);
            }
        }
        return imgs;
    }, [project]);

    const openLightbox = useCallback((src) => {
        const idx = galleryImages.indexOf(src);
        if (idx !== -1) setSelectedIndex(idx);
    }, [galleryImages]);

    const handlePrevImage = useCallback((e) => {
        if (e) e.stopPropagation();
        setSelectedIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);
    }, [galleryImages.length]);

    const handleNextImage = useCallback((e) => {
        if (e) e.stopPropagation();
        setSelectedIndex(i => (i + 1) % galleryImages.length);
    }, [galleryImages.length]);

    const closeLightbox = useCallback(() => setSelectedIndex(null), []);

    // Scroll the container to the correct slide when selectedIndex changes (arrows or programmatic)
    useEffect(() => {
        if (lightboxContainerRef.current && selectedIndex !== null) {
            const el = lightboxContainerRef.current;
            el.scrollTo({ left: selectedIndex * el.offsetWidth, behavior: 'instant' });
        }
    }, [selectedIndex]);

    const handleLightboxScroll = useCallback((e) => {
        const el = e.currentTarget;
        const idx = Math.round(el.scrollLeft / el.offsetWidth);
        if (idx !== selectedIndex) setSelectedIndex(idx);
    }, [selectedIndex]);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
            if (modalRef.current) modalRef.current.scrollTop = 0;
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    // Improved parser inside the component to handle refs if needed (though we use class logic mostly)
    const renderRichText = useCallback((text) => {
        if (!text) return null;

        const rawLines = text.split(/\r?\n/);

        // Remove empty lines adjacent to HTML blocks or headings to avoid excess whitespace
        const isBlockLine = (l) => {
            const t = l.trim();
            return t.startsWith('<div') || t.startsWith('<iframe') || t.startsWith('<img') || t.startsWith('## ') || t.startsWith('### ');
        };
        const lines = rawLines.filter((line, i) => {
            if (line.trim() !== '') return true;
            const prev = i > 0 ? rawLines[i - 1] : '';
            const next = i < rawLines.length - 1 ? rawLines[i + 1] : '';
            return !isBlockLine(prev) && !isBlockLine(next);
        });

        return lines.map((line, index) => {
            const trimmed = line.trim();

            // Empty line: spacer
            if (trimmed === '') {
                return <div key={index} style={{ height: '0.75rem' }} aria-hidden="true" />;
            }

            // Headings
            if (trimmed.startsWith('## ')) {
                return (
                    <h3 key={index} style={{
                        fontSize: '1.4rem',
                        marginTop: index === 0 ? '0.5rem' : '3rem',
                        marginBottom: '1rem',
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        borderBottom: '1px solid var(--color-primary-light, #eee)',
                        paddingBottom: '0.25rem'
                    }}>
                        {trimmed.replace('## ', '')}
                    </h3>
                );
            }
            if (trimmed.startsWith('### ')) {
                return (
                    <h4 key={index} style={{
                        fontSize: '1.15rem',
                        marginTop: index === 0 ? '0' : '2.4rem',
                        marginBottom: '0.75rem',
                        color: 'var(--color-primary)',
                        fontWeight: 600
                    }}>
                        {trimmed.replace('### ', '')}
                    </h4>
                );
            }

            // Lists
            if (trimmed.startsWith('- ')) {
                const content = trimmed.replace('- ', '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
                    .replace(/_([^_\n]+)_/g, '<em>$1</em>');
                return (
                    <div key={index} style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
                        <span
                            style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.6 }}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                );
            }

            // HTML Blocks (Gallery / Carousel / Video / Canva)
            if (trimmed.startsWith('<div') || trimmed.startsWith('<iframe') || trimmed.startsWith('<img')) {
                if (trimmed.includes('custom-video-carousel')) {
                    return <VideoCarousel key={index} html={trimmed} language={language} />;
                }

                if (trimmed.includes('custom-gallery')) {
                    return (
                        <div
                            key={index}
                            style={{ margin: '1rem 0' }}
                            onClick={(e) => {
                                if (e.target.tagName === 'IMG') {
                                    openLightbox(e.target.getAttribute('src'));
                                }
                            }}
                            dangerouslySetInnerHTML={{ __html: trimmed }}
                        />
                    );
                }

                // General HTML block
                return (
                    <div
                        key={index}
                        style={{ margin: '1.5rem 0', width: '100%', overflow: 'hidden' }}
                        dangerouslySetInnerHTML={{ __html: trimmed }}
                    />
                );
            }

            // Default Paragraph
            const htmlContent = trimmed
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
                .replace(/_([^_\n]+)_/g, '<em>$1</em>');
            return (
                <p
                    key={index}
                    style={{ marginBottom: '1.2rem', lineHeight: 1.75, fontSize: '1.05rem', color: 'var(--color-text)' }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            );
        });
    }, [language, openLightbox, t]);

    const hasLongDescription = project?.longDescription;
    const richContent = hasLongDescription ? (project.longDescription[language] || project.longDescription.es) : null;

    // Memoizar el contenido para evitar re-rendereos costosos que causen lentitud
    const renderedRichContent = useMemo(() => {
        return richContent ? renderRichText(richContent) : null;
    }, [richContent, renderRichText]);

    const renderedDescription = useMemo(() => {
        if (!project) return null;
        return renderRichText(project.description[language] || project.description.es);
    }, [project, language, renderRichText]);

    // Comprobar si ya hay una galería en el contenido rico
    const hasGalleryInContent = richContent && richContent.includes('custom-gallery');

    if (!project) return null;

    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 3000
                }}
            >
                <button
                    onClick={onClose}
                    className="modal-close-button-fixed"
                    style={{
                        background: 'white', borderRadius: '50%',
                        width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)', cursor: 'pointer', border: 'none',
                        transition: 'transform 0.2s'
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div
                ref={modalRef}
                className="card animate-fade-in project-modal-card"
                style={{
                    maxWidth: '850px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
                    position: 'relative', padding: '0', backgroundColor: '#fff',
                    borderRadius: '20px', display: 'flex', flexDirection: 'column',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(0,0,0,0.1)'
                }}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Imagen de cabecera: Ajustada para ocupar todo el ancho superior */}
                {(project.image || (project.images && project.images[0])) && (
                    <div className="project-modal-header-container" style={{ 
                        width: '100%', 
                        borderRadius: '20px 20px 0 0', 
                        overflow: 'hidden', 
                        backgroundColor: '#f9f9f9',
                        flexShrink: 0
                    }}>
                        <img
                            src={project.image || project.images[0]}
                            className="project-modal-header-img"
                            alt={typeof project.title === 'string' ? project.title : (project.title[language] || project.title.es)}
                            style={{ 
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}

                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <div style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div className="flex items-center gap-sm" style={{ marginBottom: '0.75rem' }}>
                            <span className="tag" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 700 }}>{project.year}</span>
                            <span style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', fontWeight: 500 }}>{project.type === 'academic' ? t('project_academic') : t('project_professional')}</span>
                            {project.isWIP && (
                                <span className="tag" style={{ 
                                    background: 'var(--color-primary)', 
                                    color: 'white', 
                                    fontWeight: 900,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    padding: '0.2rem 0.8rem',
                                    borderRadius: '6px'
                                }}>
                                    {language === 'en' ? 'Work in Progress' : (language === 'ca' ? 'En procés' : (language === 'gl' ? 'En proceso' : 'Trabajo en proceso'))}
                                </span>
                            )}
                        </div>
                        <h2 style={{ 
                            fontSize: isMobile ? '1.5rem' : '2.25rem', 
                            fontWeight: 800, 
                            marginBottom: '0.5rem', 
                            color: '#1a1a1a', 
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2
                        }}>
                            {typeof project.title === 'string' ? project.title : (project.title[language] || project.title.es)}
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                            {typeof project.category === 'string' ? project.category : (project.category[language] || project.category.es)}
                        </p>
                    </div>

                    <div style={{ fontSize: '1.05rem', color: '#444', marginBottom: '2rem', lineHeight: 1.6 }}>
                        {renderedDescription}
                    </div>

                    {project.tags && (
                        <div className="flex" style={{ 
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '2rem',
                            width: '100%',
                            maxWidth: '100%'
                        }}>
                            {project.tags.map(tagId => (
                                <span key={tagId} className="tag" style={{ 
                                    fontSize: '0.75rem', 
                                    padding: '0.2rem 0.6rem',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block'
                                }}>
                                    {allSkills[tagId]?.name || tagId.replace('_', ' ')}
                                </span>
                            ))}
                        </div>
                    )}

                    {(project.memoryUrl || project.externalLinks?.length > 0) && (
                        <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                            {project.memoryUrl && (
                                <a
                                    href={project.memoryUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1.75rem', borderRadius: '12px', fontWeight: 700 }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    <span>
                                        {typeof project.memoryLabel === 'string' 
                                            ? project.memoryLabel 
                                            : (project.memoryLabel?.[language] || project.memoryLabel?.es || t('download_memory'))
                                        }
                                    </span>
                                </a>
                            )}
                            {project.externalLinks?.map((link, i) => {
                                const platformNames = {
                                    artstation: 'ArtStation',
                                    github: 'GitHub',
                                    itch: 'itch.io',
                                    behance: 'Behance',
                                    vimeo: 'Vimeo',
                                    youtube: 'YouTube'
                                };
                                const viewOn = { es: 'Ver en', en: 'View on', ca: 'Veure a', gl: 'Ver en' }[language] || 'Ver en';
                                const platformName = platformNames[link.platform] || link.platform;
                                return (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1.75rem', borderRadius: '12px', fontWeight: 700 }}
                                    >
                                        {link.platform === 'artstation'
                                            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.129-1.268H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg>
                                            : link.platform === 'github'
                                            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        }
                                        <span>{viewOn} {platformName}</span>
                                    </a>
                                );
                            })}
                        </div>
                    )}

                    {renderedRichContent && (
                        <div style={{ borderTop: '2px solid #f3f4f6', paddingTop: '2rem' }}>
                            {renderedRichContent}
                        </div>
                    )}

                    {/* Galería automática si no está en el contenido rico y hay más de una imagen */}
                    {!hasGalleryInContent && project.images && project.images.length > 1 && (
                        <div style={{ borderTop: '2px solid #f3f4f6', marginTop: '2rem', paddingTop: '2rem' }}>
                            <h3 style={{ 
                                fontSize: '1.4rem', 
                                marginBottom: '1.5rem', 
                                color: 'var(--color-primary)', 
                                fontWeight: 700 
                            }}>
                                {language === 'gl' ? 'Galería de imaxes' : (language === 'en' ? 'Image Gallery' : 'Galería de imágenes')}
                            </h3>
                            <div className="custom-gallery">
                                {project.images.map((img, idx) => (
                                    <div key={idx} onClick={() => openLightbox(img)} style={{ cursor: 'pointer' }}>
                                        <img 
                                            src={img} 
                                            alt={`${project.title} - ${idx + 1}`} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Overlay */}
            {selectedIndex !== null && galleryImages[selectedIndex] && (
                <div
                    className="lightbox-overlay"
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 3000,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'zoom-out', padding: '1rem'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeLightbox();
                        }}
                        style={{
                            position: 'absolute', top: '1.5rem', right: '1.5rem',
                            background: 'white', border: 'none', borderRadius: '50%',
                            width: '40px', height: '40px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 3001
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Navigation Arrows — hidden on mobile, visible on tablet+ */}
                    {galleryImages.length > 1 && !isMobile && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                style={{
                                    position: 'absolute', left: '1.5rem',
                                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%',
                                    width: '56px', height: '56px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 3001, transition: 'all 0.25s ease', color: 'white',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                                    e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                    e.currentTarget.style.color = 'white';
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>

                            <button
                                onClick={handleNextImage}
                                style={{
                                    position: 'absolute', right: '1.5rem',
                                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%',
                                    width: '56px', height: '56px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 3001, transition: 'all 0.25s ease', color: 'white',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                                    e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                    e.currentTarget.style.color = 'white';
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Counter */}
                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '0.9rem', fontWeight: 500, background: 'rgba(0,0,0,0.5)', padding: '0.3rem 0.8rem', borderRadius: '1rem', zIndex: 3001 }}>
                        {selectedIndex + 1} / {galleryImages.length}
                    </div>

                    {/* Scroll container — works on all devices; arrows handle keyboard/click navigation */}
                    <div
                        ref={lightboxContainerRef}
                        onScroll={handleLightboxScroll}
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            padding: 0
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {galleryImages.map((img, idx) => (
                            <div
                                key={idx}
                                style={{
                                    minWidth: '100%',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    scrollSnapAlign: 'center',
                                    padding: isMobile ? '1rem' : '1rem 5rem'
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`Vista ${idx + 1}`}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '85vh',
                                        objectFit: 'contain',
                                        borderRadius: '4px',
                                        boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
