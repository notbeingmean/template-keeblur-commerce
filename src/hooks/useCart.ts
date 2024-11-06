import { create } from "zustand";
import { persist } from "zustand/middleware";
import { client } from "@/server/client";
import debounce from "lodash/debounce";

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
  updateItem: (
    cart_id: string,
    cart_item_id: string,
    product_id: string,
    quantity: number
  ) => void;
  fetchItems: () => Promise<void>;
  clearCart: () => void;
};

const useCartItem = create<CartItemState>()(
  persist(
    (set) => {
      const debouncedUpdate = debounce(
        async (
          cart_id: string,
          cart_item_id: string,
          product_id: string,
          quantity: number
        ) => {
          const { error } = await client.api
            .cart({
              id: cart_id,
            })
            .patch({
              cart_item_id: cart_item_id,
              quantity: quantity,
              product_id: product_id,
            });

          if (error) {
            // Optionally revert the local state if the API call fails
            console.error("Failed to update cart item:", error);
          }
        },
        500
      ); // 500ms delay

      return {
        items: [],
        addItem: (item) => {
          set((state) => ({ items: [...state.items, item] }));
        },
        removeItem: (cart_item_id) => {
          set((state) => ({
            items: state.items.filter((i) => i.cart_item_id !== cart_item_id),
          }));
        },
        updateItem: (cart_id, cart_item_id, product_id, quantity) => {
          if (quantity <= 0) return;

          set((state) => ({
            items: state.items.map((i) =>
              i.cart_item_id === cart_item_id ? { ...i, quantity } : i
            ),
          }));

          debouncedUpdate(cart_id, cart_item_id, product_id, quantity);
        },
        fetchItems: async () => {
          try {
            const { data, error } = await client.api.cart.get({});
            if (error) throw error;
            set({ items: data.cartItems });
          } catch (error) {
            console.error("Failed to fetch cart items:", error);
          }
        },
        clearCart: () => {
          set({ items: [] });
        },
      };
    },
    {
      name: "cart-item-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartItem;
