import onyx from '../../assets/images/plans/onyxw.webp';
import nebula from '../../assets/images/plans/nebulaw.webp';
import magnetar from '../../assets/images/plans/magnetarw.webp';
import quasar from '../../assets/images/plans/quasarw.webp';

export interface Plan {
  id: string;
  name: string;
  tier: string;
  tagline: string;
  image: ImageMetadata;
  /** Clase de color del nombre del plan, tomada del póster. */
  accent: string;
  /** Precio mensual en MXN; null cuando se cotiza a medida. */
  price: number | null;
  includes?: string;
  features: string[];
  extras: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'onyx',
    name: 'Onyx',
    tier: 'Esencial',
    tagline: 'Un comienzo sólido para grandes ideas.',
    image: onyx,
    accent: 'text-amber-600',
    price: 160,
    features: [
      'Punto de venta',
      'Control de inventario',
      '3 cajas',
      '25 empleados',
      '3,000 productos',
      'Facturación',
      'Reportes básicos',
      'Trazabilidad de ventas y compras',
      'Módulo de ofertas',
    ],
    extras: ['Consumibles según uso'],
    cta: { label: 'Comenzar Ahora', href: '/product' },
  },
  {
    id: 'nebula',
    name: 'Nebula',
    tier: 'Crecimiento',
    tagline: 'Más posibilidades para llegar más lejos.',
    image: nebula,
    accent: 'text-violet-600',
    price: 290,
    includes: 'Incluye todo lo del Plan Onyx más:',
    features: [
      '6 cajas',
      '50 empleados',
      '6,000 productos',
      'Multisucursal',
      'Catálogo en línea',
      'Promociones y lealtad',
      'Reportes avanzados',
      'Gestión de ventas y envíos',
      '3 análisis mensuales de datos',
    ],
    extras: ['Sucursal adicional: $150/mes', 'Bot de WhatsApp con IA: $100 por 500 mensajes', 'Consumibles según uso'],
    cta: { label: 'Comenzar Ahora', href: '/product' },
    featured: true,
  },
  {
    id: 'magnetar',
    name: 'Magnetar',
    tier: 'Avanzado',
    tagline: 'Potencia y precisión sin límites.',
    image: magnetar,
    accent: 'text-blue-600',
    price: 500,
    includes: 'Incluye todo lo de los planes Onyx y Nebula más:',
    features: [
      '12 cajas',
      '100 empleados',
      '12,000 productos',
      'Compras y proveedores',
      'Integraciones y automatización',
      'Funciones de IA',
      '8 análisis mensuales de IA avanzada',
    ],
    extras: ['Sucursal adicional: $80/mes', 'Bot de WhatsApp con IA: $100 por 500 mensajes', 'Consumibles según uso'],
    cta: { label: 'Contactar Ventas', href: '/product' },
  },
  {
    id: 'quasar',
    name: 'Quasar',
    tier: 'Élite',
    tagline: 'Alcance extremo para un futuro sin fronteras.',
    image: quasar,
    accent: 'text-orange-600',
    price: null,
    includes: 'Incluye todo lo del Plan Magnetar más:',
    features: [
      'API y desarrollos a medida',
      'Soporte prioritario',
      'Infraestructura dedicada',
      'Crecimiento sin límites',
    ],
    extras: ['Sucursales y consumibles según contrato'],
    cta: { label: 'Contactar Ventas', href: '/contact' },
  },
];
