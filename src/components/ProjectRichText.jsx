import { useMemo, useState } from 'react';

function VideoCarousel({ html }) {
  const [active, setActive] = useState(0);

  const videos = useMemo(() => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const container = doc.querySelector('.custom-video-carousel') || doc.body;
    return Array.from(container.children).map((child) => ({
      title: child.querySelector('h3')?.textContent || '',
      description: child.querySelector('p')?.textContent || '',
      src: child.querySelector('iframe')?.getAttribute('src') || '',
      iframeTitle: child.querySelector('iframe')?.getAttribute('title') || '',
    })).filter((v) => v.src);
  }, [html]);

  if (videos.length === 0) return null;
  const current = videos[Math.min(active, videos.length - 1)];

  return (
    <div className="my-8">
      {videos.length > 1 && (
        <div className="flex flex-wrap gap-2" role="tablist">
          {videos.map((v, i) => (
            <button
              key={v.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex items-baseline gap-2 px-4 py-2.5 text-sm font-semibold text-left leading-snug border transition-colors ${
                i === active ? 'bg-primary text-bg border-primary' : 'bg-card text-ink border-ink/30 hover:border-primary hover:text-primary'
              }`}
            >
              <span className="font-display text-xs">{String(i + 1).padStart(2, '0')}</span>
              {v.title}
            </button>
          ))}
        </div>
      )}
      <div className="pt-4">
        {videos.length === 1 && current.title && <h3 className="font-display text-xl font-medium mb-2">{current.title}</h3>}
        {current.description && <p className="text-ink-light mb-4">{current.description}</p>}
        <iframe
          key={current.src}
          src={current.src}
          title={current.iframeTitle || current.title}
          className="w-full aspect-video bg-black border border-border"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function RichText({ text, onImageClick }) {
  if (!text) return null;
  const rawLines = text.split(/\r?\n/);
  const isBlockLine = (l) => { const t = l.trim(); return t.startsWith('<div') || t.startsWith('<iframe') || t.startsWith('<img') || t.startsWith('## ') || t.startsWith('### '); };
  const lines = rawLines.filter((line, i) => {
    if (line.trim() !== '') return true;
    return !isBlockLine(rawLines[i - 1] || '') && !isBlockLine(rawLines[i + 1] || '');
  });

  return lines.map((line, index) => {
    const trimmed = line.trim();
    if (trimmed === '') return <div key={index} className="h-3" aria-hidden="true" />;

    if (trimmed.startsWith('## ')) {
      return <h3 key={index} className="font-display text-2xl font-medium border-b border-border pb-2 mt-10 first:mt-2 mb-4">{trimmed.replace('## ', '')}</h3>;
    }
    if (trimmed.startsWith('### ')) {
      return <h4 key={index} className="font-display text-xl font-medium text-primary mt-8 first:mt-0 mb-3">{trimmed.replace('### ', '')}</h4>;
    }
    if (trimmed.startsWith('- ')) {
      const content = trimmed.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
      return (
        <div key={index} className="flex gap-3 ml-2 mb-2">
          <span className="text-primary font-bold">•</span>
          <span className="text-[1rem] leading-relaxed text-ink-light" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }
    if (trimmed.startsWith('<div') || trimmed.startsWith('<iframe') || trimmed.startsWith('<img')) {
      if (trimmed.includes('custom-video-carousel')) return <VideoCarousel key={index} html={trimmed} />;
      if (trimmed.includes('custom-gallery')) {
        return (
          <div
            key={index}
            className="my-4"
            onClick={(e) => { if (e.target.tagName === 'IMG') onImageClick(e.target.getAttribute('src')); }}
            dangerouslySetInnerHTML={{ __html: trimmed }}
          />
        );
      }
      return <div key={index} className="my-6 w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: trimmed }} />;
    }
    const html = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    return <p key={index} className="mb-5 leading-relaxed text-[1.05rem] text-ink-light" dangerouslySetInnerHTML={{ __html: html }} />;
  });
}
