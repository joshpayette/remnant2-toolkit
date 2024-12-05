# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 2024-12-04

### Fixed

- The location of a number of items was imprecise or inconsistent. (Big thanks to Split for the help!)

## 2024-12-01

### Fixed

- Fixed bug in tooltip for Beginner Builds icon.
- Fixed bug in the Builder where you could equip mods to melee weapons that shouldn't allow it. Only melee weapons with linked mods can have mods.
- Fixed bug preventing Shovel from allowing a mutator to be equipped.

**Note**: This all came to be because I previously tried to fix a bug where equipping the shovel would not pass the quality build check. My implementation was poor. This fix should work more as expected while still addressing the original bug.

## 2024-11-28

### Fixed

- Found a bug when checking whether a build is quality or not, causing some builds to not be quality when they should have been. The bug in the logic has been fixed. Additionally, I manually ran a script to update all current builds with the correct quality value.

## 2024-11-26

### Fixed

- For the 900th time, it's called Forbidden Grove, not Forgotten Grove. Updated Hardcore Veteran guide to reflect this reality.

## 2024-11-25

### Fixed

- Item Export to CSV was breaking due to a `#` in the Prism wiki link. This has been fixed.

## 2024-11-24

### Fixed

- Fixed description on Critical Damage relic fragment.

## 2024-11-22

### Added

- Added details about showing item ownership on the Builder Help dialog.

## 2024-11-21

### Changed

- Updated quality build logic. Whether a build was quality used to be run in the SQL query. Now it is a field that is assigned when a build is created or edited. This should reduce the compute load on the db.
  - I ran a script along with this change that should preapply the quality field for all current builds.

### Fixed

- Adding build variants to build collections was not properly displaying the entire build when you clicked into the build.
- Fixed issue where a build would fail the quality build check if it had a melee weapon with no mod slot and a build variant with any melee weapon.
- Fixed issue where rusty weapons were allowed to equip mutators in the builder.

## 2024-11-20

### Added

- There is now a Help button above the builder that will give a quick rundown of some of the features of the builder.

### Fixed

- Fixed bug that prevented the sorting of Traits with the in-game ordering in the builder.
- Updated numerous item descriptions to match updates to the wiki.
- Breach Accelerator was mistakenly marked as "base game" rather than "dlc3".
- Meat Shake was mistakenly marked as "base game" rather than "dlc1".
- Mystery Jerky was mistakenly marked as "base game" rather than "dlc1".
- Mudtooth's Snake Oil was mistakenly marked as "base game" rather than "dlc3".

## 2024-11-19

### Added

- You can now create Build Collections! This feature allows you to group up to 32 builds into a single shareable collection. You can add a name and short description to each build collection. Build Collections can be viewed on the user's profile page.

### Changed

- Legendary Prism Fragments now have direct links to the Remnant.wiki page for the item.
- Linked Builds link removed from user profiles. This can still be found by manually adding /linked-builds at the end of your profile link. This feature is no longer officially supported.

## 2024-11-18

### Fixed

- Item ownership icon removed from legendary prism fragment, as they cannot be tracked in the Item Tracker.
- Fixed Archon/Summoner combo name. Was "Tempest Invoker" and it should be "Tempest Augur".

## 2024-11-16

### Fixed

- Renamed fragment `Mod Power Generation` to `Mod Generation` to match in-game text.

## 2024-11-12

### Changed

- Avatars on user profiles can now have a background color. This will help with some of the custom avatars that have transparent backgrounds, as they become less visible on light themes.

### Fixed

- Added new Melee tag to account for items using the term `unarmed`.
- Added Critical Damage tag to Overdrive.
- Added Melee Critical Damage tag to Overdrive.
- Added Melee tag to Meteorite Shard Ring.
- Added Melee Damage tag to Meteorite Shard Ring.

## 2024-11-11

### Changed

- When adding a build to your loadouts, it will now add the specific variant you are viewing, rather than the main build. This should make it easier to remember which variant you are using.

## 2024-11-10

### Fixed

- Ring of Phantom Pain was marked as `dlc3` rather than `base`.
- Infinity Pocket was marked as `dlc3` rather than `base`.
- Hidden Power was marked as `dlc3` rather than `base`.
- Volatile Strike was marked as `dlc3` rather than `base`.
- Sweet Leaf was marked as `dlc2` rather than `base`.
- Fixed bug in Quality Build check that was preventing builds with rusty weapons or shovel from being seen as "quality" due to the missing mod slot.

## 2024-11-09

### Added

- Added a link to BoltJamison's Prism crafting guide to the Resources page.

## 2024-11-08

### Changed

- Added separate metadata for each build variant. This should mean when you use the specific variant links in Discord or other social media platforms, it will use the build variant description and title rather than the information from the main build.

### Fixed

- Updated Mutator item descriptions to match Remnant.wiki updates.

## 2024-11-07

### Changed

- You can now set separate build tags for each individual build variant. Not sure why it wasn't already like this.
- When trying to apply the Base Game build tag on a build, a check now occurs if the build contains any DLC items. If it does, the tag will not be applied. Instead, a dialog will display with what items need to be changed.

### Fixed

- Updated a number of item descriptions to match the Remnant.wiki data.

## 2024-11-06

### Fixed

- Zero Hour amulet was mistakenly labelled as DLC3 rather than Base Game.

## 2024-11-05

### Changed

- Updated weapon stats based on the latest patch notes.
- Builds with Star Shot + Power Trip item combination have been marked as Patch Affected.
- Added Explosive Damage tag to Concussive Shot.

## 2024-11-04

### Changed

- Empty consumable, concoction, and boss rush slots no longer show on builds.
- Restored total item count to paginated results. This was removed due to database load concerns, but I have since seemingly found a way to make it work without issue.
- Added Stagger tag to Steadfast.

