import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string
  options: Array<{ label: string; value: string }>
}

export function SelectMenu({
  label,
  name,
  options,
  id,
  defaultValue,
  value,
  ...rest
}: Props) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-primary-500 block text-sm font-bold"
        >
          {label}
        </label>
      )}
      <select
        id={id ?? name}
        name={name}
        className="border-secondary-500 ring-secondary-600 focus:ring-secondary-600 mt-2 block w-full rounded-md border bg-black py-1.5 pl-3 pr-10 font-sans text-sm font-normal text-gray-300 ring-1 ring-inset focus:ring-2 sm:leading-6"
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
