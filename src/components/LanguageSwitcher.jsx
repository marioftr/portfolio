import { useTranslation } from '../hooks/useTranslation';

const FlagIcon = ({ code }) => {
    if (code === 'es') {
        return (
            <svg width="20" height="15" viewBox="0 0 640 480" style={{ borderRadius: '2px' }}>
                <g fillRule="evenodd" strokeWidth="1pt">
                    <path fill="#aa151b" d="M0 0h640v480H0z" />
                    <path fill="#f1bf00" d="M0 120h640v240H0z" />
                </g>
            </svg>
        );
    }
    if (code === 'en') {
        return (
            <svg width="20" height="15" viewBox="0 0 640 480" style={{ borderRadius: '2px' }}>
                <path fill="#012169" d="M0 0h640v480H0z" />
                <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
                <path fill="#C8102E" d="M424 294l216 163v23h-36L282 205 66 366H0v-36l216-163L0 36V0h24l214 159L458 0h36L278 161 512 360h-52L246 195 424 294z" />
                <path fill="#FFF" d="M250 0h140v480H250zM0 170h640v140H0z" />
                <path fill="#C8102E" d="M280 0h80v480h-80zM0 200h640v80H0z" />
            </svg>
        );
    }
    if (code === 'gl') {
        return (
            <svg width="20" height="15" viewBox="0 0 640 480" style={{ borderRadius: '2px' }}>
                <rect width="640" height="480" fill="#fff" />
                <path fill="#0092cf" d="M140 0L0 140v340h340L640 140V0H140z" /> {/* Simplified Diagonal */}
                {/* Shield placeholder (simplified) */}
                <path fill="#0092cf" d="M410 0L0 410v70h165L640 230V0H410z" />
                <rect width="640" height="480" fill="#fff" />
                <path d="M640 0h-165L0 475v5h165L640 5V0z" fill="#0092cf" /> {/* Correct diagonal */}
            </svg>
        );
    }
    if (code === 'ca') {
        return (
            <svg width="20" height="15" viewBox="0 0 640 480" style={{ borderRadius: '2px' }}>
                <g fillRule="evenodd" strokeWidth="1pt">
                    <path fill="#ffc400" d="M0 0h640v480H0z" />
                    <path fill="#ff0000" d="M0 0h640v96H0z" />
                    <path fill="#ff0000" d="M0 192h640v96H0z" />
                    <path fill="#ff0000" d="M0 384h640v96H0z" />
                </g>
            </svg>
        );
    }
    return null;
};


export default function LanguageSwitcher() {
    const { language, setLanguage } = useTranslation();

    const languages = [
        { code: 'es', label: 'ES' },
        { code: 'ca', label: 'CA' },
        { code: 'gl', label: 'GL' },
        { code: 'en', label: 'EN' }
    ];

    return (
        <div className="flex gap-md">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`btn ${language === lang.code ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    aria-label={`Switch to ${lang.label}`}
                >
                    <FlagIcon code={lang.code} />
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
