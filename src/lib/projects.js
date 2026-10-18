import { projects as contentProjects } from '../data/content';
import { projectList } from '../data/proyectos';

// Fusiona los datos de contenido (textos, descripciones largas) con los
// metadatos maestros (tags, visibilidad, orden) de un mismo proyecto.
export function getProject(projectId) {
  const base = contentProjects.find((p) => p.id === projectId);
  if (!base) return null;
  const master = projectList.find((p) => p.id === projectId);
  return { ...base, ...master, title: base.title, summary: base.summary, category: base.category };
}

export function buildFilteredProjects(activeRoleId) {
  const order = projectList.map((p) => p.id);
  const visibility = Object.fromEntries(projectList.map((p) => [p.id, p.visible]));

  const base = contentProjects
    .filter((p) => visibility[p.id])
    .filter((p) => activeRoleId === 'all' || (p.roles && (p.roles.includes(activeRoleId) || p.roles.includes('all'))))
    .map((p) => getProject(p.id));

  return base.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}
