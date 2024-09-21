'use client';

import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertBody,
  BaseAlertDescription,
  BaseAlertTitle,
  BaseButton,
  BaseInput,
} from '@repo/ui';
import { useState } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: (newVariantName: string) => void;
}

const buildNameSuggestions = [
  'Boss Rush',
  'Budget Gear',
  'Mobbing',
  'Base Game Only',
  'Alternate Gear',
];

export function BuildVariantNamePrompt({
  open,
  onCancel,
  onClose,
  onConfirm,
}: Props) {
  const [input, setInput] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Build Variant Name</BaseAlertTitle>
      <BaseAlertDescription>
        Enter a name for the current build variant.
      </BaseAlertDescription>
      <BaseAlertBody>
        <BaseInput
          autoFocus
          name="newVariantName"
          type="text"
          aria-label="Build Variant Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          min={1}
          max={8}
        />
        <div className="my-4 border-b border-t border-b-gray-500 border-t-gray-500 bg-gray-900 p-4">
          <h3 className="mb-2 w-full text-center text-sm font-bold">
            Suggestions
          </h3>
          <div className="flex w-full flex-wrap gap-2">
            {buildNameSuggestions.map((suggestion) => (
              <BaseButton key={suggestion} onClick={() => setInput(suggestion)}>
                {suggestion}
              </BaseButton>
            ))}
          </div>
        </div>
      </BaseAlertBody>
      <BaseAlertActions>
        <BaseButton plain onClick={onCancel}>
          Cancel
        </BaseButton>
        <BaseButton
          disabled={isSubmitDisabled || input.trim() === ''}
          onClick={() => {
            setIsSubmitDisabled(true);
            onConfirm(input);
          }}
        >
          Save
        </BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  );
}
