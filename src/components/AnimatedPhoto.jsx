import ProfilePhoto from './ProfilePhoto';

// Aparece con un fundido de opacidad: no mueve ni redimensiona nada, así que
// el texto de al lado no se desplaza. El color llega al pasar el ratón, como en el resto.
export default function AnimatedPhoto({ src, size = 'lg', className = '' }) {
  return (
    <div className={`photo-fade ${className}`}>
      <ProfilePhoto src={src} size={size} />
    </div>
  );
}
