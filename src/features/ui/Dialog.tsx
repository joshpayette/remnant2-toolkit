'use client'

import { Dialog as BaseDialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'

import { Button } from '@/app/(components)/base/button'
import { cn } from '@/lib/classnames'

export type DialogMaxWidthClass =
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

interface DialogProps {
  children?: React.ReactNode
  maxWidthClass: DialogMaxWidthClass
  open: boolean
  title: React.ReactNode
  subtitle?: React.ReactNode
  onClose: () => void
  zIndex?: 'z-10' | 'z-20' | 'z-30' | 'z-40' | 'z-50'
}

export function Dialog({
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
              <BaseDialog.Panel className="relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-primary-500 bg-black px-4 py-4 text-left shadow-xl transition-all sm:my-8">
                <span className="absolute right-0 top-0">
                  <Button plain onClick={onClose} aria-label="Close dialog">
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </span>
                <div className="text-center">
                  <BaseDialog.Title
                    as="h3"
                    className={cn(
                      'text-4xl font-semibold text-primary-500',
                      !subtitle ? 'mb-4' : 'mb-0',
                    )}
                  >
                    {title}
                  </BaseDialog.Title>
                  {subtitle && (
                    <BaseDialog.Description>{subtitle}</BaseDialog.Description>
                  )}
                  <div className="mt-4">{children}</div>
                </div>
              </BaseDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </BaseDialog>
    </Transition.Root>
  )
}
