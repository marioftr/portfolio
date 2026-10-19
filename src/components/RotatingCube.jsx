// Cubo CSS 3D de solo aristas que gira despacio; una cara lleva la foto.
// Sin dependencias: seis caras con borde y fondo casi transparente.
import { Link } from 'react-router-dom';

export default function RotatingCube({ photo, to, label, className = '' }) {
  return (
    <Link to={to} aria-label={label} title={label} className={`cube-scene block shrink-0 ${className}`}>
      <div className="cube-tilt">
        <div className="cube">
          <div className="cube-face cube-front">
            <img src={photo} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="cube-face cube-right" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      </div>
    </Link>
  );
}
