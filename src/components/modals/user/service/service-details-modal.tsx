import { Service } from "@/lib/types";
import { ModalBackButton } from "../../../buttons/modal-back-button";
import { displayAppointmentTime } from "@/utils";

export const ServiceDetailsModal = ({service}: {service:Service}) =>  {
  const {name, description, duration, price} = service

  return (  
    <div className="h-[320px] overflow-scroll bg-white rounded-4xl w-[85%] sm:w-[420px] md:w-[520px]">
      <div className="w-full p-6">
        <ModalBackButton />
      </div>
      <div className="flex flex-col gap-4 px-8">
        <div className="w-full flex flex-row gap-4">
          <div className="w-fit h-fit flex flex-row items-center gap-2 px-2 py-1 rounded-lg bg-[#ECFDF5] text-[#047857] border-[0.5px] border-[#A7F3D0]">
            <p className="text-sm font-medium leading-none">{price} PLN</p>
          </div>
          <div className="w-fit h-fit flex flex-row items-center gap-2 px-2 py-1 rounded-lg bg-[#F5F0FF] text-[#6D28D9] border-[0.5px] border-[#E0D4FF]">
            <p className="text-sm font-medium leading-none">{displayAppointmentTime(duration)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-main-black text-xl font-bold leading-6">{name}</h1>
          <p className="text-main-black text-middle font-normal leading-6">{description}</p>
        </div>
      </div>
    </div>
  )
}