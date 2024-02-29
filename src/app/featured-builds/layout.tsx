export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center justify-start text-left">
      {children}
    </div>
  )
}