### Fixed

- Fixed issue where user's created builds on their profile were not including patch affected builds by default.
- Removed Mod Power tag from Hyperconductor.

## 2024-11-03

### Fixed

- Build filters in the URL were using item ids instead of item names. This was an oversight, and has been corrected.

## 2024-11-02

### Added

- New build filter to only show builds with optional or empty legendary gems. If a build or any variant has an empty or optional legendary gem, it will show in the results if this filter is set to Yes.
- When saving a new or editing an existing build, a dialog will now appear if the build is not considered a "quality build". The dialog will tell you what needs to be fixed to make the build a quality build, or you can save the build anyway.

### Change

- Added a bit more spacing between select menus on the build filters.
- Added purple background color to the "Quality Build" and "Optional Legendary Gem" filter to make it stand out more.
- Updated boss rush pylon logic on builds. Boxes will now always be visible when editing a build, but you can only click them if the Boss Rush tag is applied. If the Boss Rush tag is not applied, a red text will appear stating that is why the buttons are disabled.

### Fixed

- When creating or editing a build, the label for the `Relic` slot mistakenly read `Prism`.
- Mistakenly only added "Only Builds w/ Optional Leg. Gem" filter to a single build feed.
- Fixed coloring on new build filter select boxes for light mode users.
- Fixed bug where item ownership percentages were including legendary fragments in the total count, leading to builds showing as 97% rather than 100%.

## 2024-11-01

### Added

- In build filters, when filtering by a single archetype, you can now specify which equip slot you want that archetype to be in.
- You can now equip boss rush pylons in the builder as long as the Boss Rush build tag is also applied.

### Fixed

- Fixed Vash import/export functionality. To be clear, I broke this. I am the problem. It's me.

## 2024-10-31

### Changed

- Reworked the build filters to be more expansive. You can now filter on more categories of items, as well as choose which items to include/exclude. This was a big update, so there may be bugs. Please report them if you see them and I'll address!
- Item Cards now link directly to builds that contain the items. This feature existed previously, but is now improved with the new URL params introduced in the build filters.

## 2024-10-27

### Fixed

- The clear button on the build filters got borked a few weeks back and I didn't notice. My bad. This should fix it while I finish the new filters.

## 2024-10-26

### Fixed

- Fixed some inconsistencies in pagination in build lists.
- Changed `Mod Generation` relic fragmet to `Mod Power Generation` to match in-game.
- Health Bonus was giving 15% instead of 10%.
- Fixed ordering of trait items. No idea why I had them sorting the way I did.

## 2024-10-25

### Added

- Added ability to pop out a build description to a separate tab. This should help read longer descriptions while also looking over build items.

### Changed

- The max character limit for build descriptions has increased from 3k -> 5k characters.
- Previously, Mudtooth's Snake Oil could be equipped as long as it was not the last concoction slot. It would add another concoction slot to offset the slot it took. This is not exactly how it should work. Rather, it shoudl always be equippable. Added new logic and a button allowing you to add Mudtooth's Snake Oil at any time, even if all concoction slots are full.

### Fixed

- Quality build feed now excludes builds with the term `(copy)` in the build name. This is to exclude duplicate builds with no changes made.
- When duplicating a build, only the main build name was being appended with `(copy)`. All variants are now also appended with `(copy)`.
- Updated trait item descriptions for consistency in displaying the full range of affected stats between level 1 and level 10.
- Fixed item location info for Ascension Spire items. Ascension Spire is both an injectable and a dungeon for location purposes.
  - Vice Grips
  - Salvaged Heart
  - Microcompressor
  - Meteorite Shard Ring
  - Burden of the Mariner
  - Void Idol

## 2024-10-24

### Fixed

- Item Lookup search text was not including item tokens in the autocomplete suggestions.
- Fixed typo in beginner badge tooltip text.

## 2024-10-23

### Added

- Added ability to mass delete all your tracked items from the Item Tracker.

### Changed

- Build cards will now show an empty star if you have not favorited the build, and a full star if you have favorited the build.

## 2024-10-22

### Fixed

- Updated several item descriptions to match the information in Remnant.wiki.
- Added `Skill Duration` tag to Hyperconductor.

## 2024-10-21

### Fixed

- Fixed bug preventing builds with lengthy descriptions on each variant not saving due to a data limit on the server.
- Fixed bug where adding a build to a loadout slot would not update the loadout slot until the page was refreshed. The loadout slow now updates immediately.

## 2024-10-20

### Fixed

- Fixed a bug where exporting a build to image on mobile would put the melee weapon in the right most column, rather than the middle.

## 2024-10-19

### Fixed

- Fixed bug preventing Fusions from increasing health, stamina, and armor totals in the build stats.

## 2024-10-18

### Fixed

- Updated location acquisition info for the following items:
  - Steadfast
  - Ornate Flail
  - Sapphire Dreamstone
  - Bandit
  - Ring of the Damned
  - Stockpile Charger
  - Shiny Hog Lure
  - Twisting Wounds
  - Shaed Stone
  - Effigy Pendant
  - Bypass Primer
  - Golden Ribbon
  - Silver Ribbon
  - Burden of the Stargazer
  - Momentum Driver
  - Slayer's Crest
  - Blooming Heart
- "Fixed" the spelling of Earthen Colosseum to match in-game spelling of "Earthen Coliseum"

## 2024-10-16

### Changed

- Updated Hardcore Veteran guide to suggest Invoker as the primary archetype. It previously suggested starting Invoker, then once you get Ritualist, to make Ritualist the primary.

### Fixed

