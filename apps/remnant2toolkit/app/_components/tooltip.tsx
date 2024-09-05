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
      interactive={interactive}
      content={content}
      {...rest}
      theme="r2tk"
      trigger={trigger}
      className="w-full max-w-[300px] text-left"
    >
      {children}
    </Tippy>
  );
}
