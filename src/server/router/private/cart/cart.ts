import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import userMiddleware from "@/server/middlewares/userMiddleware";
import Elysia, { t } from "elysia";

const cartRouter = new Elysia()
  .derive(({ request }) => userMiddleware(request))
  .get("/cart", async ({ user }) => {
    try {
      if (!user) throw HttpError.Unauthorized("Unauthorized");
      const cart = await db.cart.findUnique({
        where: {
          user_id: user?.id,
        },
        include: {
          cartItems: true,
        },
      });

      if (!cart) {
        await db.cart.create({
          data: {
            user: {
              connect: {
                id: user?.id,
              },
            },
          },
        });

        return {
          cartItems: [],
        };
      }

      return cart;
    } catch (error) {
      throw HttpError.Internal("Internal server error", error);
    }
  })
  .patch(
    "/cart/:id",
    async ({ params, body }) => {
      try {
        const cart = await db.cart.update({
          where: {
            cart_id: params.id,
          },
          data: {
            cartItems: {
              update: {
                where: {
                  cart_item_id: body.cart_item_id,
                },
                data: {
                  quantity: body.quantity,
                },
              },
            },
          },
        });

        return cart;
      } catch (error) {
        throw HttpError.Internal("Internal server error", error);
      }
    },
    {
      body: t.Object({
        cart_item_id: t.String(),
        product_id: t.String(),
        quantity: t.Number(),
      }),
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/cart",
    async ({ user, body }) => {
      try {
        if (!user) throw HttpError.Unauthorized("Unauthorized");
        const cartItem = await db.cart_Item.create({
          data: {
            cart: {
              connect: {
                user_id: user?.id,
              },
            },
            product: {
              connect: {
                product_id: body.product_id,
              },
            },
            quantity: body.quantity,
          },
        });

        return cartItem;
      } catch (error) {
        throw HttpError.Internal("Internal server error", error);
      }
    },
    {
      body: t.Object({
        product_id: t.String(),
        quantity: t.Number(),
      }),
    }
  );

export default cartRouter;
