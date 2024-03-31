interface PageHeaderProps {
  children?: React.ReactNode
  title?: string
  subtitle?: React.ReactNode
}

export function PageHeader({ children, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-2 flex max-w-md flex-col p-4 text-center">
      {title && (
        <h1 className="mb-2 w-full text-4xl font-semibold  text-white">
          {title}
        </h1>
      )}
      {subtitle && <p className="w-full text-lg text-gray-400">{subtitle}</p>}
      {children}
    </div>
  )
}
