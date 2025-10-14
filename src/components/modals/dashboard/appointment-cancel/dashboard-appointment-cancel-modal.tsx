'use client'
import { Spinner } from "@/components/spinner";
import { useCancelAppointment } from "@/lib/hooks/dashboard/useCancelAppointment";
import { ExitModalButton } from "../../exit-modal-button";

export const DashboardAppointmentCancelModal = ({ appointmentId }: {appointmentId: string}) => {
  const { cancelAppointment, isPending } = useCancelAppointment(appointmentId)
  
  return(
    <div className="w-[360px] flex flex-col gap-8 px-4 pb-4 pt-8 bg-[#F2F2F7] rounded-4xl">
      <div className="flex flex-col gap-2.5 px-2">
        <p className="text-main-black text-middle leading-none font-semibold">Czy na pewno chcesz odwołać wizytę?</p>
        <p className=" text-main-black text-sm leading-none">Czynność ta jest nieodwracalna.</p>
      </div>

      <div className="w-full flex flex-row gap-2.5">
        <ExitModalButton/>
        <div 
          onClick={() => cancelAppointment()}
          className="w-full text-center justify-center py-2.5 bg-[#F95A59] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#E84948] active:scale-105"
        >
         {isPending ? <Spinner color="#FFF"/>  : <p className="text-[#FFF]">Odwołaj</p>} 
        </div>
      </div>
    </div>
  )
}   