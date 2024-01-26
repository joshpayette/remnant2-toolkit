'use client'

import { useLocalStorage } from '@/features/localstorage/hooks/useLocalStorage'
import { useEffect, useMemo, useRef, useState } from 'react'
import ToCsvButton from '@/features/csv/components/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import PageHeader from '@/features/ui/PageHeader'
import { useFormState } from 'react-dom'
import parseSaveFile from './actions'
import { SubmitButton } from '../../features/ui/SubmitButton'
import { toast } from 'react-toastify'
import { remnantItemCategories, remnantItems } from '@/features/items/data'
import { GenericItem } from '@/features/items/types/GenericItem'
import useFilteredItems from '@/features/items/hooks/useFilteredItems'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import ItemInfo from '@/features/items/components/ItemInfo'
import Filters from '@/features/items/item-tracker/components/Filters'
import ListItems from '@/features/items/item-tracker/components/ListItems'

const skippedItemCategories: Array<GenericItem['category']> = ['skill', 'perk']

const itemCategories = remnantItemCategories.filter((category) => {
  return skippedItemCategories.includes(category) === false
})

const itemList = remnantItems
  // We don't want to show the items that are in the skippedItemCategories
  .filter((item) => skippedItemCategories.includes(item.category) === false)
  // Remove mods that have linked guns
  .filter((item) => {
    if (item.category !== 'mod') return true
    return item.linkedItems?.weapon === undefined
  })
  .map((item) => ({
    ...item,
    discovered: false,
  }))

