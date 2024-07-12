import {
  Description as HeadlessDescription,
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  type DialogProps as HeadlessDialogProps,
  DialogTitle as HeadlessDialogTitle,
  Transition as HeadlessTransition,
  TransitionChild as HeadlessTransitionChild,
} from '@headlessui/react'
import { BaseText } from '@repo/ui/base/text'
import { cn } from '@repo/ui/classnames'
import { ZINDEXES } from '@repo/ui/zindexes'
import clsx from 'clsx'
import type React from 'react'
import { Fragment } from 'react'

const sizes = {
  xs: 'sm:ui-max-w-xs',
  sm: 'sm:ui-max-w-sm',
  md: 'sm:ui-max-w-md',
  lg: 'sm:ui-max-w-lg',
  xl: 'sm:ui-max-w-xl',
  '2xl': 'sm:ui-max-w-2xl',
  '3xl': 'sm:ui-max-w-3xl',
  '4xl': 'sm:ui-max-w-4xl',
  '5xl': 'sm:ui-max-w-5xl',
  '6xl': 'sm:ui-max-w-6xl',
  '7xl': 'sm:ui-max-w-7xl',
}

export function BaseDialog({
  open,
  onClose,
  size = 'lg',
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
          enter="ui-ease-out ui-duration-100"
          enterFrom="ui-opacity-0"
          enterTo="ui-opacity-100"
          leave="ui-ease-in ui-duration-100"
          leaveFrom="ui-opacity-100"
          leaveTo="ui-opacity-0"
        >
          <div
            className={cn(
              'ui-fixed ui-inset-0 ui-flex ui-w-screen ui-justify-center ui-overflow-y-auto ui-bg-zinc-950/50 ui-px-2 ui-py-2 focus:ui-outline-0 sm:ui-px-6 sm:ui-py-8 lg:ui-px-8 lg:ui-py-16',
              ZINDEXES.DIALOG_BACKDROP,
            )}
          />
        </HeadlessTransitionChild>

        <HeadlessTransitionChild
          enter="ui-ease-out ui-duration-100"
          enterFrom="ui-opacity-0 ui-translate-y-12 sm:ui-translate-y-0"
          enterTo="ui-opacity-100 ui-translate-y-0"
          leave="ui-ease-in ui-duration-100"
          leaveFrom="ui-opacity-100 ui-translate-y-0"
          leaveTo="ui-opacity-0 ui-translate-y-12 sm:ui-translate-y-0"
        >
          <div
            className={cn(
              'ui-fixed ui-inset-0 ui-w-screen ui-overflow-y-auto ui-pt-24 sm:ui-p-4',
              ZINDEXES.DIALOG,
            )}
          >
            <div className="ui-grid ui-min-h-full ui-grid-rows-[1fr_auto] ui-justify-items-center sm:ui-grid-rows-[1fr_auto_3fr] sm:ui-p-4">
              <HeadlessTransitionChild
                as={HeadlessDialogPanel}
                className={clsx(
                  className,
                  sizes[size],
                  'ui-ring-surface-solid/10 forced-colors:ui-outline ui-row-start-2 ui-w-full ui-min-w-0 ui-rounded-t-3xl ui-bg-zinc-900 ui-shadow-lg ui-ring-1 sm:ui-mb-auto sm:ui-rounded-2xl ui-p-[--gutter] [--gutter:theme(spacing.8)]',
                )}
                enter="ui-ease-out ui-duration-100"
                enterFrom="sm:ui-scale-95"
                enterTo="sm:ui-scale-100"
                leave="ui-ease-in ui-duration-100"
                leaveFrom="sm:ui-scale-100"
                leaveTo="sm:ui-scale-100"
              >
                {children}
              </HeadlessTransitionChild>
            </div>
          </div>
        </HeadlessTransitionChild>
      </HeadlessDialog>
    </HeadlessTransition>
  )
}

export function BaseDialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <HeadlessDialogTitle
      {...props}
      className={clsx(
        className,
        'ui-text-balance ui-text-surface-solid ui-text-lg/6 ui-font-semibold sm:ui-text-base/6',
      )}
    />
  )
}

export function BaseDialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <HeadlessDescription
      as={BaseText}
      {...props}
      className={clsx(className, 'ui-text-pretty ui-mt-2')}
    />
  )
}

export function BaseDialogBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'ui-mt-6')} />
}

export function BaseDialogActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        '*:ui-w-full sm:*:ui-w-auto ui-mt-8 ui-flex ui-flex-col-reverse ui-items-center ui-justify-end ui-gap-3 sm:ui-flex-row',
      )}
    />
  )
}
