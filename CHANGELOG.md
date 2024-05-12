# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 2024-05-11

### Added

- When searching Community Builds, a new filter has been added to find builds with descriptions of 100+ characters. You can find this under the `Include...` dropdown in the build filters. This should help users who want higher quality builds with good details about how to play the build, alternate item options, etc.

### Changed

- Item Tracker data now stored in the database if the user is authenticated. This will allow for item tracking across devices for users that are signed in.
- Updated all amulet images to more consistent higher quality images.
- Updated all archetype images to more consistent higher quality images.
- Updated all armor images to more consistent higher quality images.
- Updated all consumable images to more consistent higher quality images.
- Updated all concoction images to more consistent higher quality images.
- Updated all mod images to more consistent higher quality images.
- Updated all perk images to more consistent higher quality images.
- Updated all relic images to more consistent higher quality images.
- Updated all skill images to more consistent higher quality images.
- Updated all trait images to more consistent higher quality images.
- Updated all weapon images to more consistent higher quality images.

### Fixed

- Fixed Band of Fanatic description to match the wiki.
- Fixed Wrath description to match the wiki.
- Removed broken World Save link to Spiteful/Vicious Red Prince.
- Removed "bloody" from bad word list.

## 2024-05-10

### Changed

- Removed a number of patch affected Featured Builds that have not and likely will not be updated.
- When deleting a build you are viewing, you will now be redirected to your created builds upon successful deletion.

### Fixed

- Featured Build totals on Item cards now exclude Beginner Builds from the total count for Featured Builds that the item is used in.

## 2024-05-09

### Changed

- Updated many items per the patch notes.

## 2024-05-08

### Changed

- Archetype and Build Tag filters for builds are not checkboxes instead of multiselect dropdowns.

### Fixed

- Fixed issue where some builds wouldn't save edits.
- Fixed issue where line breaks were not formatting correctly in Item Info Dialogs.
- Fixed a bug where build reference links wouldn't save when creating a build, only when editing a build.

## 2024-05-07

### Added

- Added new Beginner Builds section, a curated list of builds for new players to use as a starting point while farming gear.

### Changed

- Removed the Enemy Resistances resource link - it is now deprecated.

### Fixed

- Fixed issue preventing some builds from being edited.
- Fixed issue where I broke relic fragments on the Item Tracker for about the 40th time. (eSeFBeeSuite)

## 2024-05-06

### Added

- Item Tracker categories now display the # of items you're missing, along with the percentage. (Synder)

### Fixed

- Hunter Skill descriptions now include the MARK text.
- Fixed issue where if you started creating a build, navigated to a different page, then navigated back, some traits were not resetting.
- Fixed an issue where incomplete Trait descriptions were being pulled in from the Wiki.

## 2024-05-05

### Changed

- Perks now display their type on the item cards and item info dialogs.
- Add to Loadout button on the Builder will now show what Loadout slot the build is equipped to if it is already equipped.

### Fixed

- Fixed all discrepancies with Mutator item descriptions and stats from the wiki.
- Fixed all discrepancies with Perk item descriptions and stats from the wiki.
- Fixed all discrepancies with the Relic Fragment item descriptions and stats from the wiki.
- Fixed all discrepancies with the Relic item descriptions and stats from the wiki.
- Fixed all discrepancies with the Skill item descriptions and stats from the wiki.
- Fixed all discrepancies with the Trait item descriptions and stats from the wiki.
- Fixed all discrepancies with the Ring item descriptions and stats from the wiki.
- Fixed incorrect description and wiki link for Crimson Dreamstone ring.
- Removed "heck" from the bad word list. Can't believe that was on there.

## 2024-05-04

### Added

- Added `Heal` and `Lifesteal` tokens to Way of Meidra skill.
- Added `Critical Chance` and `Critical Damage` tokens to Way of Lydusa skill.
- Added web scraper to pull item stats and descriptions from the wiki. This will allow for more accurate and up-to-date item information.
  - Still incomplete, but got a few item categories done. Will continue to work on this in the coming days.

### Changed

- Adjusted the colors and text of many tokens used in the item descriptions.
- Adjusted the placeholder text for build descriptions to inform the user about using tokens.

### Fixed

- Fixed issue where True Crimson Crown was not detected by the Item Tracker.
- Fixed bug where items with build tags were not saving.
- Fixed Sandstorm mod description.
- Fixed Way of Kaeula skill description.
- Fixed Way of Meidra skill description.
- Fixed Dervish mutator description.
- Fixed Disengage mutator description.
- Fixed Executor mutator description.
- Fixed Extender mutator description.
- Fixed all broken wiki links
- Fixed all discrepancies in weapon item descriptions and stats from the wiki.
- Fixed all discrepancies in amulet item descriptions and stats from the wiki.
- Fixed all discrepancies in armor item descriptions and stats from the wiki.
- Fixed all discrepancies in concoction item descriptions and stats from the wiki.
- Fixed all discrepancies in consumable item descriptions and stats from the wiki.
- Fixed all discrepancies in mod item descriptions and stats from the wiki.

## 2024-05-03

### Added

- Added about 20 new saves to the World Save Archive.

### Changed

- Converted some internal description tags to external tags that will be displayed below the description. This was necessary as a first step to automating item stats and information from the wiki.
- Started referring to `tags` as `tokens` since that seems to be more commonly understood.

## 2024-05-02

### Added

- Featured even more fantastic builds, go check them out!

### Changed

- The # of builds an item is used in on the Item Lookup cards will now exclude builds marked as patch affected.
- Updated name of Cinderclad Monolith to Cinderclad Forge.

### Fixed

- Fixed issue where lengthy lines of text could exceed the width of the build description box.
- Fixed Bottom Heavy mutator description.
- Fixed Prophecy mutator description.
- Added alphabetical sorting to Item Lookup dialog.

