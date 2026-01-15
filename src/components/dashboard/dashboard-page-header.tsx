type DashboardPageHeaderProps = {
    title: string
    subtitle: string
}

export const DashboardPageHeader = ({title, subtitle}:DashboardPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-main-black font-semibold leading-none md:text-3xl">{title}</h1>
        <h2 className="text-sm text-main-black font-light leading-5 md:text-base">{subtitle}</h2>
    </div>
  )
}
