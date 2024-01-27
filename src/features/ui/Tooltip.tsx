import Tippy from '@tippyjs/react'

interface Props {
  arrow?: boolean
  children: React.ReactElement
  content: React.ReactNode
  interactive?: boolean
}

export default function Tooltip({
  arrow,
  children,
  content,
  interactive = false,
}: Props) {
  return (
    <Tippy trigger="onClick">
      <Tippy
        arrow={arrow}
        interactive={interactive}
        content={content}
      >
        {children}
      </Tippy>
    </Tippy>
  )
}
