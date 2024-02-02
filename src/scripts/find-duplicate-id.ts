/**
 * This is used to identify if an item has a duplicate id
 * When I add new items, I use a random id, then run `npm run test`
 * to see if there are any duplicate ids
 * If there are, this script is run to identify the duplicate ids
 */

import { remnantItems } from '../features/items/data/remnantItems'

// need to iterate over remnantItems to find the duplicate id
// for each item, check if the id is already in the set
// if it is, log the id
// if it isn't, add it to the set
// at the end, log the set
const ids = new Set()
const duplicateIds = new Set()
remnantItems.forEach((item) => {
  if (ids.has(item.id)) {
    duplicateIds.add(item.id)
  } else {
    ids.add(item.id)
  }
})

console.log(duplicateIds)
