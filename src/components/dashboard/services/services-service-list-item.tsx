import { deleteService } from "@/app/dashboard/services/actions";
import { displayAppointmentTime } from "@/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Pen, TrashIcon } from "lucide-react";

type Service = {
  name: string;
  id: string;
  description: string;
  price: string;
  duration: number;
};

export default function ServicesServiceListItem({ service }: { service: Service }) {
  const queryClient = useQueryClient()

   const { mutate } = useMutation({
          mutationFn: async (id: string) => await deleteService(id),
          onSuccess: (data) => {
              if (data?.success) {
                  queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] });
              }
          },
      });

  return (
    <div className="relative w-full flex flex-row bg-[#F9FAFC] border-[0.5px] border-[#D4D4D4] rounded-[10px] overflow-hidden">
      <div className="absolute w-1.5 h-full bg-purple-600 opacity-45" />
      {/* CONTENT */}
      <div className="w-full flex flex-col gap-3 justify-between pl-4 pr-3 py-2">
        {/* TOP */}
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[#111] text-base font-medium">{service.name}</h1>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <MoreVertical
                size={20}
                color="#111"
                className="hover:cursor-pointer"
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-[#FFFFFF] flex flex-col p-1 gap-0.3 border-[0.5px] border-gray-200 shadow-[0px_0px_0px_1px_#D4D4D480] rounded"
                align="end"
                sideOffset={3}
              >
                <DropdownMenu.Item className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer">
                  <Pen color="#111" strokeWidth={1.5} size={14} />
                  <p className="text-[#111] text-xs font-normal">Edit</p>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-[0.5px] bg-[#D4D4D4] my-1" />
                <DropdownMenu.Item className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer" onClick={()=> mutate(service.id)}>
                  <TrashIcon color="#E95E5E" strokeWidth={1.5} size={14} />
                  <p className="text-[#E95E5E] text-xs font-normal">Delete</p>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        {/* BOTTOM */}
        <div className="w-full flex flex-row gap-3">
          <p className="text-center text-white text-sm font-normal px-2 py-1 bg-[#5D44F8] rounded-md my-auto leading-none">{displayAppointmentTime(service.duration)}</p>
          <p className="text-center text-white text-sm font-normal px-2 py-1 bg-[#F25287] rounded-md my-auto leading-none">{service.price}PLN</p>
        </div>
      </div>
    </div>
  );
}