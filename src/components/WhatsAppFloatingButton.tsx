import {WHATSAPP_FLOATING_URL} from '../config/restaurantData';

export function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_FLOATING_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar disponibilidad y reservar por WhatsApp en La Fragata Panamá"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 sm:px-5 sm:py-3.5 shadow-lg shadow-black/25 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141311]"
    >
      {/* Subtle pulse ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping [animation-duration:2.8s]"
      />

      {/* Official WhatsApp glyph */}
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="relative w-6 h-6 shrink-0"
        aria-hidden="true"
      >
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.256.592 4.46 1.716 6.4L3.2 28.8l6.588-1.724A12.748 12.748 0 0 0 16.004 28.8c7.06 0 12.8-5.74 12.8-12.8S23.064 3.2 16.004 3.2zm0 23.436c-1.976 0-3.908-.532-5.596-1.536l-.4-.24-3.908 1.024 1.044-3.812-.26-.416a10.614 10.614 0 0 1-1.636-5.656c0-5.872 4.78-10.652 10.756-10.652 2.872 0 5.572 1.12 7.6 3.152a10.68 10.68 0 0 1 3.152 7.5c0 5.872-4.88 10.636-10.752 10.636zm5.896-7.968c-.324-.164-1.916-.944-2.212-1.052-.296-.108-.512-.164-.728.164-.216.324-.836 1.052-1.024 1.268-.188.216-.376.244-.7.08-.324-.164-1.368-.504-2.604-1.608-.964-.86-1.616-1.92-1.804-2.244-.188-.324-.02-.5.14-.66.148-.148.324-.376.484-.564.164-.188.216-.324.324-.54.108-.216.056-.404-.028-.564-.08-.164-.728-1.752-.996-2.4-.264-.632-.532-.544-.728-.556l-.62-.012c-.216 0-.564.08-.86.404-.296.324-1.132 1.104-1.132 2.692s1.16 3.124 1.32 3.34c.164.216 2.28 3.484 5.524 4.884.772.332 1.376.532 1.844.68.776.248 1.48.212 2.036.128.62-.092 1.916-.784 2.184-1.54.268-.756.268-1.404.188-1.54-.08-.136-.296-.216-.62-.38z" />
      </svg>

      <span className="relative hidden sm:inline text-xs tracking-[0.14em] uppercase font-semibold whitespace-nowrap">
        Reservar
      </span>
    </a>
  );
}
