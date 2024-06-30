'use client'

import {
  ArrowUpIcon,
  BugAntIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/solid'
import { CHANGELOG_URL } from '@repo/constants'
import { BaseButton } from '@repo/ui/base/button'
import { BugReportPrompt } from '@repo/ui/bug-report-prompt'
import { cn } from '@repo/ui/classnames'
import ChangeLogIcon from '@repo/ui/icons/changelog'
import { ZINDEXES } from '@repo/ui/zindexes'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { ReportBug } from './bug-report/report-bug'

// Lazy-load the theme toggle, since it relies on client context
const ThemeSelectButton = dynamic(
  () => import('@repo/ui/theme/theme-select-button' as any),
  {
    ssr: false,
    loading: () => (
      <BaseButton color="dark/white">
        <PaintBrushIcon className="h-5 w-5" />
      </BaseButton>
    ),
  },
)

interface Props {
  username: string
}

export function GlobalActionButtons({ username }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'ui-fixed ui-bottom-[8px] ui-right-[8px] ui-flex ui-items-center ui-justify-center ui-gap-x-1',
        ZINDEXES.GLOBAL_ACTION_BUTTONS,
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className="ui-bg-background-solid ui-isolate ui-inline-flex ui-min-w-[140px] ui-gap-x-1 ui-rounded-md ui-shadow-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="ui-sr-only">Theme Select</span>
              <ThemeSelectButton />
            </div>
            <div>
              <span className="ui-sr-only">Report Bug</span>
              <ReportBugButton username={username} />
            </div>
            <div>
              <span className="ui-sr-only">Change Log</span>
              <ChangeLogButton />
            </div>
            <div>
              <span className="ui-sr-only">Back to Top</span>
              <BackToTopButton />
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
      <Cog6ToothIcon className="ui-h-5 ui-w-5" />
    </BaseButton>
  )
}

function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <BaseButton onClick={handleBackToTopClick} color="cyan">
      <ArrowUpIcon className="ui-h-5 ui-w-5" />
    </BaseButton>
  )
}

function ChangeLogButton() {
  return (
    <BaseButton href={CHANGELOG_URL} target="_blank" color="violet">
      <ChangeLogIcon className="ui-h-5 ui-w-5" />
    </BaseButton>
  )
}

function ReportBugButton({ username }: { username: string }) {
  const [open, setOpen] = useState(false)

  async function handleReportBug(report: string) {
    if (!report || report.trim() === '') {
      setOpen(false)
      toast.error('Please provide a bug report')
      return
    }
    const { message } = await ReportBug({ report, username })
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
        <BugAntIcon className="ui-h-5 ui-w-5" />
      </BaseButton>
    </>
  )
}
