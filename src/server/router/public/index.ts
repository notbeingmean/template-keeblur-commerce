import Elysia from "elysia";
import categoriesPublicRouter from "./categories/categories";
import productsPublicRouter from "./products/products";
import autocomplete from "./autocomplete/autocomplete";

const publicRouter = new Elysia()
  .use(categoriesPublicRouter)
  .use(productsPublicRouter)
  .use(autocomplete);

export default publicRouter;
