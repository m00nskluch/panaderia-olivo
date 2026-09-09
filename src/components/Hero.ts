import { BUSINESS_CONFIG } from '../data/business';
import { getWhatsAppDirectUrl } from '../utils/whatsapp';

export function createHero(): HTMLElement {
  const hero = document.createElement('section');
  hero.className = 'relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 lg:pb-24';
  hero.id = 'hero';

  const whatsappDirect = getWhatsAppDirectUrl(
    BUSINESS_CONFIG,
    'Hola Panadería El Olivo, quisiera hacer un pedido para hoy.'
  );

  hero.innerHTML = `
    <!-- Background subtle warmth -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold-100/60 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-brand-red-100/40 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        <!-- Left Column: Copy & CTAs -->
        <div class="lg:col-span-7 text-left space-y-6 sm:space-y-8">
          
          <!-- Top badge -->
          <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-gold-50 border border-brand-gold-200 text-brand-gold-800 text-xs sm:text-sm font-semibold shadow-xs">
            <span class="flex h-2 w-2 rounded-full bg-brand-gold-500 animate-pulse"></span>
            <span>Tradición Panadera en Santiago de Chile</span>
            <span class="text-brand-gold-400">•</span>
            <span class="font-bold text-brand-red-700">Horneadas del Día</span>
          </div>

          <!-- Main Title -->
          <div class="space-y-3">
            <h1 class="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal-900 tracking-tight leading-[1.1]">
              El sabor del pan caliente y la repostería de verdad en
              <span class="text-brand-red-700 block mt-1 underline decoration-brand-gold-400 decoration-wavy decoration-2">
                ${BUSINESS_CONFIG.name}
              </span>
            </h1>
            <p class="text-base sm:text-lg text-brand-charcoal-700 max-w-2xl font-normal leading-relaxed">
              Marraquetas crujientes a la piedra, empanadas de pino recién doradas, tortas artesanales y rotisería del día. 
              Arma tu pedido online en segundos y recíbelo coordinado por WhatsApp.
            </p>
          </div>

          <!-- Badges Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-brand-cream-200 shadow-xs">
              <span class="text-xl">🥖</span>
              <div>
                <p class="text-xs font-bold text-brand-charcoal-900 leading-none">Pan Caliente</p>
                <p class="text-[11px] text-brand-charcoal-600 mt-0.5">Sale cada 2 horas</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-brand-cream-200 shadow-xs">
              <span class="text-xl">🏪</span>
              <div>
                <p class="text-xs font-bold text-brand-charcoal-900 leading-none">Retiro en Local</p>
                <p class="text-[11px] text-brand-charcoal-600 mt-0.5">Listo sin filas</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-brand-cream-200 shadow-xs col-span-2 sm:col-span-1">
              <span class="text-xl">⚡</span>
              <div>
                <p class="text-xs font-bold text-brand-charcoal-900 leading-none">Atención Rápida</p>
                <p class="text-[11px] text-brand-charcoal-600 mt-0.5">WhatsApp directo</p>
              </div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a 
              href="#catalogo" 
              class="touch-target inline-flex items-center justify-center gap-2.5 bg-brand-red-700 hover:bg-brand-red-800 active:scale-95 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-200"
            >
              <span>Explorar Catálogo</span>
              <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </a>

            <a 
              href="${whatsappDirect}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="touch-target inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-200"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 1.002.894 1.488.948 1.705 1.035.217.087.346.072.476-.073.13-.145.563-.651.708-.882.145-.231.289-.188.491-.116.202.073 1.288.607 1.512.723.224.116.376.173.433.26.058.087.058.506-.086.911z"/>
              </svg>
              <span>Hacer Pedido al WhatsApp</span>
            </a>
          </div>

        </div>

        <!-- Right Column: Visual Showcase -->
        <div class="lg:col-span-5 relative">
          
          <div class="relative mx-auto max-w-md lg:max-w-none">
            
            <!-- Main Hero Image Frame -->
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-brand-charcoal-900 group aspect-[4/3] sm:aspect-[16/11]">
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=85" 
                alt="Panadería El Olivo - Panes y empanadas recién horneados"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal-950/80 via-brand-charcoal-900/20 to-transparent"></div>

              <!-- Bottom caption on image -->
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-widest text-brand-gold-400">100% Artesanal</p>
                    <p class="font-display font-bold text-lg text-white">Marraquetas & Hallullas al Horno</p>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg bg-brand-red-700/90 text-white font-black text-xs">
                    Desde $1.990 / kg
                  </span>
                </div>
              </div>
            </div>

            <!-- Floating Card 1: Empanadas calientes -->
            <div class="absolute -bottom-6 -left-6 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-soft-lg border border-brand-cream-200 hidden xs:flex items-center gap-3 max-w-[240px] animate-bounce-short">
              <div class="w-11 h-11 rounded-xl bg-brand-gold-100 flex items-center justify-center text-xl shrink-0">
                🥟
              </div>
              <div>
                <p class="text-xs font-bold text-brand-charcoal-900">Empanada de Pino</p>
                <p class="text-[11px] text-brand-red-700 font-extrabold">$2.800 • Carne picada</p>
              </div>
            </div>

            <!-- Floating Card 2: Satisfacción local -->
            <div class="absolute -top-5 -right-4 sm:-right-6 bg-brand-charcoal-900 text-white px-3.5 py-2.5 rounded-2xl shadow-soft-lg border border-brand-charcoal-700 flex items-center gap-2.5">
              <div class="flex -space-x-1 text-amber-400 text-xs">
                ★★★★★
              </div>
              <p class="text-xs font-semibold text-brand-cream-100">Favorito del barrio</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  `;

  return hero;
}
