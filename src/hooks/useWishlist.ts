/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { authClient } from "@/lib/auth-client";
import { fetchProduct, fetchWishlist, WishlistType } from "@/lib/fetch";
import { client } from "@/server/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  wishlists: WishlistType;
  addWishlist: (product_id: string) => void;
  removeWishlist: (product_id: string) => void;
  fetchWishlists: () => Promise<void>;
  clearWishlist: () => void;
};

const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlists: {
        wishlist_id: "",
        user_id: "",
        products: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      addWishlist: async (product_id: string) => {
        // const { error } = await client.api.wishlist.post({
        //   product_id,
        // });
        // if (error) {
        //   console.error("Failed to add product to wishlist:", error);
        // }
        const id = get().wishlists?.wishlist_id;
        if (!id) return;
        const { data: auth, error: authError } = await authClient.getSession();
        if (!auth) return;

        const { data, error } = await client.api
          .wishlist({
            id: id,
          })
          .patch({
            product_id: product_id,
            user_id: auth.user.id,
          });

        if (error) {
          console.error("Failed to add product to wishlist:", error);
          return;
        }

        set({ wishlists: data });
      },
      removeWishlist: async (product_id: string) => {
        //   const { error } = await client.api.wishlist.delete({
        //     product_id,
        //   });
        //   if (error) {
        //     console.error("Failed to remove product from wishlist:", error);
        //   }
      },
      fetchWishlists: async () => {
        const user = await authClient.getSession();

        if (!user) {
          return;
        }
        const data = await fetchWishlist();

        if (!data) {
          return;
        }

        set({ wishlists: data });
      },
      clearWishlist: () =>
        set({
          wishlists: {
            wishlist_id: "",
            user_id: "",
            products: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
    }),
    {
      name: "wishlist",
      partialize: (state) => ({
        wishlists: state.wishlists,
      }),
    }
  )
);

export default useWishlist;
