/* eslint-env jest */

import { ADDITIONAL_AVATARS } from '@/app/_constants/profile';
import { remnantEnemies } from '@/app/(data)/enemies/remnant-enemies';
import { allItems } from '@/app/(data)/items/all-items';

describe('Items', () => {
  it('all should have unique ids', () => {
    const ids = allItems.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    // Insert a new item with the same id as the first item
    // and check that the ids are no longer unique
    const newItem = { ...allItems[0] };
    allItems.push(newItem);
    const newIds = allItems.map((item) => item.id);
    const newUniqueIds = new Set(newIds);
    expect(newUniqueIds.size).not.toBe(newIds.length);
  });
});

describe('Enemies', () => {
  it('all should have unique ids', () => {
    const ids = remnantEnemies.map((enemy) => enemy.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    // Insert a new enemy with the same id as the first enemy
    // and check that the ids are no longer unique
    const newEnemy = { ...remnantEnemies[0] };
    remnantEnemies.push(newEnemy);
    const newIds = remnantEnemies.map((enemy) => enemy.id);
    const newUniqueIds = new Set(newIds);
    expect(newUniqueIds.size).not.toBe(newIds.length);
  });
});

describe('Avatars', () => {
  it('all should have unique ids', () => {
    const ids = ADDITIONAL_AVATARS.map((avatar) => avatar.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    // Insert a new avatar with the same id as the first avatar
    // and check that the ids are no longer unique
    const newAvatar = { ...ADDITIONAL_AVATARS[0] };
    ADDITIONAL_AVATARS.push(newAvatar);
    const newIds = ADDITIONAL_AVATARS.map((avatar) => avatar.id);
    const newUniqueIds = new Set(newIds);
    expect(newUniqueIds.size).not.toBe(newIds.length);
  });
});
