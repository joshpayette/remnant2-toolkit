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
          'relative block w-full',

          // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
          'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-surface-solid before:shadow',

          // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
          'before:hidden',

          // Focus ring
          'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500',

          // Disabled state
          'has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none',

          // Invalid state
          'before:has-[[data-invalid]]:shadow-red-500/10',
        ])}
      >
        <HeadlessInput
          ref={ref}
          className={clsx([
            // Date classes
            props.type &&
              dateTypes.includes(props.type) && [
                '[&::-webkit-datetime-edit-fields-wrapper]:p-0',
                '[&::-webkit-date-and-time-value]:min-h-[1.5em]',
                '[&::-webkit-datetime-edit]:inline-flex',
                '[&::-webkit-datetime-edit]:p-0',
                '[&::-webkit-datetime-edit-year-field]:p-0',
                '[&::-webkit-datetime-edit-month-field]:p-0',
                '[&::-webkit-datetime-edit-day-field]:p-0',
                '[&::-webkit-datetime-edit-hour-field]:p-0',
                '[&::-webkit-datetime-edit-minute-field]:p-0',
                '[&::-webkit-datetime-edit-second-field]:p-0',
                '[&::-webkit-datetime-edit-millisecond-field]:p-0',
                '[&::-webkit-datetime-edit-meridiem-field]:p-0',
              ],

            // Basic layout
            'relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',

            // Typography
            'text-base/6 text-surface-solid placeholder:text-zinc-500 sm:text-sm/6',

            // Border
            'border-surface-solid/10 data-[hover]:border-surface-solid/20',

            // Background color
            'bg-surface-solid/5',

            // Hide default focus styles
            'focus:outline-none',

            // Invalid state
            'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500',

            // Disabled state
            'data-[disabled]:border-surface-solid/15 data-[hover]:data-[disabled]:border-surface-solid/15 data-[disabled]:bg-surface-solid/[2.5%]',
          ])}
          {...props}
        />
      </span>
    )
  },
)
