export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number; // En CLP (entero)
  categoria: string; // Coincide con Category.slug
  imagen: string;
  disponible: boolean;
  badge?: string; // Ej: 'Recién Horneado', 'Más Vendido', 'Favorito'
  unidad?: string; // Ej: 'por kilo', 'unidad', 'porción'
}

export interface Category {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  icono?: string;
}

export interface CartItem {
  product: Product;
  cantidad: number;
  notas?: string;
}

export type OrderDeliveryMode = 'retiro' | 'consulta_envio';

export interface CartState {
  version: number;
  items: CartItem[];
  modalidad: OrderDeliveryMode;
  comentario: string;
}

export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: string;
  address: string;
  addressNote: string;
  mapsUrl: string;
  phone: string;
  whatsappNumber: string; // Formato internacional limpio para wa.me, ej: 56912345678
  whatsappDisplay: string; // Formato legible, ej: +56 9 1234 5678
  scheduleWeekday: string;
  scheduleWeekend: string;
  instagramUrl: string;
  facebookUrl: string;
}
