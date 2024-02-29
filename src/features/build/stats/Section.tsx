import { ReactNode } from 'react'

export function Section({
  listItems,
  total,
  isPercent = false,
}: {
  listItems: ReactNode
  total: number
  totalLabel?: string
  isPercent?: boolean
}) {
  return (
    <>
      <ul className="ml-8 list-disc">{listItems}</ul>
      <h3 className="col-span-full my-2 text-xs font-semibold text-purple-500">
        Total:{' '}
        <span className="text-sm font-bold text-purple-400">
          {total.toFixed(2)}
          {isPercent && '%'}
        </span>
      </h3>
    </>
  )
}
