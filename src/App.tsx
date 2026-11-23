import {useEffect, useState} from 'react';
import {Navbar} from './components/Navbar';
import {HeroSection} from './components/HeroSection';
import {StorySection} from './components/StorySection';
import {MenuSection} from './components/MenuSection';
import {GallerySection} from './components/GallerySection';
import {ReviewsSection} from './components/ReviewsSection';
import {ReservationSection} from './components/ReservationSection';
import {LocationMapSection} from './components/LocationMapSection';
import {Footer} from './components/Footer';
import {WhatsAppFloatingButton} from './components/WhatsAppFloatingButton';
import {getDefaultReservationDate} from './utils/reservation';

export default function App() {
  const [date, setDate] = useState<string>(() => getDefaultReservationDate());
  const [time, setTime] = useState<string>('20:00');
  const [guests, setGuests] = useState<number>(2);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const handleQuickReserve = () => {
    const target = document.getElementById('reservas');
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      const nameInput = document.getElementById('res-guest-name');
      if (nameInput instanceof HTMLInputElement) {
        window.setTimeout(() => nameInput.focus({preventScroll: true}), 350);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#1C1917]">
      {quotaExceeded && (
        <div
          role="status"
          className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm"
        >
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar />

      <main className="flex-1">
        <HeroSection
          date={date}
          time={time}
          guests={guests}
          onDateChange={setDate}
          onTimeChange={setTime}
          onGuestsChange={setGuests}
          onQuickReserve={handleQuickReserve}
        />
        <StorySection />
        <MenuSection />
        <GallerySection />
        <ReviewsSection />
        <ReservationSection
          date={date}
          time={time}
          guests={guests}
          onDateChange={setDate}
          onTimeChange={setTime}
          onGuestsChange={setGuests}
        />
        <LocationMapSection />
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
