interface Props {
  onClick: () => void
}

export function ClearFiltersButton({ onClick }: Props) {
  return (
    <button
      className="flex w-auto items-center justify-center gap-1 rounded-md border border-red-500 p-2 text-sm font-bold text-white drop-shadow-md hover:bg-red-500"
      aria-label="Clear Filters"
      onClick={onClick}
    >
      Clear Filters
    </button>
  )
}