- Twisted Idol was incorrectly reducing encumbrance by 15 instead of 20.
- Added `Misty Step` token to Canine Keepsake.
- Fixed incorrect `Consumable Duration` fragment description.

## 2024-10-15

### Fixed

- Fixed a bug for Reddit users preventing some user avatars from loading in the avatar at the top of the site.

## 2024-10-14

### Changed

- Updated the user profile stats to use icons. Also added additional profile stats.

### Fixed

- Threshold fusion was using Base Health rather than Health Bonus.
- Any fusions using armor, stamina, or health were not accruing towards those totals in the build stats. That has been fixed.

## 2024-10-12

### Changed

- Updated the icons used throughout the site to come from a single package. The larger package had more icons to choose from, but was severely crippling development load times and deployment size.

### Fixed

- Updated two world saves that were incorrectly labelled.
- Updated biomes for additional accuracy in item locations.

## 2024-10-11

### Fixed

- Updated item locations for several items (thanks, Split!)
  - Crisis Core "Any-World drop" -> N'Erud - world drop
  - Quantum Memory "N'Erud - Detritus Foundry" -> N'Erud - Crop Lab injectable
  - Short Circuit "N'Erud - Mucid Terrarium" -> N'Erud - Power Hub injectable
  - Repercussion "N'Erud -" -> Crop Lab aberration
  - Gossamer Heart "N'Erud - Detritus Foundry" -> N'Erud - Crop Lab injectable
  - Bypass Primer "stealth maze injectable" -> Security Drone Maze injectable
  - Combat Shield Generator "N'Erud - Mucid Terrarium" -> N'Erud - Power Hub injectable
  - Shield Alternator "N'Erud - World drop" -> N'Erud - Prototype aberration
  - Genesis "N'Erud - world drop" -> N'Erud - Withered Necropolis
  - Monorail "Ward 13 - Vendor" -> N'Erud - Quest
  - Repair Tool " Ward 13 - Vendor" -> N'Erud - Agronomy Sector
- Fixed injectable and biome classifications to give better information in the location of items.

## 2024-10-10

### Changed

- Secondary build filters (order by, time range) are now persisted to the URL, allowing these settings to be shared as well.

### Fixed

- Fixed bug with user avatars not displaying correctly on profile.
- Fixed bug where you could equip more than 4 fusions on a build.

## 2024-10-09

### Fixed

- Shovel was marked as DLC2 when it should have been marked as BASE.

## 2024-10-08

### Added

- Added Base Game Build badge to curated builds that qualify.

### Changed

- Build result pagination will now allow you to click specific pages again. While I put some guard rails up, it is still possible to click too high of a page and get zero results. However, being able to click specific pages seemed to still be helpful in spite of this.

### Fixed

- Prism label was showing in build screenshots.

## 2024-10-07

### Added

- Added a Beginner Build badge for curated builds that quality.
  - Base Game build badge coming soon!
- Added locations for all prisms.

### Changed

- Gimmick Build badge made brighter for more pop.
- New Build badge updated to better match intent.
- Added Prisms to trackable items on the Item Tracker.
- Build variants will now show the same badges as the main build.

### Fixed

- Item Tracker total included prisms, but you could not track prisms. Added the ability to track prisms to account for this.

## 2024-10-06

### Added

- Item Lookup filters now have a "Not world drop" entry in the dropdown, making it easier to look at a list of only the items you need to farm.
- Gimmick Builds now show a unique build badge. Badges for beginner and base game builds coming soon!

### Changed

- Removed the masonry-styled smart grid from the Item Lookup list. While it was nice to try to save space using the grid, it introduced a number of frustrating maintenance and UI interactions that I felt outweigh the tighter grid spacing it offered.

### Fixed

- Styles on the toast notifications were not working correctly on all themes.

## 2024-10-05

### Changed

- Genesis code display now has improved and uniform look for light mode users.
- Bad word list updated to allow `shit` and `asshole`.
- Removed total pages and total result count from all paginated build results. This functionality essentially required the same query to run twice. With the increased database load, it seemed better to halve the amount of queries versus the gain of having a total build and page count.

### Fixed

- Fixed issue with item lookup filters giving a server error in some situations.
- Dark Matter Gauntlets were incorrectly marked as base game.

## 2024-10-04

### Changed

- Added user avatar and display name to nav menu for mobile users.

### Fixed

- Fixed bug where mutator description was showing beneath max level description in Item Info dialog boxes.
- Updated Genesis item descriptions and values.
- Updated other miscellaneous item descriptions.
- Added black background to genesis code for light mode users.
- Fixed bug where you could equip fragments even though they were part of an equipped fusion.
- Fixed bug where item lookup list would flicker when tabbing out and back in.

## 2024-10-03

### Added

- Added Genesis code to the home page.

### Fixed

- Fixed bug with build variants showing on feeds they should not have been.
- Fixed bug where build variants were showing 0 favorites.
- Fixed quality build requirements that were erroneously excluding builds using melee weapons that cannot have mods.
- Fixed bug where build variants and main bu ild could have different privacy settings.

## 2024-10-02

### Added

- Added missing Warden archetype combo names.

### Changed

- Amplitude tag has been replaced by AOE/Aura Size to match in-game.
- Build Variants will now also show up in community build results. Links will go straight to the variant. The build card will show the name of the main build, since build variant names typically lack context, but have a (Build Variant) note under it.

### Fixed

- Fixed small bug preventing toggling newly added items as optional in some situations.
- When the Traitor legendary gem is equipped in the builder, the core traits in the build are now maxed as described in the item description.

## 2024-10-01

### Added

- Added several new world saves to the World Save Archive.
- Added new items.

### Changed

- Removed the Builds By Collection link from navbar, as that functionality is now included in the filters.
- Updated melee weapon item descriptions to match the Remnant.wiki.

