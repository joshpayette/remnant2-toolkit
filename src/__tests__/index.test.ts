/* eslint-env jest */

import { remnantItems } from '@/features/item/data'

describe('Items', () => {
  it('all should have unique ids', () => {
    const ids = remnantItems.map((item) => item.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)

    // Insert a new item with the same id as the first item
    // and check that the ids are no longer unique
    const newItem = { ...remnantItems[0] }
    remnantItems.push(newItem)
    const newIds = remnantItems.map((item) => item.id)
    const newUniqueIds = new Set(newIds)
    expect(newUniqueIds.size).not.toBe(newIds.length)
  })
})
