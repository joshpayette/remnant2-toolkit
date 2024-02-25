import 'tippy.js/dist/tippy.css'

import Tippy, { TippyProps } from '@tippyjs/react'

export function Tooltip({
  arrow = false,
  interactive = true,
  content,
  children,
  ...rest
}: TippyProps) {
  return (
    <Tippy
      arrow={arrow}
      interactive={interactive}
      content={content}
      {...rest}
      theme="r2tk"
      className="text-left"
    >
      {children}
    </Tippy>
  )
}
