import { useState, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import ProjectModal from './ProjectModal';
import { allSkills } from '../data/content';

const getUniqueTags = (projects) => {
    const tags = new Set();
    projects.forEach(p => {
        if (p.tags) p.tags.forEach(t => tags.add(t));
    });
    return Array.from(tags).sort();
};

const getFilterLabel = (type, language) => {
    const labels = {
        all: { es: 'Todos', en: 'All', gl: 'Todos', ca: 'Tots' },
        academic: { es: 'Académico', en: 'Academic', gl: 'Académico', ca: 'Acadèmic' },
        professional: { es: 'Profesional', en: 'Professional', gl: 'Profesional', ca: 'Professional' },
        personal: { es: 'Personal', en: 'Personal', gl: 'Persoal', ca: 'Personal' }
    };
    return labels[type] ? (labels[type][language] || labels[type].es) : type;
};

export default function ProjectsGallery({ projects, onProjectSelect }) {
    const { language, t } = useTranslation();
    const [filterType, setFilterType] = useState('all');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const availableFilters = useMemo(() => {
        const types = ['all', 'academic', 'professional', 'personal'];
        return types.filter(type => {
            if (type === 'all') return true;
            return projects.some(p => p.type === type);
        });
    }, [projects]);

    const availableTags = useMemo(() => getUniqueTags(projects || []), [projects]);
    
    const availableYears = useMemo(() => {
        const years = new Set();
        (projects || []).forEach(p => {
            if (p.year) years.add(p.year);
        });
        return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
    }, [projects]);

    const toggleTag = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
        );
    };

    const toggleYear = (year) => {
        setSelectedYears(prev =>
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
        );
    };

    const [sortDesc, setSortDesc] = useState(true);

    const processedProjects = useMemo(() => {
        if (!projects) return [];

        let filtered = projects.map((project, originalIndex) => ({ project, originalIndex }));

        if (filterType !== 'all') {
            filtered = filtered.filter(({ project }) => project.type === filterType);
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter(({ project }) =>
                selectedTags.every(tag => project.tags && project.tags.includes(tag))
            );
        }

        if (selectedYears.length > 0) {
            filtered = filtered.filter(({ project }) => selectedYears.includes(project.year));
        }

        filtered.sort((a, b) => {
            const yearA = parseInt(a.project.year) || 0;
            const yearB = parseInt(b.project.year) || 0;

            if (yearA !== yearB) {
                return yearB - yearA;
            }

            // Canonical tie-break: source order from project list.
            return a.originalIndex - b.originalIndex;
        });

        const ordered = filtered.map(({ project }) => project);
        return sortDesc ? ordered : ordered.reverse();
    }, [projects, filterType, selectedTags, selectedYears, sortDesc]);

    return (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn flex items-center gap-xs"
                    style={{
                        padding: '0.6rem 1.5rem',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        backgroundColor: showFilters ? 'var(--color-primary)' : 'white',
                        color: showFilters ? 'white' : 'var(--color-primary)',
                        border: '2px solid var(--color-primary)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    {t('filter_button')}
                </button>
            </div>

            {showFilters && (
                <div className="card animate-fade-in" style={{ 
                    marginBottom: 'var(--spacing-lg)', 
                    padding: 'var(--spacing-md)',
                    position: 'relative',
                    zIndex: 100 // Ensure filters stay above the projects grid
                }}>
                    <div className="flex flex-col gap-sm">
                        {/* First Row: Type, Year, Sort */}
                        <div className="filters-container flex flex-wrap gap-sm items-center" style={{ position: 'relative' }}>
                        {/* Desktop Filters */}
                        <div className="desktop-filters" style={{ flex: '1 1 auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div className="flex flex-wrap gap-sm">
                                {availableFilters.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`btn ${filterType === type ? 'btn-primary' : 'btn-outline'}`}
                                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                                    >
                                        {getFilterLabel(type, language)}
                                    </button>
                                ))}
                            </div>

                            <div className="nav-divider" style={{ width: '1px', height: '20px', backgroundColor: 'var(--color-border)', margin: '0 4px' }} />

                            {/* Year Filter for Desktop */}
                            <div className="flex items-center gap-sm">
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                        className={`btn ${selectedYears.length > 0 ? 'btn-primary' : 'btn-outline'}`}
                                        style={{ 
                                            padding: '0.6rem 1.2rem', 
                                            fontSize: '0.85rem', 
                                            display: 'flex', 
                                            gap: '8px', 
                                            alignItems: 'center'
                                        }}
                                    >
                                        <span>{t('year_label')}</span>
                                        {selectedYears.length > 0 && (
                                            <span style={{ 
                                                background: 'rgba(255,255,255,0.25)', 
                                                padding: '0 6px', 
                                                borderRadius: '10px',
                                                fontSize: '0.7rem'
                                            }}>
                                                {selectedYears.length}
                                            </span>
                                        )}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isYearDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    
                                    {isYearDropdownOpen && (
                                        <>
                                            <div 
                                                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 4998 }} 
                                                onClick={() => setIsYearDropdownOpen(false)}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                marginTop: '0.5rem',
                                                backgroundColor: 'white',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '8px',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                                zIndex: 5000,
                                                minWidth: '160px',
                                                padding: '0.5rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '2px'
                                            }}>
                                                {availableYears.map(year => (
                                                    <label 
                                                        key={year}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            padding: '0.5rem 0.8rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.85rem',
                                                            borderRadius: '4px'
                                                        }}
                                                    >
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedYears.includes(year)}
                                                            onChange={() => toggleYear(year)}
                                                            style={{ accentColor: 'var(--color-primary)' }}
                                                        />
                                                        {year}
                                                    </label>
                                                ))}
                                                {selectedYears.length > 0 && (
                                                    <button 
                                                        onClick={() => setSelectedYears([])}
                                                        style={{ 
                                                            marginTop: '4px',
                                                            padding: '0.5rem',
                                                            fontSize: '0.75rem',
                                                            color: 'var(--color-primary)',
                                                            fontWeight: 800,
                                                            borderTop: '1px solid var(--color-border)',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        {t('clear_all')}
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Sort Arrow for Desktop */}
                                <button
                                    onClick={() => setSortDesc(!sortDesc)}
                                    className="btn btn-outline"
                                    style={{ 
                                        padding: '0.6rem 0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '42px',
                                        height: '42px',
                                        borderRadius: '10px'
                                    }}
                                    title={sortDesc ? (language === 'es' ? 'Reciente primero' : 'Newest first') : (language === 'es' ? 'Antiguo primero' : 'Oldest first')}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: sortDesc ? 'flex-start' : 'flex-end' }}>
                                            <div style={{ width: '12px', height: '2px', backgroundColor: 'currentColor', borderRadius: '10px' }}></div>
                                            <div style={{ width: '8px', height: '2px', backgroundColor: 'currentColor', borderRadius: '10px' }}></div>
                                            <div style={{ width: '4px', height: '2px', backgroundColor: 'currentColor', borderRadius: '10px' }}></div>
                                        </div>
                                    </div>
                                    <svg 
                                        width="14" 
                                        height="14" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="3.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        style={{ 
                                            marginLeft: '6px',
                                            transform: sortDesc ? 'rotate(0deg)' : 'rotate(180deg)', 
                                            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                                        }}
                                    >
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        {/* Mobile Filters (Consolidated Row 1) */}
                        <div className="mobile-filters" style={{ display: 'none', width: '100%' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
                                {/* Type Dropdown */}
                                <div style={{ position: 'relative', flex: '1 1 auto', minWidth: '0' }}>
                                    <button
                                        onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                        className="btn btn-primary"
                                        style={{ 
                                            padding: '0.6rem 0.8rem', 
                                            fontSize: '0.8rem', 
                                            display: 'flex', 
                                            gap: '4px', 
                                            alignItems: 'center', 
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {getFilterLabel(filterType, language)}
                                        </span>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isFilterDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    
                                    {isFilterDropdownOpen && (
                                        <>
                                            <div 
                                                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1998 }} 
                                                onClick={() => setIsFilterDropdownOpen(false)}
                                            />
                                            <div style={{
                                                position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem',
                                                backgroundColor: 'white', border: '1px solid var(--color-border)',
                                                borderRadius: '8px', boxShadow: 'var(--shadow-md)', zIndex: 1999,
                                                minWidth: '150px', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px'
                                            }}>
                                                {availableFilters.map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => {
                                                            setFilterType(type);
                                                            setIsFilterDropdownOpen(false);
                                                        }}
                                                        style={{
                                                            padding: '0.6rem 1rem', fontSize: '0.8rem', textAlign: 'left',
                                                            backgroundColor: filterType === type ? 'var(--color-secondary)' : 'transparent',
                                                            color: filterType === type ? 'var(--color-primary)' : 'var(--color-text)',
                                                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: filterType === type ? 800 : 500
                                                        }}
                                                    >
                                                        {getFilterLabel(type, language)}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Year Multi-select Dropdown */}
                                <div style={{ position: 'relative', flex: '1 1 auto', minWidth: '0' }}>
                                    <button
                                        onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                        className={`btn ${selectedYears.length > 0 ? 'btn-primary' : 'btn-outline'}`}
                                        style={{ 
                                            padding: '0.6rem 0.8rem', 
                                            fontSize: '0.8rem', 
                                            display: 'flex', 
                                            gap: '4px', 
                                            alignItems: 'center', 
                                            width: '100%', 
                                            justifyContent: 'space-between',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', overflow: 'hidden' }}>
                                            <span style={{ whiteSpace: 'nowrap' }}>{t('year_label')}</span>
                                            {selectedYears.length > 0 && (
                                                <span style={{ 
                                                    background: 'rgba(255,255,255,0.2)', 
                                                    padding: '0 5px', 
                                                    borderRadius: '10px',
                                                    fontSize: '0.65rem',
                                                    flexShrink: 0
                                                }}>
                                                    {selectedYears.length}
                                                </span>
                                            )}
                                        </div>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isYearDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    
                                    {isYearDropdownOpen && (
                                        <>
                                            <div 
                                                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 4998 }} 
                                                onClick={() => setIsYearDropdownOpen(false)}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                marginTop: '0.5rem',
                                                backgroundColor: 'white',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '8px',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                                zIndex: 5000,
                                                minWidth: '160px',
                                                maxWidth: '200px',
                                                width: 'auto',
                                                padding: '0.5rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '2px',
                                                overflowY: 'auto',
                                                maxHeight: '280px'
                                            }}>
                                                {availableYears.map(year => (
                                                    <label 
                                                        key={year}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            padding: '0.4rem 0.6rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.8rem',
                                                            borderRadius: '4px',
                                                            transition: 'background 0.2s',
                                                            backgroundColor: selectedYears.includes(year) ? 'var(--color-primary-light)' : 'transparent'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = selectedYears.includes(year) ? 'var(--color-primary-light)' : '#f9f9f9'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedYears.includes(year) ? 'var(--color-primary-light)' : 'transparent'}
                                                    >
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedYears.includes(year)}
                                                            onChange={() => toggleYear(year)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        <span style={{ fontWeight: selectedYears.includes(year) ? 800 : 500, color: selectedYears.includes(year) ? 'var(--color-primary)' : 'inherit' }}>
                                                            {year}
                                                        </span>
                                                    </label>
                                                ))}
                                                {selectedYears.length > 0 && (
                                                    <button 
                                                        onClick={() => setSelectedYears([])}
                                                        style={{
                                                            marginTop: '0.4rem',
                                                            padding: '0.8rem 0.5rem',
                                                            borderTop: '1px solid #eee',
                                                            fontSize: '0.8rem',
                                                            color: '#ef4444',
                                                            fontWeight: 800,
                                                            backgroundColor: 'white',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            textAlign: 'center',
                                                            position: 'sticky',
                                                            bottom: '-0.5rem',
                                                            left: 0,
                                                            right: 0,
                                                            width: '100%',
                                                            zIndex: 10
                                                        }}
                                                    >
                                                        {t('clear_filters')}
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Sort Button */}
                                <button
                                    onClick={() => setSortDesc(!sortDesc)}
                                    className="btn btn-outline"
                                    style={{ 
                                        padding: '0.6rem', 
                                        fontSize: '0.8rem', 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center',
                                        minWidth: '38px',
                                        height: '38px',
                                        borderRadius: '10px',
                                        flexShrink: 0
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: sortDesc ? 'flex-start' : 'flex-end' }}>
                                            <div style={{ width: '10px', height: '2px', backgroundColor: 'currentColor', borderRadius: '10px' }}></div>
                                            <div style={{ width: '6px', height: '2px', backgroundColor: 'currentColor', borderRadius: '10px' }}></div>
                                            <div style={{ width: '3px', height: '2px', backgroundColor: 'currentColor', borderRadius: '10px' }}></div>
                                        </div>
                                    </div>
                                    <svg 
                                        width="12" 
                                        height="12" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="3.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        style={{ 
                                            marginLeft: '4px',
                                            transform: sortDesc ? 'rotate(0deg)' : 'rotate(180deg)', 
                                            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                                        }}
                                    >
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Desktop-only Year and Sort (hidden on mobile as they are moved to the consolidated row) */}
                        <div className="desktop-filters" style={{ display: 'none' }}>
                            <div className="flex gap-sm items-center">
                                {/* Year Multi-select Dropdown */}
                                <div style={{ position: 'relative', maxWidth: '180px', width: '100%' }}>
                                    <button
                                        onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                        className={`btn ${selectedYears.length > 0 ? 'btn-primary' : 'btn-outline'}`}
                                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width: '100%', justifyContent: 'center' }}
                                    >
                                        <span>{t('year_label')}</span>
                                        {selectedYears.length > 0 && (
                                            <span style={{ 
                                                background: 'rgba(255,255,255,0.2)', 
                                                padding: '0 5px', 
                                                borderRadius: '10px',
                                                fontSize: '0.65rem'
                                            }}>
                                                {selectedYears.length}
                                            </span>
                                        )}
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isYearDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    
                                    {isYearDropdownOpen && (
                                        <>
                                            <div 
                                                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 4998 }} 
                                                onClick={() => setIsYearDropdownOpen(false)}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                marginTop: '0.5rem',
                                                backgroundColor: 'white',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '8px',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                                zIndex: 5000,
                                                minWidth: '160px',
                                                maxWidth: '200px',
                                                width: 'auto',
                                                padding: '0.5rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '2px',
                                                overflowY: 'auto',
                                                maxHeight: '280px'
                                            }}>
                                                {availableYears.map(year => (
                                                    <label 
                                                        key={year}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            padding: '0.4rem 0.6rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.8rem',
                                                            borderRadius: '4px',
                                                            transition: 'background 0.2s',
                                                            backgroundColor: selectedYears.includes(year) ? 'var(--color-primary-light)' : 'transparent'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = selectedYears.includes(year) ? 'var(--color-primary-light)' : '#f9f9f9'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedYears.includes(year) ? 'var(--color-primary-light)' : 'transparent'}
                                                    >
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedYears.includes(year)}
                                                            onChange={() => toggleYear(year)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        <span style={{ fontWeight: selectedYears.includes(year) ? 800 : 500, color: selectedYears.includes(year) ? 'var(--color-primary)' : 'inherit' }}>
                                                            {year}
                                                        </span>
                                                    </label>
                                                ))}
                                                {selectedYears.length > 0 && (
                                                    <button 
                                                        onClick={() => setSelectedYears([])}
                                                        style={{
                                                            marginTop: '0.4rem',
                                                            padding: '0.8rem 0.5rem',
                                                            borderTop: '1px solid #eee',
                                                            fontSize: '0.8rem',
                                                            color: '#ef4444',
                                                            fontWeight: 800,
                                                            backgroundColor: 'white',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            textAlign: 'center',
                                                            position: 'sticky',
                                                            bottom: '-0.5rem',
                                                            left: 0,
                                                            right: 0,
                                                            width: '100%',
                                                            zIndex: 10
                                                        }}
                                                    >
                                                        {t('clear_filters')}
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={() => setSortDesc(!sortDesc)}
                                    className="btn btn-outline sort-button"
                                    style={{ padding: '0.6rem 0.4rem', fontSize: '0.65rem', display: 'flex', gap: '4px', whiteSpace: 'nowrap', minWidth: '32px', justifyContent: 'center' }}
                                >
                                    <span>{sortDesc ? '⬇' : '⬆'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Second Row: Tags/Tools */}
                    <div style={{
                        marginTop: '0.5rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--color-border)',
                        width: '100%'
                    }}>
                        {/* Desktop Tags (Visible on large screens) */}
                        <div className="desktop-filters" style={{ width: '100%' }}>
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
                                    
                                    {selectedTags.length > 0 && (
                                        <button
                                            onClick={() => setSelectedTags([])}
                                            style={{
                                                backgroundColor: 'transparent',
                                                color: '#ef4444',
                                                border: '1px solid #ef4444',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                textTransform: 'uppercase',
                                                fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '4px',
                                                whiteSpace: 'nowrap',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                fontWeight: 800
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#ef4444';
                                                e.currentTarget.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = '#ef4444';
                                            }}
                                        >
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                            <span>{t('clear_filters')}</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Tags Dropdown (Visible on small screens) */}
                        <div className="mobile-filters" style={{ width: '100%', display: 'none' }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <button
                                    onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                                    className={`btn ${selectedTags.length > 0 ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ 
                                        padding: '0.6rem 1rem', 
                                        fontSize: '0.8rem', 
                                        display: 'flex', 
                                        gap: '8px', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', opacity: 0.8 }}>
                                            {t('tags_label')}
                                        </span>
                                        <span>
                                            {selectedTags.length === 0 
                                                ? (language === 'en' ? 'All' : (language === 'ca' ? 'Totes' : 'Todas'))
                                                : `${selectedTags.length} ${language === 'en' ? 'tools' : (language === 'ca' ? 'eines' : 'herramientas')}`}
                                        </span>
                                    </div>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isTagDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>

                                {isTagDropdownOpen && (
                                    <>
                                        <div 
                                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 4998 }} 
                                            onClick={() => setIsTagDropdownOpen(false)}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            marginTop: '0.5rem',
                                            backgroundColor: 'white',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                            zIndex: 5000,
                                            width: '100%',
                                            minWidth: '240px',
                                            padding: '0.5rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '2px',
                                            overflowY: 'auto',
                                            maxHeight: '350px'
                                        }}>
                                            <div style={{ padding: '0.5rem', borderBottom: '1px solid #eee', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-primary)' }}>{t('tags_label')}</span>
                                                {selectedTags.length > 0 && (
                                                    <button onClick={() => setSelectedTags([])} style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}>
                                                        {t('clear_filters')}
                                                    </button>
                                                )}
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                                {availableTags.map(tagId => (
                                                    <label 
                                                        key={tagId}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            padding: '0.6rem 0.6rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.75rem',
                                                            borderRadius: '8px',
                                                            backgroundColor: selectedTags.includes(tagId) ? 'var(--color-primary-light)' : 'transparent',
                                                            transition: 'background 0.2s'
                                                        }}
                                                    >
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedTags.includes(tagId)}
                                                            onChange={() => toggleTag(tagId)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        <span style={{ 
                                                            fontWeight: selectedTags.includes(tagId) ? 800 : 500, 
                                                            color: selectedTags.includes(tagId) ? 'var(--color-primary)' : 'inherit',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            {allSkills[tagId]?.name || tagId}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            )}

            <div className="gallery-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
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
                                boxShadow: 'var(--shadow-sm)',
                                zIndex: 2
                            }}>
                                {project.year}
                            </div>
                            {project.isWIP && (
                                <div style={{
                                    position: 'absolute', top: '10px', left: '10px',
                                    background: 'var(--color-primary)', color: 'white',
                                    padding: '2px 10px', borderRadius: '4px',
                                    fontWeight: 900, fontSize: '0.65rem',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                    zIndex: 2,
                                    letterSpacing: '0.05em'
                                }}>
                                    {language === 'en' ? 'Work in Progress' : (language === 'ca' ? 'En procés' : (language === 'gl' ? 'En proceso' : 'Trabajo en proceso'))}
                                </div>
                            )}
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
                                marginBottom: 'var(--spacing-sm)',
                                width: '100%'
                            }}>
                                {project.tags.map(tagId => (
                                    <span key={tagId} className="tag" style={{
                                        fontSize: 'clamp(0.6rem, 1vw, 0.65rem)',
                                        fontWeight: 800,
                                        padding: '0.15rem 0.5rem',
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
                            </div>
                            <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-md)', flex: 1 }}>
                                {project.summary[language] || project.summary.es}
                            </p>

                            <button
                                onClick={() => onProjectSelect({ ...project, image: project.image })}
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
