/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const publicEnv = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string().default("http://localhost:3000"),
});

const privateEnv = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof publicEnv>,
        z.infer<typeof privateEnv> {}
  }
}
