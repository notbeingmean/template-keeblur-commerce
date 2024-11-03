import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import Elysia, { t } from "elysia";

const productsPublicRouter = new Elysia().get(
  "/products",
  async ({ query }) => {
    try {
      const products = await db.product.findMany({
        skip: query.skip,
        take: query.take,
        include: {
          images: true,
        },
      });

      return products;
    } catch (error) {
      throw HttpError.Internal("Internal Server Error" + error);
    }
  },
  {
    query: t.Object({
      skip: t.Optional(t.Number()),
      take: t.Optional(t.Number()),
    }),
  }
);

export default productsPublicRouter;
