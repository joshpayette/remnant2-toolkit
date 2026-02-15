import { BaseLink } from '../link';
import { cn } from '../../utils/classnames';

export function BaseText({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      {...props}
      className={cn(
        className,
        'text-surface-solid text-base/6 sm:text-sm/6',
      )}
      data-slot="text"
    />
  );
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
        'text-surface-solid decoration-surface-solid/50 data-[hover]:decoration-surface-solid underline',
      )}
    />
  );
}

export function BaseStrong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'strong'>) {
  return (
    <strong
      {...props}
      className={cn(className, 'text-surface-solid font-medium')}
    />
  );
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
        'border-surface-solid/20 bg-surface-solid/5 text-surface-solid rounded border px-0.5 text-sm font-medium sm:text-[0.8125rem]',
      )}
    />
  );
}
