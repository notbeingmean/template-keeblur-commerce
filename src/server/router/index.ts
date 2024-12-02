import Elysia from "elysia";

import publicRouter from "./public";
import privateRouter from "./private";

export const router = new Elysia().use(publicRouter).use(privateRouter);