## 2024-05-01

### Fixed

- Fixed issue where INVOKER was not highlighting correctly in build descriptions.

## 2024-04-30

### Changed

- User's Created Builds, Featured Builds, and Favorited Builds on their profile now default to show all builds, including patch affected builds. Community Builds and Featured Builds continue to filter out patch affected builds by default.

### Fixed

- Fixed a bug where importing a build from Vash Cowaii's calculator would not allow you to make edits to the build. In some cases, this would cause a server error.
- Fixed a bug in Mudtooth's Tonic still using the old value of 25 health instead of 20 health.

## 2024-04-29

### Changed

- Sharing a link to an item will now use the shorter item endpoint, `/i/itemname`, rather than `/endpoint/item/itemname`. The latter address still works, but will be removed eventually.
- Item Lookup filters: the categories now start unchecked by default, meaning less clicks to get item info to show.
- The height of the item info dialog on mobile has been decreased to allow more space to close out of it.

### Fixed

- Updated incorrect stats on the Zealot's Set armor.
- Updated incorrect stats on the Disciple's Mantle armor.
- Updated wiki link for Index of the Scribe.
- Fixed incorrect item description for Timewave mutator.
- Fixed bug in Armor Calculator where the select box was displaying under the dialog.

### Removed

- Removed the Amplitude (vs. Resonance) guide as it is no longer relevant.

## 2024-04-28

### Added

- Added Opportunity tag to items.
- Added The Fractured aberration to the Boss Tracker. (ConRaven)
- Added Protector of the Grove aberration to the Boss Tracker. (ConRaven)
- Added Stonewing Lurker aberration to the Boss Tracker. (ConRaven)
- Added The Bloodless Heir aberration to the Boss Tracker. (ConRaven)
- Added Cinderclad Monolith, Regenerator/Spiteful to the World Save Archive.
- Added Cinderclad Monolith, Spiteful/Vicious to the World Save Archive.
- Added Lydusa to the World Save Archive.
- Added The Stonewarden, Hearty/Thickskin to the World Save Archive.
- Added a `Top Builds (Current)` and `Top Builds (All Time)` section to the user's Profile Overview page.
- Added a public build feed to see new builds in the Discord as they are created in the Toolkit.

### Changed

- Reworked all filters to use less space. Most of the changes involved replacing checkboxes with multi-select dropdown menus.
  - Just kidding lmao...checkboxes are back for Item Lookup. Will be reverting the other filters soon.
- Reworked the Item Tracker page to let you see more than one category at a time.
- Reworked the Item Lookup page to allow you to view all items with no filters.
- Updated the featured build badge icon to a non-AI generated placeholder.
- Updated the new build badge icon to a non-AI generated placeholder.

### Fixed

- Updated a number of item descriptions and stats that were not present in the patch notes.
- Updated Strong Back weight thresholds to not round up.
- Fixed issue causing Invoker to not import correctly to the Item Tracker.
- Fixed issue causing Dandy Topper to not import correctly to the Item Tracker.
- Fixed issue causing Thorn to not import correctly to the Item Tracker.
- Fixed issue causing Spirit Feeder to not import correctly to the Item Tracker.
- Fixed issue with Item Lookup not showing relic fragments.

## 2024-04-27

### Fixed

- Updated Burden of the Mesmer to the correct in-game image.
- Fixed issue where items in the Item Tracker were not sorting alphabetically.
- Fixed an issue where the `t` URL parameter was affecting the item name when sharing a build as an unauthenticated user.
- Fixed issue where Battle Slacks were called Battle Trousers in the Toolkit.

## 2024-04-26

### Added

- Added final items from DLC2?
- Added a new note to the World Save Archive warning that Cass progress could be lost, and possibly not recovered by a backup save restore.
- Added note to README under FEATURED BUILDS about users needing to update the build as new content is released.
- Added image for the Polygun mod.

### Fixed

- Removed broken world save for The Red Prince - Spiteful, Vicious combo.
- Changed Summoner/Archon combo name from `Augur` to `Invoker` to match the in-game name.

## 2024-04-25

### Added

- Added many more items from the latest DLC.

### Changed

- Removed build protection feature to prevent data loss on page refresh. This was creating bugs and needs to be tested more thoroughly.

### Fixed

- Fixed issue with Item Tracker percentages being insane.
- Updated Sanguine Vapor description.

## 2024-04-24

### Added

- Added many more newly discovered items from the latest DLC.
- Added a new featured build!
- Added new bosses, world boss, and aberrations to Boss Tracker and profile avatars. (Thanks ConRaven!)

### Fixed

- Fixed an issue where you couldn't sync your tracked items on your profile.

## 2024-04-23

### Added

- Added many newly discovered items from the latest DLC.

### Changed

- Added an autosave mechanism when creating and editing builds. This should help preserve a build when the page reloads.
- Removed `bum` from bad word list.

### Fixed

- Updated incorrect Bulletweaver description.
- Fixed missing E in Healing Effectiveness tag.

## 2024-04-22

### Added

- Shovel weapon has been added.

### Fixed

- Fixed issue where Invoker items were not showing in the Item Tracker.

### Changed

- Loads of values updated for all items, too many to enumerate.
- Removed Resonance trait from the database and from all builds that used it.
- Removed Wayfarer trait from the database and from all builds that used it.
- Updated Amplitude vs Resonance guide to only reference Amplitude.
- Replaced all [R] tokens with [A] tokens.
- Engineer intrinsic trait loadout changed, -1 Expertise, +1 Endurance
- Ritualist intrinsic trait loadout changed, -1 Endurance, +1 Spirit

## 2024-04-21

### Fixed

