type DashboardPageHeaderProps = {
    title: string
    subtitle: string
}

export default function DashboardPageHeader({title, subtitle}:DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-[#111] font-semibold leading-none md:text-3xl">{title}</h1>
        <h2 className="text-sm text-[#111] font-light leading-5 md:text-base">{subtitle}</h2>
    </div>
  )
}
