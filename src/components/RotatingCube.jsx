// Cubo CSS 3D de solo aristas que gira despacio; una cara lleva la foto.
// Sin dependencias: seis caras con borde y fondo casi transparente.
export default function RotatingCube({ photo, alt = '', className = '' }) {
  return (
    <div className={`cube-scene shrink-0 ${className}`} role="img" aria-label={alt}>
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
    </div>
  );
}