- Fixed bug where the CSV Export on the Item Tracker would only export items for the selected category rather than all items.
- Fixed a bug in the Item Tracker where CSV Import was not including some items. Why did I do this by item name instead of id? This oversight has been corrected!

## 2024-04-20

### Changed

- Updated ⁠code-of-conduct to include "Overusing discord's @ feature" under examples of unacceptable behavior.

### Fixed

- Invoker archetype combo names now include the word "Spirit" in the name.
- Fixed Twisting Wounds description, should have indicated 200 Bleed Damage over 10s.
- Added better quality image for Soul Shard ring.
- Added better quality image for A'Taerii Booster ring.

## 2024-04-19

### Added

- Added Elemental Damage tag.
- Added Invoker intrinsic trait points.

### Fixed

- Fixed typos in all three medic skills - percentages were slightly off. (Thanks, Vash!)

## 2024-04-18

### Added

- Added PRERELEASE tag for items that are not yet in the game, but are planned for the next DLC.
- World Saves for Sha'Hala, Guardian of Nerud (Phase 2)
- World Save for Primogenitor, Spiteful/Vicious
- World Save for The Nightweaver, Skullcracker/Vicious
- World Save for Venom, Skullcracker/Vicious
- Added Invoker archetype, skills, perks, and trait to the builder and item lookup pages!

### Fixed

- Unequipping the archetype will now also unequip the skill.

## 2024-04-15

### Fixed

- Fixed an issue where melee mods were not removable after unequipping the weapon. A more general fix was applied to run the cleanup function any time a build state update occurs.
- Fixed an issue where Rusty weapons were able to have mods equipped in the builder.

## 2024-04-14

### Changed

- Updated the look and feel of alerts and prompts throughout the site.
- Bug report prompt now stylized and allows more text.
- Popup notifications will no longer pause their timer when window loses focus.

### Fixed

- Fixed (maybe?) issue where you could click on prompt confirm buttons multiple times.
- Fixed issue where systems with light-mode were not able to see some text and buttons.

## 2024-04-13

### Added

- Added banner to the top of the Toolkit informing users about the build changes coming in the next DLC.

### Changed

- Added updates to the Hardcore Veteran guide.
- Reworked the Builder buttons to be more consistent with existing and new button styles.
- Alchemist/Summoner build name changed to "Augur" from "Invoker". This is not actually live in-game yet, but it will be in the DLC and I don't want to miss this one.

## 2024-04-12

### Added

- Build filters now allow you to filter by builds with videos.
- Build filters now allow you to filter by builds with reference links.
- Users can now filter their created builds and featured builds to public, private, or all.

### Changed

- Moved all enemy and item data to the `app/(data)` folder.
- Added icons to build cards indicating if a build is private or public, if it has a reference link, and if it has a video url.

### Fixed

- Fixed issue where private build cards would show on the created builds in a user's profile. Builds could not be clicked into, but would show in the list of builds.

## 2024-04-11

### Changed

- Updated Fae Knight Council image (ConRaven)
- Updated Annihilation image (ConRaven)

## 2024-04-10

### Fixed

- Fixed minor issue with width of Export to CSV button on mobile.

## 2024-04-08

### Added

- When creating or editing a build, there is now a toggle for whether the build is marked as "patch-affected" or not.

### Changed

- A build denoted as patch-affected, such as after a DLC or patch that impacted an item in the build, it will no longer automatically remove that flag when a build is simply updated. Instead, the user will need to use the toggle provided when creating or editing a build.

### Fixed

- Removed "god" from the bad word list. The base list we use is a bit overzealous.
- Fixed an issue causing save file import error on the item tracker.

## 2024-04-07

### Changed

- Updated image for One True King. (ConRaven)

### Fixed

- Fixed an issue where deleting a build wouldn't work when viewing it.

## 2024-04-05

### Changed

- Improved text on Builder related to authenticated builder perks, and a better explanation of the Builder's limitations for unauthenticated users.

### Fixed

- Fixed error when deleting a build from the profile/created-builds page.
- Fixed incorrect Wiki link for Ring of Spears.

## 2024-04-04

### Fixed

- Updated Rock of Anguish typo.

## 2024-04-03

### Changed

- Clicking "Linked Item" links on item info cards or dialogs will now open in a new tab, so that you don't lose progress on the current page.
- Reduced white-space on the Profile Stats section on user profiles.
- Updated the Amplitude vs Resonance guide.
- Renamed the `Hardcore` tag to `Hardcore Reward`.

### Fixed

- Removed "Pawn" from bad-word-list.
- Added missing "All-Seeing Eye" to consumable list.
- Removed the [M] tag from Onyx Pendulum.

## 2024-04-02

### Added

- Added more saves to the World Save Archive.
- Added support for multiple phases to the World Save Archive. This is necessary because Sha'Hala has multiple phases, with different affixes in each phase.

### Changed

- The World Save Archive filters now work similar to archetype build filters, where all combos of affixes are checked except for those excluded.

### Fixed

- Amplitude vs Resonance guide incorrectly listed the Magnetic Field perk as an Explorer skill rather than Engineer skill.
- Search text fields now use 16px font to fix auto-zooming issue on Safari browsers.

## 2024-04-01

### Added

- Item Lookup cards now have an icon you can click to view how many Featured and Community Builds the item is found in.

### Changed

- On non-build filters, the search text box has now been moved above the filters container. This will allow quicker searching of these pages with the remaining filters collapsible until needed.

### Fixed

- Fixed item description for Moonlight Barrage.

## 2024-03-31

### Added

- Added link to Vash Cowaii's Loadout Calculator on both the front page and resources page.

#### Profile page

- Your total discovered items from the Item Tracker can now be synced to the database and shown on your profile!
- Your highest Item Quiz score is now visible on your profile!

#### Support R2TK

