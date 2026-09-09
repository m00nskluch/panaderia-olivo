import { cartStore } from '../store/cartStore';

let toastTimeout: number | undefined;

/**
 * Muestra un aviso flotante (Toast) interactivo y accesible.
 */
export function showToast(message: string, productName?: string): void {
  const container = document.getElementById('toast-container');
  if (!container) return;

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  container.innerHTML = `
    <div class="pointer-events-auto flex items-center gap-3 bg-brand-charcoal-900 text-white px-4 py-3 rounded-2xl shadow-soft-lg border border-brand-charcoal-700 animate-bounce-short transition-all max-w-sm w-full">
      <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-semibold text-emerald-400 uppercase tracking-wider">${message}</p>
        ${
          productName
            ? `<p class="text-xs text-brand-cream-100 truncate font-medium">${productName}</p>`
            : ''
        }
      </div>
      <button id="toast-view-cart-btn" class="shrink-0 bg-brand-red-700 hover:bg-brand-red-800 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-sm">
        Ver Carrito
      </button>
    </div>
  `;

  const btn = document.getElementById('toast-view-cart-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      cartStore.toggleDrawer(true);
      container.innerHTML = '';
    });
  }

  toastTimeout = window.setTimeout(() => {
    container.innerHTML = '';
  }, 3500);
}
