export const ROLE_SLUGS = {
  all: 'general',
  artist_2d_3d: 'artista-3d',
  game_dev: 'videojuegos',
  video_editor: 'editor',
};

export const SLUG_TO_ROLE = Object.fromEntries(
  Object.entries(ROLE_SLUGS).map(([role, slug]) => [slug, role])
);

export const ROLE_ORDER = ['all', 'artist_2d_3d', 'game_dev', 'video_editor'];

export const ROLE_TITLES = {
  all: { es: 'Perfil generalista', ca: 'Perfil generalista', en: 'Generalist Profile', gl: 'Perfil xeralista' },
  artist_2d_3d: { es: 'Artista 3D', ca: 'Artista 3D', en: '3D Artist', gl: 'Artista 3D' },
  game_dev: { es: 'Diseñador de Videojuegos', ca: 'Dissenyador de Videojocs', en: 'Game Designer', gl: 'Deseñador de Videoxogos' },
  video_editor: { es: 'Editor de Vídeo', ca: 'Editor de Vídeo', en: 'Video Editor', gl: 'Editor de Vídeo' },
};

export const ROLE_ICONS = {
  all: 'star',
  artist_2d_3d: 'box',
  game_dev: 'code',
  video_editor: 'layout',
};

// Frase corta de una línea por perfil — se usa como titular grande (landing,
// sidebar, cabecera de "Sobre mí"), nunca la bio completa como si fuera un titular.
export const ROLE_TAGLINES = {
  all: {
    es: 'Todo el trabajo, sin filtrar por disciplina', en: 'Everything, across every discipline',
    ca: 'Tota la feina, sense filtrar per disciplina', gl: 'Todo o traballo, sen filtrar por disciplina',
  },
  artist_2d_3d: {
    es: 'Del blockout al render final', en: 'From blockout to final render',
    ca: 'Del blockout al render final', gl: 'Do blockout ao render final',
  },
  game_dev: {
    es: 'Ideas convertidas en sistemas jugables', en: 'Ideas turned into playable systems',
    ca: 'Idees convertides en sistemes jugables', gl: 'Ideas convertidas en sistemas xogables',
  },
  video_editor: {
    es: 'Ritmo, color y narrativa en cada corte', en: 'Pacing, color and story in every cut',
    ca: 'Ritme, color i narrativa en cada tall', gl: 'Ritmo, cor e narrativa en cada corte',
  },
};

export function roleTagline(roleId, language) {
  return ROLE_TAGLINES[roleId]?.[language] || ROLE_TAGLINES[roleId]?.es || '';
}

// "Portfolio" combina la galería visual y la lista de proyectos en una sola
// pestaña — cada perfil aterriza ahí siempre, con el contenido que ya tenga.
export const TABS = ['portfolio', 'sobre-mi', 'contacto'];

export function roleTitle(roleId, language) {
  return ROLE_TITLES[roleId]?.[language] || ROLE_TITLES[roleId]?.es || roleId;
}

export function defaultTabFor() {
  return 'portfolio';
}
