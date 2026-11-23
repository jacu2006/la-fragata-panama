import {useState} from 'react';
import {Utensils} from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#24211E] via-[#1C1917] to-[#141311] text-[#EAE4DA]/80 p-6 text-center ${className}`}
      >
        <Utensils className="w-7 h-7 text-[#96846C]" aria-hidden="true" />
        <span className="font-editorial text-lg tracking-wide">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
