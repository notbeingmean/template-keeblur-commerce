import Elysia from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { router } from "./router";
import cors from "@elysiajs/cors";

const app = new Elysia({ prefix: "/api" })
  .use(
    staticPlugin({
      assets: process.cwd() + "/public",
    })
  )
  .use(cors())
  .use(router);
// .listen(process.env.SERVER_PORT);

export type App = typeof app;
export default app;
