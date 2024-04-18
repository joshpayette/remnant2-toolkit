import { useEffect, useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { ArmorSuggestionCard } from '@/features/armor-calculator/components/ArmorSuggestionCard'
import { getArmorSuggestions } from '@/features/armor-calculator/lib/getArmorSuggestions'
import {
  ArmorSuggestion,
  WeightClassKeysWithDefault,
} from '@/features/armor-calculator/types'
import { BuildState } from '@/features/build/types'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { Item } from '@/features/items/types'
import { Pagination } from '@/features/pagination/Pagination'
import { usePagination } from '@/features/pagination/usePagination'
import { Dialog } from '@/features/ui/Dialog'
import { SelectMenu } from '@/features/ui/SelectMenu'

const ITEMS_PER_PAGE = 8

interface Props {
  buildState: BuildState
  open: boolean
  onClose: () => void
  onApplySuggestions: (newBuildState: BuildState) => void
}

export function ArmorSuggestionsDialog({
  buildState,
  open,
  onClose,
  onApplySuggestions,
}: Props) {
  const [isCalculating, setIsCalculating] = useState(false)

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isItemInfoOpen = Boolean(itemInfo)

  const [desiredWeightClass, setDesiredWeightClass] =
    useState<WeightClassKeysWithDefault>('CHOOSE')

  const [armorSuggestions, setArmorSuggestions] = useState<ArmorSuggestion[]>(
    [],
  )

  const {
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    pageNumbers,
    totalPages,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = usePagination({
    totalItemCount: armorSuggestions.length,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    if (!isCalculating) return
    if (desiredWeightClass === 'CHOOSE') return

    // Start a timeout to delay the calculation
    // This allows the loading indicator to render
    const timeoutId = setTimeout(() => {
      setArmorSuggestions(
        getArmorSuggestions({ buildState, desiredWeightClass }),
      )
      handleSpecificPageClick(1)
      setIsCalculating(false)
    }, 250)

    // Clear the timeout when the component unmounts or when the dependencies change
    return () => clearTimeout(timeoutId)
  }, [buildState, desiredWeightClass, isCalculating, handleSpecificPageClick])

  const allSlotsFull = Boolean(
    buildState.items.helm &&
      buildState.items.torso &&
      buildState.items.gloves &&
      buildState.items.legs,
  )

  function handleWeightClassChange(weightClass: WeightClassKeysWithDefault) {
    if (weightClass === 'CHOOSE') {
      setArmorSuggestions([])
      return
    }
    setDesiredWeightClass(weightClass)
    setIsCalculating(true)
  }

  function clearArmorSuggestions() {
    setDesiredWeightClass('CHOOSE')
    setArmorSuggestions([])
  }

  const armorInfoProps = {
    itemInfo: itemInfo,
    isDialogOpen: open,
    isItemInfoOpen: isItemInfoOpen,
    onDialogClose: onClose,
    onInfoClose: () => setItemInfo(null),
  }

  if (allSlotsFull) {
    return (
      <ArmorInfoContainer {...armorInfoProps}>
        <div className="text-md mt-4 text-center font-semibold text-red-500">
          All armor slots are full. Clear at least one slot for suggestions.
        </div>
      </ArmorInfoContainer>
    )
  }

  if (isCalculating) {
    return (
      <ArmorInfoContainer {...armorInfoProps}>
        <div className="flex flex-col items-center justify-center">
          <p className="text-md mt-4 animate-bounce text-center font-semibold">
            Calculating armor suggestions...this may take a moment.
          </p>
        </div>
      </ArmorInfoContainer>
    )
  }

  return (
    <ArmorInfoContainer {...armorInfoProps}>
      <div className="flex w-full flex-row items-end justify-center gap-x-2 text-left">
        <div className="flex w-full max-w-md items-end justify-center gap-x-2">
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
              handleWeightClassChange(
                e.target.value as WeightClassKeysWithDefault,
              )
            }
            value={desiredWeightClass}
          />
          <BaseButton
            color="red"
            className="mt-4"
            aria-label="Clear armor suggestions"
            onClick={clearArmorSuggestions}
          >
            Clear
          </BaseButton>
        </div>
      </div>
      {armorSuggestions.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <div className="text-md mt-4 text-center font-bold text-red-500">
            No armor suggestions found for the selected weight class.
          </div>
        </div>
      )}
      {armorSuggestions.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            <Pagination
              isLoading={isCalculating}
              currentPage={currentPage}
              firstVisibleItemNumber={firstVisibleItemNumber}
              lastVisibleItemNumber={lastVisibleItemNumber}
              pageNumbers={pageNumbers}
              totalItems={armorSuggestions.length}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPageClick}
              onNextPage={handleNextPageClick}
              onSpecificPage={handleSpecificPageClick}
            />
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {armorSuggestions
                .slice(
                  (currentPage - 1) * ITEMS_PER_PAGE,
                  currentPage * ITEMS_PER_PAGE,
                )
                .map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center justify-center rounded-md border-2 border-primary-700 bg-gray-900 p-4"
                  >
                    <ArmorSuggestionCard
                      suggestion={suggestion}
                      desiredWeightClass={desiredWeightClass}
                      isItemInfoOpen={isItemInfoOpen}
                      onItemInfoOpen={setItemInfo}
                    />
                    <BaseButton
                      color="cyan"
                      className="mt-4"
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
                    </BaseButton>
                  </div>
                ))}
            </div>
            <Pagination
              isLoading={isCalculating}
              currentPage={currentPage}
              firstVisibleItemNumber={firstVisibleItemNumber}
              lastVisibleItemNumber={lastVisibleItemNumber}
              pageNumbers={pageNumbers}
              totalItems={armorSuggestions.length}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPageClick}
              onNextPage={handleNextPageClick}
              onSpecificPage={handleSpecificPageClick}
            />
          </div>
        </div>
      )}
    </ArmorInfoContainer>
  )
}

function ArmorInfoContainer({
  children,
  isDialogOpen,
  itemInfo,
  isItemInfoOpen,
  onDialogClose,
  onInfoClose,
}: {
  children: React.ReactNode
  isDialogOpen: boolean
  itemInfo: Item | null
  isItemInfoOpen: boolean
  onDialogClose: () => void
  onInfoClose: () => void
}) {
  return (
    <Dialog
      title="Armor Calculator"
      subtitle="Get optimal armor values for this build."
      maxWidthClass="max-w-7xl"
      open={isDialogOpen}
      onClose={onDialogClose}
    >
      <ItemInfoDialog
        item={itemInfo}
        open={isItemInfoOpen}
        onClose={onInfoClose}
      />
      <div className="flex flex-col items-center justify-start sm:pr-4">
        <h2 className="mb-4 text-2xl font-semibold text-secondary-500">
          Armor Suggestions
        </h2>
        {children}
      </div>
    </Dialog>
  )
}
