import { BaseLink } from '@repo/ui/base/link'

import { cn } from '../classnames'

export function BaseText({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      {...props}
      data-slot="text"
      className={cn(
        className,
        'ui-text-surface-solid ui-text-base/6 sm:ui-text-sm/6',
      )}
    />
  )
}

export function BaseTextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseLink>) {
  return (
    <BaseLink
      {...props}
      className={cn(
        className,
        'ui-text-surface-solid ui-decoration-surface-solid/50 data-[hover]:ui-decoration-surface-solid ui-underline',
      )}
    />
  )
}

export function BaseStrong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'strong'>) {
  return (
    <strong
      {...props}
      className={cn(className, 'ui-text-surface-solid ui-font-medium')}
    />
  )
}

export function BaseCode({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className={cn(
        className,
        'ui-border-surface-solid/20 ui-bg-surface-solid/5 ui-text-surface-solid ui-rounded ui-border ui-px-0.5 ui-text-sm ui-font-medium sm:ui-text-[0.8125rem]',
      )}
    />
  )
}
