import { useTranslation } from '../hooks/useTranslation';

export default function Hero({ roleId }) {
    const { language } = useTranslation();

    const roleTitles = {
        all: { es: 'Perfil Multidisciplinar', ca: 'Perfil Multidisciplinari', en: 'Multidisciplinary Profile', gl: 'Perfil Multidisciplinar' },
        video_editor: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' },
        game_dev: { es: 'Programador de Videojuegos', ca: 'Programador de Videojocs', en: 'Game Programmer', gl: 'Programador de Videoxogos' },
        animator: { es: 'Animador', ca: 'Animator', en: 'Animator', gl: 'Animador' },
        '3d_modeler': { es: 'Artista 3D', ca: 'Artista 3D', en: '3D Artist', gl: 'Artista 3D' },
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

                <h1 style={{ marginBottom: 'var(--spacing-xs)', fontSize: '2.5rem' }}>
                    Mario Villanueva Torres
                </h1>

                <p className="text-accent" style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {roleTitles[roleId]?.[language] || roleTitles[roleId]?.es || roleTitles.all.es}
                </p>
            </div>
        </section>
    );
}
