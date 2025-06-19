import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { ReactNode } from "react";

type ModalProviderProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export default function ModalProvider({ open, onClose, title, children}: ModalProviderProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-lvh z-10">
    {/* OVERLAY  */}
      <div
        className="bg-black opacity-65 w-full h-lvh"
        onClick={onClose}
      />
    {/* CONTENT  */}
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full z-20 px-4 sm:w-[380px] xl:w-[450px]">
        <div className="w-full bg-[#FFF] rounded-lg">
          <div className="flex items-center justify-between p-3 border-b-[0.5px] border-[#D4D4D4]">
            <h1 className="text-[#111] text-sm font-normal">{title}</h1>
            <X size={20} color="#333" className="hover: cursor-pointer" onClick={onClose} />
          </div>
          <div className="px-3 py-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}