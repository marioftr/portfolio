export default function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-8 lg:mb-10">
      {eyebrow && (
        <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight text-ink">{title}</h2>
    </div>
  );
}
