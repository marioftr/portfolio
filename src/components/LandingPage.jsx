import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import LanguageDropdown from './LanguageDropdown';
import { socialLinks } from '../data/content';

export default function LandingPage() {
    const { language, t } = useTranslation();
    const navigate = useNavigate();

    const roleMapping = {
        all: { path: 'perfil-general', icon: 'star', label: { es: 'Perfil Completo', ca: 'Perfil Complet', en: 'Full Profile', gl: 'Perfil Completo' } },
        video_editor: { path: 'editor-video', icon: 'layout', label: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' } },
        game_dev: { path: 'programador-videojuegos', icon: 'code', label: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' } },
        animator: { path: 'animador', icon: 'play-circle', label: { es: 'Animador 2D y 3D', ca: 'Animator 2D i 3D', en: '2D & 3D Animator', gl: 'Animador 2D e 3D' } },
        '3d_modeler': { path: 'artista-3d', icon: 'box', label: { es: 'Artista 3D', ca: 'Artista 3D', en: '3D Artist', gl: 'Artista 3D' } },
    };

    const getIcon = (name) => {
        switch (name) {
            case 'star': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
            case 'layout': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
            case 'code': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
            case 'play-circle': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>;
            case 'box': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
            case 'link': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
            case 'linkedin': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
            case 'github': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
            case 'instagram': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white md:overflow-hidden">
            {/* Left Side: Profile & Bio */}
            <div className="flex-1 flex flex-col items-center justify-center p-xl text-center md:items-start md:text-left bg-gray-50" style={{ borderRight: '1px solid var(--color-border)', paddingTop: '3rem', minHeight: '100vh' }}>
                <div className="animate-fade-in flex flex-col items-center md:items-start gap-lg" style={{ maxWidth: '600px', width: '100%' }}>
                    <div style={{
                        width: '150px', height: '150px', borderRadius: '50%',
                        overflow: 'hidden', border: '6px solid var(--color-primary)',
                        boxShadow: '0 15px 45px rgba(16, 185, 129, 0.3)', marginBottom: '1rem',
                        backgroundColor: 'white'
                    }}>
                        <img src="/images/foto_perfil.jpg" alt="No image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ width: 'fit-content', textAlign: 'inherit' }}>
                        <div style={{ width: '100%' }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-1.5px', color: 'var(--color-text)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                                Mario Villanueva Torres
                            </h1>
                            <p className="text-accent" style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1.5rem' }}>
                                {language === 'es' ? 'PORTFOLIO PROFESIONAL' : language === 'ca' ? 'PORTFOLIO PROFESSIONAL' : language === 'gl' ? 'PORTFOLIO PROFESIONAL' : 'PROFESSIONAL PORTFOLIO'}
                            </p>
                        </div>

                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', lineHeight: 1.7, fontWeight: 500, textAlign: 'justify', width: '100%', maxWidth: '100%' }}>
                            {language === 'es'
                                ? 'Estudiante de Máster en Diseño, Modelado y Programación de Videojuegos. Explora mis perfiles para ver mi trabajo especializado.'
                                : language === 'ca'
                                    ? 'Estudiant de Màster en Disseny, Modelatge i Programació de Videojocs. Explora els meus perfils per veure el meu treball especialitzat.'
                                    : language === 'gl'
                                        ? 'Estudante de Máster en Deseño, Modelado e Programación de Videoxogos. Explora os meus perfís para ver o meu traballo especializado.'
                                        : 'Master\'s Student in Game Design, Modeling and Programming. Explore my profiles to see my specialized work.'}
                        </p>
                    </div>

                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                        {socialLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    backgroundColor: 'white',
                                    color: 'var(--color-primary)',
                                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: '1px solid var(--color-border)',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                    e.currentTarget.style.color = 'white';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(16, 185, 129, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
                                }}
                            >
                                {getIcon(link.icon)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Role Selection */}
            <div className="flex-1 flex flex-col items-center justify-center p-xl overflow-y-auto" style={{ backgroundColor: 'var(--color-secondary)', minHeight: '100vh' }}>
                <div className="flex flex-col gap-md animate-fade-in" style={{ animationDelay: '0.1s', width: '380px', maxWidth: '100%' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-text-light)', marginBottom: '1.25rem', textAlign: 'center', opacity: 0.5 }}>
                        {t('select_specialty')}
                    </p>
                    {Object.entries(roleMapping).map(([id, data]) => (
                        <button
                            key={id}
                            onClick={() => navigate(`/${data.path}`)}
                            className="flex items-center justify-between transition-all btn-thick-border"
                            style={{
                                cursor: 'pointer',
                                padding: '1.25rem 1.75rem',
                                background: id === 'all' ? 'var(--color-primary)' : 'white',
                                color: id === 'all' ? 'white' : 'var(--color-primary)',
                                border: `5px solid var(--color-primary)`,
                                boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                                borderRadius: '24px',
                                textAlign: 'left',
                                width: '100%',
                                minHeight: '80px',
                                transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.05)';
                            }}
                        >
                            <span style={{ fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1.2, marginTop: '4px' }}>
                                {data.label[language] || data.label.es}
                            </span>
                            <div style={{ opacity: 0.9, marginLeft: '1rem', flexShrink: 0, color: id === 'all' ? 'white' : 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                                {getIcon(data.icon)}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Language Selector Bottom Right */}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 1000
            }}>
                <LanguageDropdown placement="top" />
            </div>
        </div>
    );
}