## 2024-09-30

### Added

- Added the ability to sort builds by percentage of items owned. Update your items in the Item Tracker, and then use the new build filter!
- Added more new items.

### Fixed

- Added new items to the Cowaii.io import/export process.

## 2024-09-29

### Added

- Added a new script to scrape the Remnant.wiki data, and then compare it against Toolkit data. This helps a ton with keeping up on new items and any corrections needing to be made. It also allows contributors to only need to contribute once, to the wiki, in order to make the correction on Toolkit.

### Changed

- Removed legendary relic fragments from Item Tracker.

### Fixed

- Fixed error when trying to load a randomized build.
- Fixed an issue preventing prism and fusions from working in unauthenticated builds.
- Corrected a bunch of item descriptions and values based on the Remnant.wiki data.
- Added Burden of the Mason logic to the weight calculations.

## 2024-09-28

### Added

- Added a few more discovered rings and amulets.

### Fixed

- Corrected description for `Short Circuit`.
- Fixed bug preventing the same fragment from being marked optional independently.
- Corrected a bunch of save file import paths and item descriptions.
  - Wrote a new wiki parser and have been correcting deviations in Toolkit data.

## 2024-09-27

### Added

- Quality Builds now allow 145 points if Traitor is equipped as a legendary gem.
- Added more new items.
- Added more enemy images to the Boss Tracker. (thanks ConRaven!)
- Added more avatars to use on your profile! (thanks ConRaven!)

### Fixed

- Fixed bug preventing relic fragments from being equipped in the main slots if equipped in the bonus slots, and vice versa.
- Fixed bug causing items to be highlighted mid-word. Ex: `mage` showing up in the word `damage`.
- Fixed bug where I forgot there are more than 3 relic fragments now, causing some quality builds to not show in the quality build feed.
- Reclassified Light Extract as a consumable (was mistakenly labeled a concoction).
- Remember when we could add builds to loadout? Well, I didn't. I added the button back to add builds to loadouts - this was removed mistakenly.
- Updated all relic fragment descriptions and file paths for more consistent importing from save files. (Legendary fragments coming soon!)
- Fixed issue where fragments and fusions could be equipped in scenarios they shouldn't.
- Added missing fusions and updated text for all fusions.
- Added a number of new fragments and items to the various calculations in the builder.

## 2024-09-26

### Added

- You can now slot prisms, fragments, and fusions on your builds!

### Fixed

- Fixed bug preventing some build edits from saving.

## 2024-09-25

### Added

- So many new items!

### Changed

- Share build button will now share directly to the currently visible variant.

## 2024-09-24

### Changed

- Builds with Faelin's Sigil have been marked as patch affected.
- Builds with Starkiller have been marked as patch affected.

### Fixed

- Fixed issue where build variant dropdown could get too wide on mobile devices.
- Build variants will now show the main build video thumbnail if no separate video url is provided.

## 2024-09-23

### Changed

- Rewrote logic to create and update builds to better accomodate the new Build Variants feature. This should fix a number of issues that were cropping up with the new feature.

### Fixed

- Fixed issue causing builds to not correctly display if the user favorited them.
- Fixed bug preventing builds from saving if you updated trait points.

## 2024-09-22

### Added

- Item Cards will now let you click where you can view the number of builds the item is found in. Clicking will take you to the build page with the item filter applied.

### Changed

- It is no longer a requirement for Quality Builds to have items selected for armor slots.

### Fixed

- Footer icons were not showing on light mode due to style misconfiguration.

## 2024-09-21

### Added

- Build variants are now live. These work similar to how Linked Builds work, with some notable differences. Namely, when visiting a build URL, the build variants will have tabs along the top showing the variants inline, without requiring clicks to a different page. Existing builds can have variants added to them. Additionally, creators can now add build variants while creating a build, making the process more seamless overall.
  - This is a new feature, and a big overhaul, so there may be some bugs. Please let me know in the Discord if you find any.
  - Each build variant can have its own youtube video embed.
  - Can link directly to a build variant by adding `?variant=1` or `?variant=2` after a build URL. This will be incorporated into the UI soon.

### Changed

- Quality Build filter is now on by default when viewing build feeds. There is a button above and below the build list to easily apply/remove the filter.
  - Quality Build filter defaults to false on your Created Builds and Featured Builds pages on your profile.
- Quality Build definition updated to include the requirement that a build is not named "My Build."

### Fixed

- Profile stats no longer include build variants in the stat totals.

### Removed

- Linked Builds are being deprecated. You can still view existing Linked Builds, but you can no longer add or edit them. Truthfully, I should have incorporated Linked Builds in the way that Build Variants now work at the outset. However, trying to manage the Linked Build architecture with the existence of Build Variants added too many odd scenarios that would add a lot of overhead moving forward that didn't feel worth it for the benefit that Build Variants provide compared to Linked Builds
  - I am planning on adding a button to existing Linked Builds to convert them to build variants, to try and save some work that builders had already put into Linked Builds.

## 2024-09-20

### Changed

- Fixed builder button sizes at some resolutions. No idea why it was the way it was.

## 2024-09-16

### Added

- You can now use the Warden and all known skills/perks.
- You can now use the Repair Tool handgun.

### Fixed

- Fixed bug not showing negative stagger modifiers on weapons.
- Fixed bug with Discovered/Undiscovered Item Lookup filters not working correctly in some situations.

## 2024-09-14

### Fixed

- Updated some typos or confusing phrasing in the hardcore veteran guide.

## 2024-09-13

### Fixed

- Elemental Resist Relic Fragment was incorrectly adding 10 Bleed and 10 Blight Resistance.

## 2024-09-10

### Added

