'use client';

import { useState } from 'react';
import { BaseTextarea } from '../../../base/textarea';
import { BaseButton } from '../../../base/button';
import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertBody,
  BaseAlertDescription,
  BaseAlertTitle,
} from '../../../base/alert';

interface BugReportPromptProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (report: string) => void;
}

export function BugReportPrompt({
  open,
  onClose,
  onConfirm,
}: BugReportPromptProps) {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <BaseAlert onClose={onClose} open={open}>
      <BaseAlertTitle>Report Bug or Issue</BaseAlertTitle>
      <BaseAlertDescription>
        Please describe the bug with as much detail as possible. If you are not
        signed in, it would be helpful to provide your Discord or Reddit name
        for follow-up. Do not submit in-game bugs.
      </BaseAlertDescription>
      <BaseAlertBody>
        <BaseTextarea
          name="bug-report"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          rows={5}
        />
      </BaseAlertBody>
      <BaseAlertActions>
        <BaseButton onClick={onClose} plain>
          Cancel
        </BaseButton>
        <BaseButton
          disabled={isSubmitting || input.trim() === ''}
          onClick={() => {
            setIsSubmitting(true);
            onConfirm(input);
          }}
        >
          Submit Report
        </BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  );
}
