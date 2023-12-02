'use client'

import { Fragment } from 'react'
import { Dialog as BaseDialog, Transition } from '@headlessui/react'
import { loadoutItemTypeToItemType } from '@/lib/utils'

interface DialogProps {
  children: React.ReactNode
  open: boolean
  title: string
  onClose: () => void
}

export default function Dialog({
  children,
  open,
  title,
  onClose,
}: DialogProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <BaseDialog as="div" className="relative z-50" onClose={onClose}>
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
              <BaseDialog.Panel className="relative transform overflow-hidden bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6 md:max-w-lg lg:max-w-xl  xl:max-w-4xl">
                <div>
                  <div className="text-center">
                    <BaseDialog.Title
                      as="h3"
                      className="mb-12 text-4xl font-semibold leading-6 text-green-500"
                    >
                      {title}
                    </BaseDialog.Title>
                    <div className="mt-2">{children}</div>
                  </div>
                </div>
              </BaseDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </BaseDialog>
    </Transition.Root>
  )
}