- Added a new landing page for the Support R2TK link. Now supports Ko-Fi donations, as well as Patreon subscriptions.

#### World Save Archive

- Added total world save count to page description.

### Changed

- Adjusted the page headers to use less space.
- Added link to Item Quiz on main navigation bar.

#### World Save Archive

- Added an FAQ section to the instructions.

### Fixed

#### Item Lookup

- Fixed strange mobile bug where the items would scroll off the screen when adding an item to compare ONLY on the first page load. Make it make sense!

#### World Save Archive

- Fixed Corrupted Ravager's Spiteful/Vicious save file not being the correct file.

## 2024-03-30

### Added

- Add a new `World Save Archive` section, where you can find world saves rolled to specific bosses and affixes.
- Added Item Compare feature to Item Lookup page. You can now pin 5 items to the item compare to more easily see them side by side.

### Changed

- Updated Befouled Altar image (ConRaven)
- Updated Abomination image (ConRaven)
- Reworked the navigation bar to be more organized and easier to navigate.
  - Resources is no longer a dropdown menu, but rather a separate page of links.
- Updated the images for the main page and resource pages.
- On Item Lookup filters, categories are all unchecked by default.
- On Build List filters, archetypes are all unchecked by default.
- Swapped order of `Check All / Uncheck All` prompts
- Moved the Export to CSV button on the Item Lookup page to the bottom of the page.
- Cleaned up excess white space throughout portions of the site.
- Joined a few category filters on Item Lookup for a more uniform distribution.

### Fixed

- Create a build link in the home page text now correctly redirects to authenticated builder if user is signed in.
- Added missing cooldown text from Kill Switch mutator.
- Fixed issue with build to CSV export not working.

## 2024-03-29

### Added

- Added Changelog button to the footer buttons.

### Changed

- The item description of the final item on the Item Quiz now displays.
- Item Lookup filters are now collapsible.
- Added Clear Search Text button on Item Lookup filters.
- Item Lookup filters no longer have an Apply button. Instead, they apply when you change any of the filters.
- Search text on the Item Lookup filters now autofocuses on non-mobile screen resolutions.

### Fixed

- Added more specific calculations to the "total items discovered" percentage on the item tracker. It will no longer show 100% if you have not discovered every item.
- Fixed incorrect description for Feedback Loop.

## 2024-03-28

### Changed

- Added arrow key, WASD key, and 1-4 number key support for the Item Quiz.
- Added a 3s countdown timer before the Item Quiz game starts.
- Changed the Info icon to an image with a fill color.
- Removed `Mod Power Requirement` text from the mods that had it. It was applied inconsistently, and the info is better served on the wiki.
- Item Quiz now has a toggle for "mobile layout" toggle for those that prefer the traditional grid.
- Item Quiz tiles now larger on desktop

### Fixed

- Updated the image for Mystery Jerky to a better quality image.
- Updated the image for Rusty Repeater to a better quality image.
- Updated the image for Bandit Gloves to a better quality image.
- Fixed Bulletweaver description.

## 2024-03-27

### Added

- Added loads of new avatar options for profile pictures. (ConRaven)
- Added an Item Quiz to test your knowledge of items in game based on their image. Find it under Resources!

### Changed

- Updated popular build badge.
- Added a second tier popular build badge.
- Reduced size of navigation items.
- Moved Item Lookup into its own link on the navigation items.
- Added excluded items to Item Quiz to remove some duplicate images.

### Fixed

- Fixed typo in Paper Heart description.

## 2024-03-26

### Added

- Added amulets as options for profile avatars.

### Changed

- Added [BLEEDING] tag to Handler skills.
- Added labels to avatar selection in profile settings.
- Grouped Item Lookup filters by type instead of alphabetically.

### Fixed

- Fixed issue where Handler skills were incorrectly showing as affected by Amplitude rather than Resonance.
- Added `Critical Damage` to autocomplete suggestions in the autocomplete Item Lookup search text. This will include both `Crit Damage` and `Critical Damage` items.

## 2024-03-25

### Added

- Deployed first version of the Hardcore Veteran guide.

### Changed

- Concoctions will now also show up when filtering for consumables in the Item Lookup.
- Grenades are now filterable on the Item Lookup.
- Removed Orb of Undoing from selectable items.
- Removed Liquid Escape from selectable items.

### Fixed

- Think I worked out one-time errors new users get when trying to access their Profile for the first time.
- Fixed bug where favorites button was not correctly showing if you favorited a build.

## 2024-03-23

### Changed

- Did a complete rework of user profiles to provide more relevant information, for both the profile owner and visitors. This includes a new layout, some stats, and new navigation.
- Updated Gwendil boss image (ConRaven)
- Build filters are now collapsible for better experience, particularly for mobile devices.

## 2024-03-22

### Added

- Video embed URLs now support a start time parameter. This allows a direct link to a build in a video that may feature more than one build.

### Fixed

- In build descriptions, item names that are found are now automatically capitalized appropriately. The items are still found regardless of capitalization.

## 2024-03-21

### Added

- You can now share a link to your Loadouts page if you choose to. On the Loadouts page in your profile, toggle it to public to be able to share the link. Show off your top builds!

### Changed

- Removed the original /featured-builds route that has been persisted for the original builds. The /creator-builds now redirects to the Featured Builds page.
  - I had kept the original pages up in case folks had them bookmarked, but the tool has been alive long enough, and the old builds unmaintained, so it no longer seems relevant. The inconsistency with the Featured Builds being at /creator-builds was a problem.

### Fixed

- Corrected Shielded Strike level 10 bonus description. (thanks, Freeman!)
- Fixed issue where new user account profiles would sometimes not update
- Fixed bug where some items weren't bolding due to conflict with description tags

## 2024-03-20

