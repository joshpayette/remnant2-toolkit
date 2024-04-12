import {
  Description as HeadlessDescription,
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  type DialogProps as HeadlessDialogProps,
  DialogTitle as HeadlessDialogTitle,
  Transition as HeadlessTransition,
  TransitionChild as HeadlessTransitionChild,
} from '@headlessui/react'
import clsx from 'clsx'
import type React from 'react'
import { Fragment } from 'react'

import { Text } from './text'

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}

export function Alert({
  open,
  onClose,
  size = 'md',
  className,
  children,
  ...props
}: {
  size?: keyof typeof sizes
  children: React.ReactNode
} & HeadlessDialogProps) {
  return (
    <HeadlessTransition appear as={Fragment} show={open} {...props}>
      <HeadlessDialog onClose={onClose}>
        <HeadlessTransitionChild
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-zinc-950/15 fixed inset-0 flex w-screen justify-center overflow-y-auto px-2 py-2 focus:outline-0 dark:bg-zinc-950/50 sm:px-6 sm:py-8 lg:px-8 lg:py-16" />
        </HeadlessTransitionChild>

        <HeadlessTransitionChild
          className="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0"
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="grid min-h-full grid-rows-[1fr_auto_1fr] justify-items-center p-8 sm:grid-rows-[1fr_auto_3fr] sm:p-4">
            <HeadlessTransitionChild
              as={HeadlessDialogPanel}
              className={clsx(
                className,
                sizes[size],
                'forced-colors:outline row-start-2 w-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-900 dark:ring-white/10 sm:rounded-2xl sm:p-6',
              )}
              enter="ease-out duration-100"
              enterFrom="scale-95"
              enterTo="scale-100"
              leave="ease-in duration-100"
              leaveFrom="scale-100"
              leaveTo="scale-100"
            >
              {children}
            </HeadlessTransitionChild>
          </div>
        </HeadlessTransitionChild>
      </HeadlessDialog>
    </HeadlessTransition>
  )
}

export function AlertTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <HeadlessDialogTitle
      {...props}
      className={clsx(
        className,
        'text-balance sm:text-wrap text-center text-base/6 font-semibold text-zinc-950 dark:text-white sm:text-left sm:text-sm/6',
      )}
    />
  )
}

export function AlertDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <HeadlessDescription
      as={Text}
      {...props}
      className={clsx(className, 'text-pretty mt-2 text-center sm:text-left')}
    />
  )
}

export function AlertBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'mt-4')} />
}

export function AlertActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        '*:w-full sm:*:w-auto mt-6 flex flex-col-reverse items-center justify-end gap-3 sm:mt-4 sm:flex-row',
      )}
    />
  )
}
