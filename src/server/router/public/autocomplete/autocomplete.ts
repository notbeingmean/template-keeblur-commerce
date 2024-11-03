import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import Elysia, { t } from "elysia";

const autocomplete = new Elysia().get(
  "/autocomplete",
  async ({ query }) => {
    try {
      const { keyword } = query;

      const categories = await db.category.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });

      const products = await db.product.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });

      const categoriesFilter = categories.map((category) => ({
        type: "category",
        name: category.name,
        slug: category.slug,
      }));

      const productsFilter = products.map((product) => ({
        type: "product",
        name: product.name,
        slug: product.slug,
      }));

      return [...categoriesFilter, ...productsFilter];
    } catch (error) {
      throw HttpError.Internal("Internal Server Error" + error);
    }
  },
  {
    query: t.Object({
      keyword: t.String(),
    }),
  }
);

export default autocomplete;
