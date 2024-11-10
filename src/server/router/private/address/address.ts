import { HttpError } from "@/lib/error";
import { db } from "@/lib/prisma";
import userMiddleware from "@/server/middlewares/userMiddleware";
import Elysia from "elysia";

export const addressRouter = new Elysia()
  .derive(({ request }) => userMiddleware(request))
  .get("/address", async ({ user }) => {
    // if (!user) throw HttpError.Unauthorized("Unauthorized");
    const addresses = await db.address.findMany({
      where: {
        user_id: user?.id,
      },
    });

    // if (!addresses) throw HttpError.NotFound("No addresses found");

    return addresses;
  });
