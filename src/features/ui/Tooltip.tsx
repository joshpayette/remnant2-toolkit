import Tippy, { TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

export default function Tooltip({
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
    >
      {children}
    </Tippy>
  )
}
