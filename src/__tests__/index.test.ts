/* eslint-env jest */

import { remnantEnemies } from '@/app/(data)/enemies/remnantEnemies'
import { allItems } from '@/app/(data)/items/allItems'
import { additionalAvatars } from '@/app/profile/[userId]/(lib)/additionalAvatars'

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

describe('Avatars', () => {
  it('all should have unique ids', () => {
    const ids = additionalAvatars.map((avatar) => avatar.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)

    // Insert a new avatar with the same id as the first avatar
    // and check that the ids are no longer unique
    const newAvatar = { ...additionalAvatars[0] }
    additionalAvatars.push(newAvatar)
    const newIds = additionalAvatars.map((avatar) => avatar.id)
    const newUniqueIds = new Set(newIds)
    expect(newUniqueIds.size).not.toBe(newIds.length)
  })
})
