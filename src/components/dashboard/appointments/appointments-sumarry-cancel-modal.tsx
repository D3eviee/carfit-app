'use client'
import { cancelAppointment } from "@/app/dashboard/calendar/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";

type CalendarEventModalProps = {
  open: boolean
  onClose: () => void
  parentClose: () => void
  appointmentId: string
}

export default function AppointmentsSumarryCancelModal({ open, onClose, appointmentId, parentClose}: CalendarEventModalProps) {
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationKey: ["cancelAppointment", appointmentId],
    mutationFn: async () => {
      const result = await cancelAppointment(appointmentId)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAppointmentsForWeekInterval', ] })
      onClose()
      parentClose()
    }
  })
  if(!open) return null
  return createPortal(
    <div className="w-full h-full fixed top-0 right-0 z-10 p-4 bg-transparent ">
      {/* black bg div */}
      <div  className="absolute left-0 top-0 w-full h-full bg-black opacity-80 "/>
      <div className="w-[80%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 bg-white p-5 rounded-xl md:w-[380px]">
        <div>
          <h1 className="text-md w-full">Anuluj wizytę</h1>
          <p className="font-light text-sm">Czynność ta jest nieodwracalna.</p>
        </div>
        <div className="w-full flex flex-row gap-2">
          <button 
            className="w-full text-[#111] bg-[#F2F4F8] border py-1 rounded-md"
            onClick={onClose}
          >Wyjdź</button>
          <button 
            className="w-full text-[#FFF] bg-[#FF5F58] py-1 border rounded-md"
            onClick={() =>  mutate()}
          >Potwierdź</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

