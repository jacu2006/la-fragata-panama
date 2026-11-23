import {RESTAURANT_INFO} from '../config/restaurantData';

export const WHATSAPP_PHONE = RESTAURANT_INFO.whatsappNumber;

export const WHATSAPP_BASE_URL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text&type=phone_number&app_absent=0`;

export type SeatingArea = 'salon' | 'barra' | 'privado';

export interface ReservationInput {
  guestName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  seatingArea: SeatingArea;
  notes?: string;
}

export interface ReservationValidationResult {
  valid: boolean;
  errors: Partial<Record<'guestName' | 'date' | 'time' | 'guests', string>>;
}

export const SEATING_LABELS: Record<SeatingArea, string> = {
  salon: 'Salón Principal (Estilo Fragata)',
  barra: 'Barra & Coctelería',
  privado: 'Mesa Especial / Celebración',
};

export const AVAILABLE_TIME_SLOTS = [
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
] as const;

const SPANISH_MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const SPANISH_WEEKDAYS = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];

export function getDefaultReservationDate(referenceDate: Date = new Date()): string {
  const year = referenceDate.getFullYear();
  const month = String(referenceDate.getMonth() + 1).padStart(2, '0');
  const day = String(referenceDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatSpanishDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return isoDate;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) return isoDate;
  const dateObj = new Date(year, monthIndex, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== monthIndex ||
    dateObj.getDate() !== day
  ) {
    return isoDate;
  }
  const weekday = SPANISH_WEEKDAYS[dateObj.getDay()];
  const monthName = SPANISH_MONTHS[monthIndex];
  return `${weekday}, ${day} de ${monthName} de ${year}`;
}

export function formatTime12h(time24: string): string {
  const match = /^(\d{2}):(\d{2})$/.exec(time24.trim());
  if (!match) return time24;
  const hours = Number(match[1]);
  const minutes = match[2];
  const suffix = hours >= 12 ? 'p. m.' : 'a. m.';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutes} ${suffix}`;
}

export function validateReservation(input: ReservationInput): ReservationValidationResult {
  const errors: ReservationValidationResult['errors'] = {};

  if (!input.guestName || input.guestName.trim().length < 2) {
    errors.guestName = 'Por favor ingresa tu nombre completo.';
  }

  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date.trim())) {
    errors.date = 'Selecciona una fecha válida para tu visita.';
  }

  if (!input.time || !/^\d{2}:\d{2}$/.test(input.time.trim())) {
    errors.time = 'Selecciona una hora disponible.';
  }

  if (!Number.isInteger(input.guests) || input.guests < 1 || input.guests > 20) {
    errors.guests = 'El número de personas debe estar entre 1 y 20.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildReservationMessage(input: ReservationInput): string {
  const formattedDate = formatSpanishDate(input.date);
  const formattedTime = formatTime12h(input.time);
  const guestLabel = input.guests === 1 ? '1 persona' : `${input.guests} personas`;
  const lines = [
    'Hola, equipo de La Fragata Panamá. Me gustaría solicitar una reserva:',
    `• Nombre: ${input.guestName.trim()}`,
    `• Fecha: ${formattedDate}`,
    `• Hora: ${formattedTime}`,
    `• Comensales: ${guestLabel}`,
    `• Ambiente: ${SEATING_LABELS[input.seatingArea]}`,
  ];

  if (input.notes && input.notes.trim().length > 0) {
    lines.push(`• Notas especiales: ${input.notes.trim()}`);
  }

  lines.push('¡Muchas gracias!');
  return lines.join('\n');
}

export function buildWhatsAppReservationUrl(input?: Partial<ReservationInput>): string {
  if (!input || !input.date || !input.time || !input.guests) {
    return WHATSAPP_BASE_URL;
  }

  const normalized: ReservationInput = {
    guestName: input.guestName?.trim() || 'Cliente web',
    date: input.date,
    time: input.time,
    guests: input.guests,
    seatingArea: input.seatingArea ?? 'salon',
    notes: input.notes,
  };

  const text = buildReservationMessage(normalized);
  const params = new URLSearchParams({
    phone: WHATSAPP_PHONE,
    text,
    type: 'phone_number',
    app_absent: '0',
  });

  return `https://api.whatsapp.com/send/?${params.toString()}`;
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'degusta' | 'tripadvisor';
  sourceLabel: string;
  rating: number;
  dateLabel: string;
  highlightDish: string;
  quote: string;
}

export type ReviewFilter = 'all' | 'degusta' | 'tripadvisor';

export function filterReviews(reviews: ReviewItem[], filter: ReviewFilter): ReviewItem[] {
  if (filter === 'all') return reviews;
  return reviews.filter((review) => review.source === filter);
}

export function calculateAverageRating(reviews: ReviewItem[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((acc, item) => acc + item.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}
