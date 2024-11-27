import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import Elysia, { t } from "elysia";

export const productDetailRouter = new Elysia().post(
  "/product-detail",
  async ({ body }) => {
    try {
      const productDetail = await db.product_Detail.create({
        data: {
          product: {
            connect: {
              product_id: body.product_id,
            },
          },
          name: body.name,
          value: body.value,
        },
      });

      return productDetail;
    } catch (error) {
      throw HttpError.Internal("Internal Server Error" + error);
    }
  },
  {
    body: t.Object({
      product_id: t.String(),
      name: t.String(),
      value: t.String(),
    }),
  }
);
