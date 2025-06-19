type DashboardPageHeaderProps = {
    title: string
    subtitle: string
}

export default function DashboardPageHeader({title, subtitle}:DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-[#111] font-semibold leading-none">{title}</h1>
         <h2 className="text-base text-[#333] font-light leading-5">{subtitle}</h2>
    </div>
  )
}
