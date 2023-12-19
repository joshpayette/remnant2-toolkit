# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 2023-12-19

### Added

- Added Dudley's Eldritch Knight build to featured builds.
- Added Dudley's Blood Hunter build to featured builds.

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
