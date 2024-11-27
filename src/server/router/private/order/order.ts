import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import { delay } from "@/lib/utils";
import userMiddleware from "@/server/middlewares/userMiddleware";
import Elysia, { t } from "elysia";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const orderRouter = new Elysia()
  .derive(({ request }) => userMiddleware(request))
  .post(
    "/create-payment-intent",
    async ({ body, user }) => {
      const { amount, address_id } = body;
      try {
        if (!user) throw HttpError.Unauthorized();

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "thb",
          automatic_payment_methods: { enabled: true },
          metadata: {
            user_id: user?.id,
            address_id: address_id,
          },
        });

        //create order here

        return { client_secret: paymentIntent.client_secret };
      } catch (error) {
        throw HttpError.Internal(
          "Internal Server Error",
          JSON.stringify(error)
        );
      }
    },
    {
      body: t.Object({
        amount: t.Number(),
        address_id: t.String(),
      }),
    }
  )
  .post("/stripe/webhook", async ({ request, set }) => {
    const rawBody = await request.text();
    const signature = request.headers.get("Stripe-Signature");

    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        rawBody,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.log(`❌ Error message: ${err}`);
      set.status = 400;
      throw new Error(`Webhook Error: ${err}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const address = await db.address.findUnique({
        where: {
          address_id: paymentIntent.metadata.address_id,
        },
      });

      const cart = await db.cart.findUnique({
        where: {
          user_id: paymentIntent.metadata.user_id,
        },
        include: {
          cartItems: true,
        },
      });

      await delay(1000);
      if (!cart) throw new Error("Cart not found");

      const order = await db.order.create({
        data: {
          user_id: paymentIntent.metadata.user_id,
          totalAmount: paymentIntent.amount,
          status: "paid",
          orderDetail: {
            create: cart.cartItems.map((item) => ({
              productId: item.product_id,
              quantity: item.quantity,
            })),
          },
          shipping: {
            create: {
              address_id: paymentIntent.metadata.address_id,
            },
          },
        },
      });

      await db.cart_Item.deleteMany({
        where: {
          cart_id: cart.cart_id,
        },
      });
    }
    set.status = 200;
    return "success";
  });
