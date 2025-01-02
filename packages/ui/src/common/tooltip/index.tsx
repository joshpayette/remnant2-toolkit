'use client'

import 'tippy.js/dist/tippy.css';

import Tippy, { type TippyProps } from '@tippyjs/react';

export function Tooltip({
  arrow = true,
  interactive = true,
  content,
  children,
  trigger,
  ...rest
}: TippyProps) {
  return (
    <Tippy
      arrow={arrow}
      content={content}
      interactive={interactive}
      {...rest}
      className="ui-w-full ui-max-w-[300px] ui-text-left"
      theme="r2tk"
      trigger={trigger}
    >
      {children}
    </Tippy>
  );
}
