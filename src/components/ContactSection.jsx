import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { socialLinks } from '../data/content';
import Icon from './Icon';
import AnimatedPhoto from './AnimatedPhoto';

const allLinks = [
  socialLinks.find((l) => l.name === 'Linktree'),
  socialLinks.find((l) => l.name === 'LinkedIn'),
  { name: 'YouTube', url: 'https://www.youtube.com/@mariovt9', icon: 'youtube' },
  socialLinks.find((l) => l.name === 'GitHub'),
  socialLinks.find((l) => l.name === 'ArtStation'),
  { name: 'Instagram', url: 'https://www.instagram.com/mario_ftr', icon: 'instagram' },
].filter(Boolean);

function iconName(name) {
  const map = { linktree: 'link', link: 'link', linkedin: 'linkedin', github: 'github', artstation: 'artstation', youtube: 'youtubeFilled', instagram: 'instagram' };
  return map[name.toLowerCase()] || 'link';
}

const CONTACT_EMAIL = 'contacto@mvillanuevatorres.com';

const fieldClass = 'w-full bg-card border border-border px-3 py-2.5 text-sm text-ink placeholder:text-ink-light/60 focus:outline-none focus:border-primary transition-colors';

// Envío vía Web3Forms (sin backend propio). La clave de acceso es pública por
// diseño y se define en VITE_WEB3FORMS_KEY. Sin clave, se recurre a un mailto.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base = `${t('form_subject')} — ${form.name.trim()}`;
    const custom = form.subject.trim();
    const subject = custom ? `${custom} — ${base}` : base;

    if (!WEB3FORMS_KEY) {
      const body = `${form.message}

— ${form.name} (${form.email})`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const labelClass = 'flex flex-col gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ink-light';
  const inputClass = `${fieldClass} normal-case tracking-normal font-normal`;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-4 mb-12 pb-10 border-b border-border">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className={labelClass}>
          <span>{t('form_name')}<span className="text-red-600 dark:text-red-400" aria-hidden="true"> *</span></span>
          <input type="text" required value={form.name} onChange={update('name')} autoComplete="name" className={inputClass} />
        </label>
        <label className={labelClass}>
          <span>{t('form_email')}<span className="text-red-600 dark:text-red-400" aria-hidden="true"> *</span></span>
          <input type="email" required value={form.email} onChange={update('email')} autoComplete="email" className={inputClass} />
        </label>
      </div>
      <label className={labelClass}>
        {t('form_subject_label')}
        <input type="text" value={form.subject} onChange={update('subject')} className={inputClass} />
      </label>
      <label className={labelClass}>
        <span>{t('form_message')}<span className="text-red-600 dark:text-red-400" aria-hidden="true"> *</span></span>
        <textarea required rows={5} value={form.message} onChange={update('message')} className={`${inputClass} resize-y`} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 bg-ink text-bg px-5 py-2.5 text-sm font-bold hover:bg-primary transition-colors disabled:opacity-60"
        >
          <Icon name="mail" size={15} strokeWidth={2} />
          {status === 'sending' ? t('form_sending') : t('form_send')}
        </button>
        {status === 'success' && <p role="status" className="text-primary text-sm font-semibold flex-1 min-w-48">{t('form_success')}</p>}
        {status === 'error' && <p role="alert" className="text-sm font-semibold text-ink flex-1 min-w-48">{t('form_error')}</p>}
      </div>
    </form>
  );
}

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">{t('nav_contact')}</p>
      {/* Móvil: el título ocupa toda la fila (no cambia de líneas al cargar la tipografía) y,
          debajo, la frase junto a la foto en un bloque de altura fija. Escritorio: título y
          frase a la izquierda y la foto a la derecha, ocupando ambas filas. */}
      <div className="grid grid-cols-[1fr_auto] gap-x-5 sm:gap-x-10 mb-8 sm:mb-10">
        <h1 className="col-span-2 sm:col-span-1 min-w-0 font-display text-2xl sm:text-4xl leading-[1.05] font-medium">{t('contact_talk')}</h1>
        <AnimatedPhoto src="/images/foto_orla.jpg" size="contact" className="col-start-2 row-start-2 sm:row-start-1 sm:row-span-2 self-start mt-5 sm:mt-0" />
        <p className="col-start-1 row-start-2 sm:row-start-2 min-h-[8.5rem] sm:min-h-0 text-ink-light leading-relaxed max-w-lg mt-5 sm:mt-6">{t('contact_intro')}</p>
      </div>

      <ContactForm />

      <div className="flex flex-col gap-1 mb-12 pb-10 border-b border-border">
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-display text-[clamp(1.1rem,5.4vw,1.6rem)] sm:text-4xl max-w-full [overflow-wrap:anywhere] hover:text-primary transition-colors">
          {CONTACT_EMAIL}
        </a>
        <a href="tel:+34663126640" className="font-display text-[clamp(1.1rem,5.4vw,1.6rem)] sm:text-4xl max-w-full [overflow-wrap:anywhere] hover:text-primary transition-colors">
          +34 663 126 640
        </a>
        <p className="inline-flex items-center gap-1.5 text-ink-light text-sm mt-2"><Icon name="pin" size={14} strokeWidth={2} />Madrid</p>
      </div>

      <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-4">{t('contact_socials')}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {allLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-primary transition-colors"
          >
            <Icon name={iconName(link.icon || link.name)} size={16} />
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
