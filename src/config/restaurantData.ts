import type {ReviewItem} from '../utils/reservation';

/**
 * Configuración centralizada de datos editables de Restaurante La Fragata Panamá.
 * Modifica este archivo para actualizar teléfonos, horarios, enlaces, fotografías,
 * categorías del menú, precios y reseñas sin tocar los componentes de interfaz.
 */

// TODO: Reemplazar con dato/foto real del cliente (sustituir imágenes de referencia por fotografías reales del local y platillos)
export const RESTAURANT_IMAGES = {
  heroTable: '/src/assets/images/hero_la_fragata_table_1795300908153.webp',
  interiorShip: '/src/assets/images/about_interior_ship_1795300910408.webp',
  paella: '/src/assets/images/dish_paella_fragata_1795300911368.webp',
  mero: '/src/assets/images/dish_mero_mediterraneo_1795300909251.webp',
  pulpoTapas: '/src/assets/images/dish_pulpo_tapas_1795300910121.webp',
  sangriaBar: '/src/assets/images/cocktail_sangria_bar_1795300910930.webp',
} as const;

export interface RestaurantHoursRow {
  days: string;
  time: string;
}

export const RESTAURANT_INFO = {
  name: 'La Fragata',
  fullName: 'La Fragata Panamá',
  tagline: 'Cocina Española y Mediterránea en el Corazón de Panamá',
  // Redes sociales y directorios
  instagramHandle: '@lafragatapanama',
  instagramUrl: 'https://www.instagram.com/lafragatapanama/',
  tripAdvisorUrl:
    'https://www.tripadvisor.com/Restaurant_Review-g294480-d5502263-Reviews-La_Fragata-Panama_City_Panama_Province.html',
  degustaUrl: 'https://www.degustapanama.com/panama/restaurante/la-fragata_100116.html',
  // Contacto y WhatsApp en formato internacional (507XXXXXXXX)
  // TODO: Reemplazar con dato/foto real del cliente si cambia la línea fija o de reservas
  phoneDisplay: '+507 269-2827',
  whatsappNumber: '50766609945',
  whatsappDisplay: '+507 6660-9945',
  whatsappDefaultMessage:
    'Hola, me gustaría consultar disponibilidad para realizar una reserva en La Fragata Panamá.',
  // Ubicación y navegación directa
  fallbackAddress: 'Av. Samuel Lewis, entre Calle 59 y 60, Obarrio, Ciudad de Panamá, Panamá',
  wazeUrl: 'https://waze.com/ul?q=La%20Fragata%20Obarrio%20Panama&navigate=yes',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Fragata+Obarrio+Panama',
  // TODO: Reemplazar con dato/foto real del cliente (confirmar horarios vigentes y días feriados)
  hoursSummary: 'Lunes a Domingo · 12:00 m. – 11:30 p. m.',
  hoursDetail: [
    {days: 'Lunes a Jueves', time: '12:00 m. – 11:00 p. m.'},
    {days: 'Viernes y Sábado', time: '12:00 m. – 12:00 a. m.'},
    {days: 'Domingo', time: '12:00 m. – 10:00 p. m.'},
  ] as readonly RestaurantHoursRow[],
} as const;

