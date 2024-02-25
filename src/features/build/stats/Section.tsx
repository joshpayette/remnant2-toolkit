import { ReactNode } from 'react'

export function Section({
  label,
  totalLabel = 'Total Increase',
  listItems,
  total,
  isPercent = false,
}: {
  label: string
  listItems: ReactNode
  total: number
  totalLabel?: string
  isPercent?: boolean
}) {
  return (
    <>
      <h2 className="col-span-full my-2 font-semibold underline">{label}</h2>
      <ul className="ml-8 list-disc">{listItems}</ul>
      <h3 className="col-span-full my-2 text-xs font-semibold text-purple-500">
        {totalLabel}:{` `}
        <span className="text-sm font-bold text-purple-400">
          {total.toFixed(2)}
          {isPercent && '%'}
        </span>
      </h3>
    </>
  )
}
