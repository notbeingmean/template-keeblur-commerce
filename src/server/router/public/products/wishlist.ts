import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import userMiddleware from "@/server/middlewares/userMiddleware";
import Elysia, { t } from "elysia";

export const wishlistRouter = new Elysia()
  .derive(({ request }) => userMiddleware(request))
  .get("/wishlist", async ({ user }) => {
    try {
      if (!user) throw HttpError.Unauthorized();

      const wishlist = await db.wishlist.findUnique({
        where: {
          user_id: user.id,
        },
        include: {
          products: {
            include: {
              images: true,
            },
          },
        },
      });

      if (!wishlist) {
        const newWishlist = await db.wishlist.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
          },
          include: {
            products: {
              include: {
                images: true,
              },
            },
          },
        });

        return newWishlist;
      }

      return wishlist;
    } catch (error) {
      throw HttpError.Internal("Internal Server Error" + error);
    }
  })
  .patch(
    "/wishlist/:id",
    async ({ params: { id }, body }) => {
      try {
        const wishlist = await db.wishlist.update({
          where: {
            wishlist_id: id,
          },
          data: {
            products: {
              connect: {
                product_id: body.product_id,
              },
            },
            user: {
              connect: {
                id: body.user_id,
              },
            },
          },
          include: {
            products: {
              include: {
                images: true,
              },
            },
          },
        });

        return wishlist;
      } catch (error) {
        throw HttpError.Internal("Internal Server Error" + error);
      }
    },
    {
      body: t.Object({
        product_id: t.String(),
        user_id: t.String(),
      }),
    }
  )
  .delete(
    "/wishlist/:id",
    async ({ params: { id }, body: { product_id } }) => {
      try {
        const wishlist = await db.wishlist.update({
          where: {
            wishlist_id: id,
          },
          data: {
            products: {
              disconnect: {
                product_id,
              },
            },
          },
        });

        return wishlist;
      } catch (error) {
        throw HttpError.Internal("Internal Server Error" + error);
      }
    },
    {
      body: t.Object({
        product_id: t.String(),
      }),
    }
  );
