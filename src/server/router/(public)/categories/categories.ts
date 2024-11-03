import { db } from "@/lib/prisma";
import { HttpError } from "@/lib/error";
import Elysia, { t } from "elysia";

const categoriesPublicRouter = new Elysia()
  .get(
    "/categories",
    async ({ query }) => {
      try {
        const categories = await db.category.findMany({
          include: {
            products: {
              skip: query.skip,
              take: query.take,
            },
          },
        });

        return categories;
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
  )
  .get(
    "/categories/:id",
    async ({ params }) => {
      try {
        const { id } = params;

        const category = await db.category.findUnique({
          where: {
            category_id: id,
          },
        });

        if (!category) {
          throw HttpError.NotFound("Category not found");
        }

        return category;
      } catch (error) {
        throw HttpError.Internal("Internal Server Error" + error);
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );

export default categoriesPublicRouter;
