
## Project info
This project uses Next.js for the frontend and Payload CMS with MongoDB for the
website content and admin dashboard.

## How can I edit this code?

There are several ways of editing your application.


Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. 

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Next.js
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Payload CMS
- MongoDB
- Prisma (optional / legacy tooling)

## Environment Setup

1. Copy the example environment file:

```sh
cp .env.example .env
```

2. Set the required Payload variables in `.env`:

```sh
MONGODB_URI=your-mongodb-connection-string
PAYLOAD_SECRET=your-long-random-secret
```

3. Start the development server:

```sh
npm run dev
```

## Payload Setup

Payload powers the website content, media library, and admin dashboard.

- Admin URL: `/admin`
- API URL: `/api`

Make sure `MONGODB_URI` points to a reachable MongoDB instance before running
the app locally or deploying to Vercel.

## Prisma Setup (Optional)

Prisma has been added for database access and migrations.

Only use this section if you still rely on Prisma for separate data workflows.

1. Make sure your PostgreSQL server is running and that `DATABASE_URL` in `.env`
points to it.

2. Generate the Prisma client:

```sh
npm run prisma:generate
```

3. After you add your first model in `prisma/schema.prisma`, create a local
migration:

```sh
npm run prisma:migrate -- --name init
```

Helpful commands:

```sh
npm run prisma:studio
npm run prisma:push
```

Prisma should be used from server-side code only. This Next.js app should not
connect directly to Postgres from the browser.

Note: Prisma 7 reads the database connection from `prisma.config.ts`, which in
this project loads `DATABASE_URL` from `.env`.

## How can I deploy this project?

### Vercel Checklist

Set these environment variables in Vercel:

- `MONGODB_URI`
- `PAYLOAD_SECRET`

If you still use Prisma in production, also set:

- `DATABASE_URL`

For MongoDB Atlas deployments:

- allow connections from Vercel in Atlas Network Access
- confirm the database user has permission to the target database
- verify the connection string includes the correct username, password, and
  database name

This app reads CMS content at runtime, so the site layout is configured as
dynamic to avoid build-time prerender failures when the CMS database is not
available during the build step.

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.
