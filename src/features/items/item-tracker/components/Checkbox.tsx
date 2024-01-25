import { type ChangeEventHandler } from 'react'

interface CheckboxProps {
  id: string
  label: string
  checked?: HTMLInputElement['checked']
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <div className="relative flex items-start py-4">
      <div className="min-w-0 flex-1 text-sm leading-6">
        <label htmlFor={id} className="select-none font-medium text-white">
          {label}
        </label>
      </div>
      <div className="ml-3 flex h-6 items-center">
        <input
          id={id}
          name={id}
          type="checkbox"
          className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-600"
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