export const WHATSAPP_FLOATING_URL = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
  RESTAURANT_INFO.whatsappDefaultMessage
)}`;

export interface MenuDish {
  id: string;
  name: string;
  description: string;
  price: string;
  signature?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  subtitle: string;
  featuredImage: string;
  featuredAlt: string;
  featuredCaption: string;
  dishes: MenuDish[];
}

// TODO: Reemplazar con dato/foto real del cliente (validar carta completa, descripciones y precios vigentes en USD)
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'entradas',
    label: 'Entradas y Tapas',
    subtitle: 'Sabores ibéricos y frescura costera para compartir al centro de la mesa.',
    featuredImage: RESTAURANT_IMAGES.pulpoTapas,
    featuredAlt: 'Pulpo a la brasa con pimentón de la Vera y croquetas artesanales de La Fragata Panamá',
    featuredCaption: 'Pulpo a la brasa y surtido de croquetas de la casa',
    dishes: [
      {
        id: 'ent-1',
        name: 'Surtido de Croquetas Artesanales',
        description:
          'Crujientes por fuera y cremosas por dentro: jamón serrano ibérico, bacalao y queso manchego.',
        price: '$14.50',
        signature: true,
      },
      {
        id: 'ent-2',
        name: 'Pulpo a la Brasa con Pimentón de la Vera',
        description:
          'Tentáculo tierno sellado a la parrilla sobre cremoso de papa, aceite de oliva virgen extra y sal en escamas.',
        price: '$22.00',
        signature: true,
      },
      {
        id: 'ent-3',
        name: 'Almejas Importadas al Ajillo',
        description:
          'Salteadas al momento en aceite de oliva español, láminas de ajo dorado, guindilla suave y vino blanco seco.',
        price: '$21.50',
      },
      {
        id: 'ent-4',
        name: 'Pimientos del Piquillo Rellenos',
        description:
          'Asados a la leña y rellenos de carne braseada con gratinado suave de queso manchego.',
        price: '$16.00',
      },
      {
        id: 'ent-5',
        name: 'Ensalada de Pulpo, Gulas y Palmitos',
        description:
          'Mezcla fresca de brotes tiernos, pulpo laminado, gulas del norte y palmitos a la vinagreta de pimentón.',
        price: '$18.50',
      },
      {
        id: 'ent-6',
        name: 'Tabla de Quesos Ibéricos y Membrillo',
        description:
          'Curados de oveja y cabra acompañados de dulce de membrillo artesanal, nueces y pan rústico tibio.',
        price: '$19.00',
      },
    ],
  },
  {
    id: 'mariscos',
    label: 'Pescados y Mariscos',
    subtitle: 'Pesca fresca seleccionada diariamente con técnicas clásicas del Mediterráneo.',
    featuredImage: RESTAURANT_IMAGES.mero,
    featuredAlt:
      'Filete de mero con ajos rostizados, espárragos y emulsión de hierbas en plato negro en La Fragata Panamá',
    featuredCaption: 'Mero con ajos rostizados y espárragos tiernos',
    dishes: [
      {
        id: 'mar-1',
        name: 'Mero con Ajos Rostizados',
        description:
          'Nuestro clásico más aclamado: filete de mero sellado con ajos confitados, emulsión de hierbas y espárragos.',
        price: '$32.00',
        signature: true,
      },
      {
        id: 'mar-2',
        name: 'Mero Encebollado a la Española',
        description:
          'Lomo de mero fresco bañado en reducción lenta de cebollas caramelizadas al jerez y vegetales salteados.',
        price: '$31.00',
        signature: true,
      },
      {
        id: 'mar-3',
        name: 'Mero en Salsa de Champaña',
        description:
          'Suave filete en delicada reducción de champaña brut, chalotas y mantequilla avellanada.',
        price: '$34.00',
      },
      {
        id: 'mar-4',
        name: 'Robalo a la Marinera',
        description:
          'Filete de robalo fresco en salsa marinera tradicional acompañado de langostinos, almejas y mejillones.',
        price: '$35.50',
      },
      {
        id: 'mar-5',
        name: 'Atún en Salsa de Mostaza y Pimienta Verde',
        description:
          'Medallón de atún aleta amarilla sellado al punto en salsa cremosa de mostaza Dijon y granos de pimienta verde.',
        price: '$29.50',
      },
      {
        id: 'mar-6',
        name: 'Langostinos a la Plancha al Limón y Azafrán',
        description:
          'Langostinos jumbo marcados en plancha caliente con mantequilla cítrica y toque de azafrán español.',
        price: '$36.00',
      },
    ],
  },
  {
    id: 'arroces',
    label: 'Arroces y Paellas',
    subtitle: 'Preparados al momento con arroz bomba, caldo de roca y azafrán de La Mancha.',
    featuredImage: RESTAURANT_IMAGES.paella,
    featuredAlt:
      'Paella La Fragata tradicional servida en paellera de acero con langostinos, mejillones y azafrán',
    featuredCaption: 'Paella La Fragata tradicional en paellera',
    dishes: [
      {
        id: 'arr-1',
        name: 'Paella La Fragata (Para 2 Personas)',
        description:
          'Nuestra receta insignia con langostinos, mejillones, almejas, calamares, pollo tierno y socarrat dorado.',
        price: '$48.00',
        signature: true,
      },
      {
        id: 'arr-2',
        name: 'Paella Perla Negra (Para 2 Personas)',
        description:
          'Arroz caldoso seco en tinta natural de calamar con mariscos frescos y alioli suave de ajo asado.',
        price: '$50.00',
        signature: true,
      },
      {
        id: 'arr-3',
        name: 'Fideuá de Mariscos',
        description:
          'Fideos finos tostados en fumet intenso de pescado y mariscos, coronados con langostinos y almejas.',
        price: '$34.00',
      },
      {
        id: 'arr-4',
        name: 'Asopado de Mariscos Elías',
        description:
          'Receta tradicional de la casa, cremoso y aromático, abundante en frutos del mar frescos.',
        price: '$32.50',
      },
      {
        id: 'arr-5',
        name: 'Risotto de Langostinos con Albahaca',
        description:
          'Arroz Arborio mantecado al vino blanco con langostinos salteados, parmesano curado y aceite de albahaca.',
        price: '$29.00',
      },
    ],
  },
  {
    id: 'pastas',
    label: 'Pastas y Carnes',
    subtitle: 'Equilibrio mediterráneo entre pastas al dente y cortes selectos a la brasa.',
    featuredImage: RESTAURANT_IMAGES.heroTable,
    featuredAlt: 'Mesa servida en La Fragata Panamá con especialidades mediterráneas y copas de vino',
    featuredCaption: 'Cocina de temporada y cortes a la mesa',
    dishes: [
      {
        id: 'pas-1',
        name: 'Espagueti Frutos del Mar',
        description:
          'Pasta artesanal salteada con mixto de mariscos frescos, aceite de oliva extra virgen, ajo y perejil.',
        price: '$28.50',
        signature: true,
      },
      {
        id: 'pas-2',
        name: 'Espagueti con Langostinos al Óleo',
        description:
          'Langostinos tiernos salteados con ajo confitado, peperoncino ligero y tomates cherry asados.',
        price: '$30.00',
      },
      {
        id: 'pas-3',
        name: 'Filete de Res a la Pimienta Verde',
        description:
          'Corte tierno a la parrilla bañado en reducción de pimienta verde y brandy, servido con papas rústicas.',
        price: '$34.00',
      },
      {
        id: 'pas-4',
        name: 'Chuletas de Cordero al Romero',
        description:
          'Selladas con hierbas provenzales, ajo asado y puré cremoso de papas trufado.',
        price: '$38.00',
      },
    ],
  },
  {
    id: 'bebidas',
    label: 'Vinos y Sangría',
    subtitle: 'Nuestra famosa sangría artesanal y una cava curada de bodegas españolas.',
    featuredImage: RESTAURANT_IMAGES.sangriaBar,
    featuredAlt:
      'Sangría artesanal de vino tinto con naranja sanguina, frutos rojos y romero en barra de mármol',
    featuredCaption: 'Sangría artesanal de la casa en nuestra barra',
    dishes: [
      {
        id: 'beb-1',
        name: 'Sangría Artesanal La Fragata (Copa / Jarra)',
        description:
          'Elaborada con vino tinto español joven, maceración de cítricos, frutos rojos, canela en rama y licor de naranja.',
        price: '$11 / $36',
        signature: true,
      },
      {
        id: 'beb-2',
        name: 'Sangría Blanca al Albariño (Jarra)',
        description:
          'Refrescante combinación de vino blanco gallego, melocotón, manzana verde, hierbabuena y cava.',
        price: '$38.00',
      },
      {
        id: 'beb-3',
        name: 'Albariño D.O. Rías Baixas (Botella)',
        description:
          'Aromas minerales, cítricos frescos y acidez vibrante; el maridaje ideal para nuestros pescados y arroces.',
        price: '$54.00',
      },
      {
        id: 'beb-4',
        name: 'Rioja Reserva D.O.Ca. (Botella)',
        description:
          'Crianza en barrica de roble con notas de frutos negros maduros, vainilla y final sedoso.',
        price: '$68.00',
      },
      {
        id: 'beb-5',
        name: 'Margarita Clásica a las Rocas',
        description:
          'Tequila reposado 100% agave, licor de naranja fina y limón fresco con escarchado de sal marina.',
        price: '$13.00',
      },
    ],
  },
  {
    id: 'postres',
    label: 'Postres de la Casa',
    subtitle: 'El cierre clásico español preparado diariamente en nuestra pastelería.',
    featuredImage: RESTAURANT_IMAGES.interiorShip,
    featuredAlt: 'Salón de madera noble de La Fragata Panamá iluminado con lámparas náuticas de bronce',
    featuredCaption: 'Sobremesa tradicional en nuestro salón náutico',
    dishes: [
      {
        id: 'pos-1',
        name: 'Crema Catalana Quemada al Momento',
        description:
          'Infusionada con cáscara de limón y canela, cubierta con una fina costra de azúcar caramelizado.',
        price: '$9.50',
        signature: true,
      },
      {
        id: 'pos-2',
        name: 'Tarta de Santiago con Helado de Vainilla',
        description:
          'Bizcocho tradicional gallego de almendra molida y aroma cítrico, espolvoreado con azúcar glas.',
        price: '$10.00',
      },
      {
        id: 'pos-3',
        name: 'Flan Casero al Caramelo de Jerez',
        description:
          'Textura sedosa de receta familiar bañado en caramelo oscuro con toque aromático de jerez.',
        price: '$8.50',
      },
    ],
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  aspect: 'wide' | 'tall' | 'standard';
}

// TODO: Reemplazar con dato/foto real del cliente (sesión fotográfica profesional del salón y platillos)
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    src: RESTAURANT_IMAGES.interiorShip,
    alt: 'Salón principal de La Fragata Panamá decorado en madera caoba al estilo de una embarcación clásica',
    title: 'Nuestro Salón Náutico',
    category: 'Ambiente',
    aspect: 'tall',
  },
  {
    id: 'gal-2',
    src: RESTAURANT_IMAGES.paella,
    alt: 'Paella La Fragata con langostinos, almejas, mejillones y azafrán',
    title: 'Paella La Fragata',
    category: 'Arroces',
    aspect: 'standard',
  },
  {
    id: 'gal-3',
    src: RESTAURANT_IMAGES.mero,
    alt: 'Mero con ajos rostizados sobre plato negro artesanal',
    title: 'Mero con Ajos Rostizados',
    category: 'Pescados',
    aspect: 'standard',
  },
  {
    id: 'gal-4',
    src: RESTAURANT_IMAGES.sangriaBar,
    alt: 'Sangría artesanal de la casa servida en la barra de mármol',
    title: 'Sangría de la Casa',
    category: 'Barra & Cava',
    aspect: 'tall',
  },
  {
    id: 'gal-5',
    src: RESTAURANT_IMAGES.pulpoTapas,
    alt: 'Pulpo a la brasa con pimentón y croquetas artesanales',
    title: 'Pulpo a la Brasa y Croquetas',
    category: 'Entradas',
    aspect: 'standard',
  },
  {
    id: 'gal-6',
    src: RESTAURANT_IMAGES.heroTable,
    alt: 'Mesa mediterránea con vino Albariño, paella y pescado a la brasa',
    title: 'Veladas en Obarrio',
    category: 'Experiencia',
    aspect: 'wide',
  },
];

// TODO: Reemplazar con dato/foto real del cliente (actualizar periódicamente con reseñas verificadas recientes)
export const CLIENT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Valeria Domínguez',
    source: 'degusta',
    sourceLabel: 'Degusta Panamá',
    rating: 5,
    dateLabel: 'Comensal verificado · Obarrio',
    highlightDish: 'Mero con Ajos Rostizados & Croquetas',
    quote:
      'Un clásico imperdible de Ciudad de Panamá. El ambiente en madera tipo embarcación te transporta desde que cruzas la puerta. El surtido de croquetas y el mero con ajos rostizados estuvieron impecables, y la atención del equipo es de primera.',
  },
  {
    id: 'rev-2',
    author: 'Roberto Arango',
    source: 'tripadvisor',
    sourceLabel: 'TripAdvisor',
    rating: 5,
    dateLabel: 'Cena familiar · Ciudad de Panamá',
    highlightDish: 'Paella La Fragata & Sangría',
    quote:
      'Celebramos un aniversario en familia y todo superó nuestras expectativas. La Paella La Fragata llega en su punto exacto con mariscos fresquísimos y la sangría de la casa es, sin exagerar, una de las mejores de la ciudad.',
  },
  {
    id: 'rev-3',
    author: 'Sofía Castellanos',
    source: 'degusta',
    sourceLabel: 'Degusta Panamá',
    rating: 4.8,
    dateLabel: 'Almuerzo ejecutivo · Área Bancaria',
    highlightDish: 'Mero Encebollado & Almejas al Ajillo',
    quote:
      'Excelente opción tanto para almuerzos de negocios como para cenas tranquilas. Las almejas importadas al ajillo y el mero encebollado tienen esa sazón española auténtica que cuesta tanto encontrar hoy en día.',
  },
  {
    id: 'rev-4',
    author: 'Andrés Morales',
    source: 'tripadvisor',
    sourceLabel: 'TripAdvisor',
    rating: 4.7,
    dateLabel: 'Visita de fin de semana',
    highlightDish: 'Robalo a la Marinera & Cava de Vinos',
    quote:
      'Servicio cálido, mesas vestidas con elegancia y una carta de vinos muy bien pensada. Pedimos el robalo a la marinera y el pulpo a la brasa; porciones generosas y frescura absoluta en cada bocado.',
  },
  {
    id: 'rev-5',
    author: 'Gabriela Navarro',
    source: 'degusta',
    sourceLabel: 'Degusta Panamá',
    rating: 5,
    dateLabel: 'Cena romántica · Obarrio',
    highlightDish: 'Atún en Salsa de Mostaza & Crema Catalana',
    quote:
      'Íntimo, acogedor y sumamente elegante. Los pimientos rellenos de entrada, el atún en salsa de mostaza y pimienta verde, y la crema catalana para cerrar hicieron de la noche una experiencia memorable.',
  },
  {
    id: 'rev-6',
    author: 'Fernando Icaza',
    source: 'tripadvisor',
    sourceLabel: 'TripAdvisor',
    rating: 4.6,
    dateLabel: 'Reunión con amigos',
    highlightDish: 'Fideuá de Mariscos & Margaritas',
    quote:
      'Años viniendo a La Fragata y mantienen siempre la misma calidad y distinción. La fideuá de mariscos y sus tragos en barra nunca fallan. Totalmente recomendado en Obarrio.',
  },
];
