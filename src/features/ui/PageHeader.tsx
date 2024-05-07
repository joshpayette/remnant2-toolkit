interface PageHeaderProps {
  title?: string
  subtitle?: React.ReactNode
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-4 border-b border-on-background/20 pb-2 md:flex md:items-center md:justify-between">
      <div className="text left sm:text-center">
        <h1 className="text-2xl font-bold text-on-background">{title}</h1>
        <p className="text-sm font-medium text-on-background/90">{subtitle}</p>
      </div>
    </div>
  )
}
