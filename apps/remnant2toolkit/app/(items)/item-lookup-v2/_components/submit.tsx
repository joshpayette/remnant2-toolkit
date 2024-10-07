'use client';

import { BaseButton } from '@repo/ui';
import { useFormStatus } from 'react-dom';

export function Submit() {
  const { pending } = useFormStatus();
  return (
    <BaseButton type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </BaseButton>
  );
}
