import { Service } from "@/lib/types";
import { displayAppointmentTime } from "@/utils";
import { BookingServicesCategoryItemAddButton } from "./booking-services-category-item-add-button";
import { useModalStore } from "@/lib/store";
import { ServiceDetailsModal } from "../modals/user/service/service-details-modal";

export const BookingServicesCategoryItem = ({service}:{service:Service}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleDetalisModal = () => openModal(<ServiceDetailsModal service={service}/>)

  return (
    <div
      onClick={handleDetalisModal} 
      className="w-full flex flex-row items-center justify-between border-1 border-[#F2F2F8] backdrop-blur-xl  bg-[#FFF]  px-4 py-5 rounded-2xl transition-all duration-75 hover:cursor-pointer hover:border-black/20"
    >
      <div className="flex flex-col space-y-2.5">
        <div className="flex flex-col space-y-1">
          <h3 className="text-base text-[#191919] font-medium leading-5 tracking-tight">{service.name}</h3>
          <p className="text-[13px] text-[#89888D] font-medium">{displayAppointmentTime(service.duration)}</p>
        </div>
        
        <p className="text-[15px] text-[#191919] font-medium leading-[18px]">{service.price} PLN</p>
      </div>
      <BookingServicesCategoryItemAddButton serviceId={service.id}/>
    </div>
  )
};

