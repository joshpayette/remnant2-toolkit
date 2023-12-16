import { TraitItem } from '@/app/(types)'
import { Fragment, useCallback, useMemo, useState } from 'react'
import useBuilder, {
  DEFAULT_TRAIT_AMOUNT,
} from '@/app/builder/(components)/useBuilder'
import { type Item, type ItemCategory } from '@/app/(types)'
import { cn, getArrayOfLength } from '@/app/(lib)/utils'
import BuilderName from './BuilderName'
import BuilderButton from './BuilderButton'
import Traits from './Traits'
import ItemSelect from './ItemSelect'

export default function Builder({
  showControls,
  showLabels,
}: {
  showControls: boolean
  showLabels: boolean
}) {
  // Custom hook for working with the build
  const { updateBuild, currentBuild, getItemListForCategory } = useBuilder()

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemSlot, setSelectedItemSlot] = useState<{
    category: ItemCategory | null
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
    (selectedItem: Item | null) => {
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
          const buildItems = currentBuild.items[selectedItemSlot.category]

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

      const categoryItemorItems = currentBuild.items[selectedItemSlot.category]

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
          const newTraitItemParams = newBuildItems.map(
            (i) => `${i.id};${(i as TraitItem).amount ?? DEFAULT_TRAIT_AMOUNT}`,
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
      currentBuild.items,
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
    () => getItemListForCategory(currentBuild, selectedItemSlot),
    [selectedItemSlot, currentBuild, getItemListForCategory],
  )

  return (
    <Fragment>
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
          name={currentBuild.name}
          showControls={showControls}
        />
      </div>

      <div className="flex w-full items-start justify-between gap-4">
        <div id="left-column" className="flex-none">
          <BuilderButton
            item={currentBuild.items.helm}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'helm',
              })
            }}
          />
          <BuilderButton
            item={currentBuild.items.torso}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'torso',
              })
            }}
          />
          <BuilderButton
            item={currentBuild.items.legs}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'legs',
              })
            }}
          />
          <BuilderButton
            item={currentBuild.items.gloves}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'gloves',
              })
            }}
          />
          <div
            id="relic-container"
            className="relative flex items-start justify-start"
          >
            <BuilderButton
              item={currentBuild.items.relic}
              showLabels={showLabels}
              onClick={() => {
                setSelectedItemSlot({
                  category: 'relic',
                })
              }}
            />
            <div
              id="relic-fragment-container"
              className="absolute left-[66px] top-0 flex w-[160px] flex-col items-start justify-start"
            >
              <BuilderButton
                showLabels={showLabels}
                size="sm"
                item={currentBuild.items.relicfragment[0]}
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 0,
                  })
                }}
              />
              <BuilderButton
                item={currentBuild.items.relicfragment[1]}
                showLabels={showLabels}
                size="sm"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 1,
                  })
                }}
              />
              <BuilderButton
                item={currentBuild.items.relicfragment[2]}
                showLabels={showLabels}
                size="sm"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 2,
                  })
                }}
              />
            </div>
          </div>
        </div>

        <div
          id="center-column"
          className={cn(
            'relative ml-[13px] flex h-[290px] max-h-[290px] flex-col items-start justify-start overflow-y-auto',

            'sm:h-[375px] sm:max-h-[375px]',
          )}
        >
          <div
            id="archtype-container"
            className="flex flex-row flex-wrap gap-2"
          >
            {getArrayOfLength(2).map((archtypeIndex) => (
              <Fragment key={`archtype-${archtypeIndex}`}>
                <BuilderButton
                  item={currentBuild.items.archtype[archtypeIndex]}
                  showLabels={showLabels}
                  onClick={() => {
                    setSelectedItemSlot({
                      category: 'archtype',
                      index: archtypeIndex,
                    })
                  }}
                />
                <BuilderButton
                  item={currentBuild.items.skill[archtypeIndex]}
                  showLabels={showLabels}
                  onClick={() => {
                    setSelectedItemSlot({
                      category: 'skill',
                      index: archtypeIndex,
                    })
                  }}
                />
              </Fragment>
            ))}
          </div>

          <div
            id="concoction-container"
            className="flex flex-row flex-wrap gap-2"
          >
            <BuilderButton
              item={currentBuild.items.concoction[0]}
              showLabels={showLabels}
              onClick={() => {
                setSelectedItemSlot({
                  category: 'concoction',
                  index: 0,
                })
              }}
            />
            {getArrayOfLength(3).map((index) => {
              // Skip the first concoction, since it's already been rendered
              const concoctionIndex = index + 1

              // Skip the concoctions if the build is not an alchemist
              const isPrimaryAlchemist =
                currentBuild.items.archtype[0]?.name?.toLowerCase() ===
                'alchemist'
              if (!isPrimaryAlchemist) return null

              return (
                <BuilderButton
                  key={`concoction-${concoctionIndex}`}
                  item={currentBuild.items.concoction[concoctionIndex]}
                  showLabels={showLabels}
                  onClick={() => {
                    setSelectedItemSlot({
                      category: 'concoction',
                      index: concoctionIndex,
                    })
                  }}
                />
              )
            })}
          </div>

          <div
            id="consumable-container"
            className="flex flex-row flex-wrap gap-2"
          >
            {getArrayOfLength(4).map((consumableIndex) => (
              <BuilderButton
                key={`consumable-${consumableIndex}`}
                item={currentBuild.items.consumable[consumableIndex]}
                showLabels={showLabels}
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'consumable',
                    index: consumableIndex,
                  })
                }}
              />
            ))}
          </div>
        </div>

        <div id="right-column" className="flex-none">
          <BuilderButton
            item={currentBuild.items.amulet}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'amulet',
              })
            }}
          />
          {getArrayOfLength(4).map((ringIndex) => (
            <BuilderButton
              showLabels={showLabels}
              item={currentBuild.items.ring[ringIndex]}
              key={`ring-${ringIndex}`}
              onClick={() => {
                setSelectedItemSlot({
                  category: 'ring',
                  index: ringIndex,
                })
              }}
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
              item={currentBuild.items.weapon[weaponIndex]}
              size="wide"
              onClick={() => {
                setSelectedItemSlot({
                  category: 'weapon',
                  index: weaponIndex,
                })
              }}
            />
            <div className="flex w-full grow items-center justify-around gap-4">
              <BuilderButton
                showLabels={showLabels}
                item={currentBuild.items.mod[weaponIndex]}
                size="md"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'mod',
                    index: weaponIndex,
                  })
                }}
              />
              <BuilderButton
                item={currentBuild.items.mutator[weaponIndex]}
                showLabels={showLabels}
                size="md"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'mutator',
                    index: weaponIndex,
                  })
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div id="trait-row" className="mt-4 w-full">
        <Traits
          traitItems={currentBuild.items.trait}
          showControls={showControls}
          onAddTrait={() => {
            setSelectedItemSlot({
              category: 'trait',
            })
          }}
          onRemoveTrait={(traitItem) => {
            const newTraitItems = currentBuild.items.trait.filter(
              (i) => i.name !== traitItem.name,
            )
            const newTraitItemParams = newTraitItems.map(
              (i) => `${i.id};${i.amount}`,
            )
            updateBuild('trait', newTraitItemParams)
          }}
          onChangeAmount={(newTraitItem) => {
            const newTraitItems = currentBuild.items.trait.map((traitItem) => {
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
    </Fragment>
  )
}
