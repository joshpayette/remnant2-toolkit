import dynamic from 'next/dynamic'
import { WeaponItem, type Build } from '@/types'
import { Fragment, useMemo, useState } from 'react'
import useQueryString from '@/hooks/useQueryString'
import { type Item, type ItemCategory } from '@/types'
import { remnantItems } from '@/data'
import Image from 'next/image'
import { getArrayOfLength } from '@/lib/utils'
import BuildName from './BuildName'
import ImageBuilderButton from './ImageBuilderButton'

// Prevents hydration errors with the ItemSelect modal
const ItemSelect = dynamic(
  () => import('@/app/builder/(components)/ItemSelect'),
  {
    ssr: false,
  },
)

export default function ImageBuilder({
  build,
  showLabels,
}: {
  build: Build
  showLabels: boolean
}) {
  // Hook for modifying the URL query string
  const { updateQueryString } = useQueryString()

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
  function handleSelectItem(selectedItem: Item | null) {
    if (!selectedItemSlot.category) return

    if (!selectedItem) {
      updateQueryString(selectedItemSlot.category, '')
      return
    }

    const buildItemOrItems = build.items[selectedItemSlot.category]

    if (Array.isArray(buildItemOrItems)) {
      const buildItems = buildItemOrItems

      const itemAlreadyInBuild = buildItems.find(
        (i) => i?.id === selectedItem.id,
      )
      if (itemAlreadyInBuild) return

      /** Used to add the new item to the array of items for this slot */
      const newBuildItems = [...buildItems]

      const specifiedIndex = selectedItemSlot.index
      const itemIndexSpecified = specifiedIndex !== undefined

      itemIndexSpecified
        ? (newBuildItems[specifiedIndex] = selectedItem)
        : newBuildItems.push(selectedItem)

      const newItemIds = newBuildItems.map((i) => i.id)
      updateQueryString(selectedItem.category, newItemIds)
    } else {
      const buildItem = buildItemOrItems

      const itemAlreadyInBuild = buildItem?.id === selectedItem.id
      if (itemAlreadyInBuild) return

      updateQueryString(selectedItem.category, selectedItem.id)
    }

    setSelectedItemSlot({ category: null })
  }

  /** If the item category is null, modal is closed */
  const isItemSelectModalOpen = Boolean(selectedItemSlot.category)

  //Tracks whether the build name is editable or not.
  const [buildNameIsEditable, setBuildNameIsEditable] = useState(false)

  /**
   * Returns a list of items that match the selected slot
   * This is passed to the ItemSelect modal to display the correct items
   */
  const itemListForSlot = useMemo(() => {
    if (!selectedItemSlot.category) return []

    if (selectedItemSlot.category === 'weapon') {
      let type: WeaponItem['type']
      switch (selectedItemSlot.index) {
        case 0:
          type = 'long gun'
          break
        case 1:
          type = 'melee'
          break
        case 2:
          type = 'hand gun'
          break
      }

      return (remnantItems as WeaponItem[]).filter((item) => item.type === type)
    }

    return (remnantItems as Item[]).filter(
      (item) => item.category === selectedItemSlot.category,
    )
  }, [selectedItemSlot])

  return (
    <Fragment>
      <ItemSelect
        open={isItemSelectModalOpen}
        onClose={() => setSelectedItemSlot({ category: null })}
        onSelectItem={handleSelectItem}
        itemList={itemListForSlot}
        buildSlot={selectedItemSlot.category}
      />

      <div
        id="build-container"
        className="flex w-full items-start justify-between gap-4"
      >
        <div id="left-column" className="flex-none">
          <ImageBuilderButton
            item={build.items.helm}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'helm',
              })
            }}
          />
          <ImageBuilderButton
            item={build.items.torso}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'torso',
              })
            }}
          />
          <ImageBuilderButton
            item={build.items.legs}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'legs',
              })
            }}
          />
          <ImageBuilderButton
            item={build.items.gloves}
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
            <ImageBuilderButton
              item={build.items.relic}
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
              <ImageBuilderButton
                showLabels={showLabels}
                size="sm"
                item={build.items.relicfragment[0]}
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 0,
                  })
                }}
              />
              <ImageBuilderButton
                item={build.items.relicfragment[1]}
                showLabels={showLabels}
                size="sm"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 1,
                  })
                }}
              />
              <ImageBuilderButton
                item={build.items.relicfragment[2]}
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
          className="flex h-[290px] max-h-[290px] grow flex-col items-start justify-start overflow-y-scroll sm:h-[375px] sm:max-h-[375px]"
        >
          <BuildName
            editable={buildNameIsEditable}
            onClick={() => setBuildNameIsEditable(true)}
            onClose={(newBuildName: string) => {
              updateQueryString('name', newBuildName)
              setBuildNameIsEditable(false)
            }}
            name={build.name}
            showLabels={showLabels}
          />

          <div
            id="archtype-container"
            className="flex flex-row flex-wrap gap-2"
          >
            {getArrayOfLength(2).map((archtypeIndex) => (
              <Fragment key={`archtype-${archtypeIndex}`}>
                <ImageBuilderButton
                  item={build.items.archtype[archtypeIndex]}
                  showLabels={showLabels}
                  onClick={() => {
                    setSelectedItemSlot({
                      category: 'archtype',
                      index: archtypeIndex,
                    })
                  }}
                />
                <ImageBuilderButton
                  item={build.items.skill[archtypeIndex]}
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
            <ImageBuilderButton
              item={build.items.concoction[0]}
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
                build.items.archtype[0]?.name?.toLowerCase() === 'alchemist'
              if (!isPrimaryAlchemist) return null

              return (
                <ImageBuilderButton
                  key={`concoction-${concoctionIndex}`}
                  item={build.items.concoction[concoctionIndex]}
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
        </div>

        <div id="right-column" className="flex-none">
          <ImageBuilderButton
            item={build.items.amulet}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'amulet',
              })
            }}
          />
          {getArrayOfLength(4).map((ringIndex) => (
            <ImageBuilderButton
              showLabels={showLabels}
              item={build.items.ring[ringIndex]}
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
        className="flex w-full flex-row items-start justify-start gap-2 overflow-x-scroll"
      >
        {getArrayOfLength(3).map((weaponIndex) => (
          <div
            key={`gun-${weaponIndex}`}
            className="flex flex-col items-start justify-stretch"
          >
            <ImageBuilderButton
              showLabels={showLabels}
              item={build.items.weapon[weaponIndex]}
              size="wide"
              onClick={() => {
                setSelectedItemSlot({
                  category: 'weapon',
                  index: weaponIndex,
                })
              }}
            />
            <div className="flex grow flex-row items-start justify-center gap-4">
              <ImageBuilderButton
                showLabels={showLabels}
                item={build.items.mod[weaponIndex]}
                size="md"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'mod',
                    index: weaponIndex,
                  })
                }}
              />
              <ImageBuilderButton
                item={build.items.mutator[weaponIndex]}
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
    </Fragment>
  )
}
