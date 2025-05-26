type ServiceBreadcrumbProps = {
  name: string;
  category: string;
  town: string;
  district: string;
};

export const ServiceBreadcrumb = ({category, town, district, name }: ServiceBreadcrumbProps) => {
  return (
    <p className="w-full flex place-items-baseline text-sm text-[#777777]">
      {`${category} | ${town} | ${district}`}
      <span className="hidden text-[#333333] ml-1 md:block">{`| ${name}`}</span>
    </p>
  )
}
