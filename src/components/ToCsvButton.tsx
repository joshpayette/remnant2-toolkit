import { toCsv } from '@/lib/utils'

interface ToCsvProps {
  data: any[]
  filename: string
}

export default function ToCsvButton({ data, filename }: ToCsvProps) {
  function handleClick() {
    toCsv(data, filename)
  }

  return (
    <button
      className="button rounded bg-purple-700 p-2 text-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      onClick={handleClick}
    >
      Export to CSV
    </button>
  )
}
