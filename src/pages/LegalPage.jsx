import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { getLegalDoc } from '../data/legal';
import LanguageDropdown from '../components/LanguageDropdown';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

const BACK_LABEL = { es: 'Volver al inicio', en: 'Back to home', ca: 'Tornar a l\'inici', gl: 'Volver ao inicio' };

export default function LegalPage({ kind }) {
  const { language } = useTranslation();
  const doc = getLegalDoc(kind, language);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [kind]);

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

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-10 pt-14 pb-16">
        <h1 className="font-display text-3xl sm:text-5xl font-medium leading-tight mb-3">{doc.title}</h1>
        <p className="text-ink-light text-xs mb-8">{doc.updated}</p>
        <p className="text-ink-light leading-relaxed mb-10 max-w-2xl">{doc.intro}</p>

        <div className="flex flex-col gap-9 max-w-2xl">
          {doc.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl sm:text-2xl font-medium mb-3">{section.title}</h2>
              <div className="flex flex-col gap-3 text-ink-light text-[0.95rem] leading-relaxed">
                {section.body.map((block, i) => (
                  block.list ? (
                    <ul key={i} className="flex flex-col gap-1.5 pl-5 list-disc marker:text-primary">
                      {block.list.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  ) : <p key={i}>{block}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 pb-8">
        <Footer className="pt-6 border-t border-border" />
      </div>
    </div>
  );
}
