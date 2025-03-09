import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

export function RemnantOverseerIcon({
  className,
  width = 64,
  height = 64,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={getImageUrl('/misc/remnant-overseer-icon.webp')}
      width={width}
      height={height}
      alt="Remnant Overseer icon"
      className={className}
    />
  );
}
