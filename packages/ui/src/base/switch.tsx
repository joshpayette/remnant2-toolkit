import {
  Field as HeadlessField,
  type FieldProps as HeadlessFieldProps,
  Switch as HeadlessSwitch,
  type SwitchProps as HeadlessSwitchProps,
} from '@headlessui/react'
import { clsx } from 'clsx'
import type React from 'react'

export function BaseSwitchGroup({
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
        'ui-space-y-3 [&_[data-slot=label]]:ui-font-normal',

        // With descriptions
        'has-[[data-slot=description]]:ui-space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:ui-font-medium',
      )}
    />
  )
}

export function BaseSwitchField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      data-slot="field"
      {...props}
      className={clsx(
        className,

        // Base layout
        'ui-grid ui-grid-cols-[1fr_auto] ui-items-center ui-gap-x-8 ui-gap-y-1 sm:ui-grid-cols-[1fr_auto]',

        // Control layout
        '[&>[data-slot=control]]:ui-col-start-2 [&>[data-slot=control]]:ui-self-center',

        // Label layout
        '[&>[data-slot=label]]:ui-col-start-1 [&>[data-slot=label]]:ui-row-start-1 [&>[data-slot=label]]:ui-justify-self-start',

        // Description layout
        '[&>[data-slot=description]]:ui-col-start-1 [&>[data-slot=description]]:ui-row-start-2',

        // With description
        '[&_[data-slot=label]]:has-[[data-slot=description]]:ui-font-medium',
      )}
    />
  )
}

const colors = {
  'dark/zinc': [
    '[--switch-bg:theme(colors.surface.solid/25%)] [--switch-bg-ring:transparent]',
    '[--switch-ring:theme(colors.zinc.700/90%)] [--switch-shadow:theme(colors.background.solid/10%)] [--switch:white]',
  ],
  'dark/white': [
    '[--switch-bg:theme(colors.surface.solid)] [--switch-bg-ring:transparent]',
    '[--switch-ring:theme(colors.zinc.900)] [--switch-shadow:theme(colors.background.solid/10%)] [--switch:white] [--switch-ring:transparent]',
  ],
  dark: [
    '[--switch-bg:theme(colors.zinc.900)] [--switch-bg-ring:theme(colors.surface.solid/15%)]',
    '[--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.background.solid/10%)] [--switch:white]',
  ],
  zinc: [
    '[--switch-bg:theme(colors.zinc.600)] [--switch-bg-ring:transparent]',
    '[--switch-shadow:theme(colors.background.solid/10%)] [--switch:white] [--switch-ring:theme(colors.zinc.700/90%)]',
  ],
  white: [
    '[--switch-bg:white] [--switch-bg-ring:transparent]',
    '[--switch-shadow:theme(colors.background.solid/10%)] [--switch-ring:transparent] [--switch:theme(colors.zinc.950)]',
  ],
  red: [
    '[--switch-bg:theme(colors.red.600)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.red.700/90%)] [--switch-shadow:theme(colors.red.900/20%)]',
  ],
  orange: [
    '[--switch-bg:theme(colors.orange.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.orange.600/90%)] [--switch-shadow:theme(colors.orange.900/20%)]',
  ],
  amber: [
    '[--switch-bg:theme(colors.amber.400)] [--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.amber.950)]',
  ],
  yellow: [
    '[--switch-bg:theme(colors.yellow.300)] [--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.yellow.950)]',
  ],
  lime: [
    '[--switch-bg:theme(colors.lime.300)] [--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.lime.950)]',
  ],
  green: [
    '[--switch-bg:theme(colors.green.600)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.green.700/90%)] [--switch-shadow:theme(colors.green.900/20%)]',
  ],
  emerald: [
    '[--switch-bg:theme(colors.emerald.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.emerald.600/90%)] [--switch-shadow:theme(colors.emerald.900/20%)]',
  ],
  teal: [
    '[--switch-bg:theme(colors.teal.600)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.teal.700/90%)] [--switch-shadow:theme(colors.teal.900/20%)]',
  ],
  cyan: [
    '[--switch-bg:theme(colors.cyan.300)] [--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.cyan.950)]',
  ],
  sky: [
    '[--switch-bg:theme(colors.sky.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.sky.600/80%)] [--switch-shadow:theme(colors.sky.900/20%)]',
  ],
  blue: [
    '[--switch-bg:theme(colors.blue.600)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.blue.700/90%)] [--switch-shadow:theme(colors.blue.900/20%)]',
  ],
  indigo: [
    '[--switch-bg:theme(colors.indigo.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.indigo.600/90%)] [--switch-shadow:theme(colors.indigo.900/20%)]',
  ],
  violet: [
    '[--switch-bg:theme(colors.violet.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.violet.600/90%)] [--switch-shadow:theme(colors.violet.900/20%)]',
  ],
  purple: [
    '[--switch-bg:theme(colors.purple.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.purple.600/90%)] [--switch-shadow:theme(colors.purple.900/20%)]',
  ],
  fuchsia: [
    '[--switch-bg:theme(colors.fuchsia.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.fuchsia.600/90%)] [--switch-shadow:theme(colors.fuchsia.900/20%)]',
  ],
  pink: [
    '[--switch-bg:theme(colors.pink.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.pink.600/90%)] [--switch-shadow:theme(colors.pink.900/20%)]',
  ],
  rose: [
    '[--switch-bg:theme(colors.rose.500)] [--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.rose.600/90%)] [--switch-shadow:theme(colors.rose.900/20%)]',
  ],
}

