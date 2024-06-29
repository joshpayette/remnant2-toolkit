'use client'

import * as Headless from '@headlessui/react'
import { ZINDEXES } from '@repo/ui/zindexes'
import clsx from 'clsx'
import { Fragment } from 'react'

export function BaseListbox<T>({
  className,
  placeholder,
  autoFocus,
  multiple = false,
  'aria-label': ariaLabel,
  children: options,
  ...props
}: {
  className?: string
  placeholder?: React.ReactNode
  autoFocus?: boolean
  'aria-label'?: string
  children?: React.ReactNode
} & Headless.ListboxProps<typeof Fragment, T>) {
  return (
    <Headless.Listbox {...props} multiple={multiple}>
      <Headless.ListboxButton
        autoFocus={autoFocus}
        data-slot="control"
        aria-label={ariaLabel}
        className={clsx([
          className,

          // Basic layout
          'ui-group ui-relative ui-block ui-w-full',

          // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
          'before:ui-bg-surface-solid before:ui-absolute before:ui-inset-px before:ui-rounded-[calc(theme(borderRadius.lg)-1px)] before:ui-shadow',

          // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
          'before:ui-hidden',

          // Hide default focus styles
          'focus:ui-outline-none',

          // Focus ring
          'after:ui-pointer-events-none after:ui-absolute after:ui-inset-0 after:ui-rounded-lg after:ui-ring-inset after:ui-ring-transparent sm:after:data-[focus]:ui-ring-2 sm:after:data-[focus]:ui-ring-blue-500',

          // Disabled state
          'data-[disabled]:ui-opacity-50 before:data-[disabled]:ui-bg-zinc-950/5 before:data-[disabled]:ui-shadow-none',
        ])}
      >
        <Headless.ListboxSelectedOption
          as="span"
          options={options}
          placeholder={
            placeholder && (
              <span className="ui-block ui-truncate ui-text-zinc-500">
                {placeholder}
              </span>
            )
          }
          className={clsx([
            // Basic layout
            'ui-relative ui-block ui-w-full ui-appearance-none ui-rounded-lg ui-py-[calc(theme(spacing[2.5])-1px)] sm:ui-py-[calc(theme(spacing[1.5])-1px)]',

            // Set minimum height for when no value is selected
            'ui-min-h-11 sm:ui-min-h-9',

            // Horizontal padding
            'ui-pl-[calc(theme(spacing[3.5])-1px)] ui-pr-[calc(theme(spacing.7)-1px)] sm:ui-pl-[calc(theme(spacing.3)-1px)]',

            // Typography
            'ui-text-surface-solid forced-colors:ui-text-[CanvasText] ui-text-left ui-text-base/6 placeholder:ui-text-zinc-500 sm:ui-text-sm/6',

            // Border
            'group-data-[hover]:ui-surface-solid/20 ui-border-surface-solid/10 group-data-[active]:ui-border-surface-solid/20 ui-border',

            // Background color
            'ui-bg-surface-solid/5',

            // Invalid state
            'group-data-[invalid]:ui-border-red-600 group-data-[invalid]:group-data-[hover]:ui-border-red-600',

            // Disabled state
            'group-data-[disabled]:ui-border-surface-solid/15 group-data-[disabled]:ui-bg-surface-solid/[2.5%] data-[hover]:group-data-[disabled]:ui-border-surface-solid/15 group-data-[disabled]:ui-opacity-100',
          ])}
        />
        <span className="ui-pointer-events-none ui-absolute ui-inset-y-0 ui-right-0 ui-flex ui-items-center ui-pr-2">
          <svg
            className="ui-size-5 sm:ui-size-4 forced-colors:ui-stroke-[CanvasText] ui-stroke-zinc-400 group-data-[disabled]:ui-stroke-zinc-600"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M5.75 10.75L8 13L10.25 10.75"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.25 5.25L8 3L5.75 5.25"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Headless.ListboxButton>
      <Headless.Transition
        as={Fragment}
        leave="ui-transition-opacity ui-duration-100 ui-ease-in ui-pointer-events-none"
        leaveFrom="ui-opacity-100"
        leaveTo="ui-opacity-0"
      >
        <Headless.ListboxOptions
          anchor={{
            to: 'selection start',
          }}
          className={clsx(
            // positioning
            'absolute',

            ZINDEXES.LISTBOX_OPTIONS,

            // Anchor positioning
            '[--anchor-offset:-1.625rem] [--anchor-padding:theme(spacing.4)] sm:[--anchor-offset:-1.375rem]',

            // Base styles
            'ui-isolate ui-w-max ui-min-w-[calc(var(--button-width)+1.75rem)] ui-select-none ui-scroll-py-1 ui-rounded-xl ui-p-1',

            // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
            'ui-outline ui-outline-1 ui-outline-transparent focus:ui-outline-none',

            // Handle scrolling when menu won't fit in viewport
            'ui-overflow-y-scroll ui-overscroll-contain',

            // Popover background
            'ui-bg-zinc-800/75 ui-backdrop-blur-xl',

            // Shadows
            'ui-ring-surface-solid/10 ui-shadow-lg ui-ring-1 ui-ring-inset',
          )}
        >
          {options}
        </Headless.ListboxOptions>
      </Headless.Transition>
    </Headless.Listbox>
  )
}

