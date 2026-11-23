import {RESTAURANT_IMAGES, RESTAURANT_INFO} from '../config/restaurantData';
import {SafeImage} from './SafeImage';

export function StorySection() {
  return (
    <section id="historia" className="scroll-mt-20 bg-[#EAE4DA] text-[#1C1917]">
      {/* Part 1: Reference-2 Overlapping Story & Maritime Heritage */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Prose + Location/Hours Accent Sidebar (Ref 1 + Ref 2) */}
          <div className="lg:col-span-5 flex flex-col">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A64B2A] font-medium mb-3">
              Nuestra Esencia
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-normal tracking-[0.04em] text-[#1C1917] leading-[1.1]">
              Sobre Nosotros
            </h2>

            <p className="mt-6 text-[15px] leading-[1.75] text-[#433E38]">
              Inspirado en la noble arquitectura de una embarcación clásica,{' '}
              <strong className="font-medium text-[#1C1917]">La Fragata</strong> es desde hace
              décadas un referente de la alta cocina española y mediterránea en el corazón de
              Obarrio. Entre maderas de caoba, luces cálidas y mantelería impecable, cada mesa
              invita a disfrutar sin prisa.
            </p>

            <p className="mt-4 text-[15px] leading-[1.75] text-[#433E38]">
              Seleccionamos diariamente pescados y mariscos de máxima frescura para preparar
              recetas emblemáticas como nuestro mero con ajos rostizados, paellas al azafrán y
              entrantes ibéricos, acompañados de nuestra célebre sangría de la casa y una cava
              pensada para los paladares más exigentes.
            </p>

            {/* Reference-1 minimalist hairline hours & location notes */}
            <div className="mt-9 pt-7 border-t border-[#C9BFAF] grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-editorial italic text-xl text-[#A64B2A] mb-1.5">Ubicación</h3>
                <p className="text-[13px] leading-relaxed text-[#433E38]">
                  {RESTAURANT_INFO.fallbackAddress}
                </p>
                <a
                  href="#ubicacion"
                  className="inline-block mt-2 text-xs tracking-[0.14em] uppercase font-medium text-[#1C1917] underline underline-offset-4 decoration-[#96846C] hover:text-[#A64B2A] transition-colors"
                >
                  Ver en Mapa
                </a>
              </div>

              <div>
                <h3 className="font-editorial italic text-xl text-[#A64B2A] mb-1.5">Horario</h3>
                <ul className="space-y-1 text-[13px] text-[#433E38] tabular-nums">
                  {RESTAURANT_INFO.hoursDetail.map((row) => (
                    <li key={row.days}>
                      <span className="font-medium text-[#1C1917]">{row.days}:</span> {row.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="px-6 py-3 border border-[#1C1917] text-xs tracking-[0.16em] uppercase font-medium text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FBF9F5] transition-colors duration-150 whitespace-nowrap"
              >
                Ver Carta Completa
              </a>
              <a
                href="#reservas"
                className="px-6 py-3 bg-[#141311] text-[#FBF9F5] text-xs tracking-[0.16em] uppercase font-medium hover:bg-[#A64B2A] transition-colors duration-150 whitespace-nowrap"
              >
                Solicitar Mesa
              </a>
            </div>
          </div>

          {/* Right Column: Reference-2 Overlapping 2-Photo Editorial Composition + Circular Maritime Stamp */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 items-start">
              {/* Top-left offset image: Tapas & Pulpo */}
              <div className="col-span-6 sm:col-span-5 pt-4 sm:pt-8">
                <div className="overflow-hidden bg-[#DCD4C8] aspect-[4/5]">
                  <SafeImage
                    src={RESTAURANT_IMAGES.pulpoTapas}
                    alt="Pulpo a la brasa y croquetas artesanales servidas en mesa de piedra travertino"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <p className="mt-3 text-xs text-[#5C554E] tracking-wide">
                  Tapas de tradición · Pulpo a la brasa &amp; croquetas
                </p>
              </div>

              {/* Main tall right image: Ship-inspired Dining Room */}
              <div className="col-span-6 sm:col-span-7">
                <div className="overflow-hidden bg-[#24211E] aspect-[3/4]">
                  <SafeImage
                    src={RESTAURANT_IMAGES.interiorShip}
                    alt="Salón principal de La Fragata con revestimientos en madera noble y lámparas marítimas"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <p className="mt-3 text-xs text-[#5C554E] tracking-wide">
                  Salón principal · Arquitectura náutica en Obarrio
                </p>
              </div>
            </div>

            {/* Subtle Rotating Editorial Stamp (directly echoing Reference 2) */}
            <div
              aria-hidden="true"
              className="hidden sm:flex items-center justify-center absolute -bottom-6 left-[34%] w-28 h-28 rounded-full bg-[#EAE4DA]/90 backdrop-blur-xs border border-[#C9BFAF]"
            >
              <svg viewBox="0 0 120 120" className="w-24 h-24 animate-slow-spin text-[#433E38]">
                <defs>
                  <path
                    id="fragataCirclePath"
                    d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  />
                </defs>
                <text fontSize="9.5" letterSpacing="2.8" fill="currentColor" className="uppercase">
                  <textPath href="#fragataCirclePath">
                    LA FRAGATA · COCINA ESPAÑOLA · PANAMÁ ·
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Reference-1 Asymmetric 3-Photo Editorial Rhythm Strip */}
      <div className="bg-[#F7F3EC] border-t border-[#DCD4C8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left pair of side-by-side culinary frames */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <figure className="flex flex-col">
                <div className="overflow-hidden aspect-[4/3] sm:aspect-[4/5] bg-[#24211E]">
                  <SafeImage
                    src={RESTAURANT_IMAGES.paella}
                    alt="Paella La Fragata recién salida del fuego con mariscos frescos y azafrán"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-[#5C554E]">
                  Arroces al momento · Paella La Fragata tradicional
                </figcaption>
              </figure>

              <figure className="flex flex-col">
                <div className="overflow-hidden aspect-[4/3] sm:aspect-[4/5] bg-[#141311]">
                  <SafeImage
                    src={RESTAURANT_IMAGES.mero}
                    alt="Filete de mero con ajos rostizados y espárragos verdes"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-[#5C554E]">
                  Pesca del día · Mero con ajos rostizados
                </figcaption>
              </figure>
            </div>

            {/* Right tall bar / sangria signature shot (Ref 1 right frame) */}
            <figure className="lg:col-span-5 flex flex-col">
              <div className="overflow-hidden aspect-[4/3] lg:aspect-auto lg:flex-1 bg-[#24211E]">
                <SafeImage
                  src={RESTAURANT_IMAGES.sangriaBar}
                  alt="Sangría artesanal de vino tinto con naranja sanguina y romero en la barra de La Fragata"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <figcaption className="mt-3 text-xs text-[#5C554E]">
                Barra &amp; Cava · Nuestra reconocida sangría artesanal de la casa
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
