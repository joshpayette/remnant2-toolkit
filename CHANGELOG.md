# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 2024-02-23

### Added

- You can now filter builds by an amulet or ring in the various build lists.
- Added Challenger specific description to Weight tooltip in the builder to account for the Powerlifter perk.
- Added tooltip to Armor in the builder to show the Armor Damage Reduction formula.
- Added CODE_OF_CONDUCT.md to repo and linked to it in the Builder near the public visibility toggler.

### Fixed

- Fixed bug preventing duplication of builds
- Fixed bug where MY BUILDS was not showing private builds

## 2024-02-02

### Added

- Added advanced filtering to other pages
- Added the user's total favorites to all profile pages

### Changed

- Navbar now has a dropdown for various items. This is to prepare for adding more features to the site.
- "Updated At" dates on Build cards now show a referential time instead of a date, e.g. "2 days ago" instead of "2024-02-02"
- Changed SelectMenu and CheckBoxes to be more consistent with the rest of the site.
- Moved Clear Filters button next to apply filters
- Added effect on Apply Filters when filters are changed but unapplied
- Moved Changelog to the footer

## 2024-02-01

### Added

- More status effect description tags added

### Fixed

- Fixed bug with description tags not highlighting in max level bonuses.
- Fixed bug in changelog where my brain didn't accept it was 2024.
- Fixed incorrect stamina percent granted by Dark Cider.

### Changed

- Reworked Favorite button to be more like the other buttons
- Made archetype labels larger on build cards
- Moved total favorites to the build card itself
- Favorite button no longer shows on builds you created

## 2024-01-31

### Added

- Added build badge for builds that are new
- Added description tags for Amplitude `[A]` and Resonanace `[R]`
- Added better filtering to Community Builds

### Fixed

- Added missing Blaze mod for Smolder weapon.
- Fixed a few more low res images.
- Renamed `archtype` to `archetype` throughout the tool

### Changed

- Social media embeds are now significantly smaller

## 2024-01-30

### Added

- Added armor calculator when creating or editing a build. This will give you the highest possible armor value for your build based on the items you have selected.
- Added more status effect tooltips to item descriptions.
- Status effect tooltips added to build descriptions.

## 2024-01-28

### Added

- When selecting a Trait item to add to a build, you can change the ordering from alphabetical or in-game ordering.
  - Sort preference is now persisted between sessions.
- Added total build count on home page and community builds page

### Fixed

- Added report build icon back to community build cards
- Fixed bug where Favorited Builds were not showing up in order of date favorited when sorting by date favorited
- Fixed a bug where percentages would show as NaN on the item tracker
- Fixed bug in Zealot's Hat weight and armor stats
- Fixed a bug with weight threshold calculations not doing what it should be at all

### Changed

- Moved the import save box into a dialog to reclaim space. Updated the styling to make it more clear.

## 2024-01-27

### Added

- Added weapon filters to community builds page and subsections

### Changed

- Removed creator builds from community builds page. They have their own page now.
- Removed the /by-release page. Incorporated the functionality into the community builds page to filter by DLC

## 2024-01-26

### Added

- Added damage modifier info logic to a couple of items.
- Added gun damage, rps, and magazine info
- Added weight class coloring in stats

### Changed

- Old featured build home page redirects to new featured build page. Old links still will work.
- Reduced size of detailed build cards
- Removed "how to get" instructions from item info. Wanted to save space, and the wiki is already the best source for this.

## 2024-01-25

### Added

- When selecting Traits for a build, you can now sort alphabetically or by the in-game sorting.

### Fixed

- Youtube embeds were overflowing and causing layout issues.
- Timestamps on build cards should now use local time

### Changed

- Moved builder action buttons below the builder on mobile
- Traits now sort alphabetically, with archtype traits at the start
- Archtype traits now have a yellow underline to make it clearer that they come from archtypes

## 2024-01-24

### Added

- Added creator youtube videos above their builds.
- Added new Featured Builds page.

### Fixed

- Fixed bug with stamina not calculating correctly.

## 2024-01-23

### Added

- User profile pages now active. You can add a bio or see all of a user's public builds

### Fixed

- Fixed how to get description for Sparkfire Shotgun.

## 2024-01-22

### Added

- Added consumables and concoctions to the item tracker.
- Added health and stamina to build stats

### Changed

- When you duplicate a build, it now defaults to private by default. This should help prevent a bunch of junk builds polluting the community builds.
  - As part of this change, I retroactively applied the private flag to all builds that were created before this change that contain the `(copy)` text in the name, which is automatically appended when duplicating a build.

## 2024-01-21

### Added

- Added all archtype perks to the item lookup.
- Added individual coloring for keywords in item descriptions and howToGet text.

## 2024-01-20

### Added

- Initial armor and resistances added to Builder

### Fixed

- A few mutators had wrong HOW TO GET text.

## 2024-01-19

### Added

- Community builds is now live! You can now filter builds by items you own, by specific releases, most popular, and more to come!
- Added pagination and improved views for builds you've created and favorited.
- So much more, I should have kept better notes!

## 2024-01-18

### Added

- Added SheenShots' Mod Mage build
- Trait count now shows in screenshots

## 2024-01-16

### Fixed

- Increased the allowed file size for a profile.sav. Not sure why I had it set so low.
- Trait points should be correctly calculated, editable, and perform better on mobile.
- Fixed all the weapons and mutators being grouped in a single category on the Item Tracker.

## 2024-01-15

### Changed

- Overhauled the database schema for storing builds. This was a big change, so I'm hoping I didn't break anything! This was necessary to
  enable the kind of granular filtering I want to do for community builds.

## 2024-01-12

### Added

- Random build button added. Available on the create build page when logged in

### Fixed

- Fixed bug where builder was exceeding screen size on mobile
- Fixed bug where mods were selectable for melee weapons. Turns out melee weapons have linked mods or nothing
- Fixed bug where state wasn't resetting when going from query builder to db builder

## 2024-01-11

### Added

- Added new SenorCerveza build to featured builds.

### Fixed

- Fixed bug where item with linked mod would not allow you to equip another non-boss gun.

## 2024-01-10

### Added

- New notes and prompts when editing or creating builds while not logged in.

### Changed

- Updated the builder to use separate page routes for builds in the database. This helps squash bugs from trying to keep both types of builds commingled in the same page.

## 2024-01-09

### Fixed

- Gravity Core mod was missing from the list of mods. (Thanks Joe!) Added it and linked it to the Starkiller weapon.

## 2024-01-08

### Added

- Added The Batman Build to featured builds.

### Fixed

- Dark Fluid and Dark Cider had mixed up/missing information. (Thanks Joe!)
- Fixed a number of copy paste fails in item info.

## 2024-01-07

### Added

- Small note below total trait points showing how the 110 total is derived.
- Check on file size of save file before parsing to prevent errors.
- Added CHAOS GAMING'S TANKUALIST build to featured builds.

### Fixed

- Fixed small display issues on item filters.
- Updated the build name field to use the same input as other parts of the site.

## 2024-01-06

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

## 2024-01-05

### Fixed

- Image export wasn't working. This is now fixed.

## 2024-01-04

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

## 2024-01-03

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

## 2024-01-02

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
