import SelectMenu from '@/features/ui/SelectMenu'

interface Props {
  filter: string
  onFilterChange: (newFilters: string) => void
  options: string[]
  label?: string
}

export default function BuildListFilters({
  filter,
  onFilterChange,
  label,
  options,
}: Props) {
  return (
    <SelectMenu
      label={label}
      value={filter}
      options={options.map((option) => ({ label: option, value: option }))}
      onChange={(e) => onFilterChange(e.target.value)}
    />
  )
}
