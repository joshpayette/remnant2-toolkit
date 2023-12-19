import { toCsv } from '@/app/(lib)/utils'

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
      className="flex flex-col items-center justify-center rounded border border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
      onClick={handleClick}
    >
      Export to CSV
    </button>
  )
}