- Added "Random Build" link to build menu.
- Added "Random Build" url - https://remnant2toolkit.com/random-build

### Changed

- Requesting a random build will now only randomize from items you own rather than all items. If you have no items discovered in the Item Tracker, it will use all items.

## 2024-09-05

### Fixed

- Fixed bug where you could not remove equipped items when editing a build.
- Fixed bug where user loadouts were not displaying.

## 2024-09-04

### Fixed

- Resolved bug where an approved video thumbnail could disappear if the build was edited after approval within the first 12 hours of the video link being added.

## 2024-08-29

### Changed

- Added language to the CODE OF CONDUCT clarifying that public warnings may be issued for conduct that occurs in the Discord server.

## 2024-08-28

### Fixed

- Nightfall weapon was not showing the Dreadwalker mod as "owned" due to a typo.

## 2024-08-24

### Changed

- Updated the Total Favorite Counts leader board to exclude the build creator's votes for their builds from the totals.

### Fixed

- Fixed bug with build description textarea sizing inconsistencies.

## 2024-08-23

### Fixed

- Item Lookup was not using correct data source for discovered/undiscovered items from the Item Tracker. This has been fixed.

## 2024-08-22

### Fixed

- Fixed a bug preventing YouTube playlist URLs from rendering thumbnails correctly on the builder.

## 2024-08-19

### Added

- Created new `Gimmick Builds` section. This will be a curated list of builds that strongly adhere to a theme or gimmick, regardless of whether they are capable of clearing apocalypse difficulty or not.

### Fixed

- Fixed bug where extending the height of the description field on the builder would cause the token and template links to overlap it.
- Updated the `Ziggurats` injectable to no longer include Kaeula's Rest and Cathedral of Omens, as well as added Earthen Colosseum and Proving Grounds.

## 2024-08-17

### Added

- Resources page now has a link to the Remnant Modding Discord community.

## 2024-08-16

### Fixed

- Fixed issue where Favorited Builds were not loading on your profile.
- Battle Mage mutator was mistakenly listed as "dlc2" instead of base game.
- Spellweaver mutator was mistakenly listed as "dlc2" instead of base game.
- Added Explosive Damage tag to Deadwood mod.
- Added Explosive Damage tag to Guardian's Fury mod.
- Added Explosive Damage tag to Helix mod.
- Added Explosive Damage tag to Loathe the Weak mod.
- Added Explosive Damage tag to Space Crabs mod.
- Added Explosive Damage tag to Supernova mod.

## 2024-08-14

### Added

- Builder now has a button to toggle item ownership icons on builds. This will add a red/green icon to the top left of each item in a build, as well as a total count at the top of a build. This setting is stored locally, so the preference will persist across all builds you view on the same device.

## 2024-08-10

### Added

- Home page now displays the top 10 users with the most build favorite counts.
- Added more precise time ranges for the "Last updated at" field on builds. Previously it would max out at "over a week ago".

### Changed

- Improved the look and behavior of the leader boards.

## 2024-08-09

### Added

- Item Quiz leaderboard now appears on the home page.
- Item Quiz leaderboard now links to the profiles of the top ranked users.
- Added link to latest Patreon update posts.

### Changed

- Home page now has a two-column layout on larger screens.
  - Other pages are a bit wider on larger displays due to this change.

### Fixed

- Fixed bug on user profile page when determining the total items discovered.

## 2024-08-08

### Added

- The Item Quiz now displays a Top 20 leaderboard.

## 2024-08-07

### Added

- Added **Builds by Collection** link to Builds menu.

### Changed

- Ran a script that should have applied ownership to all linked mods for all users based on the guns the owned at the time the script ran. This should fix the issue where linked mods were not being tracked as owned items, thus preventing some builds from showing up when viewing Builds by Collection. If you still feel you are not getting all results, you can untoggle/toggle a single item on the Item Tracker to trigger the update to the database.

## 2024-08-06

### Added

- Builds by collection is back, and you can now filter builds by items you own! Use the **Include** build filter for **Only Owned Items**.
  - Because linked weapon mods were not tracked before this, you must untoggle/toggle one item on the Item Tracker in order to trigger the update to the database. Failure to do this will omit many builds because you don't "own" the linked mods.

### Fixed

- Finally fixed once and for good (god I hope) the quality builds filter breaking.

## 2024-08-05

### Fixed

- Fixed bug where featured build badge was overlapping heading in some situations.

## 2024-08-04

### Added

- Item info dialog now shows which DLC the item is from. This information is found next to the information about where the item is found in the game.

### Changed

- Moved Community Builds higher up in the Builds menu.

### Fixed

- Icons to add/remove items from comparison were swapped.

## 2024-08-03

### Added

- Created automated scripts that will check every 2 hours for certain milestones, and then send a message in the Discord when they are reached.
  - Added a milestone notification for 3k total public builds.
  - Added a milestone notification for a build reaching 25 favorites.

### Changed

- Quality Builds filter enabled again. Unfortunately, this is expected to break again, but the data will help my host diagnose and try to resolve the issue, as it appears to be something on their end. If you see the quality builds filter fail, please use the bug report button to let me know. Thanks!

### Fixed

- Fixed a bug allowing some builds to be marked as "quality builds" even with empty item slots.

## 2024-08-01

### Changed

- Temporarily removed the Quality Build filter. Unsure of why the loading issue has returned, but trying to work through it.

## 2024-07-28

### Changed

- Small update to the subtitle text in the Armor Calculator to clarify that it takes your equipped armor into account.

## 2024-07-27

### Changed

- Updated icons used throughout the site to be from a single source. I was previously using two different packages and wanted to consolidate to one.
- Added information to Featured Builds page header about how to submit a build for consideration.
- Added information to Beginner Builds page header about how to submit a build for consideration.

