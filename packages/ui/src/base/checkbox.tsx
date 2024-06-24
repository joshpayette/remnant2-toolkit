import {
  Checkbox as HeadlessCheckbox,
  type CheckboxProps as HeadlessCheckboxProps,
  Field as HeadlessField,
  type FieldProps as HeadlessFieldProps,
} from '@headlessui/react'
import { clsx } from 'clsx'
import type React from 'react'

export function BaseCheckboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(
        className,

        // Basic groups
        'ui-space-y-1',

        // With descriptions
        'has-[[data-slot=description]]:ui-space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:ui-font-medium',
      )}
    />
  )
}

export function BaseCheckboxField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      data-slot="field"
      {...props}
      className={clsx(
        className,

        // Base layout
        'ui-grid ui-grid-cols-[1.125rem_1fr] ui-items-center ui-gap-x-4 ui-gap-y-1 sm:ui-grid-cols-[1rem_1fr]',

        // Control layout
        '[&>[data-slot=control]]:ui-col-start-1 [&>[data-slot=control]]:ui-row-start-1 [&>[data-slot=control]]:ui-justify-self-center',

        // Label layout
        '[&>[data-slot=label]]:ui-col-start-2 [&>[data-slot=label]]:ui-row-start-1 [&>[data-slot=label]]:ui-justify-self-start',

        // Description layout
        '[&>[data-slot=description]]:ui-col-start-2 [&>[data-slot=description]]:ui-row-start-2',

        // With description
        '[&_[data-slot=label]]:has-[[data-slot=description]]:ui-font-medium',
      )}
    />
  )
}

const base = [
  // Basic layout
  'ui-relative ui-isolate ui-flex ui-size-[1.125rem] ui-items-center ui-justify-center ui-rounded-[0.3125rem] sm:ui-size-4',

  // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
  'before:ui-absolute before:ui-inset-0 before:-ui-z-10 before:ui-rounded-[calc(0.3125rem-1px)] before:ui-bg-surface-solid before:ui-shadow',

  // Background color when checked
  'before:group-data-[checked]:ui-bg-[--checkbox-checked-bg]',

  // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  'before:ui-hidden',

  // Background color applied to control in dark mode
  'ui-bg-surface-solid/5 group-data-[checked]:ui-bg-[--checkbox-checked-bg]',

  // Border
  'ui-border ui-border-surface-solid/15 group-data-[checked]:ui-border-surface-solid/5 group-data-[checked]:group-data-[hover]:ui-border-surface-solid/5 group-data-[hover]:ui-border-surface-solid/30 ',

  // Inner highlight shadow
  'after:ui-absolute after:-ui-inset-px after:ui-hidden after:ui-rounded-[0.3125rem] group-data-[checked]:after:ui-block after:ui-shadow-[inset_0_1px_theme(colors.surface.solid/15%)]',

  // Focus ring
  'group-data-[focus]:ui-outline group-data-[focus]:ui-outline-2 group-data-[focus]:ui-outline-offset-2 group-data-[focus]:ui-outline-blue-500',

  // Disabled state
  'group-data-[disabled]:ui-opacity-50',
  'group-data-[disabled]:ui-border-surface-solid/20 group-data-[disabled]:ui-bg-surface-solid/[2.5%] group-data-[disabled]:[--checkbox-check:colors.surface.solid/50%)] group-data-[disabled]:group-data-[checked]:after:ui-hidden',

  // Forced colors mode
  'forced-colors:ui-[--checkbox-check:HighlightText] forced-colors:ui-[--checkbox-checked-bg:Highlight] forced-colors:group-data-[disabled]:ui-[--checkbox-check:Highlight]',
]

const colors = {
  'dark/zinc': [
    '[--checkbox-check:theme(colors.surface.solid)] [--checkbox-checked-bg:theme(colors.zinc.600)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]',
  ],
  'dark/white': [
    '[--checkbox-check:colors.zinc.900)] [--checkbox-checked-bg:colors.surface.solid)] [--checkbox-checked-border:colors.zinc.950/15%)]',
  ],
  white:
    '[--checkbox-check:colors.zinc.900)] [--checkbox-checked-bg:colors.surface.solid)] [--checkbox-checked-border:colors.zinc.950/15%)]',
  dark: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.zinc.900)] [--checkbox-checked-border:colors.zinc.950/90%)]',
  zinc: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.zinc.600)] [--checkbox-checked-border:colors.zinc.700/90%)]',
  red: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.red.600)] [--checkbox-checked-border:colors.red.700/90%)]',
  orange:
    '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.orange.500)] [--checkbox-checked-border:colors.orange.600/90%)]',
  amber:
    '[--checkbox-check:colors.amber.950)] [--checkbox-checked-bg:colors.amber.400)] [--checkbox-checked-border:colors.amber.500/80%)]',
  yellow:
    '[--checkbox-check:colors.yellow.950)] [--checkbox-checked-bg:colors.yellow.300)] [--checkbox-checked-border:colors.yellow.400/80%)]',
  lime: '[--checkbox-check:colors.lime.950)] [--checkbox-checked-bg:colors.lime.300)] [--checkbox-checked-border:colors.lime.400/80%)]',
  green:
    '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.green.600)] [--checkbox-checked-border:colors.green.700/90%)]',
  emerald:
    '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.emerald.600)] [--checkbox-checked-border:colors.emerald.700/90%)]',
  teal: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.teal.600)] [--checkbox-checked-border:colors.teal.700/90%)]',
  cyan: '[--checkbox-check:colors.cyan.950)] [--checkbox-checked-bg:colors.cyan.300)] [--checkbox-checked-border:colors.cyan.400/80%)]',
  sky: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.sky.500)] [--checkbox-checked-border:colors.sky.600/80%)]',
  blue: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.blue.600)] [--checkbox-checked-border:colors.blue.700/90%)]',
  indigo:
    '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.indigo.500)] [--checkbox-checked-border:colors.indigo.600/90%)]',
  violet:
    '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.violet.500)] [--checkbox-checked-border:colors.violet.600/90%)]',
  purple:
    '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.purple.500)] [--checkbox-checked-border:colors.purple.600/90%)]',
  fuchsia:
    '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.fuchsia.500)] [--checkbox-checked-border:colors.fuchsia.600/90%)]',
  pink: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.pink.500)] [--checkbox-checked-border:colors.pink.600/90%)]',
  rose: '[--checkbox-check:colors.surface.solid)] [--checkbox-checked-bg:colors.rose.500)] [--checkbox-checked-border:colors.rose.600/90%)]',
}

type Color = keyof typeof colors

export function BaseCheckbox({
  color = 'dark/zinc',
  className,
  ...props
}: {
  color?: Color
  className?: string
} & HeadlessCheckboxProps) {
  return (
    <HeadlessCheckbox
      data-slot="control"
      className={clsx(
        className,
        'ui-group ui-inline-flex focus:ui-outline-none',
      )}
      {...props}
    >
      <span className={clsx([base, colors[color]])}>
        <svg
          className="ui-size-4 ui-stroke-[--checkbox-check] ui-opacity-0 group-data-[checked]:ui-opacity-100 sm:ui-h-3.5 sm:ui-w-3.5"
          viewBox="0 0 14 14"
          fill="none"
        >
          {/* Checkmark icon */}
          <path
            className="ui-opacity-100 group-data-[indeterminate]:ui-opacity-0"
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Indeterminate icon */}
          <path
            className="ui-opacity-0 group-data-[indeterminate]:ui-opacity-100"
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </HeadlessCheckbox>
  )
}
