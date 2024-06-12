# Project Architecture

## Overview

Remnant 2 Toolkit is a set of tools for the game Remnant 2. You can find the site at [remnant2toolkit.com](https://remnant2toolkit.com).

This project is intended to better enable the community to track missing items, create and share their favorite builds, and info on how to find specific items.

## High-Level Architecture

This toolkit is built using [Next.js](https://nextjs.org), [React](https://react.dev), and [Typescript](https://typescriptlang.org). The site is hosted on [Vercel](https://vercel.com).

The data is stored in a [Planetscale](https://planetscale.com) database and is accessed via [Prisma](https://prisma.io).

The images are stored, cached, and optimized via [Cloudfront](https://aws.amazon.com/cloudfront/).

User accounts are managed via [NextAuth.js](https://next-auth.js.org/) with support for Discord and Reddit logins. The user and session data are persisted to the database for use in the site.

There is also a separate server for handling loadout imports from the game's save files. This server is hosted on AWS via Elastic Beanstalk. The reason for this is that it is written in C# based on the hard work of Andrew Savinykh, and it cannot be hosted on Vercel.

## Database Schema

_See [schema.prisma](./prisma/schema.prisma) for the latest schema._

## Deployment

The project has a [Vercel](https://vercel.com) deployment pipeline. The `main` branch is automatically deployed to the production site. The `development` branch is automatically deployed to the staging site.
