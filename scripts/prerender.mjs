// Tras `vite build`: genera una copia de index.html por página con su propio título,
// descripción, miniatura, canonical e hreflang (los buscadores y las redes sociales no
// ejecutan JavaScript), además de sitemap.xml. La app en sí no cambia: es la misma.
import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://mvillanuevatorres.com';
const NAME = 'Mario Villanueva Torres';
const LANGS = ['es', 'en', 'gl', 'ca'];
const LOCALES = { es: 'es_ES', en: 'en_US', gl: 'gl_ES', ca: 'ca_ES' };
const DIST = 'dist';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { ROLE_SLUGS, ROLE_ORDER, roleTitle } = await vite.ssrLoadModule('/src/lib/roles.js');
const { buildFilteredProjects } = await vite.ssrLoadModule('/src/lib/projects.js');
const { LEGAL_SLUGS, LEGAL_LABELS } = await vite.ssrLoadModule('/src/data/legal.js');
const { socialLinks } = await vite.ssrLoadModule('/src/data/content.js');

const ROLE_SLUG_OF_IMAGE = { artist_2d_3d: 'artista-3d', game_dev: 'videojuegos', video_editor: 'editor' };
const ogImage = (roleId, lang) => `${SITE}/og/${roleId === 'all' || !roleId ? 'og-general' : `og-${ROLE_SLUG_OF_IMAGE[roleId]}-${lang}`}.jpg`;

const TEXT = {
  landingTitle: {
    es: `${NAME} | Artista 3D, videojuegos y vídeo`,
    en: `${NAME} | 3D Artist, Games & Video`,
    gl: `${NAME} | Artista 3D, videoxogos e vídeo`,
    ca: `${NAME} | Artista 3D, videojocs i vídeo`,
  },
  landingDesc: {
    es: 'Portfolio de Mario Villanueva Torres: modelado y animación 3D, diseño de videojuegos y edición de vídeo. Proyectos, modelos 3D interactivos y demo reel.',
    en: 'Portfolio of Mario Villanueva Torres: 3D modeling and animation, game design and video editing. Projects, interactive 3D models and demo reel.',
    gl: 'Portfolio de Mario Villanueva Torres: modelado e animación 3D, deseño de videoxogos e edición de vídeo. Proxectos, modelos 3D interactivos e demo reel.',
    ca: 'Portfolio de Mario Villanueva Torres: modelatge i animació 3D, disseny de videojocs i edició de vídeo. Projectes, models 3D interactius i demo reel.',
  },
  portfolioDesc: {
    all: {
      es: 'Todos los proyectos de Mario Villanueva Torres: arte 3D, videojuegos y vídeo. Modelos 3D interactivos, procesos de trabajo y demo reel.',
      en: 'All projects by Mario Villanueva Torres: 3D art, games and video. Interactive 3D models, work processes and demo reel.',
      gl: 'Todos os proxectos de Mario Villanueva Torres: arte 3D, videoxogos e vídeo. Modelos 3D interactivos, procesos de traballo e demo reel.',
      ca: 'Tots els projectes de Mario Villanueva Torres: art 3D, videojocs i vídeo. Models 3D interactius, processos de treball i demo reel.',
    },
    artist_2d_3d: {
      es: 'Portfolio de artista 3D: modelado, esculpido y texturizado PBR para videojuegos, con modelos 3D interactivos y procesos de trabajo.',
      en: '3D artist portfolio: modeling, sculpting and PBR texturing for games, with interactive 3D models and work processes.',
      gl: 'Portfolio de artista 3D: modelado, escultura e texturizado PBR para videoxogos, con modelos 3D interactivos e procesos de traballo.',
      ca: "Portfolio d'artista 3D: modelatge, escultura i texturització PBR per a videojocs, amb models 3D interactius i processos de treball.",
    },
    game_dev: {
      es: 'Portfolio de diseñador de videojuegos: sistemas jugables, narrativa y programación en Unity y Unreal Engine.',
      en: 'Game designer portfolio: gameplay systems, narrative and programming in Unity and Unreal Engine.',
      gl: 'Portfolio de deseñador de videoxogos: sistemas xogables, narrativa e programación en Unity e Unreal Engine.',
      ca: 'Portfolio de dissenyador de videojocs: sistemes jugables, narrativa i programació a Unity i Unreal Engine.',
    },
    video_editor: {
      es: 'Portfolio de editor de vídeo: montaje, etalonaje, motion graphics y animación, con demo reel.',
      en: 'Video editor portfolio: editing, color grading, motion graphics and animation, with demo reel.',
      gl: 'Portfolio de editor de vídeo: montaxe, etalonaxe, motion graphics e animación, con demo reel.',
      ca: "Portfolio d'editor de vídeo: muntatge, etalonatge, motion graphics i animació, amb demo reel.",
    },
  },
  aboutDesc: {
    es: (role) => `Trayectoria profesional, formación y herramientas de Mario Villanueva Torres como ${role}.`,
    en: (role) => `Career, education and tools of Mario Villanueva Torres as ${role}.`,
    gl: (role) => `Traxectoria profesional, formación e ferramentas de Mario Villanueva Torres como ${role}.`,
    ca: (role) => `Trajectòria professional, formació i eines de Mario Villanueva Torres com a ${role}.`,
  },
  about: { es: 'Sobre mí', en: 'About me', gl: 'Sobre min', ca: 'Sobre mi' },
  contact: { es: 'Contacto', en: 'Contact', gl: 'Contacto', ca: 'Contacte' },
  contactDesc: {
    es: 'Contacta con Mario Villanueva Torres: formulario, correo electrónico y redes para proyectos de arte 3D, videojuegos o edición de vídeo.',
    en: 'Get in touch with Mario Villanueva Torres: form, email and social links for 3D art, game or video editing projects.',
    gl: 'Contacta con Mario Villanueva Torres: formulario, correo electrónico e redes para proxectos de arte 3D, videoxogos ou edición de vídeo.',
    ca: 'Contacta amb Mario Villanueva Torres: formulari, correu electrònic i xarxes per a projectes d\'art 3D, videojocs o edició de vídeo.',
  },
};

