import Dialog from '@/features/ui/Dialog'
import { BuildState } from '../types'
import SelectMenu from '@/features/ui/SelectMenu'
import { useEffect, useState } from 'react'
import { WEIGHT_CLASSES } from '@/features/items/constants'
import { ArmorItem } from '@/features/items/types/ArmorItem'
import { remnantItems } from '@/features/items/data/remnantItems'
import {
  getTotalArmor,
  getTotalWeight,
  getWeightClass,
} from '../lib/getTotalValues'
import BuilderButton from './BuilderButton'
import ItemInfo from '@/features/items/components/ItemInfo'
import { GenericItem } from '@/features/items/types/GenericItem'

function getArmorSuggestions(
  buildState: BuildState,
  desiredWeightClass: keyof typeof WEIGHT_CLASSES,
) {
  const emptyArmorSlots: Array<'helm' | 'torso' | 'gloves' | 'legs'> = []
  if (!buildState.items.helm) emptyArmorSlots.push('helm')
  if (!buildState.items.torso) emptyArmorSlots.push('torso')
  if (!buildState.items.gloves) emptyArmorSlots.push('gloves')
  if (!buildState.items.legs) emptyArmorSlots.push('legs')

  // --------------------------------------
  // Need to get a pool of armor items from each slot that does not already exist in the build
  // We can exclude items that exceed the minimum weight class if it's light
  // --------------------------------------
  let armorItems: ArmorItem[] = []
  emptyArmorSlots.forEach((slot) => {
    const slotItems = remnantItems.filter(
      (item) => item.category === slot,
    ) as ArmorItem[]
    armorItems = [...armorItems, ...slotItems]
  })

  // If the desired weight class is light, we can exclude items that exceed the minimum weight class
  if (desiredWeightClass === 'LIGHT') {
    armorItems = armorItems.filter(
      (item) => item.weight && item.weight <= WEIGHT_CLASSES.LIGHT.maxWeight,
    )
  }

  // --------------------------------------
  // Need to loop through each empty armor slot.
  // For each empty slot, we need to loop through each armor item and test it
  // against each item of every other empty slot
  // --------------------------------------
  const newArmorSuggestions: ArmorSuggestion[] = []

  // This function will recursively loop through each empty slot and generate a list of
  // possible combinations of armor items
  function generateCombinations(slotIndex: number, selectedItems: ArmorItem[]) {
    if (slotIndex === emptyArmorSlots.length) {
      // Process the list of selected items (this is one possible combination)
      const testBuild = JSON.parse(JSON.stringify(buildState))

      selectedItems.forEach((item) => {
        testBuild.items[item.category] = item
      })
      const result = getWeightClass(testBuild)

      const isResultValid =
        result.maxWeight === WEIGHT_CLASSES[desiredWeightClass].maxWeight

      if (isResultValid) {
        const totalArmor = Number(getTotalArmor(testBuild))
        const totalWeight = Number(getTotalWeight(testBuild))

        newArmorSuggestions.push({
          helm: testBuild.items.helm,
          torso: testBuild.items.torso,
          gloves: testBuild.items.gloves,
          legs: testBuild.items.legs,
          totalArmor,
          totalWeight,
        })
      }
    } else {
      const slotItems = remnantItems.filter(
        (item) => item.category === emptyArmorSlots[slotIndex],
      ) as ArmorItem[]

      for (let i = 0; i < slotItems.length; i++) {
        const item = slotItems[i]
        generateCombinations(slotIndex + 1, [...selectedItems, item])
      }
    }
  }

  // Start the recursive loop
  generateCombinations(0, [])

  // sort the armor suggestions by total armor, with the highest armor first
  // then limit to the top 5
  newArmorSuggestions.sort((a, b) => b.totalArmor - a.totalArmor)

  if (newArmorSuggestions.length > 5)
    newArmorSuggestions.splice(5, newArmorSuggestions.length - 5)

  return newArmorSuggestions
}

type ArmorSuggestion = {
  helm: ArmorItem
  torso: ArmorItem
  gloves: ArmorItem
  legs: ArmorItem
  totalArmor: number
  totalWeight: number
}

interface Props {
  buildState: BuildState
  open: boolean
  onClose: () => void
  onSelectArmorSuggestion: (newBuildState: BuildState) => void
}

