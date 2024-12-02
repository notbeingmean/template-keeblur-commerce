import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import Elysia, { t } from "elysia";

export const productRouter = new Elysia()
  .post(
    "/products",
    async ({ body }) => {
      try {
        const product = await db.product.create({
          data: {
            ...body,
            category: {
              connect: body.category_id.map((id: string) => ({
                category_id: id,
              })),
            },
            images: {
              connect: body.images?.map((image: string) => ({
                image_id: image,
              })),
            },
            productDetail: {
              create: {
                name: body.name,
                value: body.productDetail?.value ?? "",
              },
            },
          },
        });

        return product;
      } catch (error) {
        throw HttpError.Internal("Internal Server Error" + error);
      }
    },
    {
      body: t.Object({
        name: t.String(),
        price: t.Number(),
        description: t.String(),
        stock: t.Number(),
        slug: t.String(),
        category_id: t.Array(t.String()),
        images: t.Optional(t.Array(t.String())),
        productDetail: t.Optional(
          t.Object({
            name: t.String(),
            value: t.String(),
          })
        ),
      }),
    }
  )
  .patch(
    "/products/:slug",
    async ({ params: { slug }, body }) => {
      try {
        const product = await db.product.update({
          where: {
            slug,
          },
          data: {
            ...body,
            category: {
              set: body.category_id?.map((id: string) => ({
                category_id: id,
              })),
            },
            images: {
              set: body.images?.map((image: string) => ({
                image_id: image,
              })),
            },
          },
        });

        return product;
      } catch (error) {
        throw HttpError.Internal("Internal Server Error" + error);
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        price: t.Optional(t.Number()),
        description: t.Optional(t.String()),
        stock: t.Optional(t.Number()),
        slug: t.Optional(t.String()),
        category_id: t.Optional(t.Array(t.String())),
        images: t.Optional(t.Array(t.String())),
      }),
      params: t.Object({
        slug: t.String(),
      }),
    }
  );