// ── Catálogo de páginas ────────────────────────────────────────────────────────
// key agrupa las versiones de idioma de una misma página (hreflang).
const pages = [];
const add = (page) => pages.push(page);
// Algunos textos son una cadena y otros un objeto por idioma.
const tx = (v, lang) => (typeof v === 'string' ? v : v?.[lang] || v?.es || '');
const clip = (s, n) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

for (const lang of LANGS) {
  add({ key: 'landing', lang, path: `/${lang}`, title: TEXT.landingTitle[lang], description: TEXT.landingDesc[lang], image: ogImage('all', lang), h1: NAME, schema: true });

  for (const roleId of ROLE_ORDER) {
    const slug = ROLE_SLUGS[roleId];
    const role = roleTitle(roleId, lang);
    add({
      key: `role:${roleId}:portfolio`, lang, path: `/${lang}/${slug}/portfolio`,
      title: `${role} · Portfolio | ${NAME}`, description: TEXT.portfolioDesc[roleId][lang], image: ogImage(roleId, lang), h1: `${role} · Portfolio`,
      projectsOf: roleId,
    });
    add({
      key: `role:${roleId}:sobre-mi`, lang, path: `/${lang}/${slug}/sobre-mi`,
      title: `${TEXT.about[lang]} · ${role} | ${NAME}`, description: TEXT.aboutDesc[lang](role), image: ogImage(roleId, lang), h1: `${TEXT.about[lang]} · ${role}`,
    });
  }

  for (const project of buildFilteredProjects('all')) {
    const title = tx(project.title, lang);
    const category = tx(project.category, lang);
    add({
      key: `project:${project.id}`, lang, path: `/${lang}/${ROLE_SLUGS.all}/proyectos/${project.id}`,
      title: clip(`${title}${category ? ` · ${category}` : ''} | ${NAME}`, 70),
      description: clip(tx(project.summary, lang) || TEXT.landingDesc[lang], 200),
      image: ogImage('all', lang), // las imágenes de proyecto pesan demasiado para las vistas previas (WhatsApp ~300 KB)
      h1: title,
    });
  }

  add({ key: 'contact', lang, path: `/${lang}/contacto`, title: `${TEXT.contact[lang]} | ${NAME}`, description: TEXT.contactDesc[lang], image: ogImage('all', lang), h1: TEXT.contact[lang] });

  for (const kind of ['privacy', 'legal']) {
    add({
      key: kind, lang, path: `/${lang}/${LEGAL_SLUGS[kind]}`,
      title: `${LEGAL_LABELS[kind][lang]} | ${NAME}`, description: `${LEGAL_LABELS[kind][lang]} · ${NAME}`,
      image: ogImage('all', lang), h1: LEGAL_LABELS[kind][lang], noindex: true,
    });
  }
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (path) => `${SITE}${path}`;

const sameAs = [...socialLinks.map((l) => l.url), 'https://www.instagram.com/mario_ftr', 'https://www.youtube.com/@mariovt9']
  .filter((u, i, a) => a.indexOf(u) === i);

function personSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': `${SITE}/#persona`, name: NAME, url: `${SITE}/${lang}`,
        image: `${SITE}/images/foto_orla.jpg`,
        jobTitle: ['3D Artist', 'Game Designer', 'Video Editor'],
        knowsAbout: ['3D modeling', 'Game design', 'Video editing', 'Unreal Engine', 'Unity', 'Maya', 'Substance Painter'],
        address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
        sameAs,
      },
      { '@type': 'WebSite', '@id': `${SITE}/#web`, url: SITE, name: `${NAME} — Portfolio`, inLanguage: lang, publisher: { '@id': `${SITE}/#persona` } },
    ],
  };
}

