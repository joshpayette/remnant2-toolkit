'use client'

import { ArrowUpIcon, BugAntIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import { Button } from '@/app/(components)/base/button'
import { ReportBug } from '@/app/(components)/global-action-buttons/actions'
import { NAV_ITEMS } from '@/features/navigation/constants'

export function GlobalActionButtons() {
  return (
    <div className="fixed bottom-[8px] right-[8px] z-20 flex items-center justify-center gap-x-1">
      <ReportBugButton />
      <ChangeLogButton />
      <BackToTopButton />
    </div>
  )
}

function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button onClick={handleBackToTopClick} color="yellow">
      <ArrowUpIcon className="h-5 w-5" />
    </Button>
  )
}

function ChangeLogButton() {
  return (
    <Button href={NAV_ITEMS.changeLog.href} target="_blank" color="violet">
      <NAV_ITEMS.changeLog.icon className="h-5 w-5" />
    </Button>
  )
}

function ReportBugButton() {
  async function handleReportBug() {
    const report = prompt(
      'Please describe the bug. Do not submit in-game bugs.',
    )
    if (report) {
      const { message } = await ReportBug(report)
      toast.success(message)
    }
  }

  return (
    <div className="flex items-center justify-start">
      <Button color="green" onClick={handleReportBug}>
        <BugAntIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
