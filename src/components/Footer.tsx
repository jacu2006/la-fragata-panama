import {ArrowUp} from 'lucide-react';
import {RESTAURANT_INFO} from '../config/restaurantData';
import {WHATSAPP_BASE_URL} from '../utils/reservation';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer className="bg-[#EAE4DA] text-[#1C1917] border-t border-[#DCD4C8]">
      {/* Upper Editorial Social & Emblem Row (Echoing Ref 1 & Ref 2) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Oversized Serif Social Links (Ref 2) */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-editorial text-3xl sm:text-4xl tracking-[0.08em] uppercase text-[#1C1917] hover:text-[#A64B2A] transition-colors"
          >
            Instagram
          </a>
          <a
            href={RESTAURANT_INFO.degustaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-editorial text-2xl sm:text-3xl tracking-[0.08em] uppercase text-[#433E38] hover:text-[#A64B2A] transition-colors"
          >
            Degusta Panamá
          </a>
          <a
            href={RESTAURANT_INFO.tripAdvisorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-editorial text-2xl sm:text-3xl tracking-[0.08em] uppercase text-[#433E38] hover:text-[#A64B2A] transition-colors"
          >
            TripAdvisor
          </a>
        </div>

        {/* Center: Minimalist Circular Maritime Emblem Seal (Ref 1) */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full border border-dashed border-[#A64B2A]/65 flex flex-col items-center justify-center">
            <span className="font-editorial text-2xl font-semibold text-[#A64B2A] leading-none">
              LF
            </span>
            <span className="text-[9px] tracking-[0.18em] uppercase text-[#5C554E] mt-1">
              Panamá
            </span>
          </div>
          <p className="mt-3 text-xs tracking-[0.14em] uppercase text-[#5C554E]">
            {RESTAURANT_INFO.instagramHandle}
          </p>
        </div>

        {/* Right: Back-to-top Editorial Action (Ref 2) */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-medium text-[#1C1917] hover:text-[#A64B2A] transition-colors cursor-pointer py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A64B2A]"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
            <span>Volver Arriba</span>
          </button>
          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.14em] uppercase text-[#5C554E] hover:text-[#A64B2A] underline underline-offset-4 transition-colors"
          >
            WhatsApp {RESTAURANT_INFO.whatsappDisplay}
          </a>
        </div>
      </div>

      {/* Bottom Taupe Bar (Directly mirroring Reference 2 footer strip) */}
      <div className="bg-[#8C7E6B] text-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-[0.1em]">
          <div className="flex flex-wrap items-center justify-center gap-6 uppercase">
            <a href="#historia" className="hover:text-white/80 transition-colors">
              Historia
            </a>
            <a href="#menu" className="hover:text-white/80 transition-colors">
              Menú
            </a>
            <a href="#galeria" className="hover:text-white/80 transition-colors">
              Galería
            </a>
            <a href="#reservas" className="hover:text-white/80 transition-colors">
              Reservas
            </a>
            <a href="#ubicacion" className="hover:text-white/80 transition-colors">
              Ubicación
            </a>
          </div>
          <p className="text-[#FBF9F5]/85 text-center sm:text-right">
            © {new Date().getFullYear()} Restaurante La Fragata Panamá · Obarrio, Ciudad de Panamá
          </p>
        </div>
      </div>
    </footer>
  );
}
