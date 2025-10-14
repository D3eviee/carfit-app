'use client'
import { DashboardServiceEditModal } from "@/components/modals/dashboard/service/dashboard-service-edit-service";
import { DashboardServicesDeleteServiceModal } from "@/components/modals/dashboard/service/dashboard-services-delete-service-modal";
import { useModalStore } from "@/lib/store";
import { ServicesCategory } from "@/lib/types";
import { displayAppointmentTime } from "@/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Pen, TrashIcon } from "lucide-react";

type Service = {
  name: string
  id: string
  description: string
  price: string
  categoryId: string
  duration: number
}

export const ServicesServiceListItem = ({ service, categories}: { service: Service, categories:ServicesCategory[]}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningDeleteModal = () => openModal(<DashboardServicesDeleteServiceModal serviceId={service.id}/>)
  const handleOpeningEditModal = () => openModal(<DashboardServiceEditModal categories={categories} service={service}/>)

  return (
    <div className="relative w-full flex flex-row inset-shadow-glass-sm border-1 border-[#E6E6E6] rounded-xl overflow-hidden">
      {/* LEFT COLOR DECORATION */}
      <div className="absolute w-2 h-full bg-[#1E6EF3] top-0"/>
      {/* SERVICE INFORMATION*/}
      <div className="w-full flex flex-col gap-2 justify-between pl-5 pr-2 py-3">
        {/* TOP */}
        <div className="flex flex-row justify-between items-center">
          
          <h1 className="text-main-black font-semibold leading-none">{service.name}</h1>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <MoreVertical
                size={25}
                color="#999999"
                className="hover:bg-[#F2F4F6] p-1 rounded-md hover:cursor-pointer"
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-[#FFF] flex flex-col p-1  border-[0.5px] border-[#E6E6E6] inset-shadow-glass-sm rounded-xl w-24"
                align="end"
                alignOffset={8}
                sideOffset={3}
              >
                <DropdownMenu.Item 
                  onClick={handleOpeningEditModal}
                  className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-[#F2F4F6] hover:cursor-pointer rounded-lg"
                >
                  <Pen color="#191919" strokeWidth={1.5} size={14} />
                  <p className="text-main-black text-xs font-normal">Edytuj</p>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-[0.5px] bg-[#D4D4D4] my-1" />
                <DropdownMenu.Item 
                  className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-[#F2F4F6] hover:cursor-pointer rounded-lg"
                  onClick={handleOpeningDeleteModal}
                >
                  <TrashIcon color="#FE6265" strokeWidth={1.5} size={14} />
                  <p className="text-[#FE6265] text-xs font-normal">Usuń</p>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        {/* SERVICE DESCRIPTION */}
        <p className="text-sm text-main-black font-light leading-none">{service.description}</p>
        
        {/* SERVICE DETAILS -> PRICE AND DURATION */}
        <div className="w-full flex flex-row gap-3 mt-1">
          <p className="text-xs px-2 py-0.5 rounded-lg bg-[#F5F0FF] text-[#6D28D9] border-[0.5px] border-[#E0D4FF]">{displayAppointmentTime(service.duration)}</p>
          <p className="text-xs px-2 py-0.5 rounded-lg bg-[#FAE8FF] text-[#C026D3] border-[0.5px] border-[#F5D0FE]">{service.price} PLN</p>
        </div>
      </div>
    </div>
  );
}