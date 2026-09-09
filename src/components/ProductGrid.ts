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
      ? `<span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider shadow-sm z-10 ${
          product.badge.includes('Caliente') || product.badge.includes('Horneado')
            ? 'bg-brand-red-700 text-white'
            : product.badge.includes('Más') || product.badge.includes('Favorito')
            ? 'bg-brand-gold-600 text-white'
            : 'bg-brand-charcoal-900 text-brand-cream-100'
        }">${product.badge}</span>`
      : '';

    const unidadHtml = product.unidad
      ? `<span class="text-[11px] font-semibold text-brand-charcoal-500 lowercase bg-brand-cream-100 px-2 py-0.5 rounded-md">
          por ${product.unidad}
        </span>`
      : '';

    return `
      <article 
        class="product-card group relative bg-white rounded-3xl overflow-hidden border border-brand-cream-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        data-product-id="${product.id}"
      >
        <!-- Image Area -->
        <div class="relative w-full aspect-[4/3] overflow-hidden bg-brand-cream-100">
          ${badgeHtml}
          <img 
            src="${product.imagen}" 
            alt="${product.nombre}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80'"
          />
        </div>

        <!-- Content Area -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <h3 class="font-display font-extrabold text-base sm:text-lg text-brand-charcoal-900 leading-snug group-hover:text-brand-red-700 transition-colors">
                ${product.nombre}
              </h3>
            </div>
            
            <p class="text-xs text-brand-charcoal-600 line-clamp-2 leading-relaxed">
              ${product.descripcion}
            </p>
          </div>

          <!-- Price & Action -->
          <div class="pt-3 border-t border-brand-cream-200 flex items-center justify-between gap-3">
            <div class="flex flex-col">
              <span class="font-display font-black text-lg sm:text-xl text-brand-red-700 tracking-tight">
                ${formatCLP(product.precio)}
              </span>
              ${unidadHtml}
            </div>

            <button
              type="button"
              data-add-id="${product.id}"
              class="add-to-cart-btn touch-target flex items-center gap-1.5 bg-brand-charcoal-900 hover:bg-brand-red-700 active:scale-95 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red-600 focus:ring-offset-1"
              aria-label="Añadir ${product.nombre} al pedido"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Añadir</span>
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
          <svg class="w-4 h-4 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span>¡Listo!</span>
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
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
