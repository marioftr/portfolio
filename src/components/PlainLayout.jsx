import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import LanguageDropdown from './LanguageDropdown';
import ThemeToggle from './ThemeToggle';
import Footer from './Footer';
import Icon from './Icon';

const BACK_LABEL = { es: 'Volver al inicio', en: 'Back to home', ca: 'Tornar a l\'inici', gl: 'Volver ao inicio' };

// Página independiente de cualquier perfil: sin barra lateral, con cabecera
// mínima (volver, idioma, tema) y pie legal.
export default function PlainLayout({ children, scrollKey }) {
  const { language } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [scrollKey]);

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 pt-8 flex items-center justify-between gap-4">
        <Link to={`/${language}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-light hover:text-primary transition-colors">
          <Icon name="chevronLeft" size={16} strokeWidth={2.5} />
          {BACK_LABEL[language] || BACK_LABEL.es}
        </Link>
        <div className="flex items-center gap-2">
          <LanguageDropdown align="right" dropDown />
          <ThemeToggle />
        </div>
      </div>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-10 pt-14 pb-16">{children}</main>

      <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 pb-8">
        <Footer className="pt-6 border-t border-border" />
      </div>
    </div>
  );
}
