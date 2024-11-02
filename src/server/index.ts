import Elysia from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { router } from "./router";

const app = new Elysia({ prefix: "/api" })
  .use(
    staticPlugin({
      assets: process.cwd() + "/public",
    }),
  )
  .use(router);

export type App = typeof app;
export default app;
