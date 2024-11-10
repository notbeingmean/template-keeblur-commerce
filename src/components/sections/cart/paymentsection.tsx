"use client";
import React, { useCallback } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCartItem from "@/hooks/useCart";

import Checkout from "@/components/checkout";
import { ProductType } from "@/lib/fetch";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

type PaymentSectionProps = {
  products: ProductType;
};

function PaymentSection({ products }: PaymentSectionProps) {
  const { items, removeItem, updateItem, shippingMethod } = useCartItem();

  const findProduct = useCallback(
    (id: string) => {
      return products.find((p) => p.product_id === id);
    },
    [products]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const product = findProduct(item.product_id);
    return (
      sum + (product ? product.price * item.quantity : 0) + shippingMethod.price
    );
  }, 0);

  return (
    <main className="">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: totalPrice,
          currency: "thb",
          locale: "th",
          appearance: {
            theme: "flat",
            variables: {
              fontFamily: "'Noto Sans Thai', system-ui, sans-serif",
            },
          },
          fonts: [
            {
              cssSrc:
                "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap",
            },
          ],
        }}
      >
        <Checkout amount={totalPrice} />
      </Elements>
    </main>
  );
}

export default PaymentSection;