### Added

- Added a link to the Remnant 2 Armor Generator, https://scouthunter.github.io/R2AG/.

### Changed

- Updated the image for Atrophy aberration (ConRaven)

### Fixed

- Fixed inaccurate Dull Steel Ring image.
- Fixed bug in Dull Steel Ring wiki link.

## 2024-03-19

### Changed

- Item names are now bolded in build descriptions.
- Build Tags are automatically found and colorized in the build descriptions.
- Reordered the links on the home page and the Builds nav menu.
- DescriptionWithTags component now allows you to specify which tags to include/exclude.

### Fixed

- Removed highlighting of relic fragments in descriptions, they are too vaguely named.
- Fixed bug where Ultra weight class was not being lowered to Heavy weight class when wearing Dull Steel Ring.
- Fixed bug in Armor Calculator where Heavy weight class was not offering Ultra weight class suggestions when wearing Dull Steel Ring.

### Removed

- Was there an item search bar on the front page? Must have been a fever dream.

## 2024-03-18

### Added

- Added Dried Fruit to item list
- Added resistances to armor calculator suggestions
- Added item search box on the front page

### Changed

- Adding/changing the build name now works like the other form fields on the builder, and does not require a separate save event.
- Removed prompt asking if you want to change the name from the default name due to the confusion about the button labels.
- Equipping a skill with no archetype will now automatically equip the archetype
- Removed the Report Build button. This was created when it was just me managing the Toolkit, to try and catch builds with bad content. Now that the Toolkit has moderators, and an updated automatic feed of build changes that need review, this is no longer necessary.
- Added "Damage Reduction" tag to Twisted Idol

### Fixed

- Fixed issue with white ring appearing around build tags when exporting image
- Fixed the name of Poisoned Ambit Ember Capsule to match the in-game name
- Fixed issue where total weight could be negative
- When selecting a skill in the builder, it will now filter skills to not include skills for the other archetype
- Fixed image export issue with new build name field
- Twisted Idol was mistakenly increasing health rather than armor
- Fixed an issue where the armor calculator was not accounting for weight threshold items and traits (thank you, darkdragn!)
- Fixed improper description for Legacy Protocol

## 2024-03-17

### Added

- Build Tags are now available on the builder. This will allow you to tag your build with up to 4 specific keyboards. Additionally, you can filter on builds by these tags.

### Changed

- Builds now require at least one archetype to be selected before they can save.
- Added new images for Bruin and Tal'Ratha (Normal) per (ConRaven)

### Fixed

- Improved error message if build failed to save due to an error.

## 2024-03-16

### Added

- Added screen-reader specific text to the builder to make it more accessible.
  - Specifically, unicode characters are stripped from build names and descriptions in screen-reader only elements, and the main visual elements are hidden from screen readers.

### Changed

- Max character limit on build descriptions increased to 2000 characters, up from 1000.

### Fixed

- Updated Docker config to support hot module refresh in local development environment.

## 2024-03-15

### Changed

- Refactored remnantItems.ts, the single list of items, into a more modular system. This will allow for easier maintenance and expansion of the item list, as well as better performance throughout the tool.

### Fixed

- Fixed an issue where all archetypes were being appended to the URL when filtering for builds. It will no longer happen if all archetypes or no archetypes are selected.
- Fixed a Builder bug where equipping alchemist and unequipping alchemist would not remove the extra concoctions from stat calculations.
- Fixed a Builder bug in Item Suggestions, where selecting a suggested perk would not equip the archetype.

## 2024-03-14

### Added

- Featured builds now have a `dateFeatured` field to allow them to show at the front of the featured builds once featured.

### Changed

- `Save Image` button on the Builder now reads `Generate Build Image, since it no longer only saves the image like it used to.
- Updated Faelin image (ConRaven)
- Updated Faerin image (ConRaven)
- Updated Huntress image (ConRaven)
- Build filters now support filtering by up to 4 rings! This should help you find more specific builds, but also getting data on how many builds contain a specific setup.
- Hid unneeded values on Weapon item cards
- Improved Armor Calculator layout in the Builder

### Fixed

- Corrected the description for the Battery mutator.
- Found the reason the armor calculator took SO LONG TO RUN! Fixed!

## 2024-03-13

### Added

- Created a set of instructions for how to set up a local development environment for the toolkit. This is available in the LOCAL_DEVELOPMENT.md file.
- Added image export button when creating a build.
- Added loading indicator to the Armor Calculator while it's calculating.

### Changed

- Changed item cards to be more uniform. No more multi-column layout on desktop, too much empty space.
- Updated the images for Bloat King boss and Little Gorge aberration. (ConRaven)
- Removed DESCRIPTION_TAGS from autocomplete search boxes as it is no longer necessary.
- Split BUILD SUGGESTIONS button in the builder into two buttons: Armor Calculator and Item Suggestions. This should make it more clear utilities are available.

### Fixed

- Item links from the Info Dialog and Item Card components now correctly narrow down results to exclude irrelevant items. (alexij)
- Fixed bug where the build reference input field was not hiding for screenshots
- Item tags reworked a bit for clarity. (alexij)
- Fixed error message when saving build. This did not prevent builds from being saved.
- Build resistance calculations were not accounting for perks linked to archetypes. This has been fixed.

## 2024-03-12

### Added

- Prime Perk is now displayed on the builder for the selected archetypes.
- Added new multiplicative damage `[MD]` token to the item tags.

### Changed

- Added placeholder text to Build Reference Link.
- Build stats, specifically resistances, now in a 2-column layout to fix an overlap issue between the relic fragments and the Vash export button.
- Archetype filters on various community build list pages have been reworked. They will now exclude archetypes that are not selected, enabling further drilling down into finding builds only containing archetypes you are interested in using, and exclude all others.

### Fixed

- Fixed Brewmaster's Cork not giving the correct number of concoction slots. Broke this when I fixed the item name yesterday!
- Fixed issue where Vash export URL wasn't working if melee weapon was missing. I don't want to talk about it.

## 2024-03-11

### Added

- Build can now be exported to Vash Cowaii's Loadout Calculator at https://cowaii.io/index.html
- Builds can now be imported from Vash Cowaii's Loadout Calculator at https://cowaii.io/index.html
- Added more weapon details to their item info, including crit chance, weakspot damage, and more!

### Changed

- Removed navigation links to Collection Builds.
- Added a notice to the top of the /builder route informing users that the features are limited. This page is a landing page for builds exported from other tools, but due to limitations in the handling of URL state rather than a database, it does not have all the build features. This was confusing for users who ended up on this page.
- Changed the layout of the item information in the dialog and item cards to be more consistent and easier to read.

### Fixed

- Fixed bug in `Brewmaster's Cork` where the apostrophe was missing.
- Fixed the name of `Alpha / Omega` to match the in-game name.
- Fixed the name of `Leto Mark 1` to match the in-game name.
- Fixed the name of `AS-10 "Bulldog"` to match the in-game name.
- Fixed the name of `XMG57 "Bonesaw"` to match the in-game name.
- Added logic to better handle item names that slightly exceed the width of the item labels. Will be applying this to items that qualify as they come up.
- Improved Builder layout for mobile devices. Guns no longer require a horizontal scroll, and will instead wrap.
- Made other improvements to the responsive flow of the Builder at other screen sizes, notably some tablets.
- Updated the image of Cultist Hat to match in-game.
- Updated the image of Bandit Jacket to match in-game.
- Updated the image for Faelin.
- Updated the image of Faerin.
- Fixed issue where multi-word item tags were not getting highlighted correctly.

