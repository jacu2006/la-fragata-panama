import {useRef, useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {MENU_CATEGORIES} from '../config/restaurantData';
import {SafeImage} from './SafeImage';

export function MenuSection() {
  const [activeId, setActiveId] = useState<string>(MENU_CATEGORIES[1].id);
  const dishesStartRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = Math.max(
    0,
    MENU_CATEGORIES.findIndex((category) => category.id === activeId)
  );
  const activeCategory = MENU_CATEGORIES[activeIndex] ?? MENU_CATEGORIES[0];
  const nextCategory = MENU_CATEGORIES[(activeIndex + 1) % MENU_CATEGORIES.length];

  const handleSelectCategory = (categoryId: string, scrollToDishesOnMobile: boolean) => {
    setActiveId(categoryId);

    if (scrollToDishesOnMobile && window.innerWidth < 1024) {
      const tabBtn = mobileTabRefs.current[categoryId];
      tabBtn?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });

      if (dishesStartRef.current) {
        // Offset cleanly below fixed mobile navbar (64px) + sticky mobile category strip (48px)
        const targetTop =
          dishesStartRef.current.getBoundingClientRect().top + window.scrollY - 112;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section id="menu" className="scroll-mt-20 bg-[#FBF9F5] border-t border-[#DCD4C8] text-[#1C1917]">
      {/* Mobile Editorial Header (Visible < lg) */}
      <div className="lg:hidden px-6 pt-14 pb-6 bg-[#F4EFE7]">
        <p className="text-xs tracking-[0.2em] uppercase text-[#A64B2A] font-medium mb-2">
          La Carta
        </p>
        <h2 className="font-editorial text-4xl font-normal tracking-[0.04em] text-[#1C1917]">
          Nuestro Menú
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-[#5C554E]">
          Selecciona una categoría para ver los platillos y precios al instante.
        </p>
      </div>

      {/* Mobile Sticky Horizontal Category Strip (48px height -> 64px nav + 48px strip = 112px, <= 15% of 844px) */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#F4EFE7]/98 backdrop-blur-md border-y border-[#DCD4C8]">
        <div
          role="tablist"
          aria-label="Categorías del menú móvil"
          className="flex items-center overflow-x-auto no-scrollbar px-4 h-12 gap-1"
        >
          {MENU_CATEGORIES.map((category) => {
            const isSelected = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                ref={(el) => {
                  mobileTabRefs.current[category.id] = el;
                }}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls="menu-dishes-panel"
                onClick={() => handleSelectCategory(category.id, true)}
                className={`relative h-full px-3.5 text-xs tracking-[0.12em] uppercase whitespace-nowrap shrink-0 flex items-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A64B2A] ${
                  isSelected
                    ? 'text-[#A64B2A] font-semibold'
                    : 'text-[#433E38] hover:text-[#1C1917]'
                }`}
              >
                <span>{category.label}</span>
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 inset-x-3 h-[2px] bg-[#A64B2A]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Desktop Split Menu Architecture (Ref 2) + Immediate Mobile Dishes Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Desktop Left Column: Vertical Editorial Category Navigation */}
          <div className="hidden lg:flex lg:col-span-4 px-12 py-24 bg-[#F4EFE7] border-r border-[#DCD4C8] flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#A64B2A] font-medium mb-3">
                La Carta
              </p>
              <h2 className="font-editorial text-5xl font-normal tracking-[0.04em] text-[#1C1917]">
                Nuestro Menú
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5C554E]">
                Recetas clásicas de la gastronomía española y del Mediterráneo elaboradas con
                ingredientes frescos de temporada.
              </p>

              {/* Vertical Hairline Category List (Directly mirroring Reference 2) */}
              <div
                role="tablist"
                aria-label="Categorías del menú de La Fragata"
                className="mt-10 pl-5 border-l border-[#1C1917]/25 flex flex-col gap-1"
              >
                {MENU_CATEGORIES.map((category) => {
                  const isSelected = category.id === activeCategory.id;
                  return (
                    <button
                      key={category.id}
                      role="tab"
                      type="button"
                      aria-selected={isSelected}
                      aria-controls="menu-dishes-panel"
                      onClick={() => handleSelectCategory(category.id, false)}
                      className={`group flex items-center justify-between w-full text-left py-3 text-[13px] tracking-[0.16em] uppercase transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A64B2A] ${
                        isSelected
                          ? 'text-[#A64B2A] font-semibold'
                          : 'text-[#1C1917]/75 hover:text-[#1C1917]'
                      }`}
                    >
                      <span className="whitespace-nowrap">{category.label}</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-150 ${
                          isSelected
                            ? 'opacity-100 translate-x-0 text-[#A64B2A]'
                            : 'opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#DCD4C8] text-xs text-[#5C554E] leading-relaxed">
              <p>
                Precios expresados en USD. No incluyen ITBMS (7%). Imágenes de referencia.
              </p>
            </div>
          </div>

          {/* Right Column (Full Width on Mobile): Featured Dish Photography + Detailed Dishes Panel */}
          <div
            ref={dishesStartRef}
            role="tabpanel"
            id="menu-dishes-panel"
            aria-label={activeCategory.label}
            className="lg:col-span-8 flex flex-col"
          >
            {/* Compact on Mobile (176px) so first dishes & prices appear immediately above the fold */}
            <div className="relative h-44 sm:h-72 lg:h-[360px] bg-[#141311] overflow-hidden">
              <SafeImage
                src={activeCategory.featuredImage}
                alt={activeCategory.featuredAlt}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141311]/88 via-[#141311]/25 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 px-6 lg:px-12 pb-5 lg:pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1.5 text-[#FBF9F5]">
                <div>
                  <p className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#EAE4DA]/85">
                    {activeCategory.label}
                  </p>
                  <p className="font-editorial italic text-xl sm:text-2xl text-[#FBF9F5] leading-snug">
                    {activeCategory.featuredCaption}
                  </p>
                </div>
                <span className="text-xs text-[#EAE4DA]/80 tabular-nums">
                  {activeCategory.dishes.length} platos seleccionados
                </span>
              </div>
            </div>

            {/* Clean Editorial Dish List (Zero Pill Badges) */}
            <div className="px-6 lg:px-12 py-8 lg:py-12 flex-1 bg-[#FBF9F5]">
              <p className="text-sm text-[#5C554E] mb-7 lg:mb-8">{activeCategory.subtitle}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 lg:gap-y-7">
                {activeCategory.dishes.map((dish) => (
                  <article
                    key={dish.id}
                    className="pb-5 lg:pb-6 border-b border-[#DCD4C8]/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-editorial text-[21px] sm:text-[22px] font-medium text-[#1C1917] leading-snug">
                          {dish.name}
                        </h3>
                        <span className="text-sm font-medium text-[#1C1917] tabular-nums shrink-0">
                          {dish.price}
                        </span>
                      </div>

                      {dish.signature && (
                        <p className="mt-1 text-[11px] tracking-[0.14em] uppercase text-[#A64B2A] font-medium">
                          Especialidad de la casa
                        </p>
                      )}

                      <p className="mt-2 text-sm leading-relaxed text-[#5C554E]">
                        {dish.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Mobile Quick Next-Category Flow */}
              <div className="lg:hidden mt-8 pt-6 border-t border-[#DCD4C8]">
                <button
                  type="button"
                  onClick={() => handleSelectCategory(nextCategory.id, true)}
                  className="w-full py-3.5 px-5 bg-[#141311] hover:bg-[#A64B2A] text-[#FBF9F5] text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Siguiente: {nextCategory.label}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>

              {/* Discrete Legal & Reference Footer Note (All Viewports) */}
              <p className="mt-8 pt-5 border-t border-[#DCD4C8]/80 text-xs text-[#5C554E] leading-relaxed">
                Precios expresados en USD. No incluyen ITBMS (7%). Imágenes de referencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
