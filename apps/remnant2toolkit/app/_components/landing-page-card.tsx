import { ArrowRightIcon, BaseLink, cn } from '@repo/ui';

interface Props {
  variant?: 'wiki';
  href: string;
  target?: '_blank';
  label: string;
  description: string;
  icon: React.ReactNode;
}

export function LandingPageCard({
  variant,
  href,
  target,
  description,
  icon,
  label,
}: Props) {
  return (
    <BaseLink
      href={href}
      key={label}
      target={target}
      className={cn(
        'bg-background-solid/50 ring-background-solid/10 hover:border-primary-500 mb-4 flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent p-6 ring-1 ring-inset',
        variant === 'wiki' &&
          "bg-[url('https://d2sqltdcj8czo5.cloudfront.net/remnant2/misc/remwiki_watermark.png')] bg-contain bg-center bg-no-repeat",
      )}
    >
      {icon}
      <div className="relative w-full">
        {variant !== 'wiki' && (
          <>
            <p className="text-lg font-bold leading-7">{label}</p>
            <div className="mt-2 text-gray-300 ">{description}</div>
          </>
        )}
        <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
          <ArrowRightIcon
            className="text-primary-500 hover:text-primary-300 h-6 w-6"
            aria-hidden="true"
          />
        </div>
      </div>
    </BaseLink>
  );
}
