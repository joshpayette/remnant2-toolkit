import { clsx } from 'clsx'

import { Link } from './link'

export function BaseText({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      {...props}
      data-slot="text"
      className={clsx(className, 'text-base/6 text-white sm:text-sm/6')}
    />
  )
}

export function BaseTextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        'text-surface-solid underline decoration-surface-solid/50 data-[hover]:decoration-surface-solid',
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
      className={clsx(className, 'font-medium text-surface-solid')}
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
      className={clsx(
        className,
        'rounded border border-surface-solid/20 bg-surface-solid/5 px-0.5 text-sm font-medium text-surface-solid sm:text-[0.8125rem]',
      )}
    />
  )
}
