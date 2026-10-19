import ProfilePhoto from './ProfilePhoto';

// Entrada suave de la foto: aparece subiendo unos píxeles y pasa de blanco y
// negro a color. Solo usa opacidad, transform y filtro, así que no mueve el texto.
export default function AnimatedPhoto({ src, size = 'lg', className = '' }) {
  return (
    <div className={`photo-intro ${className}`}>
      <ProfilePhoto src={src} size={size} colorful />
    </div>
  );
}
