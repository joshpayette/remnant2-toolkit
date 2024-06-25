import { Link } from '@repo/ui/base/link'
import { clsx } from 'clsx'

export function BaseText({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      {...props}
      data-slot="text"
      className={clsx(className, 'text-surface-solid text-base/6 sm:text-sm/6')}
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
        'text-surface-solid decoration-surface-solid/50 data-[hover]:decoration-surface-solid underline',
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
      className={clsx(className, 'text-surface-solid font-medium')}
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
        'border-surface-solid/20 bg-surface-solid/5 text-surface-solid rounded border px-0.5 text-sm font-medium sm:text-[0.8125rem]',
      )}
    />
  )
}
