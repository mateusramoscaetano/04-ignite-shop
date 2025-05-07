import { create } from "zustand";

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  calculateTotal: () => void;
  ensureItemsHavePriceId: () => void;
}

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  priceId: string;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clearCart: () => set({ items: [] }),
  total: 0,
  calculateTotal: () =>
    set((state) => ({
      total: state.items.reduce((acc, item) => {
        const priceValue = item.price.replace(/[^\d,]/g, "").replace(",", ".");
        return acc + Number(priceValue);
      }, 0),
    })),
  ensureItemsHavePriceId: () =>
    set((state) => {
      const validItems = state.items.filter((item) => item.priceId);
      console.log("Itens válidos após filtragem:", validItems);
      return { items: validItems };
    }),
}));
