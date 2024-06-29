import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from '@headlessui/react'
import { TouchTarget } from '@repo/ui/base/button'
import { Link } from '@repo/ui/base/link'
import React from 'react'

import { cn } from '../classnames'

const colors = {
  red: 'ui-bg-red-500/15 ui-text-red-700 group-data-[hover]:ui-bg-red-500/25 dark:ui-bg-red-500/10 dark:ui-text-red-400 dark:group-data-[hover]:ui-bg-red-500/20',
  orange:
    'ui-bg-orange-500/15 ui-text-orange-700 group-data-[hover]:ui-bg-orange-500/25 dark:ui-bg-orange-500/10 dark:ui-text-orange-400 dark:group-data-[hover]:ui-bg-orange-500/20',
  amber:
    'ui-bg-amber-400/20 ui-text-amber-700 group-data-[hover]:ui-bg-amber-400/30 dark:ui-bg-amber-400/10 dark:ui-text-amber-400 dark:group-data-[hover]:ui-bg-amber-400/15',
  yellow:
    'ui-bg-accent1-400/20 ui-text-accent1-700 group-data-[hover]:ui-bg-accent1-400/30 dark:ui-bg-accent1-400/10 dark:ui-text-accent1-300 dark:group-data-[hover]:ui-bg-accent1-400/15',
  lime: 'ui-bg-lime-400/20 ui-text-lime-700 group-data-[hover]:ui-bg-lime-400/30 dark:ui-bg-lime-400/10 dark:ui-text-lime-300 dark:group-data-[hover]:ui-bg-lime-400/15',
  green:
    'ui-bg-green-500/15 ui-text-green-700 group-data-[hover]:ui-bg-green-500/25 dark:ui-bg-green-500/10 dark:ui-text-green-400 dark:group-data-[hover]:ui-bg-green-500/20',
  emerald:
    'ui-bg-emerald-500/15 ui-text-emerald-700 group-data-[hover]:ui-bg-emerald-500/25 dark:ui-bg-emerald-500/10 dark:ui-text-emerald-400 dark:group-data-[hover]:ui-bg-emerald-500/20',
  teal: 'ui-bg-teal-500/15 ui-text-teal-700 group-data-[hover]:ui-bg-teal-500/25 dark:ui-bg-teal-500/10 dark:ui-text-teal-300 dark:group-data-[hover]:ui-bg-teal-500/20',
  cyan: 'ui-bg-primary-400/20 ui-text-primary-700 group-data-[hover]:ui-bg-primary-400/30 dark:ui-bg-primary-400/10 dark:ui-text-primary-300 dark:group-data-[hover]:ui-bg-primary-400/15',
  sky: 'ui-bg-sky-500/15 ui-text-sky-700 group-data-[hover]:ui-bg-sky-500/25 dark:ui-bg-sky-500/10 dark:ui-text-sky-300 dark:group-data-[hover]:ui-bg-sky-500/20',
  blue: 'ui-bg-blue-500/15 ui-text-blue-700 group-data-[hover]:ui-bg-blue-500/25 dark:ui-text-blue-400 dark:group-data-[hover]:ui-bg-blue-500/25',
  indigo:
    'ui-bg-indigo-500/15 ui-text-indigo-700 group-data-[hover]:ui-bg-indigo-500/25 dark:ui-text-indigo-400 dark:group-data-[hover]:ui-bg-indigo-500/20',
  violet:
    'ui-bg-secondary-500/15 ui-text-secondary-700 group-data-[hover]:ui-bg-secondary-500/25 dark:ui-text-secondary-400 dark:group-data-[hover]:ui-bg-secondary-500/20',
  purple:
    'ui-bg-purple-500/15 ui-text-purple-700 group-data-[hover]:ui-bg-purple-500/25 dark:ui-text-purple-400 dark:group-data-[hover]:ui-bg-purple-500/20',
  fuchsia:
    'ui-bg-fuchsia-400/15 ui-text-fuchsia-700 group-data-[hover]:ui-bg-fuchsia-400/25 dark:ui-bg-fuchsia-400/10 dark:ui-text-fuchsia-400 dark:group-data-[hover]:ui-bg-fuchsia-400/20',
  pink: 'ui-bg-pink-400/15 ui-text-pink-700 group-data-[hover]:ui-bg-pink-400/25 dark:ui-bg-pink-400/10 dark:ui-text-pink-400 dark:group-data-[hover]:ui-bg-pink-400/20',
  rose: 'ui-bg-rose-400/15 ui-text-rose-700 group-data-[hover]:ui-bg-rose-400/25 dark:ui-bg-rose-400/10 dark:ui-text-rose-400 dark:group-data-[hover]:ui-bg-rose-400/20',
  zinc: 'ui-bg-zinc-600/10 ui-text-zinc-700 group-data-[hover]:ui-bg-zinc-600/20 dark:ui-bg-surface-solid/5 dark:ui-text-zinc-400 dark:group-data-[hover]:ui-bg-surface-solid/10',
}

type BadgeProps = { color?: keyof typeof colors }

export function BaseBadge({
  color = 'zinc',
  className,
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={cn(
        className,
        'forced-colors:ui-outline ui-inline-flex ui-items-center ui-gap-x-1.5 ui-rounded-md ui-px-1.5 ui-py-0.5 ui-text-sm/5 ui-font-medium sm:ui-text-xs/5',
        colors[color],
      )}
    />
  )
}

export const BaseBadgeButton = React.forwardRef(function BadgeButton(
  {
    color = 'zinc',
    className,
    children,
    ...props
  }: BadgeProps & { children: React.ReactNode } & (
      | HeadlessButtonProps
      | React.ComponentPropsWithoutRef<typeof Link>
    ),
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classes = cn(
    className,
    'ui-group ui-relative ui-inline-flex ui-rounded-md focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
  )

  return 'href' in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>
        <BaseBadge color={color}>{children}</BaseBadge>
      </TouchTarget>
    </Link>
  ) : (
    <HeadlessButton {...props} className={classes} ref={ref}>
      <TouchTarget>
        <BaseBadge color={color}>{children}</BaseBadge>
      </TouchTarget>
    </HeadlessButton>
  )
})
