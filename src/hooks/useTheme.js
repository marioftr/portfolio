import { useSyncExternalStore } from 'react';

// Solo se guarda la elección cuando la persona pulsa el interruptor. Mientras no
// haya elección, la web sigue el modo del dispositivo y cambia con él. Se usa
// otra clave que la versión anterior, que guardaba el modo del sistema en la
// primera visita y lo dejaba fijo.
const STORAGE_KEY = 'portfolio_theme_choice';
// Mismos valores que --color-bg en index.css; el navegador móvil los usa para la barra superior.
const THEME_COLORS = { light: '#fbfaf7', dark: '#121211' };

const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
const listeners = new Set();

function readChoice() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function resolveTheme() {
  return readChoice() || (media?.matches ? 'dark' : 'light');
}

let current = resolveTheme();

function apply(theme) {
  current = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  listeners.forEach((fn) => fn());
}

if (typeof window !== 'undefined') {
  apply(current);
  // Si no hay elección guardada, acompaña los cambios del sistema (modo automático, anochecer…).
  const follow = () => {
    if (readChoice()) return;
    const next = resolveTheme();
    if (next !== current) apply(next);
  };
  media?.addEventListener('change', follow);
  // Respaldo por si el navegador no avisa del cambio con la página en segundo plano.
  document.addEventListener('visibilitychange', follow);
  window.addEventListener('focus', follow);
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current, () => 'light');

  const toggleTheme = () => {
    const next = current === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* almacenamiento no disponible */ }
    apply(next);
  };

  return { theme, toggleTheme };
}
