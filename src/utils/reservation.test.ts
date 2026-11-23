import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WHATSAPP_BASE_URL,
  WHATSAPP_PHONE,
  buildReservationMessage,
  buildWhatsAppReservationUrl,
  calculateAverageRating,
  filterReviews,
  formatSpanishDate,
  formatTime12h,
  validateReservation,
  type ReviewItem,
} from './reservation';

test('formatSpanishDate formats valid ISO dates into natural Spanish', () => {
  assert.equal(formatSpanishDate('2026-11-21'), 'sábado, 21 de noviembre de 2026');
  assert.equal(formatSpanishDate('2026-01-05'), 'lunes, 5 de enero de 2026');
  assert.equal(formatSpanishDate('invalid-date'), 'invalid-date');
});

test('formatTime12h converts 24h slots to readable Spanish 12h format', () => {
  assert.equal(formatTime12h('12:00'), '12:00 p. m.');
  assert.equal(formatTime12h('20:30'), '8:30 p. m.');
  assert.equal(formatTime12h('09:15'), '9:15 a. m.');
});

test('validateReservation rejects missing or out-of-range fields', () => {
  const invalid = validateReservation({
    guestName: 'A',
    date: '',
    time: '',
    guests: 0,
    seatingArea: 'salon',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.guestName);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.time);
  assert.ok(invalid.errors.guests);

  const valid = validateReservation({
    guestName: 'Mariana Mendoza',
    date: '2026-11-28',
    time: '20:00',
    guests: 4,
    seatingArea: 'salon',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppReservationUrl targets the official La Fragata WhatsApp number', () => {
  assert.equal(buildWhatsAppReservationUrl(), WHATSAPP_BASE_URL);

  const url = buildWhatsAppReservationUrl({
    guestName: 'Carlos Paredes',
    date: '2026-11-28',
    time: '20:00',
    guests: 4,
    seatingArea: 'privado',
    notes: 'Aniversario de bodas',
  });

  const parsed = new URL(url);
  assert.equal(parsed.origin + parsed.pathname, 'https://api.whatsapp.com/send/');
  assert.equal(parsed.searchParams.get('phone'), WHATSAPP_PHONE);
  assert.equal(parsed.searchParams.get('type'), 'phone_number');
  assert.equal(parsed.searchParams.get('app_absent'), '0');
  const text = parsed.searchParams.get('text') ?? '';
  assert.match(text, /Carlos Paredes/);
  assert.match(text, /4 personas/);
  assert.match(text, /Aniversario de bodas/);
});

test('buildReservationMessage handles singular vs plural guest wording', () => {
  const soloMsg = buildReservationMessage({
    guestName: 'Elena Ruiz',
    date: '2026-11-21',
    time: '13:00',
    guests: 1,
    seatingArea: 'barra',
  });
  assert.match(soloMsg, /1 persona\n/);
});

test('filterReviews and calculateAverageRating filter accurately by platform', () => {
  const sample: ReviewItem[] = [
    {
      id: '1',
      author: 'Ana',
      source: 'degusta',
      sourceLabel: 'Degusta Panamá',
      rating: 5,
      dateLabel: 'Octubre 2026',
      highlightDish: 'Paella La Fragata',
      quote: 'Excelente.',
    },
    {
      id: '2',
      author: 'Luis',
      source: 'tripadvisor',
      sourceLabel: 'TripAdvisor',
      rating: 4.5,
      dateLabel: 'Septiembre 2026',
      highlightDish: 'Mero con Ajos Rostizados',
      quote: 'Muy bueno.',
    },
  ];

  assert.equal(filterReviews(sample, 'all').length, 2);
  assert.equal(filterReviews(sample, 'degusta').length, 1);
  assert.equal(filterReviews(sample, 'tripadvisor').length, 1);
  assert.equal(calculateAverageRating(sample), 4.8);
  assert.equal(calculateAverageRating([]), 0);
});
