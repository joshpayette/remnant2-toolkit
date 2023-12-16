export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center text-center">
      {children}
    </div>
  )
}
