# Remnant 2 Toolkit

This is a toolkit for the game Remnant 2. You can find the site at [remnant2toolkit.com](https://remnant2toolkit.com).

## Contributions

Contributions are welcome! If you found a bug, have a suggestion, or want to contribute code, I'd certainly appreciate the help via pull request or issue.

Before contributing, please read the [Code of Conduct](CODE_OF_CONDUCT.md).

You can also join the [Discord server](https://discord.gg/kgVaU3zAQ7) to discuss the project and get help.

## Featured Builds

Want to see your build listed on the featured builds? Submit an issue with a link to the video covering your build and I'll take a look. If it looks of good quality, I'll add it!

## Credits

This project would not be possible without the following sources:

- [Fextralife Remnant Wiki](https://remnant2.wiki.fextralife.com/Remnant+2+Wiki)
- [Vash Cowaii's Excel Stat Calculator](https://docs.google.com/spreadsheets/d/1I7vkh50KWJZSxNy4FqxvniFWBstJQEMtpwtxQ3ByoPw/edit?pli=1). Support him on [YouTube](https://www.youtube.com/@VashCowaii)
- [Robin Kuiper's Remnant Tools](https://remnant.rkuiper.nl/)
- [All of the contributors from the community](CONTRIBUTORS.md)

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

#### Environment Variable Descriptions

- `CRON_SECRET` - A secret string used by the Vercel CRON platform to prevent unauthorized access.
- `DATABASE_URL` - The database connection string for your database. This project uses Planetscale.
- `DISCORD_CLIENT_ID` - The client ID for your Discord application.
- `DISCORD_CLIENT_SECRET` - The client secret for your Discord application
- `IMAGEKIT_CLIENT_ID` - The client ID for your ImageKit application.
- `IMAGEKIT_CLIENT_SECRET` - The client secret for your ImageKit application.
- `NEXTAUTH_SECRET` - A secret string used by NextAuth. Can be anything, just make it long and random.
- `NEXTAUTH_URL` - The base URL of your site. This is used by NextAuth to redirect back to your site after authentication. Example: http://localhost:3000 for development.
- `NEXT_PUBLIC_IMAGE_URL` - The base URL for images. This is used to build the full URL for images in the CDN.
- `PATREON_CLIENT_ID` - The client ID for your Patreon application.
- `PATREON_CLIENT_SECRET` - The client secret for your Patreon application.
- `PATREON_CREATOR_ACCESS_TOKEN` - The access token for your Patreon creator account.
- `PATREON_CREATOR_REFRESH_TOKEN` - The refresh token for your Patreon creator account.
- `REDDIT_CLIENT_ID` - The client ID for your Reddit application.
- `REDDIT_CLIENT_SECRET` - The client secret for your Reddit application.
- `WEBHOOK_BUG_REPORT` - The webhook URL to post bug reports to. This project uses a Discord webhook.
- `WEBHOOK_COMMUNITY_BUILDS` - The webhook URL to post new community builds to. This project uses a Discord webhook.
- `WEBHOOK_CRON_LOGS` - The webhook URL to post CRON logs to. This project uses a Discord webhook.
- `WEBHOOK_REPORTED_CONTENT` - The webhook URL to post reported content to. This project uses a Discord webhook.

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
