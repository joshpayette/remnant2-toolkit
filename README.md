# Remnant 2 Toolkit

This is a toolkit for the game Remnant 2. You can find the site at [remnant2toolkit.com](https://remnant2toolkit.com).

## Contributions

Contributions are welcome! If you found a bug, have a suggestion, or want to contribute code, please open an issue or a pull request.

## Featured Build Contributions

Want to see your build listed on the featured builds? Submit an issue with a link to the video covering your build and I'll
take a look. If I like it, I'll add it to the list!

## Credits

This project would not be possible without the following sources:

- [Fextralife Remnant Wiki](https://remnant2.wiki.fextralife.com/Remnant+2+Wiki)
- [Vash Cowaii's Excel Stat Calculator](https://docs.google.com/spreadsheets/d/1I7vkh50KWJZSxNy4FqxvniFWBstJQEMtpwtxQ3ByoPw/edit?pli=1). Support him on [YouTube](https://www.youtube.com/@VashCowaii)
- [Robin Kuiper's Remnant Tools](https://remnant.rkuiper.nl/)

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE.md) file for details.

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
WEBHOOK_COMMUNITY_BUILDS=""
WEBHOOK_REPORTED_CONTENT=""
```

#### Environment Variable Descriptions

- `DATABASE_URL` - The database connection string for your database. This project uses Planetscale.
- `DISCORD_CLIENT_ID` - The client ID for your Discord application.
- `DISCORD_CLIENT_SECRET` - The client secret for your Discord application
- `REDDIT_CLIENT_ID` - The client ID for your Reddit application.
- `REDDIT_CLIENT_SECRET` - The client secret for your Reddit application.
- `NEXTAUTH_SECRET` - A secret string used by NextAuth. Can be anything, just make it long and random.
- `NEXTAUTH_URL` - The base URL of your site. This is used by NextAuth to redirect back to your site after authentication. Example: http://localhost:3000 for development.
- `CRON_SECRET` - A secret string used by the Vercel CRON platform to prevent unauthorized access.
- `WEBHOOK_COMMUNITY_BUILDS` - The Discord webhook URL to post new community builds to.
- `WEBHOOK_REPORTED_CONTENT` - The Discord webhook URL to post reported content to.

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
