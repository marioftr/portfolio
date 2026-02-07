import { useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { allSkills } from '../data/content';

export default function FeaturedProjects({ projects, onProjectSelect, onViewAll }) {
    const { language, t } = useTranslation();
    const scrollContainerRef = useRef(null);

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
                {projects.length > 3 && (
                    <button
                        onClick={scrollLeft}
                        className="scroll-arrow flex items-center justify-center transition-all"
                        style={{
                            position: 'absolute',
                            left: '-2rem',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            zIndex: 10
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
                        scrollBehavior: 'smooth',
                        width: '100%'
                    }}
                >
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="card flex flex-col transition-all" 
                            style={{ 
                                padding: 0, 
                                overflow: 'hidden', 
                                cursor: 'pointer',
                                minWidth: 'calc(50% - var(--spacing-xs))',
                                flex: '0 0 calc(33.333% - var(--spacing-xs))',
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
                            <div style={{ height: '150px', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--color-secondary)' }}>
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
                                <div className="flex flex-wrap gap-xs" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    {project.tags && project.tags.slice(0, 2).map(tagId => (
                                        <span key={tagId} style={{
                                            fontSize: '0.55rem',
                                            fontWeight: 800,
                                            padding: '0.08rem 0.35rem',
                                            backgroundColor: 'var(--color-primary-light)',
                                            color: 'var(--color-primary-dark)',
                                            borderRadius: 'var(--radius-full)',
                                            textTransform: 'uppercase',
                                            border: '1px solid var(--color-primary-light)',
                                            whiteSpace: 'nowrap'
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
                {projects.length > 3 && (
                    <button
                        onClick={scrollRight}
                        className="scroll-arrow flex items-center justify-center transition-all"
                        style={{
                            position: 'absolute',
                            right: '-2rem',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            zIndex: 10
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
