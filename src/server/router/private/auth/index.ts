import { auth } from "@/lib/auth";
import Elysia, { Context } from "elysia";

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.error(405);
  }
};

export const authRouter = new Elysia().all("/auth/*", betterAuthView);
