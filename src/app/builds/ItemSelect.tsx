'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { cn, loadoutItemTypeToItemType } from '@/lib/utils'
import type { Item, LoadoutItemType, LoadoutItem } from '@/types'
import ItemCardButton from '../../components/ItemCardButton'

interface ItemSelectProps {
  itemList: Item[]
  loadoutSlot: LoadoutItemType | null
  open: boolean
  onClose: () => void
  onSelectItem: (item: LoadoutItem) => void
}

export default function ItemSelect({
  itemList,
  loadoutSlot,
  open,
  onClose,
  onSelectItem,
}: ItemSelectProps) {
  if (!loadoutSlot) {
    return null
  }

  const itemType = loadoutItemTypeToItemType(loadoutSlot)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6 md:max-w-lg lg:max-w-xl  xl:max-w-4xl">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="mb-12 text-4xl font-semibold leading-6 text-green-500"
                    >
                      Select Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                      >
                        {itemList.map((item) => (
                          <li key={item.name}>
                            <div
                              className={cn(
                                'group flex items-center justify-center overflow-hidden  bg-black',
                              )}
                            >
                              <ItemCardButton
                                item={{
                                  ...item,
                                  type: itemType,
                                }}
                                onClick={() =>
                                  onSelectItem({
                                    ...item,
                                    type: loadoutSlot,
                                  })
                                }
                                size="sm"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
