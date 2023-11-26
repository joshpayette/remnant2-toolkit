interface FilterCheckboxProps {
  id: string
  label: string
  checked?: HTMLInputElement['checked']
  onClick: () => void
}

export default function FilterCheckbox({
  id,
  label,
  checked,
  onClick,
}: FilterCheckboxProps) {
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
          className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-600"
          checked={checked}
          onClick={onClick}
        />
      </div>
    </div>
  )
}
