import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/classnames'

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string
  showLabel?: boolean
  options: Array<{ label: string; value: string }>
}

export function SelectMenu({
  label,
  showLabel = true,
  name,
  options,
  id,
  defaultValue,
  value,
  ...rest
}: Props) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={cn(
          'block text-sm font-bold text-primary-500',
          !showLabel && 'sr-only',
        )}
      >
        {label}
      </label>

      <select
        id={id ?? name}
        name={name}
        className="mt-2 block w-full rounded-md border border-secondary-500 bg-black py-2 pl-3 pr-10 font-sans text-sm font-normal text-gray-300 ring-1 ring-inset ring-secondary-600 focus:ring-2 focus:ring-secondary-600 sm:leading-6"
        defaultValue={defaultValue}
        value={value}
        aria-label={label ?? name}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
