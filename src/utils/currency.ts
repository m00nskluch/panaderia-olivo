const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

/**
 * Formatea un monto numérico en formato de Pesos Chilenos (CLP).
 * Ejemplo: 1990 -> "$ 1.990"
 */
export function formatCLP(amount: number): string {
  return clpFormatter.format(amount);
}
