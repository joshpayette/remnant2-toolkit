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
      className={clsx(
        className,
        'text-base/6 text-zinc-500 dark:text-zinc-300 sm:text-sm/6',
      )}
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
        'text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white',
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
      className={clsx(className, 'font-medium text-zinc-950 dark:text-white')}
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
        'rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 dark:border-white/20 dark:bg-white/5 dark:text-white sm:text-[0.8125rem]',
      )}
    />
  )
}
