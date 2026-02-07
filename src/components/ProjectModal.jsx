import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { allSkills } from '../data/content';

export default function ProjectModal({ project, onClose }) {
    const { language, t } = useTranslation();
    const carouselRef = useRef(null);
    const modalRef = useRef(null);
    const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: true });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
            if (modalRef.current) modalRef.current.scrollTop = 0;
            // Initial check for carousel if it exists after render
            setTimeout(checkScroll, 100);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    const checkScroll = () => {
        const carousel = carouselRef.current?.querySelector('.custom-video-carousel');
        if (!carousel) return;

        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        setScrollState({
            canScrollLeft: scrollLeft > 10,
            canScrollRight: scrollLeft + clientWidth < scrollWidth - 10
        });
    };

    const scrollCarousel = (direction) => {
        const carousel = carouselRef.current?.querySelector('.custom-video-carousel');
        if (!carousel) return;
        const scrollAmount = carousel.offsetWidth + 24;
        carousel.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(checkScroll, 400);
    };

    // Improved parser inside the component to handle refs if needed (though we use class logic mostly)
    const renderRichText = (text) => {
        if (!text) return null;

        // Split by single newlines but preserve blocks
        const blocks = text.split('\n').filter(line => line.trim() !== '');

        return blocks.map((line, index) => {
            const trimmed = line.trim();

            // Headings
            if (trimmed.startsWith('## ')) return <h3 key={index} style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 700 }}>{trimmed.replace('## ', '')}</h3>;
            if (trimmed.startsWith('### ')) return <h4 key={index} style={{ fontSize: '1.1rem', marginTop: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>{trimmed.replace('### ', '')}</h4>;

            // Lists
            if (trimmed.startsWith('- ')) {
                return <li key={index} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: trimmed.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
            }

            // HTML Blocks (Gallery / Carousel)
            if (trimmed.startsWith('<div')) {
                if (trimmed.includes('custom-video-carousel')) {
                    return (
                        <div key={index} className="carousel-wrapper">
                            <div ref={carouselRef} onScroll={checkScroll} dangerouslySetInnerHTML={{ __html: trimmed }} />
                            <div className="carousel-nav">
                                <button
                                    className={`carousel-btn ${!scrollState.canScrollLeft ? 'hidden' : ''}`}
                                    onClick={() => scrollCarousel('left')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    <span>{language === 'gl' ? 'Anterior' : (language === 'en' ? 'Previous' : 'Anterior')}</span>
                                </button>
                                <button
                                    className={`carousel-btn ${!scrollState.canScrollRight ? 'hidden' : ''}`}
                                    onClick={() => scrollCarousel('right')}
                                >
                                    <span>{language === 'gl' ? 'Seguinte' : (language === 'en' ? 'Next' : 'Siguiente')}</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    );
                }
                // Wrap gallery images to make them clickable
                if (trimmed.includes('custom-gallery')) {
                    return (
                        <div
                            key={index}
                            onClick={(e) => {
                                if (e.target.tagName === 'IMG') {
                                    setSelectedImage(e.target.src);
                                }
                            }}
                            dangerouslySetInnerHTML={{ __html: trimmed }}
                        />
                    );
                }
                return <div key={index} dangerouslySetInnerHTML={{ __html: trimmed }} />;
            }

            // Simple HTML (iframe / img)
            if (trimmed.startsWith('<iframe') || trimmed.startsWith('<img')) {
                return <div key={index} style={{ margin: '1.5rem 0' }} dangerouslySetInnerHTML={{ __html: trimmed }} />;
            }

            // Default Paragraph
            return (
                <p key={index} style={{ marginBottom: '1rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}
                    dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
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
                className="card animate-fade-in"
                style={{
                    maxWidth: '850px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
                    position: 'relative', padding: '0', backgroundColor: '#fff',
                    borderRadius: '20px', display: 'flex', flexDirection: 'column',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
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
                {/* Imagen de cabecera */}
                {project.image && (
                    <div style={{ width: '100%', borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
                        <img
                            src={project.image}
                            alt={project.title[language] || project.title}
                            style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                )}

                <div style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div className="flex items-center gap-sm" style={{ marginBottom: '0.75rem' }}>
                            <span className="tag" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 700 }}>{project.year}</span>
                            <span style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', fontWeight: 500 }}>{project.type === 'academic' ? t('project_academic') : t('project_professional')}</span>
                        </div>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{project.title[language] || project.title.es || project.title}</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '1rem' }}>
                            {project.category[language] || project.category.es}
                        </p>
                    </div>

                    <div style={{ fontSize: '1.05rem', color: '#444', marginBottom: '2rem', lineHeight: 1.6 }}>
                        {project.description[language] || project.description.es}
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
                        backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 3000,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'zoom-out', padding: '2rem'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                        style={{
                            position: 'absolute', top: '2rem', right: '2rem',
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
                    <img
                        src={selectedImage}
                        alt="Enlarged view"
                        style={{ maxWidth: '95%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px', cursor: 'default' }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
