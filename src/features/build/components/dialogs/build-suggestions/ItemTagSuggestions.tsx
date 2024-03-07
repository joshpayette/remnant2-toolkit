import { useState } from 'react'

import { DESCRIPTION_TAGS, ITEM_TAGS } from '@/features/items/constants'
import { remnantItems } from '@/features/items/data/remnantItems'
import { itemMatchesSearchText } from '@/features/items/lib/itemMatchesSearchText'
import { Item, ItemTag } from '@/features/items/types'
import { ConcoctionItem } from '@/features/items/types/ConcoctionItem'
import { ConsumableItem } from '@/features/items/types/ConsumableItem'
import { ModItem } from '@/features/items/types/ModItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { SelectMenu } from '@/features/ui/SelectMenu'

import { ItemButton } from '../../../../items/components/ItemButton'
import { getConcoctionSlotCount } from '../../../lib/getConcoctionSlotCount'
import { linkArchetypesToTraits } from '../../../lib/linkArchetypesToTraits'
import { linkWeaponsToMods } from '../../../lib/linkWeaponsToMods'
import { BuildState } from '../../../types'

/**
 * Combines the tags found in item.descriptions, as well as the item.tags
 * Returns a full list of all of them in alphabetical order
 */
function buildTagOptions() {
  const descriptionTagOptions = DESCRIPTION_TAGS.map((tag) => ({
    label: tag.type,
    value: tag.token,
  })) satisfies Array<{ label: string; value: string }>

  const itemTagsOptions: Array<{ label: string; value: ItemTagWithDefault }> =
    ITEM_TAGS.map((tag) => ({
      label: tag,
      value: tag,
    }))
  const allTagOptions = [...descriptionTagOptions, ...itemTagsOptions].sort(
    (a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1
      return 0
    },
  )
  return allTagOptions
}

/**
 * Generates a list of all items that match the selected tag
 */
function getItemSuggestions(
  buildState: BuildState,
  tag: ItemTagOption,
): Item[] {
  let suggestions: Item[] = []

  for (const item of remnantItems) {
    if (itemMatchesSearchText({ item, searchText: tag.value })) {
      suggestions.push(item)
    }
  }

  // Filter out mods that are linked to weapons
  suggestions = suggestions.filter((suggestion) => {
    if (ModItem.isModItem(suggestion)) {
      if (suggestion.linkedItems?.weapon) return false
    }
    return true
  })

  // Filter out archetypes, as skills are the ones that should be suggested
  suggestions = suggestions.filter((suggestion) => {
    if (suggestion.category === 'archetype') return false
    return true
  })

  // Remove any suggestions already in the build
  suggestions = suggestions.filter((suggestion) => {
    if (suggestion.id === buildState.items.helm?.id) return false
    if (suggestion.id === buildState.items.torso?.id) return false
    if (suggestion.id === buildState.items.legs?.id) return false
    if (suggestion.id === buildState.items.gloves?.id) return false
    if (suggestion.id === buildState.items.amulet?.id) return false
    if (suggestion.id === buildState.items.relic?.id) return false

    if (buildState.items.ring.some((ring) => ring?.id === suggestion.id)) {
      return false
    }
    if (
      buildState.items.archetype.some(
        (archetype) => archetype?.id === suggestion.id,
      )
    ) {
      return false
    }
    if (
      buildState.items.weapon.some((weapon) => weapon?.id === suggestion.id)
    ) {
      return false
    }
    if (buildState.items.mod.some((mod) => mod?.id === suggestion.id)) {
      return false
    }
    if (
      buildState.items.mutator.some((mutator) => mutator?.id === suggestion.id)
    ) {
      return false
    }
    if (
      buildState.items.relicfragment.some(
        (relicfragment) => relicfragment?.id === suggestion.id,
      )
    ) {
      return false
    }
    if (
      buildState.items.concoction.some(
        (concoction) => concoction?.id === suggestion.id,
      )
    ) {
      return false
    }
    if (
      buildState.items.consumable.some(
        (consumable) => consumable?.id === suggestion.id,
      )
    ) {
      return false
    }

    // If we got this far, the item is not in the build state
    return true
  })

  return suggestions
}

