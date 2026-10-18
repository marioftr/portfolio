import Icon from './Icon';

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-[900] w-10 h-10 border border-border bg-bg text-ink-light hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center animate-fade-in"
    >
      <Icon name="chevronUp" size={18} strokeWidth={2.5} />
    </button>
  );
}
