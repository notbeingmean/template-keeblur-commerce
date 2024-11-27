import Elysia from "elysia";
import categoriesPublicRouter from "./categories/categories";
import productsPublicRouter from "./products/products";
import autocomplete from "./autocomplete/autocomplete";
import { wishlistRouter } from "./products/wishlist";

const publicRouter = new Elysia()
  .use(categoriesPublicRouter)
  .use(productsPublicRouter)
  .use(autocomplete)
  .use(wishlistRouter);

export default publicRouter;