const alternatesOf = (page) => pages.filter((p) => p.key === page.key);

function headFor(page) {
  const alternates = alternatesOf(page);
  const lines = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`,
    `<link rel="canonical" href="${url(page.path)}" />`,
    ...alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${url(a.path)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url(alternates.find((a) => a.lang === 'es').path)}" />`,
    `<meta property="og:type" content="${page.key.startsWith('project:') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${url(page.path)}" />`,
    `<meta property="og:image" content="${page.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${LOCALES[page.lang]}" />`,
    ...alternates.filter((a) => a.lang !== page.lang).map((a) => `<meta property="og:locale:alternate" content="${LOCALES[a.lang]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${page.image}" />`,
  ];
  if (page.schema) lines.push(`<script type="application/ld+json">${JSON.stringify(personSchema(page.lang))}</script>`);
  return lines.join('\n    ');
}

// Contenido mínimo para quien no ejecuta JavaScript. React lo sustituye al arrancar.
function fallbackFor(page) {
  const links = [];
  if (page.key === 'landing') {
    for (const roleId of ROLE_ORDER) links.push([`/${page.lang}/${ROLE_SLUGS[roleId]}/portfolio`, roleTitle(roleId, page.lang)]);
    links.push([`/${page.lang}/contacto`, TEXT.contact[page.lang]]);
  } else if (page.projectsOf) {
    for (const p of buildFilteredProjects(page.projectsOf)) links.push([`/${page.lang}/${ROLE_SLUGS.all}/proyectos/${p.id}`, tx(p.title, page.lang)]);
  }
  const list = links.length ? `<ul>${links.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join('')}</ul>` : '';
  return `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap"><h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.description)}</p>${list}</div>`;
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

for (const page of pages) {
  const html = template
    .replace('<html lang="es">', `<html lang="${page.lang}">`)
    .replace(/<!-- seo -->[\s\S]*?<!-- \/seo -->/, headFor(page))
    .replace('<div id="root"></div>', `<div id="root">${fallbackFor(page)}</div>`);
  const file = join(DIST, page.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// ── sitemap.xml ────────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex);
const entries = indexable.map((page) => {
  const alternates = alternatesOf(page);
  return [
    '  <url>',
    `    <loc>${url(page.path)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    ...alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${url(a.path)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(alternates.find((a) => a.lang === 'es').path)}" />`,
    '  </url>',
  ].join('\n');
});
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);

await vite.close();
console.log(`Prerender: ${pages.length} páginas, ${indexable.length} en el sitemap`);
