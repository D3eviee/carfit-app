type OptionListProps = {
  title?: string
  options: string[]
  onSelect: (value: string) => void
}

const normalize = (text: string) => text.toLocaleLowerCase("pl").trim()

export const filterOptions = (options: string[], query: string) =>
    options.filter((option) => normalize(option).includes(normalize(query)))

export const OptionList = ({ title, options, onSelect }: OptionListProps) => {
    return (
        <div className="flex flex-col gap-2">
            {title && <p className="p-1 text-sm font-medium text-[#0C0C0C]">{title}</p>}
            
            <ul className="flex flex-col gap-2">
                {options.map((option) => (
                    <li key={option}>
                        <button
                            type="button"
                            onClick={() => onSelect(option)}
                            className="w-full rounded-xl px-3 py-3 text-left text-sm text-[#0C0C0C] outline-none hover:bg-[#F2F2F7] focus-visible:bg-[#F2F2F7]"
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}