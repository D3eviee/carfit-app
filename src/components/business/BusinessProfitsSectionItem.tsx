import { cn } from "@/utils"

type BusinessPageProfitsSectionItemProps = {
  title: string
  content: string
  className?: string
}

export const BusinessProfitsSectionItem = ({ title, content, className }: BusinessPageProfitsSectionItemProps) => {
  return (
    <article className={cn("min-h-[240px] flex flex-col justify-between gap-6 p-8 bg-[#f5f5f7] rounded-4xl shadow-md", className )}>
      <h3 className="bg-gradient-to-r from-[#ff6a00] via-[#ff3b82] to-[#3b82f6] bg-clip-text text-transparent text-lg font-semibold md:text-xl md:font-bold">{title}</h3>
      <p className="text-middle text-[#333] font-normal md:font-semibold md:text-base">{content}</p>
    </article>
  )
}