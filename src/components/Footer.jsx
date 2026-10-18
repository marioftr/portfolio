import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { LEGAL_SLUGS, LEGAL_LABELS } from '../data/legal';

export default function Footer({ className = '' }) {
  const { language, t } = useTranslation();

  return (
    <footer className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-ink-light text-xs ${className}`}>
      <span>&copy; 2026 Mario Villanueva Torres</span>
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {Object.entries(LEGAL_SLUGS).map(([kind, slug]) => (
          <Link key={kind} to={`/${language}/${slug}`} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
            {LEGAL_LABELS[kind][language] || LEGAL_LABELS[kind].es}
          </Link>
        ))}
        <Link to={`/${language}/contacto`} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
          {t('nav_contact')}
        </Link>
      </nav>
    </footer>
  );
}