## 2024-03-10

### Changed

- Updated description of the Hellfire pistol to reflect (unstated?) changes in the latest patch, namely fire damage with a burning DoT.

### Fixed

- Fixed bug where Relic Fragment was not showing a completion percentage on the Item Tracker.
- Fixed bug where user profile pages would throw an error the first time after the user account was created.

## 2024-03-09

### Added

- Added `Armor Increase` to item tags.

### Changed

- Armor calculator in the Build Suggestions dialog no longer requires you equip at least 1 item armor.

### Fixed

- Fixed bug where info tooltip would display over top of item info on mobile devices.
- Fixed `archtype` typo in Traits section of Builder.

## 2024-03-08

### Added

- Hovering over the item info icon in the Builder will now show the item's description. Full click will get you more info, but a summary is now available on hover for convenience.

### Changed

- Updated Amplitude vs Resonance guide.
- Updated some item tokens and descriptions.
- Added a new and more consistent New Build badge icon.
- Updated button colors and styles to match the original look

### Fixed

- Removed black background from behind information buttons in builder.
- Patreon membership builds now use the yellow frame and glow again.
- Fixed a transparency issue with the Provisioner Ring. This may take a bit to propagate due to caching.
- Fixed UI bug causing horizontal scroll bar on Build weapons.
- Fixed typo in the Knight Guard wiki link.

## 2024-03-07

### Added

- Featured builds now have a featured build badge on their build cards

### Changed

- Overhauled the colors used throughout the site. There wasn't a ton of thought to the original colors, just what felt okay. I feel a lot better about the new direction!
- Added language to the CODE_OF_CONDUCT.md for "Gore or violence beyond the scope of the game".

### Fixed

- Fixed issue where build reference link could overflow the container
- Several items were classified as being part of the DLC, but were not. They were actually part of the update and available to non-DLC owners.

## 2024-03-06

### Added

- Added a `Build Reference Link` to the builder. This will allow users to post a link to a video or other reference material for the build. This link is non-clickable for moderation purposes.

### Changed

- The "Builds By Collection" feature has been removed from site. The page link is still active with a message explaining the change.

## 2024-03-05

### Added

- Loadout cards now have option to change loadout slot for a build.
- Loadout Dialog now has the option to reorder or remove builds. This functionality is no longer limited just to the profile page.
- Added new `[BUG]` token to be used in the future for items that may not be working as intended.
- Added CREATE A BUILD card to the list of builds on the MY BUILDS page.

### Changed

- Amplitude vs. Resonance guide updated to reflect changes from the recent patch.
- When clicking through pages on build lists, scroll to top no longer occurs
- Changed trait point coloring to also apply to text, not just the bottom border.
- Added border around trait points when editable to make it more clear it's a button.

### Fixed

- Fixed bug preventing Reddit users from creating accounts.
- Detailed build view now shows perks

## 2024-03-04

### Added

- Final aberrations added by ConRaven. That should be it...for now?

## 2024-03-03

### Added

- More aberrations added by ConRaven. Only one to go?!

### Changed

- Applied a patch affected banner to builds containing Twisted Arbalest + Bore.
- Share Build button will now append a unique token to the URL to prevent caching issues when the social media preview on Discord and other sites.
- Added more info to the README.md regarding how to request a build be featured, as well as some of the considerations that affect whether a build gets featured.
- Changed the build description layout to occupy the full width along the bottom of the build, and will no longer scroll if it exceeds a certain height. Additionally, the text size was increased to make the long text more readable.
- Updated the Vash Cowaii spreadsheet links to point to the new web based loadout calculator. Congrats, Vash!

## 2024-03-02

### Added

- ConRaven the God and BrotherFromHood have added even more aberration images.
- Delete Build button now available when viewing a build or editing a build.
- Added improved Loadout integration and assignment. Store up to 8 of your favorite builds in your personal loadouts!

### Changed

