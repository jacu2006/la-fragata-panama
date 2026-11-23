import {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';

const NAV_LINKS = [
  {href: '#historia', label: 'Historia'},
  {href: '#menu', label: 'Menú'},
  {href: '#galeria', label: 'Galería'},
  {href: '#resenas', label: 'Reseñas'},
  {href: '#ubicacion', label: 'Ubicación'},
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#F7F3EC]/95 backdrop-blur-md border-b border-[#DCD4C8] text-[#1C1917]'
          : 'bg-gradient-to-b from-[#141311]/70 to-transparent text-[#FBF9F5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element editorial brand wordmark */}
        <a
          href="#inicio"
          className="font-editorial text-2xl md:text-[26px] font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#96846C]"
        >
          La Fragata
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.1em] uppercase font-medium"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap shrink-0 py-1 border-b border-transparent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#96846C] ${
                scrolled
                  ? 'text-[#1C1917]/80 hover:text-[#A64B2A] hover:border-[#A64B2A]'
                  : 'text-[#FBF9F5]/90 hover:text-white hover:border-[#FBF9F5]/70'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#reservas"
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.14em] uppercase font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96846C] ${
              scrolled
                ? 'bg-[#141311] text-[#FBF9F5] hover:bg-[#A64B2A]'
                : 'bg-[#FBF9F5] text-[#141311] hover:bg-[#EAE4DA]'
            }`}
          >
            Reservar Mesa
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 transition-colors focus-visible:outline-2 focus-visible:outline-[#96846C]"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navegación móvil"
          className="md:hidden bg-[#F7F3EC] border-t border-[#DCD4C8] px-6 py-6 flex flex-col gap-1 text-[#1C1917]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm tracking-[0.12em] uppercase font-medium border-b border-[#DCD4C8]/60 hover:text-[#A64B2A] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservas"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center justify-center w-full py-3.5 bg-[#141311] text-[#FBF9F5] text-xs tracking-[0.14em] uppercase font-medium hover:bg-[#A64B2A] transition-colors"
          >
            Reservar Mesa
          </a>
        </nav>
      )}
    </header>
  );
}
