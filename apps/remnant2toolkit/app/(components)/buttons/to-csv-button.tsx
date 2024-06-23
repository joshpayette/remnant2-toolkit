import { BaseButton } from '@/app/(components)/_base/button'

/**
 * Converts an array of objects to a CSV file and starts the download
 */
export function toCsv<T extends object>(data: T[], filename: string) {
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
  data: object[]
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
    <BaseButton
      outline
      aria-label="Export All Data to CSV"
      onClick={() => toCsv(data, filename)}
      className="sm:w-full"
    >
      {label}
    </BaseButton>
  )
}
