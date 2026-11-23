import {useEffect, useState} from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {ExternalLink, MapPin, MessageCircle, Navigation, Phone} from 'lucide-react';
import {RESTAURANT_INFO} from '../config/restaurantData';
import {WHATSAPP_BASE_URL} from '../utils/reservation';

const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ?? '';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

// Broad Panama City viewport center used only until Places API (New) resolves La Fragata's exact pin.
const PANAMA_CITY_VIEWPORT_CENTER: LatLngLiteral = {
  lat: 8.9833,
  lng: -79.5167,
};

const DEFAULT_MAPS_SEARCH_URL = RESTAURANT_INFO.googleMapsUrl;

interface ResolvedPlaceDetails {
  name: string;
  position: LatLngLiteral;
  formattedAddress?: string;
  googleMapsURI?: string;
  nationalPhoneNumber?: string;
  rating?: number;
  userRatingCount?: number;
}

interface MapContentProps {
  onPlaceResolved: (details: ResolvedPlaceDetails) => void;
  onStatusChange: (status: 'loading' | 'ready' | 'unavailable') => void;
}

function LaFragataMapContent({onPlaceResolved, onStatusChange}: MapContentProps) {
  const map = useMap();
  const placesLibrary = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [placeDetails, setPlaceDetails] = useState<ResolvedPlaceDetails | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    if (!map || !placesLibrary) return;

    let cancelled = false;

    const locateRestaurant = async () => {
      try {
        // Modern Places API (New) Text Search: https://developers.google.com/maps/documentation/javascript/place-search?utm_campaign=gmp_mcp_codeassist_v1_aistudio
        const {places} = await placesLibrary.Place.searchByText({
          textQuery: 'Restaurante La Fragata Obarrio Ciudad de Panamá',
          fields: [
            'displayName',
            'location',
            'formattedAddress',
            'googleMapsURI',
            'nationalPhoneNumber',
            'rating',
            'userRatingCount',
          ],
          includedType: 'restaurant',
          language: 'es',
          region: 'pa',
          maxResultCount: 1,
        });

        if (cancelled) return;

        const match = places?.[0];
        if (match?.location) {
          const lat =
            typeof match.location.lat === 'function'
              ? match.location.lat()
              : Number(match.location.lat);
          const lng =
            typeof match.location.lng === 'function'
              ? match.location.lng()
              : Number(match.location.lng);

          const resolved: ResolvedPlaceDetails = {
            name: match.displayName || 'Restaurante La Fragata',
            position: {lat, lng},
            formattedAddress: match.formattedAddress ?? undefined,
            googleMapsURI: match.googleMapsURI ?? undefined,
            nationalPhoneNumber: match.nationalPhoneNumber ?? undefined,
            rating: match.rating ?? undefined,
            userRatingCount: match.userRatingCount ?? undefined,
          };

          setPlaceDetails(resolved);
          onPlaceResolved(resolved);
          onStatusChange('ready');
          map.panTo(resolved.position);
          map.setZoom(17);
        } else {
          onStatusChange('unavailable');
        }
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        if (
          message.includes('RESOURCE_EXHAUSTED') ||
          message.includes('OVER_QUERY_LIMIT') ||
          message.includes('Quota') ||
          message.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onStatusChange('unavailable');
      }
    };

    void locateRestaurant();

    return () => {
      cancelled = true;
    };
  }, [map, placesLibrary, onPlaceResolved, onStatusChange]);

  if (!placeDetails) return null;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={placeDetails.position}
        title={placeDetails.name}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <Pin
          background="#A64B2A"
          borderColor="#141311"
          glyphColor="#FBF9F5"
          scale={1.2}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={280}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-[#1C1917] font-sans">
            <p className="font-editorial text-xl font-semibold text-[#141311]">
              {placeDetails.name}
            </p>
            {placeDetails.formattedAddress && (
              <p className="mt-1 text-xs text-[#433E38] leading-snug">
                {placeDetails.formattedAddress}
              </p>
            )}
            {placeDetails.rating !== undefined && (
              <p className="mt-1.5 text-xs text-[#A64B2A] font-medium tabular-nums">
                ★ {placeDetails.rating.toFixed(1)}
                {placeDetails.userRatingCount
                  ? ` (${placeDetails.userRatingCount} reseñas en Google)`
                  : ''}
              </p>
            )}
            <a
              href={placeDetails.googleMapsURI || DEFAULT_MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#141311] underline underline-offset-2 hover:text-[#A64B2A]"
            >
              <span>Cómo llegar en Google Maps</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export function LocationMapSection() {
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlaceDetails | null>(null);
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');

  const displayAddress = resolvedPlace?.formattedAddress || RESTAURANT_INFO.fallbackAddress;
  const displayPhone = resolvedPlace?.nationalPhoneNumber || RESTAURANT_INFO.phoneDisplay;

  return (
    <section
      id="ubicacion"
      className="scroll-mt-20 relative bg-[#EAE4DA] border-t border-[#DCD4C8] text-[#1C1917]"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#A64B2A] font-medium mb-3">
            Encuéntranos en Panamá
          </p>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal tracking-[0.04em] text-[#1C1917]">
            Ubicación y Horarios
          </h2>
        </div>
        <p className="text-sm text-[#5C554E] max-w-md leading-relaxed">
          Situados en el corazón de Obarrio, a pasos del Área Bancaria de Ciudad de Panamá, con
          fácil acceso y estacionamiento para nuestros invitados.
        </p>
      </div>

      {/* Editorial Map + Reference-2 Obsidian Location Card (100% Unobstructed Google Maps Attribution) */}
      <div className="max-w-7xl mx-auto px-0 lg:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-y lg:border border-[#C9BFAF] bg-[#0E0D0C]">
          {/* Interactive Google Map Canvas (8 columns on desktop) */}
          <div className="lg:col-span-8 relative w-full h-[420px] sm:h-[480px] lg:h-auto lg:min-h-[540px] bg-[#DDD6CA]">
            {GOOGLE_MAPS_API_KEY ? (
              <APIProvider
                apiKey={GOOGLE_MAPS_API_KEY}
                language="es"
                region="PA"
                libraries={['places', 'marker']}
              >
                <GoogleMap
                  mapId="DEMO_MAP_ID"
                  defaultCenter={PANAMA_CITY_VIEWPORT_CENTER}
                  defaultZoom={13}
                  gestureHandling="cooperative"
                  mapTypeControl={false}
                  streetViewControl={false}
                  fullscreenControl={true}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  className="w-full h-full"
                >
                  <LaFragataMapContent
                    onPlaceResolved={setResolvedPlace}
                    onStatusChange={setMapStatus}
                  />
                </GoogleMap>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#EAE4DA]">
                <MapPin className="w-8 h-8 text-[#A64B2A] mb-3" aria-hidden="true" />
                <p className="font-editorial text-2xl text-[#1C1917]">
                  Restaurante La Fragata · Obarrio, Panamá
                </p>
                <p className="mt-2 text-sm text-[#5C554E] max-w-md">{displayAddress}</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={RESTAURANT_INFO.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#A64B2A] hover:bg-[#8A3B1E] text-[#FBF9F5] text-xs tracking-[0.15em] uppercase font-semibold transition-colors whitespace-nowrap"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Abrir en Waze</span>
                  </a>
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#141311] hover:bg-[#2A2622] text-[#FBF9F5] text-xs tracking-[0.15em] uppercase font-semibold transition-colors whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Abrir en Google Maps</span>
                  </a>
                </div>
              </div>
            )}

            {GOOGLE_MAPS_API_KEY && mapStatus === 'loading' && (
              <div className="pointer-events-none absolute top-4 left-4 bg-[#141311]/90 text-[#FBF9F5] px-4 py-2 text-xs tracking-wide">
                Localizando Restaurante La Fragata en Obarrio…
              </div>
            )}
          </div>

          {/* Reference-2 Signature Dark Obsidian Location Card (4 columns on desktop, zero map overlap) */}
          <div className="lg:col-span-4 bg-[#0E0D0C] text-[#FBF9F5] px-8 py-10 sm:px-10 sm:py-12 flex flex-col justify-center">
            <div className="text-center">
              <h3 className="font-editorial text-3xl sm:text-[34px] font-normal tracking-[0.16em] uppercase text-[#FBF9F5]">
                Ubicación
              </h3>

              <p className="mt-5 text-xs sm:text-[13px] tracking-[0.1em] uppercase leading-relaxed text-[#EAE4DA]/85">
                {displayAddress}
              </p>

              <div className="mt-5 space-y-1.5 text-xs sm:text-[13px] tracking-[0.08em] text-[#EAE4DA]/90 tabular-nums">
                <p>
                  <a
                    href={`tel:${displayPhone.replace(/[^+\d]/g, '')}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#96846C] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#96846C]" aria-hidden="true" />
                    <span>{displayPhone}</span>
                  </a>
                </p>
                <p className="text-[#96846C]">WhatsApp: {RESTAURANT_INFO.whatsappDisplay}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                <a
                  href={RESTAURANT_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#A64B2A] hover:bg-[#8A3B1E] text-[#FBF9F5] text-xs tracking-[0.15em] uppercase font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBF9F5]"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Abrir en Waze</span>
                </a>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 border border-[#96846C] text-[#FBF9F5] hover:bg-[#96846C] hover:text-[#141311] text-xs tracking-[0.15em] uppercase font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBF9F5]"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>

              <div className="my-8 h-px bg-[#2A2622]" aria-hidden="true" />

              <h4 className="font-editorial text-2xl sm:text-[26px] font-normal tracking-[0.16em] uppercase text-[#FBF9F5]">
                Horario
              </h4>

              <ul className="mt-4 space-y-1.5 text-xs tracking-[0.08em] text-[#EAE4DA]/80 tabular-nums">
                {RESTAURANT_INFO.hoursDetail.map((row) => (
                  <li key={row.days}>
                    <span className="text-[#FBF9F5]">{row.days}:</span> {row.time}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 bg-[#96846C] hover:bg-[#A64B2A] text-[#FBF9F5] text-xs tracking-[0.16em] uppercase font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Reservar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
