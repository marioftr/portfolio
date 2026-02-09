/**
 * Lista maestra de proyectos del portfolio.
 * 
 * INSTRUCCIONES:
 * - El orden en este array es el orden exacto en el que aparecerán en la web.
 * - Para ocultar un proyecto sin borrarlo, pon `visible: false`.
 * - Los perfiles se asignan mediante la propiedad `roles`. 
 *   Valores posibles: 'all', 'game_dev', 'video_editor', 'artist_2d_3d', 'design'.
 */

export const projectList = [
    {
        id: 'establo',
        title: 'Establo (Provisional)',
        year: '2026',
        visible: true,
        roles: ['artist_2d_3d'],
        tags: ['unreal', 'maya', 'substance', 'zbrush', 'photoshop'],
        isWIP: true,
        description_es: 'Modelado, extracción de UVs, texturizado y montaje de un entorno 3D, realizado como proyecto final para el módulo de modelado y animación de videojuegos (CEI).'
    },
    {
        id: 'resaca',
        title: 'RESACA',
        year: '2026',
        visible: true,
        roles: ['game_dev'],
        tags: ['unity', 'csharp', 'photoshop', 'audacity'],
        description_es: 'Proyecto final del módulo de programación. Experiencia narrativa con minijuegos integrados y sistemas avanzados de interacción.'
    },
    {
        id: 'colorin',
        title: 'Colorín Decolorado',
        year: '2025',
        visible: true,
        roles: ['artist_2d_3d', 'video_editor', 'design'],
        tags: ['blender', 'premiere', 'after_effects', 'canva', 'photoshop'],
        description_es: 'Diseño y desarrollo de un cortometraje de animación híbrida elaborado como TFG en Comunicación Audiovisual.'
    },
    {
        id: 'kafeto',
        title: 'Kafeto',
        year: '2025',
        visible: true,
        roles: ['artist_2d_3d', 'design'],
        tags: ['blender'],
        description_es: 'Render 3D animado en Blender. Anuncio de una cafetera para la marca imaginaria Kafeto.'
    },
    {
        id: 'narcozoo',
        title: 'Narcozoo',
        year: '2025',
        visible: true,
        roles: ['game_dev'],
        tags: ['canva', 'photoshop'],
        description_es: 'Creación de un videojuego teórico completo en el marco de la carrera de Comunicación Audiovisual en la USC.'
    },
    {
        id: 'actualiteca',
        title: 'Actualiteca',
        year: '2025',
        visible: true,
        roles: ['video_editor'],
        tags: ['audacity'],
        description_es: 'Podcast grupal desarrollado en el marco de la carrera de Comunicación Audiovisual en la USC.'
    },
    {
        id: 'carta_a_fonte',
        title: 'Carta A Fonte',
        year: '2025',
        visible: true,
        roles: ['design'],
        tags: ['canva'],
        description_es: 'Rebranding y diseño de menú para restaurante. Trabajo directo con cliente para mejorar la legibilidad y estética.'
    },
    {
        id: 'onda_vocal',
        title: 'Onda Vocal',
        year: '2024',
        visible: true,
        roles: ['design'],
        tags: ['audacity', 'canva'],
        description_es: 'Proyecto grupal de creación de empresa desarrollado en la carrera de Comunicación Audiovisual (USC).'
    },
    {
        id: 'penguin_saga',
        title: 'Penguin Saga',
        year: '2021',
        visible: true,
        roles: ['game_dev'],
        tags: ['scratch', 'photoshop'],
        description_es: 'Videojuego creado en la plataforma de programación visual Scratch en 2º de Bachillerato.'
    }
];
