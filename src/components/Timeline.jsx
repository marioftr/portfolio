import { useTranslation } from '../hooks/useTranslation';

function Entry({ item, language }) {
  const desc = item.description[language] || item.description.es;
  const groups = Array.isArray(desc) ? desc : [{ subtitle: null, location: item.location, text: desc }];

  return (
    <div className="grid grid-cols-[4.25rem_1fr] sm:grid-cols-[5rem_1fr] gap-x-4 sm:gap-x-8 py-7 border-t border-border first:border-t-0">
      <span className="font-display text-base sm:text-xl text-ink-light pt-0.5 leading-snug">{item.year}</span>

      <div>
        <h3 className="font-display text-xl sm:text-2xl font-medium leading-snug">{item.title[language] || item.title.es}</h3>
        {(item.institution || item.company) && (
          <p className="text-primary font-semibold text-sm mt-1">
            {item.institution || item.company}
            {item.location && <span className="text-ink-light font-normal"> — {item.location}</span>}
          </p>
        )}

        <div className="mt-3 flex flex-col gap-4">
          {groups.map((group, idx) => (
            <div key={idx}>
              {group.subtitle && (
                <h4 className="text-primary font-semibold text-sm mb-0.5">
                  {group.subtitle}
                  {group.location && <span className="text-ink-light font-normal"> — {group.location}</span>}
                </h4>
              )}
              <p className="text-ink-light text-sm leading-relaxed max-w-xl">{group.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineColumn({ eyebrow, items, language }) {
  return (
    <div>
      <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-2">{eyebrow}</p>
      <div>
        {items.map((item) => <Entry key={item.id} item={item} language={language} />)}
      </div>
    </div>
  );
}

export default function Timeline({ experience, education }) {
  const { language, t } = useTranslation();
  const experienceLabel = { es: 'Experiencia', ca: 'Experiència', gl: 'Experiencia', en: 'Experience' };

  return (
    <div className="flex flex-col gap-14">
      <TimelineColumn eyebrow={experienceLabel[language] || experienceLabel.es} items={experience} language={language} />
      <TimelineColumn eyebrow={t('education_title')} items={education} language={language} />
    </div>
  );
}
