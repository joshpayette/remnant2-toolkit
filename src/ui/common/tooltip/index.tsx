'use client';

import { ReactNode, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  // kept for API compatibility
  arrow?: boolean;
  interactive?: boolean;
  trigger?: string;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  interactive = true,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLSpanElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [{ name: 'offset', options: { offset: [0, 6] } }],
  });

  const show = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(true);
  }, []);

  const scheduleHide = useCallback(() => {
    if (!interactive) {
      setVisible(false);
    } else {
      hideTimer.current = setTimeout(() => setVisible(false), 80);
    }
  }, [interactive]);

  if (!content || disabled) return <>{children}</>;

  return (
    <>
      <span
        ref={setReferenceElement}
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onFocus={show}
        onBlur={() => setVisible(false)}
      >
        {children}
      </span>
      {visible &&
        createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-[9999] max-w-[300px] rounded border border-accent1-500 bg-zinc-800 px-2 py-1 text-left text-xs leading-4 text-surface-solid shadow-lg"
            onMouseEnter={interactive ? show : undefined}
            onMouseLeave={interactive ? scheduleHide : undefined}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}
