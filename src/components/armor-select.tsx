import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { armorList } from '@/data/armor'
import Image from 'next/image'
import type { ArmorSlot, Armor } from '@/data/armor'

interface ArmorSelectProps {
  onClose: () => void
  onSelectArmor: (armor: Armor) => void
  open: boolean
  slot: ArmorSlot
}

function ArmorSelect({
  onClose,
  onSelectArmor,
  open,
  slot,
}: ArmorSelectProps): JSX.Element {
  const armorForSlot = armorList.filter((a) => a.slot === slot)

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="mb-5 text-base font-semibold leading-6 text-gray-100"
                    >
                      Select Armor
                    </Dialog.Title>
                    <div className="mt-2">
                      <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                      >
                        {armorForSlot.map((armor) => (
                          <li
                            key={armor.name}
                            className="relative"
                            onClick={() => onSelectArmor(armor)}
                          >
                            <div className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-black focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                              <Image
                                src={armor.path}
                                alt={armor.name}
                                width="60"
                                height="60"
                                className="pointer-events-none object-cover group-hover:opacity-75"
                              />
                            </div>
                            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-400">
                              {armor.name}
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

export default ArmorSelect