export function BaseListboxOption<T>({
  children,
  className,
  ...props
}: { children?: React.ReactNode } & Headless.ListboxOptionProps<'div', T>) {
  const sharedClasses = clsx(
    // Base
    'ui-flex ui-min-w-0 ui-items-center',

    // Icons
    '[&>[data-slot=icon]]:ui-size-5 [&>[data-slot=icon]]:ui-shrink-0 [&>[data-slot=icon]]:ui-text-zinc-500 [&>[data-slot=icon]]:group-data-[focus]/option:ui-text-surface-solid sm:[&>[data-slot=icon]]:ui-size-4 forced-colors:[&>[data-slot=icon]]:ui-text-[CanvasText] forced-colors:[&>[data-slot=icon]]:group-data-[focus]/option:ui-text-[Canvas]',

    // Avatars
    '[&>[data-slot=avatar]]:ui-size-6 sm:[&>[data-slot=avatar]]:ui-size-5',
  )

  return (
    <Headless.ListboxOption as={Fragment} {...props}>
      {({ selectedOption }) => {
        if (selectedOption) {
          return (
            <div className={clsx(className, sharedClasses)}>{children}</div>
          )
        }

        return (
          <div
            className={clsx(
              // Basic layout
              'ui-group/option ui-grid ui-cursor-default ui-grid-cols-[theme(spacing.5),1fr] ui-items-baseline ui-gap-x-1.5 ui-rounded-lg ui-py-2.5 ui-pl-2.5 ui-pr-3.5 sm:ui-grid-cols-[theme(spacing.4),1fr] sm:ui-py-1.5 sm:ui-pl-2 sm:ui-pr-3',

              // Typography
              'ui-text-surface-solid forced-colors:ui-text-[CanvasText] ui-text-base/6 sm:ui-text-sm/6',

              // Focus
              'data-[focus]:ui-text-surface-solid ui-outline-none data-[focus]:ui-bg-blue-500',

              // Forced colors mode
              'ui-forced-color-adjust-none forced-colors:data-[focus]:ui-bg-[Highlight] forced-colors:data-[focus]:ui-text-[HighlightText]',

              // Disabled
              'data-[disabled]:ui-opacity-50',
            )}
          >
            <svg
              className="ui-size-5 sm:ui-size-4 ui-relative ui-hidden ui-self-center ui-stroke-current group-data-[selected]/option:ui-inline"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 8.5l3 3L12 4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={clsx(className, sharedClasses, 'ui-col-start-2')}>
              {children}
            </span>
          </div>
        )
      }}
    </Headless.ListboxOption>
  )
}

export function BaseListboxLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={clsx(
        className,
        'ui-ml-2.5 ui-truncate first:ui-ml-0 sm:ui-ml-2 sm:first:ui-ml-0',
      )}
      {...props}
    />
  )
}

export function BaseListboxDescription({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={clsx(
        className,
        'group-data-[focus]/option:ui-text-surface-solid ui-flex ui-flex-1 ui-overflow-hidden ui-text-zinc-400 before:ui-w-2 before:ui-min-w-0 before:ui-shrink',
      )}
      {...props}
    >
      <span className="ui-flex-1 ui-truncate">{children}</span>
    </span>
  )
}
