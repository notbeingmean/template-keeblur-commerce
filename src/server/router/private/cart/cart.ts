import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import userMiddleware from "@/server/middlewares/userMiddleware";
import Elysia, { t } from "elysia";

const cartRouter = new Elysia()
  .derive(({ request }) => userMiddleware(request))
  .get("/cart", async ({ user, session }) => {
    try {
      const cart = await db.cart.findFirst({
        where: {
          user_id: user?.id,
        },
        include: {
          cartItems: true,
        },
      });

      if (!cart) {
        throw HttpError.NotFound("Cart not found");
      }

      return cart;
    } catch (error) {
      throw HttpError.Internal("Internal server error", error);
    }
  });

export default cartRouter;
