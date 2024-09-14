import { ArrowRightIcon } from '@repo/ui';

export function LandingPageCardContent({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <>
      {icon}
      <div className="relative w-full">
        <>
          <p className="text-lg font-bold leading-7">{label}</p>
          <div className="mt-2 text-gray-300 ">{description}</div>
        </>

        <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
          <ArrowRightIcon
            className="text-primary-500 hover:text-primary-300 h-6 w-6"
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );
}
