export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex w-full flex-col items-center">{children}</div>
}
