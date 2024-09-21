export function NotificationCardContent({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-row">
      <div className="relative content-center pr-4">
        {icon}
      </div>
      <div className="relative w-full">
        <>
          <p className="text-lg font-bold leading-7">{label}</p>
          <div className="mt-2 text-gray-300 ">{description}</div>
        </>
      </div>
    </div>
  );
}
