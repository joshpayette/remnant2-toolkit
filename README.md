# Remnant 2 Toolkit

This is a toolkit for the game Remnant 2. You can find the site at [remnant2toolkit.com](https://remnant2toolkit.com).

## Features

- [x] Item Tracker - Track your items and see what you need to complete your collection.
- [x] Build Tool - Create and share builds with the others.
- [x] Featured Builds - See some featured builds from the community.

## How it works

The site is built using Next.js and Tailwind CSS. The data is stored in the user's local storage, so it will persist between sessions, but not between devices. The data is also stored in the URL, so you can share your builds with others.

The site is hosted on Vercel, with images served via Cloudfront from an S3 bucket.

## Roadmap

- [x] Item tracker can be populated by importing your save file.
- [ ] Add all item info to the item tracker, such as item description and wiki links.
- [ ] Update Fextralife Wiki links to the new community maintained https://remnant.wiki site.
- [ ] Add an ability to import the item tracker CSV to populate the site with your current items.

## Supporter Roadmap

If there is enough interest in adding the below features via a Patreon or other funding, I would be happy to add them. The funding would help cover the
monthly cost of the hosting of the site and expanded features.

- Add the ability to create an account and save your builds to the database.
- Enable community build submission, as well as community voting on builds.
- Add the ability to add notes to the builds.
- Sharing your build URL on social media would generate a more specific preview image.

## Contributions

Contributions are welcome! If you found a bug, have a suggestion, or want to contribute code, please open an issue or a pull request.

## Featured Build Contributions

Want to see your build listed on the featured builds? Submit an issue with a link to the video covering your build and I'll
take a look. If I like it, I'll add it to the list!

## Credits

This project would not be possible without [Robin Kuiper's Remnant Tools](https://remnant.rkuiper.nl/) serving as a
foundation to build upon.

In addition, the following resources were used:

- [Fextralife Remnant Wiki](https://remnant2.wiki.fextralife.com/Remnant+2+Wiki)
- [The amazingly detailed Google sheet compiled by Matthew Whyment](https://docs.google.com/spreadsheets/d/1hgcUe-PvFnm3QSf3iamtaX3Q8tf_RS_y1fdwS1QHXMU/edit#gid=389923786)

## Running locally

### Initial Setup

#### Create a .env file

First, you need to define the environment variables. You can do this by renaming the `.env.sample` file to `.env`
and filling in the values.

```bash
cp .env.sample .env
```

Your `.env` file should look something like this:

```bash
DATABASE_URL=""
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
REDDIT_CLIENT_ID=""
REDDIT_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
NEXT_PUBLIC_IMAGE_URL=""
CRON_SECRET=""
```

#### Environment Variable Descriptions

- `DATABASE_URL` - The database connection string for your database. This project uses Planetscale.
- `DISCORD_CLIENT_ID` - The client ID for your Discord application.
- `DISCORD_CLIENT_SECRET` - The client secret for your Discord application.
- `REDDIT_CLIENT_ID` - The client ID for your Reddit application.
- `REDDIT_CLIENT_SECRET` - The client secret for your Reddit application.
- `NEXTAUTH_SECRET` - A secret string used by NextAuth. Can be anything, just make it long and random.
- `NEXTAUTH_URL` - The base URL of your site. This is used by NextAuth to redirect back to your site after authentication. Example: http://localhost:3000 for development.
- `CRON_SECRET` - A secret string used by the Vercel CRON platform to prevent unauthorized access.

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
