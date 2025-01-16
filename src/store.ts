import { create } from "zustand";
import { addItemToCart, getCartTotal } from "./utils";

type Cart = Record<number, any>;

interface CartStore {
  items: Cart;

  init(cart: Cart): void;
  addToCart(item: any): void;
  updateQuantity(id: number, quantity: number): void;
  getTotal(): number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: {},

  init(cart: Cart) {
    set(() => ({ items: cart }));
  },

  addToCart: (item: any) => {
    set((state) => ({
      items: addItemToCart(state.items, item),
    }));
  },

  updateQuantity: (id: number, quantity: number) => {
    const item = get().items[id];

    set((state) => ({
      items: { ...state.items, [item.id]: { ...item, quantity } },
    }));
  },

  getTotal() {
    return getCartTotal(Object.values(get().items));
  },
}));
