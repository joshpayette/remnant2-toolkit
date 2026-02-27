import { LandingPageCardContent } from '@/components/landing-page-card-content';
import { BaseLink } from '@/ui/base/link';
import { cn } from '@/utils/classnames';

export interface LandingPageCardProps {
  href: string;
  disabled?: string;
  target?: '_blank';
  label: string;
  description: string;
  icon: React.ReactNode;
}

export function LandingPageCard({
  href,
  target,
  description,
  icon,
  label,
}: LandingPageCardProps) {
  return (
    <BaseLink
      href={href}
      key={label}
      target={target}
      className={cn(
        'bg-background-solid/50 ring-background-solid/10 hover:border-primary-500 mb-4 flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent p-6 ring-1 ring-inset'
      )}
    >
      <LandingPageCardContent
        icon={icon}
        label={label}
        description={description}
      />
    </BaseLink>
  );
}
