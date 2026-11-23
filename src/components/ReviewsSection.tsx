import {useState} from 'react';
import {ExternalLink, Star} from 'lucide-react';
import {CLIENT_REVIEWS, RESTAURANT_INFO} from '../config/restaurantData';
import {
  calculateAverageRating,
  filterReviews,
  type ReviewFilter,
} from '../utils/reservation';

const FILTER_OPTIONS: {id: ReviewFilter; label: string}[] = [
  {id: 'all', label: 'Todas las reseñas'},
  {id: 'degusta', label: 'Degusta Panamá'},
  {id: 'tripadvisor', label: 'TripAdvisor'},
];

export function ReviewsSection() {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const visibleReviews = filterReviews(CLIENT_REVIEWS, filter);
  const averageRating = calculateAverageRating(visibleReviews);

  return (
    <section
      id="resenas"
      className="scroll-mt-20 bg-[#EAE4DA] border-t border-[#DCD4C8] text-[#1C1917] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header Row + Quantitative Platform Highlights */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-[#C9BFAF]">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A64B2A] font-medium mb-3">
              Opiniones de Comensales
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-normal tracking-[0.04em] text-[#1C1917] leading-[1.1]">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="mt-4 text-[15px] text-[#433E38] leading-relaxed">
              Reconocidos en Degusta Panamá y TripAdvisor por la frescura de nuestros mariscos,
              la sazón española tradicional y la calidez de nuestro salón en Obarrio.
            </p>
          </div>

          {/* Clean Unboxed Quantitative Proof Metrics */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-10">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-editorial text-4xl font-medium text-[#1C1917] tabular-nums">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-[#5C554E] tabular-nums">/ 5.0</span>
              </div>
              <p className="text-xs tracking-[0.12em] uppercase text-[#5C554E] mt-1">
                Promedio destacado
              </p>
            </div>

            <div className="h-10 w-px bg-[#C9BFAF] hidden sm:block" aria-hidden="true" />

            <div className="flex flex-col gap-1.5 text-xs">
              <a
                href={RESTAURANT_INFO.degustaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#1C1917] hover:text-[#A64B2A] font-medium transition-colors"
              >
                <span>Ver perfil en Degusta Panamá</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                href={RESTAURANT_INFO.tripAdvisorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#1C1917] hover:text-[#A64B2A] font-medium transition-colors"
              >
                <span>Ver reseñas en TripAdvisor</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Segmented Platform Filter */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filtrar reseñas por plataforma"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F7F3EC] border border-[#DCD4C8]"
          >
            {FILTER_OPTIONS.map((option) => {
              const active = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(option.id)}
                  className={`px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A64B2A] ${
                    active
                      ? 'bg-[#141311] text-[#FBF9F5]'
                      : 'text-[#433E38] hover:text-[#1C1917]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#5C554E] tabular-nums" data-testid="reviews-count">
            Mostrando {visibleReviews.length}{' '}
            {visibleReviews.length === 1 ? 'reseña destacada' : 'reseñas destacadas'}
          </p>
        </div>

        {/* Clean Single-Elevation Editorial Review Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className="bg-[#FBF9F5] border border-[#DCD4C8] p-7 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Platform Metadata (Unboxed Text, Zero Pills) */}
                <div className="flex items-center justify-between gap-3 text-xs text-[#5C554E] pb-4 border-b border-[#EAE4DA]">
                  <span className="tracking-[0.12em] uppercase font-medium text-[#1C1917]">
                    {review.sourceLabel}
                  </span>
                  <div
                    className="flex items-center gap-1 text-[#A64B2A] tabular-nums"
                    aria-label={`Calificación ${review.rating} de 5`}
                  >
                    <Star className="w-3.5 h-3.5 fill-[#A64B2A]" aria-hidden="true" />
                    <span className="font-semibold text-[#1C1917]">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Editorial Testimonial Quote */}
                <blockquote className="mt-5 text-[15px] leading-[1.7] text-[#35312C]">
                  “{review.quote}”
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE4DA]">
                <p className="font-editorial text-xl font-medium text-[#1C1917]">
                  {review.author}
                </p>
                <p className="text-xs text-[#5C554E] mt-0.5">
                  {review.dateLabel} · <span className="text-[#A64B2A]">{review.highlightDish}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
