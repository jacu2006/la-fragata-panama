# La Fragata Panamá — Sitio Web Corporativo

Sitio web responsivo y optimizado para producción del restaurante de cocina española y mediterránea **La Fragata Panamá**, ubicado en Obarrio, Ciudad de Panamá. Diseñado con estética editorial náutica, catálogo interactivo del menú, galería fotográfica con vista ampliada, reseñas destacadas, mapa interactivo de ubicación con accesos directos a Waze y Google Maps, y reservas integradas vía WhatsApp.

---

## Stack Tecnológico

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Iconografía:** Lucide React
- **Mapas:** `@vis.gl/react-google-maps` (Google Maps Platform + Places API)
- **SEO & Metadatos:** Open Graph (`es_PA`), Twitter Cards y Datos Estructurados JSON-LD (`Schema.org/Restaurant`)
- **Optimización de medios:** Imágenes comprimidas en formato `.webp` (< 200 KB) con `loading="lazy"` y `fetchPriority="high"` en portada
- **Despliegue Continuo:** Netlify (`netlify.toml` con redirecciones SPA y cabeceras de caché/seguridad)

---

## Estructura de Directorios

```text
La-Fragata-Panamá/
├── index.html                          # SEO local, Open Graph, Twitter Cards y JSON-LD Schema.org
├── netlify.toml                        # Configuración de build, SPA redirects y headers para Netlify
├── package.json                        # Dependencias y scripts de compilación
├── tsconfig.json                       # Configuración de TypeScript
├── vite.config.ts                      # Configuración de Vite + copia de assets en build
├── .env.example                        # Plantilla de variables de entorno
├── .gitignore                          # Exclusiones para Git
├── public/
│   └── favicon.ico                     # Ícono del sitio
└── src/
    ├── main.tsx                        # Punto de entrada React
    ├── App.tsx                         # Composición principal de secciones y botón flotante de WhatsApp
    ├── index.css                       # Estilos globales, fuentes editoriales y utilidades
    ├── assets/
    │   └── images/                     # Fotografías optimizadas en formato .webp (< 200 KB)
    ├── config/
    │   └── restaurantData.ts           # Archivo centralizado de datos, horarios, enlaces, menú y reseñas
    ├── components/
    │   ├── Navbar.tsx                  # Barra de navegación fija y menú móvil
    │   ├── HeroSection.tsx             # Portada principal, enlace a Instagram y barra de reserva rápida
    │   ├── StorySection.tsx            # Historia, esencia náutica y horarios
    │   ├── MenuSection.tsx             # Menú interactivo (tabs fijos en móvil, split-panel en escritorio)
    │   ├── GallerySection.tsx          # Galería fotográfica con lightbox accesible
    │   ├── ReviewsSection.tsx          # Reseñas filtrables de Degusta Panamá y TripAdvisor
    │   ├── ReservationSection.tsx      # Formulario integrado de reservas con envío a WhatsApp
    │   ├── LocationMapSection.tsx      # Mapa de Google Maps + botones directos a Waze y Google Maps
    │   ├── WhatsAppFloatingButton.tsx  # Botón flotante de WhatsApp con mensaje prellenado
    │   ├── SafeImage.tsx               # Componente de imagen con lazy loading, fetchPriority y fallback
    │   └── Footer.tsx                  # Pie de página editorial y enlaces sociales
    └── utils/
        ├── reservation.ts              # Validación, formateo en español y generador de enlaces WhatsApp
        └── reservation.test.ts         # Pruebas unitarias de lógica de reservas y reseñas
```

---

## Instalación y Desarrollo Local

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno (opcional para mapa interactivo):**
   Copia `.env.example` a `.env` y agrega tu clave de Google Maps si deseas activar el mapa embebido:
   ```env
   VITE_GOOGLE_MAPS_API_KEY="TU_API_KEY_DE_GOOGLE_MAPS"
   ```
   *(Si no se configura la clave, la sección de ubicación muestra automáticamente una tarjeta elegante con botones directos a Waze y Google Maps).*

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Verificar tipos, pruebas y compilar para producción:**
   ```bash
   npm run lint
   npx tsx --test src/utils/reservation.test.ts
   npm run build
   ```

---

## Despliegue en Netlify

El repositorio incluye un archivo [`netlify.toml`](./netlify.toml) listo para despliegue automático:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA Redirect:** `/* -> /index.html (200)`

### Pasos para desplegar:
1. Sube este repositorio a GitHub.
2. En [Netlify](https://app.netlify.com/), selecciona **Add new site → Import an existing project** y conecta tu repositorio de GitHub.
3. *(Opcional)* En **Site configuration → Environment variables**, agrega `VITE_GOOGLE_MAPS_API_KEY`.
4. Haz clic en **Deploy site**. Netlify compilará el proyecto y habilitará HTTPS/SSL automáticamente.

---

## Checklist de Entrega al Cliente

Antes del lanzamiento definitivo con el cliente, revisar y actualizar los puntos marcados con `// TODO: Reemplazar con dato/foto real del cliente` en [`src/config/restaurantData.ts`](./src/config/restaurantData.ts):

- [ ] **Fotografía de portada (`hero_la_fragata_table_*.webp`):** Sustituir por fotografía real de alta resolución del restaurante (convertida a `.webp`, < 200 KB).
- [ ] **Fotografía del salón náutico (`about_interior_ship_*.webp`):** Sustituir por fotografía real del interior del local en Obarrio.
- [ ] **Fotografías de platillos y bebidas (`dish_*.webp`, `cocktail_*.webp`):** Reemplazar imágenes de referencia por fotos reales de la paella, mero, pulpo y sangría de La Fragata.
- [ ] **Carta y precios (`MENU_CATEGORIES`):** Validar todos los platillos, descripciones y precios vigentes en USD (actualmente con nota de referencia sin ITBMS 7%).
- [ ] **Horarios y teléfonos (`RESTAURANT_INFO`):** Confirmar horarios de apertura/cierre entre semana, fines de semana, feriados y línea fija/WhatsApp oficial.
- [ ] **Google Maps API Key:** Configurar en las variables de entorno de Netlify una API key de producción restringida al dominio final del restaurante.
- [ ] **Dominio personalizado y URL canónica:** Actualizar `og:image` y JSON-LD en `index.html` con URLs absolutas (`https://tudominio.com/...`) una vez asignado el dominio final para maximizar la compatibilidad de previsualización en WhatsApp e Instagram.
