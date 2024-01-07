# TODO

- Add check to save file import to reject files over 250kb or some other smaller size
- Need to make a db friendly edit page, the attempted linking between the two is causing too many headaches
- Convert profile build tables to cards for better mobile experience.
- Add pagination to build tables in profile page.
- Add build randomizer for the luls
- Add duplicate build button to builds in profile
- Added community build page where you can search and sort builds
- On tracker, allowing sorting alphabetically or by item type (i.e. group armors together)
- Add CSV import
- Should be able to store tracked items in db
- When logging in, the next-auth page to select Discord or Reddit is pretty ugly. Make Reddit Button orange with icon, etc.
- Add function to highlight description text for terms like burning, bleeding, overloaded, etc.

## Bugs

- Item lookup filters need 3 columns on mobile instead of 4
- When items are automatically linked in the build, they aren't added to the URL to be edited. This is causing odd behavior.
  Now that we have a database, we don't need to worry as much about the URL length.
- Need a different way to handle item description and public other than local storage,
  probably include build id in URL and then fetch from database
- If you add a skill, the skills for that class should not be selectable in the other skill slot
- Modal overlay allows click events through. This appears to be a bug in headlessui. See: https://github.com/tailwindlabs/headlessui/issues/1551

## Later TODO

- Replace fextralife wiki links with remnant.wiki
