import { useState, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import ProjectModal from './ProjectModal';
import { allSkills, projects as allProjectsData } from '../data/content';

const getUniqueTags = (projects) => {
    const tags = new Set();
    projects.forEach(p => {
        if (p.tags) p.tags.forEach(t => tags.add(t));
    });
    return Array.from(tags).sort();
};

const getFilterLabel = (type, language) => {
    const labels = {
        all: { es: 'Todos', en: 'All', gl: 'Todos' },
        academic: { es: 'Académico', en: 'Academic', gl: 'Académico' },
        professional: { es: 'Profesional', en: 'Professional', gl: 'Profesional' },
        personal: { es: 'Personal', en: 'Personal', gl: 'Persoal' }
    };
    return labels[type] ? (labels[type][language] || labels[type].es) : type;
};

export default function ProjectsGallery({ projects, onProjectSelect }) {
    const { language, t } = useTranslation();
    const [filterType, setFilterType] = useState('all');
    const [selectedTags, setSelectedTags] = useState([]);

    const availableTags = useMemo(() => getUniqueTags(allProjectsData || []), []);

    const toggleTag = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
        );
    };

    const [sortDesc, setSortDesc] = useState(true);

    const processedProjects = useMemo(() => {
        if (!projects) return [];
        let filtered = [...projects];

        if (filterType !== 'all') {
            filtered = filtered.filter(p => p.type === filterType);
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter(p =>
                selectedTags.every(tag => p.tags && p.tags.includes(tag))
            );
        }

        return filtered.sort((a, b) => {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            return sortDesc ? yearB - yearA : yearA - yearB;
        });
    }, [projects, filterType, selectedTags, sortDesc]);

    return (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
            <div className="card" style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)' }}>
                <div className="flex flex-col">
                    <div className="filters-container flex flex-wrap gap-sm justify-between items-center">
                        <div className="flex flex-wrap gap-sm">
                            {['all', 'academic', 'professional', 'personal'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`btn ${filterType === type ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                >
                                    {getFilterLabel(type, language)}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setSortDesc(!sortDesc)}
                            className="btn btn-outline sort-button"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', gap: '4px', whiteSpace: 'nowrap' }}
                        >
                            <span>{sortDesc ? '⬇' : '⬆'}</span>
                            <span>{t('year_label')}</span>
                        </button>
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        width: '100%'
                    }}>
                        <div className="flex flex-wrap items-center justify-start gap-sm" style={{ width: '100%' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-light)', opacity: 0.6, flexShrink: 0 }}>
                                {t('tags_label')}
                            </span>

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                justifyContent: 'flex-start',
                                width: '100%'
                            }}>
                                {availableTags.map(tagId => (
                                    <button
                                        key={tagId}
                                        onClick={() => toggleTag(tagId)}
                                        className={`tag ${selectedTags.includes(tagId) ? 'active' : ''}`}
                                        style={{
                                            border: '1px solid currentColor',
                                            backgroundColor: selectedTags.includes(tagId) ? 'var(--color-primary)' : 'transparent',
                                            color: selectedTags.includes(tagId) ? 'white' : 'var(--color-primary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            textTransform: 'uppercase',
                                            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            whiteSpace: 'nowrap',
                                            flex: '0 1 auto'
                                        }}
                                    >
                                        {allSkills[tagId]?.name || tagId}
                                    </button>
                                ))}
                            </div>

                            {selectedTags.length > 0 && (
                                <button
                                    onClick={() => setSelectedTags([])}
                                    title={t('clear_filters')}
                                    style={{
                                        width: '19px',
                                        height: '19px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        border: '1.5px solid currentColor',
                                        borderRadius: '50%',
                                        flexShrink: 0,
                                        backgroundColor: 'transparent',
                                        transition: 'all 0.2s ease',
                                        padding: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: 'var(--spacing-lg)',
                marginTop: 'var(--spacing-lg)'
            }}>
                {processedProjects.map((project) => (
                    <div key={project.id} className="card flex flex-col" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={project.image}
                                alt={project.title[language] || project.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'white', color: 'var(--color-text)',
                                padding: '2px 10px', borderRadius: '4px',
                                fontWeight: 800, fontSize: '0.75rem',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {project.year}
                            </div>
                        </div>

                        <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: '0.25rem' }}>
                                {project.title[language] || project.title.es || project.title}
                            </h3>
                            <p className="text-accent" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'var(--spacing-xs)' }}>
                                {project.category[language] || project.category.es}
                            </p>

                            {/* Visible Tags */}
                            <div style={{ 
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.4rem',
                                marginBottom: 'var(--spacing-sm)'
                            }}>
                                {project.tags.map(tagId => (
                                    <span key={tagId} style={{
                                        fontSize: 'clamp(0.6rem, 1vw, 0.65rem)',
                                        fontWeight: 800,
                                        padding: '0.15rem 0.5rem',
                                        backgroundColor: 'var(--color-primary-light)',
                                        color: 'var(--color-primary-dark)',
                                        borderRadius: 'var(--radius-full)',
                                        textTransform: 'uppercase',
                                        border: '1px solid var(--color-primary-light)',
                                        whiteSpace: 'nowrap',
                                        flex: '0 1 auto'
                                    }}>
                                        {allSkills[tagId]?.name || tagId.replace('_', ' ')}
                                    </span>
                                ))}
                            </div>
                            <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-md)', flex: 1 }}>
                                {project.summary[language] || project.summary.es}
                            </p>

                            <button
                                onClick={() => onProjectSelect(project)}
                                className="btn btn-outline"
                                style={{ width: '100%', padding: '0.5rem' }}
                            >
                                {t('more_info')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
