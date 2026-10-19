export default function ProfilePhoto({ src, size = 'md', className = '', colorful = false }) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-28 h-28 sm:w-36 sm:h-36',
    xl: 'w-32 h-32 sm:w-48 sm:h-48',
    contact: 'w-24 h-24 sm:w-36 sm:h-36',
  };
  return (
    <div className={`group ${sizes[size]} shrink-0 overflow-hidden border border-border ${className}`}>
      <img
        src={src}
        alt="Mario Villanueva Torres"
        className={`w-full h-full object-cover ${colorful ? '' : 'grayscale group-hover:grayscale-0 transition-[filter] duration-500'}`}
      />
    </div>
  );
}
