import {
  Select as HeadlessSelect,
  type SelectProps as HeadlessSelectProps,
} from '@headlessui/react'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

export const BaseSelect = forwardRef<HTMLSelectElement, HeadlessSelectProps>(
  function Select({ className, multiple, ...props }, ref) {
    return (
      <span
        data-slot="control"
        className={clsx([
          className,

          // Basic layout
          'group relative block w-full',

          // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
          'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-on-background before:shadow',

          // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
          'before:hidden',

          // Focus ring
          'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:has-[[data-focus]]:ring-2 sm:after:has-[[data-focus]]:ring-primary',

          // Disabled state
          'has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-outline/5 before:has-[[data-disabled]]:shadow-none',
        ])}
      >
        <HeadlessSelect
          ref={ref}
          multiple={multiple}
          {...props}
          className={clsx([
            // Basic layout
            'relative block w-full appearance-none rounded-lg py-[calc(theme(spacing[2.5])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',

            // Horizontal padding
            multiple
              ? 'px-[calc(theme(spacing[3.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)]'
              : 'pl-[calc(theme(spacing[3.5])-1px)] pr-[calc(theme(spacing.10)-1px)] sm:pl-[calc(theme(spacing.3)-1px)] sm:pr-[calc(theme(spacing.9)-1px)]',

            // Options (multi-select)
            '[&_optgroup]:font-semibold',

            // Typography
            'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 text-on-background *:text-on-background',

            // Border
            'border border-zinc-950/10 data-[hover]:border-zinc-950/20 border-on-background/10 data-[hover]:border-on-background/20',

            // Background color
            'bg-transparent bg-on-background/5 bg-outline',

            // Hide default focus styles
            'focus:outline-none',

            // Invalid state
            'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:border-red-600 data-[invalid]:data-[hover]:border-red-600',

            // Disabled state
            'data-[disabled]:border-zinc-950/20 data-[disabled]:opacity-100 data-[hover]:data-[disabled]:border-on-background/15 data-[disabled]:border-on-background/15 data-[disabled]:bg-on-background/[2.5%]',
          ])}
        />
        {!multiple && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="size-5 stroke-zinc-500 group-has-[[data-disabled]]:stroke-zinc-600 sm:size-4 stroke-zinc-400 forced-colors:stroke-[CanvasText]"
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
        )}
      </span>
    )
  },
)
