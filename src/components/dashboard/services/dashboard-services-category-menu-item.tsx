'use client'
import { MoreVertical, Pen, TrashIcon } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ServicesCategory } from "@/lib/types"
import { useModalStore } from "@/lib/store"
import { DashboardServicesDeleteCategoryModal } from "@/components/modals/dashboard/service/dashboard-services-delete-category-modal"
import { DashboardServiecsEditCategoryModal } from "@/components/modals/dashboard/service/dashboard-services-edit-category-modal"

export const DashboardServicesCategoryMenuItem = ({category}: {category: ServicesCategory}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningDeleteCategoryModal = () => openModal(<DashboardServicesDeleteCategoryModal categoryId={category.id}/>)
  const handleOpeningEditCategoryModal =  () => openModal(<DashboardServiecsEditCategoryModal categoryId={category.id} categoryName={category.name}/>)

  return (
    <div className="w-full flex flex-row justify-between items-center p-2 rounded-xl border-1 border-[#E6E6E6]">
      <p className="text-main-black text-sm leading-none">{category.name}</p>
      
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="hover:bg-[#F2F4F6] active:scale-90 p-1 rounded-md hover:cursor-pointer">
            <MoreVertical color="#999999" size={15}/>
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-[#FFF] backdrop-blur-xl flex flex-col p-1  border-[0.5px] border-[#E6E6E6] inset-shadow-glass-sm rounded-xl w-24"
            align="end"
            alignOffset={8}
            sideOffset={3}
          >
            <DropdownMenu.Item 
              className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-[#F2F4F6] hover:cursor-pointer rounded-lg"
              onClick={handleOpeningEditCategoryModal}>
              <Pen color="#191919" strokeWidth={1.5} size={14} />
              <p className="text-main-black text-xs font-normal">Edytuj</p>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-[0.5px] bg-[#D4D4D4] my-1" />
            <DropdownMenu.Item
              className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-[#F2F4F6] hover:cursor-pointer rounded-lg"
              onClick={handleOpeningDeleteCategoryModal}
            >
              <TrashIcon color="#FE6265" strokeWidth={1.5} size={15}/>
              <p className="text-[#FE6265] text-xs font-normal">Usuń</p>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}