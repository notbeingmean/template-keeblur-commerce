# Template Keeblur

this is a template for e-commerce website to sell products and services and to manage the orders and the customers.

## Technologies

[Next.js](https://nextjs.org/) - React Framework
[Bun](https://bun.sh/) - Bun is a fast JavaScript all-in-one toolkit
[Elysia](https://elysiajs.com/) - Elysia is a modern, fast and lightweight web framework for bun
[Shadcn](https://www.shadcn.com/) - UI Library
[Stripe](https://stripe.com/) - Payment Gateway
[Prisma](https://www.prisma.io/) - Database ORM
[Supabase](https://supabase.io/) - Storage for images
[Neon](https://neon.tech/) - Serverless Postgres
[BetterAuth](https://www.better-auth.com/) - for authentication

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

```bash
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_CLIENT_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

DATABASE_URL=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

SERVER_PORT=

```
