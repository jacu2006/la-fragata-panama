import type {FormEvent} from 'react';
import {Calendar, Clock, Instagram, Users} from 'lucide-react';
import {RESTAURANT_IMAGES, RESTAURANT_INFO} from '../config/restaurantData';
import {AVAILABLE_TIME_SLOTS, formatTime12h} from '../utils/reservation';
import {SafeImage} from './SafeImage';

interface HeroSectionProps {
  date: string;
  time: string;
  guests: number;
  onDateChange: (val: string) => void;
  onTimeChange: (val: string) => void;
  onGuestsChange: (val: number) => void;
  onQuickReserve: () => void;
}

export function HeroSection({
  date,
  time,
  guests,
  onDateChange,
  onTimeChange,
  onGuestsChange,
  onQuickReserve,
}: HeroSectionProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onQuickReserve();
  };

  return (
    <section id="inicio" className="relative bg-[#141311] text-[#FBF9F5]">
      {/* Full-bleed candlelit culinary photography */}
      <div className="relative min-h-[68vh] sm:min-h-[78vh] lg:min-h-[84vh] flex flex-col justify-center items-center overflow-hidden">
        <SafeImage
          src={RESTAURANT_IMAGES.heroTable}
          alt="Mesa servida en Restaurante La Fragata Panamá con paella de mariscos, pescado a la brasa y copas de vino blanco"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Measured multi-stop contrast scrim for editorial legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#141311]/72 via-[#141311]/48 to-[#141311]/88"
        />

        {/* Delicate architectural curved arc motif (inspired by Reference 3) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 180"
          fill="none"
          className="pointer-events-none hidden sm:block absolute top-[18%] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-auto opacity-45"
        >
          <path
            d="M 40 160 Q 600 -30 1160 160"
            stroke="#EAE4DA"
            strokeWidth="1"
          />
          <circle cx="205" cy="108" r="4" fill="#FBF9F5" />
        </svg>

        {/* Centered Editorial Title Lockup */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-12 sm:pb-16 text-center flex flex-col items-center">
          <p className="text-[11px] sm:text-[13px] tracking-[0.24em] uppercase text-[#EAE4DA]/90 mb-4 sm:mb-5">
            Obarrio · Ciudad de Panamá
          </p>

          <h1 className="font-editorial text-[42px] sm:text-7xl lg:text-[84px] font-normal tracking-[0.1em] sm:tracking-[0.14em] uppercase leading-[1.02] text-[#FBF9F5] whitespace-nowrap">
            {RESTAURANT_INFO.name}
          </h1>

          <p className="mt-4 sm:mt-5 font-editorial italic text-lg sm:text-2xl md:text-[27px] text-[#F7F3EC]/95 max-w-2xl leading-snug">
            Tradición española, mariscos del día y elegancia náutica en el corazón de la ciudad
          </p>

          <div className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="px-7 py-3 border border-[#FBF9F5]/75 text-[#FBF9F5] text-xs tracking-[0.16em] uppercase font-medium hover:bg-[#FBF9F5] hover:text-[#141311] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96846C]"
            >
              Explorar el Menú
            </a>
            <a
              href="#ubicacion"
              className="px-6 py-3 text-[#EAE4DA] text-xs tracking-[0.16em] uppercase font-medium hover:text-white underline underline-offset-8 decoration-[#96846C] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96846C]"
            >
              Cómo Llegar
            </a>
          </div>

          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Seguir a ${RESTAURANT_INFO.name} en Instagram (${RESTAURANT_INFO.instagramHandle})`}
            className="mt-5 inline-flex items-center gap-2 px-3 py-2 text-xs tracking-[0.16em] uppercase text-[#EAE4DA]/90 hover:text-white transition-colors duration-150 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96846C]"
          >
            <Instagram
              className="w-4 h-4 text-[#C6B39A] group-hover:text-white transition-colors duration-150 shrink-0"
              aria-hidden="true"
            />
            <span className="border-b border-[#96846C]/60 group-hover:border-white pb-0.5 transition-colors duration-150">
              {RESTAURANT_INFO.instagramHandle}
            </span>
          </a>
        </div>
      </div>

      {/* Reference-2 Iconic Anchored Dark Reservation Bar */}
      <div className="relative z-20 bg-[#141311] border-t border-[#FBF9F5]/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-6">
          <form
            onSubmit={handleSubmit}
            aria-label="Reserva rápida de mesa"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch"
          >
            {/* Date Field */}
            <label className="relative flex items-center bg-[#211F1C] border border-[#38332D] px-4 py-3 focus-within:border-[#96846C] transition-colors">
              <span className="sr-only">Fecha de reserva</span>
              <Calendar className="w-4 h-4 text-[#96846C] shrink-0 mr-3" aria-hidden="true" />
              <input
                type="date"
                aria-label="Fecha de visita"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-[#FBF9F5] focus:outline-none [color-scheme:dark] tabular-nums"
              />
            </label>

            {/* Time Field */}
            <label className="relative flex items-center bg-[#211F1C] border border-[#38332D] px-4 py-3 focus-within:border-[#96846C] transition-colors">
              <span className="sr-only">Hora de reserva</span>
              <Clock className="w-4 h-4 text-[#96846C] shrink-0 mr-3" aria-hidden="true" />
              <select
                aria-label="Hora de visita"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className="w-full bg-transparent text-sm text-[#FBF9F5] focus:outline-none cursor-pointer tabular-nums"
              >
                {AVAILABLE_TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot} className="bg-[#141311] text-[#FBF9F5]">
                    {formatTime12h(slot)}
                  </option>
                ))}
              </select>
            </label>

            {/* Party Size Field */}
            <label className="relative flex items-center bg-[#211F1C] border border-[#38332D] px-4 py-3 focus-within:border-[#96846C] transition-colors">
              <span className="sr-only">Número de personas</span>
              <Users className="w-4 h-4 text-[#96846C] shrink-0 mr-3" aria-hidden="true" />
              <select
                aria-label="Número de personas"
                value={guests}
                onChange={(e) => onGuestsChange(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-[#FBF9F5] focus:outline-none cursor-pointer tabular-nums"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((count) => (
                  <option key={count} value={count} className="bg-[#141311] text-[#FBF9F5]">
                    {count === 1 ? '1 persona' : `${count} personas`}
                  </option>
                ))}
              </select>
            </label>

            {/* Primary Bronze Submit CTA */}
            <button
              type="submit"
              className="w-full bg-[#96846C] hover:bg-[#A64B2A] text-[#FBF9F5] text-xs tracking-[0.18em] uppercase font-semibold px-6 py-3.5 transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBF9F5]"
            >
              Continuar Reserva
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