export default function ArmorCalculatorDialog({
  buildState,
  open,
  onClose,
  onSelectArmorSuggestion,
}: Props) {
  const [desiredWeightClass, setDesiredWeightClass] =
    useState<keyof typeof WEIGHT_CLASSES>('LIGHT')

  const [armorSuggestions, setArmorSuggestions] = useState<ArmorSuggestion[]>(
    [],
  )

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<GenericItem | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const allSlotsFull = Boolean(
    buildState.items.helm &&
      buildState.items.torso &&
      buildState.items.gloves &&
      buildState.items.legs,
  )

  const noSlotsSelected = Boolean(
    !buildState.items.helm &&
      !buildState.items.torso &&
      !buildState.items.gloves &&
      !buildState.items.legs,
  )

  // Reset filter when dialog is opened/closed
  useEffect(() => {
    if (!open) return
    if (allSlotsFull) return
    if (noSlotsSelected) return

    const newArmorSuggestions = getArmorSuggestions(
      buildState,
      desiredWeightClass,
    )
    setArmorSuggestions(newArmorSuggestions)
  }, [open, buildState, desiredWeightClass, allSlotsFull, noSlotsSelected])

  /**
   * Gets the suggestions for armor based on the desired weight class
   */

  // if all item slots are full, we can't do anything
  if (allSlotsFull) {
    return (
      <Dialog
        title="Armor Calculator"
        subtitle="Get suggestions on the best armor to use for your build."
        maxWidthClass="max-w-lg"
        open={open}
        onClose={onClose}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex max-w-xs flex-col items-center justify-center">
            <div className="text-md mt-4 text-center font-bold text-red-500">
              All armor slots are full. Clear at least one slot for suggestions.
            </div>
          </div>
        </div>
      </Dialog>
    )
  }

  // ensure at least one slot is selected
  if (noSlotsSelected) {
    return (
      <Dialog
        title="Armor Calculator"
        subtitle="Get suggestions on the best armor to use for your build."
        maxWidthClass="max-w-lg"
        open={open}
        onClose={onClose}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex max-w-xs flex-col items-center justify-center">
            <div className="text-md mt-4 text-center font-bold text-red-500">
              Select at least one armor slot for suggestions.
            </div>
          </div>
        </div>
      </Dialog>
    )
  }

  return (
    <>
      <Dialog
        title="Armor Calculator"
        subtitle="Calculate the best armor value for your build."
        maxWidthClass="max-w-lg"
        open={open}
        onClose={onClose}
      >
        <ItemInfo
          item={itemInfo}
          open={isShowItemInfoOpen}
          onClose={() => setItemInfo(null)}
        />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex max-w-xs flex-col items-center justify-center">
            <SelectMenu
              label="Desired Weight Class"
              name="desired_weight_class"
              options={[
                { label: 'Light', value: 'LIGHT' },
                { label: 'Medium', value: 'MEDIUM' },
                { label: 'Heavy', value: 'HEAVY' },
                { label: 'Ultra', value: 'ULTRA' },
              ]}
              onChange={(e) =>
                setDesiredWeightClass(
                  e.target.value as keyof typeof WEIGHT_CLASSES,
                )
              }
              value={desiredWeightClass}
            />
          </div>
          {armorSuggestions.length === 0 && (
            <div className="flex max-w-xs flex-col items-center justify-center">
              <div className="text-md mt-4 text-center font-bold text-red-500">
                No armor suggestions found for the selected weight class.
              </div>
            </div>
          )}
          {armorSuggestions.length > 0 && (
            <div className="mt-12 flex w-full flex-col items-center justify-center">
              <h2 className="mb-4 text-2xl font-bold">Armor Suggestions</h2>
              <div className="flex w-full flex-col items-center justify-center">
                {armorSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center justify-center border-t-2 border-t-green-500 py-4"
                  >
                    <div className="mb-4 flex w-full flex-row items-center justify-center gap-x-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-md font-semibold">Armor</div>
                        <div className="text-2xl font-bold text-green-500">
                          {suggestion.totalArmor}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-md font-semibold">Weight</div>
                        <div className="text-2xl font-bold text-green-500">
                          {suggestion.totalWeight}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-x-2">
                      <BuilderButton
                        item={suggestion.helm}
                        isEditable={false}
                        size="md"
                        onItemInfoClick={() => setItemInfo(suggestion.helm)}
                      />
                      <BuilderButton
                        item={suggestion.torso}
                        isEditable={false}
                        size="md"
                        onItemInfoClick={() => setItemInfo(suggestion.torso)}
                      />
                      <BuilderButton
                        item={suggestion.gloves}
                        isEditable={false}
                        size="md"
                        onItemInfoClick={() => setItemInfo(suggestion.gloves)}
                      />
                      <BuilderButton
                        item={suggestion.legs}
                        isEditable={false}
                        size="md"
                        onItemInfoClick={() => setItemInfo(suggestion.legs)}
                      />
                    </div>
                    <button
                      className="mt-4 rounded-md border-2 border-green-500 p-2 text-sm text-white hover:bg-green-500 hover:text-white"
                      onClick={() =>
                        onSelectArmorSuggestion({
                          ...buildState,
                          items: {
                            ...buildState.items,
                            helm: suggestion.helm,
                            torso: suggestion.torso,
                            gloves: suggestion.gloves,
                            legs: suggestion.legs,
                          },
                        })
                      }
                    >
                      Equip Armor
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  )
}