- Builds flagged as patch affected will now automatically be unflagged when updated. A script was also ran to catch those still flagged but updated before this change was deployed.
- Added note to patch affected flag that the creator can update and save the build to remove it.
- Links to user's created builds and favorited builds now includes filter to show patch affected builds by default.
- Added last updated date to builds.
- Armor suggestions now show the weight class color on the weight value.

### Fixed

- Fixed weird behavior for Save Image button where it would take longer to load than other buttons.

## 2024-03-01

### Added

- Added a new flag on builds to indicate if a build may have been affected by a patch since the build was created.
  - This is a manual flag that will be set by me after each patch. If you feel your build should not be affected, reach out on Discord.
  - For the 2024-02-29 patch, if a build matches any of the following conditions, the flag is applied:
    - Spectral Blade + Resonance
    - Stone of Malevolence
    - Sequenced Shot.
- So many more aberrations and aberration images (thank you ConRaven! thank you, Brother!)

### Changed

- Featured Builds now sort by newest first

### Fixed

- Updated the description for the Summoner Prime Perk, Ruthless.
- Fixed incorrect info in the Zealot's armor set.
- Fixed Corrupted Arbalest not importing from save correctly.

## 2024-02-29

### Added

- Added new corrupted weapons and their mods.

### Changed

- Made initial changes based on patch notes.

### Fixed

- Non-corrupted versions of weapons are no longer counted as owned if you own the corrupted version.
- Fixed bug where level 10 bonus for items was doubling up.
- Fixed bug where specific item lookup filters would cause a server error.

## 2024-02-28

### Added

- Added a new "Loadout Builds" section to your profile, where you can pin up to 8 builds to mirror your in-game loadout slots.
- Added more aberration images (ConRaven is a god)
- Added Blightspawn aberration to tracker

### Changed

- Profile link in the nav bar will now go to your public profile.
- Updated create build logic to remove the redirect. Essentially the original URL version of the builder exists at `/builder`, and the newer database integrated version is `/builder/create`. I had originally had a redirect on `/builder/create` to redirect if the user is not signed in. However, this was causing the page to not be indexed properly by crawlers. Now, an overlay explaining to either sign in or use the URL builder will show if the user is unauthenticated. Additionally, the Create Build link in the Navbar will link to the correct version based on whether the user is authenticated.

### Fixed

- Fixed bug where the logo was rendering incorrectly in build images.
- Added higher resolution home background image
- Fixed bug with status effect icons not showing correctly.

## 2024-02-27

### Changed

- Updated the builder to use more horizontal space, including in exported screenshots. This should make the screenshots more readable and usable.
- Added explosive tag to Song of Eafir after confirming with ConRaven that it does explosive damage.
- Fixed bug with new build badge not showing correctly.
- Fixed small bug where popular badge wasn't awarded at 15 votes (off by one error whyyy)

## 2024-02-26

### Fixed

- Fixed duplicate "critical damage" item in the item lookup filter.
- Fixed bug causing image export on mobile to export image buttons incorrectly. Sorry about this one!
- Fixed incorrect item description for Reprocessed Heart.
- Fixed bug with trait points in the builder, they were breaking out of the item button.
- Fixed issue where some youtube thumbnails did not render, added thumbnail override to db table.

## 2024-02-25

### Added

- The Health and Stamina stats in the builder now show the breakdown of items and how they contributed to the calculation.

### Fixed

- Fixed a bug where the tooltips would exceed the container element and cause a scrollbar in the Stats portion of the builder.

## 2024-02-24

### Changed

- Item Lookup now defaults to no items loaded, requiring at least one filter activated before elements load. This should improve performance for users, particularly on mobile.

## 2024-02-23

### Added

- Added link to Amplitude vs Resonance guide under Resources.

### Fixed

- Improved image sizing, quality, and rendering in the Item Lookup section.
- Fixed bug where Mutator and Trait `maxLevelDescription` values weren't being considered in search text.

## 2024-02-22

### Added

- Added placeholder text for build description to encourage better descriptions.
- Added button to insert a build description template to encourage better descriptions.

### Changed

- Item Tracker now shows items for one category at a time rather than all items. This should increase performance for users (mobile users in particular), as well as search engine performance.

## 2024-02-21

### Added

- Item Cards and Item Info now shows linked items. For example, the Alchemist card will now show linked Perks, Skills, and the Primary Trait. For weapons or mods, the linked weapon or mod will be displayed.

## 2024-02-20

### Changed

- Added clearer error when trying to access created or favorited builds while signed out
- Changed some status and weight class colors to match the Remnant.Wiki colors, to address accessibility concerns.

### Fixed

- Corrected UI issue with sign in button in nav bar.
- Fixed bug where menu was showing under item labels on the builder.

## 2024-02-19

### Added

- Added placeholder images for enemies/bosses that are missing.

### Fixed

- Maybe actually fixed the Discord avatar bug this time? Time will tell!

## 2024-02-18

### Added

- Build cards and build views now show the in-game build names based on the archetypes selected. For example, Ritualist + Alchemist = Diabolist.
- Search text filter now also searches by the created by user's name.

### Changed

- Linking to the Github repo will now use a toolkit specific image and stop showing my face every time!

### Fixed

- Fixed build where some Youtube thumbnails were not rendering correctly.
- Fixed issue where Discord avatar was not updating after initial account link.
- Added many more aria-labels to buttons for accessibility.

## 2024-02-17

### Added

- Added link to the Remnant.Wiki on the nav bar, under Resources.
- Added link to Enemy Resistances spreadsheet on the nav bar, under Resources.

### Changed

- Replaced Youtube embeds with still images, which should improve load times. I always wanted to do this, but didn't find how until this moment.
- Renamed "References" to "Resources" on nav bar

### Fixed

