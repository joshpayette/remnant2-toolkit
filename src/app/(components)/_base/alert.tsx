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

import { ZINDEXES } from '@/app/(components)/z-indexes'
import { cn } from '@/app/(utils)/classnames'

import { BaseText } from './text'

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

export function BaseAlert({
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
          <div className="fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/50 px-2 py-2 focus:outline-0 sm:px-6 sm:py-8 lg:px-8 lg:py-16" />
        </HeadlessTransitionChild>

        <HeadlessTransitionChild
          className={cn(
            'fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0',
            ZINDEXES.ALERT,
          )}
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
                'row-start-2 w-full rounded-2xl bg-zinc-900 p-8 shadow-lg ring-1 ring-surface-solid/10 sm:rounded-2xl sm:p-6 forced-colors:outline',
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

export function BaseAlertTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <HeadlessDialogTitle
      {...props}
      className={clsx(
        className,
        'text-balance text-center text-base/6 font-semibold text-surface-solid sm:text-wrap sm:text-left sm:text-sm/6',
      )}
    />
  )
}

export function BaseAlertDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <HeadlessDescription
      as={BaseText}
      {...props}
      className={clsx(className, 'mt-2 text-pretty text-center sm:text-left')}
    />
  )
}

export function BaseAlertBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'mt-4')} />
}

export function BaseAlertActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'mt-6 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:mt-4 sm:flex-row sm:*:w-auto',
      )}
    />
  )
}
