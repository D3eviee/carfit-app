"use client"
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getFilteredRowModel, ColumnFiltersState, getPaginationRowModel } from "@tanstack/react-table";
import AppointmenDateCell from "@/components/dashboard/appointments/appointments-date-cell"
import AppointmenPriceCell from "@/components/dashboard/appointments/appointments-price-cell"
import AppointmentStatusCell from "@/components/dashboard/appointments/appointments-status-cell"
import AppointmentNameCell from "@/components/dashboard/appointments/appointments-name-cell";
import AppointmentPhoneCell from "@/components/dashboard/appointments/appointments-phone-cell";
import {ChevronLeft, ChevronRight} from "lucide-react";
import { useState } from "react";
import { getAppointmentsTableData } from "./actions";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import AppointmentFilters from "@/components/dashboard/appointments/appointments-filters";
import { CalendarAppointmentOverviewProps } from "@/lib/types";
import AppointmentsSumarryModal from "@/components/dashboard/appointments/appointments-summary-modal";

export default function Appointments() {
  //Modal state
  const [isOpen, setIsOpen] = useState(false)
  const [activeAppointmentData, setActiveAppointmentData] = useState<CalendarAppointmentOverviewProps>()

  const handleOpeningModal = (data: CalendarAppointmentOverviewProps) => {
    setActiveAppointmentData(data)
    setIsOpen(true)
  }

  //data
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
      accessorKey: "clientName",
      header: "Imię i nazwisko",
      cell: AppointmentNameCell 
    },
    {
      accessorKey: "clientPhone",
      header: "Telefon",
      cell: AppointmentPhoneCell,
      enableSorting: false
    },
    {
      accessorKey: "reservationStart",
      header: "Data",
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
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  

  if (appointmentsStatus === "pending") return <Spinner/>
  if (appointmentsStatus === "error") return <Error/>

  return (
    <>
    <div className="w-full h-full relative flex flex-col gap-3 overflow-hidden ">
      <DashboardPageHeader 
        title="Wizyty" 
        subtitle="Znajdziesz tu listę wszystkich wizyt. Przeglądaj i zarządzaj wizytami"
      />

      {/* SEARCH AND FILTERS */}
      <AppointmentFilters setColumnFilters={setColumnFilters}/>

      {/* TABLE */}
      <div className="w-full border rounded-xl overflow-scroll ">
        <table className="w-full rounded-xl bg-white ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#F2F4F8] text-[#222] font-medium text-xs">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left px-1 py-2 border-l">
                    <div className="flex flex-row gap-3 justify-left items-center min-w-24">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="overflow-scroll">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-slate-100" onClick={() => handleOpeningModal(row.original)}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className=" py-2 text-sm text-[#111] font-normal">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            ))}
          </tbody>
        </table>

      </div>
      

      {/* TABLE PAGES */}
      <div className="w-full absolute bottom-10 left-5 flex items-center justify-start gap-1">
        <div className="flex flex-row gap-3"> 
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="text-xs px-3 py-1 bg-gray-300 text-[#000] rounded disabled:opacity-50"> 
            <ChevronLeft/> 
          </button> 
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="text-xs px-3 py-1 bg-gray-300 text-[#000] rounded disabled:opacity-50" > 
            <ChevronRight/> 
          </button> 
        </div>
        <p className="text-sm text-[#333] font-light">{`Strona ${table.getState().pagination.pageIndex + 1} z ${table.getPageCount()}`}</p>
      </div>
    </div>

    <AppointmentsSumarryModal open={isOpen} onClose={() => {setIsOpen(false)}} appointmentData={activeAppointmentData}/> 
    </>
  );
}