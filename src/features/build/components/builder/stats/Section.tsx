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
      <h3 className="text-secondary-500 col-span-full my-2 text-xs font-semibold">
        Total:{' '}
        <span className="text-secondary-400 text-sm font-bold">
          {total.toFixed(2)}
          {isPercent && '%'}
        </span>
      </h3>
    </>
  )
}