type Color = keyof typeof colors

export function BaseSwitch({
  color = 'dark/zinc',
  className,
  children: _children,
  ...props
}: {
  color?: Color
  className?: string
  children?: React.ReactNode
} & Omit<HeadlessSwitchProps, 'children'>) {
  return (
    <HeadlessSwitch
      data-slot="control"
      className={clsx(
        className,

        // Base styles
        'ui-group ui-relative ui-isolate ui-inline-flex ui-h-6 ui-w-10 ui-cursor-default ui-rounded-full ui-p-[3px] sm:ui-h-5 sm:ui-w-8',

        // Transitions
        'ui-transition ui-duration-0 ui-ease-in-out data-[changing]:ui-duration-200',

        // Outline and background color in forced-colors mode so switch is still visible
        'forced-colors:ui-outline forced-colors:ui-[--switch-bg:Highlight]',

        // Unchecked
        'ui-bg-surface-solid/5 ui-ring-surface-solid/15 ui-ring-1 ui-ring-inset',

        // Checked
        'data-[checked]:ui-bg-[--switch-bg] data-[checked]:ui-ring-[--switch-bg-ring]',

        // Focus
        'focus:ui-outline-none data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500 data-[focus]:outline',

        // Hover
        'data-[hover]:ui-ring-surface-solid/25 data-[hover]:data-[checked]:ui-ring-[--switch-bg-ring]',

        // Disabled
        'data-[disabled]:ui-bg-surface-solid/15 data-[disabled]:data-[checked]:ui-bg-surface-solid/15 data-[disabled]:data-[checked]:ui-ring-surface-solid/15 data-[disabled]:ui-opacity-50',

        // Color specific styles
        colors[color],
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={clsx(
          // Basic layout
          'ui-size-[1.125rem] sm:ui-size-3.5 ui-pointer-events-none ui-relative ui-inline-block ui-rounded-full',

          // Transition
          'ui-translate-x-0 ui-transition ui-duration-200 ui-ease-in-out',

          // Invisible border so the switch is still visible in forced-colors mode
          'ui-border ui-border-transparent',

          // Unchecked
          'ui-bg-surface-solid ui-ring-background-solid/5 ui-shadow ui-ring-1',

          // Checked
          'group-data-[checked]:ui-bg-[--switch] group-data-[checked]:ui-shadow-[--switch-shadow] group-data-[checked]:ui-ring-[--switch-ring]',
          'group-data-[checked]:ui-translate-x-4 sm:group-data-[checked]:ui-translate-x-3',

          // Disabled
          'group-data-[disabled]:group-data-[checked]:ui-bg-surface-solid group-data-[disabled]:group-data-[checked]:ui-ring-background-solid/5 group-data-[disabled]:group-data-[checked]:ui-shadow',
        )}
      />
    </HeadlessSwitch>
  )
}
