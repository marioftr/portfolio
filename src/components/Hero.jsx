import { useTranslation } from '../hooks/useTranslation';


export default function Hero({ roleId }) {
    const { language } = useTranslation();

    const roleTitles = {
        all: { es: 'Perfil Completo', ca: 'Perfil Complet', en: 'Full Profile', gl: 'Perfil Completo' },
        video_editor: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' },
        game_dev: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' },
        artist_2d_3d: { es: 'Artista 2D y 3D', ca: 'Artista 2D i 3D', en: '2D & 3D Artist', gl: 'Artista 2D e 3D' },
        design: { es: 'Diseño', ca: 'Disseny', en: 'Design', gl: 'Deseño' }
    };

    return (
        <section className="section animate-fade-in" style={{ padding: '3rem 0 2rem' }}>
            <div className="container flex flex-col items-center" style={{ textAlign: 'center' }}>
                <div style={{
                    width: '100px', height: '100px', borderRadius: '50%',
                    overflow: 'hidden', border: '3px solid var(--color-primary)',
                    boxShadow: 'var(--shadow-md)', marginBottom: 'var(--spacing-md)'
                }}>
                    <img src="/images/foto_perfil.jpg" alt="Mario Villanueva Torres" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <h1 style={{ 
                    marginBottom: 'var(--spacing-xs)', 
                    fontSize: 'clamp(1.5rem, 6.5vw, 2.5rem)',
                    fontWeight: 900,
                    color: 'var(--color-text)',
                    lineHeight: 1.2
                }}>
                    Mario Villanueva Torres
                </h1>

                <p className="text-accent" style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {roleTitles[roleId]?.[language] || roleTitles[roleId]?.es || roleTitles.all.es}
                </p>
            </div>
        </section>
    );
}
