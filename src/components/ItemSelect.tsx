import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { cn, loadoutItemTypeToItemType } from '@/lib/utils'
import type { Item, LoadoutItemType, LoadoutItem } from '@/types'
import ItemCard from './ItemCard'

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
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="mb-5 text-base font-semibold leading-6 text-gray-100"
                    >
                      Select Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4"
                      >
                        {itemList.map((item) => (
                          <li
                            key={item.name}
                            onClick={() =>
                              onSelectItem({
                                ...item,
                                type: loadoutSlot,
                              })
                            }
                          >
                            <div
                              className={cn(
                                'group flex items-center justify-center overflow-hidden rounded-lg bg-black focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                                item.type === 'mainhand' ||
                                  item.type === 'offhand' ||
                                  item.type === 'melee'
                                  ? 'h-[60px] w-[120px]'
                                  : 'h-[60px] w-[60px]',
                              )}
                            >
                              <ItemCard
                                item={{
                                  ...item,
                                  type: itemType,
                                }}
                              />
                            </div>
                            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-400">
                              {item.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    onClick={onClose}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
