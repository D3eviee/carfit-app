type NoResultBoxProps = {
  title?: string
  description: string
}

export const NoResultBox = ({ title = "Brak wyników", description }: NoResultBoxProps) => {
    return (
        <div className="flex w-full flex-col justify-center gap-1.5 rounded-2xl border-[0.5px] border-[#D4D4D4] bg-[#F9F9F9] px-4 py-3 text-center">
            <p className="text-sm font-medium leading-none tracking-wide text-[#0C0C0C]">{title}</p>
            <p className="text-xs font-light tracking-wide text-[#0C0C0C]">{description}</p>
        </div>
    )
}