type ServiceBreadcrumbProps = {
  name: string;
  category: string;
  town: string;
  district: string;
}

export const ServiceBreadcrumb = ({category, town, district, name }: ServiceBreadcrumbProps) => {
  return (
    <p className="w-full flex flex-row items-center text-sm font-light text-[#8E8E72]">
      {`${category} | ${town} | ${district}`}
      <span className="text-[#333333] ml-1 font-normal">{`| ${name}`}</span>
    </p>
  )
}
