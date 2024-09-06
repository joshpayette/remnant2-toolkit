# Remnant 2 Toolkit

This is a toolkit for the game Remnant 2. You can find the site at [remnant2toolkit.com](https://remnant2toolkit.com).

## Contributions

Contributions are welcome! If you found a bug, have a suggestion, or want to contribute code, I'd certainly appreciate the help via pull request or issue.

I love nothing more than helping others make their first contributions to open source, or to learning code. Don't be shy - come say hi in the [Discord server](https://discord.gg/kgVaU3zAQ7).

Before contributing, please read the [Code of Conduct](CODE_OF_CONDUCT.md).

## Architecture

- [React](https://react.dev) for the front-end component library.
- [Next.js](https://nextjs.org) as the frontend/backend framework.
- [Turborepo](https://turbo.build) for monorepo support.
- [TailwindCSS](https://tailwindcss.com) for styling.
- [Typescript](https://typescriptlang.org) as the primary language.
- [Prisma](https://prisma.io) for the database ORM.
- [NextAuth.js](https://next-auth.js.org/) for authentication and third-party oauth.

## Services

- [Vercel](https://vercel.com) for hosting the primary applications.
- [Planetscale](https://planetscale.com) for the database.
- [AWS S3](https://aws.amazon.com/s3/) for image storage.
- [AWS Cloudfront](https://aws.amazon.com/cloudfront/) for image caching.
- [ImageKit](https://imagekit.io) as temporary storage for generated build images.
- [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) for the Loadout Importer functionality.

## Credits

This project would not be possible without the following sources:

- [Remnant 2 Community Wiki](https://remnant.wiki)
- [All of the contributors from the community](CONTRIBUTORS.md)
- [Vash Cowaii's Excel Stat Calculator](https://docs.google.com/spreadsheets/d/1I7vkh50KWJZSxNy4FqxvniFWBstJQEMtpwtxQ3ByoPw/edit?pli=1). Support him on [YouTube](https://www.youtube.com/@VashCowaii)
- Andrew Savinykh's help with parsing loadouts from profile.sav files.
  - You can find the repo for parsing loadouts here: [Remnant2-Toolkit-Loadouts](https://github.com/joshpayette/remnant2-toolkit-loadouts/tree/main)
- [Robin Kuiper's Remnant Tools](https://remnant.rkuiper.nl/)

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE.md) file for details.

## Local Setup

Please see [LOCALSETUP.md](LOCALSETUP.md) for instructions on setting up the project locally.
