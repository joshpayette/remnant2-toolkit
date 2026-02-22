'use client';

import { useLocalStorage } from 'usehooks-ts';
import { BaseButton } from '../../base/button';
import { BaseText } from '../../base/text';
import { cn } from '../../../utils/classnames';
import { CloseIcon } from '../icons/close';
import { ZINDEXES } from '../z-indexes';

interface AlertBannerProps {
  bgColor?: string;
  localStorageKey: string;
  children?: React.ReactNode;
}

export function AlertBanner({
  bgColor = 'bg-primary-900',
  localStorageKey,
  children,
}: AlertBannerProps) {
  const [showBanner, setShowBanner] = useLocalStorage(localStorageKey, true);

  if (!showBanner) return null;

  return (
    <div
      className={cn(
        'animate-slideIn fixed w-full p-1 text-sm',
        bgColor,
        ZINDEXES.ALERT_BANNER
      )}
    >
      <div className="absolute right-0 top-0">
        <BaseButton
          onClick={() => {
            setShowBanner(false);
          }}
          plain
        >
          <CloseIcon className="h-5 w-5" />
        </BaseButton>
      </div>
      <div className="flex w-full items-center justify-center text-center">
        <div className="max-w-[80%] md:max-w-[800px]">
          <BaseText>{children}</BaseText>
        </div>
      </div>
    </div>
  );
}

export default AlertBanner;