- Fixed bug where signed out users couldn't view the build descriptions of other builds.

## 2024-02-16

### Changed

- Made a bunch of changes to rendering in the hopes of reducing cumulative layout shift for better search engine optimization and user experience.
- Detailed build view on builder now lazy loads
- Created Tracker and Reference nav items to better organize the site

### Fixed

- Some item names are too long to fit on the label in the builder. Added a manual override for these items.
- Fixed bug where Vash's spreadsheet text would overlay the relic fragment label.

## 2024-02-15

### Added

- New terms added to bad word filter.

### Changed

- Added new and higher quality boss images to the Boss Tracker. This would not have been possible without the incredible work of ConRaven.

### Fixed

- Builds by Collection was not rendering correctly. This has been fixed.
- Fixed bug where user's total build favorites wasn't showing correctly on their profile
- Added Build By Collection to mobile navigation.
- Fixed ui overflow issue on item tracker.

## 2024-02-13

### Added

- Added a bar to the top of all pages asking for support for Remnant.Wiki
- Added some missing bosses to the Boss Tracker

### Fixed

- Removed bosses from autocomplete suggestions in Item Lookup
- Fixed bug with search input filtering caused by no coffee and bad conditional logic
- Fixed another bug where text not found in the list was not searchable
- Fixed Anguish description and damage stats.

## 2024-02-12

### Added

- Added appropriate meta tags for each page.

### Changed

- When saving a build with the default MY BUILD name, it will now prompt you to enter a unique name.
- Boss Tracker buttons larger and have images that fill the button.
- Changed the search text with search tags dropdown menus to a single search box with autocomplete for tags and items. This should make it easier to find items and tags.

### Fixed

- Fixed bug preventing item info icon from appearing.

## 2024-02-11

### Added

- Build Suggestions have replaced the Armor Calculator button in builds. The build suggestions button will now let you receive armor suggestions, but it will also give you item suggestions based on internal tags, such as BLEEDING, SLOW, etc.
- Added tag endpoint to get summaries of all items for a tag in social media previews. To use, link to `https://remnant2toolkit.com/endpoint/tag/{tagName}`, removing spaces and capitalization. Ex: `https://remnant2toolkit.com/endpoint/tag/chargedmelee`

### Changed

- Changed item endpoint from `/item` to `/endpoint/item` to better organize other endpoints.

## 2024-02-10

### Added

- Expanded the search text to include linked weapons and mods.

### Fixed

- Replaced bad url in a couple of meta tags, preventing item linking from working correctly
- Fixed bug where the Shadeskin trait was not increasing elemental resistances

## 2024-02-09

### Added

- Boss Tracker has been added to the ITEM link in the nav bar. Now you can track the world bosses, bosses, and aberrations you have defeated!
- Added Favorite Builds to navigation bar

### Changed

- `relicfragment` updated to read `relic fragment` throughout the site. This is to match the in-game naming convention.

### Fixed

- Restored `Enter` key submitting filters on the various pages.

## 2024-02-08

### Added

- You can now link to specific items, i.e. https://remnant2toolkit.com/item/bandofaccord. Share links have been added to item cards and item info.

### Changed

- Updated the Item Lookup page filters to be used in the URL, allowing you to share a link to a specific set of tags with the filters applied.

## 2024-02-07

### Changed

- Swapped the order of the More Info and Wiki links in the foot of item cards
- Added search tags to the ItemSelect dialog in the builder

### Fixed

- Fixed issue where the user's favorited builds was just returning all builds
- Fixed bug with profile button and menu button on mobile, all UI related
- Fixed some text overflow issues in Chrome

## 2024-02-06

### Added

- Filters for various build lists now written to the URL. This will allow you to share a link to a specific set of builds with the filters applied, as well as maintaining the filters if you refresh the page.
- Added Item Info button to trait points on builder.
- Added ability to add tags to the search text for the Item Lookup. This allows the user to search by tags that they may not be aware of, such as `[A]` for Amplitude or `reduce skill cooldown` to find items where the descriptions are inconsistent.

### Changed

- Builds by Collection should now be quicker. Discovered items are saved to the database once when you visit the site, rather than on every request like previously.
- Added notice at the top of private builds informing users the build is private.
- Updated handling of builds with bad language to prevent them from showing up in the community builds.
  - Builds flagged for bad language now are privated by default.
  - Builds flagged for bad language have the words replaced with asterisks.
  - Three asterisks in a row are considered bad language based on the prior two points, with the goal of preventing circumvention of the filter.

### Fixed

- Item Tracker save import allowed file size has been increased. This was mistakenly lowered in a previous update.
- Fixed error in description of `Diverting Heart`
- Fixed bug allow trait points to be clickable on Builder even if not your build. Traits were not allowed to change, but the UI still allowed you to click them.

## 2024-02-05

### Changed

- Pagination uses URL query params now. This will allow you to share a link to a specific page of builds, as well as maintaining the page if you refresh the page.

### Fixed

- Fixed bug where 0 results would show "Showing 1 of 0 of 0"
- Fixed bug where long urls in descriptions broke out of the build card

## 2024-02-04

### Added

- You can now import a CSV file to the Item Tracker.
- You can now filter builds by a search term against the build name or build description.

## 2024-02-03

### Added

- You can now filter builds by an amulet or ring in the various build lists.
- Added Challenger specific description to Weight tooltip in the builder to account for the Powerlifter perk.
- Added tooltip to Armor in the builder to show the Armor Damage Reduction formula.
- Added CODE_OF_CONDUCT.md to repo and linked to it in the Builder near the public visibility toggler.

### Fixed

- Fixed bug preventing duplication of builds
- Fixed bug where MY BUILDS was not showing private builds

### Changed

- Updated the CONTRIBUTORS.md file to specify the different types of contributors.

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
