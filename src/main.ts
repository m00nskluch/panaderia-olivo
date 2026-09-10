import './styles/main.css';
import { PRODUCTS } from './data/products';
import type { Product } from './types';
import { createHeader } from './components/Header';
import { createHero } from './components/Hero';
import { createCategoryTabs } from './components/CategoryTabs';
import { createProductGrid } from './components/ProductGrid';
import { createCartDrawer } from './components/CartDrawer';
import { createWhatsAppBubble } from './components/WhatsAppBubble';
import { createFooter } from './components/Footer';
import { cartStore } from './store/cartStore';
import { formatCLP } from './utils/currency';

function initApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    console.error('No se encontró el contenedor #app en el DOM.');
    return;
  }

  // Clear initial DOM
  app.innerHTML = '';
  app.className = 'flex flex-col min-h-screen bg-brand-cream-50 text-brand-charcoal-900 selection:bg-brand-red-100 selection:text-brand-red-900';

  // 1. Create Header
  const header = createHeader();
  app.appendChild(header);

  // 2. Main content wrapper
  const main = document.createElement('main');
  main.className = 'flex-1';

  // 3. Create Hero Section
  const hero = createHero();
  main.appendChild(hero);

  // 4. Catalog Section - Mobile First Spacing
  const catalogSection = document.createElement('section');
  catalogSection.id = 'catalogo';
  catalogSection.className = 'max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-16 space-y-5 sm:space-y-8';

  // Filter state
  let currentCategory = 'todos';
  let currentSearch = '';

  function filterProducts(): Product[] {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        currentCategory === 'todos' || product.categoria === currentCategory;

      // Search match
      const query = currentSearch.toLowerCase();
      const matchesSearch =
        query === '' ||
        product.nombre.toLowerCase().includes(query) ||
        product.descripcion.toLowerCase().includes(query) ||
        (product.badge && product.badge.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }

  // Initialize ProductGrid
  const { element: productGridElement, updateProducts } = createProductGrid();

  // Initialize CategoryTabs with callback
  const categoryTabs = createCategoryTabs({
    onFilterChange: (categorySlug, searchQuery) => {
      currentCategory = categorySlug;
      currentSearch = searchQuery;
      updateProducts(filterProducts());
    },
  });

  catalogSection.appendChild(categoryTabs);
  catalogSection.appendChild(productGridElement);
  main.appendChild(catalogSection);

  app.appendChild(main);

  // 5. Create Footer
  const footer = createFooter();
  app.appendChild(footer);

  // 6. Create Floating and Overlay Components
  const cartDrawer = createCartDrawer();
  document.body.appendChild(cartDrawer);

  const whatsAppBubble = createWhatsAppBubble();
  document.body.appendChild(whatsAppBubble);

  // 7. Mobile-First Sticky Cart Bottom Bar
  const mobileCartBar = document.createElement('div');
  mobileCartBar.id = 'mobile-sticky-cart-bar';
  mobileCartBar.className =
    'fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-cream-300 px-4 py-2.5 sm:hidden transform translate-y-full transition-transform duration-300 ease-out shadow-2xl flex items-center justify-between pointer-events-auto';
  mobileCartBar.innerHTML = `
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-full bg-brand-red-700 text-white flex items-center justify-center font-black text-xs shadow-sm">
        <span id="mobile-bar-count">0</span>
      </div>
      <div>
        <p class="text-[10px] font-bold text-brand-charcoal-500 uppercase tracking-tight leading-none">Tu Pedido</p>
        <p id="mobile-bar-total" class="text-sm font-black text-brand-red-700 leading-tight">$0</p>
      </div>
    </div>
    <button 
      id="mobile-bar-open-btn"
      type="button" 
      class="bg-brand-charcoal-900 hover:bg-brand-red-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
    >
      <span>Ver Carrito</span>
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  `;
  document.body.appendChild(mobileCartBar);

  const mobileBarOpenBtn = mobileCartBar.querySelector('#mobile-bar-open-btn');
  if (mobileBarOpenBtn) {
    mobileBarOpenBtn.addEventListener('click', () => cartStore.toggleDrawer(true));
  }

  function updateMobileCartBar(): void {
    const totalItems = cartStore.getTotalItems();
    const totalPrice = cartStore.getTotalPrice();
    const countEl = document.getElementById('mobile-bar-count');
    const totalEl = document.getElementById('mobile-bar-total');
    if (totalItems > 0) {
      mobileCartBar.classList.remove('translate-y-full');
      mobileCartBar.classList.add('translate-y-0');
      if (countEl) countEl.textContent = totalItems.toString();
      if (totalEl) totalEl.textContent = formatCLP(totalPrice);
    } else {
      mobileCartBar.classList.remove('translate-y-0');
      mobileCartBar.classList.add('translate-y-full');
    }
  }

  window.addEventListener('cart:updated', updateMobileCartBar);
  updateMobileCartBar();

  // 8. Toast Container for Notifications
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-16 sm:bottom-6 left-4 sm:left-6 z-50 pointer-events-none flex flex-col gap-2 max-w-sm w-full';
    document.body.appendChild(toastContainer);
  }

  // Initial render of products
  updateProducts(filterProducts());
}

// Boot application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
