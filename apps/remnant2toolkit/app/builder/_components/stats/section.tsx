import { type ReactNode } from 'react';

export function Section({
  listItems,
  total,
  isPercent = false,
}: {
  listItems: ReactNode;
  total: number;
  totalLabel?: string;
  isPercent?: boolean;
}) {
  return (
    <>
      <ul className="ml-8 list-disc">{listItems}</ul>
      <h3 className="text-md text-surface-solid col-span-full my-2 font-semibold">
        Total:{' '}
        <span className="text-md text-surface-solid font-bold">
          {total.toFixed(2)}
          {isPercent && '%'}
        </span>
      </h3>
    </>
  );
}
