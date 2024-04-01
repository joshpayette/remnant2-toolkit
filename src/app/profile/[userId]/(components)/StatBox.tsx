import { cn } from '@/lib/classnames'

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
        'border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8',
      )}
    >
      <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-white">
          {stat.value}
        </span>
        {stat.unit ? (
          <span className="text-sm text-gray-400">{stat.unit}</span>
        ) : null}
      </p>
      {footer ?? null}
    </div>
  )
}
