import Elysia from "elysia";

export const router = new Elysia().get("/hi", () => "Hello, World!");
