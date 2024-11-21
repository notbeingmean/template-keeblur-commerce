import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import Elysia, { t } from "elysia";

const productsPublicRouter = new Elysia()
  .get(
    "/products",
    async ({ query }) => {
      try {
        if (query.category) {
          const products = await db.product.findMany({
            skip: query.skip,
            take: query.take,
            where: {
              category: {
                none: {
                  category_id: {
                    in: query.category,
                  },
                },
              },
            },
            include: {
              images: true,
            },
          });
          return products;
        }

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
        category: t.Optional(t.Array(t.String())),
        page: t.Optional(t.Number()),
      }),
    }
  )
  .get(
    "/products/:slug",
    async ({ params: { slug } }) => {
      try {
        const product = await db.product.findUnique({
          where: {
            slug,
          },
          include: {
            images: true,
          },
        });

        if (!product) {
          throw HttpError.NotFound("Product not found");
        }

        return product;
      } catch (error) {
        throw HttpError.Internal("Internal Server Error" + error);
      }
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    }
  );

export default productsPublicRouter;
