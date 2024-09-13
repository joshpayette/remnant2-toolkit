# Local Setup

This file walks you through setting up the project locally. I just converted this project to a monorepo, and did my best to update these instructions. If anything doesn't work, please contact `remnant2toolkit` on Discord and I will help get these updated.

## Understanding the guide

This guide assumes you are using a terminal to run commands.

- If you are using VSCode, you can use the built-in terminal. Press `Ctrl + Backtick` to open the terminal.
- If you are using Windows, you can use the built-in Command Prompt or PowerShell.
- If you are using macOS or Linux, you can use the built-in Terminal app.

When you see a command like this, this is instructing you to run the command in your terminal:

```bash
npm run dev
```

## Requirements

### Installing Software

- [Git](https://git-scm.com/downloads) - Allows you to run `git` commands in your terminal.
- [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases) - Allows you to install and swap between different versions of Node.js.
- [VSCode](https://code.visualstudio.com/download) is what I use, but you can use whatever code editor you want.
- [Docker Desktop](https://www.docker.com/products/docker-desktop) to run a local MySQL database.

#### NVM for Windows

Once you have installed NVM for Windows, activate NodeJS v18.17.0 by running the following command in your terminal:

```bash
nvm install 18.17.0
nvm use 18.17.0
```

#### Install PNPM

This project uses PNPM as the package manager. You can install it by running the following command in your terminal:

```bash
npm install -g pnpm
```

## First-time Setup

### Clone the repository

In your terminal, run the following commands to clone the repository and navigate to the project directory.

```bash
git clone https://github.com/joshpayette/remnant2-toolkit.git
cd remnant2-toolkit
```

### Install the dependencies

Run the following command to install the dependencies for the project:

```bash
pnpm install
```

### Initialize the `packages/database` .env file

```bash
cp ./packages/database/.env.example ./packages/database/.env.local
```

Open the `.env.local` file and set the following environment variables per the below instructions.

#### `MYSQL_` Environment Variables

You will need to assign a password to `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD`.
Choose any values you want. These will be the root and user passwords for the database Docker creates. You can use a tool like [https://passwordsgenerator.net/](https://passwordsgenerator.net/) to generate a random string of characters.

If you change these values after the first-time setup, you will need to delete the `db-1` volume in Docker Desktop and rebuild the dev environment.

#### `DATABASE_URL` Environment Variable

The `DATABASE_URL` environment variable is used by Prisma to connect to the database. There is a sample value in the `.env.example` file. You will need to replace `{{ PASSWORD HERE }}` with the value you set for `MYSQL_PASSWORD` in the previous step.

```bash
DATABASE_URL="mysql://forlinauser:password@localhost:3306/forlinadb"
```

**Use this same database URL in every other `.env.local` file where the `DATABASE_URL` field exists.**

### Initialize the `apps/remnant2toolkit` .env.local file

```bash
cp ./apps/remnant2toolkit/.env.example ./apps/remnant2toolkit/.env.local
```

#### `DATABASE_URL` environment variable

Copy the `DATABASE_URL` value from the `packages/database/.env.local` file and paste it into the `apps/remnant2toolkit/.env.local` file.

### Allowing sign-in with Discord/Reddit

You will need to create a Reddit app and a Discord app to allow users to sign in with those services.

##### Discord

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications).
2. Click "New Application" in the top right.
3. Fill out the form. The redirect URI should be `http://localhost:3000/api/auth/callback/discord`.
4. Click "Save Changes".
5. Click "OAuth2" in the left sidebar.
6. Under "Redirects", click "Add Redirect".
7. Enter `http://localhost:3000/api/auth/callback/discord` and click "Save Changes".
8. Copy the `client_id` and `client_secret` values into the `.env.local` file, in the `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` fields, respectively.

##### Reddit

1. Go to [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps).
2. Click "Create App" at the bottom of the page.
3. Fill out the form. The redirect URI should be `http://localhost:3000/api/auth/callback/reddit`.
4. Click "Create App".
5. Copy the `client_id` and `client_secret` values into the `.env.local` file, in the `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` fields, respectively.

##### `NEXTAUTH_SECRET` Environment Variable

This is a secret key used by NextAuth. You can generate a random string of characters using a tool like [https://passwordsgenerator.net/](https://passwordsgenerator.net/), then paste that value into the `.env.local` file for `NEXTAUTH_SECRET`.

### `WEBHOOK_` Environment Variables

These are optional. If you don't want to set up webhooks, you can leave these values as they blank.

If you would like to setup the webhooks like the Toolkit uses, you can do so via Discord. You will need to have a Discord server and channel you want the messages to go to. For testing, you could use a single webhook for all of the environment variables.

1. Go to the Discord server and channel you want to use.
2. Right-click the channel and click "Edit Channel".
3. Click "Integrations" in the left sidebar.
4. Click "Create Webhook".
5. Fill out the form. The "Webhook Name" can be anything you want. The "Channel" should be the channel you want the messages to go to.
6. Click "Copy Webhook URL" and paste it into the appropriate `WEBHOOK_` field in the `.env.local` file.

### `IMAGEKIT_` Environment Variables

ImageKit is the service used to store images generated by the Builder's export to image feature. You can skip this if you do not need that functionality.

If you would like to use it, ImageKit has a generous free account that should be sufficient for your local development needs.

1. Go to [https://imagekit.io/](https://imagekit.io/) and sign up for an account.
2. Once you're logged in, click "API Key" in the left sidebar.
3. Copy the `Public Key` and `Private Key` values into the `.env` file, in the `IMAGEKIT_CLIENT_ID` and `IMAGEKIT_CLIENT_SECRET` fields, respectively.

### `CRON_SECRET` Environment Variable

This is unnecessary in local development. This is a secret key used by the Toolkit's hosting provider (Vercel) to allow automated scheduled reports to be be invoked.

### `PATREON_` Environment Variables

These are unnecessary in local development. This is only used for automated scheduled scripts to import paid Patreon members to the Toolkit so that perks can be enabled.

### `NEXT_PUBLIC_IMAGE_URL` Environment Variable

This is used to reference the Toolkit's Cloudfront distribution for images. You can leave this as the default value for local development to use the Toolkit's cache. However, you can update it to any URL you want to use for local development if you want to use a different source for images.

## Run the database container

```bash
docker compose -f docker-compose.dev.yml --env-file=./packages/database/.env.local up
```

Wait about 2 minutes at this step to allow the database to spin up. In the console, you should see something like this in the logs:

```bash
Creating database forlinadb
Creating user forlinauser
Giving user forlinauser access to schema forlinadb
```

Once you see that in the logs, leave the process running and open a new terminal.

### Initialize the database

Run the following command from the root (top-most) folder to generate the initial (empty) database schema:

```bash
npx turbo db:push
```

**This will also need to be done any time you modify any files in `packages/database/prisma/schema` to apply the changes.**.

## Running the Dev Environment

To run all of the web applications (found in the `apps` folder), you can run the following command from the root (top-most) folder:

```bash
npx turbo dev
```

The site should now be available at [http://localhost:3000](http://localhost:3000).

## Ensuring your changes will build in production

Before you push your changes, you should ensure that the production build will work. To do this, you can:

1. Open Docker Desktop.
2. Click on Containers on the left.
3. Expand the `remnant2-toolkit` container.
4. Click on the `remnant2-toolkit` service.
5. Click the `Exec` tab.
6. Run the following command to build the production version of the site:

```bash
npm run build
```

If the build is successful, you can push your changes. Otherwise, you will see errors to give an idea of what needs to be fixed.

## Running tests

There are not many tests in this project yet, which is a source of great shame. However, you can run the tests we do have by running:

```bash
npx turbo test
```

## FAQ

### Connecting to the database

If you want to connect to the database and view records:

1. Open a terminal and run the following command to connect to MySQL:

```bash
mysql -u root -p
```

2. Enter the password you set for `MYSQL_ROOT_PASSWORD` in the `.env` file.
3. Run the following command to connect to the `forlinadb` database:

```bash
use forlinadb;
```

You are now able to run SQL queries against the database. For example, view all tables:

```bash
show tables;
```

### Updating .env vars

If you make updates to the `.env` file, you will need to restart the dev environment (if it's running) for the changes to take effect.

```bash
npx turbo dev
```
