import { cn } from "@/utils"

export const DashboardReservationListItemStatus = ({ status }: { status: string }) => {
  const statusLabel = status == "reserved" ? "Zarezerwowana" : (status == "canceled" ? "Anulowana" : "Zakończona")

  return (
    <div
      className={cn(
        "px-3 py-0.5 rounded-lg w-fit h-fit border text-xs font-medium transition",
        status === "reserved" && "bg-[#E8F9EE] text-[#15803D] border-[#BBF7D0]",
        status === "finished" && "bg-[#E0ECFF] text-[#1D4ED8] border-[#BFDBFE]",
        status === "canceled" && "bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]"
      )}
    >
      {statusLabel}
    </div>
  )
}
