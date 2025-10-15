'use client'
import { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { useModalStore } from "@/lib/store";

type EditableFieldProps = {
  fieldName: string
  fieldValue: string
  editModal: ReactNode
}

export const SettingBusinessInformationEditable = ({fieldName, fieldValue, editModal} : EditableFieldProps) =>  {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () =>  openModal(editModal)

  return (
    <div className="flex flex-col">
      <p className="text-main-black text-sm font-medium">{fieldName}</p>
      <div className="flex items-center justify-between">
        <p className="text-main-black text-sm font-light">{fieldValue || "Brak"}</p>
          <Pencil size={16} strokeWidth={1} className="text-main-black cursor-pointer" onClick={handleOpeningModal}/>
      </div>
    </div>
  )
}

