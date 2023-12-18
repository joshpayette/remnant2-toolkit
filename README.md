# Remnant 2 Toolkit

This is a toolkit for the game Remnant 2. You can find the site at [remnant2toolkit.com](https://remnant2toolkit.com).

## Features

- [x] Item Tracker - Track your items and see what you need to complete your collection
- [x] Build Tool - Create and share builds with the others.
- [x] Featured Builds - See some featured builds from the community.

## How it works

The site is built using Next.js and Tailwind CSS. The data is stored in the user's local storage, so it will persist between sessions, but not between devices. The data is also stored in the URL, so you can share your builds with others.

The site is hosted on Vercel, with images served via Cloudfront from an S3 bucket.

## Roadmap

- [ ] Add an ability to import the item tracker CSV to populate the site with your current items.
- [ ] Add all item info to the item tracker, such as item description and wiki links.
- [ ] Update Fextralife Wiki links to the new community maintained https://remnant.wiki site.

## Maybe down the line with support

- [ ] Add a database of builds that users can browse and search (contingent on enough interest and backers)
- [ ] Add calculations of armor, resists, etc. for builds

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

### Getting Started

First, run the development server:

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
