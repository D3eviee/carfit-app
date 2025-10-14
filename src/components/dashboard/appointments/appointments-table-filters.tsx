import { ColumnFiltersState } from "@tanstack/react-table"

export const AppointmentsTableFilters = ({ columnFilters, setColumnFilters } : 
  { columnFilters: ColumnFiltersState, 
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>> }) => {
    const clientName = columnFilters.find(( f => f.id == "clientName" ))?.value || ""
    const onFilterChange = (id:string, value:string) => setColumnFilters(prev => prev.filter(f => f.id != id).concat([{id, value}])) 

    return (
      <div className="flex flex-row gap-3 items-center">
        <input
          id="search"
          value={String(clientName)}
          placeholder="Imię i nazwisko"
          onChange={(e) => onFilterChange("clientName", e.target.value)}
          className="max-w-72 w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-main-black rounded-xl border outline-none border-transparent focus:border-[#CCC]"
        />
      </div>
    )
}
