import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function Timeline({ education, experience }) {
    const { language, t } = useTranslation();
    const [expandedIds, setExpandedIds] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleExpand = (id) => {
        if (!isMobile) return;
        setExpandedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const renderDescription = (desc, isExpanded = true) => {
        if (Array.isArray(desc)) {
            return (
                <div className="flex flex-col" style={{ gap: isExpanded ? '1.5rem' : '0.25rem' }}>
                    {desc.map((group, idx) => (
                        <div key={idx}>
                            <h4 className="text-accent" style={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                marginBottom: group.location ? '0.2rem' : (isExpanded ? 'var(--spacing-sm)' : '0'),
                                textTransform: 'none'
                            }}>
                                {group.subtitle}
                            </h4>
                            {group.location && (
                                <p style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--color-text-light)',
                                    marginBottom: isExpanded ? 'var(--spacing-sm)' : '0.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    opacity: 0.8
                                }}>
                                    <span>📍</span> {group.location}
                                </p>
                            )}
                            <div 
                                style={{
                                    display: 'grid',
                                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                                    opacity: isExpanded ? 1 : 0,
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    pointerEvents: isExpanded ? 'auto' : 'none'
                                }}
                            >
                                <div style={{ overflow: 'hidden' }}>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text-light)' }}>
                                        {group.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        
        return (
            <div 
                style={{
                    display: 'grid',
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    opacity: isExpanded ? 1 : 0,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isExpanded ? 'auto' : 'none'
                }}
            >
                <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-light)' }}>
                        {desc}
                    </p>
                </div>
            </div>
        );
    };

    const renderItem = (item, isLast) => (
        <div key={item.id} className="timeline-container" style={{
            position: 'relative',
            paddingLeft: 'var(--spacing-lg)',
            marginBottom: isLast ? 0 : 'var(--spacing-md)'
        }}>
            {/* Thread line */}
            {!isLast && (
                <div className="timeline-line" style={{
                    position: 'absolute',
                    left: '7px',
                    top: '20px',
                    bottom: '-var(--spacing-lg)',
                    width: '2px',
                    backgroundColor: 'var(--color-border)'
                }} />
            )}

            {/* Dot */}
            <div className="timeline-dot" style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '3px solid var(--color-primary)',
                zIndex: 2
            }} />

            <div 
                className={`card timeline-card ${isMobile ? 'cursor-pointer' : ''}`} 
                style={{ 
                    padding: 'var(--spacing-md)',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                    cursor: isMobile ? 'pointer' : 'default',
                    alignSelf: 'stretch',
                    flexShrink: 0
                }}
                onClick={() => toggleExpand(item.id)}
            >

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="tag" style={{ marginBottom: 'var(--spacing-xs)', fontSize: '0.75rem' }}>
                        {item.year}
                    </span>
                    {isMobile && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ 
                            transform: expandedIds.includes(item.id) ? 'rotate(180deg)' : 'none', 
                            transition: 'transform 0.2s',
                            color: 'var(--color-primary)'
                        }}>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    )}
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                    {item.title[language] || item.title.es}
                </h3>

                {(item.institution || item.company) && (
                    <p className="text-accent" style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        marginBottom: (item.location || (!isMobile || expandedIds.includes(item.id))) ? '0.2rem' : '0'
                    }}>
                        {item.institution || item.company}
                    </p>
                )}

                {item.location && (
                    <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-light)',
                        marginBottom: (!isMobile || expandedIds.includes(item.id)) ? 'var(--spacing-sm)' : '0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        opacity: 0.8
                    }}>
                        <span>📍</span> {item.location}
                    </p>
                )}

                <div style={{ 
                    marginTop: (item.institution || item.company) ? 'var(--spacing-sm)' : '1.5rem'
                }}>
                    {renderDescription(item.description[language] || item.description.es, !isMobile || expandedIds.includes(item.id))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg" style={{ marginTop: 'var(--spacing-md)' }}>
            {/* Experience Column */}
            <div>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {language === 'es' ? 'Experiencia' : language === 'ca' ? 'Experiència' : language === 'gl' ? 'Experiencia' : 'Experience'}
                </h3>
                <div className="flex flex-col">
                    {experience.map((item, idx) => renderItem(item, idx === experience.length - 1))}
                </div>
            </div>

            {/* Education Column */}
            <div>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {t('education_title')}
                </h3>
                <div className="flex flex-col">
                    {education.map((item, idx) => renderItem(item, idx === education.length - 1))}
                </div>
            </div>
        </div>
    );
}
