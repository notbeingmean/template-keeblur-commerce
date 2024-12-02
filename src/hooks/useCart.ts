/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { client } from "@/server/client";
import debounce from "lodash/debounce";
import { authClient } from "@/lib/auth-client";
import { fetchAddress } from "@/lib/fetch";

type CartItem = {
  cart_item_id: string;
  quantity: number;
  cart_id: string;
  product_id: string;
};

type CartItemState = {
  items: CartItem[];
  shippingMethod: {
    type: string;
    price: number;
  };
  addressId: string;
  setAddressId: (addressId: string) => void;
  setShippingMethod: (shippingMethod: { type: string; price: number }) => void;
  addItem: (product_id: string, quantity: number) => void;
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
        shippingMethod: {
          type: "standard",
          price: 100,
        },
        addressId: "",
        setAddressId: (addressId) => {
          set({ addressId });
        },
        setShippingMethod: (shippingMethod) => {
          set({ shippingMethod });
        },
        addItem: async (product_id, quantity) => {
          const { data, error } = await client.api.cart.post({
            product_id,
            quantity,
          });

          if (error?.status === 401) {
            return set((state) => ({
              items: state.items.map((i) =>
                i.product_id === product_id ? { ...i, quantity } : i
              ),
            }));
          }

          if (error) {
            console.error("Failed to add item to cart:", error);
            return;
          }

          set((state) => ({
            items: [...state.items, data],
          }));
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
            const auth = await authClient.getSession();
            if (!auth.data?.session) return;
            const { data, error } = await client.api.cart.get({});

            const address = await fetchAddress();
            const filter = address.filter((item) => item.priority === 0);

            if (!filter.length) return;

            const addressId = filter[0].address_id || "";

            if (error) throw error;
            set({ items: data?.cartItems });
            set({ addressId });
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
      partialize: (state) => ({
        items: state.items,
        addressId: state.addressId,
      }),
    }
  )
);

export default useCartItem;
