import {useState, type FormEvent} from 'react';
import {CheckCircle2, MessageCircle, Phone} from 'lucide-react';
import {RESTAURANT_INFO} from '../config/restaurantData';
import {
  AVAILABLE_TIME_SLOTS,
  SEATING_LABELS,
  WHATSAPP_BASE_URL,
  buildReservationMessage,
  buildWhatsAppReservationUrl,
  formatSpanishDate,
  formatTime12h,
  validateReservation,
  type ReservationInput,
  type ReservationValidationResult,
  type SeatingArea,
} from '../utils/reservation';

interface ReservationSectionProps {
  date: string;
  time: string;
  guests: number;
  onDateChange: (val: string) => void;
  onTimeChange: (val: string) => void;
  onGuestsChange: (val: number) => void;
}

export function ReservationSection({
  date,
  time,
  guests,
  onDateChange,
  onTimeChange,
  onGuestsChange,
}: ReservationSectionProps) {
  const [guestName, setGuestName] = useState('');
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('salon');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<ReservationValidationResult['errors']>({});
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationInput | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: ReservationInput = {
      guestName,
      date,
      time,
      guests,
      seatingArea,
      notes,
    };
    const result = validateReservation(payload);
    if (!result.valid) {
      setErrors(result.errors);
      setConfirmedReservation(null);
      return;
    }

    setErrors({});
    setConfirmedReservation(payload);
  };

  const whatsappPreparedUrl = confirmedReservation
    ? buildWhatsAppReservationUrl(confirmedReservation)
    : buildWhatsAppReservationUrl({
        guestName: guestName.trim() || undefined,
        date,
        time,
        guests,
        seatingArea,
        notes,
      });

  return (
    <section
      id="reservas"
      className="scroll-mt-20 bg-[#FBF9F5] border-t border-[#DCD4C8] text-[#1C1917] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Reservation Guide & Direct WhatsApp Channel */}
          <div className="lg:col-span-5">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A64B2A] font-medium mb-3">
              Reservas Integradas
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-normal tracking-[0.04em] text-[#1C1917] leading-[1.1]">
              Reserva Tu Mesa en La Fragata
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#433E38]">
              Asegura tu mesa para almuerzos ejecutivos, cenas románticas o celebraciones en
              familia. Completa los detalles de tu visita y envía tu solicitud directamente a
              nuestro equipo por WhatsApp para confirmación inmediata.
            </p>

            {/* Quick Direct WhatsApp Action Block */}
            <div className="mt-8 p-6 bg-[#141311] text-[#FBF9F5]">
              <p className="text-xs tracking-[0.18em] uppercase text-[#96846C] font-medium">
                Atención Directa
              </p>
              <p className="mt-2 font-editorial text-2xl font-normal">
                ¿Prefieres escribirnos al instante?
              </p>
              <p className="mt-2 text-sm text-[#EAE4DA]/80 leading-relaxed">
                Nuestro equipo de anfitriones responde directamente en nuestro WhatsApp oficial
                para reservas del día y eventos privados.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-[#96846C] hover:bg-[#A64B2A] text-[#FBF9F5] text-xs tracking-[0.15em] uppercase font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Reservar por WhatsApp</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneDisplay.replace(/[^+\d]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#EAE4DA]/35 text-[#FBF9F5] hover:border-[#FBF9F5] text-xs tracking-[0.14em] uppercase font-medium transition-colors whitespace-nowrap tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DCD4C8] text-xs text-[#5C554E] space-y-1.5">
              <p>
                <strong className="text-[#1C1917] font-medium">Grupos grandes:</strong> Para mesas
                de más de 10 personas, indícalo en las notas para preparar nuestro salón especial.
              </p>
              <p>
                <strong className="text-[#1C1917] font-medium">WhatsApp oficial:</strong>{' '}
                <span className="tabular-nums">{RESTAURANT_INFO.whatsappDisplay}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Integrated Reservation Form + Live Confirmation Card */}
          <div className="lg:col-span-7 bg-[#F4EFE7] border border-[#DCD4C8] p-6 sm:p-10">
            <form onSubmit={handleSubmit} noValidate aria-label="Formulario de reserva de mesa">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="res-guest-name"
                    className="block text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917] mb-2"
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="res-guest-name"
                    type="text"
                    placeholder="Ej. María Alejandra Castillo"
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      if (errors.guestName) setErrors((prev) => ({...prev, guestName: undefined}));
                    }}
                    aria-invalid={Boolean(errors.guestName)}
                    aria-describedby={errors.guestName ? 'res-guest-name-error' : undefined}
                    className="w-full bg-[#FBF9F5] border border-[#C9BFAF] px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#8E867E] focus:outline-none focus:border-[#141311]"
                  />
                  {errors.guestName && (
                    <p id="res-guest-name-error" role="alert" className="mt-1.5 text-xs text-[#A64B2A] font-medium">
                      {errors.guestName}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="res-date"
                    className="block text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917] mb-2"
                  >
                    Fecha *
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    value={date}
                    onChange={(e) => {
                      onDateChange(e.target.value);
                      if (errors.date) setErrors((prev) => ({...prev, date: undefined}));
                    }}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'res-date-error' : undefined}
                    className="w-full bg-[#FBF9F5] border border-[#C9BFAF] px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#141311] tabular-nums"
                  />
                  {errors.date && (
                    <p id="res-date-error" role="alert" className="mt-1.5 text-xs text-[#A64B2A] font-medium">
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="res-time"
                    className="block text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917] mb-2"
                  >
                    Hora *
                  </label>
                  <select
                    id="res-time"
                    value={time}
                    onChange={(e) => {
                      onTimeChange(e.target.value);
                      if (errors.time) setErrors((prev) => ({...prev, time: undefined}));
                    }}
                    className="w-full bg-[#FBF9F5] border border-[#C9BFAF] px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#141311] cursor-pointer tabular-nums"
                  >
                    {AVAILABLE_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {formatTime12h(slot)}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p role="alert" className="mt-1.5 text-xs text-[#A64B2A] font-medium">
                      {errors.time}
                    </p>
                  )}
                </div>

                {/* Guests */}
                <div>
                  <label
                    htmlFor="res-guests"
                    className="block text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917] mb-2"
                  >
                    Comensales *
                  </label>
                  <select
                    id="res-guests"
                    value={guests}
                    onChange={(e) => onGuestsChange(Number(e.target.value))}
                    className="w-full bg-[#FBF9F5] border border-[#C9BFAF] px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#141311] cursor-pointer tabular-nums"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                      <option key={num} value={num}>
                        {num === 1 ? '1 persona' : `${num} personas`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seating Area */}
                <div>
                  <label
                    htmlFor="res-seating"
                    className="block text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917] mb-2"
                  >
                    Ambiente preferido
                  </label>
                  <select
                    id="res-seating"
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value as SeatingArea)}
                    className="w-full bg-[#FBF9F5] border border-[#C9BFAF] px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#141311] cursor-pointer"
                  >
                    {(Object.keys(SEATING_LABELS) as SeatingArea[]).map((areaKey) => (
                      <option key={areaKey} value={areaKey}>
                        {SEATING_LABELS[areaKey]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="res-notes"
                    className="block text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917] mb-2"
                  >
                    Ocasión especial o preferencias (opcional)
                  </label>
                  <textarea
                    id="res-notes"
                    rows={3}
                    placeholder="Ej. Aniversario, mesa tranquila, alergias alimentarias o solicitud de paella anticipada..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FBF9F5] border border-[#C9BFAF] px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#8E867E] focus:outline-none focus:border-[#141311] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#141311] hover:bg-[#A64B2A] text-[#FBF9F5] text-xs tracking-[0.18em] uppercase font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141311]"
                >
                  Preparar Solicitud de Reserva
                </button>
                <span className="text-xs text-[#5C554E]">
                  Sin cargos anticipados · Confirmación directa vía WhatsApp
                </span>
              </div>
            </form>

            {/* Prepared Reservation Summary & Direct WhatsApp Launch State */}
            {confirmedReservation && (
              <div
                data-testid="reservation-summary"
                className="mt-8 p-6 bg-[#FBF9F5] border border-[#96846C]"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-[#A64B2A] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <h3 className="font-editorial text-2xl text-[#1C1917]">
                      Solicitud lista para confirmar en WhatsApp
                    </h3>
                    <p className="mt-1 text-sm text-[#5C554E]">
                      Resumen para{' '}
                      <strong className="text-[#1C1917] font-medium">
                        {confirmedReservation.guestName}
                      </strong>
                      : {formatSpanishDate(confirmedReservation.date)} a las{' '}
                      {formatTime12h(confirmedReservation.time)} ·{' '}
                      {confirmedReservation.guests === 1
                        ? '1 persona'
                        : `${confirmedReservation.guests} personas`}{' '}
                      · {SEATING_LABELS[confirmedReservation.seatingArea]}.
                    </p>

                    <pre className="mt-4 p-4 bg-[#F4EFE7] border border-[#DCD4C8] text-xs text-[#433E38] whitespace-pre-wrap font-sans leading-relaxed">
                      {buildReservationMessage(confirmedReservation)}
                    </pre>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <a
                        href={whatsappPreparedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#A64B2A] hover:bg-[#8A3B1E] text-[#FBF9F5] text-xs tracking-[0.16em] uppercase font-semibold transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Enviar Reserva por WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setConfirmedReservation(null)}
                        className="text-xs tracking-[0.12em] uppercase text-[#5C554E] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer"
                      >
                        Editar datos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
