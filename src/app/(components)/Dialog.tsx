'use client'

import { Fragment } from 'react'
import { Dialog as BaseDialog, Transition } from '@headlessui/react'
import { cn } from '@/app/(lib)/utils'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface DialogProps {
  children?: React.ReactNode
  maxWidthClass:
    | 'max-w-sm'
    | 'max-w-md'
    | 'max-w-lg'
    | 'max-w-xl'
    | 'max-w-2xl'
    | 'max-w-3xl'
    | 'max-w-4xl'
    | 'max-w-5xl'
    | 'max-w-6xl'
    | 'max-w-7xl'
    | 'max-w-full'
  open: boolean
  title: React.ReactNode
  subtitle?: string
  onClose: () => void
  zIndex?: 'z-10' | 'z-20' | 'z-30' | 'z-40' | 'z-50'
}

export default function Dialog({
  children,
  maxWidthClass,
  open,
  subtitle,
  title,
  zIndex = 'z-50',
  onClose,
}: DialogProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <BaseDialog as="div" className={cn('relative', zIndex)} onClose={onClose}>
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

        <div
          className={cn(
            maxWidthClass,
            'fixed inset-0 z-10 mx-auto w-full overflow-y-auto',
          )}
        >
          <div className="flex min-h-full w-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <BaseDialog.Panel className="relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-green-500 bg-black px-4 pb-4 pt-4 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                <button
                  className="absolute right-0 top-0 p-2 text-white hover:text-green-500"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="mb-8 text-center">
                  <BaseDialog.Title
                    as="h3"
                    className="text-4xl font-semibold leading-6 text-green-500"
                  >
                    {title}
                  </BaseDialog.Title>
                  {subtitle && (
                    <BaseDialog.Description className="text-md mb-4 mt-2 text-gray-400">
                      {subtitle}
                    </BaseDialog.Description>
                  )}
                  <div className="mt-2">{children}</div>
                </div>
              </BaseDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </BaseDialog>
    </Transition.Root>
  )
}
