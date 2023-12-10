import dynamic from 'next/dynamic'
import { type Build } from '@/types'
import { Fragment, useMemo, useState } from 'react'
import useQueryString from '@/hooks/useQueryString'
import { type Item, type ItemCategory } from '@/types'
import { remnantItems } from '@/data'
import Image from 'next/image'
import { getArrayOfLength } from '@/lib/utils'
import BuildName from './BuildName'
import BuildButton from './BuildButton'

// Prevents hydration errors with the ItemSelect modal
const ItemSelect = dynamic(
  () => import('@/app/builds/(components)/ItemSelect'),
  {
    ssr: false,
  },
)

export default function ImageBuild({
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
    // return items that match the loadout slot
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

      <BuildName
        editable={buildNameIsEditable}
        onClick={() => setBuildNameIsEditable(true)}
        onClose={(newBuildName: string) => {
          updateQueryString('name', newBuildName)
          setBuildNameIsEditable(false)
        }}
        name={build.name}
      />

      <div
        id="build-container"
        className="flex w-full items-start justify-between gap-4"
      >
        <div id="left-column" className="flex-none">
          <BuildButton
            onClick={() => {
              setSelectedItemSlot({
                category: 'helm',
              })
            }}
            itemName={build.items.helm?.name || null}
            showLabels={showLabels}
          >
            {build.items.helm && (
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.helm.imagePath}`}
                alt={`${build.items.helm?.name} icon`}
                width={50}
                height={50}
              />
            )}
          </BuildButton>
          <BuildButton
            onClick={() => {
              setSelectedItemSlot({
                category: 'torso',
              })
            }}
            itemName={build.items.torso?.name || null}
            showLabels={showLabels}
          >
            {build.items.torso && (
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.torso.imagePath}`}
                alt={`${build.items.torso?.name} icon`}
                width={50}
                height={50}
              />
            )}
          </BuildButton>
          <BuildButton
            onClick={() => {
              setSelectedItemSlot({
                category: 'legs',
              })
            }}
            itemName={build.items.legs?.name || null}
            showLabels={showLabels}
          >
            {build.items.legs && (
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.legs.imagePath}`}
                alt={`${build.items.legs?.name} icon`}
                width={50}
                height={50}
              />
            )}
          </BuildButton>
          <BuildButton
            onClick={() => {
              setSelectedItemSlot({
                category: 'gloves',
              })
            }}
            itemName={build.items.gloves?.name || null}
            showLabels={showLabels}
          >
            {build.items.gloves && (
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.gloves.imagePath}`}
                alt={`${build.items.gloves?.name} icon`}
                width={50}
                height={50}
              />
            )}
          </BuildButton>
          <div id="relic-container" className="flex items-start justify-start">
            <BuildButton
              onClick={() => {
                setSelectedItemSlot({
                  category: 'relic',
                })
              }}
              itemName={build.items.relic?.name || null}
              showLabels={showLabels}
            >
              {build.items.relic && (
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.relic.imagePath}`}
                  alt={`${build.items.relic?.name} icon`}
                  width={50}
                  height={50}
                />
              )}
            </BuildButton>
            <div
              id="relic-fragment-container"
              className="flex flex-col items-start justify-start"
            >
              <BuildButton
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 0,
                  })
                }}
                itemName={
                  build.items.relicfragment &&
                  build.items.relicfragment[0]?.name
                }
                showLabels={showLabels}
                size="sm"
              >
                {build.items.relicfragment && build.items.relicfragment[0] && (
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.relicfragment[0].imagePath}`}
                    alt={`${build.items.relicfragment[0].name} icon`}
                    width={22}
                    height={22}
                  />
                )}
              </BuildButton>
              <BuildButton
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 1,
                  })
                }}
                itemName={
                  build.items.relicfragment &&
                  build.items.relicfragment[1]?.name
                }
                showLabels={showLabels}
                size="sm"
              >
                {build.items.relicfragment && build.items.relicfragment[1] && (
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.relicfragment[1].imagePath}`}
                    alt={`${build.items.relicfragment[1].name} icon`}
                    width={22}
                    height={22}
                  />
                )}
              </BuildButton>
              <BuildButton
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 2,
                  })
                }}
                itemName={
                  build.items.relicfragment &&
                  build.items.relicfragment[2]?.name
                }
                showLabels={showLabels}
                size="sm"
              >
                {build.items.relicfragment && build.items.relicfragment[2] && (
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.relicfragment[2].imagePath}`}
                    alt={`${build.items.relicfragment[2].name} icon`}
                    width={22}
                    height={22}
                  />
                )}
              </BuildButton>
            </div>
          </div>
        </div>
        <div id="right-column" className="flex-none">
          <BuildButton
            onClick={() => {
              setSelectedItemSlot({
                category: 'amulet',
              })
            }}
            itemName={build.items.amulet?.name || null}
            showLabels={showLabels}
          >
            {build.items.amulet && (
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.amulet.imagePath}`}
                alt={`${build.items.amulet?.name} icon`}
                width={50}
                height={50}
              />
            )}
          </BuildButton>
          {getArrayOfLength(4).map((ringIndex) => (
            <BuildButton
              key={`ring-${ringIndex}`}
              onClick={() => {
                setSelectedItemSlot({
                  category: 'ring',
                  index: ringIndex,
                })
              }}
              showLabels={showLabels}
              itemName={build.items.ring && build.items.ring[ringIndex]?.name}
            >
              {build.items.ring && build.items.ring[ringIndex] && (
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${build.items.ring[ringIndex].imagePath}`}
                  alt={`${build.items.ring[ringIndex].name} icon`}
                  width={50}
                  height={50}
                />
              )}
            </BuildButton>
          ))}
        </div>
      </div>
    </Fragment>
  )
}
