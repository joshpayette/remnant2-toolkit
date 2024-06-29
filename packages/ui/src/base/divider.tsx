import { cn } from '../classnames'

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
        'ui-w-full ui-border-t',
        soft && 'ui-border-zinc-950/5 dark:ui-border-white/5',
        !soft && 'ui-border-zinc-950/10 dark:ui-border-white/10',
      )}
    />
  )
}
