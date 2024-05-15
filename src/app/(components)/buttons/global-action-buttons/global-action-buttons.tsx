'use client'

import { ArrowUpIcon, BugAntIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { BaseButton } from '@/app/(components)/_base/button'
import { BugReportPrompt } from '@/app/(components)/alerts/bug-report-prompt'
import { ReportBug } from '@/app/(components)/buttons/global-action-buttons/actions'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { ToggleThemeButton } from '@/app/(utils)/theme-utils'

export function GlobalActionButtons() {
  return (
    <div className="fixed bottom-[8px] right-[8px] z-20 flex items-center justify-center gap-x-1">
      <ToggleThemeButton />
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
    <BaseButton onClick={handleBackToTopClick} color="yellow">
      <ArrowUpIcon className="h-5 w-5" />
    </BaseButton>
  )
}

function ChangeLogButton() {
  return (
    <BaseButton href={NAV_ITEMS.changeLog.href} target="_blank" color="violet">
      <NAV_ITEMS.changeLog.icon className="h-5 w-5" />
    </BaseButton>
  )
}

function ReportBugButton() {
  const [open, setOpen] = useState(false)

  async function handleReportBug(report: string) {
    if (!report || report.trim() === '') {
      setOpen(false)
      toast.error('Please provide a bug report')
      return
    }
    const { message } = await ReportBug(report)
    toast.success(message)
    setOpen(false)
  }

  return (
    <>
      <BugReportPrompt
        key={open ? 'open' : 'closed'}
        open={open}
        onConfirm={handleReportBug}
        onClose={() => setOpen(false)}
      />
      <BaseButton color="green" onClick={() => setOpen(true)}>
        <BugAntIcon className="h-5 w-5" />
      </BaseButton>
    </>
  )
}