type ItemTagWithDefault = ItemTag | 'Choose'
const DEFAULT_TAG = { label: 'Choose', value: 'Choose' } satisfies {
  label: string
  value: ItemTagWithDefault
}

const allTagOptions = buildTagOptions()
allTagOptions.unshift(DEFAULT_TAG)

type ItemTagOption = (typeof allTagOptions)[number]

type SelectedItem = Item & {
  slot?:
    | 'archetype1'
    | 'archetype2'
    | 'concoction1'
    | 'concoction2'
    | 'concoction3'
    | 'concoction4'
    | 'concoction5'
    | 'concoction6'
    | 'concoction7'
    | 'consumable1'
    | 'consumable2'
    | 'consumable3'
    | 'consumable4'
    | 'long gun'
    | 'hand gun'
    | 'relicfragment1'
    | 'relicfragment2'
    | 'relicfragment3'
    | 'ring1'
    | 'ring2'
    | 'ring3'
    | 'ring4'
}

interface Props {
  buildState: BuildState
  onApplySuggestions: (newBuildState: BuildState) => void
  onOpenItemInfo: (item: Item) => void
}

export function ItemTagSuggestions({
  buildState,
  onApplySuggestions,
  onOpenItemInfo,
}: Props) {
  const [selectedTag, setSelectedTag] = useState<ItemTagOption>(DEFAULT_TAG)
  const [itemSuggestions, setItemSuggestions] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])

  function handleItemTagChange(tag: ItemTagOption) {
    if (tag.value === 'Choose') {
      setItemSuggestions([])
      return
    }
    setSelectedTag(tag)

    const suggestions = getItemSuggestions(buildState, tag)
    setItemSuggestions(suggestions)
  }

  function clearTagSuggestions() {
    setItemSuggestions([])
    setSelectedTag(DEFAULT_TAG)
  }

  /**
   * Handles the user clicking a suggested item to equip
   * Will cycle through the different slots for items that can be
   * equipped to multiple slots.
   */
  function handleSelectItem(item: SelectedItem) {
    const itemAlreadySelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id,
    )

    if (itemAlreadySelected) {
      // ------------------------------
      // Handle cycling through slots
      // ------------------------------
      if (item.category === 'ring') {
        const selectedRing = selectedItems.find(
          (selectedItem) => selectedItem.id === item.id,
        )
        const ringSlot = selectedRing?.slot
        if (ringSlot) {
          if (ringSlot === 'ring1') {
            item.slot = 'ring2'
          } else if (ringSlot === 'ring2') {
            item.slot = 'ring3'
          } else if (ringSlot === 'ring3') {
            item.slot = 'ring4'
          } else if (ringSlot === 'ring4') {
            setSelectedItems((prev) =>
              prev.filter((selectedItem) => selectedItem.slot !== ringSlot),
            )
            return
          }
          setSelectedItems((prev) =>
            prev.map((selectedItem) =>
              selectedItem.id === item.id ? item : selectedItem,
            ),
          )
        }
        return
      }
      if (item.category === 'skill') {
        const selectedArchetype = selectedItems.find(
          (selectedItem) => selectedItem.id === item.id,
        )
        const archetypeSlot = selectedArchetype?.slot
        if (archetypeSlot) {
          if (archetypeSlot === 'archetype1') {
            item.slot = 'archetype2'
            setSelectedItems((prev) =>
              prev.map((selectedItem) =>
                selectedItem.id === item.id ? item : selectedItem,
              ),
            )
          } else if (archetypeSlot === 'archetype2') {
            setSelectedItems((prev) =>
              prev.filter(
                (selectedItem) => selectedItem.slot !== archetypeSlot,
              ),
            )
          }
        }
        return
      }
      if (item.category === 'mod') {
        const selectedMod = selectedItems.find(
          (selectedItem) => selectedItem.id === item.id,
        )
        const modSlot = selectedMod?.slot
        if (modSlot) {
          if (modSlot === 'long gun') {
            item.slot = 'hand gun'
            setSelectedItems((prev) =>
              prev.map((selectedItem) =>
                selectedItem.id === item.id ? item : selectedItem,
              ),
            )
          } else if (modSlot === 'hand gun') {
            setSelectedItems((prev) =>
              prev.filter((selectedItem) => selectedItem.slot !== modSlot),
            )
          }
        } else {
          setSelectedItems((prev) =>
            prev.filter((selectedItem) => selectedItem.id !== item.id),
          )
        }
        return
      }
      if (MutatorItem.isMutatorItem(item) && item.type === 'gun') {
        const selectedMutator = selectedItems.find(
          (selectedItem) => selectedItem.id === item.id,
        )
        const mutatorSlot = selectedMutator?.slot
        if (mutatorSlot) {
          if (mutatorSlot === 'long gun') {
            item.slot = 'hand gun'
            setSelectedItems((prev) =>
              prev.map((selectedItem) =>
                selectedItem.id === item.id ? item : selectedItem,
              ),
            )
          } else if (mutatorSlot === 'hand gun') {
            setSelectedItems((prev) =>
              prev.filter((selectedItem) => selectedItem.slot !== mutatorSlot),
            )
          }
        } else {
          setSelectedItems((prev) =>
            prev.filter((selectedItem) => selectedItem.id !== item.id),
          )
        }
        return
      }
      if (item.category === 'consumable') {
        const selectedConsumable = selectedItems.find(
          (selectedItem) => selectedItem.id === item.id,
        )
        const consumableSlot = selectedConsumable?.slot
        if (consumableSlot) {
          if (consumableSlot === 'consumable1') {
            item.slot = 'consumable2'
          } else if (consumableSlot === 'consumable2') {
            item.slot = 'consumable3'
          } else if (consumableSlot === 'consumable3') {
            item.slot = 'consumable4'
          } else if (consumableSlot === 'consumable4') {
            setSelectedItems((prev) =>
              prev.filter(
                (selectedItem) => selectedItem.slot !== consumableSlot,
              ),
            )
            return
          }
          setSelectedItems((prev) =>
            prev.map((selectedItem) =>
              selectedItem.id === item.id ? item : selectedItem,
            ),
          )
        }
        return
      }
      if (item.category === 'relicfragment') {
        const selectedRelicFragment = selectedItems.find(
          (selectedItem) => selectedItem.id === item.id,
        )
        const relicFragmentSlot = selectedRelicFragment?.slot
        if (relicFragmentSlot) {
          if (relicFragmentSlot === 'relicfragment1') {
            item.slot = 'relicfragment2'
          } else if (relicFragmentSlot === 'relicfragment2') {
            item.slot = 'relicfragment3'
          } else if (relicFragmentSlot === 'relicfragment3') {
            setSelectedItems((prev) =>
              prev.filter(
                (selectedItem) => selectedItem.slot !== relicFragmentSlot,
              ),
            )
            return
          }
          setSelectedItems((prev) =>
            prev.map((selectedItem) =>
              selectedItem.id === item.id ? item : selectedItem,
            ),
          )
        }
        return
      }
      if (item.category === 'concoction') {
        const selectedConcoction = selectedItems.find(
          (selectedItem) => selectedItem.id === item.id,
        )
        const concoctionSlotCount = getConcoctionSlotCount(buildState) + 1

        const concoctionSlot = selectedConcoction?.slot
        if (concoctionSlot) {
          if (concoctionSlot === 'concoction1') {
            if (concoctionSlotCount >= 2) {
              item.slot = 'concoction2'
            } else {
              setSelectedItems((prev) =>
                prev.filter(
                  (selectedItem) => selectedItem.slot !== concoctionSlot,
                ),
              )
              return
            }
          } else if (concoctionSlot === 'concoction2') {
            if (concoctionSlotCount >= 3) {
              item.slot = 'concoction3'
            } else {
              setSelectedItems((prev) =>
                prev.filter(
                  (selectedItem) => selectedItem.slot !== concoctionSlot,
                ),
              )
              return
            }
          } else if (concoctionSlot === 'concoction3') {
            if (concoctionSlotCount >= 4) {
              item.slot = 'concoction4'
            } else {
              setSelectedItems((prev) =>
                prev.filter(
                  (selectedItem) => selectedItem.slot !== concoctionSlot,
                ),
              )
              return
            }
          } else if (concoctionSlot === 'concoction4') {
            if (concoctionSlotCount >= 5) {
              item.slot = 'concoction5'
            } else {
              setSelectedItems((prev) =>
                prev.filter(
                  (selectedItem) => selectedItem.slot !== concoctionSlot,
                ),
              )
              return
            }
          } else if (concoctionSlot === 'concoction5') {
            if (concoctionSlotCount >= 6) {
              item.slot = 'concoction6'
            } else {
              setSelectedItems((prev) =>
                prev.filter(
                  (selectedItem) => selectedItem.slot !== concoctionSlot,
                ),
              )
              return
            }
          } else if (concoctionSlot === 'concoction6') {
            if (concoctionSlotCount >= 7) {
              item.slot = 'concoction7'
            } else {
              setSelectedItems((prev) =>
                prev.filter(
                  (selectedItem) => selectedItem.slot !== concoctionSlot,
                ),
              )
              return
            }
          } else if (concoctionSlot === 'concoction7') {
            setSelectedItems((prev) =>
              prev.filter(
                (selectedItem) => selectedItem.slot !== concoctionSlot,
              ),
            )
            return
          }
          setSelectedItems((prev) =>
            prev.map((selectedItem) =>
              selectedItem.id === item.id ? item : selectedItem,
            ),
          )
        }
        return
      }

      // If the item doesn't have a slot, untoggle it
      setSelectedItems((prev) =>
        prev.filter((selectedItem) => selectedItem.id !== item.id),
      )
    } else {
      // ------------------------------
      // If the item is not already selected, add it
      // For items with slots, assign it to the first slot
      // ------------------------------
      if (item.category === 'ring') {
        item.slot = 'ring1'
      }
      if (item.category === 'skill') {
        item.slot = 'archetype1'
      }
      if (item.category === 'mod') {
        item.slot = 'long gun'
      }
      if (MutatorItem.isMutatorItem(item) && item.type === 'gun') {
        item.slot = 'long gun'
      }
      if (item.category === 'consumable') {
        item.slot = 'consumable1'
      }
      if (item.category === 'relicfragment') {
        item.slot = 'relicfragment1'
      }
      if (item.category === 'concoction') {
        item.slot = `concoction1`
      }

      // Add the item to the selected items
      setSelectedItems((prev) => [...prev, item])
    }
  }

  /**
   * Handles applying the selected items to the build state
   * This is the final step of the suggestions
   */
  function handleApplyItemSelections() {
    let newBuildState = { ...buildState }

    // Loop through each selected item and add it to the build state
    for (const selectedItem of selectedItems) {
      // Split out the slot from the item added to the build state
      const { slot, ...itemToEquip } = selectedItem

      // Handle equipping the weapons to the specified slots
      if (
        WeaponItem.isWeaponItem(selectedItem) &&
        selectedItem.type === 'long gun'
      ) {
        if (WeaponItem.isWeaponItem(itemToEquip)) {
          newBuildState.items.weapon[0] = itemToEquip
          continue
        }
      } else if (
        WeaponItem.isWeaponItem(selectedItem) &&
        selectedItem.type === 'hand gun'
      ) {
        if (WeaponItem.isWeaponItem(itemToEquip)) {
          newBuildState.items.weapon[2] = itemToEquip
          continue
        }
      } else {
        if (WeaponItem.isWeaponItem(itemToEquip)) {
          newBuildState.items.weapon[1] = itemToEquip
          continue
        }
      }

      // Handle equipping the skills and linked archetypes to the specified slots
      if (selectedItem.category === 'skill') {
        const linkedArchetype = remnantItems.find(
          (i) => i.name === selectedItem.linkedItems?.archetype?.name,
        )
        if (selectedItem.slot === 'archetype1') {
          // equip the linked archetype as well
          if (linkedArchetype) {
            // If an archetype is already in the build, remove it
            // and its linked traits
            if (newBuildState.items.archetype[0]) {
              const linkedTraits =
                newBuildState.items.archetype[0]?.linkedItems?.traits
              if (linkedTraits) {
                linkedTraits.forEach((trait) => {
                  newBuildState.items.trait = newBuildState.items.trait.filter(
                    (t) => t.name !== trait.name,
                  )
                })
              }
            }

            newBuildState.items.archetype[0] = linkedArchetype
            newBuildState.items.skill[0] = itemToEquip
            continue
          }
        } else if (selectedItem.slot === 'archetype2') {
          if (linkedArchetype) {
            newBuildState.items.archetype[1] = linkedArchetype
            newBuildState.items.skill[1] = itemToEquip
            continue
          }
        }
      }

      // Handle equipping the mods to the specified slots
      if (ModItem.isModItem(selectedItem)) {
        if (selectedItem.slot === 'long gun') {
          newBuildState.items.mod[0] = itemToEquip
          continue
        } else if (selectedItem.slot === 'hand gun') {
          newBuildState.items.mod[1] = itemToEquip
          continue
        }
      }

      // Handle equipping the mutators to the specified slots
      if (MutatorItem.isMutatorItem(selectedItem)) {
        if (
          selectedItem.slot === 'long gun' &&
          MutatorItem.isMutatorItem(itemToEquip)
        ) {
          newBuildState.items.mutator[0] = itemToEquip
          continue
        } else if (
          selectedItem.slot === 'hand gun' &&
          MutatorItem.isMutatorItem(itemToEquip)
        ) {
          newBuildState.items.mutator[2] = itemToEquip
          continue
        } else {
          if (MutatorItem.isMutatorItem(itemToEquip)) {
            newBuildState.items.mutator[1] = itemToEquip
            continue
          }
        }
      }

      // Handle equipping consumables to the specified slots
      if (ConsumableItem.isConsumableItem(selectedItem)) {
        if (selectedItem.slot === 'consumable1') {
          newBuildState.items.consumable[0] = itemToEquip
          continue
        } else if (selectedItem.slot === 'consumable2') {
          newBuildState.items.consumable[1] = itemToEquip
          continue
        } else if (selectedItem.slot === 'consumable3') {
          newBuildState.items.consumable[2] = itemToEquip
          continue
        } else if (selectedItem.slot === 'consumable4') {
          newBuildState.items.consumable[3] = itemToEquip
          continue
        }
      }

      // Handle equipping the concoctions
      if (ConcoctionItem.isConcoctionItem(selectedItem)) {
        const concoctionSlotCount = getConcoctionSlotCount(buildState) + 1

        if (selectedItem.slot === 'concoction1') {
          newBuildState.items.concoction[0] = itemToEquip
          continue
        } else if (selectedItem.slot === 'concoction2') {
          if (concoctionSlotCount >= 2) {
            newBuildState.items.concoction[1] = itemToEquip
            continue
          }
        } else if (selectedItem.slot === 'concoction3') {
          if (concoctionSlotCount >= 3) {
            newBuildState.items.concoction[2] = itemToEquip
            continue
          }
        } else if (selectedItem.slot === 'concoction4') {
          if (concoctionSlotCount >= 4) {
            newBuildState.items.concoction[3] = itemToEquip
            continue
          }
        } else if (selectedItem.slot === 'concoction5') {
          if (concoctionSlotCount >= 5) {
            newBuildState.items.concoction[4] = itemToEquip
            continue
          }
        } else if (selectedItem.slot === 'concoction6') {
          if (concoctionSlotCount >= 6) {
            newBuildState.items.concoction[5] = itemToEquip
            continue
          }
        } else if (selectedItem.slot === 'concoction7') {
          if (concoctionSlotCount >= 7) {
            newBuildState.items.concoction[6] = itemToEquip
            continue
          }
        }
      }

      // Handle equipping the relics
      if (selectedItem.category === 'relic') {
        newBuildState.items.relic = itemToEquip
        continue
      }

      // Handle equipping the relicfragments
      if (selectedItem.category === 'relicfragment') {
        if (selectedItem.slot === 'relicfragment1') {
          newBuildState.items.relicfragment[0] = itemToEquip
          continue
        } else if (selectedItem.slot === 'relicfragment2') {
          newBuildState.items.relicfragment[1] = itemToEquip
          continue
        } else if (selectedItem.slot === 'relicfragment3') {
          newBuildState.items.relicfragment[2] = itemToEquip
          continue
        }
      }

      // Equip the amulet
      if (selectedItem.category === 'amulet') {
        newBuildState.items.amulet = itemToEquip
        continue
      }
      // Equip the rings
      if (selectedItem.category === 'ring') {
        if (selectedItem.slot === 'ring1') {
          newBuildState.items.ring[0] = itemToEquip
          continue
        } else if (selectedItem.slot === 'ring2') {
          newBuildState.items.ring[1] = itemToEquip
          continue
        } else if (selectedItem.slot === 'ring3') {
          newBuildState.items.ring[2] = itemToEquip
          continue
        } else if (selectedItem.slot === 'ring4') {
          newBuildState.items.ring[3] = itemToEquip
          continue
        }
      }
    }

    // If archetype1 and archetype2 are the same, unequip the second
    // archetype and the skill
    if (
      newBuildState.items.archetype[0]?.name ===
      newBuildState.items.archetype[1]?.name
    ) {
      newBuildState.items.archetype[1] = null
      newBuildState.items.skill[1] = null
    }

    newBuildState = linkArchetypesToTraits(newBuildState)
    newBuildState = linkWeaponsToMods(newBuildState)

    onApplySuggestions(newBuildState)
  }

  return (
    <ItemTagContainer>
      <div className="flex w-full flex-row items-end justify-center gap-x-2 text-left">
        <SelectMenu
          label="Tags"
          options={allTagOptions}
          value={selectedTag?.value}
          onChange={(e) => {
            const newTag = allTagOptions.find(
              (tag) => tag.value === e.target.value,
            )
            if (!newTag) return
            handleItemTagChange(newTag)
          }}
        />
        <button
          className="mt-4 rounded-md border-2 border-red-500 p-2 text-sm text-white hover:bg-red-500 hover:text-white"
          aria-label="Clear tag suggestions"
          onClick={clearTagSuggestions}
        >
          Clear
        </button>
      </div>
      {itemSuggestions.length === 0 && (
        <div className="flex max-w-xs flex-col items-center justify-center">
          <div className="text-md mt-4 text-center font-bold text-red-500">
            No item suggestions found.
          </div>
        </div>
      )}
      {itemSuggestions.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-2">
            {itemSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex flex-col items-start justify-start"
              >
                <ItemButton
                  item={suggestion}
                  isEditable={false}
                  size="md"
                  isToggled={selectedItems.some(
                    (item) => item.id === suggestion.id,
                  )}
                  onClick={() => handleSelectItem(suggestion)}
                  onItemInfoClick={() => onOpenItemInfo(suggestion)}
                />
                {selectedItems.find((i) => i.id === suggestion.id)?.slot && (
                  <span className="bg-secondary-800 -mt-2 mb-2 w-full p-1 text-[9px] text-white">
                    {selectedItems.find((i) => i.id === suggestion.id)?.slot}
                  </span>
                )}
              </div>
            ))}
          </div>
          <button
            className="border-primary-500 hover:bg-primary-500 mt-4 rounded-md border-2 p-2 text-sm text-white hover:text-white"
            aria-label="Equip selected items"
            onClick={handleApplyItemSelections}
          >
            Equip Selected Items
          </button>
          <p className="mt-2 text-left text-xs text-gray-400">
            Note: This is a new feature and may not work as expected. Please
            back up your build before using this feature. Please report any
            issues.
          </p>
          <p className="mt-2 text-left text-xs text-gray-400">
            Note: This will replace any existing items in the specified slots.
            If you are replacing an archetype, the base trait points will be
            removed and re-added based on the new archetype.
          </p>
        </div>
      )}
    </ItemTagContainer>
  )
}

function ItemTagContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-xs flex-col items-center justify-start sm:pl-4">
      <h2 className="text-secondary-500 mb-1 text-2xl font-semibold">
        Item Suggestions
      </h2>
      <p className="mb-4 text-xs text-gray-400">
        Note: The tags are a work in progress. This list may not be exhaustive.
      </p>
      {children}
    </div>
  )
}
