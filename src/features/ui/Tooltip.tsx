import Tippy from '@tippyjs/react'

interface Props {
  arrow?: boolean
  children: React.ReactElement
  className?: string
  interactive?: boolean
  tooltipText: string
}

export default function Tooltip({
  arrow,
  children,
  className,
  interactive = false,
  tooltipText,
}: Props) {
  return (
    <Tippy trigger="onClick">
      <Tippy
        arrow={arrow}
        interactive={interactive}
        content={<span className={className}>{tooltipText}</span>}
      >
        {children}
      </Tippy>
    </Tippy>
  )
}
