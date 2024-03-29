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
          className="block text-sm font-bold text-primary-500"
        >
          {label}
        </label>
      )}
      <select
        id={id ?? name}
        name={name}
        className="mt-2 block w-full rounded-md border border-secondary-500 bg-black py-1.5 pl-3 pr-10 font-sans text-sm font-normal text-gray-300 ring-1 ring-inset ring-secondary-600 focus:ring-2 focus:ring-secondary-600 sm:leading-6"
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
