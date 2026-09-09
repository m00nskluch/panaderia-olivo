import type { BusinessConfig } from '../types';

/**
 * CONFIGURACIÓN CENTRAL DEL NEGOCIO
 * Todos los datos marcados como pendientes o editables por el cliente
 * se configuran en este archivo para facilitar su actualización sin tocar componentes.
 */
export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'Panadería El Olivo',
  legalName: 'Panadería El Olivo Ltda.',
  tagline: 'Tradición en Panadería, Pastelería y Rotisería',
  
  // Dirección física y mapa (Fácilmente editable por el cliente)
  address: 'Av. Providencia 1420, Providencia',
  addressNote: 'A pasos del Metro Manuel Montt — Santiago de Chile',
  mapsUrl: 'https://maps.google.com/?q=Panaderia+El+Olivo+Providencia+Santiago',
  
  // Teléfonos y WhatsApp oficial de pedidos
  phone: '+56 2 2233 4455',
  whatsappNumber: '56987654321', // Número internacional sin '+' ni espacios para wa.me
  whatsappDisplay: '+56 9 8765 4321',
  
  // Horarios de atención comercial
  scheduleWeekday: 'Lunes a Sábado: 07:00 a 20:30 hrs',
  scheduleWeekend: 'Domingos y Festivos: 08:00 a 14:30 hrs',
  
  // Redes sociales
  instagramUrl: 'https://instagram.com/panaderiaelolivo.cl',
  facebookUrl: 'https://facebook.com/panaderiaelolivoltda',
};
