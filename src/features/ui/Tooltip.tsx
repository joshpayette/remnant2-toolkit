import Tippy from '@tippyjs/react'

// TODO add color variants to use throughout the site

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
    <Tippy arrow={arrow} interactive={interactive} content={content}>
      {children}
    </Tippy>
  )
}
