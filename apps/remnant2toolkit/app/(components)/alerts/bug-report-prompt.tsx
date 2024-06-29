'use client'

import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertBody,
  BaseAlertDescription,
  BaseAlertTitle,
} from '@repo/ui/base/alert'
import { BaseButton } from '@repo/ui/base/button'
import { BaseTextarea } from '@repo/ui/base/textarea'
import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: (report: string) => void
}

export function BugReportPrompt({ open, onClose, onConfirm }: Props) {
  const [input, setInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Report Bug or Issue</BaseAlertTitle>
      <BaseAlertDescription>
        Please describe the bug with as much detail as possible. If you are not
        signed in, it would be helpful to provide your Discord or Reddit name
        for follow-up. Do not submit in-game bugs.
      </BaseAlertDescription>
      <BaseAlertBody>
        <BaseTextarea
          name="bug-report"
          rows={5}
          onChange={(e) => setInput(e.target.value)}
        />
      </BaseAlertBody>
      <BaseAlertActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton
          disabled={isSubmitting || input.trim() === ''}
          onClick={() => {
            setIsSubmitting(true)
            onConfirm(input)
          }}
        >
          Submit Report
        </BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  )
}
