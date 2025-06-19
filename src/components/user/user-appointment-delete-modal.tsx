'use client'
import { deleteAppointment } from "@/app/user/actions";
import { createPortal } from "react-dom";

type UserAppointmentDeleteModalProps = {
  closeMainModalFn: () => void
  isOpen: boolean
  close: () => void
  id: string
}

export default function UserAppointmentDeleteModal({isOpen, close, id, closeMainModalFn}:UserAppointmentDeleteModalProps){
  const handleAppointmentDelete = async () => {
    await deleteAppointment(id)
    close()
    closeMainModalFn()
  }

  return (
    <>
      {isOpen && createPortal(
        <div className="realative fixed top-0 left-0 w-full h-dvh mx-auto my-auto">
          {/* BOX WITH BG FOR CONTENT */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] p-5 z-10 bg-white rounded-md sm:w-[320px]">
            <div className="flex flex-col gap-5">
              <h1 className="text-sm font-light text-[#111]">Czy napewno chcesz odwołać wizytę? Działanie to jest nieodwracalne.</h1>
              <div className="flex flex-row w-full  gap-2">
                <div 
                  className="flex justify-center items-center w-full bg-[#EFEFF1] border border-[#DEDEE0] py-1.5 rounded hover:cursor-pointer hover:bg-[#DEDEE0]"
                  onClick={() => close()}
                >
                   <p className="text-[#222] text-xs font-medium">Anuluj</p>
                </div>
                <div 
                  className="flex justify-center items-center w-full bg-[#CF142B] border border-[#BE031A] py-1.5 rounded hover:cursor-pointer hover:bg-[#BE031A]"
                  onClick={() => handleAppointmentDelete()}
                >
                  <p 
                    className="text-white text-xs font-medium">Potwierdź</p>
                </div>
              </div>
            </div>
          </div>
        
        {/* BOX WITH BACKGROUND TO EXIT */}
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-70 -z-10"/>
        </div>
        , document.body)
      }
    </>
  )
}
