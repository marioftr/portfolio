import { useTranslation } from '../hooks/useTranslation';
import { getLegalDoc } from '../data/legal';
import PlainLayout from '../components/PlainLayout';

const LINK_PATTERN = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|www\.aepd\.es|mvillanuevatorres\.com)/g;

// Convierte correos y webs (AEPD y propia) en enlaces con el acento de la web.
function linkify(text) {
  return text.split(LINK_PATTERN).map((part, i) => {
    if (i % 2 === 0) return part;
    const isMail = part.includes('@');
    return (
      <a
        key={i}
        href={isMail ? `mailto:${part}` : `https://${part}`}
        {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        className="text-primary font-semibold hover:underline underline-offset-4"
      >
        {part}
      </a>
    );
  });
}

export default function LegalPage({ kind }) {
  const { language } = useTranslation();
  const doc = getLegalDoc(kind, language);

  return (
    <PlainLayout scrollKey={kind}>
      <h1 className="font-display text-3xl sm:text-5xl font-medium leading-tight mb-3">{doc.title}</h1>
      <p className="text-ink-light text-xs mb-8">{doc.updated}</p>
      <p className="text-ink-light leading-relaxed mb-10 max-w-2xl">{linkify(doc.intro)}</p>

      <div className="flex flex-col gap-9 max-w-2xl">
        {doc.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl sm:text-2xl font-medium mb-3">{section.title}</h2>
            <div className="flex flex-col gap-3 text-ink-light text-[0.95rem] leading-relaxed">
              {section.body.map((block, i) => (
                block.list ? (
                  <ul key={i} className="flex flex-col gap-1.5 pl-5 list-disc marker:text-primary">
                    {block.list.map((line) => <li key={line}>{linkify(line)}</li>)}
                  </ul>
                ) : <p key={i}>{linkify(block)}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PlainLayout>
  );
}
