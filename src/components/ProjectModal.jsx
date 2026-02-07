import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { allSkills } from '../data/content';

// Simple Markdown-like parser
const renderRichText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
        if (line.startsWith('## ')) return <h3 key={index} style={{ fontSize: '1.25rem', marginTop: '1.25rem', color: 'var(--color-text)' }}>{line.replace('## ', '')}</h3>;
        if (line.startsWith('### ')) return <h4 key={index} style={{ fontSize: '1.1rem', marginTop: '1rem', color: 'var(--color-primary)' }}>{line.replace('### ', '')}</h4>;
        if (line.startsWith('- ')) return <li key={index} style={{ marginLeft: '1.25rem', marginBottom: '0.25rem', fontSize: '0.9rem' }} dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
        if (line.trim() === '') return <br key={index} />;
        return <p key={index} style={{ marginBottom: '0.5rem', lineHeight: 1.6, fontSize: '0.9rem', color: 'var(--color-text-light)' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
    });
};

export default function ProjectModal({ project, onClose }) {
    const { language, t } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    if (!project) return null;

    const hasLongDescription = project.longDescription;
    const richContent = hasLongDescription ? (project.longDescription[language] || project.longDescription.es) : null;

    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem'
            }}
            onClick={onClose}
        >
            <div
                className="card animate-fade-in"
                style={{
                    maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
                    position: 'relative', padding: '0', backgroundColor: '#fff',
                    borderRadius: '16px', display: 'flex', flexDirection: 'column'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ position: 'sticky', top: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end', padding: '1rem', pointerEvents: 'none' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'white', borderRadius: '50%',
                            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', boxShadow: 'var(--shadow-md)', cursor: 'pointer', border: 'none',
                            pointerEvents: 'auto'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Image Header - Only project.image (first photo) */}
                <div style={{ height: '350px', width: '100%', position: 'relative', backgroundColor: '#f9fafb', borderBottom: '1px solid var(--color-border)' }}>
                    <img
                        src={project.image}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>

                <div style={{ padding: 'var(--spacing-lg)' }}>
                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <span className="tag" style={{ marginBottom: 'var(--spacing-xs)', fontSize: '0.75rem' }}>{project.year}</span>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{project.title[language] || project.title.es || project.title}</h2>
                        <p className="text-accent" style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase' }}>
                            {project.category[language] || project.category.es}
                        </p>
                    </div>

                    <div style={{ fontSize: '1rem', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-lg)', lineHeight: 1.6 }}>
                        {project.description[language] || project.description.es}
                    </div>

                    {project.memoryUrl && (
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <a
                                href={project.memoryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                <span>{t('download_memory')}</span>
                            </a>
                        </div>
                    )}

                    {project.tags && (
                        <div className="flex flex-wrap gap-xs" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            {project.tags.map(tagId => (
                                <span key={tagId} className="tag" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-light)', fontSize: '0.7rem' }}>
                                    {allSkills[tagId]?.name || tagId}
                                </span>
                            ))}
                        </div>
                    )}

                    {richContent && (
                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
                            {renderRichText(richContent)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
