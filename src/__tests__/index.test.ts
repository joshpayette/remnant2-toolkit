/* eslint-env jest */

import { remnantEnemies } from '@/features/enemies/data/remnantEnemies'
import { allItems } from '@/features/items/data/allItems'

describe('Items', () => {
  it('all should have unique ids', () => {
    const ids = allItems.map((item) => item.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)

    // Insert a new item with the same id as the first item
    // and check that the ids are no longer unique
    const newItem = { ...allItems[0] }
    allItems.push(newItem)
    const newIds = allItems.map((item) => item.id)
    const newUniqueIds = new Set(newIds)
    expect(newUniqueIds.size).not.toBe(newIds.length)
  })
})

describe('Enemies', () => {
  it('all should have unique ids', () => {
    const ids = remnantEnemies.map((enemy) => enemy.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)

    // Insert a new enemy with the same id as the first enemy
    // and check that the ids are no longer unique
    const newEnemy = { ...remnantEnemies[0] }
    remnantEnemies.push(newEnemy)
    const newIds = remnantEnemies.map((enemy) => enemy.id)
    const newUniqueIds = new Set(newIds)
    expect(newUniqueIds.size).not.toBe(newIds.length)
  })
})
