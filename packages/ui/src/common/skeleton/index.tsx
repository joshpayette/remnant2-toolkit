import { cn } from '../../utils/classnames';

export function Skeleton({
  as: Component = 'div',
  width,
  height,
  className,
  ...props
}: {
  as?: React.ElementType;
  width?: string;
  height?: string;
  className?: string;
  [key: string]: unknown;
}) {
  const styles = cn('ui-rounded ui-animate-pulse ui-bg-gray-800', className);

  return (
    <Component {...props} className={styles} height={height} width={width} />
  );
}
