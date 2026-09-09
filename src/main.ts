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

  // 4. Catalog Section
  const catalogSection = document.createElement('section');
  catalogSection.id = 'catalogo';
  catalogSection.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8';

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

  // 7. Toast Container for Notifications
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 left-6 z-50 pointer-events-none flex flex-col gap-2 max-w-sm w-full';
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
