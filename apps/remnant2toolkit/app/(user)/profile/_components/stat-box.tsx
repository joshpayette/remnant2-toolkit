import { cn } from '@repo/ui';

interface Props {
  stat: { name: string; value: number; unit?: string };
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export function StatBox({ stat, icon, footer }: Props) {
  return (
    <div
      key={stat.name}
      className={cn(
        'border-surface-solid/5 flex flex-col items-center justify-between border px-4 py-6 sm:px-6',
      )}
    >
      <div className="">{icon ?? null}</div>
      <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
      <p className="mt-2 flex items-baseline justify-center gap-x-2">
        <span className="text-surface-solid text-4xl font-semibold tracking-tight">
          {stat.value}
        </span>
        {stat.unit ? (
          <span className="flex items-center justify-center text-sm text-gray-400">
            {stat.unit}
          </span>
        ) : null}
      </p>
      {footer ?? null}
    </div>
  );
}
