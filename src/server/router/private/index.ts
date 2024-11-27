import Elysia from "elysia";
import { authRouter } from "./auth";
import cartRouter from "./cart/cart";
import { orderRouter } from "./order/order";
import { addressRouter } from "./address/address";
import { productRouter } from "./products/product";
import { productDetailRouter } from "./products/product-detail";

const privateRouter = new Elysia()
  .use(authRouter)
  .use(cartRouter)
  .use(orderRouter)
  .use(addressRouter)
  .use(productRouter)
  .use(productDetailRouter);

export default privateRouter;
