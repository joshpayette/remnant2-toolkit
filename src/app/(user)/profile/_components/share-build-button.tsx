'use client';

import copy from 'clipboard-copy';
import { toast } from 'react-toastify';

import { BaseButton } from '@/ui/base/button';
import { ShareIcon } from '@/ui/common/icons/share';
import { Tooltip } from '@/ui/common/tooltip';
import { urlNoCache } from '@/utils/url-no-cache';

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
