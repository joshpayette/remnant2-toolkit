interface Props {
  checked: boolean
  label: string
  name: string
  onChange: () => void
}

export function Checkbox({ checked, label, name, onChange }: Props) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={`${name}`}
          aria-describedby={`${name}-description`}
          name={`${name}`}
          type="checkbox"
          className="h-4 w-4 rounded border-secondary-600 bg-background-solid text-secondary-600 focus:ring-secondary-600"
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={`${name}`} className="font-medium text-gray-300">
          {label}
        </label>
      </div>
    </div>
  )
}
