import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from '@headlessui/react'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

const dateTypes = ['date', 'datetime-local', 'month', 'time', 'week']
type DateType = (typeof dateTypes)[number]

export type BaseInputProps = {
  type?:
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | DateType
} & HeadlessInputProps

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  function BaseInput({ className, ...props }, ref) {
    return (
      <span
        data-slot="control"
        className={clsx([
          className,

          // Basic layout
          'ui-relative ui-block ui-w-full',

          // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
          'before:ui-bg-surface-solid before:ui-absolute before:ui-inset-px before:ui-rounded-[calc(theme(borderRadius.lg)-1px)] before:ui-shadow',

          // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
          'before:ui-hidden',

          // Focus ring
          'after:ui-pointer-events-none after:ui-absolute after:ui-inset-0 after:ui-rounded-lg after:ui-ring-inset after:ui-ring-transparent sm:after:focus-within:ui-ring-2 sm:after:focus-within:ui-ring-blue-500',

          // Disabled state
          'has-[[data-disabled]]:ui-opacity-50 before:has-[[data-disabled]]:ui-bg-zinc-950/5 before:has-[[data-disabled]]:ui-shadow-none',

          // Invalid state
          'before:has-[[data-invalid]]:ui-shadow-red-500/10',
        ])}
      >
        <HeadlessInput
          ref={ref}
          className={clsx([
            // Date classes
            props.type &&
              dateTypes.includes(props.type) && [
                '[&::-webkit-datetime-edit-fields-wrapper]:ui-p-0',
                '[&::-webkit-date-and-time-value]:ui-min-h-[1.5em]',
                '[&::-webkit-datetime-edit]:ui-inline-flex',
                '[&::-webkit-datetime-edit]:ui-p-0',
                '[&::-webkit-datetime-edit-year-field]:ui-p-0',
                '[&::-webkit-datetime-edit-month-field]:ui-p-0',
                '[&::-webkit-datetime-edit-day-field]:ui-p-0',
                '[&::-webkit-datetime-edit-hour-field]:ui-p-0',
                '[&::-webkit-datetime-edit-minute-field]:ui-p-0',
                '[&::-webkit-datetime-edit-second-field]:ui-p-0',
                '[&::-webkit-datetime-edit-millisecond-field]:ui-p-0',
                '[&::-webkit-datetime-edit-meridiem-field]:ui-p-0',
              ],

            // Basic layout
            'ui-relative ui-block ui-w-full ui-appearance-none ui-rounded-lg ui-px-[calc(theme(spacing[3.5])-1px)] ui-py-[calc(theme(spacing[2.5])-1px)] sm:ui-px-[calc(theme(spacing[3])-1px)] sm:ui-py-[calc(theme(spacing[1.5])-1px)]',

            // Typography
            'ui-text-surface-solid ui-text-base/6 placeholder:ui-text-zinc-500 sm:ui-text-sm/6',

            // Border
            'ui-border-surface-solid/10 data-[hover]:ui-border-surface-solid/20',

            // Background color
            'ui-bg-surface-solid/5',

            // Hide default focus styles
            'focus:ui-outline-none',

            // Invalid state
            'data-[invalid]:ui-border-red-500 data-[invalid]:data-[hover]:ui-border-red-500',

            // Disabled state
            'data-[disabled]:ui-border-surface-solid/15 data-[hover]:data-[disabled]:ui-border-surface-solid/15 data-[disabled]:ui-bg-surface-solid/[2.5%]',
          ])}
          {...props}
        />
      </span>
    )
  },
)
