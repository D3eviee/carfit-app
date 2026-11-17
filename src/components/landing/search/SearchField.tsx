"use client"
import { useState, type FocusEvent, type ReactNode } from "react";

type SearchFieldProps = {
  icon: ReactNode
  placeholder: string
  value: string
  onChange: (value: string) => void
  renderDropdown: (close: () => void) => ReactNode
}

export const SearchField = ({ icon, placeholder, value, onChange, renderDropdown }: SearchFieldProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  // Close only when focus leaves the whole field (input + dropdown),
  // so keyboard users can Tab into the options.
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close()
  }

  return (
    <div className="relative w-full" onBlur={handleBlur}>
      <span aria-hidden className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ${ value === "" ? "text-[#8A8A8E]" : "text-black"}`}>{icon}</span>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        onChange={(e) => { onChange(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(e) => { if (e.key === "Escape") close() }}
        className="w-full rounded-xl border-[0.5px] border-transparent bg-white py-3 pl-11 pr-3 text-base text-[#191919] shadow-sm outline-none placeholder-[#8A8A8E] focus:border-[#D4D4D4] md:rounded-lg md:py-3.5"
      />

      {isOpen && (
        <div
          // Keeps focus in the input when clicking/tapping an option (Safari doesn't focus buttons on click)
          onMouseDown={(e) => e.preventDefault()}
          className="absolute top-full z-10 mt-0.5 max-h-48 w-full overflow-y-auto rounded-lg bg-white p-3 inset-shadow-glass"
        >
          {renderDropdown(close)}
        </div>
      )}
    </div>
  )
}