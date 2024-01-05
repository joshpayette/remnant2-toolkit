# TODO

- Add item categories to page filters
  - Maybe separate filter button from filter popup logic
- Item lookup page should look more like detailed build view now?
- Add pagination to build tables in profile page.
- Add build randomizer for the luls
- Add duplicate build button to builds in profile
- Added community build page where you can search and sort builds
- On tracker, allowing sorting alphabetically or by item type (i.e. group armors together)
- Add CSV import
- When logging in, the next-auth page to select Discord or Reddit is pretty ugly. Make Reddit Button orange with icon, etc.
- Add function to highlight description text for terms like burning, bleeding, overloaded, etc.
- Builder should automatically add the 5 base trait points to the build based on primary archtype

## Bugs

- Trait point images super fuzzy on item lookup
- Need a different way to handle item description and public other than local storage,
  probably include build id in URL and then fetch from database
- If you add a skill, the skills for that class should not be selectable in the other skill slot
- Modal overlay allows click events through. This appears to be a bug in headlessui. See: https://github.com/tailwindlabs/headlessui/issues/1551

## Later TODO

- Replace fextralife wiki links with remnant.wiki
