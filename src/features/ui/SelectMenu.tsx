import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string
  options: Array<{ label: string; value: string }>
}

export default function SelectMenu({
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
          className="block text-sm font-bold text-green-500"
        >
          {label}
        </label>
      )}
      <select
        id={id ?? name}
        name={name}
        className="mt-2 block w-full rounded-md border border-purple-600 bg-black py-1.5 pl-3 pr-10 font-sans text-sm font-normal text-gray-300 ring-1 ring-inset ring-purple-600 focus:ring-2 focus:ring-purple-600 sm:leading-6"
        defaultValue={defaultValue}
        value={value}
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
