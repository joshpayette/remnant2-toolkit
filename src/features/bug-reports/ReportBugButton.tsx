'use client'

import { BugAntIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import { ReportBug } from './actions'

export function ReportBugButton() {
  return (
    <div className="flex items-center justify-start">
      <button
        className="bg-primary-500 hover:border-primary-300 flex w-auto items-center justify-center gap-1 rounded-md border-2 border-black p-2 text-sm font-bold text-black drop-shadow-lg"
        aria-label="Report a bug"
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
