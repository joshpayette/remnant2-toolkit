type Props = {
  autoFocus?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder?: string
}

export default function Input({
  autoFocus = true,
  onChange,
  value,
  placeholder = '',
}: Props) {
  return (
    <input
      type="text"
      onChange={onChange}
      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
      placeholder={placeholder}
      value={value}
      autoFocus={autoFocus}
    />
  )
}
