# Project Architecture

## Overview

Remnant2Toolkit is a set of tools for the game Remnant 2. You can find the site at [remnant2toolkit.com](https://remnant2toolkit.com).

This project is intended to better enable the community to track missing items, create and share their favorite builds, and info on how to find specific items.

## High-Level Architecture

This project is a monorepo managed by [Turborepo](https://turbo.build). The project is split into two main parts: the frontend and the backend.

Each application in the `apps` folder are built with [Next.js](https://nextjs.org), [React](https://react.dev), [Typescript](https://typescriptlang.org), and [TailwindCSS](https://tailwindcss.com). The site is hosted on [Vercel](https://vercel.com).

The database is hosted on a [Planetscale](https://planetscale.com) database and is accessed via [Prisma](https://prisma.io).

The images are stored in an [AWS S3](https://aws.amazon.com/s3/). They are cached and served via [AWS Cloudfront](https://aws.amazon.com/cloudfront/).

User authentication is managed via [NextAuth.js](https://next-auth.js.org/) with support for Discord and Reddit logins. The user and session data are persisted to the database for use in the site.

There is also a separate server for handling loadout imports from the game's save files. This server is hosted on [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) and is written in C#. The reason for this is that it is written in C# based on the hard work of Andrew Savinykh, and it cannot be hosted on Vercel.

## Database Schema

_See the [packages/database/prisma/schema](packages/database/prisma/schema) for the latest database schema._

## Deployment

The project has a [Vercel](https://vercel.com) deployment pipeline. The `main` branch is automatically deployed to the production site. The `development` branch is automatically deployed to the staging site for each application in the `apps` folder.
