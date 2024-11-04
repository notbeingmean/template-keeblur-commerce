import Elysia from "elysia";
import { authRouter } from "./auth";
import cartRouter from "./cart/cart";

const privateRouter = new Elysia().use(authRouter).use(cartRouter);

export default privateRouter;
