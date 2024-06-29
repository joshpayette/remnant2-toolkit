import {
  Field as HeadlessField,
  type FieldProps as HeadlessFieldProps,
  Radio as HeadlessRadio,
  RadioGroup as HeadlessRadioGroup,
  type RadioGroupProps as HeadlessRadioGroupProps,
  type RadioProps as HeadlessRadioProps,
} from '@headlessui/react'
import { clsx } from 'clsx'

export function BaseRadioGroup({
  className,
  ...props
}: HeadlessRadioGroupProps) {
  return (
    <HeadlessRadioGroup
      data-slot="control"
      {...props}
      className={clsx(
        className,

        // Basic groups
        'ui-space-y-3 [&_[data-slot=label]]:ui-font-normal',

        // With descriptions
        'has-[[data-slot=description]]:ui-space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:ui-font-medium',
      )}
    />
  )
}

export function BaseRadioField({ className, ...props }: HeadlessFieldProps) {
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
  'ui-relative ui-isolate ui-flex ui-size-[1.1875rem] ui-shrink-0 ui-rounded-full sm:ui-size-[1.0625rem]',

  // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
  'before:ui-absolute before:ui-inset-0 before:-ui-z-10 before:ui-rounded-full before:ui-bg-surface-solid before:ui-shadow',

  // Background color when checked
  'before:group-data-[checked]:ui-bg-[--radio-checked-bg]',

  // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  'before:ui-hidden',

  // Background color applied to control in dark mode
  'ui-bg-surface-solid/5 group-data-[checked]:ui-bg-[--radio-checked-bg]',

  // Border
  'ui-border ui-border-surface-solid/15 group-data-[checked]:ui-border-surface-solid/5 group-data-[checked]:group-data-[hover]:ui-border-surface-solid/5 group-data-[hover]:ui-border-surface-solid/30 group-data-[checked]:ui-bg-[--radio-checked-border]',

  // Inner highlight shadow
  'after:ui-absolute after:-ui-inset-px after:ui-hidden after:ui-rounded-full group-data-[checked]:after:ui-block after:ui-shadow-[inset_0_1px_theme(colors.surface.solid/15%)]',

  // Indicator color
  'group-data-[checked]:group-data-[hover]:[--radio-indicator:var(--radio-checked-indicator)] group-data-[hover]:[--radio-indicator:theme(colors.zinc.700)]',

  // Focus ring
  'group-data-[focus]:ui-outline group-data-[focus]:ui-outline-2 group-data-[focus]:ui-outline-offset-2 group-data-[focus]:ui-outline-blue-500',

  // Disabled state
  'group-data-[disabled]:ui-opacity-50',
  'group-data-[disabled]:ui-border-surface-solid/20 group-data-[disabled]:ui-bg-surface-solid/[2.5%] group-data-[disabled]:[--radio-checked-indicator:theme(colors.surface.solid/50%)] group-data-[disabled]:before:ui-bg-transparent group-data-[disabled]:group-data-[checked]:after:ui-hidden',
]

const colors = {
  'dark/zinc': [
    '[--radio-checked-bg:theme(colors.zinc.600)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:theme(colors.surface.solid)]',
  ],
  'dark/white': [
    '[--radio-checked-bg:theme(colors.surface.solid)] [--radio-checked-border:theme(colors.zinc.950/15%)] [--radio-checked-indicator:theme(colors.zinc.900)]',
  ],
  white:
    '[--radio-checked-bg:theme(colors.surface.solid)] [--radio-checked-border:theme(colors.zinc.950/15%)] [--radio-checked-indicator:theme(colors.zinc.900)]',
  dark: '[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:theme(colors.surface.solid)]',
  zinc: '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.zinc.600)] [--radio-checked-border:theme(colors.zinc.700/90%)]',
  red: '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.red.600)] [--radio-checked-border:theme(colors.red.700/90%)]',
  orange:
    '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.orange.500)] [--radio-checked-border:theme(colors.orange.600/90%)]',
  amber:
    '[--radio-checked-bg:theme(colors.amber.400)] [--radio-checked-border:theme(colors.amber.500/80%)] [--radio-checked-indicator:theme(colors.amber.950)]',
  yellow:
    '[--radio-checked-bg:theme(colors.yellow.300)] [--radio-checked-border:theme(colors.yellow.400/80%)] [--radio-checked-indicator:theme(colors.yellow.950)]',
  lime: '[--radio-checked-bg:theme(colors.lime.300)] [--radio-checked-border:theme(colors.lime.400/80%)] [--radio-checked-indicator:theme(colors.lime.950)]',
  green:
    '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.green.600)] [--radio-checked-border:theme(colors.green.700/90%)]',
  emerald:
    '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.emerald.600)] [--radio-checked-border:theme(colors.emerald.700/90%)]',
  teal: '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.teal.600)] [--radio-checked-border:theme(colors.teal.700/90%)]',
  cyan: '[--radio-checked-bg:theme(colors.cyan.300)] [--radio-checked-border:theme(colors.cyan.400/80%)] [--radio-checked-indicator:theme(colors.cyan.950)]',
  sky: '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.sky.500)] [--radio-checked-border:theme(colors.sky.600/80%)]',
  blue: '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.blue.600)] [--radio-checked-border:theme(colors.blue.700/90%)]',
  indigo:
    '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.indigo.500)] [--radio-checked-border:theme(colors.indigo.600/90%)]',
  violet:
    '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.violet.500)] [--radio-checked-border:theme(colors.violet.600/90%)]',
  purple:
    '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.purple.500)] [--radio-checked-border:theme(colors.purple.600/90%)]',
  fuchsia:
    '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.fuchsia.500)] [--radio-checked-border:theme(colors.fuchsia.600/90%)]',
  pink: '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.pink.500)] [--radio-checked-border:theme(colors.pink.600/90%)]',
  rose: '[--radio-checked-indicator:theme(colors.surface.solid)] [--radio-checked-bg:theme(colors.rose.500)] [--radio-checked-border:theme(colors.rose.600/90%)]',
}

type Color = keyof typeof colors

export function BaseRadio({
  color = 'dark/zinc',
  className,
  ...props
}: { color?: Color; className?: string } & HeadlessRadioProps) {
  return (
    <HeadlessRadio
      data-slot="control"
      {...props}
      className={clsx(
        className,
        'ui-group ui-inline-flex focus:ui-outline-none',
      )}
    >
      <span className={clsx([base, colors[color]])}>
        <span
          className={clsx(
            'ui-size-full ui-rounded-full ui-border-[4.5px] ui-border-transparent ui-bg-[--radio-indicator] ui-bg-clip-padding',

            // Forced colors mode
            'forced-colors:ui-border-[Canvas] forced-colors:group-data-[checked]:ui-border-[Highlight]',
          )}
        />
      </span>
    </HeadlessRadio>
  )
}
