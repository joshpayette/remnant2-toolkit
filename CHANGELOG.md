# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 2023-01-08

### Added

- Added The Batman Build to featured builds.

### Fixed

- Dark Fluid and Dark Cider had mixed up/missing information. (Thanks Joe!)
- Fixed a number of copy paste fails in item info.

## 2023-01-07

### Added

- Small note below total trait points showing how the 110 total is derived.
- Check on file size of save file before parsing to prevent errors.
- Added CHAOS GAMING'S TANKUALIST build to featured builds.

### Fixed

- Fixed small display issues on item filters.
- Updated the build name field to use the same input as other parts of the site.

## 2023-01-06

### Added

- Added SenorCerveza's Inciernary King build to featured builds.

### Fixed

- Shatterstar mod now correctly linked to Savior long gun.
- Fixed a bug where item tracker would not correctly import Xbox save files due to response size.
  - Turns out there was no bug, but hey this was still an optimization!

### Changed

- Overhauled item lookup to use the detailed item view, making it easier to quickly scan items and their descriptions.
- Expanded the filters on the item lookup and item tracker to include all item types.
- Expanded the search functionality in the filters to also search item descriptions when returning results.

## 2023-01-05

### Fixed

- Image export wasn't working. This is now fixed.

## 2023-01-04

### Added

- Core traits for each archtype now autoassign when selecting a primary archtype.
- Added bug report button

### Fixed

- Bug with detailed view squishing up on mobile
- Bug with trait item images showing up fuzzy
- Bug with Masonry error on detailed view when changing item counts
- Bug with build description not carrying over when editing in certain situations

### Changed

- Can no longer delete traits that are required, i.e. those dictated by archtypes

## 2023-01-03

### Changed

- Moved from Cloudfront to Bunny CDN for image hosting. This should improve image load times as I'm now able to utilize image optimization.
- Detailed build view now uses masonry layout for items. This should improve the layout on all devices.
- Reordered and resized buttons on the builder to make better use space on mobile.
- Added "Show Detailed View" button to automatically scroll down to the detailed view.
- Added armor stats and cooldowns to detailed view.
- Added armor descriptions
- Added relic fragment descriptions
- Added trait item descriptions
- Added concoction descriptions
- Added consumable descriptions
- Item Tracker item count and total item count now adjusts with filters.
- Updated filters button placement and look.

### Fixed

- Shielded Strike mutator was incorrectly listed as Shield Breaker.
- Fixed error in links to SheenShots' Hot Swapper build.
- Fixed bug where incorrect number of items showing on the item tracker

## 2023-01-02

### Added

- Added link to support the tool on the home page.
- Added Bolt Jamison's Fargazer Madness Mage
- Added SheenShots' Corrupted Guardian build

## 2023-12-31

### Added

- Build descriptions now support up to 1000 characters.
- Build descriptions now let you use line breaks for clarity.
- Added build info icon on each item in the builder. This will show the item's description and traits.
- Added build info icon in the item select popup. This will show the item's description and traits.

## 2023-12-30

### Added

- Added link to GoFundMe for community member DangItsBatman who unexpectedly passed away.
- Added new filtering logic on Item Tracker and Item Lookup

### Fixed

- Now I actually fixed the image export not working on iOS.

## 2023-12-29

### Added

- Added SheenShots' Hot Swapper build
- Added Report Build feature

### Fixed

- Added missing wikilink to Rampage skill.
- Fixed issue with build not deleting after adding vote counts.
- Fixed issue where Spore Shot was not automatically added to the build when selecting the Sporebloom weapon.
- Fixed issue where skill cooldown wasn't showing on the detailed build description.
- Fixed issue where image export filename was not being set correctly.
- Fixed bug where image export was not working on iOS.

## 2023-12-28

### Added

- Detailed build cards now show item info when you click the image or name.
- Back to Top button now shows on non-mobile resolutions.
- Added SenorCerveza's Ronin Melee build
- Added weapon descriptions
- Added skill descriptions

### Changed

- Updated the display of individual featured builds

### Removed

- Profile no longer shows email address. It doesn't offer anything, can't be changed, and could be a privacy concern.
- Changelog is no longer linked from the site.

### Fixed

- Renamed relic fragment "Ranged Weakspot Damage" to "Weakspot Damage" - the wiki lied to me!
- Fixed user display name not showing on build
- Home page buttons are now clickable with better indications they are clickable
- Changed Export to CSV label to indicate it exports all data regardless of filters
- Red text at bottom of builder now links to sign in page
- Multiline strings in build descriptions now display correctly
- Fixed issue with item info overflowing the page on mobile on the Tracker page.
- Fixed bug where traits were breaking out of the box in the Lookup page
- Fixed bug with detailed build cards and text positioning

## 2023-12-27

### Added

- Added the ability to favorite builds. Favorited builds will be available on your profile.
- Added a detailed view of the items in a build.

## 2023-12-26

### Changed

- Removed the label and controls toggle. This was originally added to try to allow full control of the export screenshot. However, the complexity added for these manual checks was not worth the benefit, particularly since the screenshot should ideally include labels and no controls. Now the labels are always visible and controls always hide when the screenshot is taken. I don't see many drawbacks to this, as folks can still take their own screenshots if they really don't like this.

### Fixed

- Back to top button was incorrectly displaying on Item Tracker on larger screens.
- Addressed an issue where build wasn't saving due to error in parsing description.
- Fixed a bug when duplicating a bug where it would edit in place instead of creating a new build.
- Duplicating a build now automatically adds `(copy)` to the end of the build name.

## 2023-12-25

### Added

- Database integration is enabled! This means that you can now save and share builds with shorter URLs, descriptions, and better social media cards.
- Numerous improvements to export image generation
- Added back to top button for mobile devices

## 2023-12-24

### Added

- Added item info for all rings and amulets
- Added the ability to sign in with Discord or Reddit. This will allow you to save and share builds. In addition,
  builds can have a description if you are signed in.

## 2023-12-23

### Fixed

- Brewmaster's Cork was not granting +2 concoction slots
- Feastmaster's Signet was not granting +1 concoction slots

## 2023-12-22

### Added

- Added Sadderall's Richie Rich build to featured builds
- Added DoTs Я Us likes DoTs build to featured builds

## 2023-12-21

### Added

- Exporting a build image on mobile now exports the image at the same size as on desktop.

### Fixed

- Swapped order of Builder action buttons to make more sense on mobile.
- Fixed issue preventing skills from loading

## 2023-12-20

### Added

- Added Mr. Nacho and SenorCerveza's COOP Elemental DOTs build to featured builds.
- Added SenorCerveza's 160k DPS Meme build to featured builds.

## 2023-12-19

### Added

- Added Dudley's Eldritch Knight build to featured builds.
- Added Dudley's Blood Hunter build to featured builds.
- Added SenorCerveza's Boss Melter build to featured builds.
- Added SenorCerveza's Easy Mode Gray Health build to featured builds.
- Added SenorCerveza's Buff Master Support build to featured builds.
- Added featured build class tags to the build cards.

### Fixed

- Item Tracker now correctly identifies and discovered all items in the save file.
- Fixed bug where Item Tracker would fail on importing a save file a second time. Added a page reload after import to fix this.
- Fixed bug where mutators would show up when choosing a melee weapon in the builder.

## 2023-12-18

### Added

- Added import save file feature to the Item Tracker. This will allow you to import your save file and see what items you have and what you are missing.
  - **NOTE:** This is still a work in progress. It is currently finding about 90% of items. I will continue to work on this and improve it ASAP.

### Fixed

- When selecting mutators, the available mutators are now limited to the corresponding weapon type.
