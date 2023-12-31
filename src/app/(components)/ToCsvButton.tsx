import { toCsv } from '@/app/(lib)/utils'

interface ToCsvProps {
  data: any[]
  filename: string
}

export default function ToCsvButton({ data, filename }: ToCsvProps) {
  if (!data || data.length === 0) return null

  return (
    <button
      className="flex flex-col items-center justify-center rounded border border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
      onClick={() => toCsv(data, filename)}
    >
      Export All Data to CSV
    </button>
  )
}
