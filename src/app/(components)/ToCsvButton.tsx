import { toCsv } from '@/app/(lib)/utils'

interface ToCsvProps {
  data: any[]
  filename: string
  label?: string
}

export default function ToCsvButton({
  data,
  filename,
  label = 'Export All Data to CSV',
}: ToCsvProps) {
  if (!data || data.length === 0) return null

  return (
    <button
      className="flex flex-col items-center justify-center rounded border-2 border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
      onClick={() => toCsv(data, filename)}
    >
      {label}
    </button>
  )
}
