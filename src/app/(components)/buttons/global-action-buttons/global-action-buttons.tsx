'use client'

import { BugAntIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { BaseButton } from '@/app/(components)/_base/button'
import { BugReportPrompt } from '@/app/(components)/alerts/bug-report-prompt'
import { ReportBug } from '@/app/(components)/buttons/global-action-buttons/actions'
import { NAV_ITEMS } from '@/app/(types)/navigation'

// Lazy-load the theme toggle, since it relies on client context
const ThemeSelectButton = dynamic(
  () => import('./theme-select-button.client'),
  {
    ssr: false,
  },
)

export function GlobalActionButtons() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-[8px] right-[8px] z-20 flex items-center justify-center gap-x-1">
      <AnimatePresence>
        {open && (
          <motion.div
            className="isolate inline-flex w-[152px] gap-x-1 rounded-md bg-secondary-900 shadow-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="sr-only">Theme Select</span>
              <ThemeSelectButton />
            </div>
            <div>
              <span className="sr-only">Report Bug</span>
              <ReportBugButton />
            </div>
            <div>
              <span className="sr-only">Change Log</span>
              <ChangeLogButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsButton onToggle={() => setOpen((prev) => !prev)} />
    </div>
  )
}

function SettingsButton({ onToggle }: { onToggle: () => void }) {
  return (
    <BaseButton color="yellow" onClick={onToggle}>
      <Cog6ToothIcon className="h-5 w-5" />
    </BaseButton>
  )
}

// function BackToTopButton() {
//   function handleBackToTopClick() {
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return (
//     <BaseButton onClick={handleBackToTopClick} color="yellow">
//       <ArrowUpIcon className="h-5 w-5" />
//     </BaseButton>
//   )
// }

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
