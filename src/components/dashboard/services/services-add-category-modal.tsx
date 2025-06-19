"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormLabel } from "@/components/form-label";
import ModalProvider from "@/components/providers/modal-provider";
import { addNewCategory } from "@/app/dashboard/services/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema, AddCategorySchema } from "@/lib/schema";

type ServicesAddCategoryModalProps = {
    isOpen: boolean
    onClose : () => void
}

export function ServicesAddCategoryModal({isOpen, onClose}:ServicesAddCategoryModalProps) {
  const queryClient = useQueryClient();
  // ERROR STATE
  const [error, setError] = useState<string>()

  // FORM HOOK
  const { register, handleSubmit, getValues, reset, formState, watch} = useForm<AddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
        categoryName: ""
    }
  });

  const categoryNameWatch = watch("categoryName")

  // PROCESSING ADDDING CATEGORY
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await addNewCategory(getValues("categoryName"))
    },
    onSuccess: (data) => {
      if (data.success) {
        reset()
        queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] });
        onClose()
      } else {
        setError(data?.message || "Error occurred");
      }
    },
  })

  return (
    <>
      <ModalProvider title="Dodaj kategorię" open={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(() => mutate())} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <FormLabel text="Nazwa" />
                  <p className="inline-block text-[#333] font-normal text-xs">{categoryNameWatch.length}/30</p>
                </div>
                
                <input
                    maxLength={30}
                    id="name"
                    type="text"
                    {...register("categoryName")}
                    className="border-[1px] border-[#D4D4D4] w-full p-2 text-[#333] text-sm rounded-md focus:outline-[#999]"
                />
            </div>

          {/* ERROR */}
          {<p className="ml-1 text-red-600 text-xs font-normal">{error || formState.errors.categoryName?.message}</p>}

          {/* ADD BUTTON */}
          <input 
            type="submit" 
            value="Dodaj"
            className="w-full py-2 text-[#FFF] bg-[#333333] text-center text-sm font-medium rounded-md hover:bg-[#0766E1]"
          />
        </form>
      </ModalProvider>
    </>
  );
}