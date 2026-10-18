import { useTranslation } from '../hooks/useTranslation';

export default function LanguagesAptitudes({ languages, aptitudes, activeRole }) {
  const { t, language } = useTranslation();

  const displayedAptitudes = [
    ...(aptitudes.all || []),
    ...(activeRole && activeRole !== 'all' && aptitudes[activeRole] ? aptitudes[activeRole] : []),
  ];

  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-3 pb-2 border-b border-border">
          {t('languages_title')}
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-8">
          {languages.map((lang, idx) => (
            <li key={idx} className="flex items-baseline justify-between gap-3 py-2.5 border-b border-border text-sm">
              <span className="font-semibold text-ink">{lang.name[language] || lang.name.es}</span>
              <span className="text-ink-light text-right">
                {lang.level[language] || lang.level.es}
                {lang.detail?.[language] && <span className="block text-xs opacity-80">{lang.detail[language]}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-3 pb-2 border-b border-border">
          {t('aptitudes_title')}
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {displayedAptitudes.map((item, index) => (
            <li key={index} className="flex items-baseline gap-2.5 text-sm leading-relaxed">
              <span className="text-primary shrink-0">—</span>
              <span className="text-ink-light" dangerouslySetInnerHTML={{ __html: item[language] || item.es }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
