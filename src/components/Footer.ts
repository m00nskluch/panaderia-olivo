import { BUSINESS_CONFIG } from '../data/business';
import { getWhatsAppDirectUrl } from '../utils/whatsapp';

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.id = 'contacto';
  footer.className = 'bg-brand-charcoal-950 text-white pt-16 pb-12 border-t border-brand-charcoal-800';

  const whatsappDirect = getWhatsAppDirectUrl(BUSINESS_CONFIG);

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-brand-charcoal-800">
        
        <!-- Brand & Mission (Col 1 to 5) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red-700 to-brand-red-900 text-white flex items-center justify-center shadow-md">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 20a4 4 0 0 0 3.5-6 6 6 0 0 0-11-5A6 6 0 0 0 2 14a4 4 0 0 0 3.5 6h12.5z"/>
                <path d="M8 14v.01"/>
                <path d="M12 12v.01"/>
                <path d="M16 14v.01"/>
              </svg>
            </div>
            <div>
              <span class="font-display font-black text-xl text-white tracking-tight">
                ${BUSINESS_CONFIG.name}
              </span>
              <p class="text-[11px] text-brand-gold-400 font-bold">
                ${BUSINESS_CONFIG.legalName}
              </p>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-brand-cream-300 leading-relaxed max-w-md">
            ${BUSINESS_CONFIG.tagline}. Elaboramos cada día el pan más fresco de Santiago, 
            pastelería con recetas tradicionales y rotisería con ingredientes de primera selección.
          </p>

          <div class="pt-2 flex items-center gap-3">
            <a 
              href="${BUSINESS_CONFIG.instagramUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-brand-charcoal-900 hover:bg-brand-red-700 text-brand-cream-200 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Instagram de Panadería El Olivo"
            >
              <svg class="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              href="${BUSINESS_CONFIG.facebookUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-brand-charcoal-900 hover:bg-brand-red-700 text-brand-cream-200 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Facebook de Panadería El Olivo"
            >
              <svg class="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.556 0 9 1.556 9 4.667V8z"/>
              </svg>
            </a>

            <a 
              href="${whatsappDirect}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-brand-charcoal-900 hover:bg-emerald-600 text-brand-cream-200 flex items-center justify-center transition-colors shadow-xs"
              aria-label="WhatsApp directo"
            >
              <svg class="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 1.002.894 1.488.948 1.705 1.035.217.087.346.072.476-.073.13-.145.563-.651.708-.882.145-.231.289-.188.491-.116.202.073 1.288.607 1.512.723.224.116.376.173.433.26.058.087.058.506-.086.911z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Location & Maps (Col 6 to 9) -->
        <div class="lg:col-span-4 space-y-3">
          <h3 class="font-display font-bold text-sm text-white uppercase tracking-wider">
            Dónde Encontrarnos
          </h3>
          <div class="space-y-2 text-xs sm:text-sm text-brand-cream-300">
            <p class="font-semibold text-white flex items-start gap-2">
              <span class="text-brand-red-500">📍</span>
              <span>${BUSINESS_CONFIG.address}</span>
            </p>
            <p class="text-xs text-brand-charcoal-400 pl-5">
              ${BUSINESS_CONFIG.addressNote}
            </p>
          </div>

          <div class="pt-2">
            <a 
              href="${BUSINESS_CONFIG.mapsUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="touch-target inline-flex items-center gap-2 bg-brand-charcoal-900 hover:bg-brand-charcoal-800 text-brand-gold-400 hover:text-brand-gold-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-brand-charcoal-700 transition-colors"
            >
              <span>Ver ubicación en Google Maps</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Schedule & Contact (Col 10 to 12) -->
        <div class="lg:col-span-3 space-y-3">
          <h3 class="font-display font-bold text-sm text-white uppercase tracking-wider">
            Horarios y Contacto
          </h3>
          
          <div class="space-y-2 text-xs text-brand-cream-300">
            <div>
              <p class="font-bold text-white">Semana:</p>
              <p>${BUSINESS_CONFIG.scheduleWeekday}</p>
            </div>
            <div>
              <p class="font-bold text-white">Fin de Semana:</p>
              <p>${BUSINESS_CONFIG.scheduleWeekend}</p>
            </div>
          </div>

          <div class="pt-2 space-y-1 text-xs">
            <p class="text-brand-charcoal-400">Teléfono directo:</p>
            <p class="font-bold text-white">${BUSINESS_CONFIG.phone}</p>
            <p class="text-brand-charcoal-400 pt-1">Pedidos WhatsApp:</p>
            <a href="${whatsappDirect}" class="font-bold text-emerald-400 hover:underline block">
              ${BUSINESS_CONFIG.whatsappDisplay}
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Copyright & Technical authorship -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-charcoal-400">
        <p>
          © ${new Date().getFullYear()} ${BUSINESS_CONFIG.legalName} • Todos los derechos reservados.
        </p>
        <div class="flex items-center gap-1.5 text-[11px]">
          <span>Desarrollado con alto rendimiento para venta digital</span>
          <span>•</span>
          <span class="text-brand-gold-400 font-semibold">Santiago, Chile</span>
        </div>
      </div>
    </div>
  `;

  return footer;
}
