'use client'

import { BugAntIcon } from '@heroicons/react/24/solid'
import { ReportBug } from '../app/actions'
import { toast } from 'react-toastify'

export default function ReportBugButton() {
  return (
    <div className="flex items-center justify-start">
      <button
        className="flex w-auto items-center justify-center gap-1 rounded-md border-2 border-black bg-cyan-500 p-2 text-sm font-bold text-black drop-shadow-lg hover:border-cyan-300"
        onClick={async () => {
          const report = prompt('Please describe the bug')
          if (report) {
            const { message } = await ReportBug(report)
            toast.success(message)
          }
        }}
      >
        <BugAntIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
