import type { Product } from '../types';
import { cartStore } from '../store/cartStore';
import { formatCLP } from '../utils/currency';
import { showToast } from '../utils/toast';

export function createProductGrid(): {
  element: HTMLElement;
  updateProducts: (products: Product[]) => void;
} {
  const gridContainer = document.createElement('div');
  gridContainer.id = 'products-grid-wrapper';
  gridContainer.className = 'w-full';

  function renderCard(product: Product): string {
    const badgeHtml = product.badge
      ? `<span class="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-tight shadow-sm z-10 ${
          product.badge.includes('Caliente') || product.badge.includes('Horneado')
            ? 'bg-brand-red-700 text-white'
            : product.badge.includes('Más') || product.badge.includes('Favorito')
            ? 'bg-brand-gold-600 text-white'
            : 'bg-brand-charcoal-900 text-brand-cream-100'
        }">${product.badge}</span>`
      : '';

    const unidadHtml = product.unidad
      ? `<span class="text-[9px] sm:text-[10px] font-medium text-brand-charcoal-500 lowercase truncate">
          /${product.unidad}
        </span>`
      : '';

    return `
      <article 
        class="product-card group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-brand-cream-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
        data-product-id="${product.id}"
      >
        <!-- Image Area: Compact Square -->
        <div class="relative w-full aspect-square overflow-hidden bg-brand-cream-100">
          ${badgeHtml}
          <img 
            src="${product.imagen}" 
            alt="${product.nombre}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80'"
          />
        </div>

        <!-- Content Area: Compact padding & typography -->
        <div class="p-1.5 sm:p-3 md:p-4 flex-1 flex flex-col justify-between gap-1 sm:gap-2">
          
          <div class="space-y-1">
            <h3 class="font-display font-bold text-[11px] sm:text-xs md:text-sm text-brand-charcoal-900 leading-tight line-clamp-2 group-hover:text-brand-red-700 transition-colors">
              ${product.nombre}
            </h3>
            
            <p class="hidden sm:block text-[11px] text-brand-charcoal-600 line-clamp-2 leading-relaxed">
              ${product.descripcion}
            </p>
          </div>

          <!-- Price & Action Button -->
          <div class="pt-1.5 sm:pt-2 border-t border-brand-cream-200 flex flex-col gap-1 sm:gap-1.5">
            <div class="flex items-baseline justify-between gap-1">
              <span class="font-display font-black text-xs sm:text-sm md:text-base text-brand-red-700 tracking-tight leading-none">
                ${formatCLP(product.precio)}
              </span>
              ${unidadHtml}
            </div>

            <button
              type="button"
              data-add-id="${product.id}"
              class="add-to-cart-btn touch-target w-full flex items-center justify-center gap-1 bg-brand-charcoal-900 hover:bg-brand-red-700 active:scale-95 text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 px-1 rounded-lg sm:rounded-xl transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-red-600 min-h-[32px] sm:min-h-[36px]"
              aria-label="Añadir ${product.nombre} al pedido"
            >
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
              </svg>
              <span class="truncate">Añadir</span>
            </button>
          </div>

        </div>
      </article>
    `;
  }

  function renderEmptyState(): string {
    return `
      <div class="col-span-full text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-brand-cream-300">
        <div class="w-16 h-16 mx-auto rounded-full bg-brand-gold-100 text-brand-gold-700 flex items-center justify-center text-2xl mb-4">
          🥖
        </div>
        <h3 class="font-display font-bold text-lg text-brand-charcoal-900">
          No encontramos productos con ese filtro
        </h3>
        <p class="text-xs sm:text-sm text-brand-charcoal-600 max-w-sm mx-auto mt-1">
          Prueba buscando con otro término o selecciona "Todos los Productos" para ver todo nuestro catálogo.
        </p>
        <button 
          id="reset-filter-btn"
          type="button"
          class="mt-5 inline-flex items-center gap-2 bg-brand-red-700 hover:bg-brand-red-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
        >
          Ver todo el catálogo
        </button>
      </div>
    `;
  }

  function attachCardListeners(currentProducts: Product[]): void {
    const addButtons = gridContainer.querySelectorAll<HTMLButtonElement>('.add-to-cart-btn');
    addButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prodId = btn.getAttribute('data-add-id');
        const product = currentProducts.find((p) => p.id === prodId);
        if (!product) return;

        // Add to store
        cartStore.addItem(product, 1);
        showToast('¡Añadido al pedido!', product.nombre);

        // Immediate visual feedback on the button
        const originalContent = btn.innerHTML;
        btn.classList.remove('bg-brand-charcoal-900', 'hover:bg-brand-red-700');
        btn.classList.add('bg-emerald-600', 'text-white');
        btn.innerHTML = `
          <svg class="w-3.5 h-3.5 shrink-0 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="truncate">¡Listo!</span>
        `;

        setTimeout(() => {
          btn.classList.remove('bg-emerald-600');
          btn.classList.add('bg-brand-charcoal-900', 'hover:bg-brand-red-700');
          btn.innerHTML = originalContent;
        }, 1200);
      });
    });

    const resetBtn = gridContainer.querySelector<HTMLButtonElement>('#reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Click on "Todos" tab
        const allTab = document.querySelector<HTMLButtonElement>('[data-category="todos"]');
        if (allTab) {
          allTab.click();
        }
        const searchInput = document.querySelector<HTMLInputElement>('#product-search-input');
        if (searchInput) {
          searchInput.value = '';
        }
      });
    }
  }

  function updateProducts(products: Product[]): void {
    if (products.length === 0) {
      gridContainer.innerHTML = `
        <div class="grid grid-cols-1 gap-6 w-full">
          ${renderEmptyState()}
        </div>
      `;
      attachCardListeners([]);
      return;
    }

    gridContainer.innerHTML = `
      <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 sm:gap-4 w-full">
        ${products.map(renderCard).join('')}
      </div>
    `;

    attachCardListeners(products);
  }

  return {
    element: gridContainer,
    updateProducts,
  };
}
