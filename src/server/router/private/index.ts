import Elysia from "elysia";
import { authRouter } from "./auth";

const privateRouter = new Elysia().use(authRouter);

export default privateRouter;