export default function Page() {
  const isClient = useIsClient()

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<GenericItem | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const { itemTrackerStorage, setDiscoveredItemIds } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage

  const { filteredItems, handleUpdateFilters } = useFilteredItems(itemList)
  const totalItems = filteredItems.length

  // get response after save file upload
  const [uploadFormResponse, formAction] = useFormState(parseSaveFile, {
    saveFileDiscoveredItemIds: null,
  })
  // tracks the save data after upload
  const saveData = useRef<string[] | null>(null)
  // file input field
  const fileInput = useRef<HTMLInputElement | null>(null)

  // We only provide the relevant item data, not the internal image paths, etc.
  // We could maybe provide the ids as well, in case users wanted to dynamically
  // generate the build urls, but that's not a priority right now.
  const csvItems = useMemo(() => {
    return (
      filteredItems
        // Modify the data for use. Adds a discovered flag,
        // modifies the description for mutators
        .map((item) => {
          let csvItem = itemToCsvItem(item)

          // For mutators, we need to combine the description
          // and the max level bonus
          if (MutatorItem.isMutatorItem(item)) {
            const description = item.description
            const maxLevelBonus = item.maxLevelBonus
            csvItem = itemToCsvItem({
              ...item,
              description: `${description}. At Max Level: ${maxLevelBonus}`,
            })
          }

          return {
            ...csvItem,
            discovered: item.discovered,
          }
        })
        // sort items by category then name alphabetically
        .sort((a, b) => {
          if (a.category < b.category) return -1
          if (a.category > b.category) return 1
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
    )
  }, [filteredItems])

  // If the upload form response changes, we need to set the save data
  useEffect(() => {
    if (!uploadFormResponse) return

    const { saveFileDiscoveredItemIds, error } = uploadFormResponse

    if (error) {
      toast.error(error)
      if (fileInput.current) fileInput.current.value = ''
      return
    }

    if (!saveFileDiscoveredItemIds) return
    saveData.current = saveFileDiscoveredItemIds
  }, [uploadFormResponse])

  // If the save data is set, we need to check the discovered items
  useEffect(() => {
    if (!saveData.current) return

    // Remove any items that are in the skipped categories
    const filteredDiscoveredItems = saveData.current.filter((itemId) => {
      const item = itemList.find((item) => item.id === itemId)
      if (!item) return false
      if (skippedItemCategories.includes(item.category)) return false
      return true
    })

    // Update the discovered item ids
    setDiscoveredItemIds(filteredDiscoveredItems)
    // Reset the save data
    saveData.current = null
    // clear input field
    if (fileInput.current) fileInput.current.value = ''
    // notify of success
    toast.success('Save file uploaded successfully!')
    // Reload the page
    // window.location.reload()
  }, [setDiscoveredItemIds, filteredItems])

  // Provider the tracker progress
  const discoveredCount = filteredItems.reduce((acc, item) => {
    if (discoveredItemIds.includes(item.id)) return acc + 1
    return acc
  }, 0)
  const discoveredPercent = Math.round((discoveredCount / totalItems) * 100)
  const progress = isClient
    ? `${discoveredCount} / ${totalItems} (${
        isNaN(discoveredPercent) ? '0' : discoveredPercent
      }%)`
    : 'Calculating...'

  const handleShowItemInfo = (itemId: string) => {
    const item = itemList.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  const handleListItemClicked = (itemId: string) => {
    // If the item is already discovered, undiscover it
    if (discoveredItemIds.includes(itemId)) {
      const newDiscoveredItemIds = discoveredItemIds.filter(
        (id) => id !== itemId,
      )
      setDiscoveredItemIds(newDiscoveredItemIds)
      return
    }

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setDiscoveredItemIds(newDiscoveredItemIds)
  }

  if (!isClient) return null

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <ItemInfo
        item={itemInfo}
        open={isShowItemInfoOpen}
        onClose={() => setItemInfo(null)}
      />
      <PageHeader
        title="Remnant 2 Item Tracker"
        subtitle="Discover all the items in Remnant 2"
      >
        <h2>Progress</h2>
        <span className="mb-4 text-2xl font-bold text-green-400">
          {progress}
        </span>

        <div className="mb-8 flex items-center justify-center">
          <ToCsvButton data={csvItems} filename="remnant2toolkit_tracker" />
        </div>

        <div className="mx-auto mb-4 flex flex-col items-center justify-center">
          <h2 className="mb-4 text-xl font-bold text-green-400">Import Save</h2>
          <div className="mb-4 rounded border border-purple-500">
            <form
              action={formAction}
              className="grid grid-cols-1 bg-black sm:grid-cols-3"
            >
              <div className="flex  w-full items-center justify-center bg-purple-700 p-2 sm:col-span-2">
                <input
                  type="file"
                  name="saveFile"
                  className="text-sm"
                  ref={fileInput}
                />
              </div>
              <SubmitButton
                label="Import Save File"
                className="flex items-center justify-center border border-green-300 bg-green-500 p-2 px-2 text-sm font-bold text-gray-800 hover:border-green-300 hover:bg-green-600 disabled:bg-gray-500"
              />
              <div className="col-span-full gap-y-4 overflow-x-auto bg-black p-2 text-left">
                <p className="text-sm text-green-500">
                  You can find your save file in the following location:
                </p>

                <hr className="my-4" />

                <strong>Steam</strong>
                <pre className="mb-4 px-2 text-sm">
                  C:\Users\_your_username_\Saved
                  Games\Remnant2\Steam\_steam_id_\profile.sav
                </pre>

                <hr className="my-4" />

                <strong>Xbox GamePass</strong>
                <ul className="mb-4 list-inside list-disc text-sm">
                  <li>
                    The file name varies from user to user, but is usually
                    located in:
                    <pre>
                      %LOCALAPPDATA%\Packages\PerfectWorldEntertainment.GFREMP2_jrajkyc4tsa6w\SystemAppData\wgsYOURNUMERICID\
                    </pre>
                  </li>
                  <li>
                    You want to look for a save folder with a recent Date
                    Modified, but it may not always be the most recent.{' '}
                  </li>
                  <li>
                    File size for the save file should be the larger of the two
                    files you find, with a super long name, such as{' '}
                    <pre className="inline-block text-green-500">
                      DC6E40058AD611B18ED8685CA8BBE724
                    </pre>
                  </li>
                  <li>The size is typically less than 100kb</li>
                  <li>
                    Copy that file to another folder, rename it to{' '}
                    <pre className="inline-block text-green-500">
                      profile.sav
                    </pre>{' '}
                    and then import it.
                  </li>
                  <li>
                    Be sure to check the results, such as the number of items
                    and archtypes. If you choose the wrong file, it may still
                    show some items discovered erroneously. If this happens, try
                    a different file even if the date modified is older.
                  </li>
                </ul>

                <hr className="my-4" />

                <strong>Xbox</strong>
                <p className="text-sm italic">
                  I don&apos;t have the ability to test this, but I believe you
                  can export your save file to a USB drive, then rename the file
                  to profile.sav and import. If you can confirm this works,
                  please use the blue bug report icon in the bottom right to get
                  in touch.
                </p>

                <hr className="my-4" />

                <strong>Playstation</strong>
                <p className="text-sm italic">
                  I could use some help with this one. If you know where the
                  save is, or can provide a save that I can test with, I will
                  happily try to make this work. Please use the blue bug report
                  icon in the bottom right to get in touch.
                </p>
              </div>
            </form>
          </div>
        </div>
      </PageHeader>

      <div className="max-w-3xl">
        <h2 className="mb-2 text-center text-4xl font-bold text-green-400">
          Filters
        </h2>
        <Filters
          allItems={itemList}
          onUpdate={handleUpdateFilters}
          itemCategories={itemCategories}
        />
      </div>

      <div className="my-8 w-full">
        <ListItems
          items={filteredItems}
          onShowItemInfo={handleShowItemInfo}
          onClick={handleListItemClicked}
        />
      </div>
    </div>
  )
}
