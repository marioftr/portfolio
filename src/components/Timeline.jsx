import { useTranslation } from '../hooks/useTranslation';

export default function Timeline({ education, experience }) {
    const { language, t } = useTranslation();

    const renderDescription = (desc) => {
        if (Array.isArray(desc)) {
            return (
                <div className="flex flex-col gap-sm">
                    {desc.map((group, idx) => (
                        <div key={idx}>
                            <h4 style={{
                                fontSize: '0.875rem',
                                fontWeight: 800,
                                color: 'var(--color-primary-dark)',
                                marginBottom: '0.2rem',
                                textTransform: 'uppercase'
                            }}>
                                {group.subtitle}
                            </h4>
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text-light)' }}>
                                {group.text}
                            </p>
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-light)' }}>
                {desc}
            </p>
        );
    };

    const renderItem = (item, isLast) => (
        <div key={item.id} style={{
            position: 'relative',
            paddingLeft: 'var(--spacing-lg)',
            marginBottom: isLast ? 0 : 'var(--spacing-md)'
        }}>
            {/* Thread line */}
            {!isLast && (
                <div style={{
                    position: 'absolute',
                    left: '7px',
                    top: '20px',
                    bottom: '-var(--spacing-lg)',
                    width: '2px',
                    backgroundColor: 'var(--color-border)'
                }} />
            )}

            {/* Dot */}
            <div style={{
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

            <div className="card" style={{ padding: 'var(--spacing-md)' }}>
                <span className="tag" style={{ marginBottom: 'var(--spacing-xs)', fontSize: '0.75rem' }}>
                    {item.year}
                </span>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                    {item.title[language] || item.title.es}
                </h3>

                {(item.institution || item.company) && (
                    <p className="text-accent" style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {item.institution || item.company}
                    </p>
                )}

                <div style={{ marginTop: 'var(--spacing-sm)' }}>
                    {renderDescription(item.description[language] || item.description.es)}
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
