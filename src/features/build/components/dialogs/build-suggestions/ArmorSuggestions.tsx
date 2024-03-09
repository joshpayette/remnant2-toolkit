import { useState } from 'react'

import { getArmorSuggestions } from '@/features/armor-calculator/lib/getArmorSuggestions'
import {
  ArmorSuggestion,
  WeightClassWithDefault,
} from '@/features/armor-calculator/types'
import { BuildState } from '@/features/build/types'
import { ItemButton } from '@/features/items/components/ItemButton'
import { WEIGHT_CLASSES } from '@/features/items/constants'
import { ArmorItem } from '@/features/items/types/ArmorItem'
import { SelectMenu } from '@/features/ui/SelectMenu'
import { cn } from '@/lib/classnames'

interface Props {
  buildState: BuildState
  onOpenItemInfo: (item: ArmorItem) => void
  onApplySuggestions: (newBuildState: BuildState) => void
}

export function ArmorSuggestions({
  buildState,
  onOpenItemInfo,
  onApplySuggestions,
}: Props) {
  const [desiredWeightClass, setDesiredWeightClass] =
    useState<WeightClassWithDefault>('CHOOSE')

  const [armorSuggestions, setArmorSuggestions] = useState<ArmorSuggestion[]>(
    [],
  )

  const allSlotsFull = Boolean(
    buildState.items.helm &&
      buildState.items.torso &&
      buildState.items.gloves &&
      buildState.items.legs,
  )

  function handleWeightClassChange(weightClass: WeightClassWithDefault) {
    if (weightClass === 'CHOOSE') {
      setArmorSuggestions([])
      return
    }
    setDesiredWeightClass(weightClass)
    setArmorSuggestions(getArmorSuggestions(buildState, weightClass))
  }

  function clearArmorSuggestions() {
    setDesiredWeightClass('CHOOSE')
    setArmorSuggestions([])
  }

  // if all item slots are full, we can't do anything
  if (allSlotsFull) {
    return (
      <ArmorInfoContainer>
        <div className="text-md mt-4 text-center font-semibold text-red-500">
          All armor slots are full. Clear at least one slot for suggestions.
        </div>
      </ArmorInfoContainer>
    )
  }

  return (
    <ArmorInfoContainer>
      <div className="flex w-full flex-row items-end justify-center gap-x-2 text-left">
        <SelectMenu
          label="Desired Weight Class"
          name="desired_weight_class"
          options={[
            { label: 'Choose', value: 'CHOOSE' },
            { label: 'Light', value: 'LIGHT' },
            { label: 'Medium', value: 'MEDIUM' },
            { label: 'Heavy', value: 'HEAVY' },
            { label: 'Ultra', value: 'ULTRA' },
          ]}
          onChange={(e) =>
            handleWeightClassChange(e.target.value as WeightClassWithDefault)
          }
          value={desiredWeightClass}
        />
        <button
          className="mt-4 rounded-md border-2 border-red-500 p-2 text-sm text-white hover:bg-red-500 hover:text-white"
          aria-label="Clear armor suggestions"
          onClick={clearArmorSuggestions}
        >
          Clear
        </button>
      </div>
      {armorSuggestions.length === 0 && (
        <div className="flex max-w-xs flex-col items-center justify-center">
          <div className="text-md mt-4 text-center font-bold text-red-500">
            No armor suggestions found for the selected weight class.
          </div>
        </div>
      )}
      {armorSuggestions.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            {armorSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex w-full flex-col items-center justify-center border-t-2 border-t-primary-500 py-4"
              >
                <div className="mb-4 flex w-full flex-row items-center justify-center gap-x-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-md font-semibold">Armor</div>
                    <div className="text-2xl font-bold text-primary-500">
                      {suggestion.totalArmor}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-md font-semibold">Weight</div>
                    <div
                      className={cn(
                        'text-2xl font-bold',
                        desiredWeightClass !== 'CHOOSE' &&
                          WEIGHT_CLASSES[desiredWeightClass].textColor,
                      )}
                    >
                      {suggestion.totalWeight}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-x-2">
                  <ItemButton
                    item={suggestion.helm}
                    isEditable={false}
                    size="md"
                    onItemInfoClick={() => onOpenItemInfo(suggestion.helm)}
                  />
                  <ItemButton
                    item={suggestion.torso}
                    isEditable={false}
                    size="md"
                    onItemInfoClick={() => onOpenItemInfo(suggestion.torso)}
                  />
                  <ItemButton
                    item={suggestion.legs}
                    isEditable={false}
                    size="md"
                    onItemInfoClick={() => onOpenItemInfo(suggestion.legs)}
                  />
                  <ItemButton
                    item={suggestion.gloves}
                    isEditable={false}
                    size="md"
                    onItemInfoClick={() => onOpenItemInfo(suggestion.gloves)}
                  />
                </div>
                <button
                  className="mt-4 rounded-md border-2 border-primary-500 p-2 text-sm text-white hover:bg-primary-500 hover:text-white"
                  aria-label="Equip armor suggestions"
                  onClick={() =>
                    onApplySuggestions({
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
    </ArmorInfoContainer>
  )
}

function ArmorInfoContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-xs flex-col items-center justify-start sm:pr-4">
      <h2 className="mb-4 text-2xl font-semibold text-secondary-500">
        Armor Suggestions
      </h2>
      {children}
    </div>
  )
}
