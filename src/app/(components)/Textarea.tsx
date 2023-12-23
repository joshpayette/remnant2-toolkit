type TextAreaProps = {
  disabled?: boolean
  label: string
  maxLength?: number
  name: string
  placeholder: string
  rows?: number
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({
  disabled = false,
  label,
  maxLength = 64,
  name,
  placeholder,
  rows = 4,
  value,
  onChange,
}: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-green-500"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={rows}
          name={name}
          id={name}
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500"
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
