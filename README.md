
## Project info


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
- Prisma
- PostgreSQL

## Local Postgres

For local database development, this project includes a `docker-compose.yml`
file that starts PostgreSQL 16.

1. Copy the example environment file:

```sh
cp .env.example .env
```

2. Start Postgres:

```sh
docker compose up -d
```

3. Stop it when you're done:

```sh
docker compose down
```

The default local connection string is:

```sh
postgresql://postgres:postgres@localhost:5432/enidpath
```

## Prisma Setup

Prisma has been added for database access and migrations.

1. Copy the example environment file:

```sh
cp .env.example .env
```

2. Start Postgres:

```sh
docker compose up -d
```

3. Start the Next.js development server:

```sh
npm run dev
```

4. Generate the Prisma client:

```sh
npm run prisma:generate
```

5. After you add your first model in `prisma/schema.prisma`, create a local
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


Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.
