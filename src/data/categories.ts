import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    nombre: 'Panadería Tradicional',
    slug: 'panaderia-tradicional',
    descripcion: 'Horneado varias veces al día con recetas clásicas chilenas a la piedra',
    icono: 'croissant',
  },
  {
    id: 'cat-2',
    nombre: 'Pastelería y Dulces',
    slug: 'pasteleria-dulces',
    descripcion: 'Tortas artesanales, pasteles tradicionales, medialunas y hojaldres',
    icono: 'cake',
  },
  {
    id: 'cat-3',
    nombre: 'Rotisería y Salados',
    slug: 'rotiseria-salados',
    descripcion: 'Empanadas de horno jugosas, colaciones caseras y sándwiches preparados al día',
    icono: 'utensils',
  },
  {
    id: 'cat-4',
    nombre: 'Bebidas y Cafetería',
    slug: 'bebidas-cafeteria',
    descripcion: 'Café de grano recién molido, jugos naturales prensados y lácteos frescos',
    icono: 'coffee',
  },
];
