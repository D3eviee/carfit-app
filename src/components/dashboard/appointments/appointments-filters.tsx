'use client'
import { Filter, Search } from "lucide-react";

export default function AppointmentFilters({setColumnFilters }){
    return (
        <div className="flex flex-row gap-3 items-center">
         {/* SEARCH */}
        <div className="flex flex-row items-center gap-2 border rounded px-1">
          <Search color="#D4D4D4" size={20}/>
          <input
            type="text"
            placeholder="Szukaj"
            className="py-1.5 w-full text-sm focus:outline-none focus:border-none"
            onChange={(e) => setColumnFilters([{id:"clientName", value: e.target.value}])}/>
        </div>
        {/* FILTERS */}
        <div className="flex flex-row items-center gap-1 border border-[#D4D4D4] rounded px-2 py-1.5 hover:bg-[#EEE] hover:cursor-pointer">
          <Filter color="#D4D4D4" size={20} strokeWidth={2}/>
          <p className="text-sm font-normal text-[#999]">Filtry</p>
        </div>
      </div>
    )
}