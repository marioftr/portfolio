import { useTranslation } from '../hooks/useTranslation';
import { roles } from '../data/content';

export default function RoleSelector({ activeRole, onRoleSelect }) {
    const { t } = useTranslation();

    return (
        <section className="container" style={{ margin: '2rem auto', display: 'flex', justifyContent: 'center' }}>
            <div
                className="flex flex-wrap justify-center gap-sm"
                style={{
                    backgroundColor: 'white',
                    padding: '0.8rem',
                    borderRadius: '100px',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--color-border)',
                    maxWidth: 'fit-content'
                }}
            >
                {roles.map((role) => {
                    const isActive = activeRole === role.id;
                    return (
                        <button
                            key={role.id}
                            onClick={() => onRoleSelect(role.id)}
                            className="btn"
                            style={{
                                borderRadius: '100px',
                                padding: '0.7rem 1.8rem',
                                fontSize: '1rem',
                                fontWeight: isActive ? 800 : 500,
                                backgroundColor: 'transparent',
                                color: isActive ? 'var(--color-primary)' : 'var(--color-text-light)',
                                border: 'none',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}
                        >
                            {t(role.labelKey)}
                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '20px',
                                    height: '3px',
                                    backgroundColor: 'var(--color-primary)',
                                    borderRadius: '2px'
                                }} />
                            )}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
