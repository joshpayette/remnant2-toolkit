import { TraitItem } from '@/app/(types)/TraitItem'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { cn, getArrayOfLength, getConcoctionSlotCount } from '@/app/(lib)/utils'
import BuilderName from './BuilderName'
import BuilderButton from './BuilderButton'
import Traits from './Traits'
import ItemSelect from './ItemSelect'
import Logo from '@/app/(components)/Logo'
import useBuildSearchParams from '../(hooks)/useBuildSearchParams'
import { GenericItem } from '@/app/(types)/GenericItem'
import { getItemListForCategory } from '../(lib)/utils'
import { BuildState } from '@/app/(types)'
import MemberFeatures from './MemberFeatures'

export default function Builder({
  buildState,
  isEditable,
  isScreenshotMode,
  showControls,
  showLabels,
}: {
  buildState: BuildState
  isEditable: boolean
  isScreenshotMode: boolean
  showControls: boolean
  showLabels: boolean
}) {
  // Custom hook for working with the build
  const { updateBuild, currentBuildState } = useBuildSearchParams()
  const concoctionSlotCount = getConcoctionSlotCount(currentBuildState)

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemSlot, setSelectedItemSlot] = useState<{
    category: GenericItem['category'] | null
    index?: number
  }>({ category: null })

  /**
   * Fires when the user changes an item in the build.
   *
   * If the item is null, the item is removed from the build
   * and from the query string.
   *
   * If the item is not null, the item is added to the build
   * and the query string is updated.
   */
  const handleSelectItem = useCallback(
    (selectedItem: GenericItem | null) => {
      if (!selectedItemSlot.category) return

      /**
       * The item index is used to determine which item in the array of items
       * for slots like rings and archtypes
       */
      const specifiedIndex = selectedItemSlot.index
      const isIndexSpecified = specifiedIndex !== undefined

      // If the item is null, remove the item from the build
      // and from the query string
      // If the item can be multiple, such as rings,
      // then remove the item at the specified index
      if (!selectedItem) {
        if (isIndexSpecified) {
          const buildItems = buildState.items[selectedItemSlot.category]

          if (!Array.isArray(buildItems)) return

          // We can't filter here because we want to preserve the index
          // If we filtered, the second archtype would become the first archtype
          // if you removed the first archtype
          const newBuildItems = buildItems.map((item, index) =>
            index === specifiedIndex ? null : item,
          )
          const newItemIds = newBuildItems.map((i) => (i ? i.id : ''))
          updateBuild(selectedItemSlot.category, newItemIds)
        } else {
          updateBuild(selectedItemSlot.category, '')
        }

        setSelectedItemSlot({ category: null })
        return
      }

      const categoryItemorItems = buildState.items[selectedItemSlot.category]

      // If the item can be multiple, such as rings,
      // then add the item at the specified index
      if (Array.isArray(categoryItemorItems)) {
        const buildItems = categoryItemorItems

        const itemAlreadyInBuild = buildItems.find(
          (i) => i?.id === selectedItem.id,
        )
        if (itemAlreadyInBuild) return

        /** Used to add the new item to the array of items for this slot */
        const newBuildItems = [...buildItems]

        const specifiedIndex = selectedItemSlot.index
        const isIndexSpecified = specifiedIndex !== undefined

        isIndexSpecified
          ? (newBuildItems[specifiedIndex] = selectedItem)
          : newBuildItems.push(selectedItem)

        // If the item is a trait, then we need to add the amount to the query string
        if (selectedItemSlot.category === 'trait') {
          const newTraitItemParams = TraitItem.toParams(
            newBuildItems as TraitItem[],
          )
          updateBuild('trait', newTraitItemParams)
          setSelectedItemSlot({ category: null })
          return
        }

        // If we got here, add the item to the build
        const newItemIds = newBuildItems.map((i) => i?.id)
        updateBuild(selectedItem.category, newItemIds)
        setSelectedItemSlot({ category: null })
        return
      }

      // If the item is not null, add the item to the build
      const buildItem = categoryItemorItems

      const itemAlreadyInBuild = buildItem?.id === selectedItem.id
      if (itemAlreadyInBuild) return

      updateBuild(selectedItem.category, selectedItem.id)
      setSelectedItemSlot({ category: null })
    },
    [
      buildState.items,
      selectedItemSlot.category,
      selectedItemSlot.index,
      updateBuild,
    ],
  )

  /** If the item category is null, modal is closed */
  const isItemSelectModalOpen = Boolean(selectedItemSlot.category)

  //Tracks whether the build name is editable or not.
  const [buildNameIsEditable, setBuildNameIsEditable] = useState(false)

  /**
   * Returns a list of items that match the selected slot
   * This is passed to the ItemSelect modal to display the correct items
   */
  const itemListForSlot = useMemo(
    () => getItemListForCategory(buildState, selectedItemSlot),
    [selectedItemSlot, buildState],
  )

  function handleChangeDescription(description: string) {
    updateBuild('description', description)
  }
  function handleToggleIsPublic(isPublic: boolean) {
    updateBuild('isPublic', isPublic ? 'true' : 'false')
  }

  return (
    <>
      <ItemSelect
        open={isItemSelectModalOpen}
        onClose={() => setSelectedItemSlot({ category: null })}
        onSelectItem={handleSelectItem}
        itemList={itemListForSlot}
        buildSlot={selectedItemSlot.category}
      />

      <div className="mb-4">
        <BuilderName
          editable={buildNameIsEditable}
          onClick={() => setBuildNameIsEditable(true)}
          onClose={(newBuildName: string) => {
            updateBuild('name', newBuildName)
            setBuildNameIsEditable(false)
          }}
          name={buildState.name}
          showControls={showControls}
        />
      </div>

      <div
        className={cn('relative flex w-full items-start justify-between gap-4')}
      >
        {isScreenshotMode && (
          <div className="absolute bottom-[10px] right-[80px]">
            <Logo showUrl />
          </div>
        )}
        <div id="left-column" className="flex-none">
          <BuilderButton
            item={buildState.items.helm}
            showLabels={showLabels}
            onClick={
              isEditable
                ? () => {
                    setSelectedItemSlot({
                      category: 'helm',
                    })
                  }
                : undefined
            }
          />
          <BuilderButton
            item={buildState.items.torso}
            showLabels={showLabels}
            onClick={
              isEditable
                ? () => {
                    setSelectedItemSlot({
                      category: 'torso',
                    })
                  }
                : undefined
            }
          />
          <BuilderButton
            item={buildState.items.legs}
            showLabels={showLabels}
            onClick={
              isEditable
                ? () => {
                    setSelectedItemSlot({
                      category: 'legs',
                    })
                  }
                : undefined
            }
          />
          <BuilderButton
            item={buildState.items.gloves}
            showLabels={showLabels}
            onClick={
              isEditable
                ? () => {
                    setSelectedItemSlot({
                      category: 'gloves',
                    })
                  }
                : undefined
            }
          />
          <div
            id="relic-container"
            className="relative flex items-start justify-start"
          >
            <BuilderButton
              item={buildState.items.relic}
              showLabels={showLabels}
              onClick={
                isEditable
                  ? () => {
                      setSelectedItemSlot({
                        category: 'relic',
                      })
                    }
                  : undefined
              }
            />
            <div
              id="relic-fragment-container"
              className="absolute left-[66px] top-0 flex w-[160px] flex-col items-start justify-start"
            >
              <BuilderButton
                showLabels={showLabels}
                size="sm"
                item={buildState.items.relicfragment[0]}
                onClick={
                  isEditable
                    ? () => {
                        setSelectedItemSlot({
                          category: 'relicfragment',
                          index: 0,
                        })
                      }
                    : undefined
                }
              />
              <BuilderButton
                item={buildState.items.relicfragment[1]}
                showLabels={showLabels}
                size="sm"
                onClick={
                  isEditable
                    ? () => {
                        setSelectedItemSlot({
                          category: 'relicfragment',
                          index: 1,
                        })
                      }
                    : undefined
                }
              />
              <BuilderButton
                item={buildState.items.relicfragment[2]}
                showLabels={showLabels}
                size="sm"
                onClick={
                  isEditable
                    ? () => {
                        setSelectedItemSlot({
                          category: 'relicfragment',
                          index: 2,
                        })
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </div>

        <div
          id="center-column"
          className={cn(
            'relative ml-[13px] flex flex-col items-start justify-start overflow-y-auto',
            showLabels
              ? 'h-[450px] max-h-[450px] sm:h-[460px] sm:max-h-[460px]'
              : 'h-[362px] max-h-[362px] sm:h-[375px] sm:max-h-[375px]',
          )}
        >
          <div
            id="archtype-container"
            className="flex flex-row flex-wrap gap-2"
          >
            {getArrayOfLength(2).map((archtypeIndex) => (
              <Fragment key={`archtype-${archtypeIndex}`}>
                <BuilderButton
                  item={buildState.items.archtype[archtypeIndex]}
                  showLabels={showLabels}
                  onClick={
                    isEditable
                      ? () => {
                          setSelectedItemSlot({
                            category: 'archtype',
                            index: archtypeIndex,
                          })
                        }
                      : undefined
                  }
                />
                <BuilderButton
                  item={buildState.items.skill[archtypeIndex]}
                  showLabels={showLabels}
                  onClick={
                    isEditable
                      ? () => {
                          setSelectedItemSlot({
                            category: 'skill',
                            index: archtypeIndex,
                          })
                        }
                      : undefined
                  }
                />
              </Fragment>
            ))}
          </div>

          <div
            id="concoction-container"
            className="flex flex-row flex-wrap gap-x-2 gap-y-0"
          >
            <BuilderButton
              item={buildState.items.concoction[0]}
              showLabels={showLabels}
              onClick={
                isEditable
                  ? () => {
                      setSelectedItemSlot({
                        category: 'concoction',
                        index: 0,
                      })
                    }
                  : undefined
              }
            />
            {getArrayOfLength(concoctionSlotCount).map((index) => {
              // Add 1 to the index because we already rendered the first slot
              const concoctionIndex = index + 1
              return (
                <BuilderButton
                  key={`concoction-${concoctionIndex}`}
                  item={buildState.items.concoction[concoctionIndex]}
                  showLabels={showLabels}
                  onClick={
                    isEditable
                      ? () => {
                          setSelectedItemSlot({
                            category: 'concoction',
                            index: concoctionIndex,
                          })
                        }
                      : undefined
                  }
                />
              )
            })}
          </div>

          <div
            id="consumable-container"
            className="flex flex-row flex-wrap gap-x-1 gap-y-0"
          >
            {getArrayOfLength(4).map((consumableIndex) => (
              <BuilderButton
                key={`consumable-${consumableIndex}`}
                item={buildState.items.consumable[consumableIndex]}
                showLabels={showLabels}
                onClick={
                  isEditable
                    ? () => {
                        setSelectedItemSlot({
                          category: 'consumable',
                          index: consumableIndex,
                        })
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <div id="right-column" className="flex-none">
          <BuilderButton
            item={buildState.items.amulet}
            showLabels={showLabels}
            onClick={
              isEditable
                ? () => {
                    setSelectedItemSlot({
                      category: 'amulet',
                    })
                  }
                : undefined
            }
          />
          {getArrayOfLength(4).map((ringIndex) => (
            <BuilderButton
              showLabels={showLabels}
              item={buildState.items.ring[ringIndex]}
              key={`ring-${ringIndex}`}
              onClick={
                isEditable
                  ? () => {
                      setSelectedItemSlot({
                        category: 'ring',
                        index: ringIndex,
                      })
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <div
        id="guns-row"
        className="flex w-full flex-row items-start justify-start gap-2 overflow-x-auto"
      >
        {getArrayOfLength(3).map((weaponIndex) => (
          <div
            key={`gun-${weaponIndex}`}
            className="flex flex-col items-start justify-center"
          >
            <BuilderButton
              showLabels={showLabels}
              item={buildState.items.weapon[weaponIndex]}
              size="wide"
              onClick={
                isEditable
                  ? () => {
                      setSelectedItemSlot({
                        category: 'weapon',
                        index: weaponIndex,
                      })
                    }
                  : undefined
              }
            />
            <div className="flex w-full grow items-center justify-around gap-4">
              <BuilderButton
                showLabels={showLabels}
                item={buildState.items.mod[weaponIndex]}
                size="md"
                onClick={
                  isEditable
                    ? () => {
                        setSelectedItemSlot({
                          category: 'mod',
                          index: weaponIndex,
                        })
                      }
                    : undefined
                }
              />
              <BuilderButton
                item={buildState.items.mutator[weaponIndex]}
                showLabels={showLabels}
                size="md"
                onClick={
                  isEditable
                    ? () => {
                        setSelectedItemSlot({
                          category: 'mutator',
                          index: weaponIndex,
                        })
                      }
                    : undefined
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div id="trait-row" className="mt-4 w-full">
        <Traits
          traitItems={buildState.items.trait}
          showControls={showControls}
          showLabels={showLabels}
          isScreenshotMode={isScreenshotMode}
          onAddTrait={
            isEditable
              ? () => {
                  setSelectedItemSlot({
                    category: 'trait',
                  })
                }
              : undefined
          }
          onRemoveTrait={(traitItem) => {
            const newTraitItems = buildState.items.trait.filter(
              (i) => i.name !== traitItem.name,
            )
            const newTraitItemParams = newTraitItems.map(
              (i) => `${i.id};${i.amount}`,
            )
            updateBuild('trait', newTraitItemParams)
          }}
          onChangeAmount={(newTraitItem) => {
            const newTraitItems = buildState.items.trait.map((traitItem) => {
              if (traitItem.name === newTraitItem.name) {
                return newTraitItem
              }
              return traitItem
            })
            const newTraitItemParams = newTraitItems.map(
              (i) => `${i.id};${i.amount}`,
            )
            updateBuild('trait', newTraitItemParams)
          }}
        />
      </div>

        <div id="member-features-row" className="mt-4 w-full">
          <MemberFeatures
            description={buildState.description}
            isEditable={isEditable}
            isPublic={buildState.isPublic}
            isScreenshotModeActive={isScreenshotMode}
            onChangeDescription={handleChangeDescription}
            onChangeIsPublic={handleToggleIsPublic}
          />
        </div>
    </>
  )
}
