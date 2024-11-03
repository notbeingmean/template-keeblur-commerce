import Elysia from "elysia";
import { authRouter } from "./(private)/auth";
import categoriesPublicRouter from "./(public)/categories/categories";

export const router = new Elysia().use(authRouter).use(categoriesPublicRouter);
