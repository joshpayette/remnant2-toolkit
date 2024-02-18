/**
 * Converts an array of objects to a CSV file and starts the download
 */
export function toCsv<T extends {}>(data: T[], filename: string) {
  let csvContent = 'data:text/csv;charset=utf-8,'
  if (!data[0]) return []
  // Add header row with keys
  csvContent += Object.keys(data[0]).join(',') + '\n'
  // Add data rows with values
  csvContent += data
    .filter((item) => item !== undefined)
    .map((item) => Object.values(item).join(','))
    .join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `${filename}.csv`)
  document.body.appendChild(link) // Required for FF
  link.click()
}

interface ToCsvProps {
  data: any[]
  filename: string
  label?: string
}

export function ToCsvButton({
  data,
  filename,
  label = 'Export All Data to CSV',
}: ToCsvProps) {
  if (!data || data.length === 0) return null

  return (
    <button
      className="flex flex-col items-center justify-center rounded border-2 border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
      aria-label="Export All Data to CSV"
      onClick={() => toCsv(data, filename)}
    >
      {label}
    </button>
  )
}