## 2024-07-23

### Added

- Brand new "Base Game Builds" link added to the Builds menu. This will showcase a curated list of builds that do not require any DLC to play.

### Fixed

- Fixed major bug affecting the filtering of builds by release. When fixing a number of world drop items that I erroneously set as requiring a specific DLC, I only fixed it in the front-end and never fixed it in the database itself. If a build contained one of these mischaracterized items, and a user filtered for specific releases, the build may not have been returned in the results. While I'm pretty sour that this bug happened in the first place, the fix does list many more builds for the base game, which is a win.

## 2024-07-20

### Changed

- Amplitude token added to Black Tar (Vash)
- Amplitude token added to Hunter's Shroud (Vash)
- Amplitude token added to Flying Bomb Trap (Vash)
- Amplitude token added to Vampire Blade (Vash)
- Amplitude token added to Heatwave (Vash)

### Fixed

- Navigator's Helm Blight Resistance 1 -> -1.
- Atonement Fold damage numbers in description updated.

## 2024-07-19

### Changed

- Reenabled Quality Builds filter.

## 2024-07-18

### Changed

- Temporarily disabled the ability to filter by Quality Builds due to a technical issue with the database provider. Hoping to resolve this soon.

## 2024-07-15

### Fixed

- Fixed issue where top of build was getting cut off.
- Fixed bug where select menus were not allowing you to change values with mouse clicks.

## 2024-07-13

### Changed

- Removed `willy` from bad word list.

### Fixed

- Fixed an issue where incrementing the build's view count would also update the "last updated at" value. Unfortunately, there is no way to reverse this for builds that have already been viewed but not actually updated, but this will even out in about a week or so.
- Fixed a bug where view count was sometimes not incrementing due to caching.

## 2024-07-12

### Fixed

- Fixed issue where dialogs would pass clicks through to elements beneath them, causing unintended and frustrating behavior.

## 2024-07-11

### Fixed

- Fixed (I believe) the issue on build list pages where changing a filter would return stale results after several seconds, followed by the real results several seconds after that. This was incredibly confusing and poor UX for the user, particularly since you couldn't tell the real results were returned at first. This is a challenging issue to fix, and while I believe I have fixed it, I will continue to monitor to be sure.

## 2024-07-10

### Added

- Builds now show validated views. These are views by authenticated users only, limited to 1 view per user.
- You can now sort builds by validated views on the various build feeds.

## 2024-07-09

### Fixed

- Fixed issue preventing mod images from loading correctly.
- Fixed issue where randomizing a build would yield more than 110 trait points.
- Fixed an issue where tooltip text was adding `...` even if the text was not truncated.
- Fixed a bug where a Build Reference Link over 190 characters would prevent a build from saving and crash the page.

## 2024-07-08

### Added

- Started tracking "validated views". These work similar to view count, except it is only tracked 1 per authenticated user. Unauthenticated users are not counted. This value will be used to filter builds by "most viewed" in an upcoming update.

### Fixed

- Fixed bug where "Create Build" menu link was always going to unauthenticated builder.

## 2024-07-07

### Fixed

- Total favorites now show on the build cards for the Quality Build feed on the home page.

## 2024-07-05

### Added

- Builds now display the total view count. This excludes the builder's views of their own build.
- Builds now display the total duplicate count. This is the number of times the build has been copied by other users.
  - **Note**: This is not retroactive - sorry!
  - **Note**: These counts are not used for any ranking or sorting purposes. They are just another way for builders to see the impact of their builds on the community.
- Quality Build feed added to home page, which will automatically update with new quality builds as they are created.

## 2024-07-04

### Fixed

- Rewrote the LOCALSETUP.md instructions that should work with the new monorepo structure of this project.
- Updated the ARCHITECTURE.md file to reflect the new monorepo structure of this project.

## 2024-07-01

### Added

- Added `Lodestone Set` token.
- Added `Navigator's Set` token.

## 2024-06-30

### Fixed

- Fixed issue where if you applied new build filters before the first set of results returned, it would cause results to display outdated info. I'm still seeing some issues of stale results coming back, but to a far lesser degree.

## 2024-06-28

### Added

- Items now have a `Misty Step` tag to better identify items with this synergy.

## 2024-06-25

### Changed

- Tooltips in build descriptions were limited to a subset of item categories. This inconsistent behavior has been fixed so that all item categories will show a tooltip. To offset the potential super long descriptions creating an unwieldy tooltip, the descriptions are capped at 200 characters. Clicking the item name will still reveal a dialog with full item info.

### Fixed

- Fixed issue where input box for editing traits in a build was white and unreadable.

## 2024-06-24

### Added

- Added bad word filter check to the build link field.

### Fixed

- Increased size of sign in button on mobile to match the other links.

## 2024-06-23

### Fixed

- Fixed issue on the Item Quiz where number labels were not matching up with keystroke detection. Not sure if this was an issue before I started refactoring or if I introduced and then fixed it before you all saw it, but either way it's not a problem now!
- A number of rings and amulets introduced with the second DLC, but not requiring the DLC, were listed as DLC specific items. The no longer show as DLC 2 specific items in filtering.

## 2024-06-21

### Broke

- The Docker instructions in LOCALSETUP.md are no longer working after the changes to the project structure. I'll work to get this sorted out in the future.

### Fixed

- Removed all variations of `arse` from the bad words list.

## 2024-06-19

### Changed

- Made improvements to icon sizes and spacing when creating and editing builds.
  - It is now also less likely for you to accidentally delete a trait due to poorly constructed spacing on my part.

### Fixed

- Removed `fitt` from bad word list. Not even sure why it was on there honestly.
- Fixed typo in world save archive instructions.

