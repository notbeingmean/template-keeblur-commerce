import Elysia from "elysia";
import { authRouter } from "./auth";
import cartRouter from "./cart/cart";
import { orderRouter } from "./order/order";
import { addressRouter } from "./address/address";

const privateRouter = new Elysia()
  .use(authRouter)
  .use(cartRouter)
  .use(orderRouter)
  .use(addressRouter);

export default privateRouter;
