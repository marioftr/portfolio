import { useEffect, useRef, useState, memo, useMemo } from 'react';
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
    const modalRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleNextImage = (e) => {
        if (e) e.stopPropagation();
        if (!project.images || project.images.length === 0) return;
        
        // Normalizar la URL actual (eliminar el dominio si existe para comparar con el array)
        const currentPath = selectedImage.startsWith('http') 
            ? new URL(selectedImage).pathname 
            : selectedImage;

        const currentIndex = project.images.indexOf(currentPath);
        
        // Si no se encuentra (por slash inicial o similar), buscamos coincidencia parcial
        const safeIndex = currentIndex === -1 
            ? project.images.findIndex(img => img.includes(currentPath) || currentPath.includes(img))
            : currentIndex;

        const nextIndex = (safeIndex + 1) % project.images.length;
        setSelectedImage(project.images[nextIndex]);
    };

    const handlePrevImage = (e) => {
        if (e) e.stopPropagation();
        if (!project.images || project.images.length === 0) return;
        
        const currentPath = selectedImage.startsWith('http') 
            ? new URL(selectedImage).pathname 
            : selectedImage;

        const currentIndex = project.images.indexOf(currentPath);
        
        const safeIndex = currentIndex === -1 
            ? project.images.findIndex(img => img.includes(currentPath) || currentPath.includes(img))
            : currentIndex;

        const prevIndex = (safeIndex - 1 + project.images.length) % project.images.length;
        setSelectedImage(project.images[prevIndex]);
    };

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
    const renderRichText = (text) => {
        if (!text) return null;

        // Split by newlines, preserving empty ones
        const lines = text.split(/\r?\n/);

        return lines.map((line, index) => {
            const trimmed = line.trim();

            // Empty line: spacer
            if (trimmed === '') {
                return <div key={index} style={{ height: '1.25rem' }} aria-hidden="true" />;
            }

            // Headings
            if (trimmed.startsWith('## ')) {
                return (
                    <h3 key={index} style={{
                        fontSize: '1.4rem',
                        marginTop: '1.5rem',
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
                        marginTop: '1.25rem',
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
                const content = trimmed.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
                            style={{ margin: '2rem 0' }}
                            onClick={(e) => {
                                if (e.target.tagName === 'IMG') {
                                    setSelectedImage(e.target.src);
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
            const htmlContent = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return (
                <p
                    key={index}
                    style={{ marginBottom: '1.2rem', lineHeight: 1.75, fontSize: '1.05rem', color: 'var(--color-text)' }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            );
        });
    };

    if (!project) return null;

    const hasLongDescription = project.longDescription;
    const richContent = hasLongDescription ? (project.longDescription[language] || project.longDescription.es) : null;

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
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 100 }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'white', borderRadius: '50%',
                            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', border: 'none',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Imagen de cabecera: Ajustada para ocupar todo el ancho superior */}
                {(project.image || (project.images && project.images[0])) && (
                    <div className="project-modal-header-container" style={{ 
                        width: '100%', 
                        borderRadius: '20px 20px 0 0', 
                        overflow: 'hidden', 
                        backgroundColor: '#f9f9f9',
                        flexShrink: 0,
                        borderBottom: '3px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '180px',
                        maxHeight: '320px',
                    }}>
                        <img
                            src={project.image || project.images[0]}
                            className="project-modal-header-img"
                            alt={typeof project.title === 'string' ? project.title : (project.title[language] || project.title.es)}
                            style={{ 
                                width: '100%',
                                height: 'auto',
                                maxHeight: '220px',
                                objectFit: 'cover',
                                margin: '0 auto',
                                display: 'block',
                                background: 'white'
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
                        </div>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                            {typeof project.title === 'string' ? project.title : (project.title[language] || project.title.es)}
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                            {typeof project.category === 'string' ? project.category : (project.category[language] || project.category.es)}
                        </p>
                    </div>

                    <div style={{ fontSize: '1.05rem', color: '#444', marginBottom: '2rem', lineHeight: 1.6 }}>
                        {renderRichText(project.description[language] || project.description.es)}
                    </div>

                    {project.memoryUrl && (
                        <div style={{ marginBottom: '2rem' }}>
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
                                <span>{t('download_memory')}</span>
                            </a>
                        </div>
                    )}

                    {project.tags && (
                        <div className="flex flex-wrap gap-xs" style={{ marginBottom: '2rem' }}>
                            {project.tags.map(tagId => (
                                <span key={tagId} className="tag" style={{ background: '#f3f4f6', color: '#666', fontSize: '0.75rem', fontWeight: 600, border: 'none' }}>
                                    {allSkills[tagId]?.name || tagId}
                                </span>
                            ))}
                        </div>
                    )}

                    {richContent && (
                        <div style={{ borderTop: '2px solid #f3f4f6', paddingTop: '2rem' }}>
                            {renderRichText(richContent)}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
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
                        setSelectedImage(null);
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
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

                    {/* Navigation Arrows */}
                    {project.images && project.images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                style={{
                                    position: 'absolute', left: '1.5rem',
                                    background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
                                    width: '50px', height: '50px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 3001, transition: 'background 0.2s', color: 'white'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                            >
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>

                            <button
                                onClick={handleNextImage}
                                style={{
                                    position: 'absolute', right: '1.5rem',
                                    background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
                                    width: '50px', height: '50px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 3001, transition: 'background 0.2s', color: 'white'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                            >
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </>
                    )}

                    <img
                        src={selectedImage}
                        alt="Enlarged view"
                        style={{ maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '4px', cursor: 'default', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
