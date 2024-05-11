import clsx from 'clsx'

export function Skeleton({
  as: Component = 'div',
  width,
  height,
  className,
  ...props
}: {
  as?: React.ElementType
  width?: string
  height?: string
  className?: string
  [key: string]: any
}) {
  const styles = clsx('rounded animate-pulse bg-gray-800', className)

  return (
    <Component {...props} width={width} height={height} className={styles} />
  )
}
