import { BUSINESS_CONFIG } from '../data/business';
import { cartStore } from '../store/cartStore';
import type { CartState } from '../types';
import { formatCLP } from '../utils/currency';
import { getWhatsAppCheckoutUrl } from '../utils/whatsapp';

export function createCartDrawer(): HTMLElement {
  const container = document.createElement('aside');
  container.id = 'cart-drawer-container';
  container.className = 'fixed inset-0 z-50 pointer-events-none transition-opacity duration-300';
  container.setAttribute('aria-label', 'Canasta de Pedido');

  container.innerHTML = `
    <!-- Backdrop Overlay -->
    <div 
      id="cart-backdrop" 
      class="absolute inset-0 bg-brand-charcoal-950/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"
    ></div>

    <!-- Slide-over panel -->
    <div 
      id="cart-panel" 
      class="absolute inset-y-0 right-0 max-w-full w-full sm:max-w-md bg-brand-cream-50 shadow-2xl flex flex-col pointer-events-auto transform translate-x-full transition-transform duration-300 ease-out border-l border-brand-cream-200"
    >
      <!-- Header -->
      <div class="px-6 py-5 bg-white border-b border-brand-cream-200 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-brand-red-50 text-brand-red-700 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <div>
            <h2 class="font-display font-black text-lg text-brand-charcoal-900 leading-tight">
              Tu Pedido
            </h2>
            <p id="cart-item-count-label" class="text-xs text-brand-charcoal-500 font-medium">
              0 productos seleccionados
            </p>
          </div>
        </div>

        <button 
          id="cart-close-btn" 
          type="button" 
          class="touch-target p-2 rounded-xl text-brand-charcoal-400 hover:text-brand-charcoal-800 hover:bg-brand-cream-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red-600"
          aria-label="Cerrar canasta"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Main Body: Empty State or Items List -->
      <div id="cart-content-area" class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <!-- Rendered dynamically -->
      </div>

      <!-- Footer / Checkout Section -->
      <div id="cart-footer-area" class="p-6 bg-white border-t border-brand-cream-200 space-y-4">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  let isOpen = false;

  const backdrop = container.querySelector<HTMLElement>('#cart-backdrop')!;
  const panel = container.querySelector<HTMLElement>('#cart-panel')!;
  const contentArea = container.querySelector<HTMLElement>('#cart-content-area')!;
  const footerArea = container.querySelector<HTMLElement>('#cart-footer-area')!;
  const closeBtn = container.querySelector<HTMLButtonElement>('#cart-close-btn')!;
  const countLabel = container.querySelector<HTMLElement>('#cart-item-count-label')!;

  function setOpen(open: boolean): void {
    isOpen = open;
    if (open) {
      container.classList.remove('pointer-events-none');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    } else {
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
      container.classList.add('pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  function renderDrawer(state: CartState): void {
    const totalItems = state.items.reduce((acc, it) => acc + it.cantidad, 0);
    const totalPrice = state.items.reduce(
      (acc, it) => acc + it.product.precio * it.cantidad,
      0
    );

    countLabel.textContent = `${totalItems} ${
      totalItems === 1 ? 'producto seleccionado' : 'productos seleccionados'
    }`;

    // EMPTY STATE
    if (state.items.length === 0) {
      contentArea.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
          <div class="w-20 h-20 rounded-3xl bg-brand-gold-100/70 text-brand-gold-700 flex items-center justify-center text-4xl shadow-xs">
            🥖
          </div>
          <div class="space-y-1">
            <h3 class="font-display font-bold text-lg text-brand-charcoal-900">
              Tu canasta está vacía
            </h3>
            <p class="text-xs text-brand-charcoal-600 max-w-xs leading-relaxed">
              Explora nuestras marraquetas crujientes, ricas empanadas de horno y pasteles tradicionales.
            </p>
          </div>
          <button 
            id="cart-empty-explore-btn"
            type="button"
            class="touch-target inline-flex items-center gap-2 bg-brand-red-700 hover:bg-brand-red-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-soft transition-all"
          >
            <span>Ver Catálogo del Horno</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      `;

      footerArea.innerHTML = '';
      footerArea.classList.add('hidden');

      const exploreBtn = contentArea.querySelector('#cart-empty-explore-btn');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
          setOpen(false);
          const catalogo = document.getElementById('catalogo');
          if (catalogo) {
            catalogo.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
      return;
    }

    // ITEMS LIST & OPTIONS
    footerArea.classList.remove('hidden');

    contentArea.innerHTML = `
      <!-- Items List -->
      <div class="space-y-4 divide-y divide-brand-cream-200">
        ${state.items
          .map((item) => {
            const subtotal = item.product.precio * item.cantidad;
            return `
              <div class="pt-4 first:pt-0 flex gap-3.5 items-start group" data-item-id="${item.product.id}">
                <!-- Thumbnail -->
                <img 
                  src="${item.product.imagen}" 
                  alt="${item.product.nombre}" 
                  class="w-16 h-16 rounded-2xl object-cover border border-brand-cream-200 bg-brand-cream-100 shrink-0"
                  loading="lazy"
                />

                <div class="flex-1 min-w-0 space-y-1.5">
                  <div class="flex items-start justify-between gap-2">
                    <h4 class="font-display font-bold text-sm text-brand-charcoal-900 leading-snug truncate">
                      ${item.product.nombre}
                    </h4>
                    <button 
                      type="button"
                      data-remove-id="${item.product.id}"
                      class="text-brand-charcoal-400 hover:text-brand-red-700 p-1 rounded-lg transition-colors"
                      title="Eliminar producto"
                      aria-label="Eliminar ${item.product.nombre}"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>

                  <p class="text-xs text-brand-red-700 font-black">
                    ${formatCLP(subtotal)}
                    <span class="text-[11px] font-normal text-brand-charcoal-500">(${formatCLP(item.product.precio)} c/u)</span>
                  </p>

                  <!-- Stepper -->
                  <div class="flex items-center gap-3 pt-1">
                    <div class="flex items-center bg-white border border-brand-cream-300 rounded-xl shadow-xs">
                      <button 
                        type="button"
                        data-step-id="${item.product.id}"
                        data-step-dir="-1"
                        class="w-8 h-8 flex items-center justify-center text-brand-charcoal-700 hover:text-brand-red-700 hover:bg-brand-cream-100 rounded-l-xl transition-colors font-bold text-base"
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span class="w-8 text-center text-xs font-bold text-brand-charcoal-900">
                        ${item.cantidad}
                      </span>
                      <button 
                        type="button"
                        data-step-id="${item.product.id}"
                        data-step-dir="1"
                        class="w-8 h-8 flex items-center justify-center text-brand-charcoal-700 hover:text-brand-red-700 hover:bg-brand-cream-100 rounded-r-xl transition-colors font-bold text-base"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <!-- Item note input toggle/field -->
                    <input 
                      type="text"
                      data-note-id="${item.product.id}"
                      placeholder="Nota (ej: bien tostada)..."
                      value="${item.notas || ''}"
                      class="flex-1 min-w-0 text-xs py-1.5 px-2.5 bg-white border border-brand-cream-300 rounded-xl text-brand-charcoal-800 placeholder:text-brand-charcoal-400 focus:outline-none focus:ring-1 focus:ring-brand-red-600 shadow-xs"
                    />
                  </div>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>

      <!-- Modality Selector -->
      <div class="pt-4 border-t border-brand-cream-200 space-y-2">
        <label class="block text-xs font-bold text-brand-charcoal-900 uppercase tracking-wider">
          Modalidad de Pedido
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button 
            type="button"
            id="modality-retiro-btn"
            class="touch-target p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              state.modalidad === 'retiro'
                ? 'bg-brand-red-50 border-brand-red-600 text-brand-red-900 shadow-xs ring-1 ring-brand-red-600'
                : 'bg-white border-brand-cream-300 text-brand-charcoal-700 hover:bg-brand-cream-100'
            }"
          >
            <div class="flex items-center justify-between w-full">
              <span class="text-base">🏪</span>
              <span class="w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                state.modalidad === 'retiro'
                  ? 'border-brand-red-600 bg-brand-red-600'
                  : 'border-brand-charcoal-300'
              }">
                ${state.modalidad === 'retiro' ? '<span class="w-1.5 h-1.5 rounded-full bg-white"></span>' : ''}
              </span>
            </div>
            <p class="text-xs font-bold mt-1">Retiro en Local</p>
            <p class="text-[10px] text-brand-charcoal-500">Sin costo • Inmediato</p>
          </button>

          <button 
            type="button"
            id="modality-envio-btn"
            class="touch-target p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              state.modalidad === 'consulta_envio'
                ? 'bg-brand-red-50 border-brand-red-600 text-brand-red-900 shadow-xs ring-1 ring-brand-red-600'
                : 'bg-white border-brand-cream-300 text-brand-charcoal-700 hover:bg-brand-cream-100'
            }"
          >
            <div class="flex items-center justify-between w-full">
              <span class="text-base">🛵</span>
              <span class="w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                state.modalidad === 'consulta_envio'
                  ? 'border-brand-red-600 bg-brand-red-600'
                  : 'border-brand-charcoal-300'
              }">
                ${state.modalidad === 'consulta_envio' ? '<span class="w-1.5 h-1.5 rounded-full bg-white"></span>' : ''}
              </span>
            </div>
            <p class="text-xs font-bold mt-1">Consulta de Envío</p>
            <p class="text-[10px] text-brand-charcoal-500">Coordinar por WhatsApp</p>
          </button>
        </div>
      </div>

      <!-- Additional Customer Notes -->
      <div class="space-y-1.5 pt-1">
        <label for="cart-general-comment" class="block text-xs font-bold text-brand-charcoal-900 uppercase tracking-wider">
          Comentario adicional o nombre
        </label>
        <textarea 
          id="cart-general-comment" 
          rows="2" 
          placeholder="Ej: A nombre de Juan, retiro a las 18:00 hrs..."
          class="w-full text-xs p-3 bg-white border border-brand-cream-300 rounded-2xl text-brand-charcoal-800 placeholder:text-brand-charcoal-400 focus:outline-none focus:ring-2 focus:ring-brand-red-600 shadow-xs resize-none"
        >${state.comentario || ''}</textarea>
      </div>
    `;

    // FOOTER
    const whatsappUrl = getWhatsAppCheckoutUrl(state, BUSINESS_CONFIG);

    footerArea.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs text-brand-charcoal-600">
          <span>Subtotal estimado:</span>
          <span>${formatCLP(totalPrice)}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-display font-extrabold text-base text-brand-charcoal-900">Total a Pagar:</span>
          <span class="font-display font-black text-2xl text-brand-red-700 tracking-tight">
            ${formatCLP(totalPrice)} CLP
          </span>
        </div>
      </div>

      <!-- WhatsApp Checkout Button -->
      <a 
        href="${whatsappUrl}" 
        target="_blank" 
        rel="noopener noreferrer"
        id="send-whatsapp-order-btn"
        class="touch-target w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-200"
      >
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 1.002.894 1.488.948 1.705 1.035.217.087.346.072.476-.073.13-.145.563-.651.708-.882.145-.231.289-.188.491-.116.202.073 1.288.607 1.512.723.224.116.376.173.433.26.058.087.058.506-.086.911z"/>
        </svg>
        <span>Enviar Pedido a WhatsApp</span>
      </a>

      <p class="text-[11px] text-center text-brand-charcoal-500">
        Sin cobros automáticos • Coordinación directa con el equipo de panadería
      </p>
    `;

    // Attach step listeners (+ / -)
    contentArea.querySelectorAll<HTMLButtonElement>('[data-step-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-step-id')!;
        const dir = parseInt(btn.getAttribute('data-step-dir') || '0', 10);
        const item = state.items.find((i) => i.product.id === id);
        if (item) {
          cartStore.updateQuantity(id, item.cantidad + dir);
        }
      });
    });

    // Attach remove listeners
    contentArea.querySelectorAll<HTMLButtonElement>('[data-remove-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-id')!;
        cartStore.removeItem(id);
      });
    });

    // Attach note listeners
    contentArea.querySelectorAll<HTMLInputElement>('[data-note-id]').forEach((input) => {
      input.addEventListener('change', () => {
        const id = input.getAttribute('data-note-id')!;
        cartStore.updateItemNotes(id, input.value);
      });
    });

    // Modality triggers
    const retiroBtn = contentArea.querySelector('#modality-retiro-btn');
    const envioBtn = contentArea.querySelector('#modality-envio-btn');
    if (retiroBtn && envioBtn) {
      retiroBtn.addEventListener('click', () => {
        cartStore.setDeliveryMode('retiro');
      });
      envioBtn.addEventListener('click', () => {
        cartStore.setDeliveryMode('consulta_envio');
      });
    }

    // Comment input listener
    const commentInput = contentArea.querySelector<HTMLTextAreaElement>('#cart-general-comment');
    if (commentInput) {
      commentInput.addEventListener('input', () => {
        cartStore.setComment(commentInput.value);
        // update checkout link in real-time
        const checkoutBtn = footerArea.querySelector<HTMLAnchorElement>('#send-whatsapp-order-btn');
        if (checkoutBtn) {
          checkoutBtn.href = getWhatsAppCheckoutUrl(cartStore.getState(), BUSINESS_CONFIG);
        }
      });
    }
  }

  // Backdrop click & Close button
  backdrop.addEventListener('click', () => setOpen(false));
  closeBtn.addEventListener('click', () => setOpen(false));

  // Escape key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      setOpen(false);
    }
  });

  // CustomEvent listeners
  window.addEventListener('cart:toggle', ((e: CustomEvent<{ open?: boolean }>) => {
    if (e.detail?.open !== undefined) {
      setOpen(e.detail.open);
    } else {
      setOpen(!isOpen);
    }
  }) as EventListener);

  window.addEventListener('cart:updated', ((e: CustomEvent<{ state: CartState }>) => {
    const currentState = e.detail?.state || cartStore.getState();
    renderDrawer(currentState);
  }) as EventListener);

  // Initial render
  renderDrawer(cartStore.getState());

  return container;
}
