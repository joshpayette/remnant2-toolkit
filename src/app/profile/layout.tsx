import AuthWrapper from '../(components)/AuthWrapper'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthWrapper>
      <div className="flex w-full flex-col items-center">{children}</div>
    </AuthWrapper>
  )
}
