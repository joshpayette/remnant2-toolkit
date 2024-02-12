type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: () => void
  value: string
  placeholder?: string
  id?: string
}

export function Input({
  onChange,
  onKeyDown,
  value,
  placeholder = '',
  id,
}: Props) {
  return (
    <input
      id={id}
      type="text"
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onKeyDown) onKeyDown()
      }}
      className="block w-full rounded-md border-2 border-purple-500 bg-white/5 py-1 font-medium text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
      placeholder={placeholder}
      value={value}
    />
  )
}
