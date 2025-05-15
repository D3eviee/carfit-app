type ServiceBreadcrumbProps = {
    name: string
    category: string
    town: string
    district: string
}

export const ServiceBreadcrumb = ({category, town, district, name}:ServiceBreadcrumbProps) => {
    return (
        <p className="flex place-items-baseline font-normal text-[15px] text-[#777777]">{`${category} | ${town} | ${district} |`} 
          <span className="text-[#333333] ml-1">{name}</span>
        </p>
    )
}