## 2024-06-16

### Fixed

- Removed erroneous world save for Shrewd Elemental Resist/Thick Skin.

## 2024-06-15

### Added

- Added World Save for The Stonewarden Spiteful/Thick Skin. (Vash)

## 2024-06-14

### Added

- Added World Save for Faelin Hearty/Thick Skin. (Vash)
- Added World Save for Faerin Drain/Hearty. (Vash)

### Changed

- Updated the Hardcore Veteran guide with some new information after the latest DLC.

### Fixed

- Renamed World Save for Faelin Elemental Resist/Hearty to Elemental Resist/Vicious.

## 2024-06-13

### Fixed

- Private builds added to public loadouts will now be displayed as private in the loadout.

## 2024-06-11

### Added

- You can now import your in-game loadouts into the Toolkit. Go to your Profile -> Loadouts to import the loadouts from your profile.sav. This is a beta feature that still may have bugs. If you encounter any, please report it. A huge thanks to Andrew Savinykh for the help with parsing loadouts from profile.sav files.

### Fixed

- Added correct save file slugs for Thaen Fruits and the various Dream items.
- Fixed trait point calculation error caused by trait point fix yesterday.

## 2024-06-10

### Fixed

- Fixed bug in the builder where core trait points would be uneditable and non-maxed when swapping archetypes.

## 2024-06-09

### Fixed

- Fixed UI when creating/editing a build. Placeholder text was improperly used to convey info on build descriptions and build links. The info has been moved to standalone text.

## 2024-06-08

### Fixed

- Fixed bug where avatar names were overflowing the labels on the avatar select dialog.
- Fixed bug where clicking a dropdown menu on the build filters caused the entire box to shrink on Chrome Mobile.

## 2024-06-07

### Fixed

- Fixed an issue causing Item Tracker CSV export to not list all items.

## 2024-06-06

### Added

- You can now filter builds by a specific Relic.
- You can now filter builds to only show "Quality" builds. A quality build has 100+ character descriptions, at least one build tag, and all item slots full (except consumables).
  - Updated this to a 200+ character description.
- Added PayPal donation link for those who wish to support the R2TK monthly costs.
- Added Liquid Escape item to the Item Tracker.
- Added Orb of Undoinng item to the Item Tracker.
- Added Mature Thaen Fruit item to the Item Tracker.
- Added Elder Thaen Fruit item to the Item Tracker.
- Added Celestial Thaen Fruit item to the Item Tracker.
- Added Nimue's Dream item to the Item Tracker.
- Added Walker's Dream item to the Item Tracker.
- Added Huntress's Dream item to the Item Tracker.
- Added Dran's Dream item to the Item Tracker.

### Changed

- Updated logo and profile image in navbar to be larger.
- Navbar has a fixed position again after resolving the dialog overflow issue.

## Fixed

- Fixed small issue in Description Token dialog where external tokens were listed.
- Fixed bug preventing favorited builds from showing up in the profile page.

## 2024-06-05

### Added

- Added world save for Spiteful/Vicious Venom.

### Fixed

- Small fix to bottom bar icons to account for lazy loading of theme select button.
- Fixed issue where Amplitude was not highlighting correctly on item cards.
- Removed fixed positioning on nav bar due to conflict with dialogs. Will revisit this behavior.

## 2024-06-04

### Added

- Builder descriptions now has a button to show all tokens that you can use in the build.

### Changed

- Some minor UI adjustments to the navbar style.
- Bottom icons on the site now have a show/hide functionality to save space.
- Site avatar now users your profile picture rather than your social media avatar.

### Fixed

- YouTube thumbnail calculation now correctly removes all video query parameters to ensure the correct thumbnail is displayed.
- Default theme on the site is now always the classic theme, regardless of system preference. I'm so sorry to all who were flashbanged.
- Fixed issue where Amplify text in a build description was not showing the info for Amplify trait.

## 2024-06-02

### Added

- Light mode is now live! Click the Sun icon at the lower right to toggle between light and dark mode. A huge thanks to Synder for the work on this feature to make it possible! I cannot overstate the amount of effort they put into making this happen.

### Fixed

- Updated the wiki scraper to work better with the new formatting they have been building out on their side.
- Fixed a number of item descriptions to match the data in the wiki.

## 2024-06-01

### Changed

- Replaced last remaining legacy components with new components.

## 2024-05-31

### Added

- Build traits can now be marked as optional, just like other build items.

### Changed

- Many icons throughout the site converted from static images to svgs (thank you, Synder and kbsfnk)

### Fixed

- Fixed Burden of the Mesmer not correctly reducing max health.
- Fixed health cap reduction formula to work correctly. Previous formula worked because there was only a single item that could cap your health.
- Fixed Restriction Cord reducing the total health calculation. It doesn't allow you to heal above 50%, but it does not affect total health calculation stats in-game.
- Fixed issue preventing some YouTube thumbnails from embedding.
- Fixed issue where builds with Youtube video reference links were not being included when filtering for builds with video.

## 2024-05-30

### Changed

- Removed `lust` from bad word list.

### Fixed

- Bad word filter now properly handles words that should be partial matches and words that should not.
- Updated description for Dying Breath mod to match in-game.

## 2024-05-29

### Changed

- User display names and bios are not properly cleaned of any bad language prohibited by the code of conduct.
- When builds trip the bad language filter, users now get a notification informing them of the issue and what words are causing the problem.

### Fixed

- Minor UI fixes.

## 2024-05-28

### Changed

- Made some Ui and style adjustments. (Synder)

## 2024-05-27

### Changed

- Linked Builds on the profile page are no longer displayed as a table. They are now displayed as cards, similar to build lists elsewhere on the site.
- When viewing a build, there is a new `View Linked Builds` button where users can find linked builds that include it.

