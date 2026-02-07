import { useTranslation } from '../hooks/useTranslation';
import { socialLinks } from '../data/content';

export default function Contact() {
    const { t } = useTranslation();

    const getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'linktree':
            case 'link': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
            case 'linkedin': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
            case 'github': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
            case 'instagram': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
            default: return null;
        }
    };

    return (
        <div className="card" style={{ padding: 'var(--spacing-lg)', backgroundColor: '#fff' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                {/* Contact Info */}
                <div className="flex flex-col gap-md">
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                        {t('contact_talk')}
                    </h3>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '1rem', lineHeight: 1.6 }}>
                        {t('contact_intro')}
                    </p>

                    <div className="flex flex-col gap-sm" style={{ marginTop: 'var(--spacing-sm)' }}>
                        <div className="flex items-center gap-sm">
                            <div className="text-accent" style={{ display: 'flex' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-light)', textTransform: 'uppercase', marginBottom: '2px' }}>
                                    {t('contact_email')}
                                </p>
                                <a href="mailto:mariovt@example.com" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>
                                    mariovt@example.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-sm">
                            <div className="text-accent" style={{ display: 'flex' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-light)', textTransform: 'uppercase', marginBottom: '2px' }}>
                                    {t('contact_phone')}
                                </p>
                                <span style={{ fontSize: '1rem', fontWeight: 600 }}>+34 600 000 000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Grid */}
                <div className="flex flex-col gap-sm">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)' }}>
                        {t('contact_socials')}
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                        gap: 'var(--spacing-sm)'
                    }}>
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '0.6rem 1rem',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <div className="text-accent" style={{ display: 'flex' }}>
                                    {getIcon(link.name)}
                                </div>
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
