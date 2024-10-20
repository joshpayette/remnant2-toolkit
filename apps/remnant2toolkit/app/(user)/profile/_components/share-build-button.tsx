'use client';

import { BaseButton, ShareIcon, Tooltip } from '@repo/ui';
import { urlNoCache } from '@repo/utils';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';

export function ShareBuildButton({ buildId }: { buildId: string }) {
  function handleCopyBuild() {
    const url = urlNoCache(`${window.location.origin}/builder/${buildId}`);
    copy(url);
    toast.success('Copied build URL to clipboard!');
  }

  return (
    <Tooltip content="Copy Build URL">
      <BaseButton
        color="cyan"
        aria-label="Copy build URL to clipboard"
        onClick={handleCopyBuild}
      >
        <ShareIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  );
}
