import type { CartItem, CartState, OrderDeliveryMode, Product } from '../types';

const STORAGE_KEY = 'panaderia_olivo_cart';
const CURRENT_CART_VERSION = 1;

class CartStore {
  private state: CartState;

  constructor() {
    this.state = this.loadFromStorage();
  }

  /**
   * Carga el estado inicial desde localStorage con validación de versión.
   */
  private loadFromStorage(): CartState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.getDefaultState();

      const parsed = JSON.parse(raw) as Partial<CartState>;
      // Migración de versión si el esquema cambia a futuro
      if (parsed.version !== CURRENT_CART_VERSION || !Array.isArray(parsed.items)) {
        console.warn('Versión de carrito desactualizada o corrupta. Inicializando estado limpio.');
        return this.getDefaultState();
      }

      return {
        version: CURRENT_CART_VERSION,
        items: parsed.items.filter((it) => it && it.product && it.cantidad > 0),
        modalidad: parsed.modalidad === 'consulta_envio' ? 'consulta_envio' : 'retiro',
        comentario: typeof parsed.comentario === 'string' ? parsed.comentario : '',
      };
    } catch (err) {
      console.error('Error al cargar carrito desde localStorage:', err);
      return this.getDefaultState();
    }
  }

  private getDefaultState(): CartState {
    return {
      version: CURRENT_CART_VERSION,
      items: [],
      modalidad: 'retiro',
      comentario: '',
    };
  }

  /**
   * Guarda el estado actual en localStorage y emite el evento global.
   */
  private persistAndNotify(addedItem?: CartItem): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.error('Error guardando en localStorage:', err);
    }

    const totalItems = this.getTotalItems();
    const totalPrice = this.getTotalPrice();

    window.dispatchEvent(
      new CustomEvent('cart:updated', {
        detail: {
          state: { ...this.state },
          totalItems,
          totalPrice,
        },
      })
    );

    if (addedItem) {
      window.dispatchEvent(
        new CustomEvent('cart:item-added', {
          detail: { item: addedItem },
        })
      );
    }
  }

  public getState(): CartState {
    return { ...this.state, items: [...this.state.items] };
  }

  public getTotalItems(): number {
    return this.state.items.reduce((acc, item) => acc + item.cantidad, 0);
  }

  public getTotalPrice(): number {
    return this.state.items.reduce(
      (acc, item) => acc + item.product.precio * item.cantidad,
      0
    );
  }

  /**
   * Agrega un producto o incrementa su cantidad si ya existía.
   */
  public addItem(product: Product, cantidad: number = 1, notas?: string): void {
    if (cantidad <= 0) return;

    const existingIndex = this.state.items.findIndex((it) => it.product.id === product.id);

    let affectedItem: CartItem;

    if (existingIndex > -1 && this.state.items[existingIndex]) {
      const existing = this.state.items[existingIndex]!;
      existing.cantidad += cantidad;
      if (notas !== undefined && notas.trim() !== '') {
        existing.notas = notas;
      }
      affectedItem = existing;
    } else {
      const newItem: CartItem = {
        product,
        cantidad,
        notas,
      };
      this.state.items.push(newItem);
      affectedItem = newItem;
    }

    this.persistAndNotify(affectedItem);
  }

  /**
   * Modifica la cantidad de un producto. Si la cantidad es <= 0 se elimina.
   */
  public updateQuantity(productId: string, cantidad: number): void {
    if (cantidad <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.state.items.find((it) => it.product.id === productId);
    if (item) {
      item.cantidad = cantidad;
      this.persistAndNotify();
    }
  }

  /**
   * Elimina un producto del carrito.
   */
  public removeItem(productId: string): void {
    const beforeCount = this.state.items.length;
    this.state.items = this.state.items.filter((it) => it.product.id !== productId);
    if (this.state.items.length !== beforeCount) {
      this.persistAndNotify();
    }
  }

  /**
   * Actualiza notas para un producto específico.
   */
  public updateItemNotes(productId: string, notas: string): void {
    const item = this.state.items.find((it) => it.product.id === productId);
    if (item) {
      item.notas = notas;
      this.persistAndNotify();
    }
  }

  /**
   * Cambia la modalidad de entrega (retiro o consulta de envío).
   */
  public setDeliveryMode(modalidad: OrderDeliveryMode): void {
    if (this.state.modalidad !== modalidad) {
      this.state.modalidad = modalidad;
      this.persistAndNotify();
    }
  }

  /**
   * Guarda notas o comentarios adicionales del cliente.
   */
  public setComment(comentario: string): void {
    this.state.comentario = comentario;
    this.persistAndNotify();
  }

  /**
   * Vacía el carrito por completo.
   */
  public clearCart(): void {
    this.state.items = [];
    this.state.comentario = '';
    this.persistAndNotify();
  }

  /**
   * Emite evento para abrir o cerrar el drawer del carrito.
   */
  public toggleDrawer(open?: boolean): void {
    window.dispatchEvent(
      new CustomEvent('cart:toggle', {
        detail: { open },
      })
    );
  }
}

// Instancia singleton para toda la aplicación
export const cartStore = new CartStore();
