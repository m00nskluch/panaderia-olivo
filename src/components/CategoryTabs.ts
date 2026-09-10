import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

interface CategoryTabsProps {
  onFilterChange: (categorySlug: string, searchQuery: string) => void;
}

export function createCategoryTabs({ onFilterChange }: CategoryTabsProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'w-full space-y-5';
  container.id = 'category-tabs-container';

  let currentCategory = 'todos';
  let currentQuery = '';

  // Calculate counts per category
  const counts: Record<string, number> = {
    todos: PRODUCTS.length,
  };
  for (const cat of CATEGORIES) {
    counts[cat.slug] = PRODUCTS.filter((p) => p.categoria === cat.slug).length;
  }

  const categoryOptions = [
    { slug: 'todos', nombre: 'Todos los Productos', icono: '🧺' },
    ...CATEGORIES.map((c) => ({
      slug: c.slug,
      nombre: c.nombre,
      icono:
        c.slug === 'panaderia-tradicional'
          ? '🥖'
          : c.slug === 'pasteleria-dulces'
          ? '🎂'
          : c.slug === 'rotiseria-salados'
          ? '🥟'
          : '☕',
    })),
  ];

  container.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <!-- Section Title -->
      <div>
        <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-brand-charcoal-900 tracking-tight">
          Catálogo del Horno & Cocina
        </h2>
        <p class="text-xs sm:text-sm text-brand-charcoal-600 mt-1">
          Selecciona tus productos favoritos y agrégalos a tu pedido
        </p>
      </div>

      <!-- Live Search Bar -->
      <div class="relative max-w-md w-full">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-charcoal-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input 
          id="product-search-input" 
          type="search" 
          placeholder="Buscar marraqueta, empanada, torta..." 
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-cream-300 rounded-2xl text-xs sm:text-sm text-brand-charcoal-900 placeholder:text-brand-charcoal-400 focus:outline-none focus:ring-2 focus:ring-brand-red-600 focus:border-transparent transition-all shadow-xs"
        />
      </div>

    </div>

    <!-- Pill Tabs Scrollable on Mobile -->
    <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
      ${categoryOptions
        .map(
          (cat) => `
        <button
          type="button"
          data-category="${cat.slug}"
          class="tab-pill-btn whitespace-nowrap touch-target flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red-600 ${
            cat.slug === 'todos'
              ? 'bg-brand-red-700 text-white shadow-soft'
              : 'bg-white text-brand-charcoal-700 hover:bg-brand-cream-100 border border-brand-cream-300'
          }"
        >
          <span class="text-sm sm:text-base">${cat.icono}</span>
          <span>${cat.nombre}</span>
          <span class="tab-count text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full ${
            cat.slug === 'todos'
              ? 'bg-brand-red-800 text-white'
              : 'bg-brand-cream-200 text-brand-charcoal-700'
          }">
            ${counts[cat.slug] ?? 0}
          </span>
        </button>
      `
        )
        .join('')}
    </div>
  `;

  // Attach search listener
  const searchInput = container.querySelector<HTMLInputElement>('#product-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = (e.target as HTMLInputElement).value.trim();
      onFilterChange(currentCategory, currentQuery);
    });
  }

  // Attach tab click listeners
  const buttons = container.querySelectorAll<HTMLButtonElement>('.tab-pill-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-category') || 'todos';
      currentCategory = slug;

      // Update styles
      buttons.forEach((b) => {
        const countSpan = b.querySelector('.tab-count');
        if (b === btn) {
          b.className =
            'tab-pill-btn whitespace-nowrap touch-target flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red-600 bg-brand-red-700 text-white shadow-soft';
          if (countSpan) {
            countSpan.className =
              'tab-count text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-brand-red-800 text-white';
          }
        } else {
          b.className =
            'tab-pill-btn whitespace-nowrap touch-target flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red-600 bg-white text-brand-charcoal-700 hover:bg-brand-cream-100 border border-brand-cream-300';
          if (countSpan) {
            countSpan.className =
              'tab-count text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-brand-cream-200 text-brand-charcoal-700';
          }
        }
      });

      onFilterChange(currentCategory, currentQuery);
    });
  });

  return container;
}
