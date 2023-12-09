import dynamic from 'next/dynamic'
import { type Build } from '@/types'
import { Fragment, useMemo, useState } from 'react'
import useQueryString from '@/hooks/useQueryString'
import { type Item, type ItemCategory } from '@/types'
import { remnantItems } from '@/data'
import Image from 'next/image'
import { cn, getArrayOfLength } from '@/lib/utils'

const ItemSelect = dynamic(() => import('@/app/builds/ItemSelect'), {
  ssr: false,
})

function BuildName({
  editable,
  name,
  onClick,
  onClose,
}: {
  editable: boolean
  name: string
  onClick: () => void
  onClose: (newBuildName: string) => void
}) {
  const [newName, setNewName] = useState(name)

  return (
    <div className="relative mb-4 flex w-full flex-col items-center justify-center gap-2 border-b border-b-green-900 pb-2">
      {editable ? (
        <Fragment>
          <input
            type="text"
            name="buildname"
            id="buildname"
            value={newName}
            className="block w-full max-w-xl rounded-md border-0 bg-black py-1.5 text-center text-xl text-green-500 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:leading-6"
            placeholder="Build Name"
            onChange={(e) => setNewName(e.target.value)}
          />
          <div>
            <button
              onClick={() => onClose(newName)}
              className="mr-2 rounded-md bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save
            </button>
            <button
              onClick={() => onClose(name)}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </Fragment>
      ) : (
        <button
          onClick={onClick}
          className="mb-2 text-center text-4xl font-bold text-green-400"
        >
          <h2>{name}</h2>
        </button>
      )}
    </div>
  )
}

function BuildButton({
  onClick,
  children,
  itemName,
  showLabels,
}: {
  onClick: () => void
  children: React.ReactNode
  itemName: string | null
  showLabels: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-4 h-auto min-h-[64px] w-[64px] gap-2 bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')] flex flex-col items-center justify-center border-2 border-transparent hover:border-purple-500`}
    >
      {children}
      {showLabels && (
        <div
          className={cn(
            'p-1 text-[10px] text-white',
            itemName && 'bg-purple-950',
          )}
        >
          {itemName}
        </div>
      )}
    </button>
  )
}

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
   * It will add the item to the URL query string.
   */
  function handleSelectItem(item: Item | null) {
    if (!item || !selectedItemSlot.category) return

    const buildItemOrItems = build.items[selectedItemSlot.category]

    if (Array.isArray(buildItemOrItems)) {
      const buildItems = buildItemOrItems

      // If no index is set, just add the item to the array
      // otherwise, insert in the specified slot
      if (selectedItemSlot.index === undefined) {
        // If the item is already in the build, don't add it again
        if (!buildItems.find((i) => i?.id === item.id)) {
          buildItems.push(item)
        }
      } else {
        if (!buildItems.find((i) => i?.id === item.id)) {
          buildItems[selectedItemSlot.index] = item
        }
      }
      const itemIds = buildItems.map((i) => i.id)
      updateQueryString(
        buildItems[selectedItemSlot.index || 0].category,
        itemIds,
      )
    } else {
      if (buildItemOrItems) {
        const buildItem = buildItemOrItems
        if (buildItem.id === item.id) return
      }

      updateQueryString(item.category, item.id)
    }
    setSelectedItemSlot({ category: null })
  }

  // If the item category is not null, the modal should be open
  const isItemSelectModalOpen = Boolean(selectedItemSlot.category)

  /**
   * Tracks whether the build name is editable or not.
   */
  const [buildNameIsEditable, setBuildNameIsEditable] = useState(false)

  /**
   * Fires when the user changes the build name
   * It will add the name to the URL query string.
   */
  function handleUpdateBuildName(name: string) {
    updateQueryString('name', name)
  }

  const itemListForSlot = useMemo(() => {
    if (!selectedItemSlot.category) return []
    // return items that match the loadout slot
    return (remnantItems as Item[]).filter(
      (item) => item.category === selectedItemSlot.category,
    )
  }, [selectedItemSlot])

  return (
    <Fragment>
      <BuildName
        editable={buildNameIsEditable}
        onClick={() => setBuildNameIsEditable(true)}
        onClose={(newBuildName: string) => {
          build.name = newBuildName
          handleUpdateBuildName(newBuildName)
          setBuildNameIsEditable(false)
        }}
        name={build.name}
      />
      <ItemSelect
        open={isItemSelectModalOpen}
        onClose={() => setSelectedItemSlot({ category: null })}
        onSelectItem={handleSelectItem}
        itemList={itemListForSlot}
        buildSlot={selectedItemSlot.category}
      />
      <div id="build-container" className="flex w-full">
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
        </div>
        <div id="center-column" className="w-full grow">
          &nbsp;
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
