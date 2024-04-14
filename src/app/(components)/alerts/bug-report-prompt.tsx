'use client'

import { useState } from 'react'

import {
  Alert,
  AlertActions,
  AlertBody,
  AlertDescription,
  AlertTitle,
} from '@/app/(components)/_base/alert'
import { Button } from '@/app/(components)/_base/button'
import { Input } from '@/app/(components)/_base/input'
import { Textarea } from '@/app/(components)/_base/textarea'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: (report: string) => void
}

export function BugReportPrompt({ open, onClose, onConfirm }: Props) {
  const [input, setInput] = useState('')

  return (
    <Alert open={open} onClose={onClose}>
      <AlertTitle>Report Bug or Issue</AlertTitle>
      <AlertDescription>
        Please describe the bug with as much detail as possible. If you are not
        signed in, it would be helpful to provide your Discord or Reddit name
        for follow-up. Do not submit in-game bugs.
      </AlertDescription>
      <AlertBody>
        <Textarea
          name="bug-report"
          rows={5}
          onChange={(e) => setInput(e.target.value)}
        />
      </AlertBody>
      <AlertActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(input)}>Submit Report</Button>
      </AlertActions>
    </Alert>
  )
}
