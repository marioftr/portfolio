import Icon from './Icon';

// Cubo CSS 3D que gira despacio: una cara es la foto y las otras tres llevan
// los iconos de las disciplinas (3D, videojuegos y vídeo). Sin dependencias.
const ROLE_FACES = ['box', 'code', 'layout'];

export default function RotatingCube({ photo, alt = '', className = '' }) {
  return (
    <div className={`cube-scene shrink-0 ${className}`} role="img" aria-label={alt}>
      <div className="cube">
        <div className="cube-face cube-front group">
          <img src={photo} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500" />
        </div>
        {ROLE_FACES.map((icon, i) => (
          <div key={icon} className={`cube-face cube-icon-face cube-side-${i}`}>
            <Icon name={icon} size={56} strokeWidth={1.25} className="text-primary" />
          </div>
        ))}
        <div className="cube-face cube-top" />
        <div className="cube-face cube-bottom" />
      </div>
    </div>
  );
}
