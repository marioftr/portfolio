import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const SectionItemTitle = ({ children }) => (
    <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 800,
        color: 'var(--color-text-light)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: 'var(--spacing-md)'
    }}>
        {children}
    </h3>
);

export default function LanguagesAptitudes({ languages, aptitudes, activeRole }) {
    const { language, t } = useTranslation();
    const [showAllDetails, setShowAllDetails] = useState(false);

    const displayedAptitudes = [
        ...(aptitudes.all || []),
        ...((activeRole && activeRole !== 'all' && aptitudes[activeRole]) ? aptitudes[activeRole] : [])
    ];

    const getProgressValue = (level) => {
        const lower = level.toLowerCase();
        if (lower.includes('nativo') || lower.includes('native')) return 100;
        if (lower.includes('c1')) return 90;
        if (lower.includes('b2')) return 75;
        if (lower.includes('b1')) return 60;
        return 50;
    };

    return (
        <div className="flex flex-col gap-lg" style={{ marginTop: 'var(--spacing-md)' }}>
            {/* Languages */}
            <div className="flex flex-col">
                <div className="flex justify-between items-end" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <SectionItemTitle>
                        {t('languages_title')}
                    </SectionItemTitle>
                    <button
                        onClick={() => setShowAllDetails(!showAllDetails)}
                        className="text-accent"
                        style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 'var(--spacing-md)', cursor: 'pointer' }}
                    >
                        {showAllDetails ? t('hide_certificates') : t('show_certificates')}
                    </button>
                </div>

                <button
                    onClick={() => setShowAllDetails(!showAllDetails)}
                    className="card transition-all"
                    style={{
                        padding: 'var(--spacing-md)',
                        width: '100%',
                        cursor: 'pointer',
                        textAlign: 'left',
                        backgroundColor: 'white',
                        border: '1px solid var(--color-border)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                    }}
                >
                    <ul className="flex flex-wrap gap-md justify-start languages-list">
                        {languages.map((lang, index) => (
                            <li key={index} style={{ listStyle: 'none' }}>
                                <div
                                    className="flex flex-col language-item"
                                    style={{ minWidth: '150px', padding: 'var(--spacing-sm)' }}
                                >
                                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '4px' }}>
                                        {lang.name[language] || lang.name.es}
                                    </span>
                                    <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
                                        <div style={{
                                            width: `${getProgressValue(lang.level.es)}%`,
                                            height: '100%',
                                            backgroundColor: 'var(--color-primary)'
                                        }} />
                                    </div>
                                    <div style={{
                                        maxHeight: showAllDetails ? '60px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.3s ease'
                                    }}>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', fontWeight: 700, paddingTop: '4px', marginBottom: '2px' }}>
                                            {lang.level[language] || lang.level.es}
                                        </p>
                                        {lang.detail && lang.detail[language] && (
                                            <p style={{ fontSize: '0.65rem', color: 'var(--color-text-light)', fontWeight: 600 }}>
                                                {lang.detail[language]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </button>
            </div>

            {/* Aptitudes */}
            <div className="flex flex-col">
                <SectionItemTitle>
                    {t('aptitudes_title')}
                </SectionItemTitle>
                <div className="card" style={{ padding: 'var(--spacing-md)' }}>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                        {displayedAptitudes.map((item, index) => (
                            <li key={index} className="flex items-start gap-xs">
                                <div className="text-accent" style={{ marginTop: '2px', flexShrink: 0 }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <p
                                    style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--color-text-light)' }}
                                    dangerouslySetInnerHTML={{ __html: item[language] || item.es }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
