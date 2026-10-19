import { useRef } from 'react';
import ProfilePhoto from './ProfilePhoto';

// Foto con entrada en revelado, flotación suave y una ligera inclinación que
// sigue al puntero en escritorio. En táctil solo se anima el revelado y la flotación.
export default function AnimatedPhoto({ src, size = 'lg', className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(x * 12).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div className={`photo-tilt ${className}`} ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="photo-float">
        <ProfilePhoto src={src} size={size} className="photo-reveal" />
      </div>
    </div>
  );
}
