import { cn } from '../../utils/classnames';

export function BaseDivider({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      {...props}
      className={cn(
        className,
        'w-full border-t',
        soft && 'border-zinc-950/5 dark:border-white/5',
        !soft && 'border-zinc-950/10 dark:border-white/10',
      )}
    />
  );
}
