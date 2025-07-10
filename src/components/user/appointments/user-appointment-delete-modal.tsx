'use client'
import { deleteAppointment } from "@/app/user/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";

type UserAppointmentDeleteModalProps = {
  closeMainModalFn: () => void
  isOpen: boolean
  close: () => void
  id: string
}

export default function UserAppointmentDeleteModal({isOpen, close, id, closeMainModalFn}:UserAppointmentDeleteModalProps){
  const queryClient = useQueryClient()
  const {mutateAsync} = useMutation({
    mutationFn: async () => await deleteAppointment(id),
    onSuccess: (res) => {
      if (res.success) queryClient.invalidateQueries({ queryKey: ["getClientAppointments"] })
    }
  })

  const handleAppointmentDelete = async () => {
    const response = await mutateAsync()
    if(response.success){
      close()
      closeMainModalFn()
    }
  }

  if(!isOpen) return null

  return (
    createPortal(
      <div className="fixed top-0 left-0 w-full h-dvh mx-auto my-auto flex justify-center items-center px-4 bg-black/70">
        <div className="w-full bg-white rounded-md space-y-6 px-4 py-5 max-w-[480px] sm:p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-md font-semibold text-[#191919] leading-none">Czy napewno chcesz odwołać wizytę?</h1>
            <p className="text-[#191919] text-sm font-normal" > Działanie to jest nieodwracalne.</p>
          </div>

          <div className="flex flex-row w-full gap-2">
            <div 
              className="flex justify-center items-center w-full bg-[#EFEFF1]  border-[#DEDEE0] py-2.5 rounded hover:cursor-pointer hover:bg-[#DEDEE0]"
              onClick={close}
            >
              <p className="text-[#191919] text-sm font-medium">Wyjdź</p>
            </div>
            <div 
              className="flex justify-center items-center w-full bg-[#CF142B] border border-[#BE031A] py-2.5 rounded hover:cursor-pointer hover:bg-[#BE031A]"
              onClick={handleAppointmentDelete}
            >
              <p className="text-white text-sm font-medium">Odwołaj</p>
            </div>
          </div>
        </div>
      </div>, document.body)
  )
}