## 2024-05-26

### Changed

- Improved the order of traits in the builder to directly match in-game order. Not sure why I didn't do this sooner.

### Fixed

- Fixed issue where deleting a linked build would delete the wrong one `:(`
- Fixed color issue with tooltips matching the background color of the site.

## 2024-05-25

### Changed

- Removed landing page image for home page, resources page, and support r2tk page. It was causing unnecessary load times and performance hits.

### Fixed

- Fixed bug preventing items and bosses from being tracked.

## 2024-05-24

### Added

- Added description field to Linked Builds.
- Can now delete linked builds from your profile page.

### Changed

- When viewing a build, you can now click anywhere on the item button to view the item info. Previously this would only happen if you clicked the info icon.

### Fixed

- Fixed issue where armor calculator was returning `NaN` for armor totals.
- Fixed issue where Lodestone Ring was not being detected by the Item Tracker import due to typo.

## 2024-05-23

### Added

- Added the brand new Linked Build feature. This feature will allow you to link up to three builds together in a single shareable URL. This will be helpful to link coop builds together for easy access, or variants of the same build (boss,mobbing,budget), alternate versions, etc. To get started, view any of your existing created builds, then click the `New Linked Build` button to get started.

### Changed

- Tooltip styling has been updated for a better look and feel. (Alexij)

## 2024-05-22

### Added

- Builder stats now show an armor breakdown info icon for more details about the armor calculations.

### Changed

- Favorite Build button will now show up whether the user is signed in or not - previously would only show if you are signed in. If an unauthenticated user clicks the button, they will be prompted to sign-in to favorite the build.

### Fixed

- Updated Mirage weapon description and damage values.
- Updated Cyclone mod description.

## 2024-05-21

### Added

- Added the missing item dialog back to the Item Tracker. This was removed previously due to a bug causing the page to not load for some browsers.

### Changed

- YouTube URLs as reference links will now display the video thumbnail and link above the build. It no longer needs to specifically be a YouTube embed URL to work.

### Fixed

- Added separate Gun and Bow description text to Bandit, Transpose, and Extender mutators.
- Fixed button overflow issue on Item Tracker page on mobile.

## 2024-05-20

### Added

- Bolded item names in Build descriptions are now clickable links to the item info dialog.

### Changed

- Changed Overload item token.
- Temporarily disabled Item Tracker feature to show missing items by location next to each category header until we can work out a bug with older browsers.

### Fixed

- Added external tokens to Item Info dialog. These were on the Item Cards, but not in the dialog as they should have been.
- Fixed description for Power Stone.
- Fixed the Sacred Lakewater description to match in-game.
- Fixed the Root Water description to match in-game.

## 2024-05-19

### Added

- Users can now embed links to YouTube videos above builds, in the same way only Featured Builds could previously.
  - After you add a YouTube embed URL to the `Build Reference Link` field, there will be a 12-hour delay before the video is visible on the build page. This is to allow for moderation of the content.
  - Existing builds with YouTube Embed URLs will need to be edited and saved to trigger the initial 12-hour delay.
- Item Tracker now shows the locations of missing items for each category - just click the info icon to the left of each category header. Great submission by Synder!

### Changed

- Build Description cap raised to 3000 characters, up from 2000 characters.

### Fixed

- Corrected shock resistance on` Bloodless Crown (-3 => 3)
- Fixed issue with Tal'Ratha (Metaphysical) world save download links being broken.
- Fixed incorrect values on Acid Stone ring.
- Fixed incorrect values on Fire Stone ring.
- Fixed incorrect values on Grounding Stone ring.
- Fixed Enigma description typo, nerby -> nearby.
- Fixed Overload build token typo, nerby -> nearby.
- Added `Skill Duration` item token to Soothsayer perk.
- Removed `bestial` from bad words list.

## 2024-05-18

### Added

- Builds can now have items toggled as optional. This should allow builders to better clarify which items are core to the build.

### Changed

- Updated almost all items to include a `saveFileSlug` property to better assist with parsing save files on the Item Tracker. For items missing a save file slug, the importer will remove all spaces and characters and lowercase the item name, which works for a large quantity. However, where I was able to find save file slugs, i.e. how the item is referenced in the save file, I use it to try and minimize the mistakes.

### Fixed

- Fixed issue where Melee Speed relic fragment wasn't parsing correctly from the save file in the Item Tracker.
- Fixed issue where Blight Resistance relic fragment was not adding to the total blight resistance in a build's stats.
- Removed "crap" from bad word list.

## 2024-05-17

### Fixed

- Melee Attack Speed relic fragment renamed to Melic Speed to match in-game text.
- Detailed Build View dialog now has more space around it to make it easier to exit out of.

## 2024-05-16

### Fixed

- Bad word list reviewed to remove more unnecessary blocked words.

## 2024-05-14

### Changed

- Updated all Ring images to more consistent higher quality images.

### Fixed

- Bloodthirst mod description updated to match in-game text (ConRaven)
- Berserker's Crest ring description updated to match in-game text (SenorCerveza)
- Fixed Item Tracker categories showing when they shouldn't based on filters.
- Item Lookup discovered/undiscovered filter now correctly shows/hides mods, skills, and perks if their linked item is discovered or not.

## 2024-05-13

### Added

- Added item locations to almost all item info dialogs.
- Added filters to Item Lookup and Item Tracker that allow searching for items by World and Dungeon. You can now easily check if you are missing any items in a particular dungeon based on your Item Tracker data.

## 2024-05-12

### Added

- Added item location information for almost all items. Will have a way to search for items by location soon!

### Fixed

- Fixed issue where duplicate items were saved to the database.

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
