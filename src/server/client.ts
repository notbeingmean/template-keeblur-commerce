import { treaty } from "@elysiajs/eden";
import type { App } from ".";

export const client = treaty<App>(process.env.NEXT_PUBLIC_SERVER_URL);
