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
      <h3 className="text-md col-span-full my-2 font-semibold text-surface-solid">
        Total:{' '}
        <span className="text-md font-bold text-surface-solid">
          {total.toFixed(2)}
          {isPercent && '%'}
        </span>
      </h3>
    </>
  )
}
