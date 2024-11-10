import Elysia, { t } from "elysia";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const orderRouter = new Elysia().post(
  "/create-payment-intent",
  async ({ body }) => {
    const { amount } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "thb",
      automatic_payment_methods: { enabled: true },
    });

    //create order here

    return { client_secret: paymentIntent.client_secret };
  },
  {
    body: t.Object({
      amount: t.Number(),
    }),
  }
);
