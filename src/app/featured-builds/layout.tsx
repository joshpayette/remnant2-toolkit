export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-lg flex-col items-start justify-start text-left">
      {children}
    </div>
  )
}
