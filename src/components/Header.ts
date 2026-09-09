import { BUSINESS_CONFIG } from '../data/business';
import { cartStore } from '../store/cartStore';

export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className =
    'sticky top-0 z-40 w-full glass-nav transition-all duration-300';
  header.id = 'main-header';

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- Brand Logo & Name -->
      <a href="#" class="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-brand-red-600 rounded-2xl p-1">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red-700 to-brand-red-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <!-- Artisan bread loaf / wheat outline -->
            <path d="M18 20a4 4 0 0 0 3.5-6 6 6 0 0 0-11-5A6 6 0 0 0 2 14a4 4 0 0 0 3.5 6h12.5z"/>
            <path d="M8 14v.01"/>
            <path d="M12 12v.01"/>
            <path d="M16 14v.01"/>
          </svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-display font-black text-xl sm:text-2xl text-brand-charcoal-900 tracking-tight group-hover:text-brand-red-700 transition-colors">
              ${BUSINESS_CONFIG.name}
            </span>
            <span class="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-gold-100 text-brand-gold-800 border border-brand-gold-200">
              Desde Santiago
            </span>
          </div>
          <p class="text-xs text-brand-charcoal-600 font-medium hidden sm:block">
            Panadería • Pastelería • Rotisería
          </p>
        </div>
      </a>

      <!-- Quick Info Bar (Desktop) -->
      <div class="hidden lg:flex items-center gap-6 text-xs text-brand-charcoal-700 font-medium">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span class="text-emerald-700 font-semibold">Horno activo ahora</span>
        </div>
        <a href="#contacto" class="flex items-center gap-1.5 hover:text-brand-red-700 transition-colors">
          <svg class="w-4 h-4 text-brand-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="truncate max-w-[200px]">${BUSINESS_CONFIG.address}</span>
        </a>
      </div>

      <!-- Action Buttons (Cart Drawer Trigger) -->
      <div class="flex items-center gap-3">
        <a href="#catalogo" class="hidden sm:inline-flex items-center text-xs font-bold text-brand-charcoal-700 hover:text-brand-red-700 px-3 py-2 rounded-xl transition-colors">
          Ver Catálogo
        </a>

        <!-- Cart Button -->
        <button 
          id="header-cart-btn" 
          type="button"
          class="relative touch-target flex items-center gap-2.5 bg-brand-charcoal-900 hover:bg-brand-charcoal-800 active:scale-95 text-white px-4 py-2.5 rounded-2xl shadow-soft transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red-600 focus:ring-offset-2"
          aria-label="Abrir canasta de compras"
        >
          <div class="relative">
            <svg class="w-5 h-5 text-brand-cream-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span 
              id="header-cart-count-badge" 
              class="hidden absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-brand-red-600 text-white font-black text-[11px] flex items-center justify-center shadow-md animate-bounce-short"
            >
              0
            </span>
          </div>
          <span class="font-bold text-xs tracking-wide hidden xs:inline">Mi Pedido</span>
        </button>
      </div>

    </div>
  `;

  // Attach listener to open cart drawer
  const cartBtn = header.querySelector('#header-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      cartStore.toggleDrawer(true);
    });
  }

  // Reactive listener for cart updates
  window.addEventListener('cart:updated', ((e: CustomEvent<{ totalItems: number }>) => {
    const badge = header.querySelector('#header-cart-count-badge');
    if (!badge) return;
    const count = e.detail?.totalItems ?? cartStore.getTotalItems();
    if (count > 0) {
      badge.classList.remove('hidden');
      badge.textContent = count > 99 ? '99+' : count.toString();
      badge.classList.remove('animate-bounce-short');
      // trigger reflow for animation restart
      void (badge as HTMLElement).offsetWidth;
      badge.classList.add('animate-bounce-short');
    } else {
      badge.classList.add('hidden');
    }
  }) as EventListener);

  // Initialize count
  const initialCount = cartStore.getTotalItems();
  const badge = header.querySelector('#header-cart-count-badge');
  if (badge && initialCount > 0) {
    badge.classList.remove('hidden');
    badge.textContent = initialCount.toString();
  }

  return header;
}
