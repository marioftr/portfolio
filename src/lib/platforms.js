export const PLATFORM_NAMES = {
  artstation: 'ArtStation',
  github: 'GitHub',
  itch: 'itch.io',
  behance: 'Behance',
  vimeo: 'Vimeo',
  youtube: 'YouTube',
};

// Icono del enlace externo de cada plataforma; las que no tienen logotipo
// propio usan el de "abrir en otra pestaña".
export const PLATFORM_ICONS = {
  artstation: 'artstation',
  github: 'githubFilled',
  youtube: 'youtubeFilled',
};

export function platformIcon(platform) {
  return PLATFORM_ICONS[platform] || 'view';
}
