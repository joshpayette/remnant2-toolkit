import { cn } from '@/app/(utils)/classnames'

interface Props {
  stat: { name: string; value: number; unit?: string }
  index: number
  footer?: React.ReactNode
}

export function StatBox({ stat, index, footer }: Props) {
  return (
    <div
      key={stat.name}
      className={cn(
        index % 2 === 1
          ? 'sm:border-l'
          : index === 2 || index === 4
            ? 'sm:border-l'
            : '',
        'flex flex-col items-center justify-between border-t border-on-background/5 px-4 py-6 sm:px-6',
      )}
    >
      <p className="text-sm font-medium leading-6 text-on-background-variant">{stat.name}</p>
      <p className="mt-2 flex items-baseline justify-center gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-on-background">
          {stat.value}
        </span>
        {stat.unit ? (
          <span className="flex items-center justify-center text-sm text-on-background-variant">
            {stat.unit}
          </span>
        ) : null}
      </p>
      {footer ?? null}
    </div>
  )
}
