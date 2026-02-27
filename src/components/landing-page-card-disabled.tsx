'use client';

import { useState } from 'react';

import GenericDialog from '@/components/generic-dialog';
import { type LandingPageCardProps } from '@/components/landing-page-card';
import { LandingPageCardContent } from '@/components/landing-page-card-content';
import { BaseLink } from '@/ui/base/link';
import { cn } from '@/utils/classnames';

type Props = Omit<LandingPageCardProps, 'href' | 'target'> & {
  disabledReason?: string;
};

export function LandingPageCardDisabled({
  disabledReason,
  description,
  icon,
  label,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <GenericDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Account Required"
      >
        {disabledReason}
      </GenericDialog>
      <BaseLink
        href="#"
        key={label}
        onClick={() => setDialogOpen(true)}
        className={cn(
          'bg-background-solid/50 ring-background-solid/10 hover:border-primary-500 mb-4 flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent p-6 ring-1 ring-inset'
        )}
      >
        <LandingPageCardContent
          icon={icon}
          label={label}
          description={description}
        />
      </BaseLink>
    </>
  );
}
