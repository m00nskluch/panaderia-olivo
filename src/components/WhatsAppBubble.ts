import { BUSINESS_CONFIG } from '../data/business';
import { getWhatsAppDirectUrl } from '../utils/whatsapp';

export function createWhatsAppBubble(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'whatsapp-floating-bubble';
  container.className = 'fixed bottom-6 right-6 z-30 flex items-center gap-2.5 pointer-events-auto';

  const chatUrl = getWhatsAppDirectUrl(
    BUSINESS_CONFIG,
    `¡Hola! Estoy visitando el sitio web de ${BUSINESS_CONFIG.name} y tengo una consulta sobre sus productos.`
  );

  container.innerHTML = `
    <!-- Tooltip badge (desktop) -->
    <span class="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-white text-brand-charcoal-800 text-xs font-bold shadow-soft border border-brand-cream-200 transition-transform duration-200 hover:scale-105">
      💬 ¿Consultas? ¡Escríbenos!
    </span>

    <!-- Bubble Button -->
    <a 
      href="${chatUrl}" 
      target="_blank" 
      rel="noopener noreferrer"
      class="touch-target w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-subtle focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      aria-label="Contactar por WhatsApp a ${BUSINESS_CONFIG.name}"
    >
      <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 1.002.894 1.488.948 1.705 1.035.217.087.346.072.476-.073.13-.145.563-.651.708-.882.145-.231.289-.188.491-.116.202.073 1.288.607 1.512.723.224.116.376.173.433.26.058.087.058.506-.086.911z"/>
      </svg>
    </a>
  `;

  return container;
}
