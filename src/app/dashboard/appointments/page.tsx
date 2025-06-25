"use client"
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import AppointmenDateCell from "@/components/dashboard/appointments/appointments-date-cell"
import AppointmenPriceCell from "@/components/dashboard/appointments/appointments-price-cell"
import AppointmentStatusCell from "@/components/dashboard/appointments/appointments-status-cell"
import AppointmentNameCell from "@/components/dashboard/appointments/appointments-name-cell";
import AppointmentPhoneCell from "@/components/dashboard/appointments/appointments-phone-cell";
import { ArrowDown, ArrowDownUp, ArrowUp, Filter, Search, X, } from "lucide-react";
import { useState } from "react";
import { getAppointmentsTableData } from "./actions";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";


export default function Appointments() {

    const {data: appointmentsData, status: appointmentsStatus} = useQuery({
    queryKey: ["getAppointmentsTableData"],
    queryFn: async () => {
      const response = await getAppointmentsTableData()
      if(!response.success) return null
      return response.data
    }
  })

  const columns = [
    {
      accessorKey: "client.name",
      header: "Imię i nazwisko",
      cell: AppointmentNameCell 
    },
    {
      accessorKey: "client.phone",
      header: "Telefon",
      cell: AppointmentPhoneCell,
      enableSorting: false
    },
    {
      accessorKey: "reservationStart",
      header: "Data wizyty",
      cell: AppointmenDateCell 
    },
    {
      accessorKey: "charge",
      header: "Koszt",
      cell: AppointmenPriceCell
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: AppointmentStatusCell
    },
  ]

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>() 

  const table = useReactTable({
    data: appointmentsData ?? [],
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  

  if (appointmentsStatus === "pending") return <Spinner/>
  if (appointmentsStatus === "error") return <Error/>

  return (
    <div className="flex flex-col gap-5">
      <DashboardPageHeader 
        title="Wizyty" 
        subtitle="Znajdziesz tu listę wszystkich wizyt: oczekujących, zarezerowwanych oraz anulowanych."
      />

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-row justify-between items-center">
         {/* SEARCH */}
        <div className="flex flex-row items-center gap-2 border rounded px-1">
          <Search color="#D4D4D4" size={20}/>
          <input
            type="text"
            placeholder="Szukaj"
            className="py-1.5 w-full text-sm focus:outline-none focus:border-none"
            onChange={(e) => setColumnFilters([{id: "client_name", value: e.target.value}])}
          />
        </div>
        {/* FILTERS */}
        <div className="flex flex-row items-center gap-1 border border-[#D4D4D4] rounded px-2 py-1.5 hover:bg-[#EEE] hover:cursor-pointer">
          <Filter color="#D4D4D4" size={20} strokeWidth={2}/>
          <p className="text-sm font-normal text-[#999]">Filtry</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full h-full border rounded-2xl overflow-clip ">
        <table className="border w-full bg-white overflow-scroll">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className=" bg-[#F6F5F8] text-[#333333] font-semibold text-sm">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left py-3 first-of-type:pl-10">
                    <div className="flex flex-row gap-3 justify-left items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && !header.column.getIsSorted() && 
                      <ArrowDownUp size={15} strokeWidth={1} onClick={header.column.getToggleSortingHandler()}/> }
                      {
                        (() => {
                          const sort = header.column.getIsSorted() as "asc" | "desc" | undefined;
                          if (!sort) return null;
                          return {
                            asc: <ArrowDown size={15} strokeWidth={1} onClick={header.column.getToggleSortingHandler()}/>,
                            desc: <ArrowUp size={15} strokeWidth={1} onClick={header.column.getToggleSortingHandler()}/>,
                          }[sort];
                        })()
                      }
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody >
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-slate-100 ">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-2 first-of-type:pl-10 text-sm text-[#111] font-normal">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TABLE PAGES */}
      <div className=" w-full flex items-center justify-end gap-1">
        <div className="flex flex-row gap-3"> 
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"> 
            Previous 
          </button> 
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" > 
            Next 
          </button> 
        </div>
        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}
