import type { BusinessConfig, CartState } from '../types';
import { formatCLP } from './currency';

/**
 * Construye el mensaje preformateado para WhatsApp con el pedido del cliente.
 */
export function buildWhatsAppMessage(state: CartState, business: BusinessConfig): string {
  const modalidadTexto =
    state.modalidad === 'retiro'
      ? 'Retiro en Panadería (Local)'
      : 'Consulta de Envío a Domicilio / Disponibilidad';

  const totalCalculado = state.items.reduce(
    (sum, item) => sum + item.product.precio * item.cantidad,
    0
  );

  const itemsList = state.items
    .map((item) => {
      const subtotal = item.product.precio * item.cantidad;
      let line = `• ${item.cantidad}x *${item.product.nombre}* (${formatCLP(subtotal)})`;
      if (item.notas && item.notas.trim().length > 0) {
        line += `\n   └ _Nota: ${item.notas.trim()}_`;
      }
      return line;
    })
    .join('\n');

  let commentSection = '';
  if (state.comentario && state.comentario.trim().length > 0) {
    commentSection = `\n📝 *Comentarios del Cliente:*\n"${state.comentario.trim()}"\n`;
  }

  const message = [
    `🥖 *NUEVO PEDIDO — ${business.name}*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📍 *Modalidad:* ${modalidadTexto}`,
    ``,
    `📋 *Detalle del Pedido:*`,
    itemsList,
    ``,
    `💰 *TOTAL ESTIMADO:* *${formatCLP(totalCalculado)} CLP*`,
    commentSection,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `_Hola, quiero coordinar este pedido realizado desde su catálogo web. ¿Me confirman disponibilidad y tiempos? ¡Muchas gracias!_`,
  ]
    .filter((line) => line !== '')
    .join('\n');

  return message;
}

/**
 * Genera el enlace wa.me directo para enviar el pedido.
 */
export function getWhatsAppCheckoutUrl(state: CartState, business: BusinessConfig): string {
  const message = buildWhatsAppMessage(state, business);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encodedText}`;
}

/**
 * Genera el enlace wa.me para el botón flotante de consulta rápida.
 */
export function getWhatsAppDirectUrl(business: BusinessConfig, initialText?: string): string {
  const text =
    initialText ||
    `Hola ${business.name}, estuve viendo su catálogo online y me gustaría hacer una consulta.`;
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
