import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { allSkills } from '../data/content';

export default function FeaturedProjects({ projects, onProjectSelect, onViewAll }) {
    const { language, t } = useTranslation();
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                setCanScrollLeft(scrollLeft > 10);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
            }
        };

        const currentRef = scrollContainerRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            // Initial check after render
            setTimeout(checkScroll, 100);
            
            // Check again if projects change
            checkScroll();
        }

        window.addEventListener('resize', checkScroll);
        
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [projects]);

    if (!projects || projects.length === 0) {
        return null;
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
            <div className="flex justify-between items-end" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <div style={{ flex: 1 }}>
                    {/* Spacing para mantener alineación */}
                </div>
                <button
                    onClick={onViewAll}
                    className="text-accent"
                    style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer' }}
                >
                    {t('view_all_projects')}
                </button>
            </div>

            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Left Arrow */}
                {canScrollLeft && (
                    <button
                        onClick={scrollLeft}
                        className="scroll-arrow flex items-center justify-center transition-all"
                        style={{
                            position: 'absolute',
                            left: '0.5rem', // Posicionado dentro del contenedor
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            zIndex: 20
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'var(--color-primary)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        aria-label="Scroll left"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        paddingBottom: 'var(--spacing-sm)',
                        paddingLeft: '0.25rem',
                        paddingRight: '0.25rem',
                        scrollBehavior: 'smooth',
                        width: '100%'
                    }}
                >
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="card flex flex-col transition-all project-featured-card" 
                            style={{ 
                                padding: 0, 
                                overflow: 'hidden', 
                                cursor: 'pointer',
                                minWidth: 'min(380px, 80vw)',
                                maxWidth: '420px',
                                flex: '0 0 min(380px, 80vw)',
                                height: '100%'
                            }}
                            onClick={() => onProjectSelect(project)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                        >
                            <div style={{ 
                                width: '100%',
                                aspectRatio: '21 / 9',
                                overflow: 'hidden', 
                                position: 'relative', 
                                backgroundColor: 'var(--color-secondary)' 
                            }}>
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title[language] || project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'var(--color-primary-light)',
                                        color: 'var(--color-primary)',
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        textAlign: 'center',
                                        padding: '1rem'
                                    }}>
                                        {project.title[language] || project.title.es || project.title}
                                    </div>
                                )}

                                {project.isWIP && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '12px',
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'white',
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        fontSize: '0.6rem',
                                        fontWeight: 800,
                                        zIndex: 2,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        border: '1px solid rgba(255,255,255,0.3)'
                                    }}>
                                        <span style={{ fontSize: '0.7rem' }}>🏗️</span>
                                        {language === 'es' ? 'EN PROCESO' : language === 'ca' ? 'EN PROCÉS' : language === 'gl' ? 'EN PROCESO' : 'W.I.P.'}
                                    </div>
                                )}

                                <div style={{
                                    position: 'absolute', top: '8px', right: '8px',
                                    background: 'white', color: 'var(--color-text)',
                                    padding: '2px 8px', borderRadius: '4px',
                                    fontWeight: 800, fontSize: '0.7rem',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    {project.year}
                                </div>
                            </div>

                            <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', fontWeight: 800, lineHeight: 1.3 }}>
                                    {project.title[language] || project.title.es || project.title}
                                </h3>
                                <p className="text-accent" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'var(--spacing-xs)', color: 'var(--color-primary)' }}>
                                    {project.category[language] || project.category.es}
                                </p>

                                {/* Visible Tags */}
                                <div className="flex flex-wrap gap-xs" style={{ 
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.25rem',
                                    marginBottom: 'var(--spacing-sm)', 
                                    width: '100%' 
                                }}>
                                    {project.tags && project.tags.slice(0, 2).map(tagId => (
                                        <span key={tagId} className="tag" style={{
                                            fontSize: '0.55rem',
                                            fontWeight: 800,
                                            padding: '0.08rem 0.35rem',
                                            textTransform: 'uppercase',
                                            border: '1px solid var(--color-primary-light)',
                                            whiteSpace: 'nowrap',
                                            backgroundColor: 'var(--color-primary-light)',
                                            color: 'var(--color-primary-dark)',
                                            borderRadius: 'var(--radius-full)'
                                        }}>
                                            {allSkills[tagId]?.name || tagId.replace('_', ' ')}
                                        </span>
                                    ))}
                                    {project.tags && project.tags.length > 2 && (
                                        <span style={{
                                            fontSize: '0.55rem',
                                            fontWeight: 800,
                                            padding: '0.08rem 0.35rem',
                                            color: 'var(--color-text-light)',
                                            textTransform: 'uppercase',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            +{project.tags.length - 2}
                                        </span>
                                    )}
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', flex: 1, lineHeight: 1.4 }}>
                                    {project.summary[language] || project.summary.es}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                {canScrollRight && (
                    <button
                        onClick={scrollRight}
                        className="scroll-arrow flex items-center justify-center transition-all"
                        style={{
                            position: 'absolute',
                            right: '0.5rem', // Posicionado dentro del contenedor
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            zIndex: 20
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'var(--color-primary)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        aria-label="Scroll right"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
