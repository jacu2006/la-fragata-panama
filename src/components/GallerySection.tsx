import {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, Instagram, X} from 'lucide-react';
import {GALLERY_ITEMS, RESTAURANT_IMAGES, RESTAURANT_INFO} from '../config/restaurantData';
import {SafeImage} from './SafeImage';

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
    );
  };

  return (
    <section id="galeria" className="scroll-mt-20 bg-[#F7F3EC] text-[#1C1917]">
      {/* Reference-1 Full-Bleed Atmospheric Editorial Quote Banner */}
      <div className="relative h-[340px] sm:h-[400px] bg-[#141311] overflow-hidden flex items-center justify-center">
        <SafeImage
          src={RESTAURANT_IMAGES.paella}
          alt="Detalle de paella de mariscos de La Fragata servida a la mesa"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#141311]/70 via-[#141311]/55 to-[#141311]/75"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-[#FBF9F5]">
          <p className="font-editorial text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.2]">
            Preparado con respeto al mar y orgullo por la tradición, para disfrutarse sin prisa en
            buena compañía.
          </p>
          <p className="mt-4 font-editorial italic text-xl text-[#EAE4DA]/90">
            ¡Buen provecho!
          </p>
        </div>
      </div>

      {/* Reference-3 Inspired Arc Motif + Curated High-Resolution Gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex flex-col items-center text-center mb-14">
          {/* Thin Terracotta Arc Motif (Ref 3) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 640 72"
            fill="none"
            className="w-full max-w-xl h-auto mb-4"
          >
            <path d="M 16 64 Q 320 -18 624 64" stroke="#A64B2A" strokeWidth="1" opacity="0.65" />
            <circle cx="96" cy="40" r="4" fill="#A64B2A" />
          </svg>

          <p className="text-xs tracking-[0.2em] uppercase text-[#A64B2A] font-medium mb-2">
            Galería Fotográfica
          </p>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal tracking-[0.04em] text-[#1C1917]">
            La Experiencia La Fragata
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] text-[#5C554E] max-w-xl leading-relaxed">
            Desde nuestro salón inspirado en una embarcación clásica hasta el aroma del azafrán y
            los mariscos recién preparados. Haz clic en cualquier fotografía para verla en detalle.
          </p>
        </div>

        {/* Asymmetric 3-Column Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`Ampliar fotografía: ${item.title}`}
              className="group relative text-left overflow-hidden bg-[#141311] aspect-[4/3] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A64B2A]"
            >
              <SafeImage
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141311]/80 via-[#141311]/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-200"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 text-[#FBF9F5]">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#EAE4DA]/80">
                  {item.category}
                </p>
                <p className="mt-0.5 font-editorial text-2xl font-normal text-[#FBF9F5]">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Quiet Instagram Follow Row (echoing Ref 1 bottom strip) */}
        <div className="mt-12 pt-8 border-t border-[#DCD4C8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-editorial italic text-2xl text-[#1C1917]">
              Novedades y pesca del día en Instagram
            </p>
            <p className="text-sm text-[#5C554E] mt-1">
              Sigue nuestro día a día, sugerencias del chef y veladas en Obarrio.
            </p>
          </div>
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#1C1917] text-xs tracking-[0.16em] uppercase font-medium text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FBF9F5] transition-colors whitespace-nowrap"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span>{RESTAURANT_INFO.instagramHandle}</span>
          </a>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${activeItem.title}`}
          className="fixed inset-0 z-50 bg-[#141311]/92 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1C1917] border border-[#38332D] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#38332D] text-[#FBF9F5]">
              <div className="flex items-center gap-3 text-xs tracking-[0.16em] uppercase text-[#EAE4DA]/80 tabular-nums">
                <span>{activeItem.category}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Cerrar galería ampliada"
                className="inline-flex items-center justify-center w-10 h-10 text-[#EAE4DA] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-[#96846C]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative bg-[#141311] aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
              <SafeImage
                src={activeItem.src}
                alt={activeItem.alt}
                className="w-full h-full object-contain"
              />

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Fotografía anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#141311]/80 hover:bg-[#A64B2A] text-[#FBF9F5] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FBF9F5]"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Fotografía siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#141311]/80 hover:bg-[#A64B2A] text-[#FBF9F5] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FBF9F5]"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="px-6 py-5 bg-[#1C1917] text-[#FBF9F5]">
              <h3 className="font-editorial text-2xl font-normal">{activeItem.title}</h3>
              <p className="mt-1 text-sm text-[#EAE4DA]/80">{activeItem.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
