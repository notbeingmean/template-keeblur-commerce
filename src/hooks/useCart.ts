/* eslint-disable no-unused-vars */
import { client } from "@/server/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  cart_item_id: string;
  quantity: number;
  cart_id: string;
  product_id: string;
};

type CartItemState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cart_item_id: string) => void;
  fetchItems: () => Promise<void>;
};

const useCartItem = create<CartItemState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (cart_item_id) =>
        set((state) => ({
          items: state.items.filter((i) => i.cart_item_id !== cart_item_id),
        })),
      fetchItems: async () => {
        const { data, error } = await client.api.cart.get({});
        if (error) {
          return;
        }

        set(() => ({ items: data.cartItems }));
      },
    }),
    { name: "cart-item-storage" }
  )
);

export default useCartItem;